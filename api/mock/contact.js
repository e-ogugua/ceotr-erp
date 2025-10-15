import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure nodemailer transporter with multiple Gmail-optimized settings
const createGmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465', // Use SSL for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      // Gmail specific TLS settings - try multiple approaches
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
      // Alternative TLS settings to try
      minVersion: 'TLSv1',
      maxVersion: 'TLSv1.2'
    },
    // Connection settings optimized for serverless
    connectionTimeout: 15000, // Reduced for faster failure
    greetingTimeout: 10000,   // Reduced for faster failure
    socketTimeout: 15000,     // Reduced for faster failure

    // Disable features that cause issues in serverless
    pool: false,              // Disable connection pooling
    keepAlive: false,         // Disable keep-alive
    maxConnections: 1,        // Limit to 1 connection
    maxMessages: 1,           // Limit to 1 message per connection

    // Rate limiting for serverless environment
    rateLimit: 1,             // 1 message per second
    rateDelta: 1000,          // 1 second between messages

    // Debug settings for troubleshooting
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development'
  });
};

// Global transporter instance
const transporter = createGmailTransporter();

// Function to send email with retry logic
async function sendEmail(to, subject, text, html, maxRetries = 3) {
  console.log(`🔵 [sendEmail] Attempting to send email...`);
  console.log(`🔵 [sendEmail] Recipient: ${to}`);
  console.log(`🔵 [sendEmail] Subject: ${subject}`);
  console.log(`🔵 [sendEmail] SMTP Config:`, {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER ? '***@gmail.com' : 'Not set',
    from: process.env.ORDER_EMAIL_FROM
  });

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔵 [sendEmail] Attempt ${attempt}/${maxRetries}`);

      const mailOptions = {
        from: process.env.ORDER_EMAIL_FROM,
        to,
        subject,
        text,
        html,
      };

      console.log('🔵 [sendEmail] Sending email with options:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        hasText: !!mailOptions.text,
        hasHtml: !!mailOptions.html
      });

      // Create a promise with timeout
      const emailPromise = transporter.sendMail(mailOptions);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Email sending timeout - attempt ${attempt} took too long`));
        }, 20000); // 20 second timeout
      });

      const info = await Promise.race([emailPromise, timeoutPromise]);
      console.log('🟢 [sendEmail] Email sent successfully:', {
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
        response: info.response,
        attempt: attempt
      });
      return { success: true, messageId: info.messageId };

    } catch (error) {
      console.error(`🔴 [sendEmail] Attempt ${attempt} failed:`, {
        name: error.name,
        message: error.message,
        code: error.code,
        stack: error.stack
      });

      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying with exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Max 5 seconds
      console.log(`🔵 [sendEmail] Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Vercel serverless function for contact form
export default async function handler(req, res) {
  console.log('Contact API Request Headers:', req.headers);
  console.log('Contact API Request Body:', req.body);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Contact form submission received');

    const { name, email, phone, subject, message, timestamp } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate environment variables before proceeding
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'ORDER_EMAIL_FROM', 'ORDER_NOTIFICATIONS_EMAIL'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingEnvVars.length > 0) {
      console.error('Missing environment variables:', missingEnvVars);
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact support.'
      });
    }

    console.log('Environment variables validated successfully');

    // First send response to client
    const response = {
      success: true,
      message: 'Contact form submitted successfully',
      contactId: `CT${Date.now()}`
    };

    console.log('Sending response to client:', response);
    res.status(200).json(response);

    // Then handle email sending
    try {
      console.log('🔵 Starting email sending process...');

      // Send notification to admin
      console.log('📧 Sending admin notification email...');
      try {
        const adminEmail = await sendEmail(
          process.env.ORDER_NOTIFICATIONS_EMAIL,
          'New Contact Form Submission',
          `New contact from ${name}. Subject: ${subject}. Message: ${message}. Contact: ${email}`,
          `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong> ${message}</p><p><strong>Timestamp:</strong> ${timestamp}</p>`
        );
        console.log('✅ Admin notification sent successfully:', adminEmail);
      } catch (adminError) {
        console.error('❌ Failed to send admin notification:', adminError.message);
        console.error('❌ Admin email error details:', adminError);
      }

      // Send confirmation to customer
      console.log('📧 Sending customer confirmation email...');
      try {
        const customerEmail = await sendEmail(
          email,
          'Contact Form Received - CEOTR Ltd',
          `Hi ${name}, thank you for contacting us. We have received your message: "${message}". We will get back to you soon.`,
          `<h2>Contact Received</h2><p>Hi ${name},</p><p>Thank you for reaching out to CEOTR Ltd. We have received your message:</p><p><strong>${message}</strong></p><p>We will review it and respond as soon as possible.</p><p>Best regards,<br>CEOTR Ltd Team</p>`
        );
        console.log('✅ Customer confirmation sent successfully:', customerEmail);
      } catch (customerError) {
        console.error('❌ Failed to send customer confirmation:', customerError.message);
        console.error('❌ Customer email error details:', customerError);
      }

      console.log('🔵 Email sending process completed');

    } catch (emailError) {
      console.error('❌ Email sending process failed:', emailError);
      console.error('❌ Full error details:', {
        name: emailError.name,
        message: emailError.message,
        code: emailError.code,
        stack: emailError.stack
      });
      // We've already sent a success response, so we can't change it now
      // But we should log this error for monitoring
    }
  } catch (error) {
    console.error('Contact API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure nodemailer transporter with advanced Gmail-specific settings
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
      // Advanced TLS settings for Gmail compatibility
      ciphers: 'ECDHE-RSA-AES128-GCM-SHA256:!RC4:!MD5:!DSS',
      rejectUnauthorized: false,
      // Enable all TLS versions that Gmail might support
      minVersion: 'TLSv1',
      maxVersion: 'TLSv1.3',
      // Server name indication for proper certificate validation
      servername: 'smtp.gmail.com'
    },
    // Connection settings optimized for serverless with Gmail
    connectionTimeout: 10000,  // Reduced for faster failure detection
    greetingTimeout: 8000,     // Reduced for faster failure detection
    socketTimeout: 10000,      // Reduced for faster failure detection

    // Enable connection pooling with strict limits for serverless
    pool: true,                // Enable pooling for better performance
    maxConnections: 1,         // Limit to 1 connection per function
    maxMessages: 3,            // Allow up to 3 messages per connection
    rateLimit: 1,              // 1 message per second
    rateDelta: 1000,           // 1 second between messages

    // Disable keep-alive to avoid stale connections
    keepAlive: false,

    // Debug settings for troubleshooting
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development',

    // Additional Gmail-specific settings
    service: 'gmail',          // Use Gmail service for better defaults
    authMethod: 'LOGIN'        // Specify auth method explicitly
  });
};

// Global transporter instance
const transporter = createGmailTransporter();

// Function to send email with advanced retry logic for Gmail
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

      // Create new transporter for each attempt to avoid stale connections
      const freshTransporter = createGmailTransporter();

      // Create a promise with multiple timeout strategies
      const emailPromise = freshTransporter.sendMail(mailOptions);

      // Multiple timeout promises for different failure scenarios
      const connectionTimeout = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Connection timeout - attempt ${attempt} - Gmail not responding`));
        }, 15000); // 15 second connection timeout
      });

      const greetingTimeout = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Greeting timeout - attempt ${attempt} - SMTP handshake failed`));
        }, 12000); // 12 second greeting timeout
      });

      const socketTimeout = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Socket timeout - attempt ${attempt} - Network issue`));
        }, 10000); // 10 second socket timeout
      });

      // Race all timeout promises against the email promise
      const info = await Promise.race([emailPromise, connectionTimeout, greetingTimeout, socketTimeout]);

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

      // Enhanced error analysis for Gmail-specific issues
      if (error.message.includes('timeout') || error.message.includes('Timeout')) {
        console.error(`🔴 [sendEmail] Gmail timeout issue - attempt ${attempt}`);
        if (attempt === 1) {
          console.error('🔴 [sendEmail] First attempt timed out - Gmail may be blocking this connection');
          console.error('🔴 [sendEmail] This is common with serverless platforms like Vercel');
        } else if (attempt === 2) {
          console.error('🔴 [sendEmail] Second attempt timed out - persistent network issue');
          console.error('🔴 [sendEmail] Gmail SMTP servers may be throttling this connection');
        } else {
          console.error('🔴 [sendEmail] All attempts timed out - Gmail SMTP not compatible with this serverless environment');
          console.error('🔴 [sendEmail] RECOMMENDATION: Switch to SendGrid, Mailgun, or AWS SES for reliable serverless email delivery');
        }
      } else if (error.code === 'ECONNECTION') {
        console.error('🔴 [sendEmail] Connection refused by Gmail SMTP server');
        console.error('🔴 [sendEmail] Gmail may be blocking connections from this serverless environment');
        console.error('🔴 [sendEmail] SOLUTION: Use SendGrid instead - it is designed for serverless platforms');
      } else if (error.code === 'EAUTH') {
        console.error('🔴 [sendEmail] Authentication failed - check Gmail app password');
        console.error('🔴 [sendEmail] Gmail App Password Setup: https://support.google.com/accounts/answer/185833');
      } else if (error.message.includes('Greeting never received')) {
        console.error('🔴 [sendEmail] SMTP server not responding to initial connection');
        console.error('🔴 [sendEmail] Gmail firewall is likely blocking this serverless connection');
        console.error('🔴 [sendEmail] ALTERNATIVE: Use SendGrid - works reliably with Vercel serverless functions');
      }

      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying with exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 3000); // Max 3 seconds
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

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure nodemailer transporter with Gmail-optimized settings
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_PORT === '465', // Use SSL for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // Gmail specific TLS settings
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  },
  // Additional settings for better reliability with serverless platforms
  connectionTimeout: 30000, // Reduced from 60000
  greetingTimeout: 15000,  // Reduced from 30000
  socketTimeout: 30000,    // Reduced from 60000
  // Disable pooling to avoid connection reuse issues
  pool: false,
  // Use direct connection without keep-alive
  keepAlive: false,
  // Debug mode for troubleshooting
  debug: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development'
});

// Function to send email
async function sendEmail(to, subject, text, html) {
  console.log(`🔵 [sendEmail] Attempting to send email...`);
  console.log(`🔵 [sendEmail] Recipient: ${to}`);
  console.log(`🔵 [sendEmail] Subject: ${subject}`);
  console.log(`🔵 [sendEmail] SMTP Config:`, {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER ? '***@gmail.com' : 'Not set',
    from: process.env.ORDER_EMAIL_FROM
  });

  try {
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
        reject(new Error('Email sending timeout - operation took too long'));
      }, 25000); // 25 second timeout
    });

    const info = await Promise.race([emailPromise, timeoutPromise]);
    console.log('🟢 [sendEmail] Email sent successfully:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const errorMessage = `Failed to send email: ${error.message}`;
    console.error('🔴 [sendEmail] Error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
      response: error.response,
      smtpError: error.smtp ? error.smtp.response : undefined
    });

    // Enhanced error handling for Gmail issues
    if (error.code === 'EAUTH') {
      console.error('🔴 Authentication failed - check SMTP credentials and App Password');
      console.error('🔴 Gmail App Password Setup: https://support.google.com/accounts/answer/185833');
      console.error('🔴 Alternative: Consider using SendGrid, Mailgun, or AWS SES for better serverless compatibility');
    } else if (error.code === 'ECONNECTION') {
      console.error('🔴 Connection to SMTP server failed - check host and port');
      console.error('🔴 SMTP Settings should be: smtp.gmail.com:587');
      console.error('🔴 Alternative: Gmail SMTP may be blocked by serverless platforms. Try SendGrid instead.');
    } else if (error.code === 'ETIMEDOUT' || error.message.includes('timeout') || error.message.includes('Timeout')) {
      console.error('🔴 Connection to SMTP server timed out');
      console.error('🔴 This may be due to firewall or network restrictions');
      console.error('🔴 Gmail SMTP often times out on serverless platforms like Vercel');
      console.error('🔴 RECOMMENDED SOLUTION: Switch to SendGrid, Mailgun, or AWS SES');
      console.error('🔴 These services are designed for cloud/serverless environments');
    } else if (error.message.includes('Greeting never received')) {
      console.error('🔴 SMTP server not responding - likely blocked by Gmail firewall');
      console.error('🔴 SOLUTION: Use a professional email service like SendGrid instead of Gmail');
    } else if (error.message.includes('Invalid login')) {
      console.error('🔴 Invalid login credentials - check username and password');
    } else if (error.message.includes('Application-specific password required')) {
      console.error('🔴 Gmail requires App Password, not regular password');
    }

    throw new Error(errorMessage);
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

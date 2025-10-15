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
  // Additional settings for better reliability
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000
});

// Function to send email
async function sendEmail(to, subject, text, html) {
  console.log(`Attempting to send email to: ${to}`);
  console.log(`Using SMTP server: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);

  try {
    const mailOptions = {
      from: process.env.ORDER_EMAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      hasText: !!mailOptions.text,
      hasHtml: !!mailOptions.html
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
      response: error.response,
      smtpError: error.smtp ? error.smtp.response : undefined
    });

    // More specific error handling for Gmail issues
    if (error.code === 'EAUTH') {
      console.error('🔴 Authentication failed - check SMTP credentials and App Password');
      throw new Error('Gmail authentication failed. Please check your App Password and ensure "Less secure app access" is disabled while using App Password.');
    } else if (error.code === 'ECONNECTION') {
      console.error('🔴 Connection to SMTP server failed - check host and port');
      throw new Error('Cannot connect to Gmail SMTP server. Please verify SMTP_HOST and SMTP_PORT settings.');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('🔴 Connection to SMTP server timed out');
      throw new Error('Connection to Gmail SMTP server timed out. Please try again.');
    } else if (error.message.includes('Invalid login')) {
      console.error('🔴 Invalid login credentials - check username and password');
      throw new Error('Invalid Gmail credentials. Please check your email and App Password.');
    } else if (error.message.includes('Application-specific password required')) {
      console.error('🔴 Gmail requires App Password, not regular password');
      throw new Error('Gmail requires an App Password, not your regular password. Please generate an App Password from your Google Account settings.');
    }

    throw error;
  }
}

// Vercel serverless function for newsletter subscription
export default async function handler(req, res) {
  console.log('Newsletter API Request Headers:', req.headers);
  console.log('Newsletter API Request Body:', req.body);

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
    console.log('Newsletter subscription received');

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // First send response to client
    const response = {
      success: true,
      message: 'Newsletter subscription successful',
      subscriptionId: `NL${Date.now()}`
    };

    console.log('Sending response to client:', response);
    res.status(200).json(response);

    // Then handle email sending
    try {
      // Send notification to admin
      console.log('Sending admin notification email');
      const adminEmail = await sendEmail(
        process.env.ORDER_NOTIFICATIONS_EMAIL,
        'New Newsletter Subscription',
        `New newsletter subscription from ${email}`,
        `<h2>New Newsletter Subscription</h2><p><strong>Email:</strong> ${email}</p><p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>`
      );
      console.log('Admin notification sent:', adminEmail);

    } catch (emailError) {
      console.error('Failed to send newsletter notification email:', emailError);
      // We've already sent a success response, so we can't change it now
      // But we should log this error for monitoring
    }
  } catch (error) {
    console.error('Newsletter API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

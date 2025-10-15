import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Gmail API Configuration for serverless compatibility
const GMAIL_SERVICE_ACCOUNT_EMAIL = process.env.GMAIL_SERVICE_ACCOUNT_EMAIL;
const GMAIL_SERVICE_ACCOUNT_KEY = process.env.GMAIL_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');
const GMAIL_SENDING_USER = process.env.GMAIL_SENDING_USER || process.env.SMTP_USER;

// Initialize Gmail API client
const getGmailClient = async () => {
  if (!GMAIL_SERVICE_ACCOUNT_EMAIL || !GMAIL_SERVICE_ACCOUNT_KEY || !GMAIL_SENDING_USER) {
    throw new Error('Gmail API credentials not configured. Please set GMAIL_SERVICE_ACCOUNT_EMAIL, GMAIL_SERVICE_ACCOUNT_KEY, and GMAIL_SENDING_USER');
  }

  return new google.auth.JWT({
    email: GMAIL_SERVICE_ACCOUNT_EMAIL,
    key: GMAIL_SERVICE_ACCOUNT_KEY,
    scopes: ['https://mail.google.com/'],
    subject: GMAIL_SENDING_USER,
  });
};

// Alternative: Keep SMTP as fallback for local development
const useGmailAPI = process.env.USE_GMAIL_API === 'true' || process.env.NODE_ENV === 'production';

// Function to send email via Gmail API (serverless-friendly)
async function sendEmailViaGmailAPI(to, subject, text, html) {
  console.log(`🔵 [GmailAPI] Sending email via Gmail API...`);
  console.log(`🔵 [GmailAPI] To: ${to}`);
  console.log(`🔵 [GmailAPI] Subject: ${subject}`);

  try {
    const auth = await getGmailClient();

    // Build RFC 822 email message
    const emailLines = [
      `To: ${to}`,
      `From: ${GMAIL_SENDING_USER}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: multipart/alternative; boundary="boundary_example"',
      '',
      '--boundary_example',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: 7bit',
      '',
      text,
      '',
      '--boundary_example',
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: 7bit',
      '',
      html,
      '',
      '--boundary_example--',
      '',
    ];

    const email = emailLines.join('\r\n');

    // Send via Gmail API
    const gmail = google.gmail({ version: 'v1', auth });
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
      },
    });

    console.log('🟢 [GmailAPI] Email sent successfully:', response.data);
    return { success: true, messageId: response.data.id };

  } catch (error) {
    console.error('🔴 [GmailAPI] Gmail API Error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw error;
  }
}

// Function to send email via SMTP (fallback for local development)
async function sendEmailViaSMTP(to, subject, text, html) {
  console.log(`🔵 [SMTP] Sending email via SMTP...`);
  console.log(`🔵 [SMTP] To: ${to}`);
  console.log(`🔵 [SMTP] Subject: ${subject}`);

  try {
    // Gmail SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: 'ECDHE-RSA-AES128-GCM-SHA256:!RC4:!MD5:!DSS',
        rejectUnauthorized: false,
        minVersion: 'TLSv1',
        maxVersion: 'TLSv1.3',
      },
      connectionTimeout: 10000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
    });

    const mailOptions = {
      from: process.env.ORDER_EMAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('🟢 [SMTP] Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('🔴 [SMTP] SMTP Error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw error;
  }
}

// Main email sending function with API fallback
async function sendEmail(to, subject, text, html, maxRetries = 3) {
  console.log(`🔵 [sendEmail] Attempting to send email to: ${to}`);

  // Try Gmail API first (serverless-friendly)
  if (useGmailAPI) {
    try {
      console.log(`🔵 [sendEmail] Trying Gmail API first...`);
      return await sendEmailViaGmailAPI(to, subject, text, html);
    } catch (apiError) {
      console.error(`🔴 [sendEmail] Gmail API failed:`, apiError.message);
      console.log(`🔵 [sendEmail] Falling back to SMTP...`);
      // Fall back to SMTP if API fails
    }
  }

  // Use SMTP as primary or fallback
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔵 [sendEmail] SMTP attempt ${attempt}/${maxRetries}`);
      return await sendEmailViaSMTP(to, subject, text, html);

    } catch (error) {
      console.error(`🔴 [sendEmail] SMTP attempt ${attempt} failed:`, error.message);

      if (attempt === maxRetries) {
        throw error;
      }

      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 3000);
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

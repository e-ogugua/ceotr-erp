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

// Vercel serverless function for booking form
export default async function handler(req, res) {
  console.log('Booking API Request Headers:', req.headers);
  console.log('Booking API Request Body:', req.body);

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
    console.log('Booking form submission received');

    const { name, email, phone, projectDetails, startDate, currency, service, timestamp } = req.body;

    if (!name || !email || !service) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // First send response to client
    const response = {
      success: true,
      message: 'Booking submitted successfully',
      bookingId: `BK${Date.now()}`
    };

    console.log('Sending response to client:', response);
    res.status(200).json(response);

    // Then handle email sending
    try {
      // Send notification to admin
      console.log('Sending admin notification email');
      const adminEmail = await sendEmail(
        process.env.ORDER_NOTIFICATIONS_EMAIL,
        'New Booking Received',
        `New booking from ${name} for ${service}.
        Contact: ${email}
        Phone: ${phone}
        Project: ${projectDetails}
        Start Date: ${startDate}
        Currency: ${currency}
        Timestamp: ${timestamp}`,
        `
        <h2>New Booking Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Project Details:</strong> ${projectDetails}</p>
        <p><strong>Start Date:</strong> ${startDate}</p>
        <p><strong>Currency:</strong> ${currency}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        `
      );
      console.log('Admin notification sent:', adminEmail);

      // Send confirmation to customer
      console.log('Sending customer confirmation email');
      const customerEmail = await sendEmail(
        email,
        'Booking Received - CEOTR Ltd',
        `Hi ${name},

Thank you for your booking request for ${service}.

We have received your details and will contact you within 24 hours to confirm your booking.

Booking Details:
- Service: ${service}
- Project: ${projectDetails}
- Preferred Start Date: ${startDate}
- Currency: ${currency}

Best regards,
CEOTR Ltd Team`,
        `
        <h2>Booking Received</h2>
        <p>Hi ${name},</p>
        <p>Thank you for choosing CEOTR Ltd for your ${service} needs.</p>
        <p>We have received your booking request and our team will review it shortly.</p>

        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Project:</strong> ${projectDetails}</li>
          <li><strong>Preferred Start Date:</strong> ${startDate}</li>
          <li><strong>Currency:</strong> ${currency}</li>
        </ul>

        <p>We will contact you within 24 hours to discuss next steps and confirm your booking.</p>
        <p>Best regards,<br>CEOTR Ltd Team</p>
        `
      );
      console.log('Customer confirmation sent:', customerEmail);

    } catch (emailError) {
      console.error('Failed to send one or more emails:', emailError);
      // We've already sent a success response, so we can't change it now
      // But we should log this error for monitoring
    }
  } catch (error) {
    console.error('Booking API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

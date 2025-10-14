import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Function to send email
async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: process.env.ORDER_EMAIL_FROM,
      to,
      subject,
      text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Export the Express app for Vercel
export default async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/mock/book') {
    const { name, email, service } = req.body;
    res.status(200).json({
      success: true,
      message: 'Booking submitted successfully',
      bookingId: `BK${Date.now()}`
    });
    if (email) {
      await sendEmail(
        process.env.ORDER_NOTIFICATIONS_EMAIL,
        'New Booking Received',
        `New booking from ${name} for ${service}. Contact: ${email}`
      );
    }
  } else if (req.method === 'POST' && req.url === '/api/mock/quote') {
    const { name, email, service } = req.body;
    res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully',
      quoteId: `QT${Date.now()}`
    });
    if (email) {
      await sendEmail(
        process.env.ORDER_NOTIFICATIONS_EMAIL,
        'New Quote Request',
        `New quote request from ${name} for ${service}. Contact: ${email}`
      );
    }
  } else if (req.method === 'POST' && req.url === '/api/mock/contact') {
    const { name, email, message } = req.body;
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: `CT${Date.now()}`
    });
    if (email) {
      await sendEmail(
        process.env.ORDER_NOTIFICATIONS_EMAIL,
        'New Contact Form Submission',
        `New contact from ${name}. Message: ${message}. Contact: ${email}`
      );
    }
  } else if (req.method === 'GET' && req.url === '/api/health') {
    res.status(200).json({ status: 'OK', message: 'Mock API server is running' });
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
};

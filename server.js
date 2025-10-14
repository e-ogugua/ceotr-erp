import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure nodemailer transporter
const transporter = nodemailer.createTransporter({
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

// Mock endpoints
app.post('/api/mock/book', async (req, res) => {
  console.log('Booking received:', req.body);
  // Simulate processing delay
  setTimeout(async () => {
    res.status(200).json({
      success: true,
      message: 'Booking submitted successfully',
      bookingId: `BK${Date.now()}`
    });
    // Send notification email
    const { name, email, service } = req.body;
    if (email) {
      await sendEmail(
        process.env.ORDER_NOTIFICATIONS_EMAIL,
        'New Booking Received',
        `New booking from ${name} for ${service}. Contact: ${email}`
      );
    }
  }, 500);
});

app.post('/api/mock/quote', async (req, res) => {
  console.log('Quote request received:', req.body);
  // Simulate processing delay
  setTimeout(async () => {
    res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully',
      quoteId: `QT${Date.now()}`
    });
    // Send notification email
    const { name, email, service } = req.body;
    if (email) {
      await sendEmail(
        process.env.ORDER_NOTIFICATIONS_EMAIL,
        'New Quote Request',
        `New quote request from ${name} for ${service}. Contact: ${email}`
      );
    }
  }, 500);
});

app.post('/api/mock/contact', async (req, res) => {
  console.log('Contact form submitted:', req.body);
  // Simulate processing delay
  setTimeout(async () => {
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: `CT${Date.now()}`
    });
    // Send notification email
    const { name, email, message } = req.body;
    if (email) {
      await sendEmail(
        process.env.ORDER_NOTIFICATIONS_EMAIL,
        'New Contact Form Submission',
        `New contact from ${name}. Message: ${message}. Contact: ${email}`
      );
    }
  }, 500);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Mock API server is running' });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

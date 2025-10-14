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
async function sendEmail(to, subject, text, html) {
  try {
    await transporter.sendMail({
      from: process.env.ORDER_EMAIL_FROM,
      to,
      subject,
      text,
      html,
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
        `New booking from ${name} for ${service}. Contact: ${email}`,
        `<h2>New Booking Received</h2><p><strong>Name:</strong> ${name}</p><p><strong>Service:</strong> ${service}</p><p><strong>Email:</strong> ${email}</p><p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>`
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
        `New quote request from ${name} for ${service}. Contact: ${email}`,
        `<h2>New Quote Request</h2><p><strong>Name:</strong> ${name}</p><p><strong>Service:</strong> ${service}</p><p><strong>Email:</strong> ${email}</p><p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>`
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
      // Send notification to admin (emmachuka)
      await sendEmail(
        process.env.ORDER_NOTIFICATIONS_EMAIL,
        'New Contact Form Submission',
        `New contact from ${name}. Message: ${message}. Contact: ${email}`,
        `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p><p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>`
      );
      // Send confirmation to the user
      await sendEmail(
        email,
        'Contact Form Received - CEOTR Ltd',
        `Hi ${name}, thank you for contacting us. We have received your message: "${message}". We will get back to you soon.`,
        `<h2>Contact Received</h2><p>Hi ${name},</p><p>Thank you for reaching out to CEOTR Ltd. We have received your message:</p><p><strong>${message}</strong></p><p>We will review it and respond as soon as possible.</p><p>Best regards,<br>CEOTR Ltd Team</p>`
      );
    }
  } else if (req.method === 'GET' && req.url === '/api/health') {
    res.status(200).json({ status: 'OK', message: 'Mock API server is running' });
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
};

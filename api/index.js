const nodemailer = require('nodemailer');
require('dotenv').config();

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

module.exports = async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/mock/book') {
    const { name, email, phone, projectDetails, startDate, currency, service, serviceId, timestamp } = req.body;

    // Always return success response first for better UX
    res.status(200).json({
      success: true,
      message: 'Booking submitted successfully',
      bookingId: `BK${Date.now()}`
    });

    // Send emails after response to avoid blocking UI
    if (email) {
      try {
        // Send notification to admin (emmachuka)
        await sendEmail(
          process.env.ORDER_NOTIFICATIONS_EMAIL,
          'New Booking Received',
          `New booking from ${name} for ${service}. Contact: ${email}. Phone: ${phone}. Project: ${projectDetails}. Start Date: ${startDate}. Currency: ${currency}`,
          `<h2>New Booking Received</h2><p><strong>Name:</strong> ${name}</p><p><strong>Service:</strong> ${service}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Project Details:</strong> ${projectDetails}</p><p><strong>Start Date:</strong> ${startDate}</p><p><strong>Currency:</strong> ${currency}</p><p><strong>Timestamp:</strong> ${timestamp}</p>`
        );

        // Send confirmation to customer
        await sendEmail(
          email,
          'Booking Received - CEOTR Ltd',
          `Hi ${name}, thank you for your booking request for ${service}. We have received your details and will contact you within 24 hours to confirm your booking.`,
          `<h2>Booking Received</h2><p>Hi ${name},</p><p>Thank you for choosing CEOTR Ltd for your ${service} needs.</p><p>We have received your booking request and our team will review it shortly.</p><p><strong>Booking Details:</strong></p><ul><li><strong>Service:</strong> ${service}</li><li><strong>Project:</strong> ${projectDetails}</li><li><strong>Preferred Start Date:</strong> ${startDate}</li><li><strong>Currency:</strong> ${currency}</li></ul><p>We will contact you within 24 hours to discuss next steps and confirm your booking.</p><p>Best regards,<br>CEOTR Ltd Team</p>`
        );
      } catch (error) {
        console.error('Email sending failed:', error);
        // Don't fail the request if emails fail - the booking was still submitted
      }
    }
  } else if (req.method === 'POST' && req.url === '/api/mock/quote') {
    const { name, email, phone, budgetMin, budgetMax, projectDetails, currency, service, serviceId, timestamp } = req.body;

    res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully',
      quoteId: `QT${Date.now()}`
    });

    if (email) {
      try {
        // Send notification to admin
        await sendEmail(
          process.env.ORDER_NOTIFICATIONS_EMAIL,
          'New Quote Request',
          `New quote request from ${name} for ${service}. Contact: ${email}. Budget: ${budgetMin}-${budgetMax}. Project: ${projectDetails}`,
          `<h2>New Quote Request</h2><p><strong>Name:</strong> ${name}</p><p><strong>Service:</strong> ${service}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Budget Range:</strong> ${budgetMin} - ${budgetMax}</p><p><strong>Project Details:</strong> ${projectDetails}</p><p><strong>Currency:</strong> ${currency}</p><p><strong>Timestamp:</strong> ${timestamp}</p>`
        );

        // Send confirmation to customer
        await sendEmail(
          email,
          'Quote Request Received - CEOTR Ltd',
          `Hi ${name}, thank you for requesting a quote for ${service}. We have received your requirements and will prepare a tailored proposal for you.`,
          `<h2>Quote Request Received</h2><p>Hi ${name},</p><p>Thank you for considering CEOTR Ltd for your ${service} project.</p><p>We have received your quote request and our team is preparing a tailored proposal based on your requirements.</p><p><strong>Your Request:</strong></p><ul><li><strong>Service:</strong> ${service}</li><li><strong>Budget Range:</strong> ${budgetMin} - ${budgetMax} ${currency}</li><li><strong>Project Details:</strong> ${projectDetails}</li></ul><p>We will send you a detailed proposal within 2-3 business days.</p><p>Best regards,<br>CEOTR Ltd Team</p>`
        );
      } catch (error) {
        console.error('Email sending failed:', error);
      }
    }
  } else if (req.method === 'POST' && req.url === '/api/mock/contact') {
    const { name, email, phone, subject, message, timestamp } = req.body;

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: `CT${Date.now()}`
    });

    if (email) {
      try {
        // Send notification to admin (emmachuka)
        await sendEmail(
          process.env.ORDER_NOTIFICATIONS_EMAIL,
          'New Contact Form Submission',
          `New contact from ${name}. Subject: ${subject}. Message: ${message}. Contact: ${email}`,
          `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong> ${message}</p><p><strong>Timestamp:</strong> ${timestamp}</p>`
        );

        // Send confirmation to the user
        await sendEmail(
          email,
          'Contact Form Received - CEOTR Ltd',
          `Hi ${name}, thank you for contacting us. We have received your message: "${message}". We will get back to you soon.`,
          `<h2>Contact Received</h2><p>Hi ${name},</p><p>Thank you for reaching out to CEOTR Ltd. We have received your message:</p><p><strong>${message}</strong></p><p>We will review it and respond as soon as possible.</p><p>Best regards,<br>CEOTR Ltd Team</p>`
        );
      } catch (error) {
        console.error('Email sending failed:', error);
      }
    }
  } else if (req.method === 'POST' && req.url === '/api/mock/newsletter') {
    const { email } = req.body;

    res.status(200).json({
      success: true,
      message: 'Newsletter subscription successful',
      subscriptionId: `NL${Date.now()}`
    });

    if (email) {
      try {
        await sendEmail(
          process.env.ORDER_NOTIFICATIONS_EMAIL,
          'New Newsletter Subscription',
          `New newsletter subscription from ${email}`,
          `<h2>New Newsletter Subscription</h2><p><strong>Email:</strong> ${email}</p><p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>`
        );
      } catch (error) {
        console.error('Email sending failed:', error);
      }
    }
  } else {
    res.status(404).json({ error: 'Not found' });
  }
};

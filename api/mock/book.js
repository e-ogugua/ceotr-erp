const nodemailer = require('nodemailer');
require('dotenv').config();

// Debug log environment variables
console.log('Environment Variables:', {
  SMTP_HOST: process.env.SMTP_HOST ? 'Set' : 'Not set',
  SMTP_PORT: process.env.SMTP_PORT || 'Not set',
  SMTP_USER: process.env.SMTP_USER ? 'Set' : 'Not set',
  SMTP_PASS: process.env.SMTP_PASS ? 'Set' : 'Not set',
  NODE_ENV: process.env.NODE_ENV || 'development'
});

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
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
      response: error.response
    });
    throw error; // Re-throw to handle in the calling function
  }
}

// Vercel serverless function
export default async function handler(req, res) {
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
    console.log('Request received:', {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body
    });

    // Get the pathname from the request
    const pathname = req.url;

    if (pathname === '/api/mock/book') {
      const { name, email, phone, projectDetails, startDate, currency, service, serviceId, timestamp } = req.body;
      
      if (!email) {
        console.error('No email provided in booking request');
        return res.status(400).json({ 
          success: false, 
          message: 'Email is required' 
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
    } else if (pathname === '/api/mock/quote') {
      const { name, email, phone, budgetMin, budgetMax, projectDetails, currency, service, serviceId, timestamp } = req.body;

      res.status(200).json({
        success: true,
        message: 'Quote request submitted successfully',
        quoteId: `QT${Date.now()}`
      });

      if (email) {
        try {
          await sendEmail(
            process.env.ORDER_NOTIFICATIONS_EMAIL,
            'New Quote Request',
            `New quote request from ${name} for ${service}. Contact: ${email}. Budget: ${budgetMin}-${budgetMax}. Project: ${projectDetails}`,
            `<h2>New Quote Request</h2><p><strong>Name:</strong> ${name}</p><p><strong>Service:</strong> ${service}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Budget Range:</strong> ${budgetMin} - ${budgetMax}</p><p><strong>Project Details:</strong> ${projectDetails}</p><p><strong>Currency:</strong> ${currency}</p><p><strong>Timestamp:</strong> ${timestamp}</p>`
          );

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
    } else if (pathname === '/api/mock/contact') {
      const { name, email, phone, subject, message, timestamp } = req.body;

      res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully',
        contactId: `CT${Date.now()}`
      });

      if (email) {
        try {
          await sendEmail(
            process.env.ORDER_NOTIFICATIONS_EMAIL,
            'New Contact Form Submission',
            `New contact from ${name}. Subject: ${subject}. Message: ${message}. Contact: ${email}`,
            `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong> ${message}</p><p><strong>Timestamp:</strong> ${timestamp}</p>`
          );

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
    } else if (pathname === '/api/mock/newsletter') {
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
      res.status(404).json({ error: 'API endpoint not found' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

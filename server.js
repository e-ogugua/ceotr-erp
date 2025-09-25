import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock endpoints
app.post('/api/mock/book', (req, res) => {
  console.log('Booking received:', req.body);
  // Simulate processing delay
  setTimeout(() => {
    res.status(200).json({
      success: true,
      message: 'Booking submitted successfully',
      bookingId: `BK${Date.now()}`
    });
  }, 500);
});

app.post('/api/mock/quote', (req, res) => {
  console.log('Quote request received:', req.body);
  // Simulate processing delay
  setTimeout(() => {
    res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully',
      quoteId: `QT${Date.now()}`
    });
  }, 500);
});

app.post('/api/mock/contact', (req, res) => {
  console.log('Contact form submitted:', req.body);
  // Simulate processing delay
  setTimeout(() => {
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: `CT${Date.now()}`
    });
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

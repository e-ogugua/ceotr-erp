# CEOTR Ltd ERP Suite - API Documentation

## 📋 Overview

The CEOTR Ltd ERP Suite includes a comprehensive mock API server that simulates real backend functionality for development and testing purposes.

## 🚀 API Endpoints

### Base URL
```
Development: http://localhost:3001/api
Production: https://ceotr-ltd-erp-suite.vercel.app/api
```

### 📊 Analytics Endpoints

#### GET /api/analytics
Retrieves real-time business analytics data.

**Response:**
```json
{
  "status": "success",
  "data": {
    "totalProjects": 5,
    "activeClients": 12,
    "revenue": {
      "total": 2500000,
      "monthly": 450000,
      "growth": 15.2
    },
    "services": {
      "construction": { "count": 2, "revenue": 1200000 },
      "it": { "count": 1, "revenue": 800000 },
      "software": { "count": 1, "revenue": 300000 },
      "business": { "count": 1, "revenue": 200000 }
    },
    "projects": [
      {
        "id": "roka-rebrand",
        "title": "Roka Pure Water Rebrand",
        "status": "completed",
        "value": 500000,
        "completionDate": "2025"
      }
    ]
  }
}
```

### 📝 Booking Endpoints

#### POST /api/booking
Submits a new booking request for services.

**Request Body:**
```json
{
  "serviceId": "construction",
  "serviceName": "Building Construction & Supervision",
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "clientPhone": "+234 123 456 7890",
  "projectDescription": "New office building construction",
  "budget": "₦2,500,000 - ₦5,000,000",
  "timeline": "3-6 months",
  "additionalNotes": "Prefer modern architectural design"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Booking request submitted successfully",
  "bookingId": "bk_2025_001",
  "estimatedResponse": "24-48 hours"
}
```

### 💰 Quote Endpoints

#### POST /api/quote
Submits a quote request for services.

**Request Body:**
```json
{
  "serviceId": "software",
  "serviceName": "Software Development",
  "clientName": "Jane Smith",
  "clientEmail": "jane@company.com",
  "clientPhone": "+234 987 654 3210",
  "projectType": "web-application",
  "projectDescription": "Custom CRM system development",
  "budget": "₦1,000,000 - ₦2,500,000",
  "timeline": "2-4 months",
  "technicalRequirements": "React frontend, Node.js backend, PostgreSQL database",
  "additionalNotes": "Must include user authentication and reporting features"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Quote request submitted successfully",
  "quoteId": "qt_2025_001",
  "estimatedResponse": "48-72 hours"
}
```

### 🔍 Health Check Endpoints

#### GET /api/health
Basic health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00Z",
  "version": "2.0.0",
  "uptime": "24h 15m 30s"
}
```

## 🔧 API Configuration

### Mock Data
All API responses use mock data defined in:
- `src/data/demoServices.js` - Project and service data
- `src/components/AnalyticsDashboard.jsx` - Analytics calculations
- `server.js` - API endpoint implementations

### Response Delays
API responses include realistic delays:
- **Booking/Quote submissions:** 1-2 second delay
- **Analytics data:** 500ms delay
- **Health checks:** Instant response

### Error Handling
The API includes comprehensive error handling:
- **400 Bad Request** - Invalid input data
- **404 Not Found** - Endpoint not found
- **500 Internal Server Error** - Server errors
- **Validation errors** - Input validation failures

## 📊 Data Models

### Project Model
```javascript
{
  id: "roka-rebrand",
  title: "Roka Pure Water Rebrand",
  description: "Complete brand revitalization...",
  image: "/images/portfolio/rokafactory.png",
  gallery: ["/images/portfolio/image1.webp", "..."],
  technologies: ["Branding", "Supply Chain", "Business Systems"],
  completionDate: "2025",
  client: "Roka Family Business",
  type: "business-development"
}
```

### Service Model
```javascript
{
  id: "construction",
  title: "Building Construction & Supervision",
  description: "Professional construction services...",
  icon: "Building",
  image: "/images/services/building-construction.png",
  priceRanges: {
    NGN: "₦500K - ₦10M",
    USD: "$600 - $12K",
    GBP: "£500 - £10K"
  },
  features: ["Quality assurance", "Project management", "..."],
  deliverables: ["Complete construction", "Documentation", "..."]
}
```

### Booking Model
```javascript
{
  serviceId: "construction",
  serviceName: "Building Construction & Supervision",
  clientName: "John Doe",
  clientEmail: "john@example.com",
  clientPhone: "+234 123 456 7890",
  projectDescription: "New office building",
  budget: "₦2.5M - ₦5M",
  timeline: "3-6 months",
  additionalNotes: "Modern design preferred"
}
```

## 🔒 Security Considerations

### Input Validation
- All inputs are validated and sanitized
- SQL injection protection measures in place
- XSS protection for all user inputs
- Rate limiting for API endpoints

### CORS Configuration
```javascript
// Server-side CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://ceotr-ltd-erp-suite.vercel.app'
    : 'http://localhost:3001',
  credentials: true
}));
```

### Environment Variables
```bash
# Production environment variables
API_SECRET_KEY=your-secret-key
NODE_ENV=production
VERCEL_URL=https://ceotr-ltd-erp-suite.vercel.app
```

## 🧪 Testing the API

### Using cURL
```bash
# Health check
curl http://localhost:3001/api/health

# Submit booking
curl -X POST http://localhost:3001/api/booking \
  -H "Content-Type: application/json" \
  -d '{"serviceId":"construction","clientName":"Test User"}'

# Get analytics
curl http://localhost:3001/api/analytics
```

### Using JavaScript
```javascript
// API client example
const submitBooking = async (bookingData) => {
  const response = await fetch('/api/booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData)
  });

  return response.json();
};
```

## 🚀 Production Considerations

### Real Backend Integration
When integrating with a real backend:

1. **Update API endpoints** in components
2. **Add authentication** headers
3. **Implement proper error handling**
4. **Add loading states** for API calls
5. **Configure environment variables**

### Monitoring & Logging
- **Error tracking** with Sentry or similar
- **Performance monitoring** with Vercel Analytics
- **API usage logging** for analytics
- **User interaction tracking**

## 📈 API Performance

### Response Times
- **Health checks:** < 50ms
- **Data retrieval:** 100-300ms
- **Form submissions:** 500-1000ms (simulated processing)

### Caching Strategy
- **Static assets:** CDN caching
- **API responses:** Browser caching where appropriate
- **Images:** Optimized with WebP fallbacks

## 🔧 Development

### Adding New Endpoints
1. Add endpoint in `server.js`
2. Update this documentation
3. Add frontend integration
4. Test thoroughly

### API Versioning
Current API version: v1
- All endpoints prefixed with `/api/`
- Version in response headers: `X-API-Version: v1`

---

**API Documentation Version:** 2.0.0 | Last Updated: January 2025

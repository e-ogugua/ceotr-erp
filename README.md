# CEOTR Ltd MVP

A sleek, professional, mobile-first web application for CEO Transnational Resources Limited (CEOTR Ltd).

## Features

- **Mobile-first responsive design** - Optimized for mobile devices with graceful scaling to tablet and desktop
- **Multi-currency support** - Switch between ₦ (Nigerian Naira), $ (USD), and £ (GBP)
- **Service catalog** - Four main services with dynamic pricing
- **Booking system** - Modal-based booking form with validation
- **Quote requests** - Dedicated quote request flow
- **Professional styling** - Clean, corporate design inspired by enterpriza.com

## Services Offered

1. **Building Construction & Supervision** - From foundation to finishing, with professional oversight
2. **IT Services** - Enterprise IT support, systems setup, and network solutions
3. **Software Development** - Websites, apps, and custom digital tools
4. **General Contracting & Business Management** - Procurement, logistics, and strategic project execution

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS (mobile-first utilities)
- **Icons**: Lucide React
- **Backend**: Express.js (mock API server)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ceotr-ltd-mvp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:
```bash
# Option 1: Run both frontend and backend together
npm run dev:full

# Option 2: Run separately
# Terminal 1 - Start the mock API server
npm run server

# Terminal 2 - Start the frontend
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation with currency toggle
│   ├── Hero.jsx           # Landing section with CTAs
│   ├── Services.jsx       # Service catalog display
│   ├── BookingModal.jsx   # Booking form modal
│   ├── QuoteModal.jsx    # Quote request form modal
│   └── Footer.jsx         # Footer with company info
├── context/
│   └── CurrencyContext.jsx # Currency state management
├── config/
│   └── currency.js        # Currency configuration & conversion rates
├── data/
│   └── demoServices.js    # Demo data for services and testimonials
├── App.jsx               # Main application component
└── main.jsx             # Application entry point
```

## Currency Configuration

Currency conversion rates are configured in `src/config/currency.js`. The base currency is Nigerian Naira (₦) with hardcoded conversion rates:

- 1 NGN = 0.0012 USD
- 1 NGN = 0.001 GBP

To update conversion rates, modify the `rate` values in the `CURRENCIES` object.

## Mock API Endpoints

The application includes a mock API server with the following endpoints:

- `POST /api/mock/book` - Submit booking requests
- `POST /api/mock/quote` - Submit quote requests
- `GET /api/health` - Health check endpoint

All form submissions are logged to the console for development purposes.

## Customization

### Adding New Services

1. Add service data to `src/data/demoServices.js`
2. Update the icon mapping in `src/components/Services.jsx`
3. Ensure price ranges are defined for all currencies

### Styling

The application uses TailwindCSS with custom component classes defined in `src/index.css`. Key classes:

- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.card` - Service cards and content containers
- `.input-field` - Form input styling
- `.modal-overlay` - Modal backdrop
- `.modal-content` - Modal container

### Responsive Breakpoints

- `sm: 640px` - Mobile to tablet
- `md: 768px` - Tablet to desktop
- `lg: 1024px` - Desktop enhancements
- `xl: 1280px` - Large desktop

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Environment Variables

No environment variables are required for the MVP. For production:

1. Update the mock API server URL in the form components
2. Add real backend endpoints
3. Configure proper error handling
4. Add analytics tracking

## Development Notes

- The application is designed mobile-first with progressive enhancement
- All interactive elements are keyboard accessible
- Forms include client-side validation
- Currency switching updates all prices instantly
- Mock API responses simulate real server behavior

## Future Enhancements

- Real backend integration
- User authentication
- Payment processing
- Advanced booking calendar
- File upload for project specifications
- Email notifications
- Admin dashboard
- Analytics integration

## Support

For technical support or questions, contact the development team at ceotr@example.com

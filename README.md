# CEOTR Ltd ERP Suite

A comprehensive, enterprise-grade web application for CEO Transnational Resources Limited (CEOTR Ltd) featuring advanced business management, portfolio showcase, analytics, and legal compliance.

## Live Application

- **Development:** `http://localhost:3001`
- **Production:** `https://ceotr-ltd-erp-suite.vercel.app` (after deployment)

## Features

### Core Business Features
- **Multi-currency support** - ₦ (Nigerian Naira), $ (USD), £ (GBP)
- **Service catalog** - Four comprehensive service offerings
- **Interactive portfolio** - Project galleries with lightbox
- **Booking & quote system** - Professional inquiry management
- **Real-time analytics** - Business metrics dashboard
- **Legal compliance** - GDPR, privacy policy, terms of service

### ERP Modules
- **Dashboard** - Real-time business metrics and quick actions
- **Leads** - Customer relationship management
- **Invoices** - Billing and payment tracking
- **Profile** - User settings and authentication

### Advanced UI/UX
- **Mobile-first responsive design** - Optimized for all devices
- **Dynamic hero backgrounds** - Auto-rotating project showcases
- **Interactive galleries** - Professional portfolio with thumbnails
- **Smart image fallbacks** - HEIC → WebP → placeholder system
- **Professional testimonials** - Client feedback with photos
- **Modern animations** - Smooth transitions and effects

### Enterprise Components
- **Analytics Dashboard** - Real-time business metrics
- **Legal Pages Suite** - Privacy, Terms, Cookie Policy
- **Professional Navigation** - Enhanced header and footer
- **Component Library** - Reusable, maintainable code
- **Performance Optimized** - Fast loading and rendering

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Context** - State management
- **React Router** - Client-side routing

### Backend & API
- **Express.js** - Mock API server
- **Node.js** - Server runtime
- **RESTful endpoints** - Professional API structure

### Deployment & DevOps
- **Vercel** - Serverless deployment platform

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ceotr-ltd-erp-suite.git
   cd ceotr-ltd-erp-suite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev:full
   ```


## Quick Start

### Prerequisites
- **Node.js** 18+ and npm package manager
- **Git** for version control

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/e-ogugua/ceotrLtdErpSuite.git
   cd ceotrLtdErpSuite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional for development):**
   ```bash
   # Create .env file with:
   # SMTP_HOST=your-smtp-host
   # SMTP_PORT=587
   # SMTP_USER=your-email@domain.com
   # SMTP_PASS=your-app-password
   # ORDER_EMAIL_FROM=your-email@domain.com
   # ORDER_NOTIFICATIONS_EMAIL=notifications@your-domain.com
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open browser and navigate to:**
   ```
   http://localhost:3001
   ```

### Production Build
```bash
npm run build
# Output: dist/ folder ready for deployment
```

## Project Structure

```
src/
├── components/          # React components organized by feature
│   ├── Header.jsx      # Navigation with currency toggle
│   ├── Hero.jsx        # Main landing section
│   ├── Services.jsx    # Service catalog and testimonials
│   ├── Portfolio.jsx   # Project showcase with galleries
│   ├── Features.jsx    # Feature highlights
│   ├── About.jsx       # Company information and team
│   ├── Contact.jsx     # Contact form and information
│   ├── Footer.jsx      # Site footer with links
│   ├── Dashboard.jsx  # ERP dashboard with metrics
│   ├── Leads.jsx      # Lead management interface
│   ├── Invoices.jsx   # Invoice generation and tracking
│   ├── Profile.jsx    # User profile management
│   └── Legal pages    # Privacy, Terms, Cookie policies
├── context/            # React context providers
│   └── CurrencyContext.jsx # Multi-currency state management
├── data/              # Mock data and configurations
│   └── demoServices.js # Services, projects, team data
├── config/           # Application configuration
│   └── currency.js   # Currency rates and formatting
├── App.jsx           # Main application with routing
└── main.jsx         # Application entry point
```

## Usage

- **Home Page** - Service overview and portfolio showcase
- **Services** - Detailed service offerings and pricing
- **Portfolio** - Project galleries and case studies
- **About** - Company information and team profiles
- **Contact** - Contact forms and business information
- **Dashboard** - Business metrics and quick actions
- **Leads** - Customer relationship management
- **Invoices** - Billing and financial tracking
- **Profile** - User settings and preferences

## Development

### Available Scripts
- `npm run dev` - Start development server with API proxy
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code quality checks

### Code Organization
- **Components** are feature-based and reusable
- **Context** provides global state management
- **Data** layer uses mock data for development
- **Configuration** centralized for easy customization

### Styling Conventions
- **TailwindCSS** for responsive utility classes
- **Custom components** in index.css for complex styles
- **Mobile-first** responsive breakpoints
- **Accessibility** considerations throughout

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Enable automatic deployments on push to master
3. Configure environment variables in Vercel dashboard
4. Deploy with `git push origin master`

### Manual Deployment
1. Run `npm run build` to generate production files
2. Upload `dist/` folder contents to hosting provider
3. Configure API proxy for backend endpoints

## Support

For technical issues or questions:
- **Email:** ceotrlimited@gmail.com
- **Phone:** +234 806 450 8595
- **GitHub Issues:** Report bugs and request features

## Screenshots
Add a hero screenshot here for quick visual context.
![Hero Screenshot](./public/screenshot-hero.png)

## Roadmap
Track progress and upcoming work in the Roadmap:
https://github.com/e-ogugua/ceotr-erp/issues?q=is%3Aissue+Roadmap

## Ecosystem Links
- EmmanuelOS: https://github.com/e-ogugua/emmanuelos
- Portfolio Hub: https://ceodev.vercel.app/

## Links
- Releases: https://github.com/e-ogugua/ceotr-erp/releases
- Security Policy: ./SECURITY.md

---
**CEOTR Ltd ERP Suite — Developed by CEO – Chukwuka Emmanuel Ogugua.**

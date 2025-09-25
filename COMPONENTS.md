# CEOTR Ltd ERP Suite - Component Reference

## 📦 Component Overview

This document provides a comprehensive reference for all components in the CEOTR Ltd ERP Suite, including their props, usage examples, and implementation details.

## 🎯 Core Components

### Header.jsx
**Location:** `src/components/Header.jsx`
**Purpose:** Main navigation header with currency toggle

#### Props
```jsx
Header.propTypes = {
  // No props required - self-contained component
};
```

#### Features
- **Responsive navigation** with mobile menu
- **Multi-currency toggle** (₦, $, £)
- **Professional branding** with company logo
- **Mobile hamburger menu** with animations
- **Currency dropdown** with flag indicators

#### Usage
```jsx
import Header from './components/Header';

// Basic usage - component manages its own state
<Header />
```

#### Dependencies
- React hooks (useState, useEffect)
- CurrencyContext for state management
- Lucide React icons

---

### Hero.jsx
**Location:** `src/components/Hero.jsx`
**Purpose:** Dynamic hero section with rotating backgrounds

#### Props
```jsx
Hero.propTypes = {
  // No props required - uses COMPANY_INFO from demoServices
};
```

#### Features
- **Auto-rotating backgrounds** (8-second intervals)
- **Dynamic content** from company data
- **Call-to-action buttons** with smooth scrolling
- **Trust indicators** and social proof
- **Responsive layout** for all devices

#### Usage
```jsx
import Hero from './components/Hero';

<Hero />
```

#### Background Images
- `hero-background.png` - Primary hero background
- `Hero-background2.png` - Secondary background
- Auto-rotation with smooth transitions

---

### Services.jsx
**Location:** `src/components/Services.jsx`
**Purpose:** Service catalog with testimonials and analytics

#### Props
```jsx
Services.propTypes = {
  // No props required - uses DEMO_SERVICES and DEMO_TESTIMONIALS
};
```

#### Features
- **Service cards** with pricing and features
- **Professional testimonials** with client photos
- **Analytics dashboard** integration
- **Booking and quote modals**
- **Multi-currency pricing** display

#### Usage
```jsx
import Services from './components/Services';

<Services />
```

#### Modal Integration
- **BookingModal** - Service booking forms
- **QuoteModal** - Quote request system
- **CurrencyContext** - Multi-currency support

---

### Portfolio.jsx
**Location:** `src/components/Portfolio.jsx`
**Purpose:** Interactive project portfolio with galleries

#### Props
```jsx
Portfolio.propTypes = {
  // No props required - uses DEMO_PROJECTS
};
```

#### Features
- **Interactive lightbox** with image navigation
- **Thumbnail previews** for all projects
- **Category filtering** system
- **Smart image fallbacks** (HEIC → WebP → placeholder)
- **Professional project showcases**

#### Usage
```jsx
import Portfolio from './components/Portfolio';

<Portfolio />
```

#### Gallery System
- **Main project images** with click-to-expand
- **Thumbnail navigation** (up to 4 visible)
- **Lightbox modal** with navigation controls
- **Image counter** and navigation arrows

---

### Features.jsx
**Location:** `src/components/Features.jsx`
**Purpose:** Marketing features showcase with illustrations

#### Props
```jsx
Features.propTypes = {
  // No props required - self-contained
};
```

#### Features
- **8 feature cards** with icons and descriptions
- **Marketing illustrations** for each feature
- **Hover effects** and animations
- **Responsive grid** layout
- **Call-to-action** section

#### Usage
```jsx
import Features from './components/Features';

<Features />
```

#### Feature Categories
- Innovation & Technology
- Security & Trust
- Expert Team
- Smart Solutions
- Growth Focus
- Global Reach
- Digital Marketing
- Custom Development

---

## 🛠️ Modal Components

### BookingModal.jsx
**Location:** `src/components/BookingModal.jsx`
**Purpose:** Professional booking form for services

#### Props
```jsx
BookingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  service: PropTypes.object  // Selected service data
};
```

#### Features
- **Multi-step form** with validation
- **Service-specific fields** and requirements
- **Contact information** collection
- **Project details** capture
- **Responsive design** for all devices

#### Usage
```jsx
import BookingModal from './components/BookingModal';

<BookingModal
  isOpen={isBookingOpen}
  onClose={() => setIsBookingOpen(false)}
  service={selectedService}
/>
```

---

### QuoteModal.jsx
**Location:** `src/components/QuoteModal.jsx`
**Purpose:** Quote request system for custom projects

#### Props
```jsx
QuoteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  service: PropTypes.object  // Selected service data
};
```

#### Features
- **Detailed project requirements** form
- **Budget and timeline** specifications
- **Technical requirements** capture
- **File upload** capability
- **Professional quote request** flow

#### Usage
```jsx
import QuoteModal from './components/QuoteModal';

<QuoteModal
  isOpen={isQuoteOpen}
  onClose={() => setIsQuoteOpen(false)}
  service={selectedService}
/>
```

---

## 📊 Analytics Components

### AnalyticsDashboard.jsx
**Location:** `src/components/AnalyticsDashboard.jsx`
**Purpose:** Real-time business analytics and metrics

#### Props
```jsx
AnalyticsDashboard.propTypes = {
  // No props required - self-contained
};
```

#### Features
- **Interactive charts** and visualizations
- **Real-time metrics** display
- **Business performance** tracking
- **Revenue and project** analytics
- **Responsive dashboard** layout

#### Usage
```jsx
import AnalyticsDashboard from './components/AnalyticsDashboard';

<AnalyticsDashboard />
```

#### Data Sources
- Project completion data
- Revenue tracking
- Client engagement metrics
- Service performance analytics

---

## ⚖️ Legal Components

### CookiePolicy.jsx
**Location:** `src/components/CookiePolicy.jsx`
**Purpose:** GDPR-compliant cookie consent management

#### Props
```jsx
CookiePolicy.propTypes = {
  // No props required - self-contained
};
```

#### Features
- **Cookie consent** notification
- **GDPR compliance** features
- **Cookie preferences** management
- **Legal compliance** documentation
- **Professional UI** design

#### Usage
```jsx
import CookiePolicy from './components/CookiePolicy';

<CookiePolicy />
```

---

### PrivacyPolicy.jsx
**Location:** `src/components/PrivacyPolicy.jsx**
**Purpose:** Comprehensive privacy policy documentation

#### Props
```jsx
PrivacyPolicy.propTypes = {
  // No props required - static content
};
```

#### Features
- **Data protection** policies
- **User rights** information
- **GDPR compliance** documentation
- **Professional formatting**
- **Print-friendly** layout

#### Usage
```jsx
import PrivacyPolicy from './components/PrivacyPolicy';

<PrivacyPolicy />
```

---

### TermsOfService.jsx
**Location:** `src/components/TermsOfService.jsx`
**Purpose:** Terms of service and legal agreements

#### Props
```jsx
TermsOfService.propTypes = {
  // No props required - static content
};
```

#### Features
- **Service usage terms**
- **Legal protections** for business
- **User agreement** documentation
- **Professional legal** language
- **Comprehensive coverage**

#### Usage
```jsx
import TermsOfService from './components/TermsOfService';

<TermsOfService />
```

---

## 🎨 UI Components

### Footer.jsx
**Location:** `src/components/Footer.jsx`
**Purpose:** Professional footer with navigation and legal links

#### Props
```jsx
Footer.propTypes = {
  // No props required - uses COMPANY_INFO
};
```

#### Features
- **Company information** display
- **Service navigation** links
- **Legal page** links
- **Contact information**
- **Social media** links
- **Professional styling**

#### Usage
```jsx
import Footer from './components/Footer';

<Footer />
```

---

## 🔧 Utility Components

### CurrencyContext
**Location:** `src/context/CurrencyContext.jsx`
**Purpose:** Multi-currency state management

#### Context Provider
```jsx
<CurrencyProvider>
  <App />
</CurrencyProvider>
```

#### Hook Usage
```jsx
import { useCurrency } from '../context/CurrencyContext';

const { currentCurrency, setCurrentCurrency, formatPrice } = useCurrency();
```

#### Features
- **Currency state** management
- **Price formatting** utilities
- **Exchange rate** calculations
- **Persistent storage**

---

## 📱 Responsive Design

### Breakpoints
- **sm:** 640px+ (Mobile to tablet)
- **md:** 768px+ (Tablet to desktop)
- **lg:** 1024px+ (Desktop enhancements)
- **xl:** 1280px+ (Large desktop)

### Mobile-First Approach
All components are designed mobile-first with progressive enhancement:
- Base styles for mobile
- Tablet enhancements at `md:`
- Desktop features at `lg:`
- Large screen optimizations at `xl:`

---

## 🎭 Animation & Effects

### Common Animations
- **Hover effects** on interactive elements
- **Loading states** with pulse animations
- **Slide transitions** for modals
- **Scale transforms** on buttons
- **Opacity transitions** for overlays

### Performance Considerations
- **CSS transforms** for smooth animations
- **GPU acceleration** for better performance
- **Reduced motion** support for accessibility
- **Optimized animation** timing

---

## 🔒 Accessibility Features

### WCAG Compliance
- **Keyboard navigation** for all interactive elements
- **Screen reader** support with proper ARIA labels
- **Color contrast** meeting AA standards
- **Focus indicators** for keyboard users
- **Semantic HTML** structure

### Accessibility Testing
- **Keyboard navigation** testing
- **Screen reader** compatibility
- **Color blindness** considerations
- **High contrast** mode support

---

## 📋 Component Dependencies

### External Libraries
- **React** - Core framework
- **PropTypes** - Type checking
- **Lucide React** - Icon library
- **TailwindCSS** - Styling framework

### Internal Dependencies
- **CurrencyContext** - State management
- **demoServices.js** - Data layer
- **Custom CSS classes** - Styling utilities

---

## 🚀 Performance Optimization

### Component Optimization
- **Lazy loading** for non-critical components
- **Memoization** for expensive calculations
- **Code splitting** for better load times
- **Image optimization** with fallbacks

### Best Practices
- **Functional components** with hooks
- **Minimal re-renders** with proper dependencies
- **Efficient event handlers**
- **Optimized bundle size**

---

## 🧪 Testing Components

### Testing Strategy
```jsx
// Example test structure
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    render(<ComponentName />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockFunction).toHaveBeenCalled();
  });
});
```

### Test Coverage Goals
- **Unit tests** for all components
- **Integration tests** for component interactions
- **Accessibility tests** for WCAG compliance
- **Performance tests** for optimization

---

## 📝 Adding New Components

### Component Template
```jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * ComponentName - Description of component purpose
 * @param {string} propName - Description of prop
 * @returns {JSX.Element} Rendered component
 */
const ComponentName = ({ propName }) => {
  return (
    <div className="component-name">
      <h3>{propName}</h3>
    </div>
  );
};

ComponentName.propTypes = {
  propName: PropTypes.string.isRequired
};

ComponentName.defaultProps = {
  propName: 'Default Value'
};

export default ComponentName;
```

### Integration Steps
1. Create component in `src/components/`
2. Add to `App.jsx` routing if needed
3. Update navigation if applicable
4. Add tests in component file
5. Update this documentation

---

## 🎨 Styling Guidelines

### CSS Classes
- **Tailwind utilities** for responsive design
- **Custom components** in `src/index.css`
- **Consistent spacing** with Tailwind scale
- **Color palette** defined in Tailwind config

### Component Styling
```jsx
// ✅ Good - Uses Tailwind utilities
<div className="bg-white rounded-lg shadow-md p-6">

// ❌ Avoid - Inline styles
<div style={{ backgroundColor: 'white', borderRadius: '8px' }}>
```

---

## 📚 Documentation Updates

When adding or modifying components:

1. **Update this COMPONENTS.md** file
2. **Add JSDoc comments** to component files
3. **Update README.md** if major changes
4. **Add PropTypes** for all props
5. **Include usage examples**

---

**Component Reference Version:** 2.0.0 | Last Updated: January 2025

This comprehensive component reference ensures maintainable, scalable, and well-documented code for the CEOTR Ltd ERP Suite.

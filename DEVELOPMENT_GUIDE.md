# CEOTR Ltd ERP Suite - Development Guide

This guide provides an overview of the project structure, coding conventions, and development practices for the CEOTR Ltd ERP Suite.

## Project Structure

### Directory Overview
```
ceotrLtdErpSuite/
├── src/                    # Source code
│   ├── components/        # React components organized by feature
│   │   ├── Header.jsx    # Navigation with currency toggle
│   │   ├── Hero.jsx      # Main landing section
│   │   ├── Services.jsx  # Service catalog and testimonials
│   │   ├── Portfolio.jsx # Project showcase with galleries
│   │   ├── About.jsx     # Company information and team
│   │   ├── Contact.jsx   # Contact form and information
│   │   ├── Footer.jsx    # Site footer with links
│   │   ├── Dashboard.jsx # ERP dashboard with metrics
│   │   ├── Leads.jsx     # Lead management interface
│   │   ├── Invoices.jsx  # Invoice generation and tracking
│   │   ├── Profile.jsx   # User profile management
│   │   └── Legal/        # Privacy, Terms, Cookie policies
│   ├── context/          # React context providers
│   │   └── CurrencyContext.jsx # Multi-currency state management
│   ├── data/            # Mock data and configurations
│   │   └── demoServices.js     # Services, projects, team data
│   ├── config/         # Application configuration
│   │   └── currency.js # Currency rates and formatting
│   ├── App.jsx        # Main application with routing
│   └── main.jsx      # Application entry point
├── public/           # Static assets
│   ├── images/      # Image assets
│   └── favicon.ico  # Site favicon
├── api/            # API server files
│   └── server.js   # Express.js mock API server
├── dist/          # Production build output
└── docs/          # Documentation files
```

### Component Organization
Components are organized by feature rather than type:

```
components/
├── Navigation/      # Header, Footer, Navigation
├── Landing/        # Hero, Features, About
├── Business/       # Services, Portfolio, Testimonials
├── ERP/           # Dashboard, Leads, Invoices, Profile
├── Legal/         # Privacy, Terms, Cookie policies
└── Common/        # Modals, Buttons, Forms
```

## Coding Conventions

### JavaScript/React

#### Component Structure
```jsx
/**
 * ComponentName - Description of component purpose and functionality
 *
 * Performance Optimizations:
 * - React.memo for re-render prevention
 * - useMemo for expensive calculations
 * - useCallback for event handlers
 * - Lazy loading with React.lazy
 *
 * Features:
 * - Feature description
 * - Another feature
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Component title
 * @returns {JSX.Element} Rendered component
 */
import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const ComponentName = memo(({ title }) => {
  // Memoized calculations
  const processedData = useMemo(() => {
    return data.map(item => processItem(item));
  }, [data]);

  // Memoized event handlers
  const handleClick = useCallback(() => {
    performAction();
  }, []);

  return (
    <div className="component-name">
      <h2>{title}</h2>
      <button onClick={handleClick}>Action</button>
    </div>
  );
});

ComponentName.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object)
};

ComponentName.defaultProps = {
  data: []
};

export default ComponentName;
```

#### State Management
- **React Context** for global state (currency, theme)
- **useState** for local component state
- **useReducer** for complex state logic
- **Custom hooks** for reusable stateful logic

#### Performance Patterns
- **React.memo()** for component memoization
- **useMemo()** for expensive calculations
- **useCallback()** for event handler stability
- **React.lazy()** for code splitting
- **Suspense** for loading states

### Styling Conventions

#### TailwindCSS Usage
```jsx
// Mobile-first responsive design
<div className="px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
      Content
    </div>
  </div>
</div>
```

#### Custom Components
```css
/* In src/index.css */
@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px];
  }

  .card-enhanced {
    @apply bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300;
  }
}
```

#### Responsive Breakpoints
- **xs: 375px** - Custom mobile breakpoint
- **sm: 640px** - Tablet portrait
- **md: 768px** - Tablet landscape
- **lg: 1024px** - Desktop
- **xl: 1280px** - Large desktop

### File Naming Conventions

#### Components
- **PascalCase** for component names: `Header.jsx`, `ServiceCard.jsx`
- **kebab-case** for file names: `header.jsx`, `service-card.jsx`
- **Feature-based** organization: `components/Header/Header.jsx`

#### Assets
- **Lowercase with hyphens**: `hero-background.jpg`, `company-logo.svg`
- **Organized by type**: `images/`, `icons/`, `fonts/`
- **WebP format** preferred with fallbacks

#### Configuration
- **camelCase** for JavaScript files: `currencyConfig.js`
- **kebab-case** for JSON files: `tailwind.config.js`
- **UPPER_SNAKE_CASE** for constants: `API_ENDPOINTS.js`

## Development Workflow

### Daily Development
```bash
# 1. Pull latest changes
git pull origin master

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open http://localhost:3001

# 5. Make changes with hot reload

# 6. Run tests
npm test

# 7. Lint code
npm run lint

# 8. Commit changes
git add .
git commit -m "feat: Add new feature"
```

### Code Quality Checks
```bash
# Lint JavaScript files
npm run lint

# Run tests
npm test

# Build for production
npm run build

# Check bundle analysis
npm run build:analyze
```

### Performance Monitoring
- **Bundle size** tracking with `npm run build:analyze`
- **Lighthouse audits** for performance metrics
- **React DevTools** for component profiling
- **Network tab** monitoring for asset loading

## Testing Strategy

### Component Testing
```javascript
// src/components/__tests__/ComponentName.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from '../ComponentName';

describe('ComponentName', () => {
  it('renders with required props', () => {
    render(<ComponentName title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const mockHandler = jest.fn();
    render(<ComponentName onAction={mockHandler} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('is accessible', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Accessibility Testing
- **WCAG AA compliance** for color contrast
- **Keyboard navigation** testing
- **Screen reader** compatibility
- **Focus management** verification

## Performance Guidelines

### React Optimization
- **Memoize components** that receive frequently changing props
- **Memoize calculations** in components with expensive operations
- **Use callbacks** for event handlers passed to child components
- **Lazy load** route components and heavy libraries

### Image Optimization
- **WebP format** with fallbacks to JPEG/PNG
- **Responsive images** with proper srcSet
- **Lazy loading** for below-the-fold images
- **Proper alt text** for accessibility

### Bundle Optimization
- **Code splitting** with React.lazy
- **Tree shaking** enabled in build configuration
- **Minification** with Terser
- **Bundle analysis** for monitoring

## Deployment Process

### Development
```bash
npm run dev
# Development server with hot reload
```

### Staging
```bash
npm run build
npm run preview
# Test production build locally
```

### Production
```bash
npm run build
# Deploy dist/ folder to hosting platform
```

## Documentation Standards

### Component Documentation
- **JSDoc comments** for all components
- **PropTypes** definitions with descriptions
- **Usage examples** in component comments
- **Performance notes** where applicable

### README Updates
- **Feature descriptions** without hype
- **Setup instructions** with clear steps
- **Code examples** for common tasks
- **Troubleshooting** section for common issues

## Support and Maintenance

### Regular Tasks
- **Dependency updates** every 2-3 months
- **Security patches** applied immediately
- **Performance monitoring** weekly
- **Accessibility testing** monthly

### Issue Tracking
- **GitHub Issues** for bug reports and features
- **Priority labels** for issue management
- **Milestone tracking** for release planning
- **Documentation updates** with code changes

---

**CEOTR Ltd ERP Suite — Developed by CEO – Chukwuka Emmanuel Ogugua.**

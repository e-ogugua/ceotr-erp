/**
 * App.jsx - Main application component for CEOTR Ltd ERP Suite
 *
 * This component serves as the root of the React application, managing routing
 * between different pages and providing the currency context to all child components.
 * It handles both the main marketing website and ERP dashboard functionality.
 *
 * Performance Optimizations:
 * - Lazy loading for all route components to enable code splitting
 * - ERP dashboard routes loaded only when user navigates to them
 * - Legal pages loaded on-demand to reduce initial bundle size
 * - Main homepage components remain in initial bundle for fast loading
 * - Error boundaries for graceful error handling
 *
 * @returns {JSX.Element} The main application with routing and context providers
 */
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CurrencyProvider } from './context/CurrencyContext'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy load components for code splitting - only load when needed
const Header = React.lazy(() => import('./components/Header'))
const Hero = React.lazy(() => import('./components/Hero'))
const Features = React.lazy(() => import('./components/Features'))
const About = React.lazy(() => import('./components/About'))
const Services = React.lazy(() => import('./components/Services'))
const Portfolio = React.lazy(() => import('./components/Portfolio'))
const Contact = React.lazy(() => import('./components/Contact'))
const Footer = React.lazy(() => import('./components/Footer'))

// Lazy load ERP dashboard components - loaded only when user navigates to /dashboard
const Dashboard = React.lazy(() => import('./components/Dashboard'))
const Leads = React.lazy(() => import('./components/Leads'))
const Invoices = React.lazy(() => import('./components/Invoices'))
const Profile = React.lazy(() => import('./components/Profile'))

// Lazy load legal pages - loaded only when user navigates to these routes
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'))
const TermsOfService = React.lazy(() => import('./components/TermsOfService'))
const CookiePolicy = React.lazy(() => import('./components/CookiePolicy'))

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <CurrencyProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={
              <div className="min-h-screen bg-neutral-50">
                <Header />
                <main>
                  <Hero />
                  <Features />
                  <About />
                  <Services />
                  <Portfolio />
                  <Contact />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Routes>
        </Suspense>
      </CurrencyProvider>
    </ErrorBoundary>
  )
}

export default App

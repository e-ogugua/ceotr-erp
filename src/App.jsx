import React from 'react'
import { CurrencyProvider } from './context/CurrencyContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import CookiePolicy from './components/CookiePolicy'

function App() {
  // Check if we're on a specific page route
  const path = window.location.pathname;

  // If on specific pages, render only that component
  if (path === '/privacy-policy') {
    return (
      <CurrencyProvider>
        <PrivacyPolicy />
      </CurrencyProvider>
    );
  }

  if (path === '/terms-of-service') {
    return (
      <CurrencyProvider>
        <TermsOfService />
      </CurrencyProvider>
    );
  }

  if (path === '/cookie-policy') {
    return (
      <CurrencyProvider>
        <CookiePolicy />
      </CurrencyProvider>
    );
  }

  // Default: render the full homepage
  return (
    <CurrencyProvider>
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
    </CurrencyProvider>
  )
}

export default App

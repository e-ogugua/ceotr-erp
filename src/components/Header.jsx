/**
 * Header.jsx - Main navigation component for CEOTR Ltd ERP Suite
 *
 * This component provides the main navigation header with responsive design,
 * currency toggle functionality, and mobile menu support. It displays the company
 * branding and provides navigation to all major sections of the application.
 *
 * Performance Optimizations:
 * - React.memo to prevent unnecessary re-renders when props haven't changed
 * - useMemo for navigation links array to prevent recreation on every render
 * - useCallback for event handlers to prevent child component re-renders
 * - Optimized image loading with fallback system
 * - Proper cleanup of event handlers and intervals
 *
 * Features:
 * - Responsive navigation with mobile hamburger menu
 * - Multi-currency toggle (NGN, USD, GBP)
 * - Professional branding with company logo and fallback
 * - Smooth animations and hover effects
 * - Accessible navigation with proper ARIA labels
 *
 * @returns {JSX.Element} The header navigation component
 */
import React, { useState, useContext, useMemo, useCallback, memo } from 'react';
import { Menu, X, Globe, ChevronDown, Home, Briefcase, FolderOpen, Users, FileText, Settings, BarChart3 } from 'lucide-react';
import { CurrencyContext } from '../context/CurrencyContext';
import { COMPANY_INFO } from '../data/demoServices';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const { currentCurrency, setCurrentCurrency, CURRENCIES } = useContext(CurrencyContext);

  // Memoized navigation links to prevent recreation on every render
  const navigationLinks = useMemo(() => [
    { href: '#services', label: 'Services', icon: <Briefcase size={16} /> },
    { href: '#about', label: 'About', icon: <Users size={16} /> },
    { href: '#portfolio', label: 'Portfolio', icon: <FolderOpen size={16} /> },
    { href: '#contact', label: 'Contact', icon: <FileText size={16} /> }
  ], []);

  // Memoized event handlers to prevent recreation on every render
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const toggleCurrency = useCallback(() => {
    setIsCurrencyOpen(!isCurrencyOpen);
  }, [isCurrencyOpen]);

  // Memoized currency change handlers
  const handleCurrencyChange = useCallback((code) => {
    setCurrentCurrency(code);
    setIsCurrencyOpen(false);
  }, [setCurrentCurrency]);

  const handleMobileCurrencyChange = useCallback((code) => {
    setCurrentCurrency(code);
    setIsMenuOpen(false);
  }, [setCurrentCurrency]);

  // Memoized menu close handler
  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="bg-white backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-neutral-200/60">
      <div className="container-enhanced">
        <div className="flex justify-between items-center py-5 gap-6">
          {/* Enhanced Logo & Branding */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <img
                src="/images/logo/ceotr-logo-white.png"
                alt={COMPANY_INFO.name}
                className="h-20 w-auto logo-enhanced rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md bg-gradient-to-br from-primary-100 to-white backdrop-blur-sm border-2 border-primary-300/50"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="flex items-center gap-3 p-2">
                      <div class="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                        ${COMPANY_INFO.name.charAt(0)}
                      </div>
                      <div>
                        <h1 class="text-xl company-name-bold tracking-tight">${COMPANY_INFO.name}</h1>
                        <p class="text-sm text-neutral-500 -mt-1 font-medium">${COMPANY_INFO.tagline}</p>
                      </div>
                    </div>
                  `;
                }}
                loading="eager" // Load logo immediately for branding
              />
            </div>

            {/* Company Name */}
            <div className="ml-4 hidden sm:block">
              <h1 className="text-xl font-bold text-neutral-800 leading-tight tracking-tight">
                CEO Transnational<br />
                Resources Limited
              </h1>
              <p className="text-sm text-neutral-500 -mt-1 font-medium">
                {COMPANY_INFO.tagline}
              </p>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 max-w-2xl overflow-hidden" role="navigation" aria-label="Main navigation">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-2 py-1 lg:px-3 text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-lg hover:bg-primary-50 group touch-target flex items-center gap-1 text-sm whitespace-nowrap focus-visible"
                aria-label={`Navigate to ${link.label}`}
              >
                {link.icon}
                <span className="hidden lg:inline">{link.label}</span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></div>
              </a>
            ))}
          </nav>

          {/* Enhanced Currency Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Enhanced Currency Toggle */}
            <div className="relative">
              <button
                onClick={toggleCurrency}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 px-3 py-2 rounded-lg font-medium text-primary-700 transition-all duration-300 shadow-sm hover:shadow-md border border-primary-200/50 min-h-[44px]"
                aria-label="Select currency"
                aria-expanded={isCurrencyOpen}
                aria-haspopup="listbox"
              >
                <Globe size={16} />
                <span>{CURRENCIES[currentCurrency].symbol}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isCurrencyOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Currency Dropdown */}
              {isCurrencyOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50 animate-slide-in" role="listbox" aria-label="Currency options">
                  {Object.entries(CURRENCIES).map(([code, config]) => (
                    <button
                      key={code}
                      onClick={() => handleCurrencyChange(code)}
                      className={`w-full px-4 py-2 text-left hover:bg-primary-50 transition-colors duration-200 flex items-center gap-3 ${currentCurrency === code ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-neutral-700'}`}
                      role="option"
                      aria-selected={currentCurrency === code}
                    >
                      <span className="text-lg font-bold">{config.symbol}</span>
                      <span className="text-sm">{config.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Currency Toggle */}
            <div className="sm:hidden">
              <select
                value={currentCurrency}
                onChange={(e) => setCurrentCurrency(e.target.value)}
                className="text-sm font-semibold text-primary-600 bg-transparent border-2 border-primary-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px]"
                aria-label="Select currency"
              >
                {Object.entries(CURRENCIES).map(([code, config]) => (
                  <option key={code} value={code} className="font-semibold">
                    {config.symbol} {config.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-3 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 shadow-sm hover:shadow-md border border-neutral-200/50 min-h-[44px]"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              <div className="relative w-6 h-6">
                <Menu size={24} className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X size={24} className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200/50 py-6 bg-white/95 backdrop-blur-md" id="mobile-navigation" role="navigation" aria-label="Mobile navigation">
            <nav className="flex flex-col space-y-2">
              {navigationLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-lg hover:bg-primary-50 mx-2"
                  onClick={closeMobileMenu}
                  style={{ animationDelay: `${index * 50}ms` }}
                  role="menuitem"
                >
                  <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                  {link.label}
                </a>
              ))}

              {/* Mobile Currency Selector */}
              <div className="px-4 py-3 mx-2">
                <div className="text-sm font-semibold text-neutral-500 mb-3">Select Currency</div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(CURRENCIES).map(([code, config]) => (
                    <button
                      key={code}
                      onClick={() => handleMobileCurrencyChange(code)}
                      className={`p-3 rounded-lg font-semibold transition-all duration-300 ${currentCurrency === code ? 'bg-primary-600 text-white shadow-lg' : 'bg-neutral-100 text-neutral-700 hover:bg-primary-100'}`}
                      aria-label={`Select ${config.name}`}
                      role="option"
                      aria-selected={currentCurrency === code}
                    >
                      {config.symbol}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}

        {/* Click outside to close dropdowns */}
        {(isCurrencyOpen || isMenuOpen) && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setIsCurrencyOpen(false);
              setIsMenuOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsCurrencyOpen(false);
                setIsMenuOpen(false);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Close menus"
          />
        )}
      </div>
    </header>
  );
});

export default Header; 

import React, { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import { CurrencyContext } from '../context/CurrencyContext';
import { COMPANY_INFO } from '../data/demoServices';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentCurrency, setCurrentCurrency, CURRENCIES } = useContext(CurrencyContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/logo/ceotr-logo-white.png"
              alt={COMPANY_INFO.name}
              className="h-10 w-auto"
              onError={(e) => {
                // Fallback to text logo if image fails to load
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<h1 class="text-2xl font-bold text-primary-600">${COMPANY_INFO.name}</h1>`;
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
              Services
            </a>
            <a href="#about" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
              About
            </a>
            <a href="#portfolio" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Currency Toggle */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center bg-neutral-100 rounded-lg p-1">
              {Object.entries(CURRENCIES).map(([code, config]) => (
                <button
                  key={code}
                  onClick={() => setCurrentCurrency(code)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    currentCurrency === code
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-800'
                  }`}
                >
                  {config.symbol}
                </button>
              ))}
            </div>

            {/* Mobile Currency Toggle */}
            <div className="sm:hidden">
              <select
                value={currentCurrency}
                onChange={(e) => setCurrentCurrency(e.target.value)}
                className="text-sm font-medium text-primary-600 bg-transparent border-none focus:outline-none"
              >
                {Object.entries(CURRENCIES).map(([code, config]) => (
                  <option key={code} value={code}>
                    {config.symbol}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#services"
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#about"
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#portfolio"
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </a>
              <a
                href="#contact"
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

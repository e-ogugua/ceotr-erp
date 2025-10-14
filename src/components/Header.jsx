import React, { useState, useContext } from 'react';
import { Menu, X, Globe, ChevronDown, Home, Briefcase, FolderOpen, Users, FileText, Settings, BarChart3 } from 'lucide-react';
import { CurrencyContext } from '../context/CurrencyContext';
import { COMPANY_INFO } from '../data/demoServices';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const { currentCurrency, setCurrentCurrency, CURRENCIES } = useContext(CurrencyContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCurrency = () => {
    setIsCurrencyOpen(!isCurrencyOpen);
  };

  const navigationLinks = [
    { href: '#services', label: 'Services', icon: <Briefcase size={16} /> },
    { href: '#about', label: 'About', icon: <Users size={16} /> },
    { href: '#portfolio', label: 'Portfolio', icon: <FolderOpen size={16} /> },
    { href: '#contact', label: 'Contact', icon: <FileText size={16} /> },
    { href: '/dashboard', label: 'Dashboard', icon: <BarChart3 size={16} /> },
    { href: '/projects', label: 'Projects', icon: <FolderOpen size={16} /> },
    { href: '/inventory', label: 'Inventory', icon: <BarChart3 size={16} /> },
    { href: '/leads', label: 'Leads', icon: <Users size={16} /> },
    { href: '/invoices', label: 'Invoices', icon: <FileText size={16} /> },
    { href: '/profile', label: 'Profile', icon: <Settings size={16} /> }
  ];

  return (
    <header className="bg-white/98 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-neutral-200/60">
      <div className="container-enhanced">
        <div className="flex justify-between items-center py-5">
          {/* Enhanced Logo & Branding */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <img
                src="/images/logo/ceotr-logo-white.png"
                alt={COMPANY_INFO.name}
                className="h-16 w-auto logo-enhanced rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md bg-gradient-to-br from-primary-50 to-white backdrop-blur-sm border border-primary-200/50"
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
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 lg:px-5 lg:py-3 text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-lg hover:bg-primary-50 group touch-target flex items-center gap-2 text-sm"
              >
                {link.icon}
                <span className="hidden lg:inline">{link.label}</span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></div>
              </a>
            ))}
          </nav>

          {/* Enhanced Currency Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Enhanced Currency Toggle */}
            <div className="relative">
              <button
                onClick={toggleCurrency}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 px-4 py-2 rounded-xl font-medium text-primary-700 transition-all duration-300 shadow-sm hover:shadow-md border border-primary-200/50"
              >
                <Globe size={18} />
                <span>{CURRENCIES[currentCurrency].symbol}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isCurrencyOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Currency Dropdown */}
              {isCurrencyOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50 animate-slide-in">
                  {Object.entries(CURRENCIES).map(([code, config]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrentCurrency(code);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-primary-50 transition-colors duration-200 flex items-center gap-3 ${currentCurrency === code ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-neutral-700'}`}
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
                className="text-sm font-semibold text-primary-600 bg-transparent border-2 border-primary-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
              className="md:hidden p-3 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 shadow-sm hover:shadow-md border border-neutral-200/50"
              aria-label="Toggle menu"
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
          <div className="md:hidden border-t border-neutral-200/50 py-6 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-2">
              {navigationLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-lg hover:bg-primary-50 mx-2"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
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
                      onClick={() => {
                        setCurrentCurrency(code);
                        setIsMenuOpen(false);
                      }}
                      className={`p-3 rounded-lg font-semibold transition-all duration-300 ${currentCurrency === code ? 'bg-primary-600 text-white shadow-lg' : 'bg-neutral-100 text-neutral-700 hover:bg-primary-100'}`}
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
          />
        )}
      </div>
    </header>
  );
};

export default Header; 

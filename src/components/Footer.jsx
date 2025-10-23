/**
 * Footer.jsx - Footer component for CEOTR Ltd ERP Suite
 *
 * This component provides the site footer with company information,
 * navigation links, social media links, and legal page links.
 * It displays contact information and maintains consistent branding
 * throughout the application.
 *
 * Features:
 * - Company branding and contact information
 * - Quick navigation links with smooth scrolling
 * - Social media integration
 * - Legal page links (Privacy, Terms, Cookies)
 * - Responsive layout for all device sizes
 * - Professional styling with dark theme
 *
 * @returns {JSX.Element} The footer component
 */
import React from 'react';
import { COMPANY_INFO } from '../data/demoServices';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo/ceotr-logo-white.png"
                alt={COMPANY_INFO.name}
                className="h-10 w-auto rounded-lg shadow-sm bg-gradient-to-br from-primary-50 to-white border border-primary-200/50"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="hidden" style={{display: 'none'}}>
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                  {COMPANY_INFO.name.charAt(0)}
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-primary-400 mb-4">{COMPANY_INFO.name}</h3>
            <p className="text-neutral-300 mb-4">
              {COMPANY_INFO.fullName}
            </p>
            <p className="text-neutral-400 text-sm mb-6">
              Professional services for construction, IT solutions, business consulting, and software development.
              We deliver quality results with expertise and dedication.
            </p>
            <div className="flex space-x-4">
              <a
                href={COMPANY_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
              >
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a
                href={COMPANY_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
              >
                <span className="text-sm font-medium">Instagram</span>
              </a>
              <a
                href={COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
              >
                <span className="text-sm font-medium">Facebook</span>
              </a>
              <a
                href={COMPANY_INFO.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
              >
                <span className="text-sm font-medium">Twitter</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#services" className="hover:text-primary-400 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-primary-400 transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <button
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-primary-400 transition-colors text-left w-full"
                >
                  General Contracting
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-primary-400 transition-colors text-left w-full"
                >
                  IT Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-primary-400 transition-colors text-left w-full"
                >
                  Business Consulting
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-primary-400 transition-colors text-left w-full"
                >
                  Software Development
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <p className="text-neutral-400 text-sm">
                © 2025 {COMPANY_INFO.name} — {COMPANY_INFO.fullName}. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 justify-end text-sm text-neutral-400">
              <a href="/privacy-policy" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-primary-400 transition-colors">Terms of Service</a>
              <a href="/cookie-policy" className="hover:text-primary-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-neutral-500 text-xs bg-neutral-800 px-2 py-1 rounded">v4.0.0</span>
              <span className="text-neutral-500 text-xs bg-neutral-800 px-2 py-1 rounded">Built with React & Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

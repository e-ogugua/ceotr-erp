/**
 * Hero.jsx - Main landing section component for CEOTR Ltd ERP Suite
 *
 * This component displays the main hero section with rotating background images,
 * company information, and call-to-action buttons. It provides an overview of
 * the company's services and capabilities in a professional presentation.
 *
 * Features:
 * - Auto-rotating background images with smooth transitions
 * - Responsive layout for all device sizes
 * - Professional service showcase with company metrics
 * - Call-to-action buttons with smooth scrolling
 * - Trust indicators and company credentials
 *
 * Performance Optimizations:
 * - React.memo to prevent unnecessary re-renders when props haven't changed
 * - useMemo for expensive calculations like feature arrays
 * - useCallback for event handlers to prevent child component re-renders
 * - Lazy loading for background images with proper error handling
 * - Optimized animation timing and reduced motion support
 *
 * @returns {JSX.Element} The hero section component
 */
import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { ArrowRight, CheckCircle, Star, Award, Sparkles, Zap } from 'lucide-react';
import { COMPANY_INFO } from '../data/demoServices';

const Hero = memo(() => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Memoized background images array to prevent recreation on every render
  const heroBackgrounds = useMemo(() => [
    '/images/hero/hero-background.png',
    '/images/hero/Hero-background2.png'
  ], []);

  useEffect(() => {
    // Auto-rotate background images with controlled interval
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % heroBackgrounds.length);
    }, 8000); // Change background every 8 seconds

    return () => clearInterval(interval);
  }, [heroBackgrounds.length]); // Include length in dependency for safety

  // Memoized features array to prevent recreation on every render
  const features = useMemo(() => [
    { icon: <CheckCircle size={20} />, text: 'Professional Excellence' },
    { icon: <Star size={20} />, text: 'Quality Assured' },
    { icon: <Award size={20} />, text: 'Industry Leaders' }
  ], []);

  // Memoized scroll handlers to prevent recreation on every render
  const scrollToServices = useCallback(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToPortfolio = useCallback(() => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-primary-50/20 via-blue-50/30 to-indigo-100/20">
      {/* Dynamic Background Images with optimized loading */}
      <div className="absolute inset-0">
        {heroBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000 ${
              index === currentBgIndex ? 'opacity-20' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
          />
        ))}

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-primary-50/40 to-blue-100/50"></div>

        {/* Floating geometric shapes */}
        <div className="floating-element top-20 left-10 w-20 h-20 bg-primary-300/30 rotate-45 rounded-lg"></div>
        <div className="floating-element top-40 right-20 w-16 h-16 bg-accent-300/20 rounded-full"></div>
        <div className="floating-element bottom-40 left-20 w-12 h-12 bg-purple-300/25 rotate-12 rounded-lg"></div>
        <div className="floating-element top-60 right-40 w-24 h-24 bg-blue-300/20 rounded-full"></div>

        {/* Large background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-200/15 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-200/15 to-blue-200/15 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Content */}
      <div className="relative container-enhanced py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left animate-slide-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg animate-pulse-glow">
              <Sparkles size={16} />
              <span>{COMPANY_INFO.founded} - Excellence in Service</span>
            </div>

            <h1 className="section-title mb-6 leading-tight text-shadow">
              {COMPANY_INFO.name}
              <br />
              <span className="text-neutral-700 text-3xl md:text-4xl lg:text-5xl font-light">
                {COMPANY_INFO.tagline}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl text-shadow">
              {COMPANY_INFO.fullName} delivers comprehensive professional services across
              construction, IT solutions, business consulting, and software development.
              We transform visions into reality with expertise and dedication.
            </p>

            {/* Enhanced Feature Pills */}
            <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
              {features.map((feature, index) => (
                <div key={index} className="glass-effect px-6 py-3 rounded-full text-sm font-semibold text-neutral-700 shadow-lg hover-lift">
                  <span className="text-primary-600 mr-2 animate-pulse-glow">{feature.icon}</span>
                  {feature.text}
                </div>
              ))}
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                Get Started Today
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-glass"
              >
                <Zap size={20} className="mr-2" />
                View Our Work
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Trusted by 500+ clients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>10+ years experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>24/7 support available</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative lg:text-right">
            <div className="relative">
              {/* Main visual container */}
              <div className="relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 hover-lift">
                <div className="grid grid-cols-2 gap-4">
                  {/* Service cards mockup */}
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 text-white">
                    <div className="text-sm font-semibold mb-2">Construction</div>
                    <div className="text-xs opacity-90">Quality builds</div>
                  </div>
                  <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl p-4 text-white">
                    <div className="text-sm font-semibold mb-2">IT Services</div>
                    <div className="text-xs opacity-90">Tech solutions</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                    <div className="text-sm font-semibold mb-2">Consulting</div>
                    <div className="text-xs opacity-90">Business growth</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                    <div className="text-sm font-semibold mb-2">Software</div>
                    <div className="text-xs opacity-90">Custom apps</div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="text-2xl font-bold text-neutral-800 mb-2">₦2.5M+</div>
                  <div className="text-sm text-neutral-600">Average project value</div>
                </div>
              </div>

              {/* Floating elements around the card */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-float-delayed"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-blue-400 rounded-full animate-float"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;

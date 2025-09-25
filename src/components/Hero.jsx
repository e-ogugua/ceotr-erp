import React from 'react';
import { ArrowRight, CheckCircle, Star, Award } from 'lucide-react';
import { COMPANY_INFO } from '../data/demoServices';

const Hero = () => {
  const features = [
    { icon: <CheckCircle size={20} />, text: 'Professional Excellence' },
    { icon: <Star size={20} />, text: 'Quality Assured' },
    { icon: <Award size={20} />, text: 'Industry Leaders' }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/others/business-growth.png')] bg-cover bg-center"></div>
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {COMPANY_INFO.founded} - Excellence in Service
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              <span className="text-gradient">{COMPANY_INFO.name}</span>
              <br />
              <span className="text-neutral-700">{COMPANY_INFO.tagline}</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl">
              {COMPANY_INFO.fullName} delivers comprehensive professional services across
              construction, IT solutions, business consulting, and software development.
              We transform visions into reality with expertise and dedication.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-neutral-700 shadow-sm">
                  <span className="text-primary-600">{feature.icon}</span>
                  {feature.text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button
                className="btn-primary flex items-center gap-2 text-lg px-8 py-4 w-full sm:w-auto group"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Our Services
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="btn-secondary flex items-center gap-2 text-lg px-8 py-4 w-full sm:w-auto"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Our Work
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-neutral-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">50+</div>
                <div className="text-sm text-neutral-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">10+</div>
                <div className="text-sm text-neutral-600">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">100%</div>
                <div className="text-sm text-neutral-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Content */}
          <div className="relative">
            {/* Main Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                <img
                  src="/images/hero/hero-background.png"
                  alt="CEOTR Ltd Hero"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                        <div class="text-center text-white">
                          <div class="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                            <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                            </svg>
                          </div>
                          <h3 class="text-xl font-semibold">Professional Excellence</h3>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Construction</div>
                    <div className="text-sm text-neutral-600">Excellence</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Technology</div>
                    <div className="text-sm text-neutral-600">Innovation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
    </section>
  );
};

export default Hero;

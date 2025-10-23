/**
 * Services.jsx - Service catalog component for CEOTR Ltd ERP Suite
 *
 * This component displays the company's service offerings with detailed information,
 * pricing in multiple currencies, and integration with booking and quote systems.
 * It includes client testimonials and call-to-action sections.
 *
 * Performance Optimizations:
 * - React.memo to prevent unnecessary re-renders when props haven't changed
 * - useMemo for expensive calculations and derived state
 * - useCallback for event handlers to prevent child component re-renders
 * - Optimized modal state management
 * - Currency context integration with memoized calculations
 *
 * Features:
 * - Professional service cards with pricing and features
 * - Multi-currency pricing display
 * - Client testimonials with ratings
 * - Booking and quote modal integration
 * - Responsive grid layout for all devices
 * - Analytics dashboard integration
 *
 * @returns {JSX.Element} The services catalog component
 */
import React, { useState, useContext, useMemo, useCallback, memo } from 'react';
import { Building, Server, Code, Briefcase, ArrowRight, Star, CheckCircle, Phone, Calendar } from 'lucide-react';
import { CurrencyContext } from '../context/CurrencyContext';
import { DEMO_SERVICES, DEMO_TESTIMONIALS } from '../data/demoServices';
import BookingModal from './BookingModal';
import QuoteModal from './QuoteModal';
import AnalyticsDashboard from './AnalyticsDashboard';

const Services = memo(() => {
  const { currentCurrency } = useContext(CurrencyContext);
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Memoized icon mapping to prevent recreation on every render
  const iconMap = useMemo(() => ({
    'Building': Building,
    'Server': Server,
    'Code': Code,
    'Briefcase': Briefcase,
  }), []);

  // Memoized event handlers to prevent recreation on every render
  const handleBookNow = useCallback((service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  }, []);

  const handleRequestQuote = useCallback((service) => {
    setSelectedService(service);
    setIsQuoteModalOpen(true);
  }, []);

  const closeModals = useCallback(() => {
    setIsBookingModalOpen(false);
    setIsQuoteModalOpen(false);
    setSelectedService(null);
  }, []);

  return (
    <>
      <section id="services" className="py-16 md:py-24 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
        <div className="container-enhanced">
          {/* Analytics Dashboard */}
          <AnalyticsDashboard />

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-slide-in">
              <Star size={16} className="animate-pulse-glow" />
              Our Expertise
            </div>
            <h2 className="section-title mb-4">
              Our Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Professional solutions tailored to your business needs with competitive pricing
              and guaranteed quality delivery across all our service areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {DEMO_SERVICES.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Building;

              return (
                <div key={service.id} className="enhanced-card group">
                  {/* Service Image with overlay */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 rounded-t-3xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                            <div class="text-center text-white">
                              <div class="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                                </svg>
                              </div>
                              <h3 class="text-xl font-semibold">Professional Excellence</h3>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="gradient-overlay"></div>
                    <div className="price-badge">
                      From {service.priceRanges[currentCurrency]}
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300">
                        <IconComponent className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Key Features */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-neutral-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-neutral-600">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-sm text-primary-600 font-medium">
                            +{service.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleBookNow(service)}
                        className="flex-1 btn-primary flex items-center justify-center gap-2 group/btn"
                      >
                        <Calendar size={18} />
                        Book Now
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => handleRequestQuote(service)}
                        className="px-4 py-3 bg-white border-2 border-primary-200 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-all duration-300 flex items-center justify-center"
                      >
                        <Phone size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Testimonials Section */}
          <div className="mt-20 pt-16 border-t border-neutral-200">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                What Our Clients Say
              </h3>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied clients have to say
                about our professional services and dedication to excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {DEMO_TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="feature-card p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-neutral-700 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0">
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<div class="w-full h-full bg-primary-200 rounded-full flex items-center justify-center"><span class="text-primary-700 font-semibold text-sm">${testimonial.name.split(' ').map(n => n[0]).join('')}</span></div>`;
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                      <div className="text-sm text-neutral-600">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl p-8 md:p-12 shadow-xl animate-pulse-glow">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-primary-100 mb-8 text-lg max-w-2xl mx-auto">
                Join hundreds of satisfied clients who trust CEOTR Ltd for their
                construction, technology, and business development needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-glass"
                >
                  Schedule Consultation
                </button>
                <button
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  View All Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeModals}
        service={selectedService}
      />
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={closeModals}
        service={selectedService}
      />
    </>
  );
});

export default Services;

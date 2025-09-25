import React, { useState, useContext } from 'react';
import { Building, Server, Code, Briefcase, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { CurrencyContext } from '../context/CurrencyContext';
import { DEMO_SERVICES } from '../data/demoServices';
import BookingModal from './BookingModal';
import QuoteModal from './QuoteModal';

const iconMap = {
  Building,
  Server,
  Code,
  Briefcase,
};

const Services = () => {
  const { currentCurrency } = useContext(CurrencyContext);
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleBookNow = (service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleRequestQuote = (service) => {
    setSelectedService(service);
    setIsQuoteModalOpen(true);
  };

  const closeModals = () => {
    setIsBookingModalOpen(false);
    setIsQuoteModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Professional solutions tailored to your business needs with competitive pricing
            and guaranteed quality delivery across all our service areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {DEMO_SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon];

            return (
              <div key={service.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
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
                            <h3 class="font-semibold">${service.title}</h3>
                          </div>
                        </div>
                      `;
                    }}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Service Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-neutral-700 shadow-sm">
                    Service #{index + 1}
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary-100 rounded-xl group-hover:bg-primary-200 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-neutral-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-neutral-700 mb-3 flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-neutral-600">
                          <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-500">Starting from</span>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-neutral-600">4.9/5</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      {service.priceRanges[currentCurrency]}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">
                      *Price varies by project scope
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleBookNow(service)}
                      className="flex-1 btn-primary group/btn"
                    >
                      Book Now
                      <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => handleRequestQuote(service)}
                      className="flex-1 btn-secondary"
                    >
                      Request Quote
                    </button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl shadow-sm border border-primary-200">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-current" />
                ))}
              </div>
              <blockquote className="text-neutral-700 mb-6 italic leading-relaxed">
                "CEOTR Ltd transformed our project execution. From planning to delivery,
                everything was transparent and professional. Their IT dashboard kept us
                updated at every step."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-semibold">PO</span>
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">Paul Okeke</div>
                  <div className="text-sm text-neutral-600">Okeke Realty</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-8 rounded-2xl shadow-sm border border-accent-200">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-current" />
                ))}
              </div>
              <blockquote className="text-neutral-700 mb-6 italic leading-relaxed">
                "Working with CEOTR Ltd was a turning point for our agribusiness.
                Their team brought structure, technology, and growth strategies that
                took us to the next level."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-200 rounded-full flex items-center justify-center">
                  <span className="text-accent-700 font-semibold">NE</span>
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">Ngozi Eze</div>
                  <div className="text-sm text-neutral-600">Nkpala Agro Ventures</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl p-8 md:p-12 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-primary-100 mb-8 text-lg max-w-2xl mx-auto">
              Join hundreds of satisfied clients who trust CEOTR Ltd for their
              construction, technology, and business development needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg font-semibold transition-colors">
                Schedule Consultation
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold transition-all">
                View All Services
              </button>
            </div>
          </div>
        </div>
      </div>

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
    </section>
  );
};

export default Services;

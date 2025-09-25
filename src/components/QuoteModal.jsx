import React, { useState, useContext } from 'react';
import { X } from 'lucide-react';
import { CurrencyContext } from '../context/CurrencyContext';

const QuoteModal = ({ isOpen, onClose, service }) => {
  const { currentCurrency, CURRENCIES } = useContext(CurrencyContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budgetMin: '',
    budgetMax: '',
    projectDetails: '',
    currency: currentCurrency
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API call
    try {
      const response = await fetch('/api/mock/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: service?.title,
          serviceId: service?.id,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        console.log('Quote request submitted:', {
          ...formData,
          service: service?.title,
          serviceId: service?.id
        });
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
          setShowSuccess(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            budgetMin: '',
            budgetMax: '',
            projectDetails: '',
            currency: currentCurrency
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Quote submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setShowSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        budgetMin: '',
        budgetMax: '',
        projectDetails: '',
        currency: currentCurrency
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">
              Request Quote for {service?.title}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>
          </div>

          {showSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Quote Request Received!
              </h3>
              <p className="text-neutral-600">
                Your request was received. We'll send you a tailored proposal soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your phone number"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budgetMin" className="block text-sm font-medium text-neutral-700 mb-2">
                    Budget Range (Min) *
                  </label>
                  <input
                    type="number"
                    id="budgetMin"
                    name="budgetMin"
                    required
                    value={formData.budgetMin}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Minimum budget"
                    disabled={isSubmitting}
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="budgetMax" className="block text-sm font-medium text-neutral-700 mb-2">
                    Budget Range (Max) *
                  </label>
                  <input
                    type="number"
                    id="budgetMax"
                    name="budgetMax"
                    required
                    value={formData.budgetMax}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Maximum budget"
                    disabled={isSubmitting}
                    min={formData.budgetMin || 0}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectDetails" className="block text-sm font-medium text-neutral-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  rows={4}
                  required
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  className="input-field resize-none"
                  placeholder="Describe your project requirements and specifications..."
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-neutral-700 mb-2">
                  Preferred Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="input-field"
                  disabled={isSubmitting}
                >
                  {Object.entries(CURRENCIES).map(([code, config]) => (
                    <option key={code} value={code}>
                      {config.symbol} {config.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Quote'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;

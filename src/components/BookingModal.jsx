import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { X, Calendar } from 'lucide-react';
import { CurrencyContext } from '../context/CurrencyContext';

const BookingModal = ({ isOpen, onClose, service }) => {
  const { currentCurrency, CURRENCIES } = useContext(CurrencyContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDetails: '',
    startDate: '',
    currency: currentCurrency
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    setShowError(false);
    setErrorMessage('');

    try {
      const response = await fetch('/api/mock/book', {
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
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
          setShowSuccess(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            projectDetails: '',
            startDate: '',
            currency: currentCurrency
          });
        }, 3000);
      } else {
        throw new Error('Failed to submit booking');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setErrorMessage('Failed to submit booking. Please try again or contact us directly.');
      setShowError(true);
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
        projectDetails: '',
        startDate: '',
        currency: currentCurrency
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose} onKeyDown={(e) => { if (e.key === 'Escape') handleClose(); }} tabIndex={0} role="button" aria-label="Close booking modal">
      <div className="modal-content" onClick={e => e.stopPropagation()} onKeyDown={(e) => { if (e.key === 'Escape') handleClose(); }} tabIndex={0} role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900" id="booking-modal-title">
              Book {service?.title}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              disabled={isSubmitting}
              aria-label="Close booking modal"
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
                Booking Submitted Successfully!
              </h3>
              <p className="text-neutral-600 mb-4">
                Thank you for your booking request. We've received your details and will contact you within 24 hours to confirm your booking.
              </p>
              <p className="text-sm text-primary-600">
                A confirmation email has also been sent to your email address.
              </p>
            </div>
          ) : showError ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Failed to Submit Booking
              </h3>
              <p className="text-neutral-600 mb-4">
                {errorMessage}
              </p>
              <button
                onClick={() => setShowError(false)}
                className="btn-secondary"
              >
                Try Again
              </button>
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

              <div>
                <label htmlFor="projectDetails" className="block text-sm font-medium text-neutral-700 mb-2">
                  Project Details
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  rows={4}
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  className="input-field resize-none"
                  placeholder="Describe your project requirements..."
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-2">
                    Preferred Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="input-field pl-12"
                      disabled={isSubmitting}
                    />
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-neutral-700 mb-2">
                    Currency
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
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

BookingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    priceRanges: PropTypes.object,
    features: PropTypes.array
  })
};

export default BookingModal;

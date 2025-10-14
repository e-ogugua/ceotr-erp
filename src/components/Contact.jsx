import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/demoServices';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact Form: ${formData.subject}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}

---
This message was sent from the CEOTR Ltd website contact form.
    `);

    const mailtoUrl = `mailto:ceotrlimited@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');

    // Reset form and show success
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: 'Office Address',
      details: [COMPANY_INFO.headquarters]
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone Numbers',
      details: COMPANY_INFO.phone
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Addresses',
      details: COMPANY_INFO.email
    },
    {
      icon: <Clock size={24} />,
      title: 'Business Hours',
      details: [COMPANY_INFO.businessHours]
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Ready to start your next project? Get in touch with our team to discuss your requirements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                Get In Touch
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-primary-600 mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-1">
                        {info.title}
                      </h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-neutral-600 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <h4 className="font-medium text-neutral-900 mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a
                    href={COMPANY_INFO.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                  >
                    <span className="text-sm font-bold">LI</span>
                  </a>
                  <a
                    href={COMPANY_INFO.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                  >
                    <span className="text-sm font-bold">IG</span>
                  </a>
                  <a
                    href={COMPANY_INFO.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                  >
                    <span className="text-sm font-bold">FB</span>
                  </a>
                  <a
                    href={COMPANY_INFO.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                  >
                    <span className="text-sm font-bold">TW</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                Send Us a Message
              </h3>

              {showSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-neutral-900 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-neutral-600">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="input-field"
                      disabled={isSubmitting}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="quote">Request Quote</option>
                      <option value="booking">Book a Service</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership Opportunity</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="input-field resize-none"
                      placeholder="Tell us about your project or inquiry..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

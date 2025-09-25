import React from 'react';
import { ArrowLeft, Shield, FileText, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/demoServices';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200/50">
        <div className="container-enhanced py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div className="h-6 w-px bg-neutral-300"></div>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary-600" />
              <h1 className="text-2xl font-bold text-neutral-900">Privacy Policy</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-enhanced py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">Privacy Policy</h2>
                    <p className="text-neutral-600">Last updated: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">1. Information We Collect</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      At {COMPANY_INFO.fullName}, we are committed to protecting your privacy and ensuring the security of your personal information.
                    </p>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Personal Information:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Name and contact information</li>
                        <li>Email address and phone number</li>
                        <li>Company information and project details</li>
                        <li>Communication preferences</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">2. How We Use Your Information</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>We use the information collected to:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Provide our professional services and consultations</li>
                      <li>Communicate about projects and updates</li>
                      <li>Send relevant information about our services</li>
                      <li>Improve our website and customer experience</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">3. Information Sharing</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>With your explicit consent</li>
                      <li>To comply with legal requirements</li>
                      <li>To protect our rights and safety</li>
                      <li>With trusted service providers who assist our operations</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">4. Data Security</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>SSL encryption for data transmission</li>
                      <li>Secure data storage systems</li>
                      <li>Regular security assessments</li>
                      <li>Limited access to personal information</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">5. Your Rights</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate data</li>
                      <li>Request deletion of your information</li>
                      <li>Withdraw consent for processing</li>
                      <li>Object to certain data processing activities</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">6. Cookies and Tracking</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      Our website may use cookies and similar technologies to enhance your experience:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Essential cookies for website functionality</li>
                      <li>Analytics cookies to understand usage patterns</li>
                      <li>Preference cookies to remember your settings</li>
                    </ul>
                    <p className="text-sm text-neutral-600">
                      You can control cookie preferences through your browser settings.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">7. Contact Us</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="bg-primary-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Mail className="w-5 h-5 text-primary-600" />
                        <span className="font-semibold">{COMPANY_INFO.email[0]}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-5 h-5 flex items-center justify-center text-primary-600">📞</span>
                        <span>{COMPANY_INFO.phone[0]}</span>
                      </div>
                      <div className="text-sm text-neutral-600">
                        {COMPANY_INFO.headquarters}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="border-t border-neutral-200 pt-8">
                  <p className="text-sm text-neutral-600">
                    This privacy policy is effective as of {new Date().toLocaleDateString()} and may be updated periodically.
                    Please check this page regularly for any changes.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

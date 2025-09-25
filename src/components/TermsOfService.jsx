import React from 'react';
import { ArrowLeft, FileText, Scale, AlertTriangle } from 'lucide-react';
import { COMPANY_INFO } from '../data/demoServices';

const TermsOfService = () => {
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
              <Scale className="w-6 h-6 text-primary-600" />
              <h1 className="text-2xl font-bold text-neutral-900">Terms of Service</h1>
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
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">Terms of Service</h2>
                    <p className="text-neutral-600">Last updated: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">1. Acceptance of Terms</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      By accessing and using the services of {COMPANY_INFO.fullName} ("we," "us," or "our"),
                      you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms,
                      please do not use our services.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">2. Services Description</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      {COMPANY_INFO.fullName} provides professional services including but not limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>General construction and contracting services</li>
                      <li>IT solutions and technology consulting</li>
                      <li>Business development and consulting</li>
                      <li>Software development and custom applications</li>
                      <li>Project management and supervision</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">3. User Responsibilities</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>As a user of our services, you agree to:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Provide accurate and complete information</li>
                      <li>Use our services in accordance with applicable laws</li>
                      <li>Respect intellectual property rights</li>
                      <li>Not engage in harmful or malicious activities</li>
                      <li>Pay for services as agreed upon</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">4. Service Delivery</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>We commit to:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Delivering services with professional standards</li>
                      <li>Maintaining clear communication throughout projects</li>
                      <li>Adhering to agreed timelines and specifications</li>
                      <li>Providing quality workmanship and materials</li>
                      <li>Offering post-completion support as outlined</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">5. Payment Terms</h3>
                  <div className="space-y-4 text-neutral-700">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-2">Payment Requirements</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-amber-700">
                            <li>Payment terms will be specified in individual project agreements</li>
                            <li>Late payments may incur additional charges</li>
                            <li>All payments are final unless otherwise agreed</li>
                            <li>Disputed charges must be raised within 30 days</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">6. Intellectual Property</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      All intellectual property rights related to our services, including but not limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Custom software and applications developed</li>
                      <li>Project designs and specifications</li>
                      <li>Documentation and reports</li>
                      <li>Our company branding and materials</li>
                    </ul>
                    <p>
                      Ownership transfers to the client upon full payment, unless otherwise specified in the project agreement.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">7. Limitation of Liability</h3>
                  <div className="space-y-4 text-neutral-700">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-red-800 mb-2">Important Notice</h4>
                          <p className="text-sm text-red-700">
                            Our liability is limited to the amount paid for the specific service. We are not liable for
                            indirect, incidental, or consequential damages. Some jurisdictions may not allow certain
                            limitations of liability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">8. Termination</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>Either party may terminate services under the following conditions:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Material breach of contract terms</li>
                      <li>Non-payment of agreed fees</li>
                      <li>Mutual agreement between parties</li>
                      <li>Force majeure events</li>
                    </ul>
                    <p>
                      Notice periods and termination procedures will be outlined in individual service agreements.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">9. Dispute Resolution</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      In case of disputes, we encourage resolution through:
                    </p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Direct negotiation between parties</li>
                      <li>Mediation through a neutral third party</li>
                      <li>Arbitration if mediation fails</li>
                      <li>Litigation as a last resort</li>
                    </ol>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">10. Changes to Terms</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      We reserve the right to modify these Terms of Service at any time. Changes will be:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Posted on our website with the revision date</li>
                      <li>Communicated to active clients when material changes occur</li>
                      <li>Effective 30 days after posting unless otherwise specified</li>
                    </ul>
                    <p>
                      Continued use of our services after changes constitutes acceptance of the new terms.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">11. Governing Law</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      These Terms of Service are governed by the laws of Nigeria. Any disputes will be resolved
                      in the courts of {COMPANY_INFO.headquarters}.
                    </p>
                  </div>
                </section>

                <section className="border-t border-neutral-200 pt-8">
                  <p className="text-sm text-neutral-600">
                    If you have questions about these Terms of Service, please contact us using the information provided below.
                  </p>
                  <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
                    <p className="font-semibold text-neutral-900 mb-2">Contact Information:</p>
                    <p className="text-sm text-neutral-600">{COMPANY_INFO.email[0]}</p>
                    <p className="text-sm text-neutral-600">{COMPANY_INFO.phone[0]}</p>
                    <p className="text-sm text-neutral-600">{COMPANY_INFO.headquarters}</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

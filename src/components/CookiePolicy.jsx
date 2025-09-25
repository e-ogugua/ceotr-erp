import React from 'react';
import { ArrowLeft, Cookie, Settings, Info } from 'lucide-react';
import { COMPANY_INFO } from '../data/demoServices';

const CookiePolicy = () => {
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
              <Cookie className="w-6 h-6 text-primary-600" />
              <h1 className="text-2xl font-bold text-neutral-900">Cookie Policy</h1>
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
                    <Cookie className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">Cookie Policy</h2>
                    <p className="text-neutral-600">Last updated: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">1. What Are Cookies?</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      Cookies are small text files that are stored on your device when you visit our website.
                      They help us provide you with a better browsing experience and allow certain features to work properly.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-2">Cookie Types</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                            <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                            <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                            <li><strong>Marketing Cookies:</strong> Used for advertising and promotional purposes</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">2. How We Use Cookies</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>We use cookies for the following purposes:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">Essential Functions</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                          <li>Website navigation and functionality</li>
                          <li>Form submissions and data processing</li>
                          <li>Security and authentication</li>
                          <li>Language and currency preferences</li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-800 mb-2">User Experience</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-purple-700">
                          <li>Remembering your preferences</li>
                          <li>Saving form data temporarily</li>
                          <li>Personalizing content display</li>
                          <li>Improving site performance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">3. Cookie Categories</h3>
                  <div className="space-y-6">
                    <div className="border border-neutral-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <span className="text-red-600 font-bold text-sm">!</span>
                        </div>
                        <h4 className="font-semibold text-neutral-900">Strictly Necessary Cookies</h4>
                      </div>
                      <p className="text-neutral-700 mb-3">
                        These cookies are essential for the website to function and cannot be switched off.
                      </p>
                      <div className="bg-red-50 border border-red-200 rounded p-3">
                        <p className="text-sm text-red-800">
                          <strong>Always Active:</strong> These cookies are required for basic site functionality
                          and security. They do not store personal information.
                        </p>
                      </div>
                    </div>

                    <div className="border border-neutral-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Settings className="w-4 h-4 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-neutral-900">Functional Cookies</h4>
                      </div>
                      <p className="text-neutral-700 mb-3">
                        These cookies enable enhanced functionality and personalization.
                      </p>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <p className="text-sm text-blue-800">
                          <strong>Optional:</strong> Enable features like currency selection, form preferences,
                          and personalized content recommendations.
                        </p>
                      </div>
                    </div>

                    <div className="border border-neutral-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">📊</span>
                        </div>
                        <h4 className="font-semibold text-neutral-900">Analytics Cookies</h4>
                      </div>
                      <p className="text-neutral-700 mb-3">
                        These cookies help us understand how visitors interact with our website.
                      </p>
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <p className="text-sm text-green-800">
                          <strong>Optional:</strong> Help us improve our website by collecting anonymous
                          usage statistics and performance data.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">4. Managing Cookies</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>You can control cookies in several ways:</p>

                    <div className="bg-neutral-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Browser Settings</h4>
                      <p className="text-sm text-neutral-600 mb-3">
                        Most web browsers allow you to control cookies through their settings preferences:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600">
                        <li>Chrome: Settings → Privacy and Security → Cookies</li>
                        <li>Firefox: Preferences → Privacy & Security → Cookies</li>
                        <li>Safari: Preferences → Privacy → Manage Website Data</li>
                        <li>Edge: Settings → Cookies and site permissions</li>
                      </ul>
                    </div>

                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                      <h4 className="font-semibold text-primary-800 mb-2">Cookie Consent</h4>
                      <p className="text-sm text-primary-700">
                        When you first visit our website, you'll see a cookie consent banner where you can
                        choose which categories of cookies to allow. You can change these preferences at any time.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">5. Third-Party Cookies</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      Some cookies on our website are set by third-party services that appear on our pages:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Google Analytics:</strong> For website usage analytics</li>
                      <li><strong>Social Media Plugins:</strong> For sharing and social features</li>
                      <li><strong>Font Services:</strong> For web font delivery</li>
                      <li><strong>CDN Services:</strong> For content delivery optimization</li>
                    </ul>
                    <p>
                      These third parties have their own privacy policies and cookie practices which we encourage you to review.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">6. Cookie Duration</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>Cookies can be categorized by how long they remain active:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-neutral-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-2">Session</div>
                        <p className="text-sm text-neutral-600">Deleted when you close your browser</p>
                      </div>
                      <div className="bg-neutral-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">Persistent</div>
                        <p className="text-sm text-neutral-600">Remain on your device for a set period</p>
                      </div>
                      <div className="bg-neutral-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-2">Permanent</div>
                        <p className="text-sm text-neutral-600">Stored until manually deleted</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">7. Updates to This Policy</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-800">
                        <strong>Notification:</strong> Significant changes will be communicated through our website
                        or by email to registered users. The "Last updated" date at the top of this page will be revised accordingly.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">8. Contact Information</h3>
                  <div className="space-y-4 text-neutral-700">
                    <p>
                      If you have any questions about our Cookie Policy or cookie practices, please contact us:
                    </p>
                    <div className="bg-primary-50 rounded-lg p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Email:</span>
                          <span>{COMPANY_INFO.email[0]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Phone:</span>
                          <span>{COMPANY_INFO.phone[0]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Address:</span>
                          <span>{COMPANY_INFO.headquarters}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="border-t border-neutral-200 pt-8">
                  <p className="text-sm text-neutral-600">
                    This Cookie Policy is effective as of {new Date().toLocaleDateString()} and applies to all visitors
                    to our website. By using our website, you consent to the use of cookies in accordance with this policy.
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

export default CookiePolicy;

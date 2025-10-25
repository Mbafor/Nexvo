import { ArrowLeft, Shield, Calendar, Mail, Lock, Eye, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const lastUpdated = "January 15, 2025";
  const effectiveDate = "January 15, 2025";

  const handleBack = () => {
    // Try to go back in history, fallback to home page
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Styled Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-3">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>Effective: {effectiveDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-li:text-gray-700">
            <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8 rounded-r-lg">
              <p className="lead text-green-900 font-medium mb-0">
                This Privacy Policy describes how QuickCV collects, uses, and protects your personal information 
                when you use our CV building service. We are committed to protecting your privacy and being 
                transparent about our data practices.
              </p>
            </div>

            {/* Quick Overview Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8 not-prose">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-900 mb-1">Data Collection</h4>
                <p className="text-sm text-blue-700">Only what's necessary for service</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-900 mb-1">Secure Storage</h4>
                <p className="text-sm text-green-700">Encrypted and protected</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-900 mb-1">Your Rights</h4>
                <p className="text-sm text-purple-700">Full control over your data</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">1. Overview</h2>
            <p>At QuickCV, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our CV building service. This policy applies to all users of QuickCV, whether you create an account or use our service as a guest. By using our service, you consent to the collection and use of your information as described in this policy.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">2. Information We Collect</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p><strong className="text-blue-600">Personal Information:</strong> Name, email address, phone number, and other contact details you provide when creating your CV.</p>
              <p><strong className="text-blue-600">Account Information:</strong> Username, password, and profile information when you create an account.</p>
              <p><strong className="text-blue-600">CV Content:</strong> All information you enter into our CV builder, including work history, education, skills, and other personal details.</p>
              <p><strong className="text-blue-600">Usage Data:</strong> Information about how you use our service, including pages visited, features used, and time spent on our platform.</p>
              <p><strong className="text-blue-600">Device Information:</strong> IP address, browser type, operating system, and device identifiers.</p>
              <p><strong className="text-blue-600">Cookies and Tracking:</strong> We use cookies and similar technologies to enhance your experience and gather usage analytics.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">3. How We Use Your Information</h2>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">•</span>
                <span>To provide and maintain our CV building service</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">•</span>
                <span>To generate and format your CV documents</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">•</span>
                <span>To create and manage your user account</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">•</span>
                <span>To send you service-related communications</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">•</span>
                <span>To improve our service and develop new features</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">•</span>
                <span>To provide customer support and respond to inquiries</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">•</span>
                <span>To prevent fraud and ensure security of our platform</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">•</span>
                <span>To comply with legal obligations and enforce our terms</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">4. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
              <p><strong className="text-yellow-800">Service Providers:</strong> With trusted third-party vendors who help us operate our service (e.g., hosting, analytics, payment processing).</p>
              <p><strong className="text-yellow-800">Legal Requirements:</strong> When required by law, court order, or government regulations.</p>
              <p><strong className="text-yellow-800">Business Transfers:</strong> In connection with any merger, sale, or transfer of our business.</p>
              <p><strong className="text-yellow-800">Consent:</strong> When you explicitly consent to sharing your information.</p>
              <p><strong className="text-yellow-800">Aggregated Data:</strong> We may share anonymized, aggregated data that cannot identify you personally.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information:</p>
            <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
              <div className="bg-blue-50 p-4 rounded-lg">
                <Lock className="h-6 w-6 text-blue-600 mb-2" />
                <h4 className="font-semibold text-blue-900 mb-2">Encryption</h4>
                <p className="text-blue-700 text-sm">All data transmission is encrypted using SSL/TLS protocols.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <Shield className="h-6 w-6 text-green-600 mb-2" />
                <h4 className="font-semibold text-green-900 mb-2">Access Controls</h4>
                <p className="text-green-700 text-sm">Limited access to personal data on a need-to-know basis.</p>
              </div>
            </div>
            <p>However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">6. Data Retention</h2>
            <p>We retain your information for as long as necessary to provide our service and comply with legal obligations:</p>
            <p><strong>Account Data:</strong> Retained while your account is active and for a reasonable period after account closure.</p>
            <p><strong>CV Content:</strong> Stored until you delete it or close your account.</p>
            <p><strong>Usage Data:</strong> Typically retained for up to 2 years for analytics and service improvement.</p>
            <p>You can request deletion of your data by contacting us at mbaforfoghang@gmail.com.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">7. Your Privacy Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <div className="bg-purple-50 p-4 rounded-lg my-4">
              <p><strong className="text-purple-800">Access:</strong> Request a copy of the personal information we hold about you.</p>
              <p><strong className="text-purple-800">Correction:</strong> Request correction of inaccurate or incomplete information.</p>
              <p><strong className="text-purple-800">Deletion:</strong> Request deletion of your personal information (subject to certain exceptions).</p>
              <p><strong className="text-purple-800">Portability:</strong> Request transfer of your data to another service provider.</p>
              <p><strong className="text-purple-800">Restriction:</strong> Request limitation of how we process your information.</p>
              <p><strong className="text-purple-800">Objection:</strong> Object to certain types of processing of your information.</p>
            </div>
            <p>To exercise these rights, please contact us at mbaforfoghang@gmail.com.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">8. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar technologies to enhance your experience:</p>
            <p><strong>Essential Cookies:</strong> Required for basic functionality of our service.</p>
            <p><strong>Analytics Cookies:</strong> Help us understand how you use our service to improve it.</p>
            <p><strong>Preference Cookies:</strong> Remember your settings and preferences.</p>
            <p>You can control cookies through your browser settings, but disabling certain cookies may affect functionality.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">9. Third-Party Services</h2>
            <p>Our service may integrate with third-party services:</p>
            <p><strong>Authentication:</strong> Google, Facebook, Apple, and Microsoft for account creation and login.</p>
            <p><strong>Analytics:</strong> Google Analytics and similar services for usage tracking.</p>
            <p><strong>Payment Processing:</strong> Secure payment processors for premium features.</p>
            <p>These third parties have their own privacy policies, and we encourage you to review them.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">10. International Data Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers. For EU residents, we comply with GDPR requirements for data transfers outside the EU. We use standard contractual clauses and other approved mechanisms for international transfers.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">11. Children's Privacy</h2>
            <p>Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will delete it promptly. Parents who believe their child has provided information to us should contact us immediately.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">12. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website. Your continued use of our service after changes become effective constitutes acceptance of the updated policy. We encourage you to review this policy periodically.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">13. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <ul className="space-y-2 mb-0">
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-green-600" />
                  <span>Email: mbaforfoghang@gmail.com</span>
                </li>
                <li>Data Protection Officer: mbaforfoghang@gmail.com</li>
                <li>Address: 123 Business Ave, Suite 100, San Francisco, CA 94107</li>
                <li>Phone: +237 683094941</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">We Protect Your Privacy</h3>
          <p className="mb-4 text-green-100">
            Your data security and privacy are our top priorities. We use industry-standard encryption and strict access controls.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:mbaforfoghang@gmail.com"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium text-sm"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Privacy Team</span>
            </a>
            <a
              href="/terms"
              className="inline-flex items-center space-x-2 px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-colors font-medium text-sm"
            >
              <Shield className="h-4 w-4" />
              <span>View Terms of Service</span>
            </a>
          </div>
        </div>

        {/* Document Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            This Privacy Policy was last updated on {lastUpdated} and is effective as of {effectiveDate}.
          </p>
          <p className="mt-2">
            © 2025 QuickCV. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
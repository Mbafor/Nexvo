import { ArrowLeft, Scale, Calendar, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TermsConditions() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Styled Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-3">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
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
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="lead text-blue-900 font-medium mb-0">
                These Terms of Service ("Terms") govern your use of QuickCV's website and services. 
                By using our service, you agree to these terms. Please read them carefully.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using QuickCV ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">2. Service Description</h2>
            <p>QuickCV is an online platform that provides CV/resume building tools and templates to help users create professional resumes. The service includes access to various CV templates, editing tools, and PDF generation capabilities. We reserve the right to modify or discontinue the service at any time without notice.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">3. User Accounts</h2>
            <p>You are responsible for safeguarding the password and for all activities that occur under your account. You must provide accurate and complete information when creating an account. You agree to immediately notify us of any unauthorized use of your account. We reserve the right to terminate accounts that violate these terms.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">4. Acceptable Use</h2>
            <p>You may not use our service for any illegal or unauthorized purpose. You may not transmit any worms, viruses, or any code of a destructive nature. You may not violate any laws in your jurisdiction when using our service. You are responsible for the content you create and upload using our service.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">5. Intellectual Property</h2>
            <p>The service and its original content, features, and functionality are owned by QuickCV and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You retain ownership of the content you create using our templates. Our templates and design elements remain our intellectual property. You may not reproduce, distribute, or create derivative works from our proprietary content without permission.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">6. Privacy and Data Protection</h2>
            <p>Your privacy is important to us. Please review our Privacy Policy for information about how we collect, use, and protect your data. We implement appropriate security measures to protect your personal information. You have the right to request deletion of your personal data in accordance with applicable laws. We may use aggregated, anonymized data for service improvement purposes.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">7. Payments and Billing</h2>
            <p>Some features of our service may require payment. All fees are in US dollars unless otherwise specified. Payments are processed through secure third-party payment processors. Refunds may be available in accordance with our refund policy.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">8. Limitation of Liability</h2>
            <p>In no event shall QuickCV be liable for any indirect, incidental, special, consequential, or punitive damages. Our total liability to you for any claims shall not exceed the amount you paid for the service in the 12 months preceding the claim. We provide the service "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free operation of the service.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">9. Termination</h2>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason. Upon termination, your right to use the service will cease immediately. You may close your account at any time by contacting us. Provisions that should survive termination will remain in effect after termination.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">10. Modifications to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the service after changes constitutes acceptance of the new terms. We will make reasonable efforts to notify users of significant changes.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">11. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of California, United States. Any disputes arising from these terms shall be resolved in the courts of California. If any provision of these terms is found to be unenforceable, the remaining provisions will remain in effect. These terms constitute the entire agreement between you and QuickCV.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">12. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <ul className="space-y-2 mb-0">
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span>Email: mbaforfoghang@gmail.com</span>
                </li>
                <li>Address: 123 Business Ave, Suite 100, San Francisco, CA 94107</li>
                <li>Phone: +237 683094941</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Questions About Our Terms?</h3>
          <p className="mb-4 text-blue-100">
            We're here to help you understand our terms and how they apply to your use of QuickCV.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:mbaforfoghang@gmail.com"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Legal Team</span>
            </a>
            <a
              href="/privacy"
              className="inline-flex items-center space-x-2 px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium text-sm"
            >
              <Scale className="h-4 w-4" />
              <span>View Privacy Policy</span>
            </a>
          </div>
        </div>

        {/* Document Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            This document was last updated on {lastUpdated} and is effective as of {effectiveDate}.
          </p>
          <p className="mt-2">
            © 2025 QuickCV. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
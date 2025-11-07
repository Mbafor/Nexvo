import { Scale, Calendar, Mail } from 'lucide-react';
import { useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function TermsConditions() {
  
  const lastUpdated = "January 15, 2025";
  const effectiveDate = "January 15, 2025";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      
     

      {/* Meta Info */}
      <section className="bg-gray-50 border-y border-gray-200 py-4">
        <div className="max-w-5xl mx-auto px-5 flex flex-wrap gap-4 text-sm text-gray-600 justify-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-blue-500" />
            <span>Effective: {effectiveDate}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-5 py-16 leading-relaxed space-y-12">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 space-y-10">
          {/* Intro */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
            <p className="text-gray-800 text-base leading-relaxed">
              These Terms of Service (“Terms”) govern your access and use of the QuickCV website, platform, and related services (collectively, the “Service”). By accessing or using the Service, you agree to comply with these Terms and all applicable laws. These Terms outline the rights, responsibilities, and obligations of both you and QuickCV. If you do not agree to these Terms, you may not use the Service. It is your responsibility to review these Terms regularly, as we may update them from time to time.
            </p>
          </div>

          {/* Content Sections */}
          <div className="prose prose-gray max-w-none space-y-8">
            <h2 className="mt-8">1. Acceptance of Terms</h2>
            <p>
              By accessing or using QuickCV, you affirm that you are at least 18 years old, or have the consent of a parent or guardian, and have full authority to accept these Terms. You agree to comply with all applicable laws, rules, and regulations in connection with your use of the Service. QuickCV reserves the right to modify or update these Terms at any time, and your continued use of the Service constitutes acceptance of those changes.
            </p>
            <p>
              These Terms apply to all users, including individuals, companies, and other legal entities. They cover every aspect of the Service, including, but not limited to, account creation, content submission, payment, communications, and participation in any associated events or programs. Failure to adhere to these Terms may result in suspension or termination of your account and legal remedies where appropriate.
            </p>

            <h2>2. Service Overview</h2>
            <p>
              QuickCV is an online platform that provides CV and resume building tools designed to help users create professional, high-quality CVs efficiently. The Service includes pre-designed templates, editing features, and downloadable output in multiple formats. While we strive to maintain a consistent and reliable Service, QuickCV may update, suspend, or discontinue certain features without prior notice. Some functionality may be limited based on your subscription type or user plan.
            </p>
            <p>
              We aim to provide accurate and up-to-date tools; however, we make no warranties regarding the completeness, accuracy, or suitability of any materials available through the Service. Users are responsible for verifying the content they produce and ensuring it meets their personal or professional requirements.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of QuickCV, you may be required to register for an account. You agree to provide accurate, current, and complete information during registration and to maintain the security of your login credentials. You are responsible for all activity that occurs under your account, including interactions, communications, and content uploads.
            </p>
            <p>
              You agree to immediately notify QuickCV of any unauthorized use of your account or any security breaches. QuickCV reserves the right to suspend or terminate any account at our discretion, particularly if the account is used to violate these Terms, infringe on intellectual property, or engage in illegal activity.
            </p>

            <h2>4. Acceptable Use</h2>
            <p>
              You agree to use QuickCV responsibly and ethically. Prohibited activities include, but are not limited to, transmitting harmful or malicious code, attempting to gain unauthorized access to other users’ accounts, engaging in fraudulent or deceptive activity, or violating intellectual property rights. You may not use the Service to harass, threaten, or intimidate others. QuickCV reserves the right to investigate any violations and take appropriate action, including legal action.
            </p>
            <p>
              Users are solely responsible for the content they generate, upload, or share through QuickCV. We do not endorse or guarantee any content created by users, and we are not responsible for disputes arising from user-generated content.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              All designs, templates, software, logos, and proprietary technology made available through QuickCV are owned by QuickCV or its licensors and are protected under intellectual property laws worldwide. Users retain ownership of their personal content created using the Service, such as CVs and resumes. However, users are granted only a limited, non-exclusive, non-transferable license to use QuickCV’s materials strictly for personal or professional purposes.
            </p>
            <p>
              Any unauthorized copying, redistribution, or modification of QuickCV materials is strictly prohibited. Users agree not to remove or alter any copyright or proprietary notices from the Service content.
            </p>

            <h2>6. Privacy and Data Protection</h2>
            <p>
              QuickCV is committed to protecting your privacy. We collect personal information necessary to provide and improve the Service, including registration details, usage data, and technical information. Please review our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> for detailed information on how your data is collected, used, stored, and shared.
            </p>
            <p>
              We implement strong technical, administrative, and physical safeguards to protect your personal data against unauthorized access, disclosure, alteration, or destruction. You may request access to, correction of, or deletion of your personal data in accordance with applicable law. QuickCV may also use anonymized or aggregated data for research and analysis to enhance our Service.
            </p>

            <h2>7. Payments and Billing</h2>
            <p>
              Certain features or content on QuickCV may require payment. All fees are denominated in US dollars unless otherwise indicated. Payment processing is handled through secure third-party providers. Users are responsible for ensuring accurate billing information and timely payments. QuickCV reserves the right to suspend access to paid features for non-payment.
            </p>
            <p>
              Refunds, if any, are issued in accordance with our refund policy. Users should review the policy carefully prior to subscribing. QuickCV is not responsible for third-party charges, including bank fees or payment processing fees.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              The Service is provided “as is” and without warranties of any kind, whether express or implied. QuickCV does not guarantee uninterrupted, error-free, or secure operation. To the maximum extent permitted by law, QuickCV is not liable for indirect, incidental, special, consequential, or punitive damages arising out of or relating to the use of the Service, even if advised of the possibility of such damages.
            </p>
            <p>
              QuickCV’s total liability to a user for any claim arising from the Service shall not exceed the amount paid by the user in the twelve (12) months prior to the claim. This limitation applies to all claims, including, but not limited to, negligence, breach of contract, or misrepresentation.
            </p>

            <h2>9. Termination</h2>
            <p>
              QuickCV reserves the right to suspend, restrict, or terminate user accounts at our discretion, including for violations of these Terms or applicable laws. Upon termination, all rights to access or use the Service cease immediately. Users may request account closure at any time. Provisions that should survive termination, such as intellectual property rights, disclaimers, and limitations of liability, remain in effect.
            </p>

            <h2>10. Modifications to Terms</h2>
            <p>
              QuickCV may update these Terms periodically to reflect changes in the law, business practices, or Service functionality. Updated Terms take effect immediately upon posting to this page. Users are encouraged to review this page regularly. Continued use of the Service constitutes acceptance of the updated Terms.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of California, United States, without regard to conflict-of-law principles. Any disputes or claims arising under these Terms will be subject to the exclusive jurisdiction of the courts located in California. If any part of these Terms is deemed unenforceable, the remaining provisions will remain fully effective.
            </p>

            <h2>12. Contact Information</h2>
            <p>If you have questions, concerns, or complaints regarding these Terms, please contact us:</p>
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl mt-4">
              <ul className="space-y-2 mb-0 text-gray-700">
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

        {/* Footer Card */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl text-center p-10 space-y-6">
          <Scale className="h-10 w-10 text-blue-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-1 text-gray-900">Need Clarification?</h3>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Our legal and support teams are here to help you understand these Terms and how they apply to your use of QuickCV.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:mbaforfoghang@gmail.com"
              className="px-6 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Contact Legal Team
            </a>
            <a
              href="/privacy"
              className="px-6 py-3 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              View Privacy Policy
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <footer className="mt-10 text-center text-sm text-gray-500 space-y-1">
          <p>This document was last updated on {lastUpdated} and is effective as of {effectiveDate}.</p>
          <p>© 2025 QuickCV. All rights reserved.</p>
        </footer>
      </main>
      
      <Footer />
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  ArrowLeft,
  Shield,
  Calendar,
  Mail,
  Lock,
  Eye,
  Database,
} from "lucide-react";
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const lastUpdated = "January 15, 2025";
  const effectiveDate = "January 15, 2025";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

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
              This Privacy Policy explains how <span className="font-medium text-blue-600">QuickCV</span> collects, processes, stores, and protects your personal information when you access or use our CV building platform and related services. We are committed to transparency, data protection, and ensuring that your privacy rights are respected. By using our services, you consent to the practices described in this policy, so we encourage you to read it carefully.
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-sm transition">
              <Database className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Data Collection</h4>
              <p className="text-sm text-gray-600 mt-1">
                We only collect data necessary to provide and enhance our services, ensuring minimal intrusion while maintaining functionality.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-sm transition">
              <Lock className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Data Security</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your data is encrypted during transmission, securely stored, and safeguarded through robust industry-standard security measures.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-sm transition">
              <Eye className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">User Control</h4>
              <p className="text-sm text-gray-600 mt-1">
                You have full control over your personal information, including access, correction, and deletion, ensuring your data remains accurate and relevant.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-6 mt-10">
            1. Overview
          </h2>
          <p>
            QuickCV is committed to respecting your privacy and protecting your personal data. This Privacy Policy outlines the types of information we collect, how we use and safeguard it, and your rights regarding your data. By using our services, you agree to the terms of this Privacy Policy. It applies to all users, including visitors, registered users, and customers accessing QuickCV from anywhere in the world.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
            2. Information We Collect
          </h2>
          <p>
            We collect information to provide better services and improve the user experience. This includes:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li><strong>Personal Information:</strong> Name, email, phone number, and any details provided when building your CV.</li>
            <li><strong>Account Data:</strong> Username, password, and profile information for registered users.</li>
            <li><strong>CV Content:</strong> Education, work history, skills, certifications, and other personal content entered into the CV builder.</li>
            <li><strong>Usage Data:</strong> Pages visited, actions taken, session duration, and interactions within the platform.</li>
            <li><strong>Device Information:</strong> IP address, browser type, operating system, and other device-specific information.</li>
            <li><strong>Cookies and Tracking:</strong> To improve functionality, analyze usage, and enhance the user experience.</li>
          </ul>

          {/* Section 3 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
            3. How We Use Your Information
          </h2>
          <p>
            Collected information is used responsibly to:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Provide, operate, and maintain the QuickCV service.</li>
            <li>Create and format your CV accurately.</li>
            <li>Enhance and personalize user experience.</li>
            <li>Communicate important service updates or account notices.</li>
            <li>Detect and prevent fraud, misuse, or other harmful activity.</li>
            <li>Comply with legal obligations and regulatory requirements.</li>
          </ul>

          {/* Section 4 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
            4. Information Sharing and Disclosure
          </h2>
          <p>
            We do not sell your personal information. Information may be shared only with trusted third parties to provide services or as required by law.
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li><strong>Service Providers:</strong> To support hosting, analytics, payment processing, and other operational needs.</li>
            <li><strong>Legal Compliance:</strong> When required by law or to respond to lawful requests from authorities.</li>
            <li><strong>Business Transfers:</strong> During mergers, acquisitions, or corporate restructuring.</li>
            <li><strong>Aggregated Data:</strong> Non-identifiable statistics to improve the platform.</li>
          </ul>

          {/* Section 5 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
            5. Data Security
          </h2>
          <p>
            We implement advanced technical and administrative safeguards, including encryption, secure servers, and limited access to protect your personal information. Although no system is entirely risk-free, we continually improve our security measures to minimize potential vulnerabilities.
          </p>

          {/* Section 6 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
            6. Data Retention
          </h2>
          <p>
            We retain your personal data only for as long as necessary to provide our services, comply with legal obligations, and resolve disputes. You can request deletion of your information by contacting us at <a href="mailto:mbaforfoghang@gmail.com" className="text-blue-600 underline">mbaforfoghang@gmail.com</a>.
          </p>

          {/* Sections 7-13 (spaced similarly) */}
          {/* Repeat same structure as above with spacing, full paragraphs, lists, and headers */}
          
          {/* Section 7 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
            7. Your Privacy Rights
          </h2>
          <p>
            Depending on your jurisdiction, you may have the right to access, correct, delete, restrict processing, or transfer your personal data. You may also object to certain types of data processing. To exercise these rights, contact us directly.
          </p>

          {/* Section 8 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
            8. Cookies and Tracking
          </h2>
          <p>
            Cookies and similar technologies are used to enhance your experience, remember preferences, and analyze usage. Disabling cookies may limit functionality of some features.
          </p>

          {/* Section 9 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
            9. Third-Party Services
          </h2>
          <p>
            QuickCV may integrate third-party services like Google Analytics or social logins. We recommend reviewing their privacy policies for how they handle your data.
          </p>

          {/* Section 10 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
            10. International Data Transfers
          </h2>
          <p>
            Your data may be processed in countries outside your own. We implement safeguards consistent with GDPR and international standards to ensure adequate protection.
          </p>

          {/* Section 11 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
            11. Children's Privacy
          </h2>
          <p>
            QuickCV is not intended for children under 13. We do not knowingly collect data from minors. If you believe a child has submitted personal information, contact us immediately.
          </p>

          {/* Section 12 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
            12. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be posted on this page with an updated “last updated” date. Continued use of the service indicates your acceptance of any updates.
          </p>

          {/* Section 13 */}
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
            13. Contact Us
          </h2>
          <p>
            For questions, concerns, or privacy requests, contact our Privacy Team:
          </p>
          <ul className="mt-4 text-gray-700 space-y-1 ml-4">
            <li>Email: mbaforfoghang@gmail.com</li>
            <li>Data Protection Officer: mbaforfoghang@gmail.com</li>
            <li>Address: 123 Business Ave, Suite 100, San Francisco, CA 94107</li>
            <li>Phone: +237 683094941</li>
          </ul>
        </div>

        {/* Footer Card */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl text-center p-10 space-y-6">
          <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-1 text-gray-900">We Protect Your Privacy</h3>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Your security and privacy are our top priorities. We continuously enhance our systems to ensure your data is safe and confidential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:mbaforfoghang@gmail.com"
              className="px-6 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Contact Privacy Team
            </a>
            <a
              href="/terms"
              className="px-6 py-3 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              View Terms of Service
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <footer className="mt-10 text-center text-sm text-gray-500 space-y-1">
          <p>This Privacy Policy was last updated on {lastUpdated} and is effective as of {effectiveDate}.</p>
          <p>© 2025 QuickCV. All rights reserved.</p>
        </footer>
      </main>
      
      <Footer />
    </div>
  );
}

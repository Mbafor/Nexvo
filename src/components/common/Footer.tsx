import { Link } from "react-router-dom";
import {
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react";

interface FooterProps {
  onGetStarted?: () => void;
}

export default function Footer({ onGetStarted }: FooterProps) {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      // Default behavior - navigate to builder
      window.location.href = "/builder";
    }
  };

  return (
    <footer className="bg-white border-t border-blue-100 text-gray-800 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Company Info */}
       <div className="sm:col-span-2 lg:col-span-1 space-y-4 text-center sm:text-left">
  <h3 className="text-xl lg:text-2xl font-bold text-blue-700">
    QuickCV
  </h3>
  <p className="text-gray-600 leading-relaxed text-sm lg:text-base max-w-sm mx-auto sm:mx-0">
    Create professional, ATS-optimized CVs that land interviews at top companies.
  </p>
</div>


          {/* Product Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h4   className="font-semibold text-gray-800 text-sm lg:text-base block py-1">Product</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/#templates"
                  className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base block py-1"
                >
                  Templates
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base block py-1"
                >
                  Features
                </a>
              </li>
              <li>
                <button
                  onClick={handleGetStarted}
                  className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base text-left py-1"
                >
                  CV Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="font-semibold text-gray-800 text-sm lg:text-base block py-1">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base block py-1"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base block py-1"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base block py-1"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="font-semibold text-gray-800 text-sm lg:text-base block py-1">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base block py-1"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base block py-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base block py-1"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

     {/* Social Links */}
<div className="mt-10 space-y-4 text-center sm:text-left">
  <h4 className="font-semibold text-gray-800 text-sm lg:text-base block py-1">Follow Us</h4>
  <div className="flex justify-center sm:justify-start space-x-3">
    <a
      href="https://linkedin.com/company/quickcv"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
    >
      <Linkedin className="h-5 w-5 text-blue-700" />
    </a>
    <a
      href="https://twitter.com/quickcv"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
    >
      <Twitter className="h-5 w-5 text-blue-700" />
    </a>
    <a
      href="mailto:mbaforfoghang@gmail.com"
      className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
    >
      <Mail className="h-5 w-5 text-blue-700" />
    </a>
  </div>
</div>


        {/* Bottom Bar */}
        <div className="border-t border-blue-100 mt-8 lg:mt-12 pt-6 lg:pt-8">
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2025 QuickCV. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

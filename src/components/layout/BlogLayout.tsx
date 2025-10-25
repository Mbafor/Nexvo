import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface BlogLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ 
  children, 
  title = "QuickCV Blog", 
  description = "Expert insights on CV building, career development, and job search strategies" 
}) => {
  const navigate = useNavigate();

  // Set document title and meta description dynamically
  useEffect(() => {
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, [title, description]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                  QuickCV
                </h1>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/builder")}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                CV Builder
              </button>
              <button
                onClick={() => navigate("/blogs")}
                className="text-blue-600 font-medium border-b-2 border-blue-600"
              >
                Blog
              </button>
              <button
                onClick={() => navigate("/templates")}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Templates
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Open menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex">
              <button
                onClick={() => navigate("/builder")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
              >
                Create CV
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">QuickCV</h3>
              <p className="text-gray-300 mb-4 max-w-md">
                Create professional CVs that get you hired. Our AI-powered platform helps you build 
                standout resumes with modern templates and expert guidance.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.175 1.219-5.175s-.31-.633-.31-1.568c0-1.469.855-2.567 1.919-2.567.905 0 1.343.679 1.343 1.493 0 .909-.578 2.268-.877 3.526-.249 1.056.53 1.917 1.572 1.917 1.887 0 3.338-1.99 3.338-4.863 0-2.542-1.825-4.317-4.431-4.317-3.018 0-4.792 2.262-4.792 4.602 0 .91.349 1.887.787 2.418.086.105.099.197.073.304-.08.331-.256 1.04-.292 1.186-.047.196-.157.237-.362.143-1.315-.608-2.137-2.520-2.137-4.058 0-3.349 2.432-6.424 7.017-6.424 3.683 0 6.548 2.624 6.548 6.134 0 3.662-2.310 6.606-5.516 6.606-1.077 0-2.091-.56-2.436-1.231 0 0-.533 2.032-.662 2.53-.239.919-.888 2.072-1.323 2.777C8.69 23.467 10.298 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate("/builder")}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    CV Builder
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate("/templates")}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Templates
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate("/blogs")}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 QuickCV. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 sm:mt-0">
              Made with ❤️ for job seekers worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogLayout;
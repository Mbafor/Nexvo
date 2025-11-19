import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Removed useTranslation import
import Footer from '../common/Footer';
import LanguageSelector from '../LanguageSelector'; // <-- IMPORTED LanguageSelector
import { Menu, X } from 'lucide-react'; // Import icons for mobile menu

interface BlogLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ 
  children, 
  title, 
  description 
}) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Default values using static English text
  const pageTitle = title || "Nexvo Blog - Career Insights & Resume Tips";
  const pageDescription = description || "Expert advice on CV writing, interview preparation, and career development to help you land your dream job.";

  // Set document title and meta description dynamically
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    document.title = pageTitle;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = pageDescription;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, [pageTitle, pageDescription]);

  const navLinks = [
    { label: "Home", path: '/' },
    { label: "Builder", path: '/builder' },
    { label: "Blog", path: '/blogs', active: true }, // Explicitly marking active for Blog layout
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo (REVISED: Image Logo) */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="flex-shrink-0">
                <img 
                  src="/Images/main_logo.png" 
                  alt="Nexvo Logo" 
                  className="h-8 md:h-10 w-auto" // Using standard header sizes
                />
              </div>
            </div>

            {/* Navigation Links (Desktop) */}
            <div className="hidden md:flex flex-1 justify-center items-center"> {/* Added flex-1 and justify-center to center links */}
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`h-16 flex items-center ${ /* Added h-16 and flex items-center to fix bottom border alignment */
                      link.active 
                        ? "text-blue-700 font-medium border-b-2 border-blue-600" 
                        : "text-gray-600 hover:text-blue-700 font-medium transition-colors"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Right Actions (Language Selector + CTA Button) */}
            <div className="flex items-center space-x-3 sm:space-x-4">
  

              {/* CTA Button (Desktop) */}
              <div className="hidden lg:flex">
                <button
                  onClick={() => navigate("/builder")}
                  className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Create My CV
                </button>
              </div>

               <div className="hidden sm:block"> {/* Hide on extra small mobile screens for space */}
                <LanguageSelector />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-600 hover:text-blue-700 transition-colors p-1"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 font-medium transition-colors ${
                    link.active
                      ? "text-blue-700 border-l-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-700"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              {/* Mobile Language Selector (ADDED) */}
              <div className="pt-4 pb-2 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-500 mb-2">Select Language</h4>
                <div className="w-full">
                  <LanguageSelector className="w-full" />
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => {
                    navigate("/builder");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Create My CV
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogLayout;
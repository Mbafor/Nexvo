import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Set document title and meta description dynamically
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
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
                <h1 className="text-2xl font-bold text-blue-700 group-hover:text-blue-700 transition-colors">
                  QuickCV
                </h1>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-blue-700 font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/builder")}
                className="text-gray-600 hover:text-blue-700 font-medium transition-colors"
              >
                CV Builder
              </button>
              <button
                onClick={() => navigate("/blogs")}
                className="text-blue-700 font-medium border-b-2 border-blue-600"
              >
                Blog
              </button>
              
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-blue-700 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex">
              <button
                onClick={() => navigate("/builder")}
                className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
              >
                Create CV
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              <button
                onClick={() => {
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-700 font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate("/builder");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-700 font-medium transition-colors"
              >
                CV Builder
              </button>
              <button
                onClick={() => {
                  navigate("/blogs");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-blue-700 font-medium border-l-2 border-blue-600"
              >
                Blog
              </button>
    
              <div className="pt-3">
                <button
                  onClick={() => {
                    navigate("/builder");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Create CV
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
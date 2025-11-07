import { useState } from "react";
import { FileText, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface HeaderProps {
  onGetStarted?: () => void;
  onSignIn?: () => void;
}

export default function Header({ onGetStarted, onSignIn }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Check if we're on the home page
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
    
    if (isHomePage) {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If not on home page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-blue-600">
                QuickCV
              </h2>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#templates" onClick={(e) => handleNavClick(e, "templates")} className="text-black hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">
              Templates
            </a>
            <a href="/#features" onClick={(e) => handleNavClick(e, "features")} className="text-black hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">
              Features
            </a>
            <Link to="/blogs" className="text-black hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">
              Blog
            </Link>
            
            {/* Sign In Button */}
            {onSignIn && (
              <motion.button 
                onClick={onSignIn}
                className="px-4 py-2 text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg font-medium transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            )}
            
            {onGetStarted && (
              <motion.button 
                onClick={onGetStarted}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <span>Create CV</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 py-4 border-t border-gray-200 bg-white/95"
            >
              <div className="flex flex-col space-y-4">
                <a href="/#templates" onClick={(e) => handleNavClick(e, "templates")} 
                  className="text-black hover:text-blue-600 font-medium transition-colors">
                  Templates
                </a>
                <a href="/#features" onClick={(e) => handleNavClick(e, "features")} 
                  className="text-black hover:text-blue-600 font-medium transition-colors">
                  Features
                </a>
                <Link to="/blogs" className="text-black hover:text-blue-600 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Blog
                </Link>

                
                {/* Mobile Sign In */}
                {onSignIn && (
                  <button 
                    onClick={() => { onSignIn(); setMobileMenuOpen(false); }} 
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg font-medium transition-all text-left"
                  >
                    Sign In
                  </button>
                )}
                
                {onGetStarted && (
                  <button onClick={() => { onGetStarted(); setMobileMenuOpen(false); }} 
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold mt-2">
                    Create CV
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
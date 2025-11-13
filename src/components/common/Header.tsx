import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  onGetStarted?: () => void;
  onSignIn?: () => void;
}

export default function Header({ onSignIn }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const isHomePage = location.pathname === '/' || location.pathname === '/index.html' || location.pathname === '';

    const scrollToSection = () => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.offsetTop - headerHeight;
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
      }, 100);
    };

    if (isHomePage) {
      scrollToSection();
    } else {
      navigate('/', { replace: true });
      scrollToSection();
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-700">
          QuickCV
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/#templates" onClick={(e) => handleNavClick(e, "templates")} className="hover:text-blue-700">Templates</a>
          <a href="/#why-choose-us" onClick={(e) => handleNavClick(e, "why-choose-us")} className="hover:text-blue-700">Features</a>
          <Link to="/blogs" className="hover:text-blue-700">Blog</Link>

          {onSignIn && (
            <button onClick={onSignIn} className="px-6 py-2 font-medium bg-blue-700 hover:bg-blue-600 text-white rounded-xl flex items-center space-x-2">Sign In</button>
          )}
        
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center space-x-2">
          {onSignIn && (
            <button onClick={onSignIn} className="px-6 py-2 bg-blue-700 text-white rounded-xl flex items-center space-x-2 hover:bg-blue-600">
              Sign In
            </button>
          )}
         

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (hamburger) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 border-t border-gray-200"
          >
          
<div className="flex flex-col divide-y divide-gray-200 py-4 px-4">
  <a
    href="/#templates"
    onClick={(e) => handleNavClick(e, "templates")}
    className="flex justify-between items-center py-3 hover:text-blue-700"
  >
    Templates
    <ArrowRight className="h-4 w-4 text-gray-400" />
  </a>

  <a
    href="/#why-choose-us"
    onClick={(e) => handleNavClick(e, "why-choose-us")}
    className="flex justify-between items-center py-3 hover:text-blue-700"
  >
    Features
    <ArrowRight className="h-4 w-4 text-gray-400" />
  </a>

  <Link
    to="/blogs"
    onClick={() => setMobileMenuOpen(false)}
    className="flex justify-between items-center py-3 hover:text-blue-700"
  >
    Blog
    <ArrowRight className="h-4 w-4 text-gray-400" />
  </Link>
  <Link
    to="/contact"
    onClick={() => setMobileMenuOpen(false)}
    className="flex justify-between items-center py-3 hover:text-blue-700"
  >
    Contact
    <ArrowRight className="h-4 w-4 text-gray-400" />
  </Link>
</div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

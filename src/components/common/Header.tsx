import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ChevronRight, } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSelector from "../LanguageSelector";

interface HeaderProps {
  onGetStarted?: () => void;
  onSignIn?: () => void;
}

export default function Header({ onSignIn }: HeaderProps) {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Handle scroll detection for header background changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

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

  const handleCreateCV = () => {
    setIsMobileMenuOpen(false);
    navigate('/builder');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-xl bg-white/95 border-b border-gray-200 shadow-lg' 
        : 'backdrop-blur-sm bg-white/80 border-b border-gray-100 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* 1. Logo (REVISED: Image Insertion and Size) */}
        <Link to="/" className="inline-block z-50 relative">
          <img 
            src="/Images/main_logo.png" 
            alt="Nexvo Logo" 
            className="h-8 md:h-10 w-auto" 
          />
        </Link>

        {/* 2. Desktop Menu (Centralized Nav) */}
        <div className="hidden md:flex flex-1 justify-center"> {/* flex-1 and justify-center centers the nav links */}
          
          <div className="flex items-center space-x-6"> 
            {/* Nav Links (Original structure) */}
            <a href="/#templates" onClick={(e) => handleNavClick(e, "templates")} className="hover:text-blue-700 font-medium text-gray-600 transition-colors">
              {t('header.nav.templates')}
            </a>
            <a href="/#why-choose-us" onClick={(e) => handleNavClick(e, "why-choose-us")} className="hover:text-blue-700 font-medium text-gray-600 transition-colors">
              {t('header.nav.features')}
            </a>
            <Link to="/blogs" className="hover:text-blue-700 font-medium text-gray-600 transition-colors">
              {t('header.nav.blog')}
            </Link>
            {/* Added missing contact link to desktop nav for completeness/balance */}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-700 font-medium text-gray-600 transition-colors">
              {t('header.nav.contact')}
            </Link>
          </div>
        </div>

        {/* 3. Right Actions (Language Selector + Sign In Button) */}
        <div className="hidden md:flex items-center space-x-4"> 
          
          {onSignIn && (
            <button onClick={onSignIn} className="px-6 py-2 font-medium bg-blue-700 hover:bg-blue-600 text-white rounded-xl transition-colors">
              {t('header.actions.signIn')}
            </button>
          )}
           <LanguageSelector /> 
        </div>

        {/* Mobile Hamburger Button (Kept same) */}
        <div className="md:hidden flex items-center">
          <LanguageSelector /> 
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-7 w-7" />
          </button>
           
        </div>
         
      </div>

      {/* Full Screen Mobile Menu Overlay (Requires Mobile Logo Update) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col h-[100dvh]" 
          >
            {/* 1. Mobile Header (Logo + Close Button) - REVISED */}
            <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
              {/* Using the image here too, but you might want to keep it simple text if the image is too big */}
               <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="inline-block">
                <img 
                  src="/Images/main_logo.png" 
                  alt="Nexvo Logo" 
                  className="h-8 w-auto" 
                />
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            {/* 2. Navigation Links (Visible in the middle) */}
            <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col">
              <div className="space-y-1">
                <a
                  href="/#templates"
                  onClick={(e) => handleNavClick(e, "templates")}
                  className="flex justify-between items-center p-4 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  {t('header.nav.templates')}
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </a>

                <a
                  href="/#why-choose-us"
                  onClick={(e) => handleNavClick(e, "why-choose-us")}
                  className="flex justify-between items-center p-4 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  {t('header.nav.features')}
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </a>

                <Link
                  to="/blogs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex justify-between items-center p-4 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  {t('header.nav.blog')}
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex justify-between items-center p-4 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  {t('header.nav.contact')}
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </div>
            </div>

            {/* 3. Bottom Actions (Pinned to bottom) */}
            <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
              <div className="flex flex-col space-y-3">
                {/* Create CV Button */}
                <button 
                  onClick={handleCreateCV} 
                  className="w-full py-3.5 px-4 bg-blue-700 text-white text-lg font-medium rounded-xl active:scale-[0.98] transition-transform shadow-sm hover:bg-blue-600 flex justify-center items-center"
                >
                  {t('header.actions.createCV', 'Create CV')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                
                {/* Sign In Button */}
                {onSignIn && (
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onSignIn();
                    }} 
                    className="w-full py-3.5 px-4 bg-white border border-gray-200 text-gray-700 text-lg font-medium rounded-xl active:scale-[0.98] transition-all hover:bg-gray-50 hover:border-gray-300"
                  >
                    {t('header.actions.signIn')}
                  </button>
                )}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
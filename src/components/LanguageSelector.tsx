import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ge', name: 'Deutsch', flag: '🇩🇪' },
];

interface LanguageSelectorProps {
  className?: string;
}

export default function LanguageSelector({ className = '' }: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Find the currently selected language object
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    
    // Update document direction for RTL languages
    document.documentElement.dir = languageCode === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        // REVISED: Added space-x-1 and classes for the short code
        className="flex items-center space-x-1 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {/* 1. Globe icon */}
        <Globe className="h-5 w-5 text-gray-600 flex-shrink-0" />
        
        {/* 2. Short Code (e.g., "en") */}
        <span className="text-sm font-semibold uppercase text-gray-800">
          {currentLanguage.code}
        </span>
        
        {/* 3. Chevron Down icon */}
        <ChevronDown 
          className={`h-4 w-4 text-gray-600 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-36 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                i18n.language === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span className="text-base sm:text-lg flex-shrink-0">{language.flag}</span>
              <span className="font-medium text-sm sm:text-base truncate">{language.name}</span>
              {i18n.language === language.code && (
                <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0">
                  Current
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import added
import {
  HelpCircle,
  ChevronDown,
  Search,
} from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

export default function FAQPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Moved categories inside component to use translation
  const categories = [
    { name: t('faq.categories.general'), color: "bg-blue-500" },
    { name: t('faq.categories.templates'), color: "bg-purple-500" },
    { name: t('faq.categories.features'), color: "bg-green-500" },
    { name: t('faq.categories.privacy'), color: "bg-red-500" },
    { name: t('faq.categories.billing'), color: "bg-yellow-500" },
    { name: t('faq.categories.support'), color: "bg-indigo-500" }
  ];

  // Moved FAQs inside component to use translation
  const faqs: FAQ[] = [
    // General Questions
    {
      id: 1,
      question: t('faq.questions.q1.question'),
      answer: t('faq.questions.q1.answer'),
      category: t('faq.categories.general'),
      tags: ["basics", "how-to", "getting-started"]
    },
    {
      id: 2,
      question: t('faq.questions.q2.question'),
      answer: t('faq.questions.q2.answer'),
      category: t('faq.categories.general'),
      tags: ["time", "speed", "quick"]
    },
    {
      id: 3,
      question: t('faq.questions.q3.question'),
      answer: t('faq.questions.q3.answer'),
      category: t('faq.categories.general'),
      tags: ["account", "signup", "registration"]
    },
    {
      id: 4,
      question: t('faq.questions.q4.question'),
      answer: t('faq.questions.q4.answer'),
      category: t('faq.categories.general'),
      tags: ["free", "pricing", "cost"]
    },

    // Templates & Design
    {
      id: 5,
      question: t('faq.questions.q5.question'),
      answer: t('faq.questions.q5.answer'),
      category: t('faq.categories.templates'),
      tags: ["templates", "design", "variety"]
    },
    {
      id: 6,
      question: t('faq.questions.q6.question'),
      answer: t('faq.questions.q6.answer'),
      category: t('faq.categories.templates'),
      tags: ["customization", "personalization", "design"]
    },
    {
      id: 7,
      question: t('faq.questions.q7.question'),
      answer: t('faq.questions.q7.answer'),
      category: t('faq.categories.templates'),
      tags: ["ats", "optimization", "scanning"]
    },

    // Features & Functionality
    {
      id: 8,
      question: t('faq.questions.q8.question'),
      answer: t('faq.questions.q8.answer'),
      category: t('faq.categories.features'),
      tags: ["download", "pdf", "docx", "formats"]
    },
    {
      id: 9,
      question: t('faq.questions.q9.question'),
      answer: t('faq.questions.q9.answer'),
      category: t('faq.categories.features'),
      tags: ["editing", "updates", "changes"]
    },
    {
      id: 10,
      question: t('faq.questions.q10.question'),
      answer: t('faq.questions.q10.answer'),
      category: t('faq.categories.features'),
      tags: ["mobile", "responsive", "device-compatibility"]
    },

    // Privacy & Security
    {
      id: 11,
      question: t('faq.questions.q11.question'),
      answer: t('faq.questions.q11.answer'),
      category: t('faq.categories.privacy'),
      tags: ["security", "privacy", "data-protection"]
    },
    {
      id: 12,
      question: t('faq.questions.q12.question'),
      answer: t('faq.questions.q12.answer'),
      category: t('faq.categories.privacy'),
      tags: ["sharing", "employers", "third-parties"]
    },
    {
      id: 13,
      question: t('faq.questions.q13.question'),
      answer: t('faq.questions.q13.answer'),
      category: t('faq.categories.privacy'),
      tags: ["deletion", "gdpr", "data-control"]
    },

    // Billing & Pricing
    {
      id: 14,
      question: t('faq.questions.q14.question'),
      answer: t('faq.questions.q14.answer'),
      category: t('faq.categories.billing'),
      tags: ["payment", "credit-card", "paypal"]
    },
    {
      id: 15,
      question: t('faq.questions.q15.question'),
      answer: t('faq.questions.q15.answer'),
      category: t('faq.categories.billing'),
      tags: ["cancellation", "subscription", "billing"]
    },
    {
      id: 16,
      question: t('faq.questions.q16.question'),
      answer: t('faq.questions.q16.answer'),
      category: t('faq.categories.billing'),
      tags: ["refund", "money-back", "guarantee"]
    },

    // Support & Help
    {
      id: 17,
      question: t('faq.questions.q17.question'),
      answer: t('faq.questions.q17.answer'),
      category: t('faq.categories.support'),
      tags: ["help", "support", "assistance"]
    },
    {
      id: 18,
      question: t('faq.questions.q18.question'),
      answer: t('faq.questions.q18.answer'),
      category: t('faq.categories.support'),
      tags: ["career-advice", "review", "guidance"]
    },
    {
      id: 19,
      question: t('faq.questions.q19.question'),
      answer: t('faq.questions.q19.answer'),
      category: t('faq.categories.support'),
      tags: ["technical", "bugs", "troubleshooting"]
    },

    // Advanced Features
    {
      id: 20,
      question: t('faq.questions.q20.question'),
      answer: t('faq.questions.q20.answer'),
      category: t('faq.categories.features'),
      tags: ["multiple-cvs", "versions", "tailoring"]
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter(faq => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || faq.question.toLowerCase().includes(q) ||
                           faq.answer.toLowerCase().includes(q) ||
                           faq.tags.some(tag => tag.toLowerCase().includes(q));
    
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (idx: number) => {
    setOpenFAQ(openFAQ === idx ? null : idx);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
            {t('faq.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('faq.hero.subtitle')}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={t('faq.search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="All">{t('faq.filter.allCategories')}</option>
                {categories.map(category => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('faq.filter.all')}
            </button>
            {categories.map(category => {
          
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    selectedCategory === category.name
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
            
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {t('faq.results.showing', { count: filteredFAQs.length, total: faqs.length })}
            {searchQuery && t('faq.results.forQuery', { query: searchQuery })}
            {selectedCategory !== 'All' && t('faq.results.inCategory', { category: selectedCategory })}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('faq.noResults.title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('faq.noResults.subtitle')}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-blue-700 hover:text-blue-700 font-medium"
              >
                {t('faq.noResults.clearFilters')}
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq, idx) => (
              <motion.div
                key={faq.id}
                className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex justify-between items-start group"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="hover:font-medium text-gray-900  transition-colors mb-2">
                      {faq.question}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium px-2 py-1 bg-blue-100 rounded">
                        {faq.category}
                      </span>
                      {faq.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs text-gray-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-700" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Still Need Help Section */}
        <div className="mt-16 bg-white rounded-xl p-8 text-black text-center">
          <h3 className="text-2xl mb-4 font-medium text-gray-900">{t('faq.support.title')}</h3>
          <p className="text-black mb-6 max-w-2xl mx-auto">
            {t('faq.support.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <span>{t('faq.support.contactBtn')}</span>
            </button>
            <a
              href="tel:+237683094941"
        className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <span>{t('faq.support.callBtn')}</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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

const faqs: FAQ[] = [
  // General Questions
  {
    id: 1,
    question: "What is QuickCV and how does it work?",
    answer: "QuickCV is an online CV builder that helps you create professional, ATS-optimized resumes in minutes. Simply choose a template, fill in your information using our guided forms, and download your CV in PDF or DOCX format. Our platform uses modern design principles and hiring best practices to ensure your CV stands out.",
    category: "General",
    tags: ["basics", "how-to", "getting-started"]
  },
  {
    id: 2,
    question: "How quickly can I create a professional CV?",
    answer: "Most users complete their CV in 8-12 minutes. Our smart forms auto-suggest content and our AI assistant helps optimize your descriptions for maximum impact. The exact time depends on how much information you have prepared and which template you choose.",
    category: "General",
    tags: ["time", "speed", "quick"]
  },
  {
    id: 3,
    question: "Do I need to create an account to use QuickCV?",
    answer: "No signup is required to start building your CV! You can create and download your first CV without creating an account. However, creating a free account allows you to save your progress, access your CV later, and make updates whenever needed.",
    category: "General",
    tags: ["account", "signup", "registration"]
  },
  {
    id: 4,
    question: "Is QuickCV really free to use?",
    answer: "Yes! QuickCV offers a free tier that includes access to professional templates, basic customization options, and PDF downloads. Premium features like advanced templates, DOCX exports, and priority support are available with our paid plans.",
    category: "General",
    tags: ["free", "pricing", "cost"]
  },

  // Templates & Design
  {
    id: 5,
    question: "How many CV templates are available?",
    answer: "We offer 15+ professionally designed templates across different styles - from modern and creative to traditional and executive formats. Each template is crafted by design experts and optimized for different industries and career levels.",
    category: "Templates",
    tags: ["templates", "design", "variety"]
  },
  {
    id: 6,
    question: "Can I customize the templates to match my style?",
    answer: "Absolutely! You can customize colors, fonts, section layouts, and spacing. Our templates are designed to be flexible while maintaining professional standards and ATS compatibility. Premium users get access to advanced customization options.",
    category: "Templates",
    tags: ["customization", "personalization", "design"]
  },
  {
    id: 7,
    question: "What does ATS-optimized mean?",
    answer: "ATS (Applicant Tracking System) optimization means your CV is formatted to be easily read by the software companies use to scan resumes. Our templates use standard fonts, clear section headers, and proper formatting to ensure your CV passes through ATS filters successfully.",
    category: "Templates",
    tags: ["ats", "optimization", "scanning"]
  },

  // Features & Functionality
  {
    id: 8,
    question: "What file formats can I download my CV in?",
    answer: "All users can download their CV as a high-quality PDF. Premium users also get access to DOCX (Microsoft Word) format, which is useful for making quick edits or when employers specifically request Word documents.",
    category: "Features",
    tags: ["download", "pdf", "docx", "formats"]
  },
  {
    id: 9,
    question: "Can I edit my CV after downloading it?",
    answer: "Yes! If you create an account, your CV is automatically saved and you can return to edit it anytime. You can update information, change templates, adjust formatting, and download updated versions whenever needed.",
    category: "Features",
    tags: ["editing", "updates", "changes"]
  },
  {
    id: 10,
    question: "Does QuickCV work on mobile devices?",
    answer: "Yes! QuickCV is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. You can create, edit, and download your CV from any device with an internet connection.",
    category: "Features",
    tags: ["mobile", "responsive", "device-compatibility"]
  },

  // Privacy & Security
  {
    id: 11,
    question: "How secure is my personal information?",
    answer: "We take security seriously. All data is encrypted in transit and at rest. We use enterprise-grade security measures and never sell your personal information to third parties. You can delete your account and data at any time.",
    category: "Privacy",
    tags: ["security", "privacy", "data-protection"]
  },
  {
    id: 12,
    question: "Do you share my information with employers?",
    answer: "No, we never share your personal information with employers or third parties without your explicit consent. Your CV data belongs to you, and you have full control over how it's used and shared.",
    category: "Privacy",
    tags: ["sharing", "employers", "third-parties"]
  },
  {
    id: 13,
    question: "Can I delete my account and data?",
    answer: "Yes, you have full control over your data. You can delete your account and all associated data at any time from your account settings. This action is permanent and cannot be undone, so please make sure to download any CVs you want to keep first.",
    category: "Privacy",
    tags: ["deletion", "gdpr", "data-control"]
  },

  // Billing & Pricing
  {
    id: 14,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various local payment methods depending on your region. All payments are processed securely through industry-standard payment processors.",
    category: "Billing",
    tags: ["payment", "credit-card", "paypal"]
  },
  {
    id: 15,
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees, and you'll continue to have premium access until the end of your current billing period.",
    category: "Billing",
    tags: ["cancellation", "subscription", "billing"]
  },
  {
    id: 16,
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all premium subscriptions. If you're not satisfied with our service, contact our support team within 30 days of purchase for a full refund.",
    category: "Billing",
    tags: ["refund", "money-back", "guarantee"]
  },

  // Support & Help
  {
    id: 17,
    question: "How can I get help if I'm stuck?",
    answer: "We offer multiple support channels: live chat during business hours, email support (response within 24 hours), comprehensive help documentation, and video tutorials. Premium users get priority support with faster response times.",
    category: "Support",
    tags: ["help", "support", "assistance"]
  },
  {
    id: 18,
    question: "Do you provide career advice or CV review services?",
    answer: "While QuickCV focuses on the technical aspects of CV creation, we partner with career experts to provide guidance. Our blog features career tips, and premium users get access to CV review checklists and industry-specific advice.",
    category: "Support",
    tags: ["career-advice", "review", "guidance"]
  },
  {
    id: 19,
    question: "What if I encounter a technical issue?",
    answer: "Technical issues are rare, but if you encounter any problems, our support team is here to help. Contact us via live chat or email with details about the issue, and we'll resolve it quickly. Most technical issues are resolved within a few hours.",
    category: "Support",
    tags: ["technical", "bugs", "troubleshooting"]
  },

  // Advanced Features
  {
    id: 20,
    question: "Can I create multiple CVs for different job applications?",
    answer: "Yes! Premium users can create unlimited CVs and save different versions tailored for specific roles or industries. This allows you to highlight relevant skills and experience for each application.",
    category: "Features",
    tags: ["multiple-cvs", "versions", "tailoring"]
  }
];

const categories = [
  { name: "General", color: "bg-blue-500" },
  { name: "Templates", color: "bg-purple-500" },
  { name: "Features", color: "bg-green-500" },
  { name: "Privacy", color: "bg-red-500" },
  { name: "Billing", color: "bg-yellow-500" },
  { name: "Support", color: "bg-indigo-500" }
];

export default function FAQPage() {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about QuickCV, our features, and how to create the perfect CV.
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
                  placeholder="Search FAQs..."
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
                <option value="All">All Categories</option>
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
              All
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
            Showing {filteredFAQs.length} of {faqs.length} questions
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-blue-700 hover:text-blue-700 font-medium"
              >
                Clear filters
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
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                      {faq.question}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
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
          <h3 className="text-2xl mb-4 font-medium text-gray-900">Still need help?</h3>
          <p className="text-black mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our friendly support team is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <span>Contact Support</span>
            </button>
            <a
              href="tel:+237683094941"
        className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

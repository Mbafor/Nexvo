import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  CheckCircle2, 
  AlertCircle,
  MessageCircle,
  Headphones,
  Building2,
  Star,
  MapPin, // Added for Contact Info
  Phone, // Added for Contact Info
  Mail, // Added for Contact Info
} from 'lucide-react';
import { sendContactMessage } from '../utils/contactService';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'support' | 'business' | 'bug' | 'feature';
  urgency: 'low' | 'medium' | 'high';
}

// --- Component Start ---

export default function ContactPage() {
  const { t } = useTranslation();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general',
    urgency: 'medium'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value as any // Added 'as any' since select values don't strictly match the type on change events
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error(t('contact.validation.requiredFields', 'Please fill in all required fields.'));
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error(t('contact.validation.invalidEmail', 'Please enter a valid email address.'));
      }

      // Send contact message
      await sendContactMessage(formData);
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          inquiryType: 'general',
          urgency: 'medium'
        });
        setSubmitStatus('idle');
      }, 3000);

    } catch (error: any) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      // Ensure we display a message if the caught error doesn't have one
      setErrorMessage(error.message || t('contact.validation.genericError', 'An unexpected error occurred.')); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const inquiryTypes = [
    { value: 'general', label: t('contact.form.inquiryTypes.general'), icon: MessageCircle },
    { value: 'support', label: t('contact.form.inquiryTypes.support'), icon: Headphones },
    { value: 'business', label: t('contact.form.inquiryTypes.business'), icon: Building2 },
    { value: 'bug', label: t('contact.form.inquiryTypes.bug'), icon: AlertCircle },
    { value: 'feature', label: t('contact.form.inquiryTypes.feature'), icon: Star }
  ];

  const urgencyLevels = [
    { value: 'low', label: t('contact.form.urgency.low'), color: 'text-green-600' },
    { value: 'medium', label: t('contact.form.urgency.medium'), color: 'text-yellow-600' },
    { value: 'high', label: t('contact.form.urgency.high'), color: 'text-red-600' }
  ];

  // Helper function to get the current urgency color for the select box
  const getCurrentUrgencyColor = () => {
    const level = urgencyLevels.find(l => l.value === formData.urgency);
    return level ? level.color : 'text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50"> {/* Added subtle background color */}
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32"> {/* Increased padding for spacing */}
        
        {/* Hero/Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-6">
            {t('contact.hero.title_start')} <span className="text-blue-700"> {t('contact.hero.title_highlight')} </span> {t('contact.hero.title_end')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.hero.subtitle')}
          </p>
        </motion.div>

        
        {/* Main Content: Contact Info (Left) and Form (Right) */}
        <div className="grid lg:grid-cols-3 gap-12">

          {/* 1. Contact Information Section (Left Column) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl border border-gray-200 h-fit"
          >
            <h3 className="text-3xl font-medium text-gray-900 mb-6">
              {t('contact.info.title', 'Contact Details')}
            </h3>
            <p className="text-gray-600 mb-8">{t('contact.info.description', 'Reach out to us through our direct channels.')}</p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">{t('contact.info.emailLabel', 'Email Support')}</p>
                  <a href="mailto:mbaforfoghang@gmail.com" className="text-blue-700 hover:text-blue-500 transition-colors">
                    mbaforfoghang@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">{t('contact.info.phoneLabel', 'Phone Number')}</p>
                  <p className="text-gray-700">+(237) 683094941</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">{t('contact.info.addressLabel', 'Office')}</p>
                  <p className="text-gray-700">KNUST Baby Brunei, Room 36J</p>
                  <p className="text-gray-700">Kumasi, Ghana</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Contact Form (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-200"> {/* Enhanced container styling */}
              <h3 className="text-3xl font-medium text-gray-900 mb-8"> {/* Bolder title */}
                {t('contact.form.title')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.nameLabel')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      // Enhanced input styling
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                      placeholder={t('contact.form.namePlaceholder')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.emailLabel')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      // Enhanced input styling
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                      placeholder={t('contact.form.emailPlaceholder')}
                      required
                    />
                  </div>
                </div>

                {/* Inquiry Type and Urgency */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.inquiryTypeLabel')}
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      // Enhanced select styling for better appearance
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.priorityLabel')}
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      // Highlight the urgency based on selection using a helper class
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all ${getCurrentUrgencyColor()}`}
                    >
                      {urgencyLevels.map(level => (
                        <option key={level.value} value={level.value} className={level.color}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.subjectLabel')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    // Enhanced input styling
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    placeholder={t('contact.form.subjectPlaceholder')}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.messageLabel')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    // Enhanced textarea styling
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                    required
                  />
                </div>

                {/* Submit Status */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-green-800 font-medium">{t('contact.status.success.title')}</p>
                        <p className="text-green-700 text-sm">{t('contact.status.success.message')}</p>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3"
                    >
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className="text-red-800 font-medium">{t('contact.status.error.title')}</p>
                        <p className="text-red-700 text-sm">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-blue-700 text-white hover:bg-blue-600 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl font-semibold" // Enhanced button styling
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('contact.form.sending')}</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      <span>{t('contact.form.sent')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('contact.form.send')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      
      
      <Footer />
    </div>
  );
}
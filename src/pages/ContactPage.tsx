import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  MessageCircle,
  Headphones,
  Globe,
  Linkedin,
  Twitter,
  Building2,
  Users,
  Star
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

export default function ContactPage() {
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
      [name]: value
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
        throw new Error('Please fill in all required fields');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
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
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      subtitle: 'Send us a message anytime',
      value: 'mbaforfoghang@gmail.com',
      link: 'mailto:mbaforfoghang@gmail.com',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      subtitle: 'Mon-Fri from 8am to 6pm',
      value: '+237 683094941',
      link: 'tel:+237683094941',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      subtitle: 'We\'re here to help',
      value: 'Mon-Fri: 8am-6pm PST\nSat-Sun: 10am-4pm PST',
      link: null,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle },
    { value: 'support', label: 'Technical Support', icon: Headphones },
    { value: 'business', label: 'Business Partnership', icon: Building2 },
    { value: 'bug', label: 'Bug Report', icon: AlertCircle },
    { value: 'feature', label: 'Feature Request', icon: Star }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', color: 'text-green-600' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600' },
    { value: 'high', label: 'High Priority', color: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-700 mb-6">
            Get in Touch with Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about QuickCV? Need help with your CV? Want to partner with us? 
            We're here to help and would love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-6 w-6 mr-2 text-blue-600" />
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className={`p-3 rounded-lg ${item.color} flex-shrink-0`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.subtitle}</p>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-blue-600 hover:text-blue-800 transition-colors whitespace-pre-line text-sm font-medium"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-800 whitespace-pre-line text-sm font-medium">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-600" />
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="mailto:mbaforfoghang@gmail.com"
                  className="p-3 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className=" bg-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Response Time</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">General Inquiries</span>
                  <span className="font-semibold">&lt; 2 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Technical Support</span>
                  <span className="font-semibold">&lt; 30 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Business Partnerships</span>
                  <span className="font-semibold">&lt; 24 hours</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Send className="h-6 w-6 mr-2 text-blue-600" />
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Inquiry Type and Urgency */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                      Priority Level
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      {urgencyLevels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Brief subject of your message"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder="Tell us how we can help you..."
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
                      className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-green-800 font-medium">Message sent successfully!</p>
                        <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3"
                    >
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className="text-red-800 font-medium">Failed to send message</p>
                        <p className="text-red-700 text-sm">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-700 text-white hover:bg-blue-800 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
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
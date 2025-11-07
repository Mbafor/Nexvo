
// src/components/LandingPage.tsx
import { useState, useEffect } from "react";
import { Zap, Sparkles, Shield, Award, Mail, Phone, MapPin, Clock, Send, MessageCircle, Linkedin, Twitter, Briefcase, BarChart3, Palette, Headphones, FileText, TrendingUp, Globe, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import LatestPosts from "../components/LatestPosts";
import { sendContactMessage } from "../utils/contactService";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";



const templates = [
  { 
    img: "creative.png", 
    name: "Creative Professional", 
    description: "Stand out with modern design",
    features: ["Portfolio Integration", "Creative Layouts", "Color Customization"],
    popular: false
  },
  { 
    img: "modern.png", 
    name: "Modern Executive", 
    description: "Clean, professional excellence",
    features: ["ATS Optimized", "Executive Format", "Industry Standard"],
    popular: true
  },
  { 
    img: "ats.jpg", 
    name: "ATS Specialist", 
    description: "Guaranteed ATS compatibility",
    features: ["100% ATS Pass", "Keyword Optimized", "HR Approved"],
    popular: false
  },
];

const stats = [
  { number: "50K+", label: "CVs Created", icon: FileText },
  { number: "95%", label: "Success Rate", icon: TrendingUp },
  { number: "24h", label: "Average Response", icon: Zap },
  { number: "150+", label: "Countries", icon: Globe },
];



const testimonials = [
  { 
    name: "Sarah Chen", 
    role: "Software Engineer at Google",
    review: "I landed my dream job at Google within 2 weeks of using QuickCV. The ATS optimization really works!",
    avatar: "👩‍💻",
    rating: 5,
    company: "Google"
  },
  { 
    name: "Marcus Johnson", 
    role: "Marketing Director at Meta",
    review: "The templates are incredibly professional. Got 3 interview calls in my first week of applying.",
    avatar: "👨‍💼",
    rating: 5,
    company: "Meta"
  },
  { 
    name: "Emily Rodriguez", 
    role: "UX Designer at Apple",
    review: "Clean, modern, and effective. The creative template perfectly showcased my design portfolio.",
    avatar: "👩‍🎨",
    rating: 5,
    company: "Apple"
  },
  { 
    name: "David Kim", 
    role: "Data Scientist at Microsoft",
    review: "Amazing experience! The ATS optimization helped me get past initial screenings every time.",
    avatar: "👨‍🔬",
    rating: 5,
    company: "Microsoft"
  }
];

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn?: () => void;
}

export default function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Testimonial carousel
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // Mouse tracking for interactive elements
  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //   };
  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => window.removeEventListener('mousemove', handleMouseMove);
  // }, []);

  const toggleFAQ = (idx: number) => setOpenFAQ(openFAQ === idx ? null : idx);



  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');

    try {
      await sendContactMessage({
        name: contactForm.name,
        email: contactForm.email,
        subject: 'Landing Page Contact',
        message: contactForm.message,
        inquiryType: 'general',
        urgency: 'medium'
      });
      
      setContactStatus('success');
      setContactForm({ name: '', email: '', message: '' });
      
      setTimeout(() => setContactStatus('idle'), 3000);
    } catch (error) {
      setContactStatus('error');
      setTimeout(() => setContactStatus('idle'), 3000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const faqs = [
    { 
      question: "How does QuickCV ensure ATS compatibility?", 
      answer: "Our templates are tested with 50+ major ATS systems including Workday, Greenhouse, and BambooHR. We use clean formatting, standard fonts, and proven structures that pass ATS scans with 95%+ accuracy." 
    },
    { 
      question: "Can I customize the templates to match my industry?", 
      answer: "Absolutely! Each template comes with industry-specific variations and customization options. You can adjust colors, fonts, and layouts while maintaining ATS compatibility." 
    },
    { 
      question: "What makes QuickCV different from other CV builders?", 
      answer: "We focus on three key areas: ATS optimization, professional design, and speed. Our templates are created by HR professionals and have a proven track record of landing interviews at top companies." 
    },
    { 
      question: "Do you offer support after I download my CV?", 
      answer: "Yes! We provide 30 days of free support including template updates, formatting assistance, and career advice. Our team of career experts is here to help you succeed." 
    },
    { 
      question: "How quickly can I create a professional CV?", 
      answer: "Most users complete their CV in 8-12 minutes. Our smart forms auto-suggest content and our AI assistant helps optimize your descriptions for maximum impact." 
    },
    { 
      question: "Is my personal information secure?", 
      answer: "Security is our top priority. We use enterprise-grade encryption, don't store personal data beyond your session, and are fully GDPR compliant. Your information is never shared with third parties." 
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/6 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300/4 rounded-full blur-2xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <Header onGetStarted={onGetStarted} onSignIn={onSignIn} />

      <main>
        {/* Hero Section - Blue, Black, White Theme */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-gray-50/40" />
          </motion.div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    {/* Left Section - Text Content */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Trusted Tag */}
      <motion.div variants={itemVariants}>
        <div className="inline-flex items-center space-x-2 bg-blue-100 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            Trusted by 50,000+ professionals
          </span>
        </div>
      </motion.div>

      {/* Hero Title */}
      <motion.h1
        variants={itemVariants}
        className="text-5xl lg:text-7xl font-bold leading-tight"
      >
        <span className="text-blue-600 bg-clip-text">
          Build Your Perfect CV in Minutes
        </span>
        <br />
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-xl lg:text-2xl text-black-700 leading-relaxed max-w-2xl"
      >
        Create ATS-optimized, professional CVs that land interviews at top
        companies.
        <span className="text-blue-600"> No signup required.</span>
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4"
      >
        <motion.button
          onClick={onGetStarted}
          className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white text-lg font-semibold shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center space-x-3">
            <span>Create Your CV Free</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-4 gap-6 pt-8"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className="text-center"
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-2xl lg:text-3xl font-bold text-blue-800 mb-1">
              {stat.number}
            </div>
            <div className="text-sm text-blue-600/80">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>

    {/* Right Section - Floating Hero Image */}
    <motion.div
      className="relative lg:block hidden"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="relative">
        {/* Main CV Mockup */}
        <motion.div
          className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto"
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="/Images/hero.jpg"
            alt="Professional CV preview"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Zap className="h-8 w-8 text-white" />
        </motion.div>

        <motion.div
          className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <Shield className="h-10 w-10 text-white" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 -right-12 w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center shadow-xl"
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        >
          <Award className="h-6 w-6 text-white" />
        </motion.div>
      </div>
    </motion.div>
  </div>
</div>
        </section>




{/* Why Choose Us Section - Blue Modern Theme with Lucide Icons */}
<section id="why-choose-us" className="py-24 bg-gradient-to-b from-blue-50 to-blue-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-blue-600">
        Why Choose Us
      </h2>
      <p className="text-lg text-black max-w-3xl mx-auto">
        Our platform blends smart design, technology, and analytics to help you stand out in today’s competitive job market.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          icon: <Briefcase className="w-10 h-10 text-blue-700 group-hover:text-blue-800 transition-colors" />,
          title: "HR-Approved Templates",
          desc: "Professionally designed templates that pass ATS scans and instantly grab recruiters’ attention."
        },
        {
          icon: <Zap className="w-10 h-10 text-blue-700 group-hover:text-blue-800 transition-colors" />,
          title: "Fast & Easy to Use",
          desc: "Build a polished resume in minutes using our intuitive editor and real-time design suggestions."
        },
        {
          icon: <BarChart3 className="w-10 h-10 text-blue-700 group-hover:text-blue-800 transition-colors" />,
          title: "Data-Driven Insights",
          desc: "We analyze hiring patterns to give you resume tips that match today’s top recruiter trends."
        },
        {
          icon: <Globe className="w-10 h-10 text-blue-700 group-hover:text-blue-800 transition-colors" />,
          title: "Global Compatibility",
          desc: "Optimized for international standards — perfect for any role, anywhere in the world."
        },
        {
          icon: <Palette className="w-10 h-10 text-blue-700 group-hover:text-blue-800 transition-colors" />,
          title: "Customizable Designs",
          desc: "Change colors, fonts, and layouts effortlessly to make your resume reflect your personality."
        },
        {
          icon: <Headphones className="w-10 h-10 text-blue-700 group-hover:text-blue-800 transition-colors" />,
          title: "Dedicated Support",
          desc: "Our friendly team is always ready to help you build your perfect resume, every step of the way."
        }
      ].map((item, idx) => (
        <motion.div
          key={idx}
          className="group bg-white rounded-3xl p-8 border border-blue-100 shadow-md hover:shadow-blue-300 transition-all duration-500 hover:-translate-y-3 hover:bg-gradient-to-b hover:from-blue-50 hover:to-blue-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="mb-5">{item.icon}</div>
          <h3 className="text-2xl font-semibold text-blue-800 mb-3">
            {item.title}
          </h3>
          <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


        {/* Templates Section - Enhanced */}
      {/* Templates Section - White & Blue Theme */}
<section id="templates" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-blue-600">
        Professional Templates
      </h2>
      <p className="text-lg text-black max-w-3xl mx-auto">
        Choose from our collection of HR-approved templates designed to pass ATS systems and impress hiring managers.
      </p>
    </motion.div>

    <div className="grid lg:grid-cols-3 gap-10">
      {templates.map((template, idx) => (
        <motion.div
          key={idx}
          className="group relative bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, y: -6 }}
        >
          <div className="aspect-[3/4] overflow-hidden rounded-t-3xl">
            <img 
              src={`/Images/${template.img}`} 
              alt={template.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {template.name}
            </h3>
            <p className="text-gray-500 mb-6">
              Perfect for {template.name.toLowerCase()} professionals
            </p>
            <button 
              onClick={onGetStarted}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-blue-500/25"
            >
              Use This Template
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
        {/* Testimonials Section - Enhanced */}
        <section className="py-24 bg-blue-50/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-blue-600">
                Success Stories
              </h2>
              <p className="text-xl text-black max-w-3xl mx-auto">
                Join thousands of professionals who landed their dream jobs using QuickCV
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  className="group bg-white backdrop-blur-sm rounded-3xl p-8 border border-blue-100 hover:border-blue-200 transition-all duration-500 shadow-lg hover:shadow-xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center font-bold text-white mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4 leading-relaxed">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-blue-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
        
{/* Latest Blog Posts - Enhanced */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-blue-600">
        Expert Career Insights
      </h2>
      <p className="text-xl text-blue-700 max-w-3xl mx-auto">
        Stay ahead with the latest tips and strategies from career experts
      </p>
    </motion.div>
    <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
      <LatestPosts />
    </div>
  </div>
</section>

{/* FAQ Section - Enhanced */}
<section id="faq" className="py-24 bg-white">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-blue-600">
        Frequently Asked Questions
      </h2>
      <p className="text-xl text-blue-600/80">
        Everything you need to know about creating your perfect CV
      </p>
    </motion.div>

    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <motion.div
          key={idx}
          className="bg-blue-50 rounded-2xl border border-blue-100 hover:border-blue-300 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => toggleFAQ(idx)}
            className="w-full p-6 text-left flex justify-between items-center group"
          >
            <h3 className="font-semibold text-blue-900 group-hover:text-blue-600 transition-colors">
              {faq.question}
            </h3>
            <motion.div
              animate={{ rotate: openFAQ === idx ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </button>
          <AnimatePresence>
            {openFAQ === idx && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <p className="text-blue-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Final CTA Section */}
<section className="py-24 bg-blue-50">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <h2 className="text-4xl lg:text-6xl font-bold text-blue-900">
        Ready to Land Your Dream Job?
      </h2>
      <p className="text-xl lg:text-2xl text-blue-700 max-w-2xl mx-auto">
        Join 50,000+ professionals who've successfully created their perfect CV with QuickCV
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          onClick={onGetStarted}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white text-lg font-semibold shadow-lg hover:shadow-blue-400/50 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center space-x-3">
            <span>Start Building Now</span>
            <ArrowRight className="h-5 w-5" />
          </span>
        </motion.button>
        <motion.a
          href="#templates"
          className="px-8 py-4 border-2 border-blue-300 hover:bg-blue-100 rounded-2xl text-blue-700 font-semibold transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Browse Templates
        </motion.a>
      </div>
    </motion.div>
  </div>
</section>


{/* Contact Section */}
<section id="contact" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-blue-600">
        Get in <span className="text-black">Touch</span>
      </h2>
      <p className="text-xl text-black max-w-3xl mx-auto">
        Have questions? Need help? Want to partner with us? We'd love to hear from you.
      </p>
    </motion.div>

    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="bg-blue-50 backdrop-blur-sm rounded-2xl p-8 border border-blue-200">
          <h3 className="text-2xl font-bold mb-6 flex items-center text-blue-900">
            <MessageCircle className="h-6 w-6 mr-3 text-blue-600" />
            Contact Information
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email Us</p>
                <a href="mailto:mbaforfoghang@gmail.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                  mbaforfoghang@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Call Us</p>
                <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-700 transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Visit Us</p>
                <p className="text-gray-700">123 Business Ave, Suite 100</p>
                <p className="text-gray-700">San Francisco, CA 94107</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Business Hours</p>
                <p className="text-gray-700">Mon-Fri: 8am-6pm PST</p>
                <p className="text-gray-700">Sat-Sun: 10am-4pm PST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-blue-50 backdrop-blur-sm rounded-2xl p-8 border border-blue-200">
          <h4 className="text-lg font-bold mb-4 text-blue-900">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://linkedin.com/company/quickcv" className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <Linkedin className="h-5 w-5 text-white" />
            </a>
            <a href="https://twitter.com/quickcv" className="p-3 bg-sky-500 rounded-lg hover:bg-sky-600 transition-colors">
              <Twitter className="h-5 w-5 text-white" />
            </a>
            <a href="mailto:hello@quickcv.com" className="p-3 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
              <Mail className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Quick Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-blue-50 backdrop-blur-sm rounded-2xl p-8 border border-blue-200">
          <h3 className="text-2xl font-bold mb-6 flex items-center text-blue-900">
            <Send className="h-6 w-6 mr-3 text-blue-600" />
            Send us a Message
          </h3>
          
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>
            <div>
              <textarea
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Your Message"
                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                required
              />
            </div>
            <button
              type="submit"
              disabled={contactStatus === 'sending' || contactStatus === 'success'}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-lg font-semibold text-white disabled:opacity-50"
            >
              {contactStatus === 'sending' ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : contactStatus === 'success' ? (
                <span>Message Sent!</span>
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
</section>

      <Footer onGetStarted={onGetStarted} />

    </div>
  );
}
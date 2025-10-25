
// src/components/LandingPage.tsx
import { useState } from "react";
import { FileText, Zap, Sparkles, Menu, X, ArrowRight, Shield, Users, Award, Play, Globe, TrendingUp, Mail, Phone, MapPin, Clock, Send, MessageCircle, Linkedin, Twitter, Briefcase, BarChart3, Palette, Headphones } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import LatestPosts from "../components/LatestPosts";
import { sendContactMessage } from "../utils/contactService";



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

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Create professional CVs in under 10 minutes with our streamlined process",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    icon: Shield,
    title: "ATS Guaranteed",
    description: "100% compatibility with all major Applicant Tracking Systems",
    gradient: "from-blue-500 to-blue-700"
  },
  {
    icon: Users,
    title: "Expert Approved",
    description: "Templates designed by HR professionals and industry experts",
    gradient: "from-blue-300 to-blue-500"
  },
  {
    icon: Award,
    title: "Industry Leading",
    description: "Trusted by professionals at top companies worldwide",
    gradient: "from-blue-600 to-blue-800"
  },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

  const handleMobileNavClick = (e: React.SyntheticEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

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
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"
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
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-300/4 rounded-full blur-2xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Enhanced Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QuickCV
              </h2>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })} 
                className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">
                Templates
              </button>
              <button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} 
                className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">
                Features
              </button>
              <a href="/blogs" className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">
                Blog
              </a>
              
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
              
              <motion.button 
                onClick={onGetStarted}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <span>Create CV</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
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
                className="md:hidden mt-4 py-4 border-t border-purple-100 bg-white/95"
              >
                <div className="flex flex-col space-y-4">
                  <a href="#templates" onClick={(e) => handleMobileNavClick(e, "templates")} 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Templates
                  </a>
                  <a href="#features" onClick={(e) => handleMobileNavClick(e, "features")} 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Features
                  </a>
                  <a href="/blogs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Blog
                  </a>
                  
                  {/* Mobile Sign In */}
                  {onSignIn && (
                    <button 
                      onClick={() => { onSignIn(); setMobileMenuOpen(false); }} 
                      className="px-4 py-2 text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg font-medium transition-all text-left"
                    >
                      Sign In
                    </button>
                  )}
                  
                  <button onClick={() => { onGetStarted(); setMobileMenuOpen(false); }} 
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold mt-2">
                    Create CV
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <main>
        {/* Hero Section - Enhanced with animations and modern design */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/40" />
          </motion.div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants}>
                  <div className="inline-flex items-center space-x-2 bg-purple-100 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Trusted by 50,000+ professionals</span>
                  </div>
                </motion.div>

                <motion.h1 
                  variants={itemVariants}
                  className="text-5xl lg:text-7xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                    Build Your Perfect CV
                  </span>
                  <br />
                  <span className="text-blue-600">in Minutes</span>
                </motion.h1>

                <motion.p 
                  variants={itemVariants}
                  className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-2xl"
                >
                  Create ATS-optimized, professional CVs that land interviews at top companies. 
                  <span className="text-blue-600"> No signup required.</span>
                </motion.p>

                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    onClick={onGetStarted}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl text-white text-lg font-semibold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center space-x-3">
                      <span>Create Your CV Free</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                  
                  <motion.button
                    className="group px-8 py-4 border-2 border-gray-300 hover:border-gray-400 rounded-2xl text-gray-700 font-semibold backdrop-blur-sm hover:bg-gray-50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="flex items-center space-x-3">
                      <Play className="h-5 w-5" />
                      <span>Watch Demo</span>
                    </span>
                  </motion.button>
                </motion.div>

                {/* Stats */}
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
                      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-white/60">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Hero Image with floating elements */}
              <motion.div 
                className="relative lg:block hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative">
                  {/* Main CV mockup */}
                  <motion.div
                    className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto"
                    animate={{
                      y: [-10, 10, -10]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <img 
                      src="/Images/hero.jpg" 
                      alt="Professional CV preview" 
                      className="w-full h-auto rounded-2xl shadow-lg"
                    />
                  </motion.div>

                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Zap className="h-8 w-8 text-white" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl"
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  >
                    <Shield className="h-10 w-10 text-white" />
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 -right-12 w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center shadow-xl"
                    animate={{
                      x: [0, 10, 0],
                      y: [0, -10, 0]
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
      <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Why Choose Us
      </h2>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto">
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
      <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Professional Templates
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-purple-500/25"
            >
              Use This Template
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

        {/* Features Section - White & Blue Theme */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose QuickCV?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful features designed to help you create the perfect CV and land your dream job
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="group text-center bg-white border border-gray-100 rounded-2xl p-8 hover:border-blue-200 hover:shadow-lg transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -8 }}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
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
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Success Stories
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
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
      <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
</main>

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
      <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl text-white text-lg font-semibold shadow-lg hover:shadow-purple-400/50 transition-all duration-300"
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
<section id="contact" className="py-24 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl lg:text-5xl font-bold mb-6">
        Get in <span className="text-blue-400">Touch</span>
      </h2>
      <p className="text-xl text-blue-100 max-w-3xl mx-auto">
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
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <MessageCircle className="h-6 w-6 mr-3 text-blue-400" />
            Contact Information
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Mail className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="font-semibold">Email Us</p>
                <a href="mailto:mbaforfoghang@gmail.com" className="text-blue-300 hover:text-blue-200 transition-colors">
                  mbaforfoghang@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Phone className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="font-semibold">Call Us</p>
                <a href="tel:+15551234567" className="text-blue-300 hover:text-blue-200 transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold">Visit Us</p>
                <p className="text-blue-200">123 Business Ave, Suite 100</p>
                <p className="text-blue-200">San Francisco, CA 94107</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="font-semibold">Business Hours</p>
                <p className="text-blue-200">Mon-Fri: 8am-6pm PST</p>
                <p className="text-blue-200">Sat-Sun: 10am-4pm PST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h4 className="text-lg font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://linkedin.com/company/quickcv" className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://twitter.com/quickcv" className="p-3 bg-sky-500 rounded-lg hover:bg-sky-600 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="mailto:hello@quickcv.com" className="p-3 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
              <Mail className="h-5 w-5" />
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
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Send className="h-6 w-6 mr-3 text-blue-400" />
            Send us a Message
          </h3>
          
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                required
              />
            </div>
            <div>
              <textarea
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Your Message"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors resize-vertical"
                required
              />
            </div>
            <button
              type="submit"
              disabled={contactStatus === 'sending' || contactStatus === 'success'}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg font-semibold disabled:opacity-50"
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

{/* Footer */}
<footer className="bg-blue-900 text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-4 gap-8">
      <div className="space-y-4">
        <h3 className="text-xl font-bold">QuickCV</h3>
        <p className="text-blue-100 leading-relaxed">
          Create professional, ATS-optimized CVs that land interviews at top companies.
        </p>
        <div className="flex space-x-4">
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-white">Product</h4>
        <ul className="space-y-2">
          <li><a href="#templates" className="text-blue-100 hover:text-white transition-colors">Templates</a></li>
          <li><a href="#features" className="text-blue-100 hover:text-white transition-colors">Features</a></li>
          <li><button onClick={onGetStarted} className="text-blue-100 hover:text-white transition-colors">CV Builder</button></li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-white">Support</h4>
        <ul className="space-y-2">
          <li><a href="#faq" className="text-blue-100 hover:text-white transition-colors">FAQ</a></li>
          <li><Link to="/contact" className="text-blue-100 hover:text-white transition-colors">Contact Us</Link></li>
          <li><Link to="/help" className="text-blue-100 hover:text-white transition-colors">Help Center</Link></li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-white">Company</h4>
        <ul className="space-y-2">
          <li><Link to="/about" className="text-blue-100 hover:text-white transition-colors">About</Link></li>
          <li><Link to="/privacy" className="text-blue-100 hover:text-white transition-colors">Privacy Policy</Link></li>
          <li><Link to="/terms" className="text-blue-100 hover:text-white transition-colors">Terms of Service</Link></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-blue-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-blue-200">© 2025 QuickCV. All rights reserved.</p>
      <p className="text-blue-200 mt-4 md:mt-0">Built with ❤️ for job seekers worldwide</p>
    </div>
  </div>
</footer>

    </div>
  );
}
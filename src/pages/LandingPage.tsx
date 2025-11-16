// src/components/LandingPage.tsx
import { useState, useEffect } from "react";
import { Zap, Shield, Award, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next'; // Import added
import LatestPosts from "../components/LatestPosts";
import { sendContactMessage } from "../utils/contactService";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useNavigate } from "react-router-dom";

const useCountUp = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(target);
    if (isNaN(end)) return;

    const increment = end / (duration / 16.6); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16.6);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};

function CarouselTestimonials() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  // Moved inside to use 't'
  const testimonials = [
    { 
      name: "Sarah Chen", 
      role: t('landing.testimonials.list.0.role'),
      review: t('landing.testimonials.list.0.review'),
      avatar: "👩‍💻",
      rating: 5,
      company: "Google"
    },
    { 
      name: "Marcus Johnson", 
      role: t('landing.testimonials.list.1.role'),
      review: t('landing.testimonials.list.1.review'),
      avatar: "👨‍💼",
      rating: 5,
      company: "Meta"
    },
    { 
      name: "Emily Rodriguez", 
      role: t('landing.testimonials.list.2.role'),
      review: t('landing.testimonials.list.2.review'),
      avatar: "👩‍🎨",
      rating: 5,
      company: "Apple"
    },
    { 
      name: "David Kim", 
      role: t('landing.testimonials.list.3.role'),
      review: t('landing.testimonials.list.3.review'),
      avatar: "👨‍🔬",
      rating: 5,
      company: "Microsoft"
    }
  ];

  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () =>
    setIndex((index - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[index];

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-lg p-10 border border-blue-100"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-xl mb-4">
              {testimonial.avatar}
            </div>
            <p className="text-lg italic text-gray-700 mb-6 leading-relaxed">
              “{testimonial.review}”
            </p>
            <h4 className="font-semibold text-blue-700 text-xl">
              {testimonial.name}
            </h4>
            <p className="text-gray-500 text-sm">{testimonial.role}</p>
            <div className="flex mt-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-100 text-gray-900 rounded-full p-3 hover:text-white hover:bg-blue-500 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-100 text-gray-900 rounded-full p-3 hover:text-white hover:bg-blue-500 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-blue-700 scale-125" : "bg-blue-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn?: () => void;
}

export default function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  // Moved inside for translation
  const stats = [
    { value: 10000, suffix: "K+", label: t('landing.hero.stats.cvsCreated') },
    { value: 95, suffix: "%", label: t('landing.hero.stats.successRate') },
    { value: 24, suffix: "h", label: t('landing.hero.stats.avgResponse') },
    { value: 150, suffix: "+", label: t('landing.hero.stats.countries') },
  ];

  const templates = [
    { 
      img: "creative.png", 
      name: t('landing.templates.creative.name'), 
      description: t('landing.templates.creative.description'),
      features: [
          t('landing.templates.creative.features.0'), 
          t('landing.templates.creative.features.1'), 
          t('landing.templates.creative.features.2')
      ],
      popular: false
    },
    { 
      img: "modern.png", 
      name: t('landing.templates.modern.name'), 
      description: t('landing.templates.modern.description'),
      features: [
          t('landing.templates.modern.features.0'), 
          t('landing.templates.modern.features.1'), 
          t('landing.templates.modern.features.2')
      ],
      popular: true
    },
    { 
      img: "ats.jpg", 
      name: t('landing.templates.ats.name'), 
      description: t('landing.templates.ats.description'),
      features: [
          t('landing.templates.ats.features.0'), 
          t('landing.templates.ats.features.1'), 
          t('landing.templates.ats.features.2')
      ],
      popular: false
    },
  ];

  const faqs = [
    { 
      question: t('landing.faq.list.0.question'), 
      answer: t('landing.faq.list.0.answer') 
    },
    { 
      question: t('landing.faq.list.1.question'), 
      answer: t('landing.faq.list.1.answer') 
    },
    { 
      question: t('landing.faq.list.2.question'), 
      answer: t('landing.faq.list.2.answer') 
    },
    { 
      question: t('landing.faq.list.3.question'), 
      answer: t('landing.faq.list.3.answer') 
    },
    { 
      question: t('landing.faq.list.4.question'), 
      answer: t('landing.faq.list.4.answer') 
    },
    { 
      question: t('landing.faq.list.5.question'), 
      answer: t('landing.faq.list.5.answer') 
    }
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center py-1">
              {/* Left Section - Text Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >

                {/* Hero Title */}
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl lg:text-6xl leading-tight mt-[-50px]"
                >
                  <span className="font-medium text-gray-900">
                    {t('landing.hero.title_start')} <span className="text-blue-700">{t('landing.hero.title_highlight')}</span> {t('landing.hero.title_end')}
                  </span>
                  <br />
                </motion.h1>

                {/* Description */}
                <motion.p
                  variants={itemVariants}
                  className="text-xl text-black leading-relaxed max-w-2xl "
                >
                  {t('landing.hero.subtitle_start')}
                  <span className="text-blue-700"> {t('landing.hero.subtitle_highlight')}</span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    onClick={onGetStarted}
                    className="group px-8 py-4 bg-blue-700 hover:bg-blue-600 rounded-2xl text-white text-lg font-medium shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center space-x-3">
                      <span>{t('landing.hero.cta')}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </motion.div>

                {/* Stats Section - Enhanced Mobile Responsive */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 pt-400"
                >
                  {stats.map((stat, idx) => {
                    const count = useCountUp(stat.value, 2500); 

                    return (
                      <motion.div
                        key={idx}
                        className="text-center p-4 md:p-2 bg-white/50 md:bg-transparent rounded-xl md:rounded-none border md:border-0 border-blue-100 backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.15 }}
                      >
                        <div className="md:hidden mb-2 flex justify-center">
                        </div>
                        <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-700 mb-1">
                          {count}{stat.suffix}
                        </div>
                        <div className="text-sm md:text-sm text-black font-medium">{stat.label}</div>
                      </motion.div>
                    );
                  })}
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

        {/* Why Choose Us - Alternating Split Layout */}
        <section id="why-choose-us">
          <div className="max-w-7xl mx-auto py-15 px-6 lg:px-12 space-y-16">

            {/* Section Intro */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl mb-4 font-medium text-gray-900">
                {t('landing.whyChooseUs.title')}
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                {t('landing.whyChooseUs.subtitle')}
              </p>
            </motion.div>

            {/* 1️⃣ Section One */}
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-16"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              {/* Text */}
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                  {t('landing.whyChooseUs.section1.title')}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {t('landing.whyChooseUs.section1.description')}
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>{t('landing.whyChooseUs.section1.points.0')}</li>
                  <li>{t('landing.whyChooseUs.section1.points.1')}</li>
                  <li>{t('landing.whyChooseUs.section1.points.2')}</li>
                </ul>
                <button
                  onClick={() => navigate("/about")}
                  className="flex items-center gap-2 px-6 py-3 mt-6 bg-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300"
                >
                  {t('landing.common.readMore')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Image */}
              <div className="flex-1 flex justify-center">
                <img
                  src="/Images/image.png"
                  alt="Template Preview"
                  className="rounded-3xl shadow-lg w-[500px] h-[350px] object-cover"
                />
              </div>
            </motion.div>

            {/* 2️⃣ Section Two */}
            <motion.div
              className="flex flex-col lg:flex-row-reverse items-center gap-16"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                  {t('landing.whyChooseUs.section2.title')}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {t('landing.whyChooseUs.section2.description')}
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>{t('landing.whyChooseUs.section2.points.0')}</li>
                  <li>{t('landing.whyChooseUs.section2.points.1')}</li>
                  <li>{t('landing.whyChooseUs.section2.points.2')}</li>
                </ul>

                <button
                  onClick={() => navigate("/about")}
                  className="flex items-center gap-2 px-6 py-3 mt-6 bg-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300"
                >
                  {t('landing.common.readMore')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 flex justify-center">
                <img
                  src="/Images/fast.png"
                  alt="Easy Resume Builder"
                  className="rounded-3xl shadow-lg w-[500px] h-[350px] object-cover"
                />
              </div>
            </motion.div>

            {/* 3️⃣ Section Three */}
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-16"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                  {t('landing.whyChooseUs.section3.title')}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {t('landing.whyChooseUs.section3.description')}
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>{t('landing.whyChooseUs.section3.points.0')}</li>
                  <li>{t('landing.whyChooseUs.section3.points.1')}</li>
                  <li>{t('landing.whyChooseUs.section3.points.2')}</li>
                </ul>
                <button
                  onClick={() => navigate("/about")}
                  className="flex items-center gap-2 px-6 py-3 mt-6 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {t('landing.common.readMore')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 flex justify-center">
                <img
                  src="/Images/data.png"
                  alt="Data Insights"
                  className="rounded-3xl shadow-lg w-[500px] h-[350px] object-cover"
                />
              </div>
            </motion.div>

            {/* 4️⃣ Section Four */}
            <motion.div
              className="flex flex-col lg:flex-row-reverse items-center gap-16"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                  {t('landing.whyChooseUs.section4.title')}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {t('landing.whyChooseUs.section4.description')}
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>{t('landing.whyChooseUs.section4.points.0')}</li>
                  <li>{t('landing.whyChooseUs.section4.points.1')}</li>
                  <li>{t('landing.whyChooseUs.section4.points.2')}</li>
                </ul>
                <br></br>
                <button
                  onClick={() => navigate("/about")}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300"
                >
                  {t('landing.common.readMore')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 flex justify-center">
                <img
                  src="/Images/image.png"
                  alt="Global Support"
                  className="rounded-3xl shadow-lg w-[500px] h-[350px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Templates Section - White & Blue Theme */}
        <section id="templates" className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl mb-4 font-medium text-gray-900">
                {t('landing.templates.title')}
              </h2>
              <p className="text-lg text-black max-w-3xl mx-auto">
                {t('landing.templates.subtitle')}
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
                      {t('landing.templates.perfectFor', { role: template.name.toLowerCase() })}
                    </p>
                    <button
                      onClick={onGetStarted}
                      className="w-full py-3 bg-blue-700 hover:bg-blue-600 rounded-2xl text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-blue-500/25"
                    >
                      {t('landing.templates.useTemplate')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section – Carousel Slider Style */}
        <section className="py-15">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-4xl lg:text-5xl mb-6 font-medium text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {t('landing.testimonials.title')}
            </motion.h2>
            <motion.p
              className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {t('landing.testimonials.subtitle')}
            </motion.p>

            <CarouselTestimonials />
          </div>
        </section>

      </main>

      {/* Latest Blog Posts - Enhanced */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl mb-4 font-medium text-gray-900">
              {t('landing.blog.title')}
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              {t('landing.blog.subtitle')}
            </p>
          </motion.div>
          <div className="bg-white rounded-3xl p-8 border">
            <LatestPosts />
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl mb-4 font-medium text-gray-900">
              {t('landing.faq.title')}
            </h2>
            <p className="text-xl text-black ">
              {t('landing.faq.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl border border-blue-100 hover:border-black transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex justify-between items-center group"
                >
                  <h3 className="text-black group-hover:font-medium transition-colors">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFAQ === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <p className="text-black leading-relaxed">
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
  <p className="py-10 text-center">{t("faq1.question")}{" "}<a href="/faq" className="text-blue-700 underline">
        {t("faq1.cta")}
      </a>
    </p>
      </section>

      {/* Final CTA Section */}
      <section
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Images/call.png')" }}
      >
        {/* Dark overlay ONLY inside this section */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content above overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white">
              {t('landing.finalCta.title')}
            </h2>

            <p className="text-xl lg:text-2xl text-white max-w-2xl mx-auto">
              {t('landing.finalCta.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={onGetStarted}
                className="px-8 py-4 bg-blue-700 hover:bg-blue-600 rounded-2xl text-white text-lg font-semibold "
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-3">
                  <span>{t('landing.finalCta.startNow')}</span>
                  <ArrowRight className="h-5 w-5" />
                </span>
              </motion.button>

              <motion.a
                href="#templates"
                className="px-8 py-4 border-2 rounded-2xl text-white font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {t('landing.finalCta.browseTemplates')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl mb-4 font-medium text-gray-900">
              {t('landing.contact.title')}
            </h2>
            <p className="text-xl text-black max-w-4xl mx-auto">
              {t('landing.contact.subtitle')}
            </p>
          </motion.div>

          <div>
            <div>
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Your contact info here */}
              </motion.div>

              {/* Quick Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mx-auto w-full max-w-3xl" // <-- CENTERING HAPPENS HERE
              >
                <div className="backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl mb-6 flex items-center text-black">
                    {t('landing.contact.formTitle')}
                  </h3>

                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={t('landing.contact.placeholders.name')}
                        className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder={t('landing.contact.placeholders.email')}
                        className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder={t('landing.contact.placeholders.message')}
                        className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={contactStatus === 'sending' || contactStatus === 'success'}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-700 hover:bg-blue-600 rounded-lg transition-all duration-200 shadow-lg font-semibold text-white disabled:opacity-50"
                    >
                      {contactStatus === 'sending' ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{t('landing.contact.button.sending')}</span>
                        </>
                      ) : contactStatus === 'success' ? (
                        <span>{t('landing.contact.button.success')}</span>
                      ) : (
                        <>
                          <span>{t('landing.contact.button.send')}</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer onGetStarted={onGetStarted} />

    </div>
  );
}
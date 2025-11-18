
// src/components/LandingPage.tsx
import { useState, useEffect } from "react";
import { Zap, Shield, Award, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
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
    <div className="relative w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-blue-50 relative z-10"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center text-3xl mb-6 shadow-inner">
              {testimonial.avatar}
            </div>
            <p className="text-xl md:text-2xl font-light italic text-gray-700 mb-8 leading-relaxed max-w-2xl">
              "{testimonial.review}"
            </p>
            <div>
              <h4 className="font-medium text-blue-900 text-xl">
                {testimonial.name}
              </h4>
              <p className="text-blue-600 font-medium text-sm mt-1">{testimonial.role}</p>
            </div>
            <div className="flex mt-4 space-x-1">
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

      {/* Navigation buttons - Moved outside for better spacing */}
      <button
        onClick={prev}
        className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 bg-white border border-gray-200 text-gray-600 rounded-full p-4 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-lg transition-all duration-300 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 bg-white border border-gray-200 text-gray-600 rounded-full p-4 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-lg transition-all duration-300 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-10 space-x-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-blue-600" : "w-3 bg-gray-300 hover:bg-blue-300"
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
      popular: false
    },
    { 
      img: "modern.png", 
      name: t('landing.templates.modern.name'), 
      description: t('landing.templates.modern.description'),
      popular: true
    },
    { 
      img: "ats.jpg", 
      name: t('landing.templates.ats.name'), 
      description: t('landing.templates.ats.description'),
      popular: false
    },
  ];

  const faqs = [
    { question: t('landing.faq.list.0.question'), answer: t('landing.faq.list.0.answer') },
    { question: t('landing.faq.list.1.question'), answer: t('landing.faq.list.1.answer') },
    { question: t('landing.faq.list.2.question'), answer: t('landing.faq.list.2.answer') },
    { question: t('landing.faq.list.3.question'), answer: t('landing.faq.list.3.answer') },
    { question: t('landing.faq.list.4.question'), answer: t('landing.faq.list.4.answer') },
    { question: t('landing.faq.list.5.question'), answer: t('landing.faq.list.5.answer') }
  ];

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
    <div className="w-full bg-white text-gray-900 overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <Header onGetStarted={onGetStarted} onSignIn={onSignIn} />

      <main className="relative z-10">
        {/* HERO SECTION - INCREASED PADDING */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Left Section */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-10" // Increased vertical space between elements
              >
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1]"
                >
                  <span className="text-gray-900">
                    {t('landing.hero.title_start')} <span className="text-blue-600 inline-block">{t('landing.hero.title_highlight')}</span> {t('landing.hero.title_end')}
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-xl text-gray-600 leading-relaxed max-w-2xl"
                >
                  {t('landing.hero.subtitle_start')}
                  <span className="text-blue-700 font-medium"> {t('landing.hero.subtitle_highlight')}</span>
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-5 pt-4"
                >
                  <motion.button
                    onClick={onGetStarted}
                    className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-lg font-medium shadow-lg shadow-blue-600/20 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center space-x-3">
                      <span>{t('landing.hero.cta')}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Right Section - Floating Image */}
              <motion.div
                className="relative lg:block hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative mx-auto">
                  <motion.div
                    className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 max-w-md mx-auto"
                    animate={{ y: [-15, 15, -15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img
                      src="/Images/hero.jpg"
                      alt="Professional CV preview"
                      className="w-full h-auto rounded-xl"
                    />
                  </motion.div>
                  
                  {/* Floating Icons - Spaced out more */}
                  <motion.div 
                    className="absolute -top-12 -left-12 bg-white p-4 rounded-2xl shadow-xl"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Zap className="h-8 w-8 text-blue-600" />
                    </div>
                  </motion.div>

                   <motion.div 
                    className="absolute top-1/2 -right-16 bg-white p-4 rounded-2xl shadow-xl"
                    animate={{ x: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* Stats Section - Separated with significant margin */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-32"
            >
                {stats.map((stat, idx) => {
                    const count = useCountUp(stat.value, 2500); 
                    return (
                        <motion.div
                            key={idx}
                            className="text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:border-blue-100 transition-colors"
                            whileHover={{ y: -5 }}
                            variants={itemVariants}
                        >
                            <div className="text-4xl lg:text-5xl font-medium text-blue-600 mb-3">
                                {count}{stat.suffix}
                            </div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </motion.div>
                    );
                })}
            </motion.div>
          </div>
        </section>

        {/* WHY CHOOSE US - WIDER GAPS */}
        <section id="why-choose-us" className="py-10 lg:py-10 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-32"> {/* space-y-32 for massive separation between rows */}

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
                {t('landing.whyChooseUs.title')}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('landing.whyChooseUs.subtitle')}
              </p>
            </div>

            {/* Feature 1 */}
            <FeatureRow 
              title={t('landing.whyChooseUs.section1.title')}
              desc={t('landing.whyChooseUs.section1.description')}
              points={[
                t('landing.whyChooseUs.section1.points.0'),
                t('landing.whyChooseUs.section1.points.1'),
                t('landing.whyChooseUs.section1.points.2')
              ]}
              imgSrc="/Images/image.png"
              navigate={navigate}
              btnText={t('landing.common.readMore')}
            />

            {/* Feature 2 - Reversed */}
            <FeatureRow 
              title={t('landing.whyChooseUs.section2.title')}
              desc={t('landing.whyChooseUs.section2.description')}
              points={[
                t('landing.whyChooseUs.section2.points.0'),
                t('landing.whyChooseUs.section2.points.1'),
                t('landing.whyChooseUs.section2.points.2')
              ]}
              imgSrc="/Images/fast.png"
              reversed
              navigate={navigate}
              btnText={t('landing.common.readMore')}
            />

            {/* Feature 3 */}
            <FeatureRow 
              title={t('landing.whyChooseUs.section3.title')}
              desc={t('landing.whyChooseUs.section3.description')}
              points={[
                t('landing.whyChooseUs.section3.points.0'),
                t('landing.whyChooseUs.section3.points.1'),
                t('landing.whyChooseUs.section3.points.2')
              ]}
              imgSrc="/Images/data.png"
              navigate={navigate}
              btnText={t('landing.common.readMore')}
            />
          </div>
        </section>

        {/* TEMPLATES SECTION */}
        <section id="templates" className="py-10 lg:py-10 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
                {t('landing.templates.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('landing.templates.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {templates.map((template, idx) => (
                <motion.div
                  key={idx}
                  className="group bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                    <img
                      src={`/Images/${template.img}`}
                      alt={template.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    {template.popular && (
                      <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                        POPULAR
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-medium text-gray-900 mb-3">
                      {template.name}
                    </h3>
                    <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                      {t('landing.templates.perfectFor', { role: template.name.toLowerCase() })}
                    </p>
                    <button
                      onClick={onGetStarted}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 hover:text-white text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      {t('landing.templates.useTemplate')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-10 lg:py-10 bg-blue-50/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
                {t('landing.testimonials.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('landing.testimonials.subtitle')}
              </p>
            </div>
            <CarouselTestimonials />
          </div>
        </section>

        {/* BLOG SECTION */}
         <section className="py-10 lg:py-10 bg-blue-50/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
                <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
                  {t('landing.blog.title')}
                </h2>
                <p className="text-xl text-gray-600">
                  {t('landing.blog.subtitle')}
                </p>
              </div>
            <div className="mb-12 text-center">
            </div>
            
            <div className="bg-gray-50 rounded-[2rem] p-5 md:p-10">
              <LatestPosts />
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-10 lg:py-10 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
                {t('landing.faq.title')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('landing.faq.subtitle')}
              </p>
            </div>

            <div className="space-y-6"> {/* Increased space between FAQ items */}
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full p-6 md:p-8 text-left flex justify-between items-center"
                  >
                    <span className="text-lg font-medium text-gray-900 pr-8">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFAQ === idx ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 text-blue-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFAQ === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 pt-0 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            
            <p className="mt-12 text-center text-gray-500">
              {t("faq1.question")}{" "}
              <a href="/faq" className="text-blue-600 font-medium hover:underline">
                {t("faq1.cta")}
              </a>
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative py-32 bg-blue-900 overflow-hidden">
           <div className="absolute inset-0 opacity-20">
              <img src="/Images/call.png" alt="" className="w-full h-full object-cover" />
           </div>
           <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl lg:text-6xl font-medium text-white mb-8">
               {t('landing.finalCta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
               {t('landing.finalCta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
               <button
                onClick={onGetStarted}
                className="px-10 py-4 bg-white text-blue-900 rounded-xl font-medium text-lg hover:bg-blue-50 transition-colors"
               >
                  {t('landing.finalCta.startNow')}
               </button>
               <a
                href="#templates"
                className="px-10 py-4 border border-blue-400 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors"
               >
                 {t('landing.finalCta.browseTemplates')}
               </a>
            </div>
           </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-10 lg:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                {t('landing.contact.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('landing.contact.subtitle')}
              </p>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-gray-100">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-1">Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={t('landing.contact.placeholders.name')}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder={t('landing.contact.placeholders.email')}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Message</label>
                  <textarea
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={t('landing.contact.placeholders.message')}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={contactStatus === 'sending' || contactStatus === 'success'}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-300 disabled:opacity-70"
                >
                  {contactStatus === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : contactStatus === 'success' ? (
                    "Message Sent Successfully!"
                  ) : (
                    t('landing.contact.button.send')
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer onGetStarted={onGetStarted} />
    </div>
  );
}

// Helper Component for clean code
function FeatureRow({ title, desc, points, imgSrc, reversed = false, navigate, btnText }: any) {
  return (
    <motion.div 
      className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="flex-1">
        <h3 className="text-3xl font-medium text-gray-900 mb-6">{title}</h3>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">{desc}</p>
        <ul className="space-y-4 mb-10">
          {points.map((point: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <div className="mt-1 min-w-[20px] text-blue-600">
                <Shield className="w-5 h-5" />
              </div>
              {point}
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate("/about")}
          className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 transition-all"
        >
          {btnText} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 w-full">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
           <img src={imgSrc} alt={title} className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" />
        </div>
      </div>
    </motion.div>
  )
}
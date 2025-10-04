
// src/components/LandingPage.tsx
import { useState, useEffect } from "react";
import { FileText, Zap, Download, Sparkles, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import LatestPosts from "../components/LatestPosts";


const templates = [
  { img: "creative.png", name: "Creative" },
  { img: "modern.png", name: "Modern" },
  { img: "ats.jpg", name: "ATS Friendly" },
];

const carouselImages = [
  "/Images/CV1.png",
  "/Images/CV2.png",
  "/Images/CV3.png",
  "/Images/CV4.png",
];

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleFAQ = (idx: number) => setOpenFAQ(openFAQ === idx ? null : idx);

  // Mobile nav: click once fix
  const handleMobileNavClick = (e: React.SyntheticEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const reviews = [
    { name: "Alice M.", review: "This CV builder saved me hours! Beautiful templates and easy to use." },
    { name: "John D.", review: "I got interviews within a week. Highly recommend Olives Forum CV Builder!" },
    { name: "Sophia L.", review: "Simple, professional, and fast. Exactly what I needed." },
  ];

  const faqs = [
    { question: "What is a CV?", answer: "A CV (Curriculum Vitae) is a document that outlines your professional experience, education, skills, and achievements to showcase your qualifications to potential employers." },
    { question: "Do I need to sign up to create a CV?", answer: "No, you can start creating your CV immediately. Login is only required for downloading." },
    { question: "Can I choose multiple templates?", answer: "Yes, you can preview all three templates and select the one you like best." },
    { question: "How will I receive my CV?", answer: "Your CV will be sent directly to the email you provide at download time." },
    { question: "Are the CV sections mandatory?", answer: "While it's recommended to fill out all sections for a comprehensive CV, you can choose to leave some sections blank." },
    { question: "Is my personal information secure?", answer: "Yes, we prioritize your privacy and do not store any personal data beyond the session needed to create your CV." },
    { question: "Can I edit my CV after downloading?", answer: "Once downloaded, you can edit your CV using any PDF editor or word processing software." },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 h-16 bg-[#1E3A8A] border-b border-[#162B5A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between h-full">
          <div className="flex items-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
  QuickCV
</h2>

          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })} className="text-white font-medium hover:text-[#3B82F6] transition-colors">Templates</button>
            <button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })} className="text-white font-medium hover:text-[#3B82F6] transition-colors">Q&A</button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="text-white font-medium hover:text-[#3B82F6] transition-colors">Contact</button>
            <a href="/blogs" className="text-white font-medium hover:text-[#3B82F6] transition-colors">Blogs</a>
          </div>

          <div className="hidden md:flex space-x-4">
            <button onClick={onGetStarted} className="px-6 py-2 bg-[#2A4EB0] hover:bg-[#1B3380] rounded-lg text-white font-medium transition-colors">Create CV</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden bg-[#1E3A8A] border-t border-[#162B5A]"
            >
              <div className="flex flex-col space-y-2 px-4 py-4">
                <a href="#templates" onClick={(e) => handleMobileNavClick(e, "templates")} className="text-white font-medium hover:text-[#3B82F6] text-left transition-colors">Templates</a>
                <a href="#faq" onClick={(e) => handleMobileNavClick(e, "faq")} className="text-white font-medium hover:text-[#3B82F6] text-left transition-colors">Q&A</a>
                <a href="#contact" onClick={(e) => handleMobileNavClick(e, "contact")} className="text-white font-medium hover:text-[#3B82F6] text-left transition-colors">Contact</a>
                   <a href="/blogs" onClick={() => setMobileMenuOpen(false)} className="text-white font-medium hover:text-[#3B82F6] text-left transition-colors">Blogs</a>
                <button onClick={() => { onGetStarted(); setMobileMenuOpen(false); }} className="px-4 py-2 bg-[#2A4EB0] hover:bg-[#1B3380] rounded-lg text-white font-medium mt-2">Create CV</button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12 items-center bg-white text-[#1E3A8A]">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#DDE7FF] px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-[#3B82F6]" />
              <span className="text-sm font-medium text-[#3B82F6]">Professional CV in Minutes</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">Build Your Perfect CV with Confidence</h1>
            <p className="text-xl text-[#2A4EB0] mb-6 leading-relaxed">Create a professional, ATS-friendly CV using our beautiful templates. No account needed to start. Download instantly after completion.</p>
            <button onClick={onGetStarted} className="inline-flex items-center space-x-2 px-8 py-4 bg-[#2A4EB0] hover:bg-[#1B3380] rounded-xl shadow-lg text-white text-lg font-semibold">
              <span>Create Your CV Now</span>
            </button>
          </div>

         <div className="relative w-full h-96 items-center justify-center hidden md:flex">

            <img src="/Images/hero.jpg" alt="CV Builder illustration" className="w-full h-full object-contain" />
          </div>
        </section>

        {/* How It Works */}
        <section className="text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-10">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[{ step: "1", title: "Fill Your Info", desc: "Enter your personal, education, and experience details with ease." },
                { step: "2", title: "Pick a Template", desc: "Preview and choose from three professionally designed layouts." },
                { step: "3", title: "Download Instantly", desc: "Get your CV PDF sent directly to your email in seconds." }].map((s, idx) => (
                <motion.div key={idx} className="bg-[#243C8A] rounded-2xl p-6 shadow-sm border border-[#162B5A] hover:shadow-md cursor-pointer" whileHover={{ y: -5, scale: 1.03 }} transition={{ type: "spring", stiffness: 200 }}>
                  <div className="text-4xl font-bold text-[#3B82F6] mb-4">{s.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-[#A0C4FF]">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white text-[#1E3A8A]">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Olives Forum CV Builder?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{ icon: Zap, title: "Quick & Easy", desc: "Build your CV in minutes with our intuitive step-by-step builder." },
              { icon: FileText, title: "Professional Templates", desc: "Choose from three expertly designed templates." },
              { icon: Download, title: "Instant Download", desc: "Get your polished CV as a PDF instantly." }].map((item, idx) => (
              <motion.div key={idx} className="bg-[#F9FAFB] text-[#1E3A8A] rounded-2xl p-6 shadow-md hover:shadow-lg border border-[#E0E7FF] cursor-pointer" whileHover={{ y: -5, scale: 1.03 }} transition={{ type: "spring", stiffness: 200 }}>
                <div className="h-12 w-12 bg-[#DDE7FF] rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-[#2A4EB0]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Templates */}
        <section id="templates" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#1E3A8A] text-white text-center">
          <h2 className="text-3xl font-bold mb-10">Choose Your Style</h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template, idx) => (
              <motion.div key={idx} className="relative bg-[#243C8A] rounded-2xl shadow-md overflow-hidden cursor-pointer" whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <motion.img src={`/Images/${template.img}`} alt={template.name} className="w-full h-auto object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} />
                <motion.div className="absolute inset-0 bg-[#2A4EB0] bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xl font-semibold">{template.name}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#F9FAFB]">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1E3A8A] mb-10">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#1E3A8A] font-bold text-xl mb-4 shadow-sm">{r.name.charAt(0)}</div>
                <p className="text-gray-700 italic mb-4 leading-relaxed">“{r.review}”</p>
                <h3 className="font-semibold text-[#1E3A8A] text-lg">— {r.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white text-[#1E3A8A]">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((q, idx) => {
              const isOpen = openFAQ === idx;
              return (
                <div key={idx} className="bg-[#F9FAFB] rounded-2xl shadow-sm border border-[#D1D5DB] cursor-pointer" onClick={() => toggleFAQ(idx)}>
                  <motion.div className="p-6 flex justify-between items-center" initial={false} animate={{ backgroundColor: isOpen ? "#E0E7FF" : "#F9FAFB" }} transition={{ duration: 0.3 }}>
                    <h3 className="font-semibold">{q.question}</h3>
                    <span className="text-[#3B82F6] text-2xl">{isOpen ? "−" : "+"}</span>
                  </motion.div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="content" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="px-6 pb-6 text-[#1E3A8A]">
                        {q.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

          {/* Latest Blog Posts */}
        {/* Latest Blog Posts */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#F9FAFB]">
  <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1E3A8A] mb-12">
    Latest Posts
  </h2>
  <LatestPosts />
</section>


        {/* Contact */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white text-[#1E3A8A]">
          <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>
          <div className="max-w-2xl mx-auto">
            <form action="mailto:mbaforfoghang@gmail.com" method="post" encType="text/plain" className="space-y-6">
              <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 rounded-xl border border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] outline-none text-[#1E3A8A] bg-[#F9FAFB]" />
              <input type="email" name="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-xl border border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] outline-none text-[#1E3A8A] bg-[#F9FAFB]" />
              <textarea name="message" placeholder="Your Message" required className="w-full px-4 py-3 rounded-xl border border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] outline-none h-32 text-[#1E3A8A] bg-[#F9FAFB]"></textarea>
              <button type="submit" className="w-full px-6 py-4 bg-[#2A4EB0] hover:bg-[#1B3380] rounded-xl text-white font-semibold transition-colors">Send Message</button>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white text-[#1E3A8A]">
          <div className="bg-[#F9FAFB] rounded-3xl p-12 text-center shadow-md">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
            <p className="text-[#2A4EB0] text-lg mb-6 max-w-2xl mx-auto">Join thousands of job seekers who have created their professional CVs with Olives Forum CV Builder.</p>
            <button onClick={onGetStarted} className="inline-flex items-center space-x-2 px-8 py-4 bg-[#2A4EB0] hover:bg-[#1B3380] rounded-xl text-white text-lg font-semibold shadow-lg">
              <span>Start Building Now</span>
              <FileText className="h-5 w-5" />
            </button>
          </div>
        </section>
      </main>

        {/* Footer */}
      <footer className="border-t border-[#162B5A] bg-[#1E3A8A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p>© 2025 QuickCVBuilder. Create professional CVs in minutes.</p>
        </div>
      </footer>
    </div>
  );
}
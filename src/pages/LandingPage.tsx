import { useState, useEffect } from "react";
import { FileText, Zap, Download, Sparkles, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
           <h2 className="text-2xl font-bold mb-2">Olives Forum</h2>
          </div>

          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollTo("templates")} className="text-white font-medium hover:text-[#3B82F6] transition-colors">Templates</button>
            <button onClick={() => scrollTo("faq")} className="text-white font-medium hover:text-[#3B82F6] transition-colors">Q&A</button>
            <button onClick={() => scrollTo("contact")} className="text-white font-medium hover:text-[#3B82F6] transition-colors">Contact</button>
          </div>

          <div className="hidden md:flex space-x-4">
            <button onClick={onGetStarted} className="px-6 py-2 bg-[#2A4EB0] hover:bg-[#1B3380] rounded-lg text-white font-medium transition-colors">Create CV</button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#1E3A8A] border-t border-[#162B5A]"
            >
              <div className="flex flex-col space-y-2 px-4 py-4">
                <button onClick={() => scrollTo("templates")} className="text-white font-medium hover:text-[#3B82F6] text-left transition-colors">Templates</button>
                <button onClick={() => scrollTo("faq")} className="text-white font-medium hover:text-[#3B82F6] text-left transition-colors">Q&A</button>
                <button onClick={() => scrollTo("contact")} className="text-white font-medium hover:text-[#3B82F6] text-left transition-colors">Contact</button>
                <button onClick={onGetStarted} className="px-4 py-2 bg-[#2A4EB0] hover:bg-[#1B3380] rounded-lg text-white font-medium mt-2">Create CV</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section - WHITE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center bg-white text-[#1E3A8A]">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#DDE7FF] px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-[#3B82F6]" />
              <span className="text-sm font-medium text-[#3B82F6]">Professional CV in Minutes</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">Build Your Perfect CV with Confidence</h1>
            <p className="text-xl text-[#2A4EB0] mb-10 leading-relaxed">
              Create a professional, ATS-friendly CV using our beautiful templates. No account needed to start. Download instantly after completion.
            </p>
            <button onClick={onGetStarted} className="inline-flex items-center space-x-2 px-8 py-4 bg-[#2A4EB0] hover:bg-[#1B3380] rounded-xl shadow-lg text-white text-lg font-semibold">
              <span>Create Your CV Now</span>
              <FileText className="h-5 w-5 text-white" />
            </button>
          </div>

          <div className="relative w-full h-96 flex items-center justify-center hidden md:flex">
            <img src="/Images/hero.jpg" alt="CV Builder illustration" className="w-full h-full object-contain" />
          </div>
        </section>

        {/* How It Works - BLUE */}
        <section className=" text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Fill Your Info", desc: "Enter your personal, education, and experience details with ease." },
                { step: "2", title: "Pick a Template", desc: "Preview and choose from three professionally designed layouts." },
                { step: "3", title: "Download Instantly", desc: "Get your CV PDF sent directly to your email in seconds." },
              ].map((s, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[#243C8A] rounded-2xl p-8 shadow-sm border border-[#162B5A] hover:shadow-md cursor-pointer"
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="text-4xl font-bold text-[#3B82F6] mb-4">{s.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-[#A0C4FF]">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features - WHITE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white text-[#1E3A8A]">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Olives Forum CV Builder?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Quick & Easy", desc: "Build your CV in minutes with our intuitive step-by-step builder." },
              { icon: FileText, title: "Professional Templates", desc: "Choose from three expertly designed templates." },
              { icon: Download, title: "Instant Download", desc: "Get your polished CV as a PDF instantly." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-[#F9FAFB] text-[#1E3A8A] rounded-2xl p-8 shadow-md hover:shadow-lg border border-[#E0E7FF] cursor-pointer"
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="h-12 w-12 bg-[#DDE7FF] rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-[#2A4EB0]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Templates - BLUE */}
        <section id="templates" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-[#1E3A8A] text-white text-center">
          <h2 className="text-3xl font-bold mb-12">Choose Your Style</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {templates.map((template, idx) => (
              <motion.div key={idx} className="relative bg-[#243C8A] rounded-2xl shadow-md overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <motion.img src={`/Images/${template.img}`} alt={template.name} className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} />
                <motion.div className="absolute inset-0 bg-[#2A4EB0] bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xl font-semibold">{template.name}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Reviews - WHITE */}
        <section className="relative w-full overflow-hidden py-20 bg-white text-[#1E3A8A]">
          <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" }}
            >
              {reviews.map((r, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[#F9FAFB] p-8 rounded-2xl shadow-md border border-[#E0E7FF] min-w-[300px] cursor-pointer flex-shrink-0 text-center"
                  whileHover={{ scale: 1.05, y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                >
                  <p className="text-[#2A4EB0] mb-4">"{r.review}"</p>
                  <h3 className="text-lg font-semibold">{r.name}</h3>
                </motion.div>
              ))}
              {reviews.map((r, idx) => (
                <motion.div
                  key={`dup-${idx}`}
                  className="bg-[#F9FAFB] p-8 rounded-2xl shadow-md border border-[#E0E7FF] min-w-[300px] cursor-pointer flex-shrink-0 text-center"
                  whileHover={{ scale: 1.05, y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                >
                  <p className="text-[#2A4EB0] mb-4">"{r.review}"</p>
                  <h3 className="text-lg font-semibold">{r.name}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

       {/* FAQ - WHITE */}
<section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white text-[#1E3A8A]">
  <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
  <div className="space-y-4 max-w-3xl mx-auto">
    {faqs.map((q, idx) => {
      const isOpen = openFAQ === idx;
      return (
        <div
          key={idx}
          className="bg-[#F9FAFB] rounded-2xl shadow-sm border border-[#D1D5DB] cursor-pointer"
          onClick={() => toggleFAQ(idx)}
        >
          <motion.div
            className="p-6 flex justify-between items-center"
            initial={false}
            animate={{ backgroundColor: isOpen ? "#E0E7FF" : "#F9FAFB" }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-semibold">{q.question}</h3>
            <span className="text-[#3B82F6] text-2xl">{isOpen ? "−" : "+"}</span>
          </motion.div>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6 text-[#1E3A8A]"
              >
                {q.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</section>


        {/* Contact - WHITE */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white text-[#1E3A8A]">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="max-w-2xl mx-auto">
            <form action="mailto:mbaforfoghang@gmail.com" method="post" encType="text/plain" className="space-y-6">
              <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 rounded-xl border border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] outline-none text-[#1E3A8A] bg-[#F9FAFB]" />
              <input type="email" name="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-xl border border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] outline-none text-[#1E3A8A] bg-[#F9FAFB]" />
              <textarea name="message" placeholder="Your Message" required className="w-full px-4 py-3 rounded-xl border border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] outline-none h-32 text-[#1E3A8A] bg-[#F9FAFB]"></textarea>
              <button type="submit" className="w-full px-6 py-4 bg-[#2A4EB0] hover:bg-[#1B3380] rounded-xl text-white font-semibold transition-colors">Send Message</button>
            </form>
          </div>
        </section>

        {/* CTA - BLUE */}
       {/* CTA - WHITE */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white text-[#1E3A8A]">
  <div className="bg-[#F9FAFB] rounded-3xl p-12 text-center shadow-md">
    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
    <p className="text-[#2A4EB0] text-lg mb-8 max-w-2xl mx-auto">
      Join thousands of job seekers who have created their professional CVs with Olives Forum CV Builder.
    </p>
    <button
      onClick={onGetStarted}
      className="inline-flex items-center space-x-2 px-8 py-4 bg-[#2A4EB0] hover:bg-[#1B3380] rounded-xl text-white text-lg font-semibold shadow-lg"
    >
      <span>Start Building Now</span>
      <FileText className="h-5 w-5" />
    </button>
  </div>
</section>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#162B5A] bg-[#1E3A8A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p>© 2025 Olives Forum CV Builder. Create professional CVs in minutes.</p>
        </div>
      </footer>
    </div>
  );
}

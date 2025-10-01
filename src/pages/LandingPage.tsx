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
  const [currentImage, setCurrentImage] = useState(0);

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // 4 seconds per image
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-slate-700" />
            <span className="text-2xl font-bold text-slate-800">CV Builder</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollTo("templates")} className="text-slate-700 font-medium hover:text-slate-900 transition-colors">Templates</button>
            <button onClick={() => scrollTo("faq")} className="text-slate-700 font-medium hover:text-slate-900 transition-colors">Q&A</button>
            <button onClick={() => scrollTo("contact")} className="text-slate-700 font-medium hover:text-slate-900 transition-colors">Contact</button>
          </div>
          <div className="hidden md:flex space-x-4">
            <button onClick={onGetStarted} className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium">Create CV</button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6 text-slate-800" /> : <Menu className="h-6 w-6 text-slate-800" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t border-slate-200 overflow-hidden">
              <div className="flex flex-col space-y-2 px-4 py-4">
                <button onClick={() => scrollTo("templates")} className="text-slate-700 font-medium hover:text-slate-900 transition-colors text-left">Templates</button>
                <button onClick={() => scrollTo("faq")} className="text-slate-700 font-medium hover:text-slate-900 transition-colors text-left">Q&A</button>
                <button onClick={() => scrollTo("contact")} className="text-slate-700 font-medium hover:text-slate-900 transition-colors text-left">Contact</button>
                <button onClick={onGetStarted} className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium mt-2">Create CV</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 bg-slate-800/5 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-slate-700" />
              <span className="text-sm font-medium text-slate-700">Professional CV in Minutes</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">Build Your Perfect CV with Confidence</h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">Create a professional, ATS-friendly CV using our beautiful templates. No account needed to start. Download instantly after completion.</p>
            <button onClick={onGetStarted} className="inline-flex items-center space-x-2 px-8 py-4 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl text-lg font-semibold">
              <span>Create Your CV Now</span>
              <FileText className="h-5 w-5" />
            </button>
          </div>
          <div className="relative w-full h-96 flex items-center justify-center">
            <img src="/Images/hero.jpg" alt="CV Builder illustration" className="w-full h-full object-contain" />
          </div>
        </section>

        {/* Features Section */} 
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
           <h2 className="text-3xl font-bold text-center mb-12 text-slate-900"> Why Choose Olives Forum CV Builder? </h2> 
           <div className="grid md:grid-cols-3 gap-8"> {[{ icon: Zap, title: "Quick & Easy", desc: "Build your CV in minutes with our intuitive step-by-step builder. No design skills required.", },
            { icon: FileText, title: "Professional Templates", desc: "Choose from three expertly designed templates: Creative, Modern, and ATS-friendly formats.", },
            { icon: Download, title: "Instant Download", desc: "Get your polished CV as a PDF instantly. Delivered to your email, ready to send to employers.", }].map((item, idx) => ( <motion.div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer" whileHover={{ y: -5, scale: 1.03 }} transition={{ type: "spring", stiffness: 200 }} > <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
               <item.icon className="h-6 w-6 text-slate-700" /> </div> <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3> <p className="text-slate-600">{item.desc}</p> </motion.div> ))} </div> </section>


{/* How it Works */} 
<section className="bg-slate-50 py-20">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> 
    <h2 className="text-3xl font-bold text-slate-900 mb-12">How It Works</h2> <div className="grid md:grid-cols-3 gap-8"> {[{ step: "1", title: "Fill Your Info", desc: "Enter your personal, education, and experience details with ease.", },{ step: "2", title: "Pick a Template", desc: "Preview and choose from three professionally designed layouts.", },{ step: "3", title: "Download Instantly", desc: "Get your CV PDF sent directly to your email in seconds.", }].map((s, idx) => ( <motion.div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer" whileHover={{ y: -5, scale: 1.03 }} transition={{ type: "spring", stiffness: 200 }} > <div className="text-4xl font-bold text-slate-800 mb-4">{s.step}</div> <h3 className="text-xl font-semibold text-slate-900 mb-2">{s.title}</h3> <p className="text-slate-600">{s.desc}</p> </motion.div> ))} </div> </div> </section>
        {/* Sliding Images Section */}
   <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-20">

  <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px] overflow-hidden bg-slate-50 rounded-xl shadow-lg">
    <AnimatePresence>
      <motion.img
        key={currentImage}
        src={carouselImages[currentImage]}
        alt={`CV ${currentImage + 1}`}
        className="absolute w-full h-full object-contain rounded-xl shadow-lg"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 1 }}
      />
    </AnimatePresence>
  </div>
</section>


        {/* Templates Section */}
        <section id="templates" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Choose Your Style</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {templates.map((template, idx) => (
              <motion.div key={idx} className="relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <motion.img src={`/Images/${template.img}`} alt={template.name} className="w-full h-auto object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} />
                <motion.div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl font-semibold">{template.name}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">What Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {reviews.map((r, idx) => (
              <motion.div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 cursor-pointer" whileHover={{ scale: 1.05, y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }} transition={{ type: "spring", stiffness: 250, damping: 20 }}>
                <p className="text-slate-600 mb-4">"{r.review}"</p>
                <h3 className="text-lg font-semibold text-slate-900">{r.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((q, idx) => {
              const isOpen = openFAQ === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 cursor-pointer" onClick={() => toggleFAQ(idx)}>
                  <motion.div className="p-6 flex justify-between items-center" initial={false} animate={{ backgroundColor: isOpen ? "#f1f5f9" : "#ffffff" }} transition={{ duration: 0.3 }}>
                    <h3 className="font-semibold text-slate-900">{q.question}</h3>
                    <span className="text-slate-500 text-2xl">{isOpen ? "−" : "+"}</span>
                  </motion.div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="content" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="px-6 pb-6 text-slate-600">
                        {q.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

    

        {/* Contact Form */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Contact Us</h2>
          <div className="max-w-2xl mx-auto">
            <form action="mailto:mbaforfoghang@gmail.com" method="post" encType="text/plain" className="space-y-6">
              <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-800 outline-none" />
              <input type="email" name="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-800 outline-none" />
              <textarea name="message" placeholder="Your Message" required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-800 outline-none h-32"></textarea>
              <button type="submit" className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors font-semibold">Send Message</button>
            </form>
          </div>
        </section>

            {/* CTA */}
         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
           <div className="bg-slate-800 rounded-3xl p-12 text-center">
             <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Land Your Dream Job?</h2>
             <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto"> Join thousands of job seekers who have created their professional CVs with Olives Forum CV Builder. </p>
             <button onClick={onGetStarted} className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-slate-800 rounded-xl hover:bg-slate-50 transition-colors text-lg font-semibold shadow-lg" >
               <span>Start Building Now</span>
               <FileText className="h-5 w-5" />
             </button>
           </div>
         </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-slate-600">© 2025 Olives Forum CV Builder. Create professional CVs in minutes.</p>
        </div>
      </footer>
    </div>
  );
}

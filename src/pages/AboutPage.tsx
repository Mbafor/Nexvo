import { Users, Award, Globe, Heart } from 'lucide-react';
import { useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function AboutPage() {

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Mission */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="bg-white-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
            <h3 className="text-3xl lg:text-4xl mb-4 font-medium text-gray-900">Our Mission</h3>
            <p className="text-black-800 mb-0">
              QuickCV was founded to empower professionals worldwide by providing modern, 
              ATS-optimized CV templates and tools that help candidates showcase their skills 
              and land interviews at top companies. We aim to democratize access to career 
              success tools for everyone, regardless of location or experience level.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <Users className="h-8 w-8 text-blue-700 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">50,000+</div>
              <div className="text-sm text-blue-700">CVs Created</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <Globe className="h-8 w-8 text-black mx-auto mb-2" />
              <div className="text-2xl font-bold text-black">150+</div>
              <div className="text-sm text-gray-700">Countries</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <Award className="h-8 w-8 text-blue-700 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">95%</div>
              <div className="text-sm text-blue-700">Success Rate</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <Heart className="h-8 w-8 text-black mx-auto mb-2" />
              <div className="text-2xl font-bold text-black">24/7</div>
              <div className="text-sm text-gray-700">Support</div>
            </div>
          </div>

          {/* What We Do */}
          <h2 className="text-3xl lg:text-4xl font-medium text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">What We Do</h2>
          <p className="mb-4">
            QuickCV combines beautiful design with ATS optimization to ensure your CV passes 
            modern recruitment software and catches the eye of hiring managers. We provide an 
            easy-to-use builder that allows professionals to craft high-impact CVs in minutes.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-blue-700 font-bold">•</span>
                <span>Professionally designed CV templates</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-700 font-bold">•</span>
                <span>ATS-friendly layouts to pass automated screening</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-700 font-bold">•</span>
                <span>Step-by-step guided CV builder</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-700 font-bold">•</span>
                <span>Multiple formats including PDF, DOCX export</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Career tips and advice through our blog</span>
              </li>
            </ul>
          </div>

          {/* Values */}
          <h2 className="text-3xl lg:text-4xl font-medium text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-blue-700 mb-2">Professional Excellence</h3>
              <p className="text-blue-700 text-sm">
                Every professional deserves a CV that showcases their best self. Our templates highlight skills and achievements effectively.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-blue-700 mb-2">Accessibility</h3>
              <p className="text-blue-700 text-sm">
                CV creation should be available to everyone. We make our platform intuitive, accessible, and affordable.
              </p>
            </div>
            <div className="bg-blue-75 p-6 rounded-lg">
              <h3 className="font-bold text-blue-700 mb-2">Continuous Innovation</h3>
              <p className="text-blue-700 text-sm">
                We evolve our tools based on industry trends, hiring manager feedback, and technology updates to keep you ahead.
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg">
              <h3 className="font-bold text-blue-700 mb-2">User Success</h3>
              <p className="text-blue-700 text-sm">
                Your career success is our mission. We provide resources, tips, and tools to empower your journey.
              </p>
            </div>
          </div>

          {/* Impact */}
          <h2 className="text-3xl lg:text-4xl font-medium text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">Our Impact</h2>
          <p className="mb-4">
            Since launching, QuickCV has helped thousands of professionals worldwide craft compelling CVs that increase their interview rates and accelerate career growth.
          </p>
          <ul className="space-y-2 mb-8 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-blue-700 font-bold">✓</span>
              <span>Higher interview callback rates</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-700 font-bold">✓</span>
              <span>Faster job search success</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-700 font-bold">✓</span>
              <span>Better salary negotiations</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-700 font-bold">✓</span>
              <span>Boosted applicant confidence</span>
            </li>
          </ul>

          {/* Meet the Team */}
          <h2 className="text-2xl font-medium text-gray-900 border-b-2 border-gray-200 pb-2 mb-8 text-center">Meet the Team</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Member 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-600">
                <img src="/Images/joshua.jpg" alt="Mbafor Joshua" className="w-full h-full object-cover" />
              </div>
              <h3 className=" text-black text-lg mb-1">Mbafor Joshua</h3>
              <p className="text-sm text-black mb-2">Co-Founder & CEO</p>
              <p className="text-gray-700 text-sm">
                Joshua leads QuickCV with a vision to empower professionals worldwide.
              </p>
            </div>
            {/* Member 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-600">
                <img src="/Images/yohnjie.jpg" alt="Yohnjie Alain" className="w-full h-full object-cover" />
              </div>
              <h3 className=" text-black text-lg mb-1">Yohnjie Alain</h3>
              <p className="text-sm text-black mb-2">COO</p>
              <p className="text-gray-700 text-sm">
                Yohnjie oversees technology and product development, ensuring QuickCV remains modern and user-friendly.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

import { ArrowLeft, Users, Award, Globe, Heart, Mail } from 'lucide-react';

interface AboutPageProps {
  onBack?: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Styled Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
          )}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">About QuickCV</h1>
            <p className="text-gray-600">Building careers, one CV at a time</p>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700">
            
            {/* Mission highlight */}
            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-8 rounded-r-lg">
              <h3 className="text-xl font-bold text-purple-900 mb-2">Our Mission</h3>
              <p className="text-purple-800 font-medium mb-0">
                QuickCV was founded with a simple mission: to help every professional create stunning, 
                ATS-optimized CVs that land interviews at top companies worldwide.
              </p>
            </div>

            {/* Stats cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8 not-prose">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900">50,000+</div>
                <div className="text-sm text-blue-700">CVs Created</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-900">150+</div>
                <div className="text-sm text-green-700">Countries</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-900">95%</div>
                <div className="text-sm text-yellow-700">Success Rate</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-900">24/7</div>
                <div className="text-sm text-red-700">Support</div>
              </div>
            </div>

            <p>In today's competitive job market, your CV is often the first impression you make on potential employers. We believe that everyone deserves access to professional, modern CV templates that help them stand out from the crowd.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">What We Do</h2>
            <p>Our platform combines beautiful design with ATS optimization, ensuring your CV not only looks great but also passes through automated screening systems used by modern companies.</p>

            <p>We provide:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-2 mb-0">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Professional CV templates designed by experts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>ATS-optimized layouts that pass applicant tracking systems</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Easy-to-use CV builder with guided assistance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Multiple export formats including PDF</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Career advice and tips through our blog</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">Our Values</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6 not-prose">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-2">Professional Excellence</h3>
                <p className="text-blue-800 text-sm">We believe every professional deserves a CV that showcases their best self. Our templates are designed to highlight your skills and experience in the most effective way possible.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-green-900 mb-2">Accessibility</h3>
                <p className="text-green-800 text-sm">Professional CV creation should be available to everyone, everywhere. We strive to make our platform accessible and affordable for job seekers at all career levels.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-bold text-purple-900 mb-2">Continuous Innovation</h3>
                <p className="text-purple-800 text-sm">We constantly improve our templates and tools based on the latest industry trends, hiring manager feedback, and ATS requirements.</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-bold text-yellow-900 mb-2">User Success</h3>
                <p className="text-yellow-800 text-sm">Your career success is our success. We're here to support your journey with tools, resources, and guidance every step of the way.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">Our Impact</h2>
            <p>Since our launch, we've helped thousands of professionals across the globe create compelling CVs that have led to successful job placements. Our users have reported:</p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Increased interview callbacks</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Faster job search timelines</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Better salary negotiations</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Improved confidence in their job applications</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">Contact Us</h2>
            <p>Have questions about QuickCV or want to share your success story? We'd love to hear from you:</p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <ul className="space-y-2 mb-0">
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-purple-600" />
                  <span>Email: mbaforfoghang@gmail.com</span>
                </li>
                <li>Support: Available 24/7 through our contact form</li>
                <li>Address: 123 Business Ave, Suite 100, San Francisco, CA 94107</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Get in Touch</h3>
          <p className="mb-4 text-purple-100">
            Have questions about QuickCV or want to partner with us? We'd love to hear from you.
          </p>
          <a
            href="mailto:mbaforfoghang@gmail.com"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium text-sm"
          >
            <Mail className="h-4 w-4" />
            <span>Contact Us</span>
          </a>
        </div>

        {/* Document Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 QuickCV. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
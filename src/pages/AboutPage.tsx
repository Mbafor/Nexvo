import { Users, Award, Globe, Heart } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Import added
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function AboutPage() {
  const { t } = useTranslation();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="min-h-screen">
      <Header />
      

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 pt-24">
        {/* Mission */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="bg-white-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
            <h3 className="text-3xl lg:text-4xl mb-4 font-medium text-gray-900">
              {t('about.mission.title')}
            </h3>
            <p className="text-gray-800 mb-0 leading-relaxed">
              {t('about.mission.description')}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <Users className="h-8 w-8 text-blue-700 mx-auto mb-2" />
              <div className="text-2xl font-medium text-blue-700">{t('about.stats.cvs.value')}</div>
              <div className="text-sm text-blue-700">{t('about.stats.cvs.label')}</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <Globe className="h-8 w-8 text-black mx-auto mb-2" />
              <div className="text-2xl font-medium text-black">{t('about.stats.countries.value')}</div>
              <div className="text-sm text-gray-700">{t('about.stats.countries.label')}</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <Award className="h-8 w-8 text-blue-700 mx-auto mb-2" />
              <div className="text-2xl font-medium text-blue-700">{t('about.stats.success.value')}</div>
              <div className="text-sm text-blue-700">{t('about.stats.success.label')}</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition">
              <Heart className="h-8 w-8 text-black mx-auto mb-2" />
              <div className="text-2xl font-medium text-black">{t('about.stats.support.value')}</div>
              <div className="text-sm text-gray-700">{t('about.stats.support.label')}</div>
            </div>
          </div>

          {/* What We Do */}
          <h2 className="text-3xl lg:text-4xl font-medium text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">
            {t('about.whatWeDo.title')}
          </h2>
          <p className="mb-4 text-gray-700">
            {t('about.whatWeDo.description')}
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-blue-700 font-medium">•</span>
                <span>{t('about.whatWeDo.points.0')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-700 font-medium">•</span>
                <span>{t('about.whatWeDo.points.1')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-700 font-medium">•</span>
                <span>{t('about.whatWeDo.points.2')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-700 font-medium">•</span>
                <span>{t('about.whatWeDo.points.3')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 font-medium">•</span>
                <span>{t('about.whatWeDo.points.4')}</span>
              </li>
            </ul>
          </div>

          {/* Values */}
          <h2 className="text-3xl lg:text-4xl font-medium text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">
            {t('about.values.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">{t('about.values.cards.excellence.title')}</h3>
              <p className="text-blue-700 text-sm">
                {t('about.values.cards.excellence.description')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <h3 className="font-medium text-blue-700 mb-2">{t('about.values.cards.accessibility.title')}</h3>
              <p className="text-blue-700 text-sm">
                {t('about.values.cards.accessibility.description')}
              </p>
            </div>
            <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-700 mb-2">{t('about.values.cards.innovation.title')}</h3>
              <p className="text-blue-700 text-sm">
                {t('about.values.cards.innovation.description')}
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">{t('about.values.cards.success.title')}</h3>
              <p className="text-blue-700 text-sm">
                {t('about.values.cards.success.description')}
              </p>
            </div>
          </div>

          {/* Impact */}
          <h2 className="text-3xl lg:text-4xl font-medium text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">
            {t('about.impact.title')}
          </h2>
          <p className="mb-4 text-gray-700">
            {t('about.impact.description')}
          </p>
          <ul className="space-y-2 mb-8 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-blue-700 font-medium">✓</span>
              <span>{t('about.impact.points.0')}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-700 font-medium">✓</span>
              <span>{t('about.impact.points.1')}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-700 font-medium">✓</span>
              <span>{t('about.impact.points.2')}</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-700 font-medium">✓</span>
              <span>{t('about.impact.points.3')}</span>
            </li>
          </ul>

          {/* Meet the Team */}
          <h2 className="text-2xl font-medium text-gray-900 border-b-2 border-gray-200 pb-2 mb-8 text-center">
            {t('about.team.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Member 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-600">
                <img src="/Images/joshua.jpg" alt="Mbafor Joshua" className="w-full h-full object-cover" />
              </div>
              <h3 className=" text-black text-lg mb-1">Mbafor Joshua</h3>
              <p className="text-sm text-black mb-2">{t('about.team.members.joshua.role')}</p>
              <p className="text-gray-700 text-sm">
                {t('about.team.members.joshua.bio')}
              </p>
            </div>
            {/* Member 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-600">
                <img src="/Images/yohnjie.jpg" alt="Yohnjie Alain" className="w-full h-full object-cover" />
              </div>
              <h3 className=" text-black text-lg mb-1">Yohnjie Alain</h3>
              <p className="text-sm text-black mb-2">{t('about.team.members.alain.role')}</p>
              <p className="text-gray-700 text-sm">
                {t('about.team.members.alain.bio')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
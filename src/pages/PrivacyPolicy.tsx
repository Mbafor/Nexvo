import { useEffect } from "react";
import { useTranslation, Trans } from 'react-i18next'; // Import added
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const effectiveDate = "January 15, 2025"; // Dates are usually kept dynamic or passed as params

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      {/* Meta Info */}
      <section className="bg-gray-50 border-y border-gray-200 py-4">
        <div className="max-w-5xl mx-auto px-5 flex flex-wrap gap-4 text-sm text-gray-600 justify-center">
          <div className="flex items-center space-x-2">
            <span>{t('privacy.meta.effectiveDate', { date: effectiveDate })}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-5 py-10 leading-relaxed space-y-10">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 space-y-10">
          
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {t('privacy.title')}
          </h1>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-6 mt-10">
              {t('privacy.sections.overview.title')}
            </h2>
            <p>{t('privacy.sections.overview.content')}</p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
              {t('privacy.sections.collection.title')}
            </h2>
            <p>{t('privacy.sections.collection.content')}</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-4">
              <li>
                <strong>{t('privacy.sections.collection.list.0.label')}</strong> {t('privacy.sections.collection.list.0.text')}
              </li>
              <li>
                <strong>{t('privacy.sections.collection.list.1.label')}</strong> {t('privacy.sections.collection.list.1.text')}
              </li>
              <li>
                <strong>{t('privacy.sections.collection.list.2.label')}</strong> {t('privacy.sections.collection.list.2.text')}
              </li>
              <li>
                <strong>{t('privacy.sections.collection.list.3.label')}</strong> {t('privacy.sections.collection.list.3.text')}
              </li>
              <li>
                <strong>{t('privacy.sections.collection.list.4.label')}</strong> {t('privacy.sections.collection.list.4.text')}
              </li>
              <li>
                <strong>{t('privacy.sections.collection.list.5.label')}</strong> {t('privacy.sections.collection.list.5.text')}
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
              {t('privacy.sections.usage.title')}
            </h2>
            <p>{t('privacy.sections.usage.content')}</p>
            <ul className="ml-6 list-disc space-y-2 mt-4">
              <li>{t('privacy.sections.usage.list.0')}</li>
              <li>{t('privacy.sections.usage.list.1')}</li>
              <li>{t('privacy.sections.usage.list.2')}</li>
              <li>{t('privacy.sections.usage.list.3')}</li>
              <li>{t('privacy.sections.usage.list.4')}</li>
              <li>{t('privacy.sections.usage.list.5')}</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
              {t('privacy.sections.sharing.title')}
            </h2>
            <p>{t('privacy.sections.sharing.content')}</p>
            <ul className="ml-6 list-disc space-y-2 mt-4">
              <li>
                <strong>{t('privacy.sections.sharing.list.0.label')}</strong> {t('privacy.sections.sharing.list.0.text')}
              </li>
              <li>
                <strong>{t('privacy.sections.sharing.list.1.label')}</strong> {t('privacy.sections.sharing.list.1.text')}
              </li>
              <li>
                <strong>{t('privacy.sections.sharing.list.2.label')}</strong> {t('privacy.sections.sharing.list.2.text')}
              </li>
              <li>
                <strong>{t('privacy.sections.sharing.list.3.label')}</strong> {t('privacy.sections.sharing.list.3.text')}
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
              {t('privacy.sections.security.title')}
            </h2>
            <p>{t('privacy.sections.security.content')}</p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
              {t('privacy.sections.retention.title')}
            </h2>
            <p>
              <Trans i18nKey="privacy.sections.retention.content">
                We retain your personal data only for as long as necessary to provide our services, comply with legal obligations, and resolve disputes. You can request deletion of your information by contacting us at <a href="mailto:mbaforfoghang@gmail.com" className="text-blue-700 underline">mbaforfoghang@gmail.com</a>.
              </Trans>
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
              {t('privacy.sections.rights.title')}
            </h2>
            <p>{t('privacy.sections.rights.content')}</p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
              {t('privacy.sections.cookies.title')}
            </h2>
            <p>{t('privacy.sections.cookies.content')}</p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
              {t('privacy.sections.thirdParty.title')}
            </h2>
            <p>{t('privacy.sections.thirdParty.content')}</p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
              {t('privacy.sections.international.title')}
            </h2>
            <p>{t('privacy.sections.international.content')}</p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
              {t('privacy.sections.children.title')}
            </h2>
            <p>{t('privacy.sections.children.content')}</p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
              {t('privacy.sections.changes.title')}
            </h2>
            <p>{t('privacy.sections.changes.content')}</p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mt-10 mb-6">
              {t('privacy.sections.contact.title')}
            </h2>
            <p>
              <Trans i18nKey="privacy.sections.contact.content">
                For questions, concerns, or privacy requests, contact our Privacy Team <Link to="/contact" className="text-blue-700 hover:underline">here</Link>
              </Trans>
            </p>
          </section>
        
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
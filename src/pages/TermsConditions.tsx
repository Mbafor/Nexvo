import { useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next'; // Import added
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function TermsConditions() {
  const { t } = useTranslation();
  const lastUpdated = "November 15, 2025";

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
            <span>{t('terms.meta.lastUpdated', { date: lastUpdated })}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-5 py-2 leading-relaxed space-y-10">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 space-y-10">

          {/* Content Sections */}
          <div className="prose prose-gray max-w-none space-y-8">
            <h1 className="text-3xl font-bold text-center text-gray-900">
              {t('terms.title')}
            </h1>

            {/* 1. Acceptance */}
            <section>
              <h2 className="mt-8 text-2xl font-semibold text-black-700 ">
                {t('terms.sections.acceptance.title')}
              </h2>
              <p>{t('terms.sections.acceptance.para1')}</p>
              <p>{t('terms.sections.acceptance.para2')}</p>
            </section>

            {/* 2. Service Overview */}
            <section>
              <h2 className="mt-8 text-2xl font-semibold text-black-700 ">
                {t('terms.sections.overview.title')}
              </h2>
              <p>{t('terms.sections.overview.para1')}</p>
              <p>{t('terms.sections.overview.para2')}</p>
            </section>

            {/* 3. User Accounts */}
            <section>
              <h2 className="mt-8 text-2xl font-semibold text-black-700 ">
                {t('terms.sections.accounts.title')}
              </h2>
              <p>{t('terms.sections.accounts.para1')}</p>
              <p>{t('terms.sections.accounts.para2')}</p>
            </section>

            {/* 4. Acceptable Use */}
            <section>
              <h2 className="mt-8 text-2xl font-semibold text-black-700 ">
                {t('terms.sections.usage.title')}
              </h2>
              <p>{t('terms.sections.usage.para1')}</p>
              <p>{t('terms.sections.usage.para2')}</p>
            </section>

            {/* 5. Intellectual Property */}
            <section>
              <h2 className="mt-8 text-2xl font-semibold text-black-700 ">
                {t('terms.sections.ip.title')}
              </h2>
              <p>{t('terms.sections.ip.para1')}</p>
              <p>{t('terms.sections.ip.para2')}</p>
            </section>

            {/* 6. Privacy and Data Protection (Has Link) */}
            <section>
              <h2 className="mt-8 text-2xl font-semibold text-black-700 ">
                {t('terms.sections.privacy.title')}
              </h2>
              <p>
                <Trans i18nKey="terms.sections.privacy.para1">
                  QuickCV is committed to protecting your privacy. We collect personal information necessary to provide and improve the Service, including registration details, usage data, and technical information. Please review our <Link to="/privacy" className="text-blue-700 hover:underline">Privacy Policy</Link> for detailed information on how your data is collected, used, stored, and shared.
                </Trans>
              </p>
              <p>{t('terms.sections.privacy.para2')}</p>
            </section>

            {/* 7. Payments and Billing */}
            <section>
              <h2 className="mt-8 text-2xl font-semibold text-black-700 ">
                {t('terms.sections.payments.title')}
              </h2>
              <p>{t('terms.sections.payments.para1')}</p>
              <p>{t('terms.sections.payments.para2')}</p>
            </section>

            {/* 8. Limitation of Liability */}
            <section>
              <h2 className="mt-8 text-2xl font-semibold text-black-700 ">
                {t('terms.sections.liability.title')}
              </h2>
              <p>{t('terms.sections.liability.para1')}</p>
              <p>{t('terms.sections.liability.para2')}</p>
            </section>

            {/* 9. Termination */}
            <section>
              <h2 className="mt-8 text-2xl font-semibold text-black-700 ">
                {t('terms.sections.termination.title')}
              </h2>
              <p>{t('terms.sections.termination.para1')}</p>
            </section>

            {/* 10. Modifications to Terms */}
            <section>
              <h2 className="mt-8 text-2xl font-semibold text-black-700 ">
                {t('terms.sections.modifications.title')}
              </h2>
              <p>{t('terms.sections.modifications.para1')}</p>
            </section>

            {/* 11. Governing Law */}
            <section>
              <h2 className="mt-8 text-2xl font-semibold text-black-700 ">
                {t('terms.sections.law.title')}
              </h2>
              <p>{t('terms.sections.law.para1')}</p>
            </section>

            {/* 12. Contact Information (Has Link) */}
            <section>
              <h2 className="mt-8 text-2xl font-semibold text-black-700 ">
                {t('terms.sections.contact.title')}
              </h2>
              <p>
                <Trans i18nKey="terms.sections.contact.para1">
                  If you have questions, concerns, or complaints regarding these Terms, please contact us <Link to="/contact" className="text-blue-700 hover:underline">here</Link>
                </Trans>
              </p>
            </section>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
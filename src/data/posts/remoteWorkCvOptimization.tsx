import { TFunction } from 'i18next';
import { BlogPost } from '../../types/blog';
import { authors, categories, CalloutBox, Highlight, StatsBox, ChecklistItem, QuoteBox, ProgressBar } from '../contentComponents';

export const getRemoteWorkCvOptimization = (t: TFunction): BlogPost => ({
  id: 'remote-work-cv-optimization',
  slug: 'remote-work-cv-optimization',
  title: t('article3.remote_work.meta.title'),
  subtitle: t('article3.remote_work.meta.subtitle'),
  excerpt: t('article3.remote_work.meta.excerpt'),
  date: '2025-01-12',
  readTime: 10,
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=600&fit=crop',
    alt: t('article3.remote_work.images.featured.alt'),
    caption: t('article3.remote_work.images.featured.caption')
  },
  author: authors['sarah-chen'],
  category: categories['career-advice'],
  tags: ['Remote Work', 'CV Tips', 'Digital Skills', 'Work From Home', 'Career Growth'],
  status: 'published',
  featured: true,
  content: {
    intro: t('article3.remote_work.content.intro'),
    body: (
      <div className="space-y-8">
        <section id="remote-work-landscape">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">{t('article3.remote_work.sections.landscape.title')}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {t('article3.remote_work.sections.landscape.intro')}
          </p>
          
          <StatsBox stats={[
            { label: t('article3.remote_work.sections.landscape.stats.workers'), value: '1.1B', color: 'text-blue-700' },
            { label: t('article3.remote_work.sections.landscape.stats.companies'), value: '67%', color: 'text-green-600' },
            { label: t('article3.remote_work.sections.landscape.stats.posting'), value: '300%', color: 'text-purple-600' },
            { label: t('article3.remote_work.sections.landscape.stats.savings'), value: '$11K', color: 'text-orange-600' }
          ]} />

          <QuoteBox 
            quote={t('article3.remote_work.sections.landscape.quote.text')}
            author={t('article3.remote_work.sections.landscape.quote.author')}
            role={t('article3.remote_work.sections.landscape.quote.role')}
          />
        </section>

        <section id="essential-remote-skills">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">{t('article3.remote_work.sections.skills.title')}</h2>
          
          <div className="space-y-8">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">💬 {t('article3.remote_work.sections.skills.communication.title')}</h3>
              <p className="text-blue-700 mb-4">{t('article3.remote_work.sections.skills.communication.intro')}</p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">{t('article3.remote_work.sections.skills.communication.written.title')}</h4>
                  <ul className="text-sm space-y-1">
                    <li>• {t('article3.remote_work.sections.skills.communication.written.email')}</li>
                    <li>• {t('article3.remote_work.sections.skills.communication.written.messaging')}</li>
                    <li>• {t('article3.remote_work.sections.skills.communication.written.pm_tools')}</li>
                    <li>• {t('article3.remote_work.sections.skills.communication.written.docs')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('article3.remote_work.sections.skills.communication.video.title')}</h4>
                  <ul className="text-sm space-y-1">
                    <li>• {t('article3.remote_work.sections.skills.communication.video.meetings')}</li>
                    <li>• {t('article3.remote_work.sections.skills.communication.video.presentation')}</li>
                    <li>• {t('article3.remote_work.sections.skills.communication.video.sharing')}</li>
                    <li>• {t('article3.remote_work.sections.skills.communication.video.body_lang')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('article3.remote_work.sections.skills.communication.async.title')}</h4>
                  <ul className="text-sm space-y-1">
                    <li>• {t('article3.remote_work.sections.skills.communication.async.timezone')}</li>
                    <li>• {t('article3.remote_work.sections.skills.communication.async.updates')}</li>
                    <li>• {t('article3.remote_work.sections.skills.communication.async.proactive')}</li>
                    <li>• {t('article3.remote_work.sections.skills.communication.async.cultural')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">🎯 {t('article3.remote_work.sections.skills.self_management.title')}</h3>
              <p className="text-green-700 mb-4">{t('article3.remote_work.sections.skills.self_management.intro')}</p>
              
              <div className="space-y-3">
                <ProgressBar label={t('article3.remote_work.sections.skills.self_management.bars.time')} percentage={95} color="green" />
                <ProgressBar label={t('article3.remote_work.sections.skills.self_management.bars.motivation')} percentage={88} color="blue" />
                <ProgressBar label={t('article3.remote_work.sections.skills.self_management.bars.deadline')} percentage={92} color="purple" />
                <ProgressBar label={t('article3.remote_work.sections.skills.self_management.bars.problem_solving')} percentage={90} color="orange" />
              </div>
            </div>

            <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">🛠️ {t('article3.remote_work.sections.skills.tech.title')}</h3>
              <p className="text-purple-700 mb-4">{t('article3.remote_work.sections.skills.tech.intro')}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">{t('article3.remote_work.sections.skills.tech.essential.title')}</h4>
                  <div className="space-y-2">
                    <ChecklistItem>{t('article3.remote_work.sections.skills.tech.essential.messaging')}</ChecklistItem>
                    <ChecklistItem>{t('article3.remote_work.sections.skills.tech.essential.video')}</ChecklistItem>
                    <ChecklistItem>{t('article3.remote_work.sections.skills.tech.essential.pm')}</ChecklistItem>
                    <ChecklistItem>{t('article3.remote_work.sections.skills.tech.essential.office')}</ChecklistItem>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">{t('article3.remote_work.sections.skills.tech.advanced.title')}</h4>
                  <div className="space-y-2">
                    <ChecklistItem>{t('article3.remote_work.sections.skills.tech.advanced.vpn')}</ChecklistItem>
                    <ChecklistItem>{t('article3.remote_work.sections.skills.tech.advanced.cloud')}</ChecklistItem>
                    <ChecklistItem>{t('article3.remote_work.sections.skills.tech.advanced.signatures')}</ChecklistItem>
                    <ChecklistItem>{t('article3.remote_work.sections.skills.tech.advanced.tracking')}</ChecklistItem>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cv-formatting-remote">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">{t('article3.remote_work.sections.formatting.title')}</h2>
          
          <div className="space-y-6">
            <CalloutBox type="info" title={t('article3.remote_work.sections.formatting.contact.title')}>
              <p className="mb-4">{t('article3.remote_work.sections.formatting.contact.intro')}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">✅ {t('article3.remote_work.common.include')}</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• {t('article3.remote_work.sections.formatting.contact.include.location')}</li>
                    <li>• {t('article3.remote_work.sections.formatting.contact.include.timezone')}</li>
                    <li>• {t('article3.remote_work.sections.formatting.contact.include.social')}</li>
                    <li>• {t('article3.remote_work.sections.formatting.contact.include.portfolio')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">❌ {t('article3.remote_work.common.avoid')}</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• {t('article3.remote_work.sections.formatting.contact.avoid.address')}</li>
                    <li>• {t('article3.remote_work.sections.formatting.contact.avoid.social')}</li>
                    <li>• {t('article3.remote_work.sections.formatting.contact.avoid.methods')}</li>
                    <li>• {t('article3.remote_work.sections.formatting.contact.avoid.email')}</li>
                  </ul>
                </div>
              </div>
            </CalloutBox>

            <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('article3.remote_work.sections.formatting.summary.title')}</h3>
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="italic text-gray-700">
                  {t('article3.remote_work.sections.formatting.summary.example_start')}{' '}
                  <Highlight>{t('article3.remote_work.sections.formatting.summary.highlight1')}</Highlight>{' '}
                  {t('article3.remote_work.sections.formatting.summary.example_mid1')}{' '}
                  <Highlight>{t('article3.remote_work.sections.formatting.summary.highlight2')}</Highlight>{' '}
                  {t('article3.remote_work.sections.formatting.summary.example_mid2')}{' '}
                  <Highlight>{t('article3.remote_work.sections.formatting.summary.highlight3')}</Highlight>{' '}
                  {t('article3.remote_work.sections.formatting.summary.example_end')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="highlighting-remote-experience">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">{t('article3.remote_work.sections.experience.title')}</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4">{t('article3.remote_work.sections.experience.quantify.title')}</h3>
              <p className="text-yellow-700 mb-4">{t('article3.remote_work.sections.experience.quantify.intro')}</p>
              
              <div className="space-y-3 bg-white p-4 rounded border-l-4 border-yellow-500">
                <div className="p-3 bg-gray-50 rounded">
                  <strong>{t('article3.remote_work.sections.experience.quantify.example1.bold')}</strong>{' '}
                  {t('article3.remote_work.sections.experience.quantify.example1.text')}{' '}
                  <Highlight color="green">{t('article3.remote_work.sections.experience.quantify.example1.highlight')}</Highlight>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <strong>{t('article3.remote_work.sections.experience.quantify.example2.bold')}</strong>{' '}
                  {t('article3.remote_work.sections.experience.quantify.example2.text')}
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <strong>{t('article3.remote_work.sections.experience.quantify.example3.bold')}</strong>{' '}
                  {t('article3.remote_work.sections.experience.quantify.example3.text')}{' '}
                  <Highlight color="blue">{t('article3.remote_work.sections.experience.quantify.example3.highlight')}</Highlight>
                </div>
              </div>
            </div>

            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">{t('article3.remote_work.sections.experience.leadership.title')}</h3>
              <p className="text-green-700 mb-4">{t('article3.remote_work.sections.experience.leadership.intro')}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <ChecklistItem>{t('article3.remote_work.sections.experience.leadership.item1')}</ChecklistItem>
                  <ChecklistItem>{t('article3.remote_work.sections.experience.leadership.item2')}</ChecklistItem>
                  <ChecklistItem>{t('article3.remote_work.sections.experience.leadership.item3')}</ChecklistItem>
                </div>
                <div className="space-y-2">
                  <ChecklistItem>{t('article3.remote_work.sections.experience.leadership.item4')}</ChecklistItem>
                  <ChecklistItem>{t('article3.remote_work.sections.experience.leadership.item5')}</ChecklistItem>
                  <ChecklistItem>{t('article3.remote_work.sections.experience.leadership.item6')}</ChecklistItem>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="industry-specific-remote-tips">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">{t('article3.remote_work.sections.industry.title')}</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">💻 {t('article3.remote_work.sections.industry.dev.title')}</h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• {t('article3.remote_work.sections.industry.dev.tip1')}</li>
                <li>• {t('article3.remote_work.sections.industry.dev.tip2')}</li>
                <li>• {t('article3.remote_work.sections.industry.dev.tip3')}</li>
                <li>• {t('article3.remote_work.sections.industry.dev.tip4')}</li>
                <li>• {t('article3.remote_work.sections.industry.dev.tip5')}</li>
              </ul>
            </div>
            
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-4">📈 {t('article3.remote_work.sections.industry.marketing.title')}</h3>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• {t('article3.remote_work.sections.industry.marketing.tip1')}</li>
                <li>• {t('article3.remote_work.sections.industry.marketing.tip2')}</li>
                <li>• {t('article3.remote_work.sections.industry.marketing.tip3')}</li>
                <li>• {t('article3.remote_work.sections.industry.marketing.tip4')}</li>
                <li>• {t('article3.remote_work.sections.industry.marketing.tip5')}</li>
              </ul>
            </div>
            
            <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">🎧 {t('article3.remote_work.sections.industry.support.title')}</h3>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• {t('article3.remote_work.sections.industry.support.tip1')}</li>
                <li>• {t('article3.remote_work.sections.industry.support.tip2')}</li>
                <li>• {t('article3.remote_work.sections.industry.support.tip3')}</li>
                <li>• {t('article3.remote_work.sections.industry.support.tip4')}</li>
                <li>• {t('article3.remote_work.sections.industry.support.tip5')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="avoiding-common-pitfalls">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">{t('article3.remote_work.sections.pitfalls.title')}</h2>
          
          <div className="space-y-6">
            <CalloutBox type="warning" title={t('article3.remote_work.sections.pitfalls.oversell.title')}>
              <p className="mb-4">{t('article3.remote_work.sections.pitfalls.oversell.intro')}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">❌ {t('article3.remote_work.common.dont')}</h4>
                  <ul className="text-sm space-y-1">
                    <li>• {t('article3.remote_work.sections.pitfalls.oversell.dont.claim')}</li>
                    <li>• {t('article3.remote_work.sections.pitfalls.oversell.dont.focus')}</li>
                    <li>• {t('article3.remote_work.sections.pitfalls.oversell.dont.buzzwords')}</li>
                    <li>• {t('article3.remote_work.sections.pitfalls.oversell.dont.neglect')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">✅ {t('article3.remote_work.common.do')}</h4>
                  <ul className="text-sm space-y-1">
                    <li>• {t('article3.remote_work.sections.pitfalls.oversell.do.examples')}</li>
                    <li>• {t('article3.remote_work.sections.pitfalls.oversell.do.value')}</li>
                    <li>• {t('article3.remote_work.sections.pitfalls.oversell.do.terms')}</li>
                    <li>• {t('article3.remote_work.sections.pitfalls.oversell.do.success')}</li>
                  </ul>
                </div>
              </div>
            </CalloutBox>

            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">{t('article3.remote_work.sections.pitfalls.concerns.title')}</h3>
              <p className="text-blue-700 mb-4">{t('article3.remote_work.sections.pitfalls.concerns.intro')}</p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-700 mt-1">📈</span>
                  <div>
                    <strong>{t('article3.remote_work.sections.pitfalls.concerns.productivity.label')}</strong> {t('article3.remote_work.sections.pitfalls.concerns.productivity.desc')}
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 mt-1">🤝</span>
                  <div>
                    <strong>{t('article3.remote_work.sections.pitfalls.concerns.collaboration.label')}</strong> {t('article3.remote_work.sections.pitfalls.concerns.collaboration.desc')}
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-purple-600 mt-1">💪</span>
                  <div>
                    <strong>{t('article3.remote_work.sections.pitfalls.concerns.commitment.label')}</strong> {t('article3.remote_work.sections.pitfalls.concerns.commitment.desc')}
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-orange-600 mt-1">⚡</span>
                  <div>
                    <strong>{t('article3.remote_work.sections.pitfalls.concerns.communication.label')}</strong> {t('article3.remote_work.sections.pitfalls.concerns.communication.desc')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="technical-setup-infrastructure">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">{t('article3.remote_work.sections.setup.title')}</h2>
          
          <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('article3.remote_work.sections.setup.office.title')}</h3>
            <p className="text-gray-700 mb-4">
              {t('article3.remote_work.sections.setup.office.intro')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">🏠 {t('article3.remote_work.sections.setup.office.workspace.title')}</h4>
                <ul className="text-sm space-y-1">
                  <li>• {t('article3.remote_work.sections.setup.office.workspace.item1')}</li>
                  <li>• {t('article3.remote_work.sections.setup.office.workspace.item2')}</li>
                  <li>• {t('article3.remote_work.sections.setup.office.workspace.item3')}</li>
                  <li>• {t('article3.remote_work.sections.setup.office.workspace.item4')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">🔒 {t('article3.remote_work.sections.setup.office.security.title')}</h4>
                <ul className="text-sm space-y-1">
                  <li>• {t('article3.remote_work.sections.setup.office.security.item1')}</li>
                  <li>• {t('article3.remote_work.sections.setup.office.security.item2')}</li>
                  <li>• {t('article3.remote_work.sections.setup.office.security.item3')}</li>
                  <li>• {t('article3.remote_work.sections.setup.office.security.item4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    ),
    conclusion: t('article3.remote_work.content.conclusion'),
    tableOfContents: [
      { id: 'remote-work-landscape', title: t('article3.remote_work.sections.landscape.title'), level: 2 },
      { id: 'essential-remote-skills', title: t('article3.remote_work.sections.skills.title'), level: 2 },
      { id: 'cv-formatting-remote', title: t('article3.remote_work.sections.formatting.title'), level: 2 },
      { id: 'highlighting-remote-experience', title: t('article3.remote_work.sections.experience.title'), level: 2 },
      { id: 'industry-specific-remote-tips', title: t('article3.remote_work.sections.industry.title'), level: 2 },
      { id: 'avoiding-common-pitfalls', title: t('article3.remote_work.sections.pitfalls.title'), level: 2 },
      { id: 'technical-setup-infrastructure', title: t('article3.remote_work.sections.setup.title'), level: 2 }
    ]
  },
  metadata: {
    seoTitle: t('article3.remote_work.seo.title'),
    seoDescription: t('article3.remote_work.seo.description'),
    keywords: ['remote work CV', 'remote job application', 'work from home resume', 'remote skills', 'virtual team leadership', 'remote work experience'],
    socialImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=630&fit=crop',
    readingTime: 12,
    publishedAt: '2025-01-10T09:00:00Z'
  },
  engagement: {
    views: 18750,
    likes: 856,
    shares: 342,
    comments: 67,
    bookmarks: 289
  }
});
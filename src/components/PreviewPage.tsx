// Stunning CV Preview Page - Professional Template Gallery
import { useState, useEffect } from 'react';
import { Sparkles, Zap, Crown, Minimize2, Code, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Import added
import { CVData, TemplateType } from '../types/cv';
import { PDFViewer } from '@react-pdf/renderer';
import { generatePDFBlob, getTemplate } from '../lib/pdfGenerator';
import { saveAs } from 'file-saver';
import { useAuth } from '../context';
import { downloadIntentService } from '../utils/downloadIntent';

interface PreviewPageProps {
  cvData: CVData;
  onBack: () => void;
  onDownload?: (templateType: TemplateType) => void;
  onShowAuth?: () => void;
}

export default function PreviewPage({ cvData, onBack, onDownload, onShowAuth }: PreviewPageProps) {
  const { t } = useTranslation(); // Hook initialized
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate') as TemplateType;
    return savedTemplate || 'modern';
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [animatedTemplate, setAnimatedTemplate] = useState<string | null>(null);

  // Template metadata moved inside component to allow translation
  const templateConfig = {
    modern: {
      name: t('preview.templates.modern.name'),
      description: t('preview.templates.modern.description'),
      icon: Sparkles,
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      category: t('preview.categories.professional'),
      features: t('preview.templates.modern.features', { returnObjects: true }) as string[]
    },
    creative: {
      name: t('preview.templates.creative.name'),
      description: t('preview.templates.creative.description'),
      icon: Zap,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      category: t('preview.categories.creative'),
      features: t('preview.templates.creative.features', { returnObjects: true }) as string[]
    },
    executive: {
      name: t('preview.templates.executive.name'),
      description: t('preview.templates.executive.description'),
      icon: Crown,
      color: 'from-gray-800 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      category: t('preview.categories.leadership'),
      features: t('preview.templates.executive.features', { returnObjects: true }) as string[]
    },
    minimalist: {
      name: t('preview.templates.minimalist.name'),
      description: t('preview.templates.minimalist.description'),
      icon: Minimize2,
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-700',
      category: t('preview.categories.minimal'),
      features: t('preview.templates.minimalist.features', { returnObjects: true }) as string[]
    },
    tech: {
      name: t('preview.templates.tech.name'),
      description: t('preview.templates.tech.description'),
      icon: Code,
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      category: t('preview.categories.technology'),
      features: t('preview.templates.tech.features', { returnObjects: true }) as string[]
    },
    ats: {
      name: t('preview.templates.ats.name'),
      description: t('preview.templates.ats.description'),
      icon: FileText,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      category: t('preview.categories.atsReady'),
      features: t('preview.templates.ats.features', { returnObjects: true }) as string[]
    }
  };

  // Save selected template to localStorage
  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  const handleTemplateSelect = (template: TemplateType) => {
    setAnimatedTemplate(template);
    setTimeout(() => {
      setSelectedTemplate(template);
      setAnimatedTemplate(null);
    }, 200);
  };

  const handleDownload = async () => {
    if (!cvData.personalInfo.fullName) {
      alert(t('preview.alerts.missingName'));
      return;
    }

    if (!user) {
      console.log('🔒 User not authenticated, saving download intent...');
      downloadIntentService.saveIntent(cvData, selectedTemplate, '/dashboard');
      if (onShowAuth) {
        onShowAuth();
      }
      return;
    }

    if (onDownload) {
      onDownload(selectedTemplate);
      return;
    }

    try {
      const blob = await generatePDFBlob(cvData, selectedTemplate);
      saveAs(blob, `${cvData.personalInfo.fullName}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert(t('preview.alerts.generateError'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Stunning Header with Glassmorphism Effect */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Enhanced Back Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  localStorage.setItem('cvData', JSON.stringify(cvData));
                  onBack();
                }}
                className="group flex items-center space-x-2 px-4 py-2 text-white  bg-blue-700 hover:text-blue-700 hover:bg-gradient-to- rounded-xl transition-all duration-300 border border-gray-200 hover:border-transparent shadow-sm hover:shadow-md"
              >
                <span className="font-medium text-white  bg-blue-700 transition-colors duration-200 cursor-pointer">
                  {t('preview.actions.backToEditor')}
                </span>
              </button>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center space-x-3">
              {!user && (
                <div  className= "bg-blue-700 hover:bg-blue-600 rounded-2xl text-white font-semibold transition-all duration-300 shadow-sm" >
                  <span>{t('preview.actions.signInToDownload')}</span>
                </div>
              )}
              
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
              >
                <span>{isPreviewMode ? t('preview.actions.gallery') : t('preview.actions.preview')}</span>
              </button>

              <button
                onClick={handleDownload}
                className="group relative flex items-center space-x-2 px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded-2xl text-white font-semibold transition-all duration-300 shadow-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r text-blue-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                {!user}
                <span className="relative z-10">
                  {user ? t('preview.actions.downloadPdf') : t('preview.actions.getStarted')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid ${isPreviewMode ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-8`}>
          {/* Template Gallery */}
          <div className={`${isPreviewMode ? '' : 'max-w-4xl mx-auto'}`}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-medium text-gray-900 mb-3">
                {t('preview.hero.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('preview.hero.subtitle')}
              </p>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(Object.entries(templateConfig) as [TemplateType, typeof templateConfig.modern][]).map(([template, config]) => {
                const IconComponent = config.icon;
                const isSelected = selectedTemplate === template;
                const isAnimating = animatedTemplate === template;
                
                return (
                  <div
                    key={template}
                    className={`group relative cursor-pointer transition-all duration-300 ${
                      isAnimating ? 'scale-95' : 'hover:scale-105'
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    {/* Card Container */}
                    <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                      isSelected 
                        ? `${config.borderColor} shadow-2xl shadow-${template === 'tech' ? 'green' : template === 'creative' ? 'purple' : template === 'executive' ? 'yellow' : template === 'minimalist' ? 'gray' : template === 'ats' ? 'orange' : 'blue'}-200/50` 
                        : 'border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
                    } bg-white`}>
                      
                      {/* Selected Indicator */}
                      {isSelected && (
                        <div className={`absolute top-4 right-4 w-6 h-6 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center z-10 shadow-lg`}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}

                      {/* Header with Gradient */}
                      <div className={`relative p-6 ${config.bgColor} border-b border-gray-100`}>
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${config.color} opacity-10 rounded-full -translate-y-12 translate-x-12`}></div>
                        <div className="relative flex items-center space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 text-lg">{config.name}</h3>
                            <span className={`inline-block px-2 py-1 text-xs font-medium ${config.textColor} ${config.bgColor} rounded-full border ${config.borderColor} mt-1`}>
                              {config.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {config.description}
                        </p>
                        
                        {/* Features */}
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {t('preview.card.featuresLabel')}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {config.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Button */}
                        <button className={`w-full mt-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                          isSelected
                            ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                          {isSelected ? t('preview.card.selected') : t('preview.card.selectTemplate')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Preview Toggle */}
            <div className="lg:hidden mt-8 text-center  bg-blue-700 rounded-2xl">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="inline-flex items-center space-x-2 px-6 py-3 text-white font-medium"
              >
                <span>{isPreviewMode ? t('preview.actions.backToGallery') : t('preview.actions.previewSelected')}</span>
              </button>
            </div>
          </div>

          {/* Enhanced Preview Panel */}
          {(isPreviewMode || window.innerWidth >= 1024) && (
            <div className="sticky top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Preview Header */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-1">{t('preview.panel.title')}</h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">
                          {
                            // @ts-ignore - Dynamic access
                            templateConfig[selectedTemplate].name
                          }
                        </span> {t('preview.panel.templateSuffix')}
                      </p>
                    </div>
                    <div className={`px-3 py-1 text-xs font-medium ${
                      // @ts-ignore
                      templateConfig[selectedTemplate].textColor
                    } ${
                      // @ts-ignore
                      templateConfig[selectedTemplate].bgColor
                    } rounded-full border ${
                      // @ts-ignore
                      templateConfig[selectedTemplate].borderColor
                    }`}>
                      {
                        // @ts-ignore
                        templateConfig[selectedTemplate].category
                      }
                    </div>
                  </div>
                </div>
                
                {/* PDF Viewer Container */}
                <div className="relative bg-gray-100">
                  <div className="w-full" style={{ height: '70vh', minHeight: '500px' }}>
                    <PDFViewer
                      width="100%"
                      height="100%"
                      showToolbar={true}
                      className="border-0 rounded-b-2xl"
                    >
                      {getTemplate(selectedTemplate, cvData)}
                    </PDFViewer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
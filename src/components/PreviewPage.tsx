// Optimized Preview Page - Mobile Layout Fixed
import { useState, useEffect } from 'react';
import { 
  Sparkles, Zap, Crown, Minimize2, Code, FileText, 
  ChevronLeft, Download, LayoutTemplate, Eye, CheckCircle2, Loader2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CVData, TemplateType } from '../types/cv';
import { PDFViewer } from '@react-pdf/renderer';
import { generatePDFBlob, getTemplate } from '../lib/pdfGenerator';
import { saveAs } from 'file-saver';
import { useAuth } from '../context';
import { downloadIntentService } from '../utils/downloadIntent';
import LanguageSelector from "./LanguageSelector";

interface PreviewPageProps {
  cvData: CVData;
  onBack: () => void;
  onDownload?: (templateType: TemplateType) => void;
  onShowAuth?: () => void;
}

export default function PreviewPage({ cvData, onBack, onDownload, onShowAuth }: PreviewPageProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  // State
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(() => {
    return (localStorage.getItem('selectedTemplate') as TemplateType) || 'modern';
  });
  
  // Mobile View State
  const [mobileTab, setMobileTab] = useState<'gallery' | 'preview'>('gallery');
  const [isGenerating, setIsGenerating] = useState(false);

  // Template Config
  const templateConfig = {
    modern: {
      name: t('preview.templates.modern.name'),
      description: t('preview.templates.modern.description'),
      icon: Sparkles,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      ring: 'ring-blue-500',
      category: t('preview.categories.professional'),
    },
    creative: {
      name: t('preview.templates.creative.name'),
      description: t('preview.templates.creative.description'),
      icon: Zap,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      ring: 'ring-purple-500',
      category: t('preview.categories.creative'),
    },
    executive: {
      name: t('preview.templates.executive.name'),
      description: t('preview.templates.executive.description'),
      icon: Crown,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      ring: 'ring-amber-500',
      category: t('preview.categories.leadership'),
    },
    minimalist: {
      name: t('preview.templates.minimalist.name'),
      description: t('preview.templates.minimalist.description'),
      icon: Minimize2,
      color: 'text-slate-600',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      ring: 'ring-slate-500',
      category: t('preview.categories.minimal'),
    },
    tech: {
      name: t('preview.templates.tech.name'),
      description: t('preview.templates.tech.description'),
      icon: Code,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      ring: 'ring-emerald-500',
      category: t('preview.categories.technology'),
    },
    ats: {
      name: t('preview.templates.ats.name'),
      description: t('preview.templates.ats.description'),
      icon: FileText,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      ring: 'ring-orange-500',
      category: t('preview.categories.atsReady'),
    }
  };

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  // Handlers
  const handleDownload = async () => {
    if (!cvData.personalInfo.fullName) {
      alert(t('preview.alerts.missingName'));
      return;
    }

    if (!user) {
      downloadIntentService.saveIntent(cvData, selectedTemplate, '/dashboard');
      if (onShowAuth) onShowAuth();
      return;
    }

    if (onDownload) {
      onDownload(selectedTemplate);
      return;
    }

    setIsGenerating(true);
    try {
      // NOTE: Ensure you pass translations here if you implemented the i18n fix from previous steps
      // const translations = { ... build translations object ... };
      // const blob = await generatePDFBlob(cvData, selectedTemplate, translations);
      const blob = await generatePDFBlob(cvData, selectedTemplate);
      saveAs(blob, `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (err) {
      console.error('PDF Error:', err);
      alert(t('preview.alerts.generateError'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    // FIX 1: Use 100dvh (Dynamic Viewport Height) to fix mobile browser bottom bar issues
    <div className="h-[100dvh] flex flex-col bg-gray-50 overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 h-16 flex-shrink-0 z-30 shadow-sm">
        <div className="h-full max-w-full px-4 flex items-center justify-between">
          
          {/* Left: Back */}
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium p-2 -ml-2"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="hidden sm:inline ml-1">{t('common3.back')}</span>
          </button>

          {/* Center: Title (Hidden on mobile) */}
          <h1 className="text-lg font-semibold text-gray-800 hidden md:block absolute left-1/2 transform -translate-x-1/2">
            {t('preview.header.title')}
          </h1>

          {/* Right: Actions Group */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector - Hidden on very small screens to prioritize Download */}
            <div className="hidden xs:block"> 
              <LanguageSelector />
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">{t('preview.actions.downloadPdf')}</span>
              <span className="sm:hidden text-sm">{t('common3.save')}</span>
            </button>
          </div>

        </div>
      </header>

      {/* --- MAIN CONTENT (SPLIT SCREEN) --- */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL: Template Gallery */}
        <aside className={`
          w-full lg:w-[400px] xl:w-[450px] bg-white border-r border-gray-200 flex flex-col
          absolute lg:relative inset-0 z-10 lg:z-0 transition-transform duration-300 ease-in-out
          ${mobileTab === 'gallery' ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Added extra padding bottom for mobile nav */}
          <div className="p-4 sm:p-6 overflow-y-auto h-full custom-scrollbar pb-28 lg:pb-6">
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">{t('preview.gallery.title')}</h2>
              <p className="text-sm text-gray-500 mt-1">{t('preview.gallery.subtitle')}</p>
            </div>

            <div className="space-y-3">
              {(Object.entries(templateConfig) as [TemplateType, typeof templateConfig.modern][]).map(([key, config]) => {
                const Icon = config.icon;
                const isSelected = selectedTemplate === key;

                return (
                  <div
                    key={key}
                    onClick={() => {
                      setSelectedTemplate(key);
                      // Auto-switch to preview on mobile for better UX
                      if (window.innerWidth < 1024) setMobileTab('preview');
                    }}
                    className={`
                      group relative p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? `${config.border} ${config.bg} ${config.ring} ring-1` 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      {/* Icon Box */}
                      <div className={`
                        w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0
                        ${isSelected ? 'bg-white shadow-sm' : 'bg-gray-100 group-hover:bg-white group-hover:shadow-sm'}
                        transition-all duration-200
                      `}>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${config.color}`} />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-semibold text-sm sm:text-base ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                            {config.name}
                          </h3>
                          {isSelected && (
                            <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${config.color}`} />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                          {config.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* RIGHT PANEL: PDF Preview */}
        <main className={`
          flex-1 bg-gray-100/50 relative flex flex-col items-center justify-center
          absolute lg:relative inset-0 transition-transform duration-300 ease-in-out
          ${mobileTab === 'preview' ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 w-full h-full bg-white lg:p-8 overflow-hidden relative">
              
               {/* Loading State */}
               <div className="absolute inset-0 z-0 flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                  <p className="text-sm text-gray-500 font-medium">Loading Preview...</p>
                </div>
              </div>

              {/* PDF Viewer - Full Height minus bottom nav padding on mobile */}
              <div className="relative z-10 w-full h-full pb-20 lg:pb-0">
                <PDFViewer
                  width="100%"
                  height="100%"
                  showToolbar={true}
                  className="w-full h-full"
                >
                   {/* REMEMBER: If you implemented i18n for PDF, pass translations here */}
                  {getTemplate(selectedTemplate, cvData)}
                </PDFViewer>
              </div>
            </div>
          </div>
        </main>

        {/* MOBILE BOTTOM NAVIGATION */}
        {/* FIX 2: Use 'fixed' and 'bottom-8/10' to avoid Safari/Chrome bottom bar overlay */}
        <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-full p-1.5 flex">
            <button
              onClick={() => setMobileTab('gallery')}
              className={`
                flex-1 flex items-center justify-center space-x-2 py-3 rounded-full text-sm font-bold transition-all duration-200
                ${mobileTab === 'gallery' 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-100'
                }
              `}
            >
              <LayoutTemplate className="w-4 h-4" />
              <span>{t('preview.tabs.templates')}</span>
            </button>
            <button
              onClick={() => setMobileTab('preview')}
              className={`
                flex-1 flex items-center justify-center space-x-2 py-3 rounded-full text-sm font-bold transition-all duration-200
                ${mobileTab === 'preview' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-100'
                }
              `}
            >
              <Eye className="w-4 h-4" />
              <span>{t('preview.tabs.preview')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
// Optimized Preview Page - Split Screen UX
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
  
  // Mobile View State: 'gallery' | 'preview'
  const [mobileTab, setMobileTab] = useState<'gallery' | 'preview'>('gallery');
  const [isGenerating, setIsGenerating] = useState(false);

  // Template Configuration with Translations
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

  // Persist Selection
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
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 h-16 flex-shrink-0 z-20 shadow-sm">
  <div className="h-full max-w-full px-4 lg:px-8 flex items-center justify-between">
    
    {/* Left: Back */}
    <div className="flex items-center">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        <span className="hidden sm:inline">{t('common3.back')}</span>
      </button>
    </div>

    {/* Center: Title (Hidden on mobile) */}
    <h1 className="text-lg font-semibold text-gray-800 hidden md:block absolute left-1/2 transform -translate-x-1/2">
      {t('preview.header.title')}
    </h1>

    {/* Right: Actions Group (Language + Download) */}
    <div className="flex items-center gap-3 sm:gap-4">
      
     

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">{t('preview.actions.downloadPdf')}</span>
        <span className="sm:hidden">{t('common3.save')}</span>
      </button>
       {/* Language Selector */}
      <div> {/* Optional: Hide on very small screens if needed */}
        <LanguageSelector />
      </div>
    </div>

  </div>
</header>

      {/* --- MAIN CONTENT (SPLIT SCREEN) --- */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL: Template Gallery (Scrollable) */}
        {/* Visible on Desktop, toggled on Mobile */}
        <aside className={`
          w-full lg:w-[400px] xl:w-[450px] bg-white border-r border-gray-200 flex flex-col
          absolute lg:relative inset-0 z-10 lg:z-0 transition-transform duration-300 ease-in-out
          ${mobileTab === 'gallery' ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-5 lg:p-6 overflow-y-auto h-full custom-scrollbar pb-24 lg:pb-6">
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">{t('preview.gallery.title')}</h2>
              <p className="text-sm text-gray-500 mt-1">{t('preview.gallery.subtitle')}</p>
            </div>

            <div className="space-y-4">
              {(Object.entries(templateConfig) as [TemplateType, typeof templateConfig.modern][]).map(([key, config]) => {
                const Icon = config.icon;
                const isSelected = selectedTemplate === key;

                return (
                  <div
                    key={key}
                    onClick={() => {
                      setSelectedTemplate(key);
                      // On mobile, auto-switch to preview after selection for better flow
                      if (window.innerWidth < 1024) setMobileTab('preview');
                    }}
                    className={`
                      group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? `${config.border} ${config.bg} ${config.ring} ring-1` 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Icon Box */}
                      <div className={`
                        w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                        ${isSelected ? 'bg-white shadow-sm' : 'bg-gray-100 group-hover:bg-white group-hover:shadow-sm'}
                        transition-all duration-200
                      `}>
                        <Icon className={`w-6 h-6 ${config.color}`} />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-semibold text-base ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                            {config.name}
                          </h3>
                          {isSelected && (
                            <CheckCircle2 className={`w-5 h-5 ${config.color}`} />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                          {config.description}
                        </p>
                        <span className={`
                          inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md
                          ${isSelected ? 'bg-white/60' : 'bg-gray-100'} text-gray-500
                        `}>
                          {config.category}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* RIGHT PANEL: PDF Preview */}
        {/* Visible on Desktop, toggled on Mobile */}
        <main className={`
          flex-1 bg-gray-100/50 relative flex flex-col items-center justify-center
          absolute lg:relative inset-0 transition-transform duration-300 ease-in-out
          ${mobileTab === 'preview' ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
          
          {/* Desktop: subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="w-full h-full lg:p-8 flex flex-col">
            {/* PDF Viewer Wrapper */}
            <div className="flex-1 w-full h-full bg-white lg:shadow-2xl lg:rounded-xl overflow-hidden border border-gray-200 relative">
              
              {/* Loading State Overlay */}
              <div className="absolute inset-0 z-0 flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                  <p className="text-sm text-gray-500 font-medium">Rendering PDF...</p>
                </div>
              </div>

              {/* Actual Viewer */}
              <div className="relative z-10 w-full h-full">
                <PDFViewer
                  width="100%"
                  height="100%"
                  showToolbar={true} // Toolbar is useful for zoom/print
                  className="w-full h-full"
                >
                  {getTemplate(selectedTemplate, cvData)}
                </PDFViewer>
              </div>
            </div>
          </div>
        </main>

        {/* MOBILE BOTTOM NAVIGATION */}
        {/* Only visible on screens smaller than lg */}
        <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg rounded-full p-1.5 flex space-x-1">
          <button
            onClick={() => setMobileTab('gallery')}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-200
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
              flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-200
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
  );
}
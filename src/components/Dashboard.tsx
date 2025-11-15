// Advanced Professional Dashboard Component
// Google-level enterprise dashboard with comprehensive CV management

import { useState, useEffect } from 'react';
import { 
  Download, 
  Edit, 
  Trash2, 
  Plus, 
  FileText, 
  LogOut, 
  BarChart3, 
  Settings, 
  Search, 
  Grid, 
  List, 
  Share2, 
  Copy, 
  Eye, 
  MoreVertical, 
  User, 
  Palette, 
  HelpCircle, 
  Star, 
  Clock, 
  TrendingUp, 
  Folder, 
  Award, 
  Target, 
  Zap, 
  CheckCircle2, 
  BookOpen, 
  ChevronRight, 
  Menu, 
  X, 
  Mail, 
  MessageCircle, 
  Headphones, 
  Send,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Import added
import { useAuth } from '../context';
import { CVData, TemplateType } from '../types/cv';
import { getUserCVDownloads, deleteCVDownload, saveCVDownload, CVDownloadRecord } from '../lib/firestore';
import { generatePDFBlob } from '../lib/pdfGenerator';
import { saveAs } from 'file-saver';
import { blogPosts } from '../data/blogPosts';
import EmailVerificationBanner from './EmailVerificationBanner';
import { sendContactMessage } from '../utils/contactService';
import LanguageSelector from './LanguageSelector';

interface DashboardProps {
  onCreateNew: () => void;
  onEditCV?: (cvData: CVData) => void;
}

type ViewMode = 'grid' | 'list';
type SidebarTab = 'dashboard' | 'analytics' | 'templates' | 'resources' | 'settings' | 'help';

export default function Dashboard({ onCreateNew, onEditCV }: DashboardProps) {
  const { t } = useTranslation(); // Hook initialized
  const { user, loading: authLoading, signOut } = useAuth();
  const [cvHistory, setCVHistory] = useState<CVDownloadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCVs, setSelectedCVs] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedCVForTemplate, setSelectedCVForTemplate] = useState<CVDownloadRecord | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalDownloads: 0,
    templatesUsed: 0,
    lastDownload: null as Date | null,
    thisMonthDownloads: 0,
    totalViews: 0,
    avgRating: 0
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    issueType: 'general',
    message: ''
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSubmitStatus, setContactSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Available templates moved inside component for translation
  const availableTemplates: { type: TemplateType; name: string; description: string; preview: string; color: string; category: string }[] = [
    {
      type: 'modern',
      name: t('dashboard.templates.modern.name'),
      description: t('dashboard.templates.modern.description'),
      preview: '✨',
      color: 'from-blue-500 to-purple-600',
      category: t('dashboard.templateCategories.professional')
    },
    {
      type: 'creative',
      name: t('dashboard.templates.creative.name'),
      description: t('dashboard.templates.creative.description'),
      preview: '🎨',
      color: 'from-purple-500 to-pink-600',
      category: t('dashboard.templateCategories.creative')
    },
    {
      type: 'executive',
      name: t('dashboard.templates.executive.name'),
      description: t('dashboard.templates.executive.description'),
      preview: '👑',
      color: 'from-gray-800 to-yellow-600',
      category: t('dashboard.templateCategories.leadership')
    },
    {
      type: 'minimalist',
      name: t('dashboard.templates.minimalist.name'),
      description: t('dashboard.templates.minimalist.description'),
      preview: '🖋️',
      color: 'from-gray-400 to-gray-600',
      category: t('dashboard.templateCategories.minimal')
    },
    {
      type: 'tech',
      name: t('dashboard.templates.tech.name'),
      description: t('dashboard.templates.tech.description'),
      preview: '⚡',
      color: 'from-green-500 to-teal-600',
      category: t('dashboard.templateCategories.technology')
    },
    {
      type: 'ats',
      name: t('dashboard.templates.ats.name'),
      description: t('dashboard.templates.ats.description'),
      preview: '📋',
      color: 'from-orange-500 to-red-600',
      category: t('dashboard.templateCategories.atsReady')
    }
  ];

  useEffect(() => {
    // Only load CV history when user is authenticated and loading is complete
    if (!authLoading) {
      loadCVHistory();
    }
  }, [user, authLoading]);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleTabChange = (tab: SidebarTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    setShowBulkActions(selectedCVs.length > 0);
  }, [selectedCVs]);

  const loadCVHistory = async () => {
    if (authLoading) return;

    if (!user) {
      // Check for unsaved CV in localStorage
      const localCV = localStorage.getItem('cvData');
      
      if (localCV) {
        try {
          const cvData = JSON.parse(localCV);
          
          if (cvData.personalInfo.fullName) {
            // Create a temporary record for display
            const tempRecord: CVDownloadRecord = {
              id: 'local-temp',
              fileName: `${cvData.personalInfo.fullName}_CV_Draft.pdf`,
              cvData: cvData,
              templateType: 'modern',
              downloadedAt: new Date()
            };
            
            setCVHistory([tempRecord]);
            
            setStats({
              totalDownloads: 1,
              templatesUsed: 1,
              lastDownload: new Date(),
              thisMonthDownloads: 1,
              totalViews: 1,
              avgRating: 0
            });
          }
        } catch (error) {
          console.error('❌ Failed to parse local CV:', error);
        }
      }
      
      setLoading(false);
      return;
    }
    
    try {
      const downloads = await getUserCVDownloads(user.uid);
      setCVHistory(downloads);
      
      // Calculate advanced stats
      const templatesUsed = new Set(downloads.map((d: CVDownloadRecord) => d.templateType)).size;
      const lastDownload = downloads.length > 0 ? downloads[0].downloadedAt : null;
      const thisMonth = new Date();
      thisMonth.setMonth(thisMonth.getMonth());
      const thisMonthDownloads = downloads.filter(d => d.downloadedAt >= thisMonth).length;
      
      setStats({
        totalDownloads: downloads.length,
        templatesUsed,
        lastDownload,
        thisMonthDownloads,
        totalViews: downloads.length * 3, // Simulated
        avgRating: 4.8 // Simulated
      });
    } catch (error) {
      console.error('❌ Failed to load CV data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCVAction = async (action: string, record: CVDownloadRecord) => {
    setIsDownloading(record.id);
    setShowActionMenu(null);
    
    try {
      switch (action) {
        case 'download':
          const blob = await generatePDFBlob(record.cvData, record.templateType);
          saveAs(blob, record.fileName);
          break;
        case 'duplicate':
          if (onEditCV) {
            const duplicatedData = { ...record.cvData };
            duplicatedData.personalInfo.fullName += ` (${t('dashboard.actions.copySuffix')})`;
            onEditCV(duplicatedData);
          }
          break;
        case 'edit':
          if (onEditCV) onEditCV(record.cvData);
          break;
        case 'share':
          const shareUrl = `${window.location.origin}/cv/shared/${record.id}`;
          await navigator.clipboard.writeText(shareUrl);
          alert(t('dashboard.alerts.shareLinkCopied'));
          break;
        case 'change-template':
          setSelectedCVForTemplate(record);
          setShowTemplateModal(true);
          break;
        case 'delete':
          if (confirm(t('dashboard.alerts.confirmDelete'))) {
            await deleteCVDownload(record.id);
            setCVHistory(prev => prev.filter(cv => cv.id !== record.id));
          }
          break;
      }
    } catch (error) {
      console.error(`❌ Failed to ${action} CV:`, error);
      alert(t('dashboard.alerts.actionFailed', { action }));
    } finally {
      setIsDownloading(null);
    }
  };

  const handleTemplateChange = async (newTemplate: TemplateType) => {
    if (!selectedCVForTemplate || !user) return;

    try {
      setIsDownloading(selectedCVForTemplate.id);
      
      await saveCVDownload(
        user.uid,
        user.email || '',
        selectedCVForTemplate.cvData,
        newTemplate
      );

      loadCVHistory();
      
      setShowTemplateModal(false);
      setSelectedCVForTemplate(null);
      
      alert(t('dashboard.alerts.templateChanged', { template: getTemplateDisplayName(newTemplate) }));
      
    } catch (error) {
      console.error('❌ Failed to change template:', error);
      alert(t('dashboard.alerts.templateChangeFailed'));
    } finally {
      setIsDownloading(null);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedCVs.length === 0) return;
    
    try {
      switch (action) {
        case 'download':
          for (const cvId of selectedCVs) {
            const record = cvHistory.find(cv => cv.id === cvId);
            if (record) {
              const blob = await generatePDFBlob(record.cvData, record.templateType);
              saveAs(blob, record.fileName);
            }
          }
          break;
        case 'delete':
          if (confirm(t('dashboard.alerts.confirmBulkDelete', { count: selectedCVs.length }))) {
            for (const cvId of selectedCVs) {
              await deleteCVDownload(cvId);
            }
            setCVHistory(prev => prev.filter(cv => !selectedCVs.includes(cv.id)));
            setSelectedCVs([]);
          }
          break;
      }
    } catch (error) {
      console.error('❌ Bulk action failed:', error);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.message.trim()) return;

    setIsSubmittingContact(true);
    setContactSubmitStatus('idle');

    try {
      const result = await sendContactMessage({
        name: user?.displayName || user?.email || 'Dashboard User',
        email: user?.email || '',
        subject: `Dashboard Support: ${contactForm.issueType}`,
        message: contactForm.message,
        inquiryType: contactForm.issueType as any,
        urgency: 'medium'
      });

      if (result.success) {
        setContactSubmitStatus('success');
        setContactForm({ issueType: 'general', message: '' });
        setTimeout(() => setContactSubmitStatus('idle'), 3000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('❌ Contact form submission failed:', error);
      setContactSubmitStatus('error');
      setTimeout(() => setContactSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const filteredCVs = cvHistory.filter(cv =>
    cv.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cv.cvData.personalInfo.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCVSelection = (cvId: string) => {
    setSelectedCVs(prev =>
      prev.includes(cvId)
        ? prev.filter(id => id !== cvId)
        : [...prev, cvId]
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTemplateDisplayName = (template: TemplateType): string => {
    // We use the translated names from availableTemplates array
    const templateObj = availableTemplates.find(t => t.type === template);
    return templateObj ? templateObj.name : template;
  };

  const getTemplateColor = (template: TemplateType): string => {
    const colors: Record<TemplateType, string> = {
      modern: 'bg-blue-100 text-blue-700',
      creative: 'bg-purple-100 text-purple-800',
      ats: 'bg-green-100 text-green-800',
      executive: 'bg-amber-100 text-amber-800',
      minimalist: 'bg-gray-100 text-gray-800',
      tech: 'bg-cyan-100 text-cyan-800'
    };
    return colors[template] || 'bg-gray-100 text-gray-800';
  };

  const renderSettingsPanel = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="h-5 w-5 mr-2" />
          {t('dashboard.settings.profile.title')}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.settings.profile.displayName')}</label>
            <input
              type="text"
              defaultValue={user?.displayName || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.settings.profile.email')}</label>
            <input
              type="email"
              defaultValue={user?.email || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          {t('dashboard.settings.preferences.title')}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{t('dashboard.settings.preferences.darkMode')}</span>
            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{t('dashboard.settings.preferences.emailNotifications')}</span>
            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-blue-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsPanel = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('dashboard.analytics.totalViews')}</p>
              <p className="text-2xl font-medium text-gray-900">{stats.totalViews}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Eye className="h-6 w-6 text-blue-700" />
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('dashboard.analytics.thisMonth')}</p>
              <p className="text-2xl font-medium text-gray-900">{stats.thisMonthDownloads}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('dashboard.analytics.avgRating')}</p>
              <p className="text-2xl font-medium text-gray-900">{stats.avgRating}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('dashboard.analytics.successRate')}</p>
              <p className="text-2xl font-medium text-gray-900">94%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Target className="h-6 w-6 text-blue-700" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.analytics.performanceInsights')}</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-blue-700" />
              <span className="font-medium text-blue-700">{t('dashboard.analytics.mostPopularTemplate')}</span>
            </div>
            <span className="text-blue-700 font-semibold">{t('dashboard.templates.modern.name')}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-900">{t('dashboard.analytics.peakDownloadTime')}</span>
            </div>
            <span className="text-green-700 font-semibold">2:00 PM - 4:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Show authentication loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">{t('dashboard.loading.authenticating')}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">{t('dashboard.loading.dashboard')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex relative">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Advanced Sidebar */}
      <div className="hidden lg:flex lg:w-64 bg-white shadow-xl border-r border-gray-200 flex-col h-full">
        {/* Desktop Sidebar Content */}
        {/* Logo & User */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-medium text-lg">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900 truncate">
                {user?.displayName || t('dashboard.user.defaultName')}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'dashboard', icon: BarChart3, label: t('dashboard.nav.dashboard'), badge: cvHistory.length },
            { id: 'analytics', icon: TrendingUp, label: t('dashboard.nav.analytics'), badge: null },
            { id: 'templates', icon: Palette, label: t('dashboard.nav.templates'), badge: null },
            { id: 'resources', icon: BookOpen, label: t('dashboard.nav.resources'), badge: blogPosts.length },
            { id: 'settings', icon: Settings, label: t('dashboard.nav.settings'), badge: null },
            { id: 'help', icon: HelpCircle, label: t('dashboard.nav.help'), badge: null }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as SidebarTab)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-700 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                  activeTab === item.id ? 'bg-white text-blue-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={onCreateNew}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            <span className="font-semibold">{t('dashboard.actions.createNew')}</span>
          </button>
          
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span>{t('dashboard.actions.signOut')}</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isMobileMenuOpen ? 0 : -320
        }}
        className="fixed lg:hidden w-80 bg-white shadow-xl border-r border-gray-200 flex flex-col z-50 h-full"
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end p-4 border-b border-gray-200">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Logo & User */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-medium text-lg">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900 truncate text-sm">
                {user?.displayName || t('dashboard.user.defaultName')}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {[
            { id: 'dashboard', icon: BarChart3, label: t('dashboard.nav.dashboard'), badge: cvHistory.length },
            { id: 'analytics', icon: TrendingUp, label: t('dashboard.nav.analytics'), badge: null },
            { id: 'templates', icon: Palette, label: t('dashboard.nav.templates'), badge: null },
            { id: 'resources', icon: BookOpen, label: t('dashboard.nav.resources'), badge: blogPosts.length },
            { id: 'settings', icon: Settings, label: t('dashboard.nav.settings'), badge: null },
            { id: 'help', icon: HelpCircle, label: t('dashboard.nav.help'), badge: null }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id as SidebarTab)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                activeTab === item.id
                  ? 'bg-blue-700 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                  activeTab === item.id ? 'bg-white text-blue-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="p-3 border-t border-gray-200 space-y-2">
          <button
            onClick={onCreateNew}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg text-sm"
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            <span className="font-semibold">{t('dashboard.actions.createNew')}</span>
          </button>
          
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors text-sm"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span>{t('dashboard.actions.signOut')}</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between relative z-50">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-medium text-gray-900">
            {t(`dashboard.nav.${activeTab}`)}
          </h1>
          <LanguageSelector className="scale-90 " />
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-gray-900">
                {t(`dashboard.nav.${activeTab}`)}
              </h1>
              <p className="text-gray-600">
                {t(`dashboard.descriptions.${activeTab}`)}
              </p>
            </div>

            <div className="flex items-center space-x-4 relative z-50">
              {activeTab === 'dashboard' && (
                <div className="flex items-center justify-between space-x-4 w-full">
                  {/* Search on the left */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('dashboard.searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* View mode toggle on the right */}
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
              <div className="flex-shrink-0">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area - Mobile optimized */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto py-15 ">
          {activeTab === 'dashboard' && (
            <>
              {/* Mobile Search and View Toggle */}
              <div className="lg:hidden mb-4">
                <div className="flex items-center justify-between space-x-4">
                  {/* Search on the left */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('dashboard.searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* View mode toggle on the right */}
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Verification Banner */}
              <EmailVerificationBanner />

              {/* Stats Grid - Mobile Responsive */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm p-4 lg:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">{t('dashboard.stats.totalCVs')}</p>
                      <p className="text-xl lg:text-3xl font-medium text-gray-900">{stats.totalDownloads}</p>
                    </div>
                    <div className="bg-blue-100 p-2 lg:p-3 rounded-full">
                      <FileText className="h-4 w-4 lg:h-6 lg:w-6 text-blue-700" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-4 lg:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">{t('dashboard.stats.templatesUsed')}</p>
                      <p className="text-xl lg:text-3xl font-medium text-gray-900">{stats.templatesUsed}</p>
                    </div>
                    <div className="bg-purple-100 p-2 lg:p-3 rounded-full">
                      <Palette className="h-4 w-4 lg:h-6 lg:w-6 text-blue-700" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-sm p-4 lg:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">{t('dashboard.stats.lastActivity')}</p>
                      <p className="text-sm lg:text-lg font-semibold text-gray-900">
                        {stats.lastDownload ? formatDate(stats.lastDownload as Date).split(',')[0] : t('dashboard.stats.never')}
                      </p>
                    </div>
                    <div className="bg-green-100 p-2 lg:p-3 rounded-full">
                      <Clock className="h-4 w-4 lg:h-6 lg:w-6 text-green-600" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-sm p-4 lg:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">{t('dashboard.stats.successRate')}</p>
                      <p className="text-xl lg:text-3xl font-medium text-gray-900">98%</p>
                    </div>
                    <div className="bg-yellow-100 p-2 lg:p-3 rounded-full">
                      <Star className="h-4 w-4 lg:h-6 lg:w-6 text-yellow-600" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bulk Actions */}
              <AnimatePresence>
                {showBulkActions && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700 font-medium">
                        {t('dashboard.bulkActions.selected', { count: selectedCVs.length })}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleBulkAction('download')}
                          className="px-3 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                          {t('dashboard.bulkActions.downloadAll')}
                        </button>
                        <button
                          onClick={() => handleBulkAction('delete')}
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                          {t('dashboard.bulkActions.deleteAll')}
                        </button>
                        <button
                          onClick={() => setSelectedCVs([])}
                          className="px-3 py-1 text-gray-600 hover:text-gray-800"
                        >
                          {t('dashboard.bulkActions.clear')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CV Grid/List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm"
              >
                <div className="p-4 lg:p-6 border-b border-gray-200">
                  <h2 className="text-lg lg:text-xl font-medium text-gray-900 flex items-center">
                    <Folder className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                    {t('dashboard.yourCVs', { count: filteredCVs.length })}
                  </h2>
                </div>

                <div className="p-4 lg:p-6">
                  {filteredCVs.length === 0 ? (
                    <div className="text-center py-8 lg:py-12">
                      <FileText className="h-8 w-8 lg:h-12 lg:w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                        {searchQuery ? t('dashboard.emptyState.noResults') : t('dashboard.emptyState.noCVs')}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6 px-4">
                        {searchQuery ? t('dashboard.emptyState.tryAdjusting') : t('dashboard.emptyState.createFirst')}
                      </p>
                      {!searchQuery && (
                        <button
                          onClick={onCreateNew}
                          className="flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors mx-auto text-sm lg:text-base"
                        >
                          <Plus className="h-4 w-4" />
                          <span>{t('dashboard.actions.createFirstCV')}</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6' : 'space-y-3 lg:space-y-4'}>
                      {filteredCVs.map((record, index) => (
                        <motion.div
                          key={record.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`${viewMode === 'grid' ? 'bg-gray-50 rounded-xl p-4 lg:p-6 hover:shadow-lg' : 'flex items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-lg hover:bg-gray-50'} transition-all cursor-pointer relative`}
                        >
                          {/* Selection Checkbox */}
                          <div className="absolute top-2 lg:top-3 left-2 lg:left-3">
                            <input
                              type="checkbox"
                              checked={selectedCVs.includes(record.id)}
                              onChange={() => toggleCVSelection(record.id)}
                              className="h-4 w-4 text-blue-700 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>

                          {viewMode === 'grid' ? (
                            <>
                              <div className="pt-6 lg:pt-6">
                                <div className="flex items-center justify-between mb-3 lg:mb-4">
                                  <div className="h-10 w-10 lg:h-12 lg:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-blue-700" />
                                  </div>
                                  <div className="relative">
                                    <button
                                      onClick={() => setShowActionMenu(showActionMenu === record.id ? null : record.id)}
                                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                      <MoreVertical className="h-4 w-4 text-gray-600" />
                                    </button>
                                    
                                    <AnimatePresence>
                                      {showActionMenu === record.id && (
                                        <motion.div
                                          initial={{ opacity: 0, scale: 0.95 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          exit={{ opacity: 0, scale: 0.95 }}
                                          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                                        >
                                          <div className="py-1">
                                            {[
                                              { action: 'edit', label: t('dashboard.actions.edit'), icon: Edit },
                                              { action: 'duplicate', label: t('dashboard.actions.duplicate'), icon: Copy },
                                              { action: 'change-template', label: t('dashboard.actions.changeTemplate'), icon: Palette },
                                              { action: 'download', label: t('dashboard.actions.download'), icon: Download },
                                              { action: 'share', label: t('dashboard.actions.share'), icon: Share2 },
                                              { action: 'delete', label: t('dashboard.actions.delete'), icon: Trash2, danger: true }
                                            ].map(({ action, label, icon: Icon, danger }) => (
                                              <button
                                                key={action}
                                                onClick={() => handleCVAction(action, record)}
                                                className={`w-full flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                                                  danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                                                }`}
                                              >
                                                <Icon className="h-4 w-4" />
                                                <span>{label}</span>
                                              </button>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                                
                                <h3 className="font-semibold text-gray-900 mb-2 truncate text-sm lg:text-base">{record.fileName}</h3>
                                <div className="space-y-2">
                                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTemplateColor(record.templateType)}`}>
                                    {getTemplateDisplayName(record.templateType)}
                                  </span>
                                  <p className="text-xs lg:text-sm text-gray-500">
                                    {formatDate(record.downloadedAt)}
                                  </p>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center space-x-3 lg:space-x-4 ml-6 lg:ml-8 min-w-0 flex-1">
                                <div className="h-8 w-8 lg:h-10 lg:w-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <FileText className="h-4 w-4 lg:h-5 lg:w-5 text-blue-700" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-semibold text-gray-900 truncate text-sm lg:text-base">{record.fileName}</h3>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTemplateColor(record.templateType)}`}>
                                      {getTemplateDisplayName(record.templateType)}
                                    </span>
                                    <span className="text-xs lg:text-sm text-gray-500 hidden sm:inline">
                                      {formatDate(record.downloadedAt)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
                                {[
                                  { action: 'edit', icon: Edit, tooltip: t('dashboard.actions.edit') },
                                  { action: 'duplicate', icon: Copy, tooltip: t('dashboard.actions.duplicate'), hideOnMobile: true },
                                  { action: 'change-template', icon: Palette, tooltip: t('dashboard.actions.changeTemplate'), hideOnMobile: true },
                                  { action: 'download', icon: Download, tooltip: t('dashboard.actions.download') },
                                  { action: 'share', icon: Share2, tooltip: t('dashboard.actions.share'), hideOnMobile: true },
                                  { action: 'delete', icon: Trash2, tooltip: t('dashboard.actions.delete'), danger: true }
                                ].map(({ action, icon: Icon, tooltip, danger, hideOnMobile }) => (
                                  <button
                                    key={action}
                                    onClick={() => handleCVAction(action, record)}
                                    disabled={isDownloading === record.id}
                                    className={`p-2 rounded-lg transition-colors ${hideOnMobile ? 'hidden lg:block' : ''} ${
                                      danger 
                                        ? 'text-red-600 hover:bg-red-50' 
                                        : 'text-gray-600 hover:bg-gray-100'
                                    } disabled:opacity-50`}
                                    title={tooltip}
                                  >
                                    {isDownloading === record.id && action === 'download' ? (
                                      <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                      <Icon className="h-4 w-4" />
                                    )}
                                  </button>
                                ))}
                                
                                {/* Mobile More Actions Menu */}
                                <div className="lg:hidden relative">
                                  <button
                                    onClick={() => setShowActionMenu(showActionMenu === record.id ? null : record.id)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </button>
                                  
                                  <AnimatePresence>
                                    {showActionMenu === record.id && (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                                      >
                                        <div className="py-1">
                                          {[
                                            { action: 'duplicate', label: t('dashboard.actions.duplicate'), icon: Copy },
                                            { action: 'change-template', label: t('dashboard.actions.changeTemplate'), icon: Palette },
                                            { action: 'share', label: t('dashboard.actions.share'), icon: Share2 }
                                          ].map(({ action, label, icon: Icon }) => (
                                            <button
                                              key={action}
                                              onClick={() => handleCVAction(action, record)}
                                              className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                              <Icon className="h-4 w-4" />
                                              <span>{label}</span>
                                            </button>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}

          {activeTab === 'analytics' && renderAnalyticsPanel()}
          
          {activeTab === 'templates' && (
            <div className="space-y-6">
              {/* Header Section */}
              <div className="bg-blue-700 rounded-xl p-6 text-white">
                <h3 className="text-xl font-medium mb-2">{t('dashboard.templates.gallery.title')}</h3>
                <p className="text-blue-100">{t('dashboard.templates.gallery.subtitle')}</p>
              </div>

              {/* Templates Grid */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    {t('dashboard.templates.allTemplates', { count: availableTemplates.length })}
                  </h4>
                  <p className="text-gray-600">{t('dashboard.templates.description')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableTemplates.map((template, index) => (
                    <motion.div
                      key={template.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group relative border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white"
                    >
                      {/* Template Preview Header */}
                      <div className={`h-24 bg-gradient-to-r ${template.color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute top-4 right-4 text-3xl">
                          {template.preview}
                        </div>
                        <div className="absolute bottom-3 left-4">
                          <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20">
                            {template.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2 text-lg group-hover:text-blue-700 transition-colors">
                            {template.name}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {template.description}
                          </p>
                        </div>
                        
                        {/* Stats */}
                        <div className="mb-4 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span>{t('dashboard.templates.usageCount')}:</span>
                            <span className="font-semibold text-gray-700">
                              {cvHistory.filter(cv => cv.templateType === template.type).length}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <button
                            onClick={() => {
                              localStorage.setItem('selectedTemplate', template.type);
                              onCreateNew();
                            }}
                            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r ${template.color} text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg font-medium`}
                          >
                            <Plus className="h-4 w-4" />
                            <span>{t('dashboard.templates.createWith', { name: template.name })}</span>
                          </button>
                          
                          {cvHistory.filter(cv => cv.templateType === template.type).length > 0 && (
                            <button
                              onClick={() => {
                                const cvWithTemplate = cvHistory.find(cv => cv.templateType === template.type);
                                if (cvWithTemplate && onEditCV) {
                                  onEditCV(cvWithTemplate.cvData);
                                }
                              }}
                              className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                              <Edit className="h-4 w-4" />
                              <span>{t('dashboard.templates.editExisting')}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Popular Badge */}
                      {template.type === 'modern' && (
                        <div className="absolute top-2 left-2">
                          <span className="inline-flex items-center px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-medium shadow-sm">
                            <Star className="h-3 w-3 mr-1" />
                            {t('dashboard.templates.badges.popular')}
                          </span>
                        </div>
                      )}

                      {/* New Badge */}
                      {(template.type === 'tech' || template.type === 'executive') && (
                        <div className="absolute top-2 left-2">
                          <span className="inline-flex items-center px-2 py-1 bg-green-400 text-green-900 rounded-full text-xs font-medium shadow-sm">
                            <Zap className="h-3 w-3 mr-1" />
                            {t('dashboard.templates.badges.new')}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Template Tips Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-blue-50 rounded-xl">
                    <h5 className="font-medium text-blue-700 mb-3 flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      {t('dashboard.templates.tips.title')}
                    </h5>
                    <ul className="text-blue-700 text-sm space-y-2">
                      <li>• {t('dashboard.templates.tips.modern')}</li>
                      <li>• {t('dashboard.templates.tips.executive')}</li>
                      <li>• {t('dashboard.templates.tips.ats')}</li>
                      <li>• {t('dashboard.templates.tips.creative')}</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-green-50 rounded-xl">
                    <h5 className="font-medium text-green-900 mb-3 flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      {t('dashboard.templates.industry.title')}
                    </h5>
                    <ul className="text-green-700 text-sm space-y-2">
                      <li>• {t('dashboard.templates.industry.tech')}</li>
                      <li>• {t('dashboard.templates.industry.finance')}</li>
                      <li>• {t('dashboard.templates.industry.healthcare')}</li>
                      <li>• {t('dashboard.templates.industry.education')}</li>
                    </ul>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                    <div>
                      <h5 className="font-medium text-gray-900">{t('dashboard.templates.help.title')}</h5>
                      <p className="text-sm text-gray-600">{t('dashboard.templates.help.subtitle')}</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('help')}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span>{t('dashboard.templates.help.button')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              {/* Featured Resources Header */}
              <div className="bg-blue-700 rounded-xl p-6 text-white">
                <h3 className="text-xl font-medium mb-2">{t('dashboard.resources.header.title')}</h3>
                <p className="text-blue-100">{t('dashboard.resources.header.subtitle')}</p>
              </div>

              {/* Blog Posts Grid */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">{t('dashboard.resources.latestArticles')}</h4>
                  <a 
                    href="/blogs" 
                    className="text-blue-700 hover:text-blue-700 text-sm font-medium flex items-center"
                  >
                    {t('dashboard.resources.viewAll')}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts.slice(0, 6).map((post, index) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group cursor-pointer"
                      onClick={() => window.location.href = `/blog/${post.slug}`}
                    >
                      <div className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-all duration-200 h-full">
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-blue-700" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span 
                              className="inline-block px-2 py-1 rounded-full text-xs font-medium"
                              style={{ 
                                backgroundColor: `${post.category.color}15`, 
                                color: post.category.color 
                              }}
                            >
                              {post.category.icon && (
                                <span className="mr-1">{post.category.icon}</span>
                              )}
                              {post.category.name}
                            </span>
                          </div>
                        </div>
                        
                        <h5 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                          {post.title}
                        </h5>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{post.readTime}</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && renderSettingsPanel()}
          
          {activeTab === 'help' && (
            <div className="space-y-6">
              {/* Contact Support Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Headphones className="h-6 w-6 mr-2 text-blue-700" />
                  {t('dashboard.support.title')}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Mail className="h-5 w-5 text-blue-700" />
                        <h4 className="font-medium text-blue-700">{t('dashboard.support.email.title')}</h4>
                      </div>
                      <p className="text-blue-700 text-sm mb-2">{t('dashboard.support.email.subtitle')}</p>
                      <a href="mailto:mbaforfoghang@gmail.com" className="text-blue-700 hover:text-blue-700 font-medium">
                        mbaforfoghang@gmail.com
                      </a>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                        <h4 className="font-medium text-green-900">{t('dashboard.support.chat.title')}</h4>
                      </div>
                      <p className="text-green-700 text-sm mb-2">{t('dashboard.support.chat.subtitle')}</p>
                      <button className="text-green-600 hover:text-green-800 font-medium">
                        {t('dashboard.support.chat.button')}
                      </button>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <HelpCircle className="h-5 w-5 text-blue-700" />
                        <h4 className="font-medium text-blue-700">{t('dashboard.support.kb.title')}</h4>
                      </div>
                      <p className="text-blue-700 text-sm mb-2">{t('dashboard.support.kb.subtitle')}</p>
                      <button className="text-blue-700 hover:text-blue-700 font-medium">
                        {t('dashboard.support.kb.button')}
                      </button>
                    </div>
                  </div>

                  {/* Quick Contact Form */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">{t('dashboard.support.form.title')}</h4>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.support.form.issueType')}</label>
                        <select 
                          value={contactForm.issueType}
                          onChange={(e) => setContactForm(prev => ({ ...prev, issueType: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="technical">{t('dashboard.support.form.issues.technical')}</option>
                          <option value="support">{t('dashboard.support.form.issues.account')}</option>
                          <option value="general">{t('dashboard.support.form.issues.download')}</option>
                          <option value="feature">{t('dashboard.support.form.issues.template')}</option>
                          <option value="general">{t('dashboard.support.form.issues.general')}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.support.form.message')}</label>
                        <textarea
                          rows={3}
                          value={contactForm.message}
                          onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder={t('dashboard.support.form.placeholder')}
                          required
                        />
                      </div>
                      {contactSubmitStatus === 'success' && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-700 flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            {t('dashboard.support.form.success')}
                          </p>
                        </div>
                      )}
                      {contactSubmitStatus === 'error' && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-700">
                            {t('dashboard.support.form.error')}
                          </p>
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmittingContact || !contactForm.message.trim()}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                      >
                        {isSubmittingContact ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{t('dashboard.support.form.sending')}</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>{t('dashboard.support.form.send')}</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Template Selection Modal */}
      <AnimatePresence>
        {showTemplateModal && selectedCVForTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTemplateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] lg:max-h-[90vh] overflow-hidden mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200">
                <h2 className="text-lg lg:text-xl font-medium text-gray-900 flex items-center">
                  <Palette className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                  {t('dashboard.modals.chooseTemplate.title', { fileName: selectedCVForTemplate?.fileName || 'CV' })}
                </h2>
                <p className="text-sm lg:text-base text-gray-600 mt-1">{t('dashboard.modals.chooseTemplate.subtitle')}</p>
              </div>

              <div className="p-4 lg:p-6 max-h-[70vh] lg:max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  {availableTemplates.map((template) => (
                    <motion.div
                      key={template.type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative overflow-hidden rounded-xl border-2 cursor-pointer transition-all ${
                        selectedCVForTemplate?.templateType === template.type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg'
                      }`}
                      onClick={() => handleTemplateChange(template.type)}
                    >
                      {/* Template Preview Header */}
                      <div className={`h-16 lg:h-20 bg-gradient-to-r ${template.color} relative`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute top-2 right-2 text-lg lg:text-2xl">
                          {template.preview}
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20">
                            {template.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 lg:p-6">
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">{template.name}</h3>
                        <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4 line-clamp-2">{template.description}</p>
                        
                        {selectedCVForTemplate?.templateType === template.type ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-blue-100 text-blue-700">
                            <CheckCircle2 className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                            {t('dashboard.modals.chooseTemplate.currentTemplate')}
                          </span>
                        ) : (
                          <button
                            disabled={isDownloading === selectedCVForTemplate?.id}
                            className={`inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r ${template.color} text-white rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 text-xs lg:text-sm font-medium`}
                          >
                            {isDownloading === selectedCVForTemplate?.id ? (
                              <>
                                <Clock className="h-3 w-3 lg:h-4 lg:w-4 mr-2 animate-spin" />
                                {t('dashboard.modals.chooseTemplate.applying')}
                              </>
                            ) : (
                              <>
                                <Palette className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
                                {t('dashboard.modals.chooseTemplate.apply')}
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="px-4 lg:px-6 py-3 lg:py-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm lg:text-base"
                >
                  {t('dashboard.modals.chooseTemplate.cancel')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
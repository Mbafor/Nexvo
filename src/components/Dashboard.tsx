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
import { useAuth } from '../context';
import { CVData, TemplateType } from '../types/cv';
import { getUserCVDownloads, deleteCVDownload, saveCVDownload, CVDownloadRecord } from '../lib/firestore';
import { generatePDFBlob } from '../lib/pdfGenerator';
import { saveAs } from 'file-saver';
import { blogPosts } from '../data/blogPosts';
import EmailVerificationBanner from './EmailVerificationBanner';

interface DashboardProps {
  onCreateNew: () => void;
  onEditCV?: (cvData: CVData) => void;
}

type ViewMode = 'grid' | 'list';
type SidebarTab = 'dashboard' | 'analytics' | 'templates' | 'resources' | 'settings' | 'help';

export default function Dashboard({ onCreateNew, onEditCV }: DashboardProps) {
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

  useEffect(() => {
    // Only load CV history when user is authenticated and loading is complete
    // This prevents the "No user found" message during sign-up process
    if (!authLoading) {
      loadCVHistory();
    }
  }, [user, authLoading]);

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to home page after successful sign out
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Close mobile menu when tab changes
  const handleTabChange = (tab: SidebarTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    setShowBulkActions(selectedCVs.length > 0);
  }, [selectedCVs]);

  const loadCVHistory = async () => {
    // If still loading authentication, don't proceed
    if (authLoading) {
      console.log('🔄 Authentication still loading, waiting...');
      return;
    }

    if (!user) {
      console.log('👤 No authenticated user, checking for local CV data...');
      
      // Check for unsaved CV in localStorage
      const localCV = localStorage.getItem('cvData');
      // const localProgress = localStorage.getItem('cvProgress'); // Unused for now
      
      if (localCV) {
        try {
          const cvData = JSON.parse(localCV);
          // const progress = localProgress ? parseInt(localProgress) : 0; // Unused for now
          
          if (cvData.personalInfo.fullName) {
            console.log('📋 Found local CV draft:', cvData.personalInfo.fullName);
            
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
            
            console.log('✅ Local CV loaded for preview');
          } else {
            console.log('📝 No complete CV data found locally');
          }
        } catch (error) {
          console.error('❌ Failed to parse local CV:', error);
        }
      } else {
        console.log('📝 No local CV data found');
      }
      
      setLoading(false);
      return;
    }
    
    try {
      console.log('📊 Loading comprehensive CV data for user:', user.uid);
      const downloads = await getUserCVDownloads(user.uid);
      console.log('📄 CVs found:', downloads.length);
      console.log('📋 CV Details:', downloads.map(d => ({ 
        id: d.id, 
        fileName: d.fileName, 
        template: d.templateType,
        date: d.downloadedAt 
      })));
      
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
      
      console.log('✅ CV data loaded with advanced analytics');
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
            duplicatedData.personalInfo.fullName += ' (Copy)';
            onEditCV(duplicatedData);
          }
          break;
        case 'edit':
          if (onEditCV) onEditCV(record.cvData);
          break;
        case 'share':
          const shareUrl = `${window.location.origin}/cv/shared/${record.id}`;
          await navigator.clipboard.writeText(shareUrl);
          alert('✅ Shareable link copied to clipboard!');
          break;
        case 'change-template':
          setSelectedCVForTemplate(record);
          setShowTemplateModal(true);
          break;
        case 'delete':
          if (confirm('Are you sure you want to delete this CV?')) {
            await deleteCVDownload(record.id);
            setCVHistory(prev => prev.filter(cv => cv.id !== record.id));
          }
          break;
      }
    } catch (error) {
      console.error(`❌ Failed to ${action} CV:`, error);
      alert(`Failed to ${action} CV. Please try again.`);
    } finally {
      setIsDownloading(null);
    }
  };

  // Handle template change for CV
  const handleTemplateChange = async (newTemplate: TemplateType) => {
    if (!selectedCVForTemplate || !user) return;

    try {
      setIsDownloading(selectedCVForTemplate.id);
      
      // Save new CV with different template
      await saveCVDownload(
        user.uid,
        user.email || '',
        selectedCVForTemplate.cvData,
        newTemplate
      );

      // Refresh CV history to show new template
      loadCVHistory();
      
      // Close modal
      setShowTemplateModal(false);
      setSelectedCVForTemplate(null);
      
      // Success message
      alert(`✅ CV template changed to ${getTemplateDisplayName(newTemplate)}!`);
      
    } catch (error) {
      console.error('❌ Failed to change template:', error);
      alert('Failed to change template. Please try again.');
    } finally {
      setIsDownloading(null);
    }
  };

  // Available templates - All 6 stunning templates
  const availableTemplates: { type: TemplateType; name: string; description: string; preview: string; color: string; category: string }[] = [
    {
      type: 'modern',
      name: 'Modern Professional',
      description: 'Clean, contemporary design with perfect visual hierarchy and progress indicators',
      preview: '✨',
      color: 'from-blue-500 to-purple-600',
      category: 'Professional'
    },
    {
      type: 'creative',
      name: 'Creative Studio',
      description: 'Bold, artistic design with asymmetric layout perfect for creative professionals',
      preview: '🎨',
      color: 'from-purple-500 to-pink-600',
      category: 'Creative'
    },
    {
      type: 'executive',
      name: 'Executive Elite',
      description: 'Sophisticated luxury design with gold accents for leadership positions',
      preview: '👑',
      color: 'from-gray-800 to-yellow-600',
      category: 'Leadership'
    },
    {
      type: 'minimalist',
      name: 'Pure Minimalist',
      description: 'Ultra-clean design with generous white space and elegant typography',
      preview: '�',
      color: 'from-gray-400 to-gray-600',
      category: 'Minimal'
    },
    {
      type: 'tech',
      name: 'Tech Developer',
      description: 'Terminal-inspired design with neon accents perfect for tech professionals',
      preview: '⚡',
      color: 'from-green-500 to-teal-600',
      category: 'Technology'
    },
    {
      type: 'ats',
      name: 'ATS Optimized',
      description: 'Simple, structured format optimized for Applicant Tracking Systems',
      preview: '�',
      color: 'from-orange-500 to-red-600',
      category: 'ATS-Ready'
    }
  ];

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
          if (confirm(`Delete ${selectedCVs.length} selected CVs?`)) {
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
    const names: Record<TemplateType, string> = {
      modern: 'Modern',
      creative: 'Creative',
      ats: 'ATS-Friendly',
      executive: 'Executive',
      minimalist: 'Minimalist', 
      tech: 'Tech'
    };
    return names[template] || template;
  };

  const getTemplateColor = (template: TemplateType): string => {
    const colors: Record<TemplateType, string> = {
      modern: 'bg-blue-100 text-blue-800',
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
          Profile Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
            <input
              type="text"
              defaultValue={user?.displayName || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Dark Mode</span>
            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Email Notifications</span>
            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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
              <p className="text-sm text-gray-600 mb-1">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{stats.thisMonthDownloads}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Target className="h-6 w-6 text-blue-700" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">Most Popular Template</span>
            </div>
            <span className="text-blue-700 font-semibold">Modern Template</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-900">Peak Download Time</span>
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
          <p className="text-gray-600 font-medium">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your professional dashboard...</p>
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
              <span className="text-white font-bold text-lg">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900 truncate">
                {user?.displayName || 'Professional User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard', badge: cvHistory.length },
            { id: 'analytics', icon: TrendingUp, label: 'Analytics', badge: null },
            { id: 'templates', icon: Palette, label: 'Templates', badge: null },
            { id: 'resources', icon: BookOpen, label: 'Resources', badge: blogPosts.length },
            { id: 'settings', icon: Settings, label: 'Settings', badge: null },
            { id: 'help', icon: HelpCircle, label: 'Help & Support', badge: null }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as SidebarTab)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-1 rounded-full text-xs font-bold flex-shrink-0 ${
                  activeTab === item.id ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-600'
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
            <span className="font-semibold">Create New CV</span>
          </button>
          
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span>Sign Out</span>
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
              <span className="text-white font-bold text-lg">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900 truncate text-sm">
                {user?.displayName || 'Professional User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard', badge: cvHistory.length },
            { id: 'analytics', icon: TrendingUp, label: 'Analytics', badge: null },
            { id: 'templates', icon: Palette, label: 'Templates', badge: null },
            { id: 'resources', icon: BookOpen, label: 'Resources', badge: blogPosts.length },
            { id: 'settings', icon: Settings, label: 'Settings', badge: null },
            { id: 'help', icon: HelpCircle, label: 'Help & Support', badge: null }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id as SidebarTab)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-1 rounded-full text-xs font-bold flex-shrink-0 ${
                  activeTab === item.id ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-600'
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
            <span className="font-semibold">Create New CV</span>
          </button>
          
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors text-sm"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">
            {activeTab === 'dashboard' ? 'Dashboard' :
             activeTab === 'analytics' ? 'Analytics' :
             activeTab === 'templates' ? 'Templates' :
             activeTab === 'resources' ? 'Resources' :
             activeTab === 'settings' ? 'Settings' : 'Help & Support'}
          </h1>
          <div className="w-9"></div> {/* Spacer for center alignment */}
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'dashboard' ? 'Dashboard' :
                 activeTab === 'analytics' ? 'Analytics' :
                 activeTab === 'templates' ? 'Templates' :
                 activeTab === 'resources' ? 'Resources' :
                 activeTab === 'settings' ? 'Settings' : 'Help & Support'}
              </h1>
              <p className="text-gray-600">
                {activeTab === 'dashboard' ? 'Manage your professional CVs' :
                 activeTab === 'analytics' ? 'Track your CV performance' :
                 activeTab === 'templates' ? 'Browse and select CV templates' :
                 activeTab === 'resources' ? 'Career tips, guides, and insights' :
                 activeTab === 'settings' ? 'Customize your preferences' : 'Get help and support'}
              </p>
            </div>

            {activeTab === 'dashboard' && (
              <div className="flex items-center justify-between space-x-4 w-full">
                {/* Search on the left */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search CVs..."
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
          </div>
        </div>

        {/* Content Area - Mobile optimized */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
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
                      placeholder="Search CVs..."
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
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Total CVs</p>
                      <p className="text-xl lg:text-3xl font-bold text-gray-900">{stats.totalDownloads}</p>
                    </div>
                    <div className="bg-blue-100 p-2 lg:p-3 rounded-full">
                      <FileText className="h-4 w-4 lg:h-6 lg:w-6 text-blue-600" />
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
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Templates Used</p>
                      <p className="text-xl lg:text-3xl font-bold text-gray-900">{stats.templatesUsed}</p>
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
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Last Activity</p>
                      <p className="text-sm lg:text-lg font-semibold text-gray-900">
                        {stats.lastDownload ? formatDate(stats.lastDownload as Date).split(',')[0] : 'Never'}
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
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Success Rate</p>
                      <p className="text-xl lg:text-3xl font-bold text-gray-900">98%</p>
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
                      <span className="text-blue-900 font-medium">
                        {selectedCVs.length} CV(s) selected
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleBulkAction('download')}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Download All
                        </button>
                        <button
                          onClick={() => handleBulkAction('delete')}
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                          Delete All
                        </button>
                        <button
                          onClick={() => setSelectedCVs([])}
                          className="px-3 py-1 text-gray-600 hover:text-gray-800"
                        >
                          Clear
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
                  <h2 className="text-lg lg:text-xl font-bold text-gray-900 flex items-center">
                    <Folder className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                    Your CVs ({filteredCVs.length})
                  </h2>
                </div>

                <div className="p-4 lg:p-6">
                  {filteredCVs.length === 0 ? (
                    <div className="text-center py-8 lg:py-12">
                      <FileText className="h-8 w-8 lg:h-12 lg:w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                        {searchQuery ? 'No CVs found' : 'No CVs yet'}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6 px-4">
                        {searchQuery ? 'Try adjusting your search terms' : 'Create your first professional CV to get started!'}
                      </p>
                      {!searchQuery && (
                        <button
                          onClick={onCreateNew}
                          className="flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto text-sm lg:text-base"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Create Your First CV</span>
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
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>

                          {viewMode === 'grid' ? (
                            <>
                              <div className="pt-6 lg:pt-6">
                                <div className="flex items-center justify-between mb-3 lg:mb-4">
                                  <div className="h-10 w-10 lg:h-12 lg:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
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
                                              { action: 'edit', label: 'Edit CV', icon: Edit },
                                              { action: 'duplicate', label: 'Duplicate', icon: Copy },
                                              { action: 'change-template', label: 'Change Template', icon: Palette },
                                              { action: 'download', label: 'Download', icon: Download },
                                              { action: 'share', label: 'Share', icon: Share2 },
                                              { action: 'delete', label: 'Delete', icon: Trash2, danger: true }
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
                                  <FileText className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
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
                                  { action: 'edit', icon: Edit, tooltip: 'Edit' },
                                  { action: 'duplicate', icon: Copy, tooltip: 'Duplicate', hideOnMobile: true },
                                  { action: 'change-template', icon: Palette, tooltip: 'Change Template', hideOnMobile: true },
                                  { action: 'download', icon: Download, tooltip: 'Download' },
                                  { action: 'share', icon: Share2, tooltip: 'Share', hideOnMobile: true },
                                  { action: 'delete', icon: Trash2, tooltip: 'Delete', danger: true }
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
                                            { action: 'duplicate', label: 'Duplicate', icon: Copy },
                                            { action: 'change-template', label: 'Change Template', icon: Palette },
                                            { action: 'share', label: 'Share', icon: Share2 }
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
              <div className="bg-blue-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Professional CV Templates Gallery</h3>
                <p className="text-blue-100">Choose from our collection of stunning, professionally designed templates</p>
              </div>

              {/* Templates Grid */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    All Templates ({availableTemplates.length})
                  </h4>
                  <p className="text-gray-600">Browse our professional CV templates and create new CVs with different styles</p>
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
                          <h4 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">
                            {template.name}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {template.description}
                          </p>
                        </div>
                        
                        {/* Stats */}
                        <div className="mb-4 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span>CVs Created:</span>
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
                            <span>Create with {template.name}</span>
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
                              <span>Edit Existing</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Popular Badge */}
                      {template.type === 'modern' && (
                        <div className="absolute top-2 left-2">
                          <span className="inline-flex items-center px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold shadow-sm">
                            <Star className="h-3 w-3 mr-1" />
                            Popular
                          </span>
                        </div>
                      )}

                      {/* New Badge */}
                      {(template.type === 'tech' || template.type === 'executive') && (
                        <div className="absolute top-2 left-2">
                          <span className="inline-flex items-center px-2 py-1 bg-green-400 text-green-900 rounded-full text-xs font-bold shadow-sm">
                            <Zap className="h-3 w-3 mr-1" />
                            New
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Template Tips Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-blue-50 rounded-xl">
                    <h5 className="font-bold text-blue-700 mb-3 flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Template Selection Tips
                    </h5>
                    <ul className="text-blue-700 text-sm space-y-2">
                      <li>• <strong>Modern:</strong> Perfect for tech, creative, and contemporary industries</li>
                      <li>• <strong>Executive:</strong> Ideal for senior leadership and management roles</li>
                      <li>• <strong>ATS-Optimized:</strong> Best for applications through job portals</li>
                      <li>• <strong>Creative:</strong> Great for design, marketing, and artistic professions</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-green-50 rounded-xl">
                    <h5 className="font-bold text-green-900 mb-3 flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Industry Recommendations
                    </h5>
                    <ul className="text-green-700 text-sm space-y-2">
                      <li>• <strong>Tech:</strong> Use Tech Developer template for programming roles</li>
                      <li>• <strong>Finance:</strong> Executive or Minimalist templates work best</li>
                      <li>• <strong>Healthcare:</strong> Modern or ATS templates are recommended</li>
                      <li>• <strong>Education:</strong> Minimalist or Modern templates</li>
                    </ul>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                    <div>
                      <h5 className="font-medium text-gray-900">Need help choosing?</h5>
                      <p className="text-sm text-gray-600">Our template wizard can help you find the perfect match</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('help')}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span>Get Help</span>
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
                <h3 className="text-xl font-bold mb-2">Career Resources & Insights</h3>
                <p className="text-blue-100">Expert tips, guides, and industry insights to boost your career success</p>
              </div>

              {/* Blog Posts Grid */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">Latest Articles</h4>
                  <a 
                    href="/blogs" 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                  >
                    View All Articles
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
                              <BookOpen className="h-5 w-5 text-blue-600" />
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
                        
                        <h5 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
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
                  <Headphones className="h-6 w-6 mr-2 text-blue-600" />
                  Contact Support
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <h4 className="font-medium text-blue-900">Email Support</h4>
                      </div>
                      <p className="text-blue-700 text-sm mb-2">Get help via email within 2 hours</p>
                      <a href="mailto:mbaforfoghang@gmail.com" className="text-blue-600 hover:text-blue-800 font-medium">
                        mbaforfoghang@gmail.com
                      </a>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                        <h4 className="font-medium text-green-900">Live Chat</h4>
                      </div>
                      <p className="text-green-700 text-sm mb-2">Chat with our support team</p>
                      <button className="text-green-600 hover:text-green-800 font-medium">
                        Start Chat Session
                      </button>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <HelpCircle className="h-5 w-5 text-blue-700" />
                        <h4 className="font-medium text-blue-700">Knowledge Base</h4>
                      </div>
                      <p className="text-blue-700 text-sm mb-2">Browse our help articles</p>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Browse Articles
                      </button>
                    </div>
                  </div>

                  {/* Quick Contact Form */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Quick Support Request</h4>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                          <option>Technical Issue</option>
                          <option>Account Problem</option>
                          <option>CV Download Issue</option>
                          <option>Template Question</option>
                          <option>General Question</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Describe your issue..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <Send className="h-4 w-4" />
                        <span>Send Support Request</span>
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
                <h2 className="text-lg lg:text-xl font-bold text-gray-900 flex items-center">
                  <Palette className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                  Choose Template for {selectedCVForTemplate?.fileName || 'CV'}
                </h2>
                <p className="text-sm lg:text-base text-gray-600 mt-1">Select a new template to apply to your CV</p>
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
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-blue-100 text-blue-800">
                            <CheckCircle2 className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                            Current Template
                          </span>
                        ) : (
                          <button
                            disabled={isDownloading === selectedCVForTemplate?.id}
                            className={`inline-flex items-center px-3 lg:px-4 py-2 bg-gradient-to-r ${template.color} text-white rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 text-xs lg:text-sm font-medium`}
                          >
                            {isDownloading === selectedCVForTemplate?.id ? (
                              <>
                                <Clock className="h-3 w-3 lg:h-4 lg:w-4 mr-2 animate-spin" />
                                Applying...
                              </>
                            ) : (
                              <>
                                <Palette className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
                                Apply
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
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
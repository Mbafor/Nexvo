import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import CVBuilder from './components/CVBuilder';
import PreviewPage from './components/PreviewPage';
import Dashboard from './components/Dashboard';
import SharedCV from './components/SharedCV';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import ContactPage from './pages/ContactPage';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AboutPage from './pages/AboutPage';
import AuthModal from './components/AuthModal';
import VerificationSuccess from './components/VerificationSuccess';
import { CVData, TemplateType } from './types/cv';
import { useAuth } from './context/AuthContext';
import { auth } from './lib/firebase';
import { saveCVDownload } from './lib/firestore';
import { generatePDFBlob } from './lib/pdfGenerator';
import { downloadIntentService } from './utils/downloadIntent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const CV_STORAGE_KEY = 'cv_builder_data';

// Default CV data structure
const getDefaultCVData = (): CVData => ({
  personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', website: '', summary: '' },
  education: [], 
  experience: [], 
  volunteerWork: [], 
  skills: [], 
  projects: [], 
  achievements: [], 
  references: [],
  languages: [],
  hobbies: [],
  certifications: []
});

// Load CV data from localStorage
const loadCVDataFromStorage = (): CVData => {
  try {
    const stored = localStorage.getItem(CV_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('✅ Loaded CV data from localStorage:', parsed);
      return parsed;
    }
  } catch (error) {
    console.error('❌ Failed to load CV data from localStorage:', error);
  }
  return getDefaultCVData();
};

// Save CV data to localStorage
const saveCVDataToStorage = (cvData: CVData): void => {
  try {
    localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvData));
    console.log('💾 Saved CV data to localStorage');
  } catch (error) {
    console.error('❌ Failed to save CV data to localStorage:', error);
  }
};

function App() {
  const { user } = useAuth();
  const [cvData, setCvData] = useState<CVData>(loadCVDataFromStorage);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Save CV data to localStorage whenever it changes
  useEffect(() => {
    saveCVDataToStorage(cvData);
  }, [cvData]);

  const handleGetStarted = () => {
    window.location.href = '/builder';
  };

  const handleDownloadClick = (templateType: TemplateType) => {
    console.log('🚀 Download initiated with CV data:', {
      fullName: cvData.personalInfo.fullName,
      hasData: Boolean(cvData.personalInfo.fullName?.trim()),
      templateType,
      userSignedIn: Boolean(user)
    });

    // Enhanced validation with better debugging
    console.log('🔍 Validating CV data before download...');
    console.log('📄 CV Data:', {
      fullName: cvData.personalInfo.fullName,
      email: cvData.personalInfo.email,
      hasExperience: cvData.experience?.length > 0,
      hasEducation: cvData.education?.length > 0,
      hasSkills: cvData.skills?.length > 0
    });
    
    if (!cvData.personalInfo.fullName || cvData.personalInfo.fullName.trim().length === 0) {
      alert('❌ Please provide your full name in Personal Info before downloading.');
      console.error('❌ Validation failed: Full name missing or empty');
      return;
    }

    if (!user) {
      console.log('🔓 User not authenticated, saving download intent and showing auth modal...');
      // Save download intent and show auth modal
      downloadIntentService.saveIntent(cvData, templateType, '/dashboard');
      setShowAuthModal(true);
    } else {
      console.log('✅ User authenticated, proceeding with immediate download...');
      executeDownload(cvData, templateType).then(() => {
        console.log('✅ Download completed, redirecting to dashboard...');
        window.location.href = '/dashboard';
      }).catch((error) => {
        console.error('❌ Download failed:', error);
        alert('Failed to download CV. Please try again.');
      });
    }
  };

  const handleAuthSuccess = async () => {
    console.log('🎉 Authentication successful, processing...');
    setShowAuthModal(false);
    
    // Wait a moment for user state to properly update
    setTimeout(async () => {
      // Get current user from Firebase auth directly (more reliable than context)
      const currentUser = auth.currentUser;
      console.log('🔍 Current user after auth:', {
        uid: currentUser?.uid,
        email: currentUser?.email,
        isAuthenticated: Boolean(currentUser)
      });
      
      if (!currentUser) {
        console.error('❌ No user found after authentication, redirecting anyway...');
        window.location.href = '/dashboard';
        return;
      }
      
      // Check for pending download intent and execute it
      console.log('🔍 Checking for pending download intent...');
      const result = await downloadIntentService.executePendingIntent(
        async (cvData, templateType) => {
          console.log('📥 Executing pending download for authenticated user...');
          await executeDownload(cvData, templateType);
        },
        currentUser.uid,
        currentUser.email || undefined
      );
      
      if (result.executed) {
        console.log('✅ Pending download executed successfully!');
        if (result.savedToDashboard) {
          console.log('📋 CV automatically saved to dashboard');
        }
        console.log('🎯 Redirecting to dashboard...');
      } else {
        console.log('ℹ️ No pending download found, proceeding to dashboard...');
      }
      
      // Always redirect to dashboard after authentication
      window.location.href = '/dashboard';
    }, 1500); // Increased wait time for more reliable auth state update
  };

  const executeDownload = async (cvData: CVData, templateType: TemplateType) => {
    if (!user) throw new Error('User not authenticated');
    
    // Additional validation before download
    if (!cvData.personalInfo.fullName || cvData.personalInfo.fullName.trim().length === 0) {
      throw new Error('Full name is required for download');
    }
    
    try {
      console.log('📊 Executing download with validated data:', {
        fullName: cvData.personalInfo.fullName.trim(),
        templateType,
        userId: user.uid
      });

      const pdfBlob = await generatePDFBlob(cvData, templateType);
      await saveCVDownload(user.uid, user.email || cvData.personalInfo.email, cvData, templateType);
      
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${cvData.personalInfo.fullName.trim().replace(/\s+/g, '_')}_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('✅ CV downloaded and saved to history');
    } catch (error) {
      console.error('❌ Error downloading CV:', error);
      throw error;
    }
  };

  const handleCreateNew = () => {
    // Clear current CV data and go to builder
    const newCvData = getDefaultCVData();
    setCvData(newCvData);
    saveCVDataToStorage(newCvData);
    window.location.href = '/builder';
  };

  const handleSignIn = () => {
    setShowAuthModal(true);
  };

  const handleEditCV = (editCvData: CVData) => {
    console.log('📝 Editing CV with data:', editCvData);
    setCvData(editCvData);
    saveCVDataToStorage(editCvData);
    window.location.href = '/builder';
  };

  const handleGoToDashboard = async () => {
    console.log('🚀 Navigating to dashboard...');
    
    // If user is authenticated and CV has meaningful content, auto-save to Firestore
    if (user && cvData.personalInfo.fullName && cvData.personalInfo.email) {
      try {
        console.log('💾 Auto-saving CV to dashboard...');
        await saveCVDownload(
          user.uid,
          user.email || cvData.personalInfo.email,
          cvData,
          'modern' // Default template, user can change later in dashboard
        );
        console.log('✅ CV automatically saved to dashboard!');
      } catch (error) {
        console.warn('⚠️ Could not auto-save to dashboard:', error);
        // Continue to dashboard anyway
      }
    } else {
      console.log('ℹ️ User not authenticated or CV incomplete - navigating without saving to cloud');
    }
    
    // Navigate to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} onSignIn={handleSignIn} />} />
        <Route path="/builder" element={<CVBuilder cvData={cvData} onUpdateCVData={setCvData} onPreview={() => window.location.href = '/preview'} onSignIn={handleSignIn} onDashboard={handleGoToDashboard} />} />
        <Route path="/preview" element={<PreviewPage cvData={cvData} onBack={() => window.location.href = '/builder'} onDownload={handleDownloadClick} onShowAuth={() => setShowAuthModal(true)} />} />
        <Route path="/dashboard" element={<Dashboard onCreateNew={handleCreateNew} onEditCV={handleEditCV} />} />
        <Route path="/verify-email" element={<VerificationSuccess />} />
        <Route path="/cv/shared/:id" element={<SharedCV />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<ContactPage onBack={() => window.history.back()} />} />
        <Route path="/terms" element={<TermsConditions onBack={() => window.history.back()} />} />
        <Route path="/privacy" element={<PrivacyPolicy onBack={() => window.history.back()} />} />
        <Route path="/help" element={<ContactPage onBack={() => window.history.back()} />} />
        <Route path="/about" element={<AboutPage onBack={() => window.history.back()} />} />
      </Routes>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onSuccess={handleAuthSuccess} />
    </Router>
  );
}

export default App;

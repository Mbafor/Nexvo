import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import CVBuilder from './components/CVBuilder';
import PreviewPage from './components/PreviewPage';
import AuthModal from './components/AuthModal';
import { CVData, TemplateType } from './types/cv';
import { useAuth } from './context/AuthContext';
import { saveCVDownload } from './lib/firestore';
import { generatePDFBlob } from './lib/pdfGenerator';

type AppView = 'landing' | 'builder' | 'preview';

function App() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: '',
    },
    education: [],
    experience: [],
    volunteerWork: [],
    skills: [],
    projects: [],
    achievements: [],
    references: [],
  });

  const handleGetStarted = () => {
    setCurrentView('builder');
  };

  const handlePreview = () => {
    setCurrentView('preview');
  };

  const handleBackToBuilder = () => {
    setCurrentView('builder');
  };

  const handleDownloadClick = (templateType: TemplateType) => {
    setSelectedTemplate(templateType);
    if (!user) {
      setShowAuthModal(true);
    } else {
      handleDownload();
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    handleDownload();
  };

  const handleDownload = async () => {
    if (!user) return;

    try {
      const pdfBlob = await generatePDFBlob(cvData, selectedTemplate);

      await saveCVDownload(
        user.uid,
        user.email || cvData.personalInfo.email,
        cvData,
        selectedTemplate
      );

      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      alert('Your CV has been downloaded successfully!');
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again.');
    }
  };

  return (
    <>
      {currentView === 'landing' && <LandingPage onGetStarted={handleGetStarted} />}

      {currentView === 'builder' && (
        <CVBuilder
          cvData={cvData}
          onUpdateCVData={setCvData}
          onPreview={handlePreview}
        />
      )}

      {currentView === 'preview' && (
        <PreviewPage
          cvData={cvData}
          onBack={handleBackToBuilder}
          onDownload={handleDownloadClick}
        />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}

export default App;
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Clock,
  FileText,
  Sparkles,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CVData } from "../types/cv";
import { useAuth } from "../context/AuthContext";

// Forms
import PersonalInfoForm from "./forms/PersonalInfoForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import VolunteerForm from "./forms/VolunteerForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import AchievementsForm from "./forms/AchievementsForm";
import LanguagesForm from "./forms/LanguagesForm";
import ReferencesForm from "./forms/ReferencesForm";
import HobbiesForm from "./forms/HobbiesForm";
import CertificationsForm from "./forms/CertificationsForm";

// Enhanced Components
import ProgressEnhancement from "./ProgressEnhancement";
import ContextualTips from "./ContextualTips";
import SubtleToast from "./SubtleToast";
import OnboardingTour from "./OnboardingTour";
import CollapsibleSections from "./CollapsibleSections";

// Validation
import { CVValidator, SectionValidation } from "../utils/cvValidator";

// Load dynamic tips
import tipsData from "../data/tips.json";

// Type for tips data
type TipsData = {
  [key: string]: string[];
};

interface CVBuilderProps {
  cvData: CVData;
  onUpdateCVData: (data: CVData) => void;
  onPreview: () => void;
  onSignIn?: () => void;
  onDashboard?: () => void;
}

export default function CVBuilder({ 
  cvData, 
  onUpdateCVData, 
  onPreview, 
  onSignIn, 
  onDashboard
}: CVBuilderProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const allSections = [
    { id: "personal", label: t('cv.personalInfo'), required: true, icon: FileText, description: "Basic contact information and summary" },
    { id: "experience", label: t('cv.experience'), required: false, icon: Clock, description: "Work experience and professional history" },
    { id: "education", label: t('cv.education'), required: false, icon: Sparkles, description: "Academic qualifications and certifications" },
    { id: "skills", label: t('cv.skills'), required: false, icon: Settings, description: "Technical and soft skills" },
    { id: "projects", label: t('cv.projects'), required: false, icon: FileText, description: "Personal and professional projects" },
    { id: "volunteer", label: t('cv.volunteerWork'), required: false, icon: Clock, description: "Community service and volunteer experience" },
    { id: "achievements", label: t('cv.achievements'), required: false, icon: Sparkles, description: "Awards and recognitions" },
    { id: "languages", label: t('cv.languages'), required: false, icon: Settings, description: "Language proficiency" },
    { id: "certifications", label: t('cv.certifications'), required: false, icon: FileText, description: "Professional certifications and licenses" },
    { id: "hobbies", label: t('cv.hobbies'), required: false, icon: Clock, description: "Personal interests and hobbies" },
    { id: "references", label: t('cv.references'), required: false, icon: Sparkles, description: "Professional references" },
  ];
  
  const [steps, setSteps] = useState(allSections);
  
  // Update sections when language changes
  useEffect(() => {
    setSteps(allSections);
  }, [t]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSectionManager, setShowSectionManager] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  
  // Enhanced validation and progress tracking
  const [validationResults, setValidationResults] = useState<SectionValidation>({});

  // New state for celebration and navigation flow
  const [lastKnownProgress, setLastKnownProgress] = useState(0);
  
  // Subtle toast notifications
  const [toastType, setToastType] = useState<'success' | 'info' | 'dashboard' | 'hidden'>('hidden');
  const [toastMessage, setToastMessage] = useState('');

  const currentSection = steps[currentStep];
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if user should see onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('onboarding_completed');
    if (!hasSeenOnboarding) {
      // Show onboarding after a short delay
      setTimeout(() => setShowOnboarding(true), 1000);
    }
  }, []);

  // Load saved CV data and sections once on mount
  useEffect(() => {
    const savedCV = localStorage.getItem("cvData");
    if (savedCV) {
      try {
        const parsed = JSON.parse(savedCV) as CVData;
        onUpdateCVData(parsed);
      } catch (err) {
        console.error("Failed to parse saved CV:", err);
      }
    }

    const savedSections = localStorage.getItem("cvSections");
    if (savedSections) {
      try {
        const sectionIds: string[] = JSON.parse(savedSections);
        const loadedSections = allSections.filter((s) => sectionIds.includes(s.id));
        setSteps(loadedSections);
      } catch (err) {
        console.error("Failed to parse saved sections:", err);
      }
    }
  }, []);

  // Simple auto-save to localStorage
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    setAutoSaveStatus('saving');
    
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem('cv_builder_data', JSON.stringify(cvData));
        
        setAutoSaveStatus('saved');
      } catch (err) {
        console.error("Error auto-saving CV:", err);
        setAutoSaveStatus('error');
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [cvData]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keyboard navigation if not in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          if (event.ctrlKey && currentStep > 0) {
            event.preventDefault();
            setCurrentStep(currentStep - 1);
          }
          break;
        case 'ArrowRight':
          if (event.ctrlKey && currentStep < steps.length - 1) {
            event.preventDefault();
            setCurrentStep(currentStep + 1);
          }
          break;
        case 'Enter':
          if (event.ctrlKey) {
            event.preventDefault();
            onPreview();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, steps.length, onPreview]);

  // Real-time validation effect
  useEffect(() => {
    const results = CVValidator.validateComplete(cvData);
    setValidationResults(results);
  }, [cvData]);

  // Helper function to check if section has errors
  const sectionHasErrors = (sectionId: string): boolean => {
    const validation = validationResults[sectionId];
    return validation ? validation.errors.length > 0 : false;
  };

  // Get enhanced sections with completion status
  const getEnhancedSections = () => {
    return steps.map(section => ({
      ...section,
      completed: !!getCompletionStatus(section.id), // Ensure boolean
      hasErrors: sectionHasErrors(section.id)
    }));
  };

  // Get current section validation for ContextualTips
  const getCurrentValidationResult = () => {
    return validationResults[currentSection.id];
  };

  // Navigation
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save current data before navigating to preview
      localStorage.setItem('cvData', JSON.stringify(cvData));
      onPreview();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goHome = () => (window.location.href = "/");

  // Section management
  const toggleSection = (id: string) => {
    let updatedSteps;
    if (steps.some((s) => s.id === id)) {
      // Remove section if it's not required and not the only one
      if (steps.length > 1 && !allSections.find(s => s.id === id)?.required) {
        updatedSteps = steps.filter((s) => s.id !== id);
        // Adjust current step if we're removing the current section
        if (steps[currentStep]?.id === id) {
          setCurrentStep(Math.max(0, currentStep - 1));
        }
      } else {
        return; // Don't remove required sections or if it's the only section
      }
    } else {
      // Add section
      const sectionToAdd = allSections.find((s) => s.id === id);
      if (sectionToAdd) {
        updatedSteps = [...steps, sectionToAdd];
      } else {
        return;
      }
    }

    setSteps(updatedSteps);
    localStorage.setItem("cvSections", JSON.stringify(updatedSteps.map((s) => s.id)));
  };
  // Progress tracking - Enhanced completion calculation
  const getCompletionStatus = (id: string) => {
    switch (id) {
      case "personal":
        return !!(cvData.personalInfo.fullName?.trim() && cvData.personalInfo.email?.trim());
      case "education":
        return cvData.education && cvData.education.length > 0;
      case "experience":
        return cvData.experience && cvData.experience.length > 0;
      case "volunteer":
        return cvData.volunteerWork && cvData.volunteerWork.length > 0;
      case "skills":
        return cvData.skills && cvData.skills.length > 0;
      case "projects":
        return cvData.projects && cvData.projects.length > 0;
      case "achievements":
        return cvData.achievements && cvData.achievements.length > 0;
      case "languages":
        return cvData.languages && cvData.languages.length > 0;
      case "hobbies":
        return cvData.hobbies && cvData.hobbies.length > 0;
      case "certifications":
        return cvData.certifications && cvData.certifications.length > 0;
      case "references":
        return cvData.references && cvData.references.length > 0;
      default:
        return false;
    }
  };

  const completedSections = steps.filter(step => getCompletionStatus(step.id)).length;
  const progressPercentage = Math.round((completedSections / steps.length) * 100);

  // Smart, value-driven progress notifications (not celebrations)
  useEffect(() => {
    // Only show notifications that provide real value
    
    // At 50% - Auto-save confirmation (builds confidence)
    if (progressPercentage >= 50 && lastKnownProgress < 50) {
      setToastType('success');
      setToastMessage('Progress auto-saved');
      setLastKnownProgress(50);
    }
    
   
  }, [progressPercentage, lastKnownProgress]);

  // Dashboard navigation function
  const handleDashboardNavigation = () => {
    // Save current progress to localStorage
    localStorage.setItem('cvData', JSON.stringify(cvData));
    localStorage.setItem('cvProgress', progressPercentage.toString());
    
    // Close any open modals
    
    // Navigate to dashboard
    if (onDashboard) {
      onDashboard();
    } else {
      // Fallback navigation
      window.location.href = '/dashboard';
    }
  };

  const isStepValid = () => {
    if (!currentSection) return false;
    if (currentSection.id === "personal") {
      return !!cvData.personalInfo.fullName && !!cvData.personalInfo.email;
    }
    return true;
  };

  // Step content renderer
  const renderStepContent = () => {
    switch (currentSection.id) {
      case "personal":
        return (
          <>
            <PersonalInfoForm
              data={cvData.personalInfo}
              onChange={(personalInfo) => onUpdateCVData({ ...cvData, personalInfo })}
            />
          </>
        );
      case "education":
        return (
          <EducationForm
            data={cvData.education}
            onChange={(education) => onUpdateCVData({ ...cvData, education })}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            data={cvData.experience}
            onChange={(experience) => onUpdateCVData({ ...cvData, experience })}
          />
        );
      case "volunteer":
        return (
          <VolunteerForm
            data={cvData.volunteerWork}
            onChange={(volunteerWork) => onUpdateCVData({ ...cvData, volunteerWork })}
          />
        );
      case "skills":
        return (
          <SkillsForm
            data={cvData.skills}
            onChange={(skills) => onUpdateCVData({ ...cvData, skills })}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            data={cvData.projects}
            onChange={(projects) => onUpdateCVData({ ...cvData, projects })}
          />
        );
      case "achievements":
        return (
          <AchievementsForm
            data={cvData.achievements}
            onChange={(achievements) => onUpdateCVData({ ...cvData, achievements })}
          />
        );
      case "languages":
        return (
          <LanguagesForm
            data={cvData.languages || []}
            onChange={(languages) => onUpdateCVData({ ...cvData, languages })}
          />
        );
      case "hobbies":
        return (
          <HobbiesForm
            data={cvData.hobbies || []}
            onChange={(hobbies) => onUpdateCVData({ ...cvData, hobbies })}
          />
        );
      case "certifications":
        return (
          <CertificationsForm
            data={cvData.certifications || []}
            onChange={(certifications) => onUpdateCVData({ ...cvData, certifications })}
          />
        );
      case "references":
        return (
          <ReferencesForm
            data={cvData.references}
            onChange={(references) => onUpdateCVData({ ...cvData, references })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <motion.nav 
        className="bg-white border-b border-black/20 sticky top-0 z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Home */}
            <motion.button
              onClick={goHome}
              className="flex items-center space-x-3 text-black hover:text-blue-700 transition-colors min-h-[44px] min-w-[44px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-semibold text-lg">{t('common.home')}</span>
            </motion.button>

            {/* Progress indicator - Desktop only */}
            <div className="hidden md:flex items-center space-x-2 md:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-20 md:w-32 h-2 bg-black/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-700 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-xs md:text-sm font-medium text-black/70">
                  {progressPercentage}%
                </span>
              </div>
              
              {/* Auto-save status */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  autoSaveStatus === 'saved' ? 'bg-blue-700' : 
                  autoSaveStatus === 'saving' ? 'bg-black/50' : 'bg-black'
                }`} />
                <span className="text-xs text-black/60">
                  {autoSaveStatus === 'saved' ? t('common.saved') : 
                   autoSaveStatus === 'saving' ? t('common.saving') : t('common.error')}
                </span>
              </div>
            </div>

            {/* Action buttons - Mobile responsive */}
            <div className="flex items-center space-x-1 sm:space-x-3">

              {/* Preview CV Button */}
              <motion.button
                onClick={onPreview}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors min-h-[44px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{t('cv.preview')}</span>
              </motion.button>

              {/* Sections Button */}
              <motion.button
                onClick={() => setShowSectionManager(true)}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors min-h-[44px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              
                <span>{t('common.sections')}</span>
              </motion.button>

              {/* Dashboard/Sign In Button */}
              {user && onDashboard ? (
                <motion.button
                  onClick={onDashboard}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors min-h-[44px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Go to Dashboard</span>
                </motion.button>
              ) : onSignIn && !user ? (
                <motion.button
                  onClick={onSignIn}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors min-h-[44px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{t('common.signIn')}</span>
                </motion.button>
              ) : null}

          
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="flex">
        {/* Enhanced Left Sidebar - Progress Enhancement */}
        <div 
          className="hidden lg:flex lg:flex-col w-80 bg-white border-r border-black/20 sticky top-16 h-[calc(100vh-4rem)]"
        >
          <div className="flex-1 p-4 overflow-y-auto">
            <ProgressEnhancement 
              sections={getEnhancedSections()}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />

            <div id="progress-sections"></div>

            {/* Validation Messages */}
            {validationResults[currentSection.id] && (
              <div className="space-y-3">
                {/* Errors */}
                {validationResults[currentSection.id].errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-red-800 mb-2">Required Fields</h4>
                    <ul className="text-xs text-red-700 space-y-1">
                      {validationResults[currentSection.id].errors.map((error, index) => (
                        <li key={index} className="flex items-start space-x-1">
                          <span>•</span>
                          <span>{error}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warnings */}
                {validationResults[currentSection.id].warnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-yellow-800 mb-2">Recommendations</h4>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      {validationResults[currentSection.id].warnings.map((warning, index) => (
                        <li key={index} className="flex items-start space-x-1">
                          <span>•</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {validationResults[currentSection.id].suggestions.length > 0 && (
                  <div className="bg-white border border-black/20 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-black mb-2">Pro Tips</h4>
                    <ul className="text-xs text-black space-y-1">
                      {validationResults[currentSection.id].suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-1">
                          <span>•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-4">
          <div className="max-w-4xl mx-auto">
            {/* Desktop Step-by-Step View - Hidden on mobile */}
            <div className="hidden md:block">
              {/* Section Navigation - Enhanced for desktop */}
              <div id="section-navigation" className="mb-6 bg-white rounded-xl shadow-sm border border-black/20 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-black">Section {currentStep + 1} of {steps.length}</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-black/70">{currentSection.label}</span>
                </div>
              </div>
              
              {/* Progress Bar - Keep this one for visual feedback */}
              <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden mb-3">
                <motion.div 
                  className="h-full bg-blue-700 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Section Info and Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center justify-center w-10 h-10 bg-black/10 text-black/70 rounded-lg hover:bg-black/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  
                  <div className="text-center lg:text-left">
                    <p className="font-medium text-black">{currentSection.label}</p>
                    <p className="text-xs lg:text-sm text-black/60">{currentSection.description}</p>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center justify-center w-10 h-10 bg-black/10 text-black/70 rounded-lg hover:bg-black/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>
              
              {/* Validation Status */}
              {validationResults[currentSection.id] && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {validationResults[currentSection.id].errors.length > 0 && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-2 py-1 rounded-md text-xs">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>{validationResults[currentSection.id].errors.length} required field(s)</span>
                    </div>
                  )}
                  {validationResults[currentSection.id].warnings.length > 0 && (
                    <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md text-xs">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>{validationResults[currentSection.id].warnings.length} recommendation(s)</span>
                    </div>
                  )}
                  {validationResults[currentSection.id].suggestions.length > 0 && (
                    <div className="flex items-center space-x-2 text-black bg-white px-2 py-1 rounded-md text-xs border border-black/20">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{validationResults[currentSection.id].suggestions.length} tip(s)</span>
                    </div>
                  )}
                </div>
              )}
            </div>

              {/* Contextual Tips Component - Desktop Only */}
              <ContextualTips 
                sectionId={currentSection.id}
                sectionLabel={currentSection.label}
                validationResult={getCurrentValidationResult()}
                staticTips={(tipsData as TipsData)[currentSection.id] || []}
              />
              
              {/* Enhanced Content with Validation - Desktop Step View */}
              <div className="bg-white rounded-xl shadow-sm border border-black/20 p-4 sm:p-6 lg:p-8">
                {currentSection && renderStepContent()}
              </div>

              {/* Desktop Action Buttons */}
              <div className="mt-6 flex justify-between items-center space-x-4">
                <motion.button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2 px-4 py-3 text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] border border-black/20 hover:border-black/40"
                  whileHover={{ scale: currentStep === 0 ? 1 : 1.02 }}
                  whileTap={{ scale: currentStep === 0 ? 1 : 0.98 }}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>{t('common.previous')}</span>
                </motion.button>

                <div className="flex items-center space-x-3">
                 

                  <motion.button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                    whileHover={{ scale: isStepValid() ? 1.02 : 1 }}
                    whileTap={{ scale: isStepValid() ? 0.98 : 1 }}
                  >
                    <span>{currentStep === steps.length - 1 ? t('cv.preview') : t('common.next')}</span>
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Mobile Collapsible View - Visible only on mobile */}
            <div className="md:hidden">
              {/* Mobile Header */}
              <div className="mb-6 bg-white rounded-xl shadow-sm border border-black/20 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{t('common.buildYourCV')}</h3>
                  <span className="text-sm text-gray-500">{Math.round(progressPercentage)}% {t('common.complete')}</span>
                </div>
                
                {/* Mobile Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-700 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                <p className="text-sm text-gray-600 mt-2">
                  Tap sections below to expand and fill in your information.
                </p>
              </div>

              {/* Collapsible Sections */}
              <CollapsibleSections
                sections={steps}
                cvData={cvData}
                onUpdateCVData={onUpdateCVData}
                validationResults={validationResults}
                getCompletionStatus={(id: string) => getCompletionStatus(id) || false}
              />
            </div>

            {/* Mobile Action Buttons */}
            <div className="md:hidden mt-6 flex justify-center space-x-4">
              <motion.button
                onClick={onPreview}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{t('cv.preview')}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Manager Modal */}
      <AnimatePresence>
        {showSectionManager && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSectionManager(false)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl border border-black/20 w-full max-w-md max-h-[80vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-black/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-black">Customize Sections</h3>
                  <button
                    onClick={() => setShowSectionManager(false)}
                    className="p-2 text-black/50 hover:text-black/70 rounded-lg hover:bg-black/5"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-black/70 mt-1">
                  Add or remove sections to customize your CV structure
                </p>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-3">
                  {allSections.map((section) => {
                    const isActive = steps.some((s) => s.id === section.id);
                    const isRequired = section.required;
                    const Icon = section.icon;

                    return (
                      <div
                        key={section.id}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          isActive
                            ? 'bg-white border-blue-600'
                            : 'bg-white border-black/20 hover:bg-black/5'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-5 w-5 ${
                            isActive ? 'text-blue-700' : 'text-black/50'
                          }`} />
                          <div>
                            <p className={`font-medium ${
                              isActive ? 'text-black' : 'text-black/70'
                            }`}>
                              {section.label}
                              {isRequired && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </p>
                            <p className="text-xs text-black/60">
                              {section.description}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleSection(section.id)}
                          disabled={isRequired && isActive}
                          className={`p-2 rounded-lg transition-colors ${
                            isActive
                              ? isRequired
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-white border border-red-200 text-red-600 hover:bg-red-50'
                              : 'bg-white border border-green-200 text-green-600 hover:bg-green-50'
                          }`}
                          title={
                            isRequired && isActive
                              ? 'Required section'
                              : isActive
                              ? 'Remove section'
                              : 'Add section'
                          }
                        >
                          {isActive ? (
                            <Minus className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 border-t border-black/20 bg-black/5">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-black/70">
                    {steps.length} sections selected
                  </p>
                  <button
                    onClick={() => setShowSectionManager(false)}
                    className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Subtle Toast Notifications */}
      <SubtleToast
        type={toastType}
        message={toastMessage}
        onDashboard={handleDashboardNavigation}
        onDismiss={() => setToastType('hidden')}
      />

      {/* Onboarding Tour */}
      <OnboardingTour 
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={() => {
          localStorage.setItem('onboarding_completed', 'true');
          setShowOnboarding(false);
        }}
      />

      {/* Mobile Progress Bar - Fixed at Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/20 px-4 py-3 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-full max-w-[200px] h-2 bg-black/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-700 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs font-medium text-black/70 whitespace-nowrap">
              {progressPercentage}%
            </span>
          </div>
          
          {/* Auto-save status */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              autoSaveStatus === 'saved' ? 'bg-blue-700' : 
              autoSaveStatus === 'saving' ? 'bg-black/50' : 'bg-black'
            }`} />
            <span className="text-xs text-black/60">
              {autoSaveStatus === 'saved' ? 'Saved' : 
               autoSaveStatus === 'saving' ? 'Saving...' : 'Error'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
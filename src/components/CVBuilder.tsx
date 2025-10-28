
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Settings,
  Clock,
  FileText,
  Sparkles,
  User,
  X,
  Plus,
  Minus,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CVData } from "../types/cv";

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
import NavigationHelper from "./NavigationHelper";
import SubtleToast from "./SubtleToast";
import OnboardingTour from "./OnboardingTour";

// CV Upload
import { AdvancedFileParser, ParseProgress } from "../utils/advancedFileParser2";

// Auto-fill Integration
import { EnterpriseAutoFillEngine } from "../utils/enterpriseAutoFill";

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

const allSections = [
  { id: "personal", label: "Personal Info", required: true, icon: FileText, description: "Basic contact information and summary" },
  { id: "experience", label: "Experience", required: false, icon: Clock, description: "Work experience and professional history" },
  { id: "education", label: "Education", required: false, icon: Sparkles, description: "Academic qualifications and certifications" },
  { id: "skills", label: "Skills", required: false, icon: Settings, description: "Technical and soft skills" },
  { id: "projects", label: "Projects", required: false, icon: FileText, description: "Personal and professional projects" },
  { id: "volunteer", label: "Volunteer Work", required: false, icon: Clock, description: "Community service and volunteer experience" },
  { id: "achievements", label: "Achievements", required: false, icon: Sparkles, description: "Awards and recognitions" },
  { id: "languages", label: "Languages", required: false, icon: Settings, description: "Language proficiency" },
  { id: "certifications", label: "Certifications", required: false, icon: FileText, description: "Professional certifications and licenses" },
  { id: "hobbies", label: "Hobbies", required: false, icon: Clock, description: "Personal interests and hobbies" },
  { id: "references", label: "References", required: false, icon: Sparkles, description: "Professional references" },
];

export default function CVBuilder({ cvData, onUpdateCVData, onPreview, onSignIn, onDashboard }: CVBuilderProps) {
  const [steps, setSteps] = useState(allSections);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSectionManager, setShowSectionManager] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const [uploadProgress, setUploadProgress] = useState<ParseProgress>({
    stage: 'idle',
    progress: 0,
    message: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  
  // Enhanced validation and progress tracking
  const [validationResults, setValidationResults] = useState<SectionValidation>({});

  // New state for celebration and navigation flow
  const [showNavigationHelper, setShowNavigationHelper] = useState(false);
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

  // File upload handler with enhanced error handling and options
  // Auto-fill multiple form sections based on parsed CV data with Enterprise-Grade System
  const autoFillMultipleSections = async (cvData: Partial<CVData>, fieldConfidence: any = {}) => {
    console.log('🚀 Starting Enterprise Auto-Fill System...');
    
    try {
      // Create enterprise auto-fill engine with advanced configuration
      const enterpriseEngine = new EnterpriseAutoFillEngine({
        validateBeforeFill: true,
        highlightFilledFields: true,
        animate: false,
        retryAttempts: 3,
        timeout: 30000,
        debugMode: true,
        smartDetection: true,
        aiEnhanced: true,
        performanceMode: 'thorough',
        confidenceThreshold: 60,
        batchSize: 10,
        onProgress: (progress) => {
          console.log(`🔄 ${progress.stage}: ${progress.message} (${progress.progress}%)`);
          if (progress.currentField) {
            console.log(`   Currently processing: ${progress.currentField}`);
          }
        },
        onFieldFilled: (result) => {
          console.log(`✅ Field filled: ${result.fieldName} = "${result.value}" (${result.confidence}% confidence)`);
        },
        onComplete: (result) => {
          console.log('🎯 Enterprise auto-fill completed:', {
            success: result.success,
            filledFields: result.filledFields.length,
            confidence: result.confidence,
            performance: result.performance,
            recommendations: result.recommendations
          });
        },
        onError: (error) => {
          console.error('❌ Auto-fill error:', error.message);
        }
      });

      // Execute enterprise-grade auto-fill
      const result = await enterpriseEngine.autoFillForm(cvData, fieldConfidence);
      
      // Process results
      if (result.success && result.filledFields.length > 0) {
        console.log(`🎉 SUCCESS: Filled ${result.filledFields.length} fields with ${result.confidence}% average confidence`);
        
        // Show success notification
        const successMessage = `✨ Auto-filled ${result.filledFields.length} fields across multiple sections with ${result.confidence}% confidence`;
        console.log(successMessage);
        
        // Display performance metrics
        console.log('📊 Performance Metrics:', {
          totalTime: `${result.performance.totalTime}ms`,
          fieldsPerSecond: result.performance.fieldsPerSecond.toFixed(2),
          successRate: `${result.performance.successRate.toFixed(1)}%`,
          cacheHits: result.performance.cacheHits,
          retries: result.performance.retries
        });
        
        // Show recommendations if any
        if (result.recommendations && result.recommendations.length > 0) {
          console.log('💡 Recommendations:', result.recommendations);
        }
        
      } else {
        console.log('⚠️ Auto-fill completed but no fields were filled');
        if (result.errors.length > 0) {
          console.error('Errors encountered:', result.errors);
        }
        if (result.skippedFields.length > 0) {
          console.log('Skipped fields:', result.skippedFields);
        }
      }

      // Display detailed results for debugging
      if (result.filledFields.length > 0) {
        console.group('📋 Detailed Fill Results');
        result.filledFields.forEach((field, index) => {
          console.log(`${index + 1}. ${field.fieldName}:`);
          console.log(`   Value: "${field.value}"`);
          console.log(`   Confidence: ${field.confidence}%`);
          console.log(`   Method: ${field.method}`);
          console.log(`   Processing Time: ${field.processingTime.toFixed(2)}ms`);
          console.log(`   Validation: ${field.validationResult.isValid ? '✅ Valid' : '❌ Invalid'}`);
        });
        console.groupEnd();
      }

      return result;
      
    } catch (error) {
      console.error('❌ Enterprise auto-fill failed:', error);
      throw error;
    }
  };

  const handleFileUpload = async (file: File) => {
    console.log('🚀 Starting enhanced CV upload for file:', file.name, 'Size:', file.size, 'Type:', file.type);
    
    // Validate file first
    if (!file) {
      console.error('❌ No file provided');
      alert('Please select a file to upload.');
      return;
    }

    // Check file size (25MB limit)
    if (file.size > 25 * 1024 * 1024) {
      console.error('❌ File too large:', file.size);
      alert('File is too large. Please select a file smaller than 25MB.');
      return;
    }

    // Check file type
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      console.error('❌ Invalid file type:', fileExtension);
      alert('Please select a PDF, Word document, or text file.');
      return;
    }

    setIsUploading(true);
    setUploadProgress({ stage: 'starting', progress: 5, message: 'Initializing upload...' });
    
    try {
      // Enhanced parser with backend API support and better options
      const parser = new AdvancedFileParser((progress) => {
        console.log('📊 Upload progress:', progress);
        setUploadProgress(progress);
      }, {
        useBackendAPI: true, // Backend API is working and available
        apiEndpoint: '/api/parse-resume', // Use proxied endpoint
        enableOCR: true,
        preserveFormatting: true,
        multiLanguage: true,
        strictValidation: false
      });
      
      console.log('🔍 Starting enhanced file parsing...');
      const result = await parser.parseFile(file);
      
      console.log('✅ Enhanced parse result:', result);
      
      if (result.success && result.data) {
        // Show parsing confidence and field confidence
        console.log('🎯 Parsing confidence:', result.confidence + '%');
        console.log('📊 Field confidence scores:', result.metadata?.fieldConfidence);
        
        // Smart merging with confidence-based priority
        const mergedData = await smartMergeWithConfidence(cvData, result.data, result.metadata?.fieldConfidence);
        
        // Update CV data - this will trigger form updates throughout the app
        console.log('🔄 Updating CV data with enhanced merged result:', mergedData);
        onUpdateCVData(mergedData);
        
        // Auto-fill forms with parsed data
        try {
          console.log('🤖 Starting comprehensive auto-fill process...');
          console.log('📍 Current section:', currentSection.id, currentSection.label);
          
          // Store the original section to return to after auto-fill
          const originalStep = currentStep;
          
          // Auto-fill multiple sections based on available data
          await autoFillMultipleSections(mergedData, result.metadata?.fieldConfidence);
          
          // Return to original section
          setCurrentStep(originalStep);
          
        } catch (autoFillError) {
          console.warn('⚠️ Auto-fill failed:', autoFillError);
          // Continue without auto-fill - forms will still be updated via onUpdateCVData
        }
        
        // Show success notification with confidence score
        const confidenceText = result.confidence ? ` (${result.confidence}% confidence)` : '';
        console.log(`✨ CV uploaded and parsed successfully${confidenceText}!`, {
          confidence: result.confidence,
          fieldConfidence: result.metadata?.fieldConfidence,
          extractedSections: result.data ? Object.keys(result.data).filter(key => {
            const value = result.data![key as keyof typeof result.data];
            return Array.isArray(value) ? value.length > 0 : Boolean(value);
          }) : [],
          qualityScore: result.metadata?.qualityScore
        });
        
        // Show confidence feedback to user
        if (result.confidence && result.confidence < 70) {
          console.warn('⚠️ Low confidence parsing. You may need to review and edit the extracted data.');
        }
        
        // Clear upload state after success animation
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress({ stage: 'idle', progress: 0, message: '' });
        }, 1500);
      } else {
        console.error('❌ Enhanced parse failed:', result.error);
        
        // Show user-friendly error message based on error type
        let userMessage = 'Failed to parse CV. ';
        if (result.error?.includes('file type')) {
          userMessage += 'Please make sure you\'re uploading a PDF or Word document.';
        } else if (result.error?.includes('size')) {
          userMessage += 'File is too large. Please use a file smaller than 25MB.';
        } else if (result.error?.includes('text')) {
          userMessage += 'No readable text found. The document may be scanned or corrupted.';
        } else {
          userMessage += 'Please try with a different file or check the file format.';
        }
        
        alert(userMessage);
        throw new Error(result.error || 'Failed to parse CV with enhanced parser');
      }
    } catch (error) {
      console.error("💥 Error processing file with enhanced parser:", error);
      setIsUploading(false);
      setUploadProgress({ stage: 'idle', progress: 0, message: '' });
      
      // Determine error type and show appropriate message
      let errorMessage = 'Upload failed: ';
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
          errorMessage += 'Cannot connect to server. Please check your internet connection and try again.';
        } else if (error.message.includes('file type') || error.message.includes('format')) {
          errorMessage += 'Unsupported file format. Please upload a PDF, Word document, or text file.';
        } else if (error.message.includes('size')) {
          errorMessage += 'File is too large. Please use a file smaller than 25MB.';
        } else if (error.message.includes('timeout')) {
          errorMessage += 'Upload timed out. Please try again with a smaller file.';
        } else {
          errorMessage += error.message || 'Unknown error occurred.';
        }
      } else {
        errorMessage += 'Unknown error occurred. Please try again.';
      }
      
      // Show user-friendly error message
      alert(errorMessage + '\n\nTip: You can still fill out the form manually if the upload continues to fail.');
    }
  };

  // Smart merge function with confidence-based decisions
  const smartMergeWithConfidence = async (existingData: CVData, parsedData: Partial<CVData>, fieldConfidence: any = {}) => {
    const merged = { ...existingData };
    
    // Merge personal info with confidence thresholds
    if (parsedData.personalInfo) {
      merged.personalInfo = { ...merged.personalInfo };
      
      // Only override if confidence is high enough and field is empty/missing
      if (fieldConfidence.name > 80 && parsedData.personalInfo.fullName && !merged.personalInfo.fullName) {
        merged.personalInfo.fullName = parsedData.personalInfo.fullName;
      }
      
      if (fieldConfidence.email > 85 && parsedData.personalInfo.email && !merged.personalInfo.email) {
        merged.personalInfo.email = parsedData.personalInfo.email;
      }
      
      if (fieldConfidence.phone > 80 && parsedData.personalInfo.phone && !merged.personalInfo.phone) {
        merged.personalInfo.phone = parsedData.personalInfo.phone;
      }
      
      // Always merge if current field is empty
      Object.keys(parsedData.personalInfo).forEach(key => {
        const typedKey = key as keyof typeof parsedData.personalInfo;
        if (parsedData.personalInfo![typedKey] && !merged.personalInfo[typedKey]) {
          (merged.personalInfo as any)[typedKey] = parsedData.personalInfo![typedKey];
        }
      });
    }
    
    // Merge arrays with confidence-based decisions
    const arrayFields = ['education', 'experience', 'skills', 'projects', 'achievements', 'languages', 'hobbies', 'certifications', 'volunteerWork', 'references'] as const;
    
    arrayFields.forEach(field => {
      const confidence = fieldConfidence[field] || 0;
      
      if (parsedData[field] && Array.isArray(parsedData[field]) && parsedData[field]!.length > 0) {
        if (confidence > 70 || !merged[field] || merged[field]!.length === 0) {
          // Use type assertion to handle complex union types
          (merged as any)[field] = parsedData[field];
        }
      }
    });
    
    return merged;
  };




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

  // Enhanced auto-save with status feedback
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    setAutoSaveStatus('saving');
    
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem("cvData", JSON.stringify(cvData));
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
    
    // At 75% - Offer preview (when CV becomes meaningful)
    else if (progressPercentage >= 75 && lastKnownProgress < 75) {
      setToastType('info');
      setToastMessage('Your CV is looking good! Ready to preview?');
      setLastKnownProgress(75);
    }
    
    // At 100% - Show completion with next steps (only real celebration)
    else if (progressPercentage === 100 && lastKnownProgress < 100) {
      setLastKnownProgress(100);
    }
  }, [progressPercentage, lastKnownProgress]);

  // Dashboard navigation function
  const handleDashboardNavigation = () => {
    // Save current progress to localStorage
    localStorage.setItem('cvData', JSON.stringify(cvData));
    localStorage.setItem('cvProgress', progressPercentage.toString());
    
    // Close any open modals
    setShowNavigationHelper(false);
    
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Top Navigation */}
      <motion.nav 
        className="bg-white/90 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Home */}
            <motion.button
              onClick={goHome}
              className="flex items-center space-x-3 text-slate-700 hover:text-blue-600 transition-colors min-h-[44px] min-w-[44px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-semibold text-lg">QuickCV</span>
            </motion.button>

            {/* Progress indicator - Desktop only */}
            <div className="hidden md:flex items-center space-x-2 md:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-20 md:w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-xs md:text-sm font-medium text-slate-600">
                  {progressPercentage}%
                </span>
              </div>
              
              {/* Auto-save status */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  autoSaveStatus === 'saved' ? 'bg-green-500' : 
                  autoSaveStatus === 'saving' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="text-xs text-slate-500">
                  {autoSaveStatus === 'saved' ? 'Saved' : 
                   autoSaveStatus === 'saving' ? 'Saving...' : 'Error'}
                </span>
              </div>
            </div>

            {/* Action buttons - Mobile responsive */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Customize Sections Button */}
              <motion.button
                onClick={() => setShowSectionManager(true)}
                className="flex items-center space-x-1 px-2 sm:px-3 py-2 text-slate-600 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 hover:border-slate-300 min-h-[44px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Customize sections"
              >
                <Settings className="h-4 w-4" />
                <span className="text-sm">Sections</span>
              </motion.button>

              {/* Progress Milestone Button */}
              {progressPercentage >= 25 && (
                <motion.button
                  onClick={() => setShowNavigationHelper(!showNavigationHelper)}
                  className="flex items-center space-x-1 px-2 sm:px-3 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors border border-purple-200 hover:border-purple-300 min-h-[44px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="View progress and next steps"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">{progressPercentage}%</span>
                </motion.button>
              )}
              
              {/* Sign In Button */}
              {onSignIn && (
                <motion.button
                  onClick={onSignIn}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 hover:border-blue-300 min-h-[44px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </motion.button>
              )}

              <motion.button
                id="preview-button"
                onClick={onPreview}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 min-h-[44px]"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="h-4 w-4" />
                <span className="text-sm sm:text-base">Preview</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="flex">
        {/* Enhanced Left Sidebar - Progress Enhancement */}
        <div 
          className="hidden lg:flex lg:flex-col w-80 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 sticky top-16 h-[calc(100vh-4rem)]"
        >
          <div className="flex-1 p-4 overflow-y-auto">
            {/* CV Upload Section - Moved to top */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50 mb-4">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                <FileText className="h-4 w-4 text-green-600" />
                <span>Import Existing CV</span>
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Upload your CV to auto-fill all sections instantly with AI-powered parsing
              </p>
              
              {/* Upload Progress */}
              {isUploading && uploadProgress && (
                <motion.div 
                  className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-4 w-4 text-blue-600" />
                    </motion.div>
                    <span className="text-sm font-medium text-blue-800">{uploadProgress.stage}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mb-1">
                    <motion.div 
                      className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${uploadProgress.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-blue-700">{uploadProgress.message}</p>
                </motion.div>
              )}
              
              <div className="space-y-3">
                <input
                  type="file"
                  id="cv-upload"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => {
                    console.log('🖥️ Desktop upload triggered:', e.target.files);
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log('📁 Desktop file selected:', file.name, file.type, file.size);
                      handleFileUpload(file);
                    } else {
                      console.warn('⚠️ No file selected on desktop');
                    }
                  }}
                  className="hidden"
                  disabled={isUploading}
                />
                <label
                  htmlFor="cv-upload"
                  onClick={() => {
                    console.log('🖱️ Desktop label clicked');
                    // Fallback: trigger file input manually
                    const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                  className={`block w-full p-4 border-2 border-dashed border-green-300 rounded-lg text-center cursor-pointer transition-all duration-200 ${
                    isUploading 
                      ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                      : 'hover:border-green-400 hover:bg-green-50 hover:shadow-sm'
                  }`}
                >
                  <FileText className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <span className="text-sm font-medium text-green-700">
                    {isUploading ? 'Processing...' : 'Choose CV file'}
                  </span>
                  <p className="text-xs text-green-600 mt-1">PDF, Word documents</p>
                </label>
              </div>
            </div>

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
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Pro Tips</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
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
        <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-4">{/* Extra bottom padding on mobile for fixed progress bar */}
          <div className="max-w-4xl mx-auto">
            {/* Mobile CV Upload Section - At the very top for mobile users */}
            <div className="lg:hidden mb-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                <FileText className="h-4 w-4 text-green-600" />
                <span>Import Existing CV</span>
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Upload your CV to auto-fill all sections instantly with AI-powered parsing
              </p>
              
              {/* Upload Progress - Mobile */}
              {isUploading && uploadProgress && (
                <motion.div 
                  className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-4 w-4 text-blue-600" />
                    </motion.div>
                    <span className="text-sm font-medium text-blue-800">{uploadProgress.stage}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mb-1">
                    <motion.div 
                      className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${uploadProgress.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-blue-700">{uploadProgress.message}</p>
                </motion.div>
              )}
              
              <div className="space-y-3">
                <input
                  type="file"
                  id="cv-upload-mobile"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log('📁 Mobile file selected:', file.name, file.type, file.size);
                      handleFileUpload(file);
                    } else {
                      console.warn('⚠️ No file selected on mobile');
                    }
                  }}
                  className="hidden"
                  disabled={isUploading}
                />
                <label
                  htmlFor="cv-upload-mobile"
                  className={`block w-full p-4 border-2 border-dashed border-green-300 rounded-lg text-center cursor-pointer transition-all duration-200 ${
                    isUploading 
                      ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                      : 'hover:border-green-400 hover:bg-green-50 hover:shadow-sm active:scale-[0.98]'
                  }`}
                >
                  <FileText className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <span className="text-sm font-medium text-green-700">
                    {isUploading ? 'Processing...' : 'Choose CV file'}
                  </span>
                  <p className="text-xs text-green-600 mt-1">PDF, Word documents</p>
                </label>
              </div>
            </div>

            {/* Section Navigation - Enhanced for all screen sizes */}
            <div id="section-navigation" className="mb-6 bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800">Section {currentStep + 1} of {steps.length}</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-slate-600">{currentSection.label}</span>
                </div>
              </div>
              
              {/* Progress Bar - Keep this one for visual feedback */}
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
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
                    className="flex items-center justify-center w-10 h-10 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  
                  <div className="text-center lg:text-left">
                    <p className="font-medium text-slate-900">{currentSection.label}</p>
                    <p className="text-xs lg:text-sm text-slate-500">{currentSection.description}</p>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center justify-center w-10 h-10 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                    <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-2 py-1 rounded-md text-xs">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{validationResults[currentSection.id].suggestions.length} tip(s)</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Contextual Tips Component */}
            <ContextualTips 
              sectionId={currentSection.id}
              sectionLabel={currentSection.label}
              validationResult={getCurrentValidationResult()}
              staticTips={(tipsData as TipsData)[currentSection.id] || []}
            />

            {/* Enhanced Content with Validation */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 lg:p-8">
              {currentSection && renderStepContent()}
            </div>

            {/* Universal Action Buttons - Visible on all screen sizes */}
            <div className="mt-6 flex justify-between items-center space-x-4">
              <motion.button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 px-4 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] border border-slate-200 hover:border-slate-300"
                whileHover={{ scale: currentStep === 0 ? 1 : 1.02 }}
                whileTap={{ scale: currentStep === 0 ? 1 : 0.98 }}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </motion.button>

              {/* Center content for desktop, mobile customize for mobile */}
              <div className="flex items-center space-x-4">
                {/* Desktop center content */}
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="text-center">
                    <p className="font-medium text-slate-900">{currentSection.label}</p>
                    <p className="text-sm text-slate-600">
                      Step {currentStep + 1} of {steps.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={onPreview}
                  className="flex items-center space-x-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors min-h-[48px] border border-slate-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                  whileHover={{ scale: isStepValid() ? 1.02 : 1 }}
                  whileTap={{ scale: isStepValid() ? 0.98 : 1 }}
                >
                  <span>{currentStep === steps.length - 1 ? "Preview" : "Next"}</span>
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* Mobile Completion Overview - At the very bottom of everything */}
            <div className="lg:hidden mt-8 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700">Progress Overview</span>
                <span className="text-xs text-slate-500">{Math.round(progressPercentage)}% Complete</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {getEnhancedSections().map((section) => {
                  const isCompleted = getCompletionStatus(section.id);
                  const hasProgress = isCompleted;
                  return (
                    <div
                      key={section.id}
                      className={`flex items-center space-x-2 p-2 rounded-md text-xs ${
                        isCompleted 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : hasProgress 
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        isCompleted 
                          ? 'bg-green-500' 
                          : hasProgress 
                          ? 'bg-yellow-500'
                          : 'bg-gray-400'
                      }`}></div>
                      <span className="truncate font-medium">{section.label}</span>
                      {isCompleted && (
                        <CheckCircle2 className="h-3 w-3 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
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
              className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md max-h-[80vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Customize Sections</h3>
                  <button
                    onClick={() => setShowSectionManager(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-slate-600 mt-1">
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
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-5 w-5 ${
                            isActive ? 'text-blue-600' : 'text-slate-400'
                          }`} />
                          <div>
                            <p className={`font-medium ${
                              isActive ? 'text-blue-900' : 'text-slate-700'
                            }`}>
                              {section.label}
                              {isRequired && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </p>
                            <p className="text-xs text-slate-500">
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
                                : 'bg-red-100 text-red-600 hover:bg-red-200'
                              : 'bg-green-100 text-green-600 hover:bg-green-200'
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

              <div className="p-6 border-t border-slate-200 bg-slate-50">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-600">
                    {steps.length} sections selected
                  </p>
                  <button
                    onClick={() => setShowSectionManager(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Helper */}
      <NavigationHelper
        isVisible={showNavigationHelper}
        onClose={() => setShowNavigationHelper(false)}
        onDashboard={handleDashboardNavigation}
        currentProgress={progressPercentage}
      />

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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-4 py-3 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-full max-w-[200px] h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs font-medium text-slate-600 whitespace-nowrap">
              {progressPercentage}%
            </span>
          </div>
          
          {/* Auto-save status */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              autoSaveStatus === 'saved' ? 'bg-green-500' : 
              autoSaveStatus === 'saving' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="text-xs text-slate-500">
              {autoSaveStatus === 'saved' ? 'Saved' : 
               autoSaveStatus === 'saving' ? 'Saving...' : 'Error'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

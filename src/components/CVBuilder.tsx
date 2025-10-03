// src/components/CVBuilder.tsx
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Settings,
  CheckCircle2,
  Circle,
} from "lucide-react";
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

// Load dynamic tips
import tipsData from "../data/tips.json";

interface CVBuilderProps {
  cvData: CVData;
  onUpdateCVData: (data: CVData) => void;
  onPreview: () => void;
}

const allSections = [
  { id: "personal", label: "Personal Info", required: true },
  { id: "education", label: "Education", required: false },
  { id: "experience", label: "Experience", required: false },
  { id: "volunteer", label: "Volunteer Work", required: false },
  { id: "skills", label: "Skills", required: false },
  { id: "projects", label: "Projects", required: false },
  { id: "achievements", label: "Achievements", required: false },
  { id: "languages", label: "Languages", required: false },
  { id: "hobbies", label: "Hobbies", required: false },
  { id: "certifications", label: "Certifications", required: false },
  { id: "references", label: "References", required: false },
  { id: "checklist", label: "CV Checklist", required: false },
];

export default function CVBuilder({ cvData, onUpdateCVData, onPreview }: CVBuilderProps) {
  const [steps, setSteps] = useState(allSections.filter((s) => s.id !== "checklist"));
  const [currentStep, setCurrentStep] = useState(0);
  const [showTips, setShowTips] = useState(true);
  const [showSectionManager, setShowSectionManager] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const allStepsWithChecklist = [...steps, { id: "checklist", label: "CV Checklist" }];
  const currentSection = allStepsWithChecklist[currentStep];


// Load saved CV data once on mount
useEffect(() => {
  const saved = localStorage.getItem("cvData");
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as CVData;
      onUpdateCVData(parsed);
    } catch (err) {
      console.error("Failed to parse saved CV:", err);
    }
  }
}, []);

// Auto-save with debounce
const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
  if (saveTimeoutRef.current) {
    clearTimeout(saveTimeoutRef.current);
  }

  // Wait 1.5 seconds after last change before saving
  saveTimeoutRef.current = setTimeout(() => {
    try {
      localStorage.setItem("cvData", JSON.stringify(cvData));
      console.log("✅ CV auto-saved");
    } catch (err) {
      console.error("Error auto-saving CV:", err);
    }
  }, 1500);

  return () => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
  };
}, [cvData]);


  // Navigation
  const handleNext = () => {
    if (currentStep < allStepsWithChecklist.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onPreview();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goHome = () => (window.location.href = "/");

  // Section manager
  const toggleSection = (id: string) => {
    if (steps.some((s) => s.id === id)) {
      setSteps(steps.filter((s) => s.id !== id));
      if (allStepsWithChecklist[currentStep]?.id === id) setCurrentStep(0);
    } else {
      const sectionToAdd = allSections.find((s) => s.id === id);
      if (sectionToAdd) setSteps([...steps, sectionToAdd]);
    }
  };

  // Checklist status
  const getChecklistStatus = (id: string) => {
    switch (id) {
      case "personal":
        return !!cvData.personalInfo.fullName && !!cvData.personalInfo.email;
      case "education":
        return cvData.education?.length > 0;
      case "experience":
        return cvData.experience?.length > 0;
      case "volunteer":
        return cvData.volunteerWork?.length > 0;
      case "skills":
        return cvData.skills?.length > 0;
      case "projects":
        return cvData.projects?.length > 0;
      case "achievements":
        return cvData.achievements?.length > 0;
      case "languages":
  return (cvData.languages?.length || 0) > 0;
case "hobbies":
  return (cvData.hobbies?.length || 0) > 0;
case "certifications":
  return (cvData.certifications?.length || 0) > 0;

      case "references":
        return cvData.references?.length > 0;
      default:
        return false;
    }
  };

  const isStepValid = () => {
    if (!currentSection) return false;
    if (currentSection.id === "personal") {
      return !!cvData.personalInfo.fullName && !!cvData.personalInfo.email;
    }
    return true;
  };

  // Step content
  const renderStepContent = () => {
    switch (currentSection.id) {
      case "personal":
        return (
          <PersonalInfoForm
            data={cvData.personalInfo}
            onChange={(personalInfo) => onUpdateCVData({ ...cvData, personalInfo })}
          />
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
      case "checklist":
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-[#D1D5DB] p-6">
            
            <ul className="space-y-2">
              {allSections
                .filter((s) => s.id !== "checklist")
                .map((s) => {
                  const done = getChecklistStatus(s.id);
                  return (
                    <li key={s.id} className="flex items-center space-x-2">
                      {done ? (
                        <CheckCircle2 className="text-green-500 h-4 w-4" />
                      ) : (
                        <Circle className="text-gray-400 h-4 w-4" />
                      )}
                      <span className={`text-sm ${done ? "text-gray-700" : "text-gray-500"}`}>
                        {s.label}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  /*** Draggable sidebar logic ***/
  const onMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 200 && newWidth < 600) {
      setSidebarWidth(newWidth);
    }
  };

  const onMouseUp = () => {
    isResizing.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1E3A8A] flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-4 gap-2 sm:gap-0">
            <button
              onClick={goHome}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium w-full sm:w-auto justify-center"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Home</span>
            </button>

            <div className="flex space-x-2 w-full sm:w-auto justify-center">
              <button
                onClick={() => setShowSectionManager(!showSectionManager)}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Manage Sections</span>
              </button>

              <button
                onClick={onPreview}
                className="flex items-center space-x-2 px-4 py-2 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#2A4EB0] transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Stepper & Forms */}
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8">
          {/* Stepper */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {allStepsWithChecklist.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <button
                  onClick={() => setCurrentStep(index)}
                  className={`whitespace-nowrap px-4 py-2 min-w-[80px] rounded-lg text-sm font-medium transition-colors ${
                    index === currentStep
                      ? "bg-[#1E3A8A] text-white"
                      : index < currentStep
                      ? "bg-[#DDE7FF] text-[#1E3A8A] hover:bg-[#A0C4FF]"
                      : "bg-white text-[#1E3A8A] hover:bg-[#F9FAFB]"
                  }`}
                >
                  {step.label}
                  {'required' in step && step.required && (
  <span className="text-red-400 ml-1">*</span>
)}
                </button>
                {index < allStepsWithChecklist.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-[#A0C4FF] mx-1 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#D1D5DB] p-4 sm:p-8 mb-6">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#1E3A8A] mb-2">
                {currentSection.label}
              </h2>
              {currentSection.id !== "checklist" && (
                <p className="text-[#3B82F6] text-sm sm:text-base">
  {'required' in currentSection && currentSection.required
    ? "This section is required"
    : "This section is optional - leave blank to exclude from your CV"}
</p>

              )}
            </div>
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-white border border-[#D1D5DB] text-[#1E3A8A] rounded-lg hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium justify-center w-full sm:w-auto"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center space-x-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#2A4EB0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium justify-center w-full sm:w-auto"
            >
              <span>{currentStep === allStepsWithChecklist.length - 1 ? "Preview CV" : "Next"}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Section Manager Modal */}
        {showSectionManager && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full">
              <h3 className="text-lg font-bold mb-4 text-[#1E3A8A]">Manage Sections</h3>
              <ul className="space-y-2 max-h-80 overflow-y-auto">
                {allSections.filter((s) => s.id !== "checklist").map((s) => (
                  <li key={s.id} className="flex items-center justify-between">
                    <span>{s.label}</span>
                    <button
                      onClick={() => toggleSection(s.id)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        steps.some((st) => st.id === s.id)
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                    >
                      {steps.some((st) => st.id === s.id) ? "Remove" : "Add"}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowSectionManager(false)}
                className="mt-4 w-full px-4 py-2 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#2A4EB0]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tips Sidebar */}
    {/* Tips Sidebar */}
<div
  ref={sidebarRef}
  className="relative bg-gray-50 border-t lg:border-t-0 lg:border-l w-full lg:w-auto"
  style={{
    width: window.innerWidth < 1024 ? '100%' : sidebarWidth, // full width on mobile, resizable on desktop
    minWidth: window.innerWidth < 1024 ? '100%' : 200,
    maxWidth: window.innerWidth < 1024 ? '100%' : 600,
  }}
>
  {/* Resizer only on desktop */}
  <div
    className="hidden lg:block absolute top-0 left-0 w-1 h-full cursor-ew-resize z-50"
    onMouseDown={onMouseDown}
  />

  <div className="p-4 w-full">
    <div className="bg-white border rounded-2xl shadow-sm p-4">
      <button
        onClick={() => setShowTips(!showTips)}
        className="text-sm font-semibold text-[#1E3A8A] mb-2"
      >
        {showTips ? "Hide Tips" : "Show Tips"}
      </button>

      {showTips && currentSection && (
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
          {(tipsData as any)[currentSection.id]?.map((tip: string, idx: number) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
</div>


    </div>
  );
}

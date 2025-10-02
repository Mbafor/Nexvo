import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Eye, Save } from "lucide-react";
import { CVData } from "../types/cv";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import VolunteerForm from "./forms/VolunteerForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import AchievementsForm from "./forms/AchievementsForm";
import LanguagesForm from "./forms/LanguagesForm";
import ReferencesForm from "./forms/ReferencesForm";

interface CVBuilderProps {
  cvData: CVData;
  onUpdateCVData: (data: CVData) => void;
  onPreview: () => void;
}

const steps = [
  { id: "personal", label: "Personal Info", required: true },
  { id: "education", label: "Education", required: false },
  { id: "experience", label: "Experience", required: false },
  { id: "volunteer", label: "Volunteer Work", required: false },
  { id: "skills", label: "Skills", required: false },
  { id: "projects", label: "Projects", required: false },
  { id: "achievements", label: "Achievements", required: false },
  { id: "languages", label: "Languages", required: false },
  { id: "references", label: "References", required: false },
];

export default function CVBuilder({
  cvData,
  onUpdateCVData,
  onPreview,
}: CVBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);

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

  const handleSave = () => {
    try {
      localStorage.setItem("cvData", JSON.stringify(cvData));
      alert("✅ CV saved successfully!");
    } catch (err) {
      console.error("Error saving CV:", err);
      alert("❌ Failed to save CV. Check console for details.");
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onPreview();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goHome = () => {
    window.location.href = "/";
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "personal":
        return (
          <PersonalInfoForm
            data={cvData.personalInfo}
            onChange={(personalInfo) =>
              onUpdateCVData({ ...cvData, personalInfo })
            }
          />
        );
      case "education":
        return (
          <EducationForm
            data={cvData.education}
            onChange={(education) =>
              onUpdateCVData({ ...cvData, education })
            }
          />
        );
      case "experience":
        return (
          <ExperienceForm
            data={cvData.experience}
            onChange={(experience) =>
              onUpdateCVData({ ...cvData, experience })
            }
          />
        );
      case "volunteer":
        return (
          <VolunteerForm
            data={cvData.volunteerWork}
            onChange={(volunteerWork) =>
              onUpdateCVData({ ...cvData, volunteerWork })
            }
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
            onChange={(projects) =>
              onUpdateCVData({ ...cvData, projects })
            }
          />
        );
      case "achievements":
        return (
          <AchievementsForm
            data={cvData.achievements}
            onChange={(achievements) =>
              onUpdateCVData({ ...cvData, achievements })
            }
          />
        );
      case "languages":
        return (
          <LanguagesForm
            data={cvData.languages || []}
            onChange={(languages) => onUpdateCVData({ ...cvData, languages })}
          />
        );
      case "references":
        return (
          <ReferencesForm
            data={cvData.references}
            onChange={(references) =>
              onUpdateCVData({ ...cvData, references })
            }
          />
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    if (steps[currentStep].id === "personal") {
      return cvData.personalInfo.fullName && cvData.personalInfo.email;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-white text-[#1E3A8A]">
      {/* Top Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-4 gap-2 sm:gap-0">
          <button
            onClick={goHome}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium w-full sm:w-auto justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Home</span>
          </button>

          <h1 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">
            CV Builder
          </h1>

          <div className="flex space-x-2 w-full sm:w-auto justify-center">
            <button
              onClick={onPreview}
              className="flex items-center space-x-2 px-4 py-2 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#2A4EB0] transition-colors flex-1 justify-center"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors flex-1 justify-center"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Stepper & Forms */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8">
        {/* Stepper */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {steps.map((step, index) => (
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
                {step.required && <span className="text-red-400 ml-1">*</span>}
              </button>
              {index < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-[#A0C4FF] mx-1 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#D1D5DB] p-4 sm:p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1E3A8A] mb-2">
              {steps[currentStep].label}
            </h2>
            <p className="text-[#3B82F6] text-sm sm:text-base">
              {steps[currentStep].required
                ? "This section is required"
                : "This section is optional - leave blank to exclude from your CV"}
            </p>
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
            <span>
              {currentStep === steps.length - 1 ? "Preview CV" : "Next"}
            </span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

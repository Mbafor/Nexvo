import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, AlertCircle, Lightbulb, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CVData } from '../types/cv';
import { ValidationResult } from '../utils/cvValidator';

// Import all form components
import PersonalInfoForm from './forms/PersonalInfoForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import VolunteerForm from './forms/VolunteerForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import AchievementsForm from './forms/AchievementsForm';
import LanguagesForm from './forms/LanguagesForm';
import ReferencesForm from './forms/ReferencesForm';
import HobbiesForm from './forms/HobbiesForm';
import CertificationsForm from './forms/CertificationsForm';

interface CollapsibleSection {
  id: string;
  label: string; 
  required: boolean;
  icon: React.ElementType;
  description: string;
}

interface CollapsibleSectionsProps {
  sections: CollapsibleSection[];
  cvData: CVData;
  onUpdateCVData: (data: CVData) => void;
  validationResults: Record<string, ValidationResult>;
  getCompletionStatus: (sectionId: string) => boolean;
}

export default function CollapsibleSections({
  sections,
  cvData,
  onUpdateCVData,
  validationResults,
  getCompletionStatus
}: CollapsibleSectionsProps) {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['personal']));
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
      const newExpandedTips = new Set(expandedTips);
      newExpandedTips.delete(sectionId);
      setExpandedTips(newExpandedTips);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleTips = (sectionId: string) => {
    const newExpandedTips = new Set(expandedTips);
    if (newExpandedTips.has(sectionId)) {
      newExpandedTips.delete(sectionId);
    } else {
      newExpandedTips.add(sectionId);
    }
    setExpandedTips(newExpandedTips);
  };

  // Helper to get tips from i18n resources
  const getSectionTips = (sectionId: string): string[] => {
    // Ensure returnObjects is true to get the array
    const tips = t(`tips.${sectionId}`, { returnObjects: true }) as unknown;
    if (Array.isArray(tips)) {
      return tips.filter((tip): tip is string => typeof tip === 'string');
    }
    return [];
  };

  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
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
      case "references":
        return (
          <ReferencesForm
            data={cvData.references || []}
            onChange={(references) => onUpdateCVData({ ...cvData, references })}
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
      default:
        return (
          <div className="text-gray-500 text-center py-8">
            {t('builder.sections.notFound')}
          </div>
        );
    }
  };

  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const isExpanded = expandedSections.has(section.id);
        const isCompleted = getCompletionStatus(section.id);
        const validationResult = validationResults[section.id];
        const hasErrors = validationResult?.errors?.length > 0;
        const hasWarnings = validationResult?.warnings?.length > 0;
        const Icon = section.icon;
        
        // Retrieve tips via i18n
        const tips = getSectionTips(section.id);

        return (
          <div
            key={section.id}
            className={`bg-white rounded-xl shadow-sm border transition-all duration-200 ${
              isExpanded 
                ? 'border-blue-200 shadow-md' 
                : hasErrors 
                ? 'border-red-200' 
                : isCompleted 
                ? 'border-green-200' 
                : 'border-gray-200'
            }`}
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1">
                <Icon className={`h-5 w-5 flex-shrink-0 ${
                  isCompleted 
                    ? 'text-green-600' 
                    : hasErrors 
                    ? 'text-red-500' 
                    : 'text-gray-400'
                }`} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {/* We translate the label here in case the prop passed isn't translated */}
                      {t(`builder.sections.${section.id}.label`, section.label)}
                      {section.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </h3>
                    
                    {/* Status indicators */}
                    <div className="flex items-center space-x-1">
                      {isCompleted && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                      {hasErrors && (
                        <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      )}
                      {hasWarnings && !hasErrors && (
                        <AlertCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 truncate mt-1">
                     {/* We translate the description here */}
                     {t(`builder.sections.${section.id}.description`, section.description)}
                  </p>

                  {/* Validation summary */}
                  {validationResult && (
                    <div className="flex items-center space-x-2 mt-2">
                      {hasErrors && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          {t('builder.validation.requiredCount', { count: validationResult.errors.length })}
                        </span>
                      )}
                      {hasWarnings && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                          {t('builder.validation.tipsCount', { count: validationResult.warnings.length })}
                        </span>
                      )}
                      {validationResult.suggestions?.length > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {t('builder.validation.suggestionsCount', { count: validationResult.suggestions.length })}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Expand/collapse icon */}
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 ml-2"
              >
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </motion.div>
            </button>

            {/* Section Content */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-100 p-4">
                    {/* Tips Section */}
                    {tips.length > 0 && (
                      <div className="mb-6">
                        <button
                          onClick={() => toggleTips(section.id)}
                          className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                        >
                          <div className="flex items-center space-x-2">
                            <Lightbulb className="h-4 w-4 text-blue-700" />
                            <span className="text-sm font-medium text-blue-700">
                              {t('builder.tips.title')}
                            </span>
                            <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded-full">
                              {tips.length}
                            </span>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedTips.has(section.id) ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4 text-blue-700" />
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {expandedTips.has(section.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 p-4 bg-white border border-blue-200 rounded-lg">
                                <div className="space-y-3">
                                  {tips.map((tip, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Error messages */}
                    {hasErrors && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="text-sm font-medium text-red-800 mb-2">
                          {t('builder.validation.requiredFieldsTitle')}
                        </h4>
                        <ul className="text-xs text-red-700 space-y-1">
                          {validationResult.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Form content */}
                    {renderSectionContent(section.id)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
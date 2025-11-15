// Enhanced Progress Indicator Component
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Import added

interface ProgressEnhancementProps {
  sections: Array<{
    id: string;
    label: string;
    required: boolean;
    completed: boolean;
    hasErrors: boolean;
  }>;
  currentStep: number;
  onStepClick: (index: number) => void;
}

export default function ProgressEnhancement({ 
  sections, 
  currentStep, 
  onStepClick 
}: ProgressEnhancementProps) {
  const { t } = useTranslation(); // Hook initialized
  const completedSections = sections.filter(s => s.completed).length;
  const totalSections = sections.length;
  const progressPercentage = (completedSections / totalSections) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">
            {t('progressEnhancement.header.title')}
          </h3>
          <span className="text-sm font-medium text-blue-700">
            {t('progressEnhancement.header.percentComplete', { percent: Math.round(progressPercentage) })}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {t('progressEnhancement.header.sectionsCompleted', { completed: completedSections, total: totalSections })}
        </p>
      </div>

      {/* Section Progress */}
      <div className="space-y-2">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => onStepClick(index)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              index === currentStep
                ? 'bg-blue-50 border border-blue-200'
                : section.completed
                ? 'bg-white hover:bg-white'
                : section.hasErrors
                ? 'bg-red-50 hover:bg-red-100'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center space-x-3">
              {section.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : section.hasErrors ? (
                <AlertCircle className="h-5 w-5 text-red-600" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
              <div className="text-left">
                <p className={`font-medium ${
                  index === currentStep ? 'text-black-600' : 'text-gray-900'
                }`}>
                  {/* Try to find a specific label translation, fallback to the prop */}
                  {t(`progressEnhancement.sections.${section.id}`, section.label)}
                  {section.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {section.hasErrors && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  {t('progressEnhancement.status.fixErrors')}
                </span>
              )}
              {section.completed && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  {t('progressEnhancement.status.complete')}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <button className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            {t('progressEnhancement.actions.saveDraft')}
          </button>
          <button className="flex-1 px-3 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors">
            {t('progressEnhancement.actions.preview')}
          </button>
        </div>
      </div>
    </div>
  );
}
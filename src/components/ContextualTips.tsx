import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Import added
import { 
  Lightbulb, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Sparkles,
  X,
  ChevronDown
} from 'lucide-react';
import { ValidationResult } from '../utils/cvValidator';

interface ContextualTipsProps {
  sectionId: string;
  sectionLabel: string;
  validationResult?: ValidationResult;
  staticTips?: string[];
}

interface TipCategory {
  type: 'error' | 'warning' | 'suggestion' | 'tip';
  icon: typeof AlertCircle;
  items: string[];
  color: string;
  bgColor: string;
  title: string;
}

export default function ContextualTips({ 
  sectionId, 
  sectionLabel, 
  validationResult, 
  staticTips = [] 
}: ContextualTipsProps) {
  const { t } = useTranslation(); // Hook initialized
  const [isExpanded, setIsExpanded] = useState(false);
  const [dismissedTips, setDismissedTips] = useState<Set<string>>(new Set());

  const getSmartTips = (): string[] => {
    const tips: string[] = [];

    switch (sectionId) {
      case 'personal':
        if (validationResult?.completionScore && validationResult.completionScore < 50) {
          tips.push(t('contextualTips.smartTips.personal.completion'));
        }
        tips.push(t('contextualTips.smartTips.personal.phone'));
        tips.push(t('contextualTips.smartTips.personal.linkedin'));
        break;
      
      case 'experience':
        if (validationResult?.completionScore && validationResult.completionScore < 70) {
          tips.push(t('contextualTips.smartTips.experience.actionVerbs'));
          tips.push(t('contextualTips.smartTips.experience.metrics'));
        }
        tips.push(t('contextualTips.smartTips.experience.reverseChronological'));
        break;
      
      case 'education':
        tips.push(t('contextualTips.smartTips.education.coursework'));
        tips.push(t('contextualTips.smartTips.education.certifications'));
        break;
      
      case 'skills':
        if (validationResult?.completionScore && validationResult.completionScore < 60) {
          tips.push(t('contextualTips.smartTips.skills.balance'));
          tips.push(t('contextualTips.smartTips.skills.keywords'));
        }
        tips.push(t('contextualTips.smartTips.skills.proficiency'));
        break;
      
      default:
        tips.push(t('contextualTips.smartTips.default.ats'));
    }

    return tips.filter(tip => !dismissedTips.has(tip));
  };

  const categories: TipCategory[] = [
    {
      type: 'error' as const,
      icon: AlertCircle,
      items: validationResult?.errors || [],
      color: 'text-red-700',
      bgColor: 'bg-red-50 border-red-200',
      title: t('contextualTips.categories.required')
    },
    {
      type: 'warning' as const,
      icon: Info,
      items: validationResult?.warnings || [],
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 border-blue-200',
      title: t('contextualTips.categories.recommendations')
    },
    {
      type: 'suggestion' as const,
      icon: Lightbulb,
      items: validationResult?.suggestions || [],
      color: 'text-black',
      bgColor: 'bg-blue-50 border-blue-200',
      title: t('contextualTips.categories.proTips')
    },
    {
      type: 'tip' as const,
      icon: Sparkles,
      items: [...getSmartTips(), ...staticTips],
      color: 'text-black',
      bgColor: 'bg-blue-50 border-blue-200',
      title: t('contextualTips.categories.smartSuggestions')
    }
  ].filter(category => category.items.length > 0);

  const dismissTip = (tip: string) => {
    setDismissedTips(prev => new Set([...prev, tip]));
  };

  if (categories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
      >
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="h-5 w-5 text-blue-700" />
          <span className="font-medium text-blue-700">
            {t('contextualTips.success.title', { section: sectionLabel })}
          </span>
        </div>
        <p className="text-blue-700 text-sm mt-1">
          {t('contextualTips.success.description')}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden"
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-2">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {t('contextualTips.header.title', { section: sectionLabel })}
            </h3>
            <p className="text-sm text-gray-600">
              {t('contextualTips.header.count', { count: categories.reduce((sum, cat) => sum + cat.items.length, 0) })}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </motion.div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200"
          >
            <div className="p-4 space-y-4">
              {categories.map((category) => (
                <motion.div
                  key={category.type}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`rounded-lg border p-3 ${category.bgColor}`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <category.icon className={`h-4 w-4 ${category.color}`} />
                    <h4 className={`font-medium text-sm ${category.color}`}>
                      {category.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full bg-white ${category.color}`}>
                      {category.items.length}
                    </span>
                  </div>
                  
                  <ul className="space-y-2">
                    {category.items.map((item, index) => (
                      <motion.li
                        key={`${category.type}-${index}`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start justify-between group"
                      >
                        <div className="flex items-start space-x-2 flex-1">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                            category.type === 'error' ? 'bg-red-500' :
                            category.type === 'warning' ? 'bg-blue-500' :
                            category.type === 'suggestion' ? 'bg-black' :
                            'bg-blue-700'
                          }`} />
                          <span className={`text-sm leading-relaxed ${category.color}`}>
                            {item}
                          </span>
                        </div>
                        
                        {category.type === 'tip' && (
                          <button
                            onClick={() => dismissTip(item)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white rounded"
                            title={t('contextualTips.actions.dismiss')}
                          >
                            <X className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                          </button>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [dismissedTips, setDismissedTips] = useState<Set<string>>(new Set());

  const getSmartTips = (): string[] => {
    const tips: string[] = [];

    switch (sectionId) {
      case 'personal':
        if (validationResult?.completionScore && validationResult.completionScore < 50) {
          tips.push('A complete personal section increases your chances of getting noticed by 40%');
        }
        tips.push('Include your phone number - 85% of recruiters prefer to call first');
        tips.push('Adding a LinkedIn profile increases profile views by 2.5x');
        break;
      
      case 'experience':
        if (validationResult?.completionScore && validationResult.completionScore < 70) {
          tips.push('Use action verbs like "achieved," "led," "improved" to start bullet points');
          tips.push('Include numbers and metrics - "increased sales by 25%" is more impactful');
        }
        tips.push('List experience in reverse chronological order (most recent first)');
        break;
      
      case 'education':
        tips.push('Include relevant coursework only if you\'re a recent graduate');
        tips.push('Add certifications here if you don\'t have a separate section');
        break;
      
      case 'skills':
        if (validationResult?.completionScore && validationResult.completionScore < 60) {
          tips.push('Include both technical and soft skills for a well-rounded profile');
          tips.push('Tailor skills to match the job description keywords');
        }
        tips.push('List skills by proficiency level to help recruiters understand your strengths');
        break;
      
      default:
        tips.push('Complete sections improve your CV\'s ATS compatibility score');
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
      title: 'Required Fields'
    },
    {
      type: 'warning' as const,
      icon: Info,
      items: validationResult?.warnings || [],
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 border-blue-200',
      title: 'Recommendations'
    },
    {
      type: 'suggestion' as const,
      icon: Lightbulb,
      items: validationResult?.suggestions || [],
      color: 'text-black',
      bgColor: 'bg-blue-50 border-blue-200',
      title: 'Pro Tips'
    },
    {
      type: 'tip' as const,
      icon: Sparkles,
      items: [...getSmartTips(), ...staticTips],
      color: 'text-black',
      bgColor: 'bg-blue-50 border-blue-200',
      title: 'Smart Suggestions'
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
          <CheckCircle2 className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-blue-800">
            Great work on your {sectionLabel} section!
          </span>
        </div>
        <p className="text-blue-700 text-sm mt-1">
          Your section looks complete. You can move on to the next section or preview your CV.
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
              Tips for {sectionLabel}
            </h3>
            <p className="text-sm text-gray-600">
              {categories.reduce((sum, cat) => sum + cat.items.length, 0)} suggestions available
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
                            'bg-blue-600'
                          }`} />
                          <span className={`text-sm leading-relaxed ${category.color}`}>
                            {item}
                          </span>
                        </div>
                        
                        {category.type === 'tip' && (
                          <button
                            onClick={() => dismissTip(item)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white rounded"
                            title="Dismiss tip"
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

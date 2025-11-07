import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles, FileText, Eye } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  icon: React.ElementType;
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function OnboardingTour({ isOpen, onClose, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  const tourSteps: TourStep[] = [
    {
      id: 'welcome',
      title: '🎉 Welcome to QuickCV Builder!',
      content: 'Let\'s take a quick tour to help you create your perfect CV in minutes. This guided tour will show you all the key features.',
      position: 'center',
      icon: Sparkles
    },
    {
      id: 'navigation',
      title: '🧭 Easy Navigation',
      content: 'This section shows your current progress and allows you to navigate between CV sections. Use the Previous/Next buttons to move through your CV creation process.',
      target: 'section-navigation',
      position: 'bottom',
      icon: ChevronRight
    },
    {
      id: 'sections',
      title: '📊 Track Your Progress',
      content: 'Here you can see all available CV sections. Green checkmarks show completed sections, and you can click any section to jump to it instantly.',
      target: 'progress-sections',
      position: 'left',
      icon: FileText
    },
    {
      id: 'preview',
      title: '👁️ Preview & Download',
      content: 'Preview your CV anytime to see how it looks. When ready, you can download it as PDF or Word document.',
      target: 'preview-button',
      position: 'left',
      icon: Eye
    }
  ];

  const currentTourStep = tourSteps[currentStep];

  // Find target element when step changes
  useEffect(() => {
    if (currentTourStep.target) {
      const element = document.getElementById(currentTourStep.target) || 
                    document.querySelector(`[data-tour="${currentTourStep.target}"]`) ||
                    document.querySelector(`.${currentTourStep.target}`);
      setTargetElement(element as HTMLElement);
    } else {
      setTargetElement(null);
    }
  }, [currentStep, currentTourStep.target]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onComplete();
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onClose();
  };

  // Get tooltip position
  const getTooltipPosition = () => {
    if (!targetElement || currentTourStep.position === 'center') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'fixed' as const
      };
    }

    const rect = targetElement.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    const isSmallMobile = window.innerWidth < 480;
    
    // Responsive tooltip sizing - more compact
    const tooltipWidth = isSmallMobile ? Math.min(300, window.innerWidth - 32) : 
                       isMobile ? Math.min(340, window.innerWidth - 48) : 
                       Math.min(380, window.innerWidth - 80);
    const tooltipHeight = isSmallMobile ? 280 : isMobile ? 300 : 260;
    const padding = isMobile ? 16 : 24;

    let top = 0;
    let left = 0;

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    if (isMobile) {
      // Mobile: Always position for optimal visibility
      // Check if element is in sidebar (for CVBuilder layout)
      const isInSidebar = rect.left < viewportWidth * 0.3;
      
      if (isInSidebar) {
        // Element is in sidebar, place tooltip to the right if space allows
        if (rect.right + tooltipWidth + padding < viewportWidth) {
          left = rect.right + padding;
          top = Math.max(padding, Math.min(
            viewportHeight - tooltipHeight - padding,
            rect.top + (rect.height / 2) - (tooltipHeight / 2)
          ));
        } else {
          // Not enough space to the right, center horizontally
          left = Math.max(padding, (viewportWidth - tooltipWidth) / 2);
          top = rect.bottom + padding > viewportHeight / 2 
            ? Math.max(padding, rect.top - tooltipHeight - padding)
            : Math.min(viewportHeight - tooltipHeight - padding, rect.bottom + padding);
        }
      } else {
        // Element is in main content, position based on vertical space
        left = Math.max(padding, (viewportWidth - tooltipWidth) / 2);
        if (rect.top > viewportHeight / 2) {
          // Element in bottom half, place tooltip above
          top = Math.max(padding, rect.top - tooltipHeight - padding);
        } else {
          // Element in top half, place tooltip below
          top = Math.min(viewportHeight - tooltipHeight - padding, rect.bottom + padding);
        }
      }
    } else {
      // Desktop positioning - more precise
      switch (currentTourStep.position) {
        case 'top':
          top = Math.max(80, rect.top - tooltipHeight - padding);
          left = Math.max(padding, Math.min(
            viewportWidth - tooltipWidth - padding,
            rect.left + (rect.width / 2) - (tooltipWidth / 2)
          ));
          break;
        case 'bottom':
          top = Math.min(viewportHeight - tooltipHeight - 80, rect.bottom + padding);
          left = Math.max(padding, Math.min(
            viewportWidth - tooltipWidth - padding,
            rect.left + (rect.width / 2) - (tooltipWidth / 2)
          ));
          break;
        case 'left':
          top = Math.max(80, Math.min(
            viewportHeight - tooltipHeight - 80,
            rect.top + (rect.height / 2) - (tooltipHeight / 2)
          ));
          left = Math.max(padding, rect.left - tooltipWidth - padding);
          // If not enough space on left, try right
          if (left < padding) {
            left = Math.min(viewportWidth - tooltipWidth - padding, rect.right + padding);
          }
          break;
        case 'right':
          top = Math.max(80, Math.min(
            viewportHeight - tooltipHeight - 80,
            rect.top + (rect.height / 2) - (tooltipHeight / 2)
          ));
          left = Math.min(viewportWidth - tooltipWidth - padding, rect.right + padding);
          // If not enough space on right, try left
          if (left + tooltipWidth > viewportWidth - padding) {
            left = Math.max(padding, rect.left - tooltipWidth - padding);
          }
          break;
      }
    }

    // Final safety checks
    if (top < padding) top = padding;
    if (top + tooltipHeight > viewportHeight - padding) {
      top = viewportHeight - tooltipHeight - padding;
    }
    if (left < padding) left = padding;
    if (left + tooltipWidth > viewportWidth - padding) {
      left = viewportWidth - tooltipWidth - padding;
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
      position: 'fixed' as const,
      width: `${tooltipWidth}px`,
      maxHeight: `${Math.min(tooltipHeight, viewportHeight - 40)}px`
    };
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay - simple dark background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleSkip}
          />

          {/* Highlight target element - subtle glow */}
          {targetElement && currentTourStep.position !== 'center' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed z-50 pointer-events-none border-2 border-blue-500/60 rounded-lg bg-blue-50/20"
              style={{
                top: targetElement.getBoundingClientRect().top - 6,
                left: targetElement.getBoundingClientRect().left - 6,
                width: targetElement.getBoundingClientRect().width + 12,
                height: targetElement.getBoundingClientRect().height + 12,
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.15)'
              }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Tour Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed z-[100] bg-white backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            style={getTooltipPosition()}
            onClick={(e) => e.stopPropagation()}
            transition={{ type: "spring", duration: 0.4 }}
          >
            {/* Header */}
            <div className="p-4 sm:p-6 pb-3 sm:pb-4">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-2 rounded-lg flex-shrink-0">
                    <currentTourStep.icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-tight">
                      {currentTourStep.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Step {currentStep + 1} of {tourSteps.length}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSkip}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-slate-100 transition-colors flex-shrink-0 touch-manipulation"
                  aria-label="Close tour"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 mb-3 sm:mb-4">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex-1 overflow-y-auto">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base"
              >
                {currentTourStep.content}
              </motion.p>

              {/* Navigation - Mobile optimized */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors min-h-[48px] font-medium text-sm touch-manipulation ${
                    currentStep === 0
                      ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 active:bg-gray-200'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleSkip}
                  className="px-4 py-3 text-sm text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors min-h-[48px] font-medium active:bg-slate-200 touch-manipulation order-last sm:order-none"
                >
                  Skip Tour
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 min-h-[48px] font-medium shadow-sm hover:shadow-md active:scale-95 touch-manipulation"
                >
                  <span className="text-sm font-medium">
                    {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                  </span>
                  {currentStep < tourSteps.length - 1 && <ChevronRight className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Arrow pointer for non-center positions - only on desktop for clarity */}
            {targetElement && currentTourStep.position !== 'center' && window.innerWidth >= 768 && (
              <div
                className={`absolute w-3 h-3 bg-white border-gray-200 transform rotate-45 ${
                  currentTourStep.position === 'top' ? 'bottom-[-6px] left-1/2 -translate-x-1/2 border-r border-b' :
                  currentTourStep.position === 'bottom' ? 'top-[-6px] left-1/2 -translate-x-1/2 border-l border-t' :
                  currentTourStep.position === 'left' ? 'right-[-6px] top-1/2 -translate-y-1/2 border-t border-r' :
                  'left-[-6px] top-1/2 -translate-y-1/2 border-b border-l'
                }`}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
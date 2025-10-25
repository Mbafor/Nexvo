import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Download, 
  FolderOpen,
  ArrowRight,
  Star,
  Trophy,
  X
} from 'lucide-react';

interface CompletionCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  completionPercentage: number;
  completedSections: number;
  totalSections: number;
  onPreview: () => void;
  onDownload?: () => void;
  onDashboard: () => void;
  milestone: 100; // Only show for 100% completion
}

const milestoneMessages = {
  100: {
    title: "CV Complete! �",
    subtitle: "Ready to download and apply",
    description: "Your professional CV is ready. Download it or save to dashboard for future use.",
    emoji: "✅"
  }
};

export default function CompletionCelebration({
  isOpen,
  onClose,
  completionPercentage,
  completedSections,
  totalSections,
  onPreview,
  onDownload,
  onDashboard,
  milestone
}: CompletionCelebrationProps) {
  const showConfetti = true;
  const message = milestoneMessages[milestone];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden relative"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Confetti Animation Background */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    initial={{
                      x: Math.random() * 400,
                      y: -10,
                      rotate: 0,
                      scale: 0
                    }}
                    animate={{
                      y: 400,
                      rotate: 360,
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                ))}
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-center">
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
              >
                {message.emoji}
              </motion.div>
              
              <motion.h2
                className="text-2xl font-bold text-slate-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {message.title}
              </motion.h2>
              
              <motion.p
                className="text-slate-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {message.subtitle}
              </motion.p>

              {/* Progress Circle */}
              <motion.div
                className="relative mx-auto w-24 h-24 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-200"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className="text-blue-600"
                    initial={{ strokeDasharray: "0 251.2" }}
                    animate={{ strokeDasharray: `${(completionPercentage / 100) * 251.2} 251.2` }}
                    transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">{completionPercentage}%</span>
                </div>
              </motion.div>

              <motion.p
                className="text-sm text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {completedSections} of {totalSections} sections complete
              </motion.p>
            </div>

            {/* Content */}
            <div className="p-6">
              <motion.p
                className="text-slate-700 text-center mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {message.description}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {/* Primary Actions */}
                <div className="flex space-x-3">
                  <motion.button
                    onClick={onPreview}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="h-4 w-4" />
                    <span>Preview CV</span>
                  </motion.button>
                  
                  {milestone === 100 && onDownload && (
                    <motion.button
                      onClick={onDownload}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </motion.button>
                  )}
                </div>

                {/* Dashboard Invitation */}
                {milestone >= 50 && (
                  <motion.div
                    className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <FolderOpen className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">
                          {milestone === 100 ? 'Save to Dashboard' : 'Explore Dashboard'}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {milestone === 100 
                            ? 'Manage multiple CVs, track applications, and create new ones'
                            : 'See your progress and manage multiple CV versions'
                          }
                        </p>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={onDashboard}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>
                        {milestone === 100 ? 'Go to Dashboard' : 'Preview Dashboard'}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                )}

                {/* Continue Building */}
                {milestone < 100 && (
                  <motion.button
                    onClick={onClose}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Continue Building</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                )}
              </motion.div>
            </div>

            {/* Achievement Badges for 100% */}
            {milestone === 100 && (
              <motion.div
                className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 border-t border-orange-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center justify-center space-x-4 text-orange-600">
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-medium">CV Complete</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">Ready to Apply</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
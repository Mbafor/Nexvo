import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, 
  ArrowRight, 
  Sparkles, 
  Clock,
  FileText,
  X,
  ChevronRight
} from 'lucide-react';

interface NavigationHelperProps {
  isVisible: boolean;
  onClose: () => void;
  onDashboard: () => void;
  currentProgress: number;
  savedCVs?: Array<{
    id: string;
    name: string;
    progress: number;
    lastModified: Date;
  }>;
}

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  color: string;
}

export default function NavigationHelper({
  isVisible,
  onClose,
  onDashboard,
  currentProgress,
  savedCVs = []
}: NavigationHelperProps) {

  const quickActions: QuickAction[] = [
    {
      id: 'dashboard',
      label: 'Go to Dashboard',
      description: 'Manage all your CVs and track applications',
      icon: FolderOpen,
      action: onDashboard,
      color: 'blue'
    },
    {
      id: 'templates',
      label: 'Try New Template',
      description: 'Start fresh with a different CV style',
      icon: Sparkles,
      action: () => {
        // Navigate to template selection
        console.log('Navigate to templates');
      },
      color: 'purple'
    },
    {
      id: 'recent',
      label: 'Continue Recent',
      description: 'Pick up where you left off',
      icon: Clock,
      action: () => {
        // Load most recent CV
        console.log('Load recent CV');
      },
      color: 'green'
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-40 w-80"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">What's Next?</h3>
                  <p className="text-sm text-slate-600">Your CV is {currentProgress}% complete</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white/50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="p-4 bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-600">Current Progress</span>
                <span className="text-xs font-medium text-slate-900">{currentProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${currentProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4">
              <h4 className="font-medium text-slate-900 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.id}
                      onClick={action.action}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors hover:scale-[1.02] ${
                        action.color === 'blue' 
                          ? 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700'
                          : action.color === 'purple'
                          ? 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700'
                          : 'bg-green-50 border-green-200 hover:bg-green-100 text-green-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <div className="text-left">
                          <p className="font-medium text-sm">{action.label}</p>
                          <p className="text-xs opacity-75">{action.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Recent CVs Preview */}
            {savedCVs.length > 0 && (
              <div className="p-4 border-t border-slate-200 bg-slate-50">
                <h4 className="font-medium text-slate-900 mb-3">Recent CVs</h4>
                <div className="space-y-2">
                  {savedCVs.slice(0, 2).map((cv) => (
                    <div
                      key={cv.id}
                      className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{cv.name}</p>
                          <p className="text-xs text-slate-500">
                            {cv.progress}% • {cv.lastModified.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => console.log('Load CV:', cv.id)}
                        className="p-1 text-slate-400 hover:text-blue-600 rounded"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  
                  {savedCVs.length > 2 && (
                    <button
                      onClick={onDashboard}
                      className="w-full text-center py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View all {savedCVs.length} CVs
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Dashboard Teaser */}
            <motion.div
              className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              whileHover={{ scale: 1.02 }}
            >
              <button
                onClick={onDashboard}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Unlock Full Dashboard</p>
                    <p className="text-sm opacity-90">
                      • Multiple CV management
                      • Application tracking
                      • Templates & analytics
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, FolderOpen, X } from 'lucide-react';

interface SubtleToastProps {
  message: string;
  type: 'success' | 'info' | 'dashboard' | 'hidden';
  duration?: number;
  onDashboard?: () => void;
  onDismiss?: () => void;
}

export default function SubtleToast({ 
  message, 
  type, 
  duration = 4000, 
  onDashboard, 
  onDismiss 
}: SubtleToastProps) {
  const [isVisible, setIsVisible] = useState(type !== 'hidden');

  useEffect(() => {
    if (type !== 'hidden' && type !== 'dashboard') {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [type, duration, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'dashboard':
        return <FolderOpen className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'dashboard':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -100, x: '-50%' }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4`}
        >
          <div className={`rounded-lg shadow-lg border p-4 ${getStyles()}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getIcon()}
                <span className="text-sm font-medium">{message}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {type === 'dashboard' && onDashboard && (
                  <button
                    onClick={onDashboard}
                    className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Go
                  </button>
                )}
                
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
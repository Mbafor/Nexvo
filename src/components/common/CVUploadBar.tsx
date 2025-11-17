import { useState } from 'react';
import { UploadCloud, Linkedin, AlertCircle, CheckCircle2, Loader2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// NOTE: Assuming external utility imports are correct.

interface CVUploadBarProps {
  onParsed: (data: any) => void;
  compact?: boolean;
}

export default function CVUploadBar({ onParsed, compact = false }: CVUploadBarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');

  // Consolidated loading state for button feedback
  const getButtonContent = (label: string, Icon: React.ElementType) => {
    if (isLoading) {
      return (
        <>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            <Loader2 className="h-4 w-4" />
          </motion.div>
          <span>Parsing...</span>
        </>
      );
    }
    return (
      <>
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </>
    );
  };

  const handleFile = async (file?: File) => {
    if (!file) return;
    setError(null); setSuccess(null); setIsLoading(true);
    try {
      // Logic for extractTextFromFile and parseTextToCV goes here
      await new Promise(resolve => setTimeout(resolve, 1500)); // MOCK
      onParsed({ name: file.name }); // MOCK
      setSuccess(`CV "${file.name}" imported successfully!`);
      setTimeout(() => setSuccess(null), 5000);
    } catch (err: any) {
      setError(err?.message || 'Failed to parse file. Please check format/size.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInImport = async () => {
    if (!linkedinUrl.trim()) {
      setError('Paste a valid LinkedIn profile URL to import.'); return;
    }
    setError(null); setSuccess(null); setIsLoading(true);
    try {
      // Server-side fetch and parsing logic goes here
      await new Promise(resolve => setTimeout(resolve, 1500)); // MOCK
      onParsed({ name: "LinkedIn Profile" }); // MOCK
      setLinkedinUrl('');
      setSuccess('LinkedIn profile imported successfully!');
      setTimeout(() => setSuccess(null), 5000);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch LinkedIn profile. Ensure the URL is public.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Helper Components for Clean UI ---

  const FileDropZone = ({ isCompact }: { isCompact: boolean }) => (
    <label 
      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${isCompact ? 'p-3 text-xs h-24' : 'p-6 text-sm h-32'} ${isLoading ? 'border-gray-300 bg-gray-50 text-gray-500' : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50/50 bg-white text-blue-700'} disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      <input
        type="file" accept=".txt,.pdf,.docx" onChange={(e) => handleFile(e.target.files?.[0])}
        disabled={isLoading} className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <UploadCloud className={`text-blue-500 ${isCompact ? 'h-4 w-4' : 'h-6 w-6'} mb-1`} />
      <p className={`font-medium ${isCompact ? 'text-sm' : 'text-base'}`}>{isLoading ? 'Processing File...' : 'Click or Drag & Drop CV File'}</p>
      <p className={`${isCompact ? 'text-xs' : 'text-sm text-gray-500'} mt-0.5`}>.pdf, .docx, .txt</p>
    </label>
  );

  const MessageComponent = ({ message, type }: { message: string, type: 'error' | 'success' }) => (
    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} 
      className={`mt-4 p-3 rounded-lg flex items-start space-x-2 ${type === 'error' ? 'bg-red-50 border border-red-300' : 'bg-green-50 border border-green-300'}`}>
      {type === 'error' ? <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" /> : <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />}
      <p className={`text-sm ${type === 'error' ? 'text-red-700' : 'text-green-700'}`}>{message}</p>
    </motion.div>
  );

  // --- COMPACT MODE RENDERING ---
  if (compact) {
    return (
      <div className="p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <UploadCloud className="h-4 w-4 text-gray-700" />
            <h4 className="text-sm font-semibold text-gray-900">Import</h4>
          </div>
          <button
            aria-expanded={expanded}
            onClick={() => setExpanded((s) => !s)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-50"
          >
            <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <div className="grid grid-cols-2 gap-4">
                {/* File Upload */}
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-2">
                    Upload CV File
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".txt,.pdf,.docx"
                      onChange={(e) => handleFile(e.target.files?.[0])}
                      disabled={isLoading}
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg text-xs file:mr-2 file:px-2 file:py-1 file:rounded file:bg-blue-600 file:text-white file:cursor-pointer file:border-0 hover:border-blue-400 transition-colors disabled:opacity-50"
                    />
                  </div>
                  <p className="text-xs text-gray-900 mt-1">Supports: .txt, .pdf, .docx</p>
                </div>

                {/* LinkedIn URL Import */}
                <div>
                  <label className="flex items-center space-x-1 text-xs font-medium text-gray-900 mb-2">
                    <Linkedin className="h-3 w-3" />
                    <span>LinkedIn Profile</span>
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="linkedin.com/in/profile"
                    disabled={isLoading}
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors disabled:opacity-50"
                  />
                  <button
                    onClick={handleLinkedInImport}
                    disabled={isLoading || !linkedinUrl.trim()}
                    className="w-full mt-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="inline-block">
                          <UploadCloud className="h-3 w-3" />
                        </motion.div>
                        <span>Importing...</span>
                      </>
                    ) : (
                      <>
                        <Linkedin className="h-3 w-3" />
                        <span>Import</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Messages */}
              {error && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700">{error}</p>
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-green-100 border border-green-300 rounded-lg flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-green-700">{success}</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- FULL MODE RENDERING (collapsible) ---
  return (
    <div className="p-6 mb-8 border border-gray-100 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <UploadCloud className="h-5 w-5 text-gray-600" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Import / Upload</h3>
          </div>
        </div>
        <button aria-expanded={expanded} onClick={() => setExpanded(s => !s)} className="p-2 rounded-md text-gray-700 hover:bg-gray-50">
          <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="h-5 w-5" />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <UploadCloud className="h-5 w-5 text-gray-600" />
                  <h3 className="text-sm font-semibold text-gray-900">1. Upload CV File</h3>
                </div>
                <FileDropZone isCompact={false} />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Linkedin className="h-5 w-5 text-gray-600" />
                  <h3 className="text-sm font-semibold text-gray-900">2. Import from LinkedIn</h3>
                </div>
                <div className="flex flex-col space-y-3">
                  <p className="text-sm text-gray-600">Paste your public LinkedIn profile URL below.</p>
                  <div className="flex space-x-3">
                    <input type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile" disabled={isLoading}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-lg text-base focus:border-blue-500 disabled:opacity-50"
                    />
                    <button onClick={handleLinkedInImport} disabled={isLoading || !linkedinUrl.trim()}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2 min-w-[150px]">
                      {getButtonContent('Import Profile', Linkedin)}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {error && <MessageComponent message={error} type="error" />}
            {success && <MessageComponent message={success} type="success" />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
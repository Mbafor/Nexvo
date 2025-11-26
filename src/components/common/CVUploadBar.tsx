import { useState, useRef } from 'react';
import { Upload, Linkedin, AlertCircle, CheckCircle2, Loader2, X, Link } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseTextToCV, parseURLToCV } from '../../utils/aiParser';
import { extractTextFromFile } from '../../utils/fileParser';

interface CVUploadBarProps {
  onParsed: (data: any) => void;
}

export default function CVUploadBar({ onParsed }: CVUploadBarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Modal State
  const [showLinkedinModal, setShowLinkedinModal] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- File Handlers ---
  const handleFileTrigger = () => {
    if (!isLoading) fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = ''; // Reset input
    
    // Validation
    const allowedTypes = ['.txt', '.pdf', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      setError(`Unsupported file type. Use: ${allowedTypes.join(', ')}`);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large (Max 10MB).');
      return;
    }
    
    processFile(file);
  };

  const processFile = async (file: File) => {
    setError(null); setSuccess(null); setIsLoading(true);
    console.log('🔍 Processing file:', file.name, 'Size:', file.size, 'Type:', file.type);
    
    try {
      console.log('📄 Extracting text from file...');
      const extractedText = await extractTextFromFile(file);
      console.log('📝 Extracted text length:', extractedText?.length);
      
      if (!extractedText || extractedText.trim().length < 50) {
        throw new Error('Could not read enough text from file. Please ensure the file contains readable CV content.');
      }
      
      console.log('🤖 Parsing CV data with AI...');
      const parsedData = await parseTextToCV(extractedText);
      console.log('✅ Parsed data:', {
        hasPersonalInfo: !!parsedData.personalInfo?.fullName,
        hasExperience: !!parsedData.experience?.length,
        hasEducation: !!parsedData.education?.length,
        hasSkills: !!parsedData.skills?.length
      });
      
      if (!parsedData.personalInfo?.fullName && !parsedData.experience?.length) {
        throw new Error('No CV data found in file. Please ensure the file contains proper CV/resume content.');
      }
      
      onParsed(parsedData);
      setSuccess(`Successfully imported "${file.name}" - Found ${Object.keys(parsedData).length} sections`);
      setTimeout(() => setSuccess(null), 5000);
    } catch (err: any) {
      console.error('❌ File processing error:', err);
      setError(err?.message || 'Failed to parse file. Please try a different file or format.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- LinkedIn Handlers ---
  const handleLinkedinSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!linkedinUrl.trim() || !linkedinUrl.includes('linkedin.com')) {
      setError('Please enter a valid LinkedIn URL (e.g., https://www.linkedin.com/in/username)');
      return;
    }

    setShowLinkedinModal(false); // Close modal
    setError(null); setSuccess(null); setIsLoading(true);
    console.log('🔗 Processing LinkedIn URL:', linkedinUrl);

    try {
      console.log('🤖 Parsing LinkedIn profile with AI...');
      const parsedData = await parseURLToCV(linkedinUrl);
      console.log('✅ LinkedIn parsed data:', {
        hasPersonalInfo: !!parsedData.personalInfo?.fullName,
        hasExperience: !!parsedData.experience?.length,
        hasEducation: !!parsedData.education?.length,
        hasSkills: !!parsedData.skills?.length
      });
      
      if (!parsedData.personalInfo?.fullName && !parsedData.experience?.length) {
        throw new Error('Could not extract profile data. Please ensure the LinkedIn profile is public and contains work experience.');
      }
      
      onParsed(parsedData);
      setSuccess(`LinkedIn profile imported successfully - Found ${Object.keys(parsedData).length} sections`);
      setLinkedinUrl('');
      setTimeout(() => setSuccess(null), 5000);
    } catch (err: any) {
      console.error('❌ LinkedIn parsing error:', err);
      setError(err?.message || 'Failed to import LinkedIn profile. Please ensure the profile is public and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8 w-full">
      {/* Main Split Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
        
        {/* FLEX ROW (Side by Side always) */}
        <div className="flex flex-row divide-x divide-slate-10000 h-32">
          
          {/* LEFT: Upload File */}
          <div 
            onClick={handleFileTrigger}
            className={`
              relative w-1/2 flex flex-col items-center justify-center p-4 cursor-pointer transition-colors group
              ${isLoading ? 'opacity-50 pointer-events-none' : 'hover:bg-indigo-50/30'}
            `}
          >
            <input type="file" ref={fileInputRef} hidden accept=".pdf,.docx,.txt" onChange={handleFileChange} />
            
            {isLoading ? (
              <Loader2 className="h-6 w-6 md:h-8 md:w-8 text-indigo-600 animate-spin mb-3" />
            ) : (
              <Upload className="h-6 w-6 md:h-8 md:w-8 text-slate-600 transition-colors mb-3" />
            )}
            
            <span className="text-xs md:text-sm font-medium text-slate-700 text-center leading-tight">
              {isLoading ? 'Parsing...' : 'Upload Resume'}
            </span>
            <span className="hidden md:block text-[10px] text-slate-400 mt-1">PDF, DOCX, TXT</span>
          </div>

          {/* RIGHT: Import LinkedIn (Triggers Modal) */}
          <div 
            onClick={() => !isLoading && setShowLinkedinModal(true)}
            className={`
              relative w-1/2 flex flex-col items-center justify-center p-4 cursor-pointer transition-colors group
              ${isLoading ? 'opacity-50 pointer-events-none' : 'hover:bg-indigo-50/30'}
            `}
          >
            <Linkedin className="h-6 w-6 md:h-8 md:w-8 text-slate-600 transition-colors mb-3" />
            <span className="text-xs md:text-sm font-medium text-slate-700 text-center leading-tight">
              Import LinkedIn
            </span>
            <span className="hidden md:block text-[10px] text-slate-400 mt-1">Public URL only</span>
          </div>
        </div>

        {/* Status Messages */}
        <AnimatePresence>
          {(error || success) && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className={`border-t ${error ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}
            >
              <div className="px-4 py-2 flex items-center gap-2 text-xs md:text-sm">
                {error ? <AlertCircle className="h-4 w-4 text-red-600" /> : <CheckCircle2 className="h-4 w-4 text-green-600" />}
                <span className={error ? 'text-red-700' : 'text-green-700'}>{error || success}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LINKEDIN POPUP MODAL */}
      <AnimatePresence>
        {showLinkedinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowLinkedinModal(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden z-10"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-[#0077b5]" />
                  Import from LinkedIn
                </h3>
                <button onClick={() => setShowLinkedinModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-slate-600 mb-4">
                  Paste the URL of your <strong>public</strong> LinkedIn profile below. We will extract your experience and education.
                </p>
                
                <form onSubmit={handleLinkedinSubmit}>
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      autoFocus
                      type="url"
                      required
                      placeholder="https://www.linkedin.com/in/username"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                    />
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <button 
                      type="button"
                      onClick={() => setShowLinkedinModal(false)}
                      className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-[#0077b5] hover:bg-[#006097] rounded-lg shadow-sm transition-colors"
                    >
                      Import Profile
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
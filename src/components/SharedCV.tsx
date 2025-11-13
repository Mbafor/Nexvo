import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CVData, TemplateType } from '../types/cv';
import { generatePDFBlob } from '../lib/pdfGenerator';
import { saveAs } from 'file-saver';
import { 
  Download, 
  ArrowLeft, 
  Eye, 
  FileText,
  ExternalLink,
  Copy,
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Calendar,
  Building,
  GraduationCap,
  Code,
  Briefcase,
 
  Languages,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CVDownloadRecord {
  id: string;
  userId: string;
  fileName: string;
  cvData: CVData;
  templateType: TemplateType;
  downloadedAt: Date;
  userEmail: string;
}

export default function SharedCV() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cvRecord, setCvRecord] = useState<CVDownloadRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (id) {
      loadSharedCV(id);
    }
  }, [id]);

  const loadSharedCV = async (cvId: string) => {
    try {
      console.log('🔗 Loading shared CV:', cvId);
      
      const docRef = doc(db, 'cv_downloads', cvId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const record: CVDownloadRecord = {
          id: docSnap.id,
          userId: data.userId,
          fileName: data.fileName,
          cvData: data.cvData,
          templateType: data.templateType,
          downloadedAt: data.downloadedAt.toDate(),
          userEmail: data.userEmail
        };
        
        setCvRecord(record);
        console.log('✅ Shared CV loaded successfully');
      } else {
        setError('CV not found or no longer available');
        console.error('❌ CV document not found');
      }
    } catch (error) {
      console.error('❌ Failed to load shared CV:', error);
      setError('Failed to load CV. Please check the link and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!cvRecord) return;
    
    setIsDownloading(true);
    try {
      console.log('📥 Downloading shared CV...');
      const blob = await generatePDFBlob(cvRecord.cvData, cvRecord.templateType);
      saveAs(blob, cvRecord.fileName);
      console.log('✅ CV downloaded successfully');
    } catch (error) {
      console.error('❌ Failed to download CV:', error);
      alert('Failed to download CV. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getTemplateDisplayName = (template: TemplateType): string => {
    const names: Record<TemplateType, string> = {
      modern: 'Modern',
      creative: 'Creative',
      ats: 'ATS-Friendly',
      executive: 'Executive',
      minimalist: 'Minimalist',
      tech: 'Tech'
    };
    return names[template] || template;
  };

  const getTemplateColor = (template: TemplateType): string => {
    const colors: Record<TemplateType, string> = {
      modern: 'bg-blue-100 text-blue-700',
      creative: 'bg-purple-100 text-purple-800',
      ats: 'bg-green-100 text-green-800',
      executive: 'bg-amber-100 text-amber-800',
      minimalist: 'bg-gray-100 text-gray-800',
      tech: 'bg-cyan-100 text-cyan-800'
    };
    return colors[template] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading shared CV...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FileText className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">CV Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go to Home</span>
            </button>
            <button
              onClick={() => navigate('/builder')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span>Create Your Own CV</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cvRecord) {
    return null;
  }

  const { cvData } = cvRecord;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </button>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h1 className="font-semibold text-gray-900">Shared CV</h1>
                  <p className="text-sm text-gray-500">View-only access</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopyLink}
                className={`flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg transition-colors ${
                  copySuccess ? 'bg-green-50 border-green-300 text-green-700' : 'hover:bg-gray-50'
                }`}
              >
                {copySuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CV Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* CV Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{cvRecord.fileName}</h2>
                <div className="flex items-center space-x-3 mt-1">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getTemplateColor(cvRecord.templateType)}`}>
                    {getTemplateDisplayName(cvRecord.templateType)} Template
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600 text-sm">
                    Created {formatDate(cvRecord.downloadedAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Shared by</p>
              <p className="font-medium text-gray-900">{cvData.personalInfo.fullName}</p>
            </div>
          </div>
        </motion.div>

        {/* CV Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-900">CV Preview</h3>
            <p className="text-gray-600 text-sm">Below is a preview of the shared CV content</p>
          </div>

          <div className="p-8">
            {/* Personal Info */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{cvData.personalInfo.fullName}</h1>
              <div className="flex flex-wrap justify-center gap-4 text-gray-600">
                {cvData.personalInfo.email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{cvData.personalInfo.email}</span>
                  </div>
                )}
                {cvData.personalInfo.phone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>{cvData.personalInfo.phone}</span>
                  </div>
                )}
                {cvData.personalInfo.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{cvData.personalInfo.location}</span>
                  </div>
                )}
                {cvData.personalInfo.linkedin && (
                  <div className="flex items-center space-x-1">
                    <Linkedin className="h-4 w-4" />
                    <span>{cvData.personalInfo.linkedin}</span>
                  </div>
                )}
                {cvData.personalInfo.website && (
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>{cvData.personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            {cvData.personalInfo.summary && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{cvData.personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            {cvData.experience && cvData.experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {cvData.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4">
                      <h3 className="font-semibold text-lg text-gray-900">{exp.jobTitle}</h3>
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <Building className="h-4 w-4" />
                        <span>{exp.company}</span>
                        {exp.startDate && (
                          <>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                            </div>
                          </>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {cvData.education && cvData.education.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </h2>
                <div className="space-y-4">
                  {cvData.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-green-200 pl-4">
                      <h3 className="font-semibold text-lg text-gray-900">{edu.degree}</h3>
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <span>{edu.institution}</span>
                        {edu.graduationDate && (
                          <>
                            <span>•</span>
                            <span>{edu.graduationDate}</span>
                          </>
                        )}
                        {edu.gpa && (
                          <>
                            <span>•</span>
                            <span>GPA: {edu.gpa}</span>
                          </>
                        )}
                      </div>
                      {edu.description && (
                        <p className="text-gray-700">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {cvData.skills && cvData.skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {cvData.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {skill.name}
                      {skill.level && skill.level !== 'Beginner' && (
                        <span className="ml-1 text-blue-700">• {skill.level}</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {cvData.projects && cvData.projects.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Projects
                </h2>
                <div className="space-y-4">
                  {cvData.projects.map((project, index) => (
                    <div key={index} className="border-l-2 border-purple-200 pl-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-700">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      {project.description && (
                        <p className="text-gray-700 mb-2">{project.description}</p>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {cvData.languages && cvData.languages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Languages className="h-5 w-5 mr-2" />
                  Languages
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {cvData.languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{lang.language}</span>
                      <span className="text-sm text-gray-600">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-12 p-6 bg-blue-50 rounded-xl text-center">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Impressed by this CV?</h3>
              <p className="text-blue-700 mb-4">Create your own professional CV with our easy-to-use builder</p>
              <button
                onClick={() => navigate('/builder')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Create Your CV</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
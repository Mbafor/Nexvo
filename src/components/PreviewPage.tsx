// src/components/PreviewPage.tsx

import { useState } from 'react';
import { ChevronLeft, Download } from 'lucide-react';
import { CVData, TemplateType } from '../types/cv';
import { PDFViewer } from '@react-pdf/renderer';
import { generatePDFBlob, getTemplate } from '../lib/pdfGenerator';
import { saveAs } from 'file-saver';

interface PreviewPageProps {
  cvData: CVData;
  onBack: () => void;
}

export default function PreviewPage({ cvData, onBack }: PreviewPageProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');

  const handleDownload = async () => {
    if (!cvData.personalInfo.fullName) {
      alert('Please provide your full name in Personal Info before downloading.');
      return;
    }

    try {
      const blob = await generatePDFBlob(cvData, selectedTemplate);
      saveAs(blob, `${cvData.personalInfo.fullName}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate CV. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1E3A8A]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Buttons */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
          >
            <ChevronLeft className="h-4 w-4 text-[#1E3A8A]" />
            <span>Back to Editor</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#2A4EB0] transition-colors font-semibold"
          >
            <Download className="h-5 w-5" />
            <span>Download CV</span>
          </button>
        </div>

        {/* Template Selection */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-3">Choose Your Template</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(['modern', 'creative', 'ats'] as TemplateType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedTemplate(type)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedTemplate === type
                    ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white'
                    : 'border-[#D1D5DB] bg-white hover:border-[#2A4EB0] hover:bg-[#EFF6FF]'
                }`}
              >
                <h3 className="font-bold text-lg mb-1">
                  {type === 'modern'
                    ? 'Modern'
                    : type === 'creative'
                    ? 'Creative'
                    : 'ATS-Friendly'}
                </h3>
                <p
                  className={`text-sm ${
                    selectedTemplate === type ? 'text-slate-200' : 'text-[#1E3A8A]'
                  }`}
                >
                  {type === 'modern'
                    ? 'Clean and professional with gradient header'
                    : type === 'creative'
                    ? 'Eye-catching two-column design with color'
                    : 'Simple format optimized for ATS systems'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* CV Preview using PDFViewer */}
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-inner overflow-auto border border-[#D1D5DB]" style={{ height: '80vh' }}>
          <PDFViewer style={{ width: '100%', height: '100%', border: 'none' }}>
            {getTemplate(selectedTemplate, cvData)}
          </PDFViewer>
        </div>
      </div>
    </div>
  );
}

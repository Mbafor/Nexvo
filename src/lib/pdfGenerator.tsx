// src/lib/pdfGenerator.ts
import { pdf } from '@react-pdf/renderer';
import { CVData, TemplateType } from '../types/cv';

// Import @react-pdf templates
import ModernTemplate from '../components/templates/ModernTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import ATSTemplate from '../components/templates/ATSTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import TechTemplate from '../components/templates/TechTemplate';

// ======================
// TEMPLATE SWITCHER
// ======================
export const getTemplate = (template: TemplateType, data: CVData) => {
  // Ensure all optional fields exist to prevent undefined errors
  const safeData: CVData = {
    ...data,
    languages: data.languages || [],
    skills: data.skills || [],
    experience: data.experience || [],
    education: data.education || [],
    projects: data.projects || [],
    volunteerWork: data.volunteerWork || [],
    achievements: data.achievements || [],
    references: data.references || [],
    certifications: data.certifications || [],
    hobbies: data.hobbies || [],
  };

  switch (template) {
    case 'modern':
      return <ModernTemplate data={safeData} />;
    case 'creative':
      return <CreativeTemplate data={safeData} />;
    case 'ats':
      return <ATSTemplate data={safeData} />;
    case 'executive':
      return <ExecutiveTemplate data={safeData} />;
    case 'minimalist':
      return <MinimalistTemplate data={safeData} />;
    case 'tech':
      return <TechTemplate data={safeData} />;
    default:
      return <ModernTemplate data={safeData} />;
  }
};

// ======================
// GENERATE BLOB
// ======================
export const generatePDFBlob = async (
  data: CVData,
  templateType: TemplateType
): Promise<Blob> => {
  const blob = await pdf(getTemplate(templateType, data)).toBlob();
  return blob;
};

// ======================
// TRIGGER DOWNLOAD
// ======================
export const downloadPDF = async (data: CVData, templateType: TemplateType) => {
  const blob = await generatePDFBlob(data, templateType);
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.personalInfo?.fullName || 'my-cv'}.pdf`;
  a.click();

  URL.revokeObjectURL(url);
};

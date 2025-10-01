// src/lib/pdfGenerator.ts
import { pdf } from '@react-pdf/renderer';
import { CVData, TemplateType } from '../types/cv';

// Import @react-pdf templates
import ModernTemplatePDF from '../components/templates/ModernTemplate';
import CreativeTemplatePDF from '../components/templates/CreativeTemplate';
import ATSTemplatePDF from '../components/templates/ATSTemplate';

// ======================
// TEMPLATE SWITCHER
// ======================
export const getTemplate = (template: TemplateType, data: CVData) => {
  // Ensure languages exists to prevent undefined errors
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
  };

  switch (template) {
    case 'modern':
      return <ModernTemplatePDF data={safeData} />;
    case 'creative':
      return <CreativeTemplatePDF data={safeData} />;
    case 'ats':
      return <ATSTemplatePDF data={safeData} />;
    default:
      return <ModernTemplatePDF data={safeData} />;
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

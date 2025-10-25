// Smart Validation System for CV Builder
import { CVData } from '../types/cv';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  completionScore: number;
}

export interface SectionValidation {
  [sectionId: string]: ValidationResult;
}

export class CVValidator {
  static validatePersonalInfo(personalInfo: CVData['personalInfo']): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    
    // Required fields
    if (!personalInfo.fullName?.trim()) {
      errors.push('Full name is required');
    }
    if (!personalInfo.email?.trim()) {
      errors.push('Email address is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Warnings for missing optional but important fields
    if (!personalInfo.phone?.trim()) {
      warnings.push('Phone number is recommended for better contact options');
    }
    if (!personalInfo.location?.trim()) {
      warnings.push('Location helps employers understand your availability');
    }
    
    // Professional summary suggestions
    if (!personalInfo.summary?.trim()) {
      suggestions.push('Add a professional summary to highlight your key strengths');
    } else if (personalInfo.summary.length < 50) {
      suggestions.push('Consider expanding your summary (aim for 2-3 sentences)');
    } else if (personalInfo.summary.length > 200) {
      warnings.push('Professional summary is quite long - consider condensing to 2-3 sentences');
    }
    
    // LinkedIn profile suggestion
    if (!personalInfo.linkedin?.trim()) {
      suggestions.push('Adding your LinkedIn profile increases credibility');
    }
    
    const completionScore = this.calculateCompletionScore({
      fullName: personalInfo.fullName,
      email: personalInfo.email,
      phone: personalInfo.phone,
      location: personalInfo.location,
      summary: personalInfo.summary,
      linkedin: personalInfo.linkedin,
      website: personalInfo.website
    });
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      completionScore
    };
  }
  
  static validateExperience(experience: CVData['experience']): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    
    if (!experience || experience.length === 0) {
      suggestions.push('Add work experience to strengthen your CV');
    } else {
      experience.forEach((exp, index) => {
        if (!exp.position?.trim()) {
          errors.push(`Job title is required for experience #${index + 1}`);
        }
        if (!exp.company?.trim()) {
          errors.push(`Company name is required for experience #${index + 1}`);
        }
        if (!exp.startDate?.trim()) {
          warnings.push(`Start date missing for experience #${index + 1}`);
        }
        if (!exp.description?.trim()) {
          suggestions.push(`Add description for ${exp.position || `experience #${index + 1}`} to showcase your achievements`);
        } else if (exp.description.length < 100) {
          suggestions.push(`Consider expanding description for ${exp.position} with specific achievements`);
        }
      });
      
      // Check for chronological order
      const sortedExperience = [...experience].sort((a, b) => 
        new Date(b.startDate || '').getTime() - new Date(a.startDate || '').getTime()
      );
      if (JSON.stringify(experience) !== JSON.stringify(sortedExperience)) {
        suggestions.push('Consider ordering experience from most recent to oldest');
      }
    }
    
    const completionScore = experience.length > 0 ? 
      Math.min(100, (experience.length * 30) + (experience.filter(exp => exp.description?.trim()).length * 20)) : 0;
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      completionScore
    };
  }
  
  static validateEducation(education: CVData['education']): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    
    if (!education || education.length === 0) {
      warnings.push('Adding education information is recommended for most positions');
    } else {
      education.forEach((edu, index) => {
        if (!edu.degree?.trim()) {
          errors.push(`Degree/qualification is required for education #${index + 1}`);
        }
        if (!edu.institution?.trim()) {
          errors.push(`Institution name is required for education #${index + 1}`);
        }
        if (!edu.endDate?.trim()) {
          warnings.push(`End date missing for education #${index + 1}`);
        }
      });
    }
    
    const completionScore = education.length > 0 ? 
      Math.min(100, education.length * 50 + education.filter(edu => edu.description).length * 20) : 0;
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      completionScore
    };
  }
  
  static validateSkills(skills: CVData['skills']): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    
    if (!skills || skills.length === 0) {
      warnings.push('Adding skills is highly recommended to showcase your capabilities');
    } else if (skills.length < 5) {
      suggestions.push('Consider adding more skills (aim for 8-12 relevant skills)');
    } else if (skills.length > 20) {
      warnings.push('Too many skills listed - focus on the most relevant ones (8-12 is optimal)');
    }
    
    // Check for skill levels
    const skillsWithLevels = skills.filter(skill => skill.level && skill.level !== 'beginner');
    if (skillsWithLevels.length < skills.length / 2) {
      suggestions.push('Consider adding proficiency levels to your skills');
    }
    
    const completionScore = Math.min(100, skills.length * 8);
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      completionScore
    };
  }
  
  static validateComplete(cvData: CVData): SectionValidation {
    return {
      personalInfo: this.validatePersonalInfo(cvData.personalInfo),
      experience: this.validateExperience(cvData.experience),
      education: this.validateEducation(cvData.education),
      skills: this.validateSkills(cvData.skills),
      // Add more sections as needed
    };
  }
  
  static getOverallScore(validationResults: SectionValidation): number {
    const sections = Object.values(validationResults);
    const totalScore = sections.reduce((sum, result) => sum + result.completionScore, 0);
    return Math.round(totalScore / sections.length);
  }
  
  static getRecommendations(validationResults: SectionValidation): string[] {
    const allSuggestions: string[] = [];
    
    Object.entries(validationResults).forEach(([section, result]) => {
      result.suggestions.forEach(suggestion => {
        allSuggestions.push(`${section}: ${suggestion}`);
      });
    });
    
    return allSuggestions.slice(0, 5); // Top 5 recommendations
  }
  
  private static calculateCompletionScore(fields: Record<string, any>): number {
    const filledFields = Object.values(fields).filter(value => 
      value && typeof value === 'string' && value.trim().length > 0
    ).length;
    return Math.round((filledFields / Object.keys(fields).length) * 100);
  }
}
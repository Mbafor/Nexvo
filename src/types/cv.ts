export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary?: string;
  photo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  graduationDate?: string; // Added missing property
  gpa?: string; // Added missing property
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  jobTitle?: string; // Added missing property (alias for position)
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface VolunteerWork {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string | string[]; // Allow both string and array
  link?: string;
  url?: string; // Added missing property (alias for link)
  startDate: string;
  endDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface Language {
  id: string;
  name: string;
  language?: string; // Added missing property (alias for name)
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
  proficiency?: string; // Added missing property (alias for level)
}


export interface CVData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  volunteerWork: VolunteerWork[];
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  references: Reference[];
  languages?: Language[];
  hobbies?: string[];        // NEW
  certifications?: string[];
}
export type TemplateType = 'modern' | 'creative' | 'ats' | 'executive' | 'minimalist' | 'tech';

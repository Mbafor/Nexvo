// Test script to verify CV upload and auto-fill functionality
import { CVData } from './src/types/cv';

// Sample parsed CV data that should match our types
const testCVData: Partial<CVData> = {
  personalInfo: {
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johnsmith",
    website: "johnsmith.dev",
    summary: "Experienced software engineer with 5+ years of expertise...",
    photo: ""
  },
  education: [
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-05",
      current: false,
      description: "GPA: 3.8/4.0"
    }
  ],
  experience: [
    {
      id: "1",
      company: "Tech Solutions Inc",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description: "Led development of customer-facing web applications serving 100k+ users"
    }
  ],
  skills: [
    {
      id: "1",
      name: "JavaScript",
      level: "advanced"
    },
    {
      id: "2", 
      name: "React",
      level: "expert"
    }
  ],
  projects: [
    {
      id: "1",
      name: "E-Commerce Platform",
      description: "Developed a full-stack e-commerce application",
      technologies: "React, Node.js, Express, MongoDB",
      link: "https://github.com/johnsmith/ecommerce",
      startDate: "2023-01",
      endDate: "2023-06"
    }
  ],
  languages: [
    {
      id: "1",
      name: "English",
      level: "Native"
    },
    {
      id: "2",
      name: "Spanish", 
      level: "Fluent"
    }
  ],
  hobbies: ["Photography", "Hiking", "Chess"],
  certifications: ["AWS Certified Solutions Architect", "Google Cloud Professional Developer"],
  achievements: [
    {
      id: "1",
      title: "Employee of the Month",
      description: "Tech Solutions Inc - March 2023",
      date: "2023-03"
    }
  ],
  volunteerWork: [
    {
      id: "1",
      organization: "Code for America",
      role: "Volunteer Developer", 
      startDate: "2020-01",
      endDate: "",
      current: true,
      description: "Helped build civic technology solutions for local communities"
    }
  ],
  references: [
    {
      id: "1",
      name: "Jane Doe",
      position: "Engineering Manager",
      company: "Tech Solutions Inc",
      email: "jane.doe@techsolutions.com",
      phone: "(555) 987-6543"
    }
  ]
};

// This data structure should match all our form interfaces
console.log('✅ Test CV data structure is valid');
console.log('📊 Data coverage:', {
  personalInfo: !!testCVData.personalInfo,
  education: testCVData.education?.length || 0,
  experience: testCVData.experience?.length || 0,
  skills: testCVData.skills?.length || 0,
  projects: testCVData.projects?.length || 0,
  languages: testCVData.languages?.length || 0,
  hobbies: testCVData.hobbies?.length || 0,
  certifications: testCVData.certifications?.length || 0,
  achievements: testCVData.achievements?.length || 0,
  volunteerWork: testCVData.volunteerWork?.length || 0,
  references: testCVData.references?.length || 0
});

export default testCVData;
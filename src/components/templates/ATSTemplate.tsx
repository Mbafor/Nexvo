// ATS-Optimized Elite Template - Designed for Maximum ATS Compatibility and Professional Impact
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface ATSTemplateProps {
  data: CVData;
}

const styles = StyleSheet.create({
  page: { 
    fontFamily: 'Helvetica', 
    padding: 50, 
    backgroundColor: '#ffffff',
    color: '#2c2c2c',
    fontSize: 11,
    lineHeight: 1.6
  },
  
  // Header - Clean and ATS-friendly
  header: { 
    marginBottom: 40, 
    textAlign: 'center',
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9'
  },
  name: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1a1a1a',
    marginBottom: 8,
    letterSpacing: 0.5
  },
  jobTitle: { 
    fontSize: 14, 
    color: '#4a5568',
    marginBottom: 15,
    fontWeight: 400
  },
  contactInfo: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    gap: 8
  },
  contactItem: { 
    fontSize: 10, 
    color: '#4a5568',
    marginBottom: 3,
    flexShrink: 1
  },
  summary: { 
    fontSize: 11, 
    color: '#2c2c2c',
    lineHeight: 1.6,
    textAlign: 'justify',
    marginBottom: 25
  },
  
  // Section Styling - Clean and structured
  section: { 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#2c2c2c',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9'
  },
  
  // Experience Section
  experienceItem: { 
    marginBottom: 15,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fafc'
  },
  positionTitle: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#2c2c2c',
    marginBottom: 3
  },
  companyInfo: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  companyName: { 
    fontSize: 12, 
    color: '#4a5568',
    fontWeight: 600
  },
  experienceDate: { 
    fontSize: 11, 
    color: '#718096'
  },
  locationInfo: { 
    fontSize: 10, 
    color: '#718096',
    marginBottom: 8,
    fontStyle: 'italic'
  },
  achievementsList: { 
    marginLeft: 15 
  },
  achievementItem: { 
    fontSize: 10, 
    color: '#4a5568',
    lineHeight: 1.5,
    marginBottom: 3
  },
  bulletPoint: { 
    marginRight: 8, 
    color: '#718096' 
  },
  
  // Education Section
  educationItem: { 
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fafc'
  },
  educationHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  degreeTitle: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#2c2c2c'
  },
  graduationDate: { 
    fontSize: 10, 
    color: '#718096' 
  },
  institutionName: { 
    fontSize: 11, 
    color: '#4a5568',
    marginBottom: 3
  },
  educationDetails: { 
    fontSize: 10, 
    color: '#718096',
    lineHeight: 1.4
  },
  
  // Skills Section - ATS optimized
  skillsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    gap: 15
  },
  skillCategory: { 
    width: '48%',
    marginBottom: 12
  },
  skillCategoryTitle: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#2c2c2c',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  skillList: { 
    flexDirection: 'row', 
    flexWrap: 'wrap' 
  },
  skillItem: { 
    fontSize: 10, 
    color: '#4a5568',
    backgroundColor: '#f7fafc',
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    marginBottom: 4,
    borderRadius: 3
  },
  
  // Projects Section
  projectItem: { 
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fafc'
  },
  projectHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  projectName: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#2c2c2c'
  },
  projectDate: { 
    fontSize: 10, 
    color: '#718096' 
  },
  projectDescription: { 
    fontSize: 10, 
    color: '#4a5568',
    lineHeight: 1.5,
    marginBottom: 6
  },
  projectTechs: { 
    flexDirection: 'row', 
    flexWrap: 'wrap' 
  },
  techItem: { 
    fontSize: 9, 
    color: '#718096',
    backgroundColor: '#edf2f7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 3,
    borderRadius: 2
  },
  
  // Certifications Section
  certificationItem: { 
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fafc'
  },
  certificationName: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    color: '#2c2c2c',
    marginBottom: 2
  },
  certificationInfo: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  certificationIssuer: { 
    fontSize: 10, 
    color: '#4a5568' 
  },
  certificationDate: { 
    fontSize: 9, 
    color: '#718096' 
  },
  
  // Languages Section
  languagesContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    gap: 10
  },
  languageItem: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 6
  },
  languageName: { 
    fontSize: 11, 
    color: '#2c2c2c',
    fontWeight: 600,
    marginRight: 8
  },
  languageLevel: { 
    fontSize: 10, 
    color: '#4a5568',
    backgroundColor: '#f7fafc',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3
  },
  
  // Achievements Section
  achievementCard: { 
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fafc'
  },
  achievementTitle: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#2c2c2c',
    marginBottom: 3
  },
  achievementDate: { 
    fontSize: 10, 
    color: '#718096',
    marginBottom: 5
  },
  achievementDescription: { 
    fontSize: 10, 
    color: '#4a5568',
    lineHeight: 1.5
  },
  
  // Volunteer Work Section
  volunteerItem: { 
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fafc'
  },
  volunteerRole: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    color: '#2c2c2c',
    marginBottom: 2
  },
  volunteerOrganization: { 
    fontSize: 10, 
    color: '#4a5568',
    marginBottom: 2
  },
  volunteerDate: { 
    fontSize: 9, 
    color: '#718096',
    marginBottom: 4
  },
  volunteerDescription: { 
    fontSize: 10, 
    color: '#4a5568',
    lineHeight: 1.4
  },
  
  // References Section
  referencesContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    gap: 15
  },
  referenceItem: { 
    width: '47%',
    marginBottom: 10
  },
  referenceName: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    color: '#2c2c2c',
    marginBottom: 2
  },
  referenceTitle: { 
    fontSize: 10, 
    color: '#4a5568',
    marginBottom: 2
  },
  referenceContact: { 
    fontSize: 9, 
    color: '#718096' 
  },
  
  // Hobbies Section
  hobbiesContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap' 
  },
  hobbyTag: { 
    backgroundColor: '#f7fafc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
    borderRadius: 4
  },
  hobbiesText: { 
    fontSize: 10, 
    color: '#4a5568' 
  }
});

export const ATSTemplate = ({ data }: ATSTemplateProps) => {
  // Helper function to group skills by category
  const groupSkillsByCategory = () => {
    if (!data.skills || data.skills.length === 0) return {};
    
    const categories: { [key: string]: typeof data.skills } = {};
    data.skills.forEach(skill => {
      const category = 'Technical Skills'; // Since category doesn't exist on Skill type
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(skill);
    });
    
    return categories;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{data.experience?.[0]?.position || 'Professional'}</Text>
          
          <View style={styles.contactInfo}>
            {data.personalInfo.email && (
              <Text style={styles.contactItem}>Email: {data.personalInfo.email}</Text>
            )}
            {data.personalInfo.phone && (
              <Text style={styles.contactItem}>Phone: {data.personalInfo.phone}</Text>
            )}
            {data.personalInfo.location && (
              <Text style={styles.contactItem}>Location: {data.personalInfo.location}</Text>
            )}
            {data.personalInfo.website && (
              <Text style={styles.contactItem}>Website: {data.personalInfo.website}</Text>
            )}
            {data.personalInfo.linkedin && (
              <Text style={styles.contactItem}>LinkedIn: {data.personalInfo.linkedin}</Text>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.positionTitle}>{exp.position}</Text>
                <View style={styles.companyInfo}>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  <Text style={styles.experienceDate}>
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </Text>
                </View>
                {exp.location && (
                  <Text style={styles.locationInfo}>{exp.location}</Text>
                )}
                {exp.description && (
                  <View style={styles.achievementsList}>
                    {exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                      <Text key={idx} style={styles.achievementItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        {line.trim()}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <Text style={styles.degreeTitle}>{edu.degree}</Text>
                  <Text style={styles.graduationDate}>{edu.graduationDate || edu.endDate}</Text>
                </View>
                <Text style={styles.institutionName}>{edu.institution}</Text>
                {edu.description && (
                  <Text style={styles.educationDetails}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.skillsContainer}>
              {Object.entries(groupSkillsByCategory()).map(([category, skills]) => (
                <View key={category} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>{category}</Text>
                  <View style={styles.skillList}>
                    {skills.map((skill, idx) => (
                      <Text key={idx} style={styles.skillItem}>{skill.name}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectDate}>{project.startDate} - {project.endDate || 'Present'}</Text>
                </View>
                {project.description && (
                  <Text style={styles.projectDescription}>{project.description}</Text>
                )}
                {project.technologies && (
                  <View style={styles.projectTechs}>
                    {(Array.isArray(project.technologies) ? project.technologies : [project.technologies]).map((tech, idx) => (
                      <Text key={idx} style={styles.techItem}>{tech}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, index) => (
              <View key={index} style={styles.certificationItem}>
                <Text style={styles.certificationName}>{cert}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.languagesContainer}>
              {data.languages.map((lang, index) => (
                <View key={index} style={styles.languageItem}>
                  <Text style={styles.languageName}>{lang.name || lang.language}</Text>
                  <Text style={styles.languageLevel}>{lang.level || lang.proficiency}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Achievements Section */}
        {data.achievements && data.achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements & Awards</Text>
            {data.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
                {achievement.description && (
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Volunteer Work Section */}
        {data.volunteerWork && data.volunteerWork.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Experience</Text>
            {data.volunteerWork.map((vol, index) => (
              <View key={index} style={styles.volunteerItem}>
                <Text style={styles.volunteerRole}>{vol.role}</Text>
                <Text style={styles.volunteerOrganization}>{vol.organization}</Text>
                <Text style={styles.volunteerDate}>{vol.startDate} - {vol.endDate || 'Present'}</Text>
                {vol.description && (
                  <Text style={styles.volunteerDescription}>{vol.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* References Section */}
        {data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional References</Text>
            <View style={styles.referencesContainer}>
              {data.references.map((ref, index) => (
                <View key={index} style={styles.referenceItem}>
                  <Text style={styles.referenceName}>{ref.name}</Text>
                  <Text style={styles.referenceTitle}>{ref.position} at {ref.company}</Text>
                  <Text style={styles.referenceContact}>{ref.email}</Text>
                  {ref.phone && <Text style={styles.referenceContact}>{ref.phone}</Text>}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Hobbies Section */}
        {data.hobbies && data.hobbies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests & Hobbies</Text>
            <View style={styles.hobbiesContainer}>
              {data.hobbies.map((hobby, index) => (
                <View key={index} style={styles.hobbyTag}>
                  <Text style={styles.hobbiesText}>{hobby}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
};

export default ATSTemplate;
// Tech Elite Template - Modern Developer & Tech Professional Design
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface TechTemplateProps {
  data: CVData;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 0,
    backgroundColor: '#fff', // pure white
    color: '#222',
    fontSize: 10,
    lineHeight: 1.55,
  },
  
  // Modern Layout with Split Design
  container: {
    flexDirection: 'row',
    minHeight: '100vh',
  },
  
  // Enhanced Left Sidebar - Terminal-inspired
  sidebar: {
    width: '38%',
    backgroundColor: '#fff', // pure white
    padding: 28,
    borderRightWidth: 3,
    borderRightColor: '#1976d2', // blue accent
    position: 'relative',
  },
  sidebarGlow: {
    position: 'absolute',
    top: 0,
    right: -3,
    width: 3,
    height: '100%',
    backgroundColor: '#00f5ff',
    boxShadow: '0 0 20px #00f5ff',
  },
  
  // Main Content Area - Code Editor Style
  mainContent: {
    width: '62%',
    padding: 32,
    backgroundColor: '#fff', // pure white
    position: 'relative',
  },
  
  // Profile Header with Tech Aesthetics
  profileHeader: {
    marginBottom: 18,
    padding: 18,
    backgroundColor: '#fff', // pure white
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2', // blue accent
    position: 'relative',
  },
  profileAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 80,
    height: 80,
    backgroundColor: '#00f5ff',
    opacity: 0.1,
    borderRadius: 40,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976d2', // blue accent
    marginBottom: 2,
    letterSpacing: 1.2,
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderRadius: 6,
  },
  roleTitle: {
    fontSize: 16,
    color: '#00f5ff',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  profileSummary: {
    fontSize: 11,
    color: '#a0aec0',
    lineHeight: 1.8,
    marginTop: 10,
  },
  
  // Sidebar Terminal-Style Headers
  sidebarSection: {
    marginBottom: 30,
    backgroundColor: '#1a202c',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  terminalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  terminalPrompt: {
    fontSize: 10,
    color: '#00f5ff',
    fontFamily: 'Courier',
    marginRight: 8,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  // Enhanced Contact Information
  contactItem: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  contactIcon: {
    width: 16,
    height: 16,
    marginRight: 12,
    color: '#00f5ff',
    fontWeight: 'bold',
  },
  contactText: {
    fontSize: 10,
    color: '#e2e8f0',
    fontFamily: 'Courier',
  },
  
  // Advanced Skills with Progress Bars
  skillItem: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#2d3748',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#00f5ff',
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  skillPercentage: {
    fontSize: 9,
    color: '#00f5ff',
    fontFamily: 'Courier',
    fontWeight: 'bold',
  },
  skillBarContainer: {
    height: 6,
    backgroundColor: '#1a202c',
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  skillBar: {
    height: 6,
    backgroundColor: '#00f5ff',
    borderRadius: 3,
    position: 'relative',
  },
  skillBarGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00f5ff',
    opacity: 0.3,
    boxShadow: '0 0 10px #00f5ff',
  },
  skillCategory: {
    fontSize: 8,
    color: '#718096',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  
  // Enhanced Languages Section
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#2d3748',
    borderRadius: 4,
  },
  languageName: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  languageLevel: {
    fontSize: 9,
    color: '#00f5ff',
    fontWeight: 'bold',
    backgroundColor: '#1a202c',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  
  // Tech-Style Certifications
  certItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#2d3748',
    borderRadius: 6,
    borderTopWidth: 2,
    borderTopColor: '#00f5ff',
  },
  certText: {
    fontSize: 9,
    color: '#e2e8f0',
    lineHeight: 1.5,
    fontFamily: 'Courier',
  },
  certIcon: {
    fontSize: 8,
    color: '#00f5ff',
    marginRight: 6,
  },
  
  // Modern Interest Tags
  interestContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  interestTag: {
    backgroundColor: '#2d3748',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#00f5ff',
  },
  interestText: {
    fontSize: 9,
    color: '#00f5ff',
    fontWeight: 'bold',
  },
  
  // Main Content Sections - Code Editor Style
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2', // blue accent
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#e3e3e3',
    position: 'relative',
  },
  sectionAccent: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: 40,
    height: 2,
    backgroundColor: '#00f5ff',
  },
  
  // Experience Cards - Modern Developer Style
  experienceItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff', // pure white
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2', // blue accent
    position: 'relative',
  },
  experienceGlow: {
    position: 'absolute',
    top: -2,
    right: -2,
    bottom: -2,
    left: -2,
    backgroundColor: '#00f5ff',
    opacity: 0.1,
    borderRadius: 12,
    zIndex: -1,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  experienceLeft: {
    flex: 2,
  },
  experienceRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  positionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  companyName: {
    fontSize: 12,
    color: '#1976d2', // blue accent
    fontWeight: 'bold',
    marginBottom: 3,
  },
  locationInfo: {
    fontSize: 10,
    color: '#718096',
    fontStyle: 'italic',
  },
  dateRange: {
    fontSize: 10,
    color: '#a0aec0',
    fontFamily: 'Courier',
    backgroundColor: '#2d3748',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    textAlign: 'center',
  },
  achievementBullet: {
    fontSize: 10,
    color: '#e2e8f0',
    marginLeft: 20,
    marginBottom: 4,
    lineHeight: 1.6,
  },
  bulletIcon: {
    color: '#00f5ff',
    marginRight: 8,
    fontWeight: 'bold',
  },
  
  // Project Showcase - GitHub-style Cards
  projectItem: {
    marginBottom: 20,
    padding: 18,
    backgroundColor: '#fff', // pure white
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    position: 'relative',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  projectName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1976d2', // blue accent
    letterSpacing: 0.5,
  },
  projectStatus: {
    fontSize: 8,
    color: '#68d391',
    backgroundColor: '#1a365d',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  projectDate: {
    fontSize: 9,
    color: '#718096',
    fontFamily: 'Courier',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 10,
    color: '#e2e8f0',
    lineHeight: 1.6,
    marginBottom: 12,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#2d3748',
  },
  techTag: {
    backgroundColor: '#0a0e1a',
    color: '#00f5ff',
    fontSize: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00f5ff',
    fontWeight: 'bold',
  },
  
  // Education - Clean Academic Style
  educationItem: {
    marginBottom: 18,
    padding: 16,
    backgroundColor: '#151b2c',
    borderRadius: 8,
    borderTopWidth: 3,
    borderTopColor: '#00f5ff',
  },
  degreeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  degree: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  graduationYear: {
    fontSize: 10,
    color: '#a0aec0',
    fontFamily: 'Courier',
    backgroundColor: '#2d3748',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  institution: {
    fontSize: 11,
    color: '#1976d2', // blue accent
    marginBottom: 6,
    fontWeight: 'bold',
  },
  educationDescription: {
    fontSize: 9,
    color: '#718096',
    lineHeight: 1.5,
  },
  
  // Achievement Highlights - Award Style
  achievementCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff', // pure white
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2', // blue accent
    position: 'relative',
  },
  achievementIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    fontSize: 20,
    color: '#ffd700',
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1976d2', // blue accent
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  achievementDate: {
    fontSize: 9,
    color: '#a0aec0',
    marginBottom: 8,
    fontFamily: 'Courier',
    textTransform: 'uppercase',
  },
  achievementDescription: {
    fontSize: 10,
    color: '#e2e8f0',
    lineHeight: 1.6,
    marginRight: 30,
  },
  
  // Volunteer Work - Community Focus
  volunteerItem: {
    marginBottom: 16,
    padding: 15,
    backgroundColor: '#fff', // pure white
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#1976d2', // blue accent
  },
  volunteerRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 3,
  },
  volunteerOrganization: {
    fontSize: 11,
    color: '#1976d2', // blue accent
    marginBottom: 6,
    fontWeight: 'bold',
  },
  volunteerDate: {
    fontSize: 9,
    color: '#a0aec0',
    fontFamily: 'Courier',
    marginBottom: 8,
  },
  volunteerDescription: {
    fontSize: 10,
    color: '#e2e8f0',
    lineHeight: 1.5,
  },
  
  // References - Professional Network
  referenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  referenceCard: {
    width: '48%',
    padding: 15,
    backgroundColor: '#1a202c',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  referenceName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  referenceTitle: {
    fontSize: 10,
    color: '#00f5ff',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  referenceContact: {
    fontSize: 9,
    color: '#a0aec0',
    fontFamily: 'Courier',
  },

  // Additional missing styles for compatibility
  skillLevel: {
    fontSize: 8,
    color: '#a0aec0',
    marginTop: 2,
    textAlign: 'right',
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#00f5ff',
  },
  title: {
    fontSize: 14,
    color: '#a0aec0',
    marginBottom: 15,
    fontFamily: 'Courier',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  description: {
    fontSize: 10,
    color: '#e2e8f0',
    lineHeight: 1.5,
  },
  dateLocation: {
    fontSize: 9,
    color: '#a0aec0',
    marginBottom: 8,
    fontFamily: 'Courier',
  },
  bullet: {
    fontSize: 10,
    color: '#a0aec0',
    marginLeft: 10,
    marginBottom: 2,
    paddingLeft: 4,
  },
  projectDesc: {
    fontSize: 10,
    color: '#e2e8f0',
    lineHeight: 1.4,
    marginBottom: 8,
  },
  graduationDate: {
    fontSize: 9,
    color: '#a0aec0',
    fontFamily: 'Courier',
  },
  achievementDesc: {
    fontSize: 10,
    color: '#e2e8f0',
    lineHeight: 1.4,
  },
});

export default function TechTemplate({ data }: TechTemplateProps) {
  const formatDate = (date?: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(month)-1]} ${year}`;
  };

  const hasContent = (arr: any[]) =>
    arr && arr.length > 0 && arr.some(item =>
      Object.values(item).some(val => val && val !== '' && (typeof val !== 'object' || Object.keys(val).length > 0))
    );

  const getSkillWidth = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert': return '100%';
      case 'advanced': return '80%';
      case 'intermediate': return '60%';
      case 'beginner': return '40%';
      default: return '50%';
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            {/* Contact */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Contact</Text>
              {data.personalInfo.email && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>Email: {data.personalInfo.email}</Text>
                </View>
              )}
              {data.personalInfo.phone && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>Phone: {data.personalInfo.phone}</Text>
                </View>
              )}
              {data.personalInfo.location && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>Location: {data.personalInfo.location}</Text>
                </View>
              )}
              {data.personalInfo.linkedin && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>LinkedIn</Text>
                </View>
              )}
              {data.personalInfo.website && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>Portfolio</Text>
                </View>
              )}
            </View>

            {/* Skills with bars */}
            {hasContent(data.skills || []) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Tech Stack</Text>
                {(data.skills || []).map(skill => (
                  <View key={skill.id} style={styles.skillItem}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <View style={styles.skillBarContainer}>
                      <View style={{...styles.skillBar, width: getSkillWidth(skill.level)}} />
                    </View>
                    <Text style={styles.skillLevel}>{skill.level}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {hasContent(data.languages || []) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Languages</Text>
                {(data.languages || []).map(lang => (
                  <View key={lang.id} style={styles.languageItem}>
                    <Text style={styles.languageName}>{lang.name}</Text>
                    <Text style={styles.languageLevel}>{lang.level}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Certifications</Text>
                {data.certifications.map((cert, index) => (
                  <View key={index} style={styles.certItem}>
                    <Text style={styles.certText}>{cert}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Interests */}
            {data.hobbies && data.hobbies.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Interests</Text>
                <View style={styles.interestContainer}>
                  {data.hobbies.map((hobby, index) => (
                    <View key={index} style={styles.interestTag}>
                      <Text style={styles.interestText}>{hobby}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            </View>

            {/* Summary */}
            {data.personalInfo.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.description}>{data.personalInfo.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {hasContent(data.experience || []) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {(data.experience || []).map(exp => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <Text style={styles.positionTitle}>{exp.position}</Text>
                    <Text style={styles.companyName}>{exp.company}</Text>
                    <Text style={styles.dateLocation}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      {exp.location && ` | ${exp.location}`}
                    </Text>
                    {exp.description && exp.description.split('\n').map((line, idx) => (
                      <Text key={idx} style={styles.bullet}>▸ {line}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {hasContent(data.projects || []) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {(data.projects || []).map(proj => (
                  <View key={proj.id} style={styles.projectItem}>
                    <View style={styles.projectHeader}>
                      <Text style={styles.projectName}>{proj.name}</Text>
                      <Text style={styles.projectStatus}>
                        {proj.endDate ? 'Completed' : 'In Progress'}
                      </Text>
                    </View>
                    {proj.description && (
                      <Text style={styles.projectDesc}>{proj.description.replace(/\n/g, ' ')}</Text>
                    )}
                    {proj.technologies && (
                      <View style={styles.techStack}>
                        {(typeof proj.technologies === 'string' 
                          ? proj.technologies.split(',') 
                          : proj.technologies
                        ).map((tech: string, idx: number) => (
                          <Text key={idx} style={styles.techTag}>{tech.trim()}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {hasContent(data.education || []) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {(data.education || []).map(edu => (
                  <View key={edu.id} style={styles.educationItem}>
                    <Text style={styles.degree}>{edu.degree} in {edu.field}</Text>
                    <Text style={styles.institution}>{edu.institution}</Text>
                    <Text style={styles.graduationDate}>
                      {edu.current ? 'In Progress' : formatDate(edu.endDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Achievements */}
            {hasContent(data.achievements || []) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                {(data.achievements || []).map(ach => (
                  <View key={ach.id} style={styles.achievementCard}>
                    <Text style={styles.achievementTitle}>{ach.title}</Text>
                    {ach.date && <Text style={styles.achievementDate}>{formatDate(ach.date)}</Text>}
                    {ach.description && <Text style={styles.achievementDesc}>{ach.description}</Text>}
                  </View>
                ))}
              </View>
            )}

            {/* Volunteer Experience */}
            {hasContent(data.volunteerWork || []) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Volunteer Experience</Text>
                {(data.volunteerWork || []).map(vol => (
                  <View key={vol.id} style={styles.volunteerItem}>
                    <Text style={styles.volunteerRole}>{vol.role}</Text>
                    <Text style={styles.volunteerOrganization}>{vol.organization}</Text>
                    <Text style={styles.volunteerDate}>
                      {formatDate(vol.startDate)} - {vol.current ? 'Present' : formatDate(vol.endDate)}
                    </Text>
                    {vol.description && <Text style={styles.volunteerDescription}>{vol.description}</Text>}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
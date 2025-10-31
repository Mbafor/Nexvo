// Tech Elite Template - Modern Developer & Tech Professional Design
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';

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
  
  // Enhanced Left Sidebar - Clean white design
  sidebar: {
    width: '38%',
    backgroundColor: '#fff', // pure white
    padding: 28,
    borderRightWidth: 3,
    borderRightColor: '#1976d2', // blue accent
    position: 'relative',
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
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profileImageContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    objectFit: 'cover',
    border: '2px solid #1976d2'
  },
  profileContent: {
    flex: 1,
  },
  profileAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 80,
    height: 80,
    backgroundColor: '#1976d2',
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
    color: '#1976d2',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  profileSummary: {
    fontSize: 11,
    color: '#666',
    lineHeight: 1.8,
    marginTop: 10,
  },
  
  // Sidebar Clean Style Headers
  sidebarSection: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  terminalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  terminalPrompt: {
    fontSize: 10,
    color: '#1976d2',
    fontFamily: 'Courier',
    marginRight: 8,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1976d2',
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
    color: '#1976d2',
    fontWeight: 'bold',
  },
  contactText: {
    fontSize: 10,
    color: '#222',
    fontFamily: 'Courier',
  },
  
  // Clean Skills with Progress Bars
  skillItem: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#1976d2',
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 11,
    color: '#222',
    fontWeight: 'bold',
  },
  skillPercentage: {
    fontSize: 9,
    color: '#1976d2',
    fontFamily: 'Courier',
    fontWeight: 'bold',
  },
  skillBarContainer: {
    height: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  skillBar: {
    height: 6,
    backgroundColor: '#1976d2',
    borderRadius: 3,
    position: 'relative',
  },
  skillCategory: {
    fontSize: 8,
    color: '#666',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  
  // Clean Languages Section
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  languageName: {
    fontSize: 10,
    color: '#222',
    fontWeight: 'bold',
  },
  languageLevel: {
    fontSize: 9,
    color: '#1976d2',
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  
  // Clean Certifications
  certItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderTopWidth: 2,
    borderTopColor: '#1976d2',
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  certText: {
    fontSize: 9,
    color: '#222',
    lineHeight: 1.5,
    fontFamily: 'Courier',
  },
  certIcon: {
    fontSize: 8,
    color: '#1976d2',
    marginRight: 6,
  },
  
  // Clean Interest Tags
  interestContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  interestTag: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1976d2',
  },
  interestText: {
    fontSize: 9,
    color: '#1976d2',
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
    backgroundColor: '#1976d2',
  },
  
  // Experience Cards - Clean White Style
  experienceItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff', // pure white
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2', // blue accent
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e3e3e3',
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
    color: '#222',
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
    color: '#666',
    fontStyle: 'italic',
  },
  dateRange: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'Courier',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    textAlign: 'center',
  },
  achievementBullet: {
    fontSize: 10,
    color: '#222',
    marginLeft: 20,
    marginBottom: 4,
    lineHeight: 1.6,
  },
  bulletIcon: {
    color: '#1976d2',
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
    color: '#1976d2',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  projectDate: {
    fontSize: 9,
    color: '#666',
    fontFamily: 'Courier',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 10,
    color: '#222',
    lineHeight: 1.6,
    marginBottom: 12,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
  },
  techTag: {
    backgroundColor: '#fff',
    color: '#1976d2',
    fontSize: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1976d2',
    fontWeight: 'bold',
  },
  
  // Education - Clean White Style
  educationItem: {
    marginBottom: 18,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderTopWidth: 3,
    borderTopColor: '#1976d2',
    borderWidth: 1,
    borderColor: '#e3e3e3',
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
    color: '#222',
  },
  graduationYear: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'Courier',
    backgroundColor: '#f5f5f5',
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
    color: '#666',
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
    color: '#1976d2',
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
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Courier',
    textTransform: 'uppercase',
  },
  achievementDescription: {
    fontSize: 10,
    color: '#222',
    lineHeight: 1.6,
    marginRight: 30,
  },
  
  // Volunteer Work - Clean White Focus
  volunteerItem: {
    marginBottom: 16,
    padding: 15,
    backgroundColor: '#fff', // pure white
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#1976d2', // blue accent
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  volunteerRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#222',
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
    color: '#666',
    fontFamily: 'Courier',
    marginBottom: 8,
  },
  volunteerDescription: {
    fontSize: 10,
    color: '#222',
    lineHeight: 1.5,
  },
  
  // References - Clean White Network
  referenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  referenceCard: {
    width: '48%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  referenceName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  referenceTitle: {
    fontSize: 10,
    color: '#1976d2',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  referenceContact: {
    fontSize: 9,
    color: '#666',
    fontFamily: 'Courier',
  },

  // Additional styles for compatibility
  skillLevel: {
    fontSize: 8,
    color: '#666',
    marginTop: 2,
    textAlign: 'right',
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#1976d2',
  },
  title: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontFamily: 'Courier',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  description: {
    fontSize: 10,
    color: '#222',
    lineHeight: 1.5,
  },
  dateLocation: {
    fontSize: 9,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Courier',
  },
  bullet: {
    fontSize: 10,
    color: '#666',
    marginLeft: 10,
    marginBottom: 2,
    paddingLeft: 4,
  },
  projectDesc: {
    fontSize: 10,
    color: '#222',
    lineHeight: 1.4,
    marginBottom: 8,
  },
  graduationDate: {
    fontSize: 9,
    color: '#666',
    fontFamily: 'Courier',
  },
  achievementDesc: {
    fontSize: 10,
    color: '#222',
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

  // Enhanced text utility for consistent bullet points
  const renderDescription = (text: string) => {
    if (!text || !text.trim()) return null;
    
    // Clean and split into bullet points
    const cleaned = text.replace(/[¶¬•‣▪◦·]/g, '').replace(/\s+/g, ' ').trim();
    
    if (!cleaned) return null;
    
    // Split by newlines or existing bullet points and filter empty items
    let bullets = cleaned.split(/\n|•|‣|▪|◦|·/).map(b => b.trim()).filter(b => b.length > 0);
    
    // If only one item and it's long, try to split by sentence or period
    if (bullets.length === 1 && bullets[0].length > 100) {
      const sentences = bullets[0].split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10);
      if (sentences.length > 1) {
        bullets = sentences;
      }
    }
    
    return (
      <View>
        {bullets.map((bullet, idx) => (
          <Text key={idx} style={styles.bullet}>▸ {bullet}</Text>
        ))}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            {/* Profile Image - Top Left */}
            {data.personalInfo.photo && (
              <View style={styles.profileHeader}>
                <View style={styles.profileImageContainer}>
                  <Image src={data.personalInfo.photo} style={styles.profileImage} />
                </View>
              </View>
            )}
            
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
                    {exp.description && renderDescription(exp.description)}
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
                    {proj.description && renderDescription(proj.description)}
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
                    {ach.description && renderDescription(ach.description)}
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
                    {vol.description && renderDescription(vol.description)}
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
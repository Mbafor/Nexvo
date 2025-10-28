// Executive Elite Template - Sophisticated Design for Senior Leadership Positions
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';

interface ExecutiveTemplateProps {
  data: CVData;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 0,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontSize: 11,
    lineHeight: 1.6,
  },
  
  // Header with Profile Image Support
  headerContainer: {
    backgroundColor: '#1a202c',
    paddingVertical: 35,
    paddingHorizontal: 40,
    marginBottom: 0,
    position: 'relative',
  },
  headerAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#d4af37',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 15,
  },
  profileImageContainer: {
    marginRight: 25,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#d4af37',
  },
  nameSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    maxWidth: '100%',
    marginTop: 0,
    marginBottom: 0,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: 1.5,
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: 400,
    lineHeight: 1.2,
    alignSelf: 'center',
    paddingHorizontal: 8,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#2d3748',
    gap: 8,
  },
  contactItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: 120,
    maxWidth: 180,
  },
  contactLabel: {
    fontSize: 9,
    color: '#a0aec0',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: '100%',
    lineHeight: 1.3,
  },

  // Main Content Area
  contentArea: {
    padding: 50,
    paddingTop: 40,
  },

  // Executive Summary - Premium Box
  executiveSummary: {
    marginBottom: 35,
    padding: 25,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderLeftWidth: 6,
    borderLeftColor: '#d4af37',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 12,
    color: '#2d3748',
    lineHeight: 1.8,
    textAlign: 'justify',
  },
  
  // Section Styling - Executive Level
  section: {
    marginBottom: 10,
    paddingBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    paddingBottom: 8,
    borderBottomWidth: 3,
    borderBottomColor: '#d4af37',
    position: 'relative',
  },
  sectionTitleAccent: {
    position: 'absolute',
    bottom: -3,
    left: 0,
    width: 60,
    height: 3,
    backgroundColor: '#1a202c',
  },
  
  // Experience - Executive Focused
  experienceItem: {
    marginBottom: 18,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    position: 'relative',
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  companyName: {
    fontSize: 13,
    color: '#d4af37',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  companyLocation: {
    fontSize: 11,
    color: '#4a5568',
    fontStyle: 'italic',
  },
  dateRange: {
    fontSize: 11,
    color: '#2d3748',
    fontWeight: 'bold',
    textAlign: 'right',
    backgroundColor: '#f7fafc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  achievementBullet: {
    fontSize: 11,
    marginLeft: 20,
    marginBottom: 6,
    color: '#2d3748',
    lineHeight: 1.6,
    position: 'relative',
  },
  bulletIcon: {
    position: 'absolute',
    left: -15,
    color: '#d4af37',
    fontWeight: 'bold',
  },
  
  // Skills - Clean Comma-Separated Format
  skillCategoryTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#d4af37',
  },
  skillListText: {
    fontSize: 11,
    color: '#2d3748',
    lineHeight: 1.6,
    textAlign: 'justify',
    marginBottom: 8,
  },
  
  // Education - Premium Layout
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  educationLeft: {
    flex: 2,
  },
  educationRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  degree: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 4,
  },
  institution: {
    fontSize: 11,
    color: '#d4af37',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  educationDetails: {
    fontSize: 10,
    color: '#4a5568',
  },
  graduationYear: {
    fontSize: 11,
    color: '#2d3748',
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    textAlign: 'right',
  },
  
  // Achievements - Executive Showcase
  achievementBox: {
    backgroundColor: '#1a202c',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#d4af37',
    position: 'relative',
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  achievementDate: {
    fontSize: 10,
    color: '#d4af37',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'right',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  achievementDesc: {
    fontSize: 11,
    color: '#a0aec0',
    lineHeight: 1.6,
  },
  achievementAccent: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 18,
    color: '#1a202c',
    fontWeight: 'bold',
  },
  
  // Projects - Strategic Display
  projectCard: {
    backgroundColor: '#f8f9fa',
    padding: 18,
    marginBottom: 15,
    borderRadius: 8,
    borderTopWidth: 4,
    borderTopColor: '#d4af37',
  },
  projectTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 6,
  },
  projectDate: {
    fontSize: 10,
    color: '#4a5568',
    fontStyle: 'italic',
    textAlign: 'right',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 10,
    color: '#2d3748',
    lineHeight: 1.5,
    marginBottom: 4,
  },
  projectTech: {
    fontSize: 9,
    color: '#d4af37',
    fontWeight: 'bold',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  
  // Certifications - Executive Grid
  certificationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  certificationItem: {
    width: '50%',
    marginBottom: 12,
    paddingRight: 15,
  },
  certificationText: {
    fontSize: 10,
    color: '#2d3748',
    paddingLeft: 15,
    paddingVertical: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#d4af37',
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // Languages - Premium Display
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  languageName: {
    fontSize: 12,
    color: '#1a202c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  languageLevel: {
    fontSize: 10,
    color: '#d4af37',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    textAlign: 'center',
  },
  
  // References - Executive Style
  referenceCard: {
    backgroundColor: '#1a202c',
    padding: 18,
    marginBottom: 15,
    borderRadius: 8,
    borderTopWidth: 4,
    borderTopColor: '#d4af37',
  },
  referenceName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  referenceTitle: {
    fontSize: 11,
    color: '#d4af37',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  referenceContact: {
    fontSize: 10,
    color: '#a0aec0',
  },
  
  // Interests - Executive Level
  interestText: {
    fontSize: 11,
    color: '#2d3748',
    textAlign: 'justify',
    lineHeight: 1.6,
    marginTop: 10,
    paddingLeft: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#d4af37',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 6,
  },
});

export default function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  // Comprehensive text cleaning function to remove all paragraph symbols and unwanted characters
  const cleanText = (text: string) => {
    if (!text) return '';
    return text
      .replace(/¶/g, '') // Regular paragraph symbol
      .replace(/\u00B6/g, '') // Unicode paragraph symbol
      .replace(/\u2029/g, '') // Unicode paragraph separator
      .replace(/\u2028/g, '') // Unicode line separator
      .replace(/\u000C/g, '') // Form feed
      .replace(/\u0085/g, '') // Next line
      .replace(/[\r\n]+/g, '\n') // Normalize line breaks
      .trim();
  };

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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Luxury Executive Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerAccent} />
          
          <View style={styles.headerContent}>
            {data.personalInfo.photo && (
              <View style={styles.profileImageContainer}>
                <Image style={styles.profileImage} src={data.personalInfo.photo} />
              </View>
            )}
            
            <View style={styles.nameSection}>
              <Text style={styles.name}>
                {data.personalInfo.fullName?.split(' ').map((word, index, arr) => {
                  if (index === 2 && arr.length > 2) {
                    return `\n${word}`;
                  }
                  return index === 0 ? word : ` ${word}`;
                }).join('')}
              </Text>
            </View>
          </View>
          
          <View style={styles.contactGrid}>
            {data.personalInfo.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{data.personalInfo.email}</Text>
              </View>
            )}
            {data.personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{data.personalInfo.phone}</Text>
              </View>
            )}
            {data.personalInfo.location && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Location</Text>
                <Text style={styles.contactValue}>{data.personalInfo.location}</Text>
              </View>
            )}
            {data.personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>LinkedIn</Text>
                <Text style={styles.contactValue}>{data.personalInfo.linkedin}</Text>
              </View>
            )}
            {data.personalInfo.website && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Website</Text>
                <Text style={styles.contactValue}>{data.personalInfo.website}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Main Content Area */}
        <View style={styles.contentArea}>
          
          {/* Professional Profile */}
          {data.personalInfo.summary && (
            <View style={styles.executiveSummary}>
              <Text style={styles.summaryTitle}>Professional Profile</Text>
              <Text style={styles.summaryText}>{data.personalInfo.summary}</Text>
            </View>
          )}

          {/* Professional Experience */}
          {hasContent(data.experience || []) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Executive Experience</Text>
              <View style={styles.sectionTitleAccent} />
              {(data.experience || []).map(exp => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View style={styles.experienceLeft}>
                      <Text style={styles.positionTitle}>{exp.position}</Text>
                      <Text style={styles.companyName}>{exp.company}</Text>
                      {exp.location && (
                        <Text style={styles.companyLocation}>{exp.location}</Text>
                      )}
                    </View>
                    <View style={styles.experienceRight}>
                      <Text style={styles.dateRange}>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </Text>
                    </View>
                  </View>
                  {exp.description && cleanText(exp.description).split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0)
                    .map((line, idx) => {
                    // Add bullet if line doesn't already start with one
                    const bulletLine = line.startsWith('•') || line.startsWith('-') || line.startsWith('*')
                      ? line
                      : `• ${line}`;
                    
                    return (
                      <View key={idx} style={styles.achievementBullet}>
                        <Text style={styles.bulletIcon}>▶</Text>
                        <Text style={{ marginLeft: 15 }}>{bulletLine}</Text>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          )}

          {/* Core Competencies */}
          {hasContent(data.skills || []) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Core Competencies</Text>
              <View style={styles.sectionTitleAccent} />
              
              {/* Technical Skills */}
              {(data.skills || []).filter(skill => skill.type === 'technical').length > 0 && (
                <View style={{ marginBottom: 15 }}>
                  <Text style={styles.skillCategoryTitle}>Technical</Text>
                  <Text style={styles.skillListText}>
                    {(data.skills || [])
                      .filter(skill => skill.type === 'technical')
                      .map(skill => skill.name)
                      .join(', ')}
                  </Text>
                </View>
              )}
              
              {/* Soft Skills */}
              {(data.skills || []).filter(skill => skill.type === 'soft').length > 0 && (
                <View>
                  <Text style={styles.skillCategoryTitle}>Leadership & Management</Text>
                  <Text style={styles.skillListText}>
                    {(data.skills || [])
                      .filter(skill => skill.type === 'soft')
                      .map(skill => skill.name)
                      .join(', ')}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Key Achievements */}
          {hasContent(data.achievements || []) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Achievements</Text>
              <View style={styles.sectionTitleAccent} />
              {(data.achievements || []).map((ach, index) => (
                <View key={ach.id} style={styles.achievementBox}>
                  <View style={styles.achievementAccent}>
                    <Text style={styles.achievementIcon}>{(index + 1).toString()}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <Text style={styles.achievementTitle}>{ach.title}</Text>
                    {ach.date && <Text style={styles.achievementDate}>{formatDate(ach.date)}</Text>}
                  </View>
                  {ach.description && (
                    <Text style={styles.achievementDesc}>
                      {cleanText(ach.description).split('\n')
                        .map(line => line.trim())
                        .filter(line => line.length > 0)
                        .join(' ')}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {hasContent(data.education || []) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              <View style={styles.sectionTitleAccent} />
              {(data.education || []).map(edu => (
                <View key={edu.id} style={styles.educationItem}>
                  <View style={styles.educationLeft}>
                    <Text style={styles.degree}>{edu.degree} in {edu.field}</Text>
                    <Text style={styles.institution}>{edu.institution}</Text>
                    {edu.description && (
                      <Text style={styles.educationDetails}>
                        {cleanText(edu.description).split('\n')
                          .map(line => line.trim())
                          .filter(line => line.length > 0)
                          .join(' ')}
                      </Text>
                    )}
                  </View>
                  <View style={styles.educationRight}>
                    <Text style={styles.graduationYear}>
                      {edu.current ? 'In Progress' : formatDate(edu.endDate)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Strategic Projects */}
          {hasContent(data.projects || []) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Strategic Initiatives</Text>
              <View style={styles.sectionTitleAccent} />
              {(data.projects || []).map(proj => (
                <View key={proj.id} style={styles.projectCard}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <Text style={styles.projectTitle}>{proj.name}</Text>
                    {proj.startDate && (
                      <Text style={styles.projectDate}>
                        {formatDate(proj.startDate)} - {proj.endDate ? formatDate(proj.endDate) : 'Ongoing'}
                      </Text>
                    )}
                  </View>
                  {proj.description && cleanText(proj.description).split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0)
                    .map((line, idx) => {
                    // Add bullet if line doesn't already start with one
                    const bulletLine = line.startsWith('•') || line.startsWith('-') || line.startsWith('*')
                      ? line
                      : `• ${line}`;
                    
                    return (
                      <Text key={idx} style={styles.projectDescription}>{bulletLine}</Text>
                    );
                  })}
                  {proj.technologies && (
                    <Text style={styles.projectTech}>
                      Technologies: {typeof proj.technologies === 'string' 
                        ? proj.technologies 
                        : proj.technologies.join(', ')
                      }
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {hasContent(data.languages || []) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <View style={styles.sectionTitleAccent} />
              {(data.languages || []).map(lang => (
                <View key={lang.id} style={styles.languageItem}>
                  <Text style={styles.languageName}>{lang.name}</Text>
                  <Text style={styles.languageLevel}>{lang.level}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Professional Certifications */}
          {hasContent(data.certifications || []) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              <View style={styles.sectionTitleAccent} />
              <View style={styles.certificationGrid}>
                {(data.certifications || []).map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
                    <Text style={styles.certificationText}>{cert}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Volunteer Experience */}
          {hasContent(data.volunteerWork || []) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Board & Volunteer Leadership</Text>
              <View style={styles.sectionTitleAccent} />
              {(data.volunteerWork || []).map(vol => (
                <View key={vol.id} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View style={styles.experienceLeft}>
                      <Text style={styles.positionTitle}>{vol.role}</Text>
                      <Text style={styles.companyName}>{vol.organization}</Text>
                    </View>
                    <View style={styles.experienceRight}>
                      <Text style={styles.dateRange}>
                        {formatDate(vol.startDate)} - {vol.current ? 'Present' : formatDate(vol.endDate)}
                      </Text>
                    </View>
                  </View>
                  {vol.description && cleanText(vol.description).split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0)
                    .map((line, idx) => {
                    // Add bullet if line doesn't already start with one
                    const bulletLine = line.startsWith('•') || line.startsWith('-') || line.startsWith('*')
                      ? line
                      : `• ${line}`;
                    
                    return (
                      <View key={idx} style={styles.achievementBullet}>
                        <Text style={styles.bulletIcon}>▶</Text>
                        <Text style={{ marginLeft: 15 }}>{bulletLine}</Text>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          )}

          {/* References */}
          {hasContent(data.references || []) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Executive References</Text>
              <View style={styles.sectionTitleAccent} />
              {(data.references || []).map(ref => (
                <View key={ref.id} style={styles.referenceCard}>
                  <Text style={styles.referenceName}>{ref.name}</Text>
                  <Text style={styles.referenceTitle}>
                    {ref.position}{ref.company ? ` at ${ref.company}` : ''}
                  </Text>
                  <Text style={styles.referenceContact}>
                    {ref.email ? `Email: ${ref.email}` : ''}{ref.email && ref.phone ? ' | ' : ''}{ref.phone ? `Phone: ${ref.phone}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Professional Interests */}
          {hasContent(data.hobbies || []) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Interests</Text>
              <View style={styles.sectionTitleAccent} />
              <Text style={styles.interestText}>
                {(data.hobbies || []).join(' • ')}
              </Text>
            </View>
          )}
          
        </View>
      </Page>
    </Document>
  );
}
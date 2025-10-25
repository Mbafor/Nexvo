// Executive Elite Template - Sophisticated Design for Senior Leadership Positions
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

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
  
  // Luxury Header with Gradient Effect
  headerContainer: {
    backgroundColor: '#1a202c',
    paddingVertical: 40,
    paddingHorizontal: 50,
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
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    letterSpacing: 2,
    textAlign: 'center',
  },
  executiveTitle: {
    fontSize: 18,
    color: '#d4af37',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: 'bold',
  },
  contactGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#2d3748',
  },
  contactItem: {
    alignItems: 'center',
    flex: 1,
  },
  contactLabel: {
    fontSize: 9,
    color: '#a0aec0',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: 'bold',
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
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 20,
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
    marginBottom: 25,
    paddingBottom: 20,
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
  
  // Skills - Executive Grid
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  skillCategory: {
    width: '50%',
    marginBottom: 20,
    paddingRight: 20,
  },
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
  skillItem: {
    fontSize: 11,
    color: '#2d3748',
    marginBottom: 4,
    paddingLeft: 15,
    borderLeftWidth: 2,
    borderLeftColor: '#e2e8f0',
    paddingVertical: 2,
  },
  skillItemExpert: {
    borderLeftColor: '#d4af37',
    fontWeight: 'bold',
  },
  
  // Education - Premium Layout
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#f8f9fa',
    padding: 15,
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
    textAlign: 'center',
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
    marginBottom: 8,
    textTransform: 'uppercase',
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
    marginBottom: 8,
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

  // Group skills by proficiency level for executive display
  const groupSkillsByLevel = (skills: any[]) => {
    const grouped = {
      expert: skills.filter(s => s.level === 'expert'),
      advanced: skills.filter(s => s.level === 'advanced'),
      intermediate: skills.filter(s => s.level === 'intermediate'),
      beginner: skills.filter(s => s.level === 'beginner'),
    };
    return grouped;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Luxury Executive Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerAccent} />
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          {data.personalInfo.summary && (
            <Text style={styles.executiveTitle}>
              {data.personalInfo.summary.split('\n')[0].substring(0, 80)}
            </Text>
          )}
          
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
                <Text style={styles.contactValue}>Available</Text>
              </View>
            )}
          </View>
        </View>

        {/* Main Content Area */}
        <View style={styles.contentArea}>
          
          {/* Executive Summary */}
          {data.personalInfo.summary && (
            <View style={styles.executiveSummary}>
              <Text style={styles.summaryTitle}>Executive Summary</Text>
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
                  {exp.description && exp.description.split('\n').map((line, idx) => (
                    <View key={idx} style={styles.achievementBullet}>
                      <Text style={styles.bulletIcon}>▶</Text>
                      <Text style={{ marginLeft: 15 }}>{line}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Core Competencies */}
          {hasContent(data.skills || []) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Core Competencies</Text>
              <View style={styles.sectionTitleAccent} />
              <View style={styles.skillsGrid}>
                {(() => {
                  const grouped = groupSkillsByLevel(data.skills || []);
                  return (
                    <>
                      {grouped.expert.length > 0 && (
                        <View style={styles.skillCategory}>
                          <Text style={styles.skillCategoryTitle}>Expert Level</Text>
                          {grouped.expert.map(skill => (
                            <Text key={skill.id} style={[styles.skillItem, styles.skillItemExpert]}>
                              {skill.name}
                            </Text>
                          ))}
                        </View>
                      )}
                      {grouped.advanced.length > 0 && (
                        <View style={styles.skillCategory}>
                          <Text style={styles.skillCategoryTitle}>Advanced</Text>
                          {grouped.advanced.map(skill => (
                            <Text key={skill.id} style={styles.skillItem}>
                              {skill.name}
                            </Text>
                          ))}
                        </View>
                      )}
                      {grouped.intermediate.length > 0 && (
                        <View style={styles.skillCategory}>
                          <Text style={styles.skillCategoryTitle}>Proficient</Text>
                          {grouped.intermediate.map(skill => (
                            <Text key={skill.id} style={styles.skillItem}>
                              {skill.name}
                            </Text>
                          ))}
                        </View>
                      )}
                      {grouped.beginner.length > 0 && (
                        <View style={styles.skillCategory}>
                          <Text style={styles.skillCategoryTitle}>Emerging</Text>
                          {grouped.beginner.map(skill => (
                            <Text key={skill.id} style={styles.skillItem}>
                              {skill.name}
                            </Text>
                          ))}
                        </View>
                      )}
                    </>
                  );
                })()}
              </View>
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
                  <Text style={styles.achievementTitle}>{ach.title}</Text>
                  {ach.date && <Text style={styles.achievementDate}>{formatDate(ach.date)}</Text>}
                  {ach.description && <Text style={styles.achievementDesc}>{ach.description}</Text>}
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
                      <Text style={styles.educationDetails}>{edu.description}</Text>
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
                  <Text style={styles.projectTitle}>{proj.name}</Text>
                  {proj.startDate && (
                    <Text style={styles.projectDate}>
                      {formatDate(proj.startDate)} - {proj.endDate ? formatDate(proj.endDate) : 'Ongoing'}
                    </Text>
                  )}
                  {proj.description && proj.description.split('\n').map((line, idx) => (
                    <Text key={idx} style={styles.projectDescription}>• {line}</Text>
                  ))}
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
                  {vol.description && vol.description.split('\n').map((line, idx) => (
                    <View key={idx} style={styles.achievementBullet}>
                      <Text style={styles.bulletIcon}>▶</Text>
                      <Text style={{ marginLeft: 15 }}>{line}</Text>
                    </View>
                  ))}
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
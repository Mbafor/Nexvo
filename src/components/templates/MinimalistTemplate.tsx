// Minimalist Elite Template - Pure Typography & White Space Excellence
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface MinimalistTemplateProps {
  data: CVData;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 48,
    backgroundColor: '#fff',
    color: '#222',
    fontSize: 11,
    lineHeight: 1.7,
    letterSpacing: 0.1,
    minHeight: '100%',
  },
  contactLabel: {
    fontSize: 8,
    color: '#bbb',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  nameUnderline: {
    width: 40,
    height: 2,
    backgroundColor: '#e0e0e0',
    marginTop: 4,
    marginBottom: 8,
    alignSelf: 'center',
    opacity: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  contactGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 8,
    marginBottom: 4,
  },
  contactItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  contactValue: {
    fontSize: 11,
    color: '#222',
    fontWeight: 'normal',
    textAlign: 'center',
    wordBreak: 'break-all',
  },

  // Pure Section Styling
  section: {
    marginBottom: 14,
    paddingBottom: 0,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
    position: 'relative',
  },
  sectionTitleLine: {
    position: 'absolute',
    bottom: -4,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 24,
    height: 1,
    backgroundColor: '#e0e0e0',
    opacity: 0.5,
  },
  
  // Content with Generous White Space
  contentContainer: {
    paddingHorizontal: 40,
  },
  
  // Experience - Zen-like Simplicity
  experienceItem: {
    marginBottom: 40,
    textAlign: 'center',
  },
  positionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    letterSpacing: 1,
  },
  companyName: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  dateRange: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  experienceDescription: {
    fontSize: 11,
    color: '#333',
    lineHeight: 1.6,
    textAlign: 'left',
    maxWidth: 420,
    alignSelf: 'center',
    marginTop: 2,
  },
  
  // Skills - Elegant Typography
  skillsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 500,
    gap: 20,
  },
  skillItem: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: 20,
    backgroundColor: '#fafafa',
  },
  skillItemExpert: {
    color: '#1a1a1a',
    borderColor: '#1a1a1a',
    backgroundColor: '#ffffff',
    fontWeight: 'bold',
  },
  
  // Education - Centered Elegance
  educationContainer: {
    alignItems: 'center',
  },
  educationItem: {
    marginBottom: 30,
    textAlign: 'center',
    maxWidth: 400,
  },
  degree: {
    fontSize: 13,
    color: '#1a1a1a',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  institution: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
    fontStyle: 'italic',
  },
  educationYear: {
    fontSize: 10,
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  educationDescription: {
    fontSize: 10,
    color: '#555',
    marginTop: 6,
    lineHeight: 1.5,
    textAlign: 'left',
  },
  
  // Projects - Clean Card Layout
  projectsContainer: {
    alignItems: 'center',
  },
  projectItem: {
    marginBottom: 35,
    textAlign: 'center',
    maxWidth: 450,
    padding: 25,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  projectName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  projectDate: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  projectDescription: {
    fontSize: 11,
    color: '#333',
    lineHeight: 1.5,
    marginBottom: 8,
    textAlign: 'left',
  },
  projectTechnologies: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
  },
  
  // Achievements - Minimal Showcase
  achievementsContainer: {
    alignItems: 'center',
  },
  achievementItem: {
    marginBottom: 25,
    textAlign: 'center',
    maxWidth: 400,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  achievementDate: {
    fontSize: 9,
    color: '#999999',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  achievementDescription: {
    fontSize: 10,
    color: '#444',
    lineHeight: 1.4,
    textAlign: 'left',
  },
  
  // Languages - Elegant Spacing
  languageContainer: {
    alignItems: 'center',
  },
  languageGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 30,
    marginTop: 20,
  },
  languageItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  languageName: {
    fontSize: 12,
    color: '#1a1a1a',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  languageLevel: {
    fontSize: 9,
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  languageProficiency: {
    width: 60,
    height: 2,
    backgroundColor: '#f0f0f0',
    marginTop: 6,
    borderRadius: 1,
  },
  languageProficiencyFill: {
    height: 2,
    backgroundColor: '#1a1a1a',
    borderRadius: 1,
  },
  
  // Certifications - Clean List
  certificationsContainer: {
    alignItems: 'center',
  },
  certificationItem: {
    marginBottom: 12,
    textAlign: 'center',
  },
  certificationText: {
    fontSize: 11,
    color: '#4a4a4a',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    backgroundColor: '#fafafa',
    borderRadius: 15,
  },
  
  // Volunteer Work - Minimal Cards
  volunteerContainer: {
    alignItems: 'center',
  },
  volunteerItem: {
    marginBottom: 30,
    textAlign: 'center',
    maxWidth: 400,
  },
  volunteerRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  volunteerOrganization: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 4,
    fontStyle: 'italic',
  },
  volunteerDate: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  volunteerDescription: {
    fontSize: 10,
    color: '#555',
    lineHeight: 1.4,
    textAlign: 'left',
  },
  
  // References - Clean Grid
  referencesContainer: {
    alignItems: 'center',
  },
  referenceGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 30,
    marginTop: 20,
  },
  referenceCard: {
    width: 180,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  referenceName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
    textAlign: 'center',
  },
  referenceTitle: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  referenceContact: {
    fontSize: 9,
    color: '#999999',
    textAlign: 'center',
  },
  
  // Hobbies - Simple Typography
  hobbiesContainer: {
    alignItems: 'center',
  },
  hobbiesText: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
    lineHeight: 1.5,
    maxWidth: 400,
    marginTop: 8,
  },
});

export default function MinimalistTemplate({ data }: MinimalistTemplateProps) {
  // Clean text utility to remove unwanted symbols and format bullet points
  const cleanText = (text: string) => {
    if (!text) return '';
    // Remove common unwanted symbols (¶, ¬, etc.)
    let cleaned = text.replace(/[¶¬•‣▪◦·]/g, '').replace(/\s+/g, ' ');
    // Split into bullet points if lines or bullets
    const bullets = cleaned.split(/\n|•|‣|▪|◦|·/).map(b => b.trim()).filter(b => b);
    if (bullets.length > 1) {
      return (
        <View>
          {bullets.map((b, i) => (
            <View key={i} style={{flexDirection:'row',alignItems:'flex-start',marginBottom:2}}>
              <Text style={{color:'#222',marginRight:6}}>•</Text>
              <Text style={{color:'#222',flex:1}}>{b}</Text>
            </View>
          ))}
        </View>
      );
    }
    return cleaned;
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

  // Get proficiency level percentage for language bars
  const getProficiencyWidth = (level: string) => {
    switch(level.toLowerCase()) {
      case 'native': return '100%';
      case 'fluent': return '90%';
      case 'advanced': return '75%';
      case 'intermediate': return '60%';
      case 'beginner': return '30%';
      default: return '50%';
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Ultra-Minimal Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <View style={styles.nameUnderline} />
          
          {data.personalInfo.summary && (
            <Text style={styles.subtitle}>
              {data.personalInfo.summary.split('\n')[0].substring(0, 60)}
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
          </View>
        </View>

        {/* Summary */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.sectionTitleLine} />
            <View style={styles.contentContainer}>
              <Text style={styles.experienceDescription}>{data.personalInfo.summary}</Text>
            </View>
          </View>
        )}

        {/* Experience */}
        {hasContent(data.experience || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            <View style={styles.sectionTitleLine} />
            <View style={styles.contentContainer}>
              {(data.experience || []).map(exp => (
                <View key={exp.id} style={styles.experienceItem}>
                  <Text style={styles.positionTitle}>{exp.position}</Text>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  <Text style={styles.dateRange}>
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </Text>
                  <View style={styles.experienceDescription}>
                    {exp.description ? cleanText(exp.description) : <Text style={{color:'#bbb',fontStyle:'italic'}}>No description provided.</Text>}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Skills */}
        {hasContent(data.skills || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.sectionTitleLine} />
            <View style={styles.skillsContainer}>
              <View style={styles.skillsGrid}>
                {(data.skills || []).map(skill => (
                  <Text 
                    key={skill.id} 
                    style={skill.level === 'expert' ? [styles.skillItem, styles.skillItemExpert] : styles.skillItem}
                  >
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Education */}
        {hasContent(data.education || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.sectionTitleLine} />
            <View style={styles.educationContainer}>
              {(data.education || []).map(edu => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree} in {edu.field}</Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.educationYear}>
                    {edu.current ? 'In Progress' : formatDate(edu.endDate)}
                  </Text>
                  {edu.description && (
                    <View style={styles.educationDescription}>{cleanText(edu.description)}</View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {hasContent(data.projects || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.sectionTitleLine} />
            <View style={styles.projectsContainer}>
              {(data.projects || []).map(proj => (
                <View key={proj.id} style={styles.projectItem}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  {proj.startDate && (
                    <Text style={styles.projectDate}>
                      {formatDate(proj.startDate)} — {proj.endDate ? formatDate(proj.endDate) : 'Ongoing'}
                    </Text>
                  )}
                  <View style={styles.projectDescription}>
                    {proj.description ? cleanText(proj.description) : <Text style={{color:'#bbb',fontStyle:'italic'}}>No description provided.</Text>}
                  </View>
                  {proj.technologies && (
                    <Text style={styles.projectTechnologies}>
                      Technologies: {typeof proj.technologies === 'string' 
                        ? proj.technologies 
                        : proj.technologies.join(', ')
                      }
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Achievements */}
        {hasContent(data.achievements || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.sectionTitleLine} />
            <View style={styles.achievementsContainer}>
              {(data.achievements || []).map(ach => (
                <View key={ach.id} style={styles.achievementItem}>
                  <Text style={styles.achievementTitle}>{ach.title}</Text>
                  {ach.date && (
                    <Text style={styles.achievementDate}>{formatDate(ach.date)}</Text>
                  )}
                  {ach.description && (
                    <View style={styles.achievementDescription}>{cleanText(ach.description)}</View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {hasContent(data.languages || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.sectionTitleLine} />
            <View style={styles.languageContainer}>
              <View style={styles.languageGrid}>
                {(data.languages || []).map(lang => (
                  <View key={lang.id} style={styles.languageItem}>
                    <Text style={styles.languageName}>{lang.name}</Text>
                    <Text style={styles.languageLevel}>{lang.level}</Text>
                    <View style={styles.languageProficiency}>
                      <View 
                        style={[
                          styles.languageProficiencyFill,
                          { width: getProficiencyWidth(lang.level) }
                        ]} 
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Certifications */}
        {hasContent(data.certifications || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <View style={styles.sectionTitleLine} />
            <View style={styles.certificationsContainer}>
              {(data.certifications || []).map((cert, index) => (
                <View key={index} style={styles.certificationItem}>
                  <Text style={styles.certificationText}>{cert}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Volunteer Work */}
        {hasContent(data.volunteerWork || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer</Text>
            <View style={styles.sectionTitleLine} />
            <View style={styles.volunteerContainer}>
              {(data.volunteerWork || []).map(vol => (
                <View key={vol.id} style={styles.volunteerItem}>
                  <Text style={styles.volunteerRole}>{vol.role}</Text>
                  <Text style={styles.volunteerOrganization}>{vol.organization}</Text>
                  <Text style={styles.volunteerDate}>
                    {formatDate(vol.startDate)} — {vol.current ? 'Present' : formatDate(vol.endDate)}
                  </Text>
                  <View style={styles.volunteerDescription}>
                    {vol.description ? cleanText(vol.description) : <Text style={{color:'#bbb',fontStyle:'italic'}}>No description provided.</Text>}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* References */}
        {hasContent(data.references || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            <View style={styles.sectionTitleLine} />
            <View style={styles.referencesContainer}>
              <View style={styles.referenceGrid}>
                {(data.references || []).map(ref => (
                  <View key={ref.id} style={styles.referenceCard}>
                    <Text style={styles.referenceName}>{ref.name}</Text>
                    <Text style={styles.referenceTitle}>{ref.position}</Text>
                    <Text style={styles.referenceTitle}>{ref.company}</Text>
                    {ref.email && (
                      <Text style={styles.referenceContact}>{ref.email}</Text>
                    )}
                    {ref.phone && (
                      <Text style={styles.referenceContact}>{ref.phone}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Interests */}
        {hasContent(data.hobbies || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.sectionTitleLine} />
            <View style={styles.hobbiesContainer}>
              <Text style={styles.hobbiesText}>
                {(data.hobbies || []).join(' • ')}
              </Text>
            </View>
          </View>
        )}
        
      </Page>
    </Document>
  );
}
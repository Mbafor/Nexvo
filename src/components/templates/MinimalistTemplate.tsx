// Elite Professional Template - Google-Level Standards & Modern Design
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface MinimalistTemplateProps {
  data: CVData;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 0,
    backgroundColor: '#fff',
    color: '#1a1a1a',
    fontSize: 10,
    lineHeight: 1.6,
    minHeight: '100%',
  },
  
  // Modern Hero Header
  heroSection: {
    backgroundColor: '#1976d2',
    padding: 40,
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  
  heroAccent: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    opacity: 0.05,
    borderRadius: 100,
  },
  
  heroName: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
    textAlign: 'left',
  },
  
  heroTitle: {
    fontSize: 16,
    marginBottom: 20,
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: 'normal',
  },
  
  heroSummary: {
    fontSize: 12,
    lineHeight: 1.7,
    opacity: 0.95,
    maxWidth: 500,
    marginTop: 16,
    marginBottom: 25,
  },
  
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 25,
    marginTop: 5,
  },
  
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  contactIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginRight: 8,
    opacity: 0.9,
  },
  
  contactText: {
    fontSize: 11,
    opacity: 0.95,
    fontWeight: 'normal',
  },
  
  // Content Container - Optimized Spacing
  contentContainer: {
    padding: '28 32',
    backgroundColor: '#fff',
  },
  
  // Modern Section Styling - Improved Spacing
  section: {
    marginBottom: 24,
    position: 'relative',
  },
  
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  
  sectionIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#1976d2',
    borderRadius: 10,
    marginRight: 12,
    opacity: 0.9,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  
  // Professional Experience Cards - Improved Layout
  experienceCard: {
    marginBottom: 20,
    padding: 18,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
    position: 'relative',
  },
  
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  
  experienceLeft: {
    flex: 2,
    marginRight: 8,
  },
  
  experienceRight: {
    alignItems: 'flex-end',
    flex: 1,
    minWidth: 80,
  },
  
  positionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  
  companyName: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  
  locationText: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
  },
  
  dateRangeBox: {
    backgroundColor: '#1976d2',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 70,
    maxWidth: 120,
  },
  
  experienceDescription: {
    marginTop: 12,
    fontSize: 10,
    color: '#000000',  // Changed from #333 to pure black for better visibility
    lineHeight: 1.6,
  },
  
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  
  bulletDot: {
    width: 4,
    height: 4,
    backgroundColor: '#1976d2',
    borderRadius: 2,
    marginTop: 5,
    marginRight: 6,
    flexShrink: 0,
  },
  
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#000000',  // Changed from #333 to pure black for better visibility
    lineHeight: 1.4,
  },
  
  // Skills Grid
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  
  skillChip: {
    backgroundColor: '#1976d2',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  skillChipExpert: {
    backgroundColor: '#ff6b35',
  },
  
  // Education Cards - Improved Layout
  educationCard: {
    marginBottom: 16,
    padding: 14,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderTopWidth: 3,
    borderTopColor: '#1976d2',
  },
  
  degreeTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  
  institutionName: {
    fontSize: 11,
    color: '#1976d2',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  
  graduationYear: {
    fontSize: 10,
    color: '#666',
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  
  // Project Showcase - Improved Layout
  projectCard: {
    marginBottom: 20,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  
  projectName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1976d2',
    letterSpacing: 0.3,
    flex: 2,
    marginRight: 8,
  },
  
  projectStatus: {
    backgroundColor: '#4caf50',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    minWidth: 70,
    textAlign: 'center',
  },
  
  projectDescription: {
    fontSize: 10,
    color: '#000000',  // Changed from #333 to pure black for better visibility
    lineHeight: 1.6,
    marginBottom: 12,
    marginTop: 8,      // Added margin top for spacing
  },
  
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  
  techTag: {
    backgroundColor: '#f0f0f0',
    color: '#1976d2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 8,
    fontWeight: 'bold',
  },
  
  // Achievement Highlights - Improved Layout
  achievementCard: {
    marginBottom: 14,
    padding: 14,
    backgroundColor: '#fff7e6',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
    position: 'relative',
  },
  
  achievementIcon: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 20,
    height: 20,
    backgroundColor: '#ff9800',
    borderRadius: 10,
  },
  
  achievementTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
    marginRight: 28,
    lineHeight: 1.3,
  },
  
  achievementDate: {
    fontSize: 9,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Clean Lists
  listContainer: {
    marginTop: 8,
  },
  
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  
  listDot: {
    width: 6,
    height: 6,
    backgroundColor: '#1976d2',
    borderRadius: 3,
    marginRight: 10,
  },
  
  listText: {
    fontSize: 10,
    color: '#333',
    flex: 1,
  },
  
  // Two Column Layout - Improved Spacing
  twoColumnRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  
  leftColumn: {
    flex: 1,
    paddingRight: 8,
  },
  
  rightColumn: {
    flex: 1,
    paddingLeft: 8,
  },
});

export default function MinimalistTemplate({ data }: MinimalistTemplateProps) {
  // Enhanced text utility for modern bullet points - ALWAYS show as bullets
  const renderDescription = (text: string, customStyle?: any) => {
    if (!text || !text.trim()) return null;
    
    // Clean and split into bullet points
    const cleaned = text.replace(/[¶¬•‣▪◦·]/g, '').replace(/\s+/g, ' ').trim();
    
    if (!cleaned) return null; // Return null if empty after cleaning
    
    // Split by newlines or existing bullet points and filter empty items
    let bullets = cleaned.split(/\n|•|‣|▪|◦|·/).map(b => b.trim()).filter(b => b.length > 0);
    
    // If only one item and it's long, try to split by sentence or period
    if (bullets.length === 1 && bullets[0].length > 100) {
      const sentences = bullets[0].split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10);
      if (sentences.length > 1) {
        bullets = sentences;
      }
    }
    
    const containerStyle = customStyle || styles.experienceDescription;
    
    // ALWAYS render as bullet points for consistency
    return (
      <View style={containerStyle}>
        {bullets.map((bullet, idx) => (
          <View key={idx} style={styles.bulletPoint}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>{bullet}</Text>
          </View>
        ))}
      </View>
    );
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
        
        {/* Modern Hero Header */}
        <View style={styles.heroSection}>
          <View style={styles.heroAccent} />
          
          <Text style={styles.heroName}>{data.personalInfo.fullName}</Text>
          
          {data.personalInfo.summary && (
            <Text style={styles.heroSummary}>
              {data.personalInfo.summary.length > 200 
                ? data.personalInfo.summary.substring(0, 200) + '...'
                : data.personalInfo.summary
              }
            </Text>
          )}
          
          <View style={styles.contactRow}>
            {data.personalInfo.email && (
              <View style={styles.contactItem}>
                <View style={styles.contactIcon} />
                <Text style={styles.contactText}>{data.personalInfo.email}</Text>
              </View>
            )}
            {data.personalInfo.phone && (
              <View style={styles.contactItem}>
                <View style={styles.contactIcon} />
                <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
              </View>
            )}
            {data.personalInfo.location && (
              <View style={styles.contactItem}>
                <View style={styles.contactIcon} />
                <Text style={styles.contactText}>{data.personalInfo.location}</Text>
              </View>
            )}
            {data.personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <View style={styles.contactIcon} />
                <Text style={styles.contactText}>LinkedIn</Text>
              </View>
            )}
            {data.personalInfo.website && (
              <View style={styles.contactItem}>
                <View style={styles.contactIcon} />
                <Text style={styles.contactText}>Website</Text>
              </View>
            )}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          
          {/* Professional Experience */}
          {hasContent(data.experience || []) && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>Professional Experience</Text>
              </View>
              
              {(data.experience || []).map(exp => (
                <View key={exp.id} style={styles.experienceCard}>
                  <View style={styles.experienceHeader}>
                    <View style={styles.experienceLeft}>
                      <Text style={styles.positionTitle}>{exp.position}</Text>
                      <Text style={styles.companyName}>{exp.company}</Text>
                      {exp.location && (
                        <Text style={styles.locationText}>{exp.location}</Text>
                      )}
                    </View>
                    <View style={styles.experienceRight}>
                      <View style={styles.dateRangeBox}>
                        <Text>
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {exp.description && renderDescription(exp.description)}
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {hasContent(data.projects || []) && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>Key Projects</Text>
              </View>
              
              {(data.projects || []).map(proj => (
                <View key={proj.id} style={styles.projectCard}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.projectName}>{proj.name}</Text>
                    <View style={styles.projectStatus}>
                      <Text>{proj.endDate ? 'Completed' : 'In Progress'}</Text>
                    </View>
                  </View>
                  
                  {proj.description && renderDescription(proj.description, styles.projectDescription)}
                  
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

             {/* Skills & Technologies */}
          {hasContent(data.skills || []) && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>Skills & Technologies</Text>
              </View>
              
              <View style={styles.skillsGrid}>
                {(data.skills || []).map(skill => (
                  <Text 
                    key={skill.id} 
                    style={skill.level === 'expert' ? [styles.skillChip, styles.skillChipExpert] : styles.skillChip}
                  >
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Education & Achievements in Two Columns */}
          <View style={styles.twoColumnRow}>
            
            {/* Education */}
            {hasContent(data.education || []) && (
              <View style={styles.leftColumn}>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Education</Text>
                  </View>
                  
                  {(data.education || []).map(edu => (
                    <View key={edu.id} style={styles.educationCard}>
                      <Text style={styles.degreeTitle}>
                        {edu.degree} in {edu.field}
                      </Text>
                      <Text style={styles.institutionName}>{edu.institution}</Text>
                      <View style={styles.graduationYear}>
                        <Text>
                          {edu.current ? 'In Progress' : formatDate(edu.endDate)}
                        </Text>
                      </View>
                      {edu.description && renderDescription(edu.description)}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Achievements */}
            {hasContent(data.achievements || []) && (
              <View style={styles.rightColumn}>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Key Achievements</Text>
                  </View>
                  
                  {(data.achievements || []).map(ach => (
                    <View key={ach.id} style={styles.achievementCard}>
                      <View style={styles.achievementIcon} />
                      <Text style={styles.achievementTitle}>{ach.title}</Text>
                      {ach.date && (
                        <Text style={styles.achievementDate}>
                          {formatDate(ach.date)}
                        </Text>
                      )}
                      {ach.description && renderDescription(ach.description)}
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Additional Sections */}
          <View style={styles.twoColumnRow}>
            
            {/* Languages */}
            {hasContent(data.languages || []) && (
              <View style={styles.leftColumn}>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Languages</Text>
                  </View>
                  
                  <View style={styles.listContainer}>
                    {(data.languages || []).map(lang => (
                      <View key={lang.id} style={styles.listItem}>
                        <View style={styles.listDot} />
                        <Text style={styles.listText}>
                          {lang.name} - {lang.level}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {/* Certifications */}
            {hasContent(data.certifications || []) && (
              <View style={styles.rightColumn}>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Certifications</Text>
                  </View>
                  
                  <View style={styles.listContainer}>
                    {(data.certifications || []).map((cert, index) => (
                      <View key={index} style={styles.listItem}>
                        <View style={styles.listDot} />
                        <Text style={styles.listText}>{cert}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Volunteer Work */}
          {hasContent(data.volunteerWork || []) && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>Volunteer Experience</Text>
              </View>
              
              {(data.volunteerWork || []).map(vol => (
                <View key={vol.id} style={styles.experienceCard}>
                  <View style={styles.experienceHeader}>
                    <View style={styles.experienceLeft}>
                      <Text style={styles.positionTitle}>{vol.role}</Text>
                      <Text style={styles.companyName}>{vol.organization}</Text>
                    </View>
                    <View style={styles.experienceRight}>
                      <View style={styles.dateRangeBox}>
                        <Text>
                          {formatDate(vol.startDate)} - {vol.current ? 'Present' : formatDate(vol.endDate)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {vol.description && renderDescription(vol.description)}
                </View>
              ))}
            </View>
          )}

          {/* Interests */}
          {hasContent(data.hobbies || []) && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>Interests</Text>
              </View>
              
              <View style={styles.skillsGrid}>
                {(data.hobbies || []).map((hobby, index) => (
                  <Text key={index} style={styles.skillChip}>{hobby}</Text>
                ))}
              </View>
            </View>
          )}
          
        </View>
      </Page>
    </Document>
  );
}
// Creative Masterpiece Template - Bold, artistic design for creative professionals
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';

interface CreativeTemplateProps {
  data: CVData;
}

// Helper function to render bullet points
const renderBulletPoints = (text: string | undefined, style: any) => {
  if (!text || !text.trim()) return null;
  
  const lines = text.split('\n').filter(line => line.trim());
  
  return (
    <View>
      {lines.map((line, index) => {
        const trimmedLine = line.trim();
        // Ensure bullet point format
        const bulletText = trimmedLine.startsWith('•') || trimmedLine.startsWith('-') 
          ? trimmedLine 
          : `• ${trimmedLine}`;
        
        return (
          <Text key={index} style={[styles.bulletPoint, style]}>
            {bulletText}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  page: { 
    fontFamily: 'Helvetica', 
    padding: 0, 
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontSize: 10,
    lineHeight: 1.6
  },
  
  // Modern Creative Header
  headerContainer: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 40,
    paddingVertical: 40,
    position: 'relative',
    overflow: 'hidden'
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  headerInfo: {
    flex: 1
  },
  decorativeElement: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    backgroundColor: '#60a5fa',
    opacity: 0.2,
    borderRadius: 75
  },
  decorativeElement2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    backgroundColor: '#3b82f6',
    opacity: 0.15,
    borderRadius: 50
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    objectFit: 'cover',
  },
  name: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: -0.5,
    zIndex: 1
  },
  titleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
    backdropFilter: 'blur(10px)'
  },
  title: { 
    fontSize: 12, 
    color: '#ffffff',
    fontWeight: 500,
    letterSpacing: 0.5,
    textAlign: 'center'
  },


  contactGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12
  },
  contactChip: { 
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2563eb'
  },
  contactText: { 
    fontSize: 9,
    color: '#ffffff',
    fontWeight: 400
  },
  
  // Content Area - Clean and Modern
  contentArea: {
    paddingHorizontal: 40,
    paddingTop: 25,
    backgroundColor: '#ffffff'
  },
  
  // Professional Two-column Layout - Increased both columns
  asymmetricContainer: {
    flexDirection: 'row',
    gap: 8
  },
  mainColumn: {
    flex: 2.8,
    paddingRight: 5
  },
  accentColumn: {
    flex: 1.3,
    paddingLeft: 5,
    borderLeftWidth: 2,
    borderLeftColor: '#e5e7eb'
  },
  
  // Clean Section Styling
  section: { 
    marginBottom: 25
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb'
  },
  sectionIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    marginRight: 10
  },
  sectionTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#1f2937',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  
  // Professional Profile
  profileContainer: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    marginBottom: 25
  },
  profileText: { 
    fontSize: 11, 
    lineHeight: 1.7,
    color: '#374151',
    textAlign: 'justify'
  },
  
  // Modern Experience Cards - Increased size
  experienceCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    position: 'relative'
  },
  experienceAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 3,
    height: '100%',
    backgroundColor: '#2563eb'
  },
  jobTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6
  },
  jobTitle: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#1f2937',
    flex: 1
  },

  dateText: {
    fontSize: 9,
    color: '#2563eb',
    fontWeight: 500,
    textAlign: 'center'
  },
  locationBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    marginBottom: 8,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationText: {
    fontSize: 8,
    color: '#2563eb',
    fontWeight: 500,
    textAlign: 'center'
  },
  bulletPoint: { 
    fontSize: 10, 
    marginLeft: 12, 
    marginBottom: 3,
    color: '#4b5563',
    lineHeight: 1.5
  },
  
  // Skills with Compact Tags - Space efficient
  skillTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4
  },
  skillCategoryTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4b5563',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  skillTag: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  skillTagText: {
    fontSize: 8,
    color: '#2563eb',
    fontWeight: 500,
    textAlign: 'center'
  },
  skillListText: {
    fontSize: 9,
    color: '#2563eb',
    lineHeight: 1.4,
    textAlign: 'left'
  },
  
  // Modern Project Cards - Increased size
  projectCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    marginBottom: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6
  },
  projectMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  techStackContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 8
  },
  techChip: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 7,
    color: '#ffffff',
    textAlign: 'center'
  },
  
  // Clean Achievement Design - Blue theme
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2563eb'
  },
  achievementIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#2563eb',
    borderRadius: 6,
    marginRight: 8,
    marginTop: 2
  },
  achievementContent: {
    flex: 1
  },
  achievementTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2
  },
  
  // Sidebar Styling - Reduced spacing
  sidebarSection: {
    marginBottom: 15
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  
  // Modern Education Cards - Reduced spacing
  educationCard: {
    backgroundColor: '#f8fafc',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  degreeTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2
  },
  institutionName: {
    fontSize: 9,
    color: '#2563eb',
    fontWeight: 500,
    marginBottom: 3
  },
  dateInfo: {
    fontSize: 8,
    color: '#2563eb',
    fontWeight: 500
  },
  
  // Language Proficiency - Reduced spacing
  languageItem: {
    backgroundColor: '#ffffff',
    padding: 6,
    marginBottom: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  languageName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center'
  },
  proficiencyBadge: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  proficiencyText: {
    fontSize: 7,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  
  // Certification Badges - Restored colors with centered text
  certBadge: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#93c5fd',
    padding: 5,
    marginBottom: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  certText: {
    fontSize: 8,
    color: '#2563eb',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  
  // Interest Tags - Reduced spacing
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3
  },
  hobbyTag: {
    
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 7,
    color: '#374151',
    textAlign: 'center'
  }
});

export default function CreativeTemplatePDF({ data }: CreativeTemplateProps) {
  // Helper function to check if array has meaningful content
  const hasContent = (arr: any[]) =>
    arr && arr.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Modern Creative Header */}
        <View style={styles.headerContainer}>
          <View style={styles.decorativeElement} />
          <View style={styles.decorativeElement2} />
          <View style={styles.headerContent}>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
              
              {/* Contact details below the name */}
              <View style={styles.contactGrid}>
                {data.personalInfo.email && (
                  <View style={styles.contactChip}>
                    <Text style={styles.contactText}>{data.personalInfo.email}</Text>
                  </View>
                )}
                {data.personalInfo.phone && (
                  <View style={styles.contactChip}>
                    <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
                  </View>
                )}
                {data.personalInfo.location && (
                  <View style={styles.contactChip}>
                    <Text style={styles.contactText}>{data.personalInfo.location}</Text>
                  </View>
                )}
                {data.personalInfo.linkedin && (
                  <View style={styles.contactChip}>
                    <Text style={styles.contactText}>LinkedIn</Text>
                  </View>
                )}
                {data.personalInfo.website && (
                  <View style={styles.contactChip}>
                    <Text style={styles.contactText}>Portfolio</Text>
                  </View>
                )}
              </View>
            </View>
            {data.personalInfo.photo && (
              <Image src={data.personalInfo.photo} style={styles.profilePhoto} />
            )}
          </View>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
          
          {/* Professional Profile */}
          {data.personalInfo.summary && (
            <View style={styles.profileContainer}>
              <Text style={styles.profileText}>{data.personalInfo.summary}</Text>
            </View>
          )}

          <View style={styles.asymmetricContainer}>
            
            {/* Main Column */}
            <View style={styles.mainColumn}>
              
              {/* Professional Experience */}
              {hasContent(data.experience || []) && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Professional Experience</Text>
                  </View>
                  {(data.experience || []).map(exp => (
                    <View key={exp.id} style={styles.experienceCard}>
                      <View style={styles.experienceAccent} />
                      <View style={styles.jobTitleRow}>
                        <Text style={styles.jobTitle}>{exp.position}, {exp.company}</Text>
                        <View>
                          <Text style={styles.dateText}>
                            {exp.startDate} - {exp.endDate || 'Present'}
                          </Text>
                        </View>
                      </View>
                      {exp.location && (
                        <View style={styles.locationBadge}>
                          <Text style={styles.locationText}>{exp.location}</Text>
                        </View>
                      )}
                      {renderBulletPoints(exp.description, {})}
                    </View>
                  ))}
                </View>
              )}

              {/* Key Projects */}
              {hasContent(data.projects || []) && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Key Projects</Text>
                  </View>
                  {(data.projects || []).map(project => (
                    <View key={project.id} style={styles.projectCard}>
                      <View style={styles.jobTitleRow}>
                        <Text style={styles.projectTitle}>{project.name}</Text>
                        <View>
                          <Text style={styles.dateText}>
                            {project.startDate} - {project.endDate || 'Present'}
                          </Text>
                        </View>
                      </View>
                      {renderBulletPoints(project.description, {})}
                      {project.technologies && (
                        <View style={styles.techStackContainer}>
                          {(typeof project.technologies === 'string' 
                            ? project.technologies.split(',') 
                            : project.technologies
                          ).map((tech: string, idx: number) => (
                            <Text key={idx} style={styles.techChip}>{tech.trim()}</Text>
                          ))}
                        </View>
                      )}
                      {project.link && (
                        <Text style={[styles.contactText, { marginTop: 8, fontSize: 8, color: '#2563eb' }]}>
                          {project.link}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* Volunteer Experience */}
              {hasContent(data.volunteerWork || []) && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Volunteer Experience</Text>
                  </View>
                  {(data.volunteerWork || []).map(vol => (
                    <View key={vol.id} style={styles.experienceCard}>
                      <View style={styles.experienceAccent} />
                      <View style={styles.jobTitleRow}>
                        <Text style={styles.jobTitle}>{vol.role}, {vol.organization}</Text>
                        <View>
                          <Text style={styles.dateText}>
                            {vol.startDate} - {vol.endDate || 'Present'}
                          </Text>
                        </View>
                      </View>
                      {renderBulletPoints(vol.description, {})}
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Accent Column */}
            <View style={styles.accentColumn}>
              
              {/* Skills & Expertise */}
              {hasContent(data.skills || []) && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Skills & Expertise</Text>
                  
                  {/* Technical Skills */}
                  {(data.skills || []).filter(skill => skill.type === 'technical').length > 0 && (
                    <View style={{ marginBottom: 6 }}>
                      <Text style={[styles.skillCategoryTitle, { marginBottom: 4 }]}>Technical</Text>
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
                      <Text style={[styles.skillCategoryTitle, { marginBottom: 4 }]}>Soft Skills</Text>
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

              {/* Education */}
              {hasContent(data.education || []) && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Education</Text>
                  {(data.education || []).map(edu => (
                    <View key={edu.id} style={styles.educationCard}>
                      <Text style={styles.degreeTitle}>{edu.degree}</Text>
                      <Text style={styles.institutionName}>{edu.institution}</Text>
                      <Text style={styles.dateInfo}>
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </Text>
                      {renderBulletPoints(edu.description, { fontSize: 8, color: '#4b5563', lineHeight: 1.4, marginLeft: 0, marginTop: 4 })}
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
                      <View style={styles.proficiencyBadge}>
                        <Text style={styles.proficiencyText}>{lang.level}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Certifications */}
              {hasContent(data.certifications || []) && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Certifications</Text>
                  {(data.certifications || []).map((cert, index) => (
                    <View key={index} style={styles.certBadge}>
                      <Text style={styles.certText}>{cert}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Achievements & Awards */}
              {hasContent(data.achievements || []) && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Achievements & Awards</Text>
                  {(data.achievements || []).map(ach => (
                    <View key={ach.id} style={styles.achievementItem}>
                      <View style={styles.achievementIcon} />
                      <View style={styles.achievementContent}>
                        <Text style={styles.achievementTitle}>{ach.title}</Text>
                        {ach.date && (
                          <Text style={[styles.dateInfo, { marginBottom: 3 }]}>
                            {ach.date}
                          </Text>
                        )}
                        {renderBulletPoints(ach.description, { fontSize: 8, color: '#4b5563', lineHeight: 1.4, marginLeft: 0 })}
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Interests */}
              {hasContent(data.hobbies || []) && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Interests</Text>
                  <View style={styles.hobbiesContainer}>
                    {(data.hobbies || []).map((hobby, index) => (
                      <Text key={index} style={styles.hobbyTag}>{hobby}</Text>
                    ))}
                  </View>
                </View>
              )}

              {/* References */}
              {hasContent(data.references || []) && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>References</Text>
                  {(data.references || []).map(ref => (
                    <View key={ref.id} style={styles.educationCard}>
                      <Text style={styles.degreeTitle}>{ref.name}</Text>
                      <Text style={styles.institutionName}>{ref.position}</Text>
                      {ref.company && (
                        <Text style={styles.dateInfo}>{ref.company}</Text>
                      )}
                      {ref.email && (
                        <Text style={[styles.contactText, { fontSize: 8, color: '#6b7280', marginTop: 2 }]}>
                          {ref.email}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

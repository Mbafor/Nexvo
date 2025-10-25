// Creative Masterpiece Template - Bold, artistic design for creative professionals
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface CreativeTemplateProps {
  data: CVData;
}

const styles = StyleSheet.create({
  page: { 
    fontFamily: 'Helvetica', 
    padding: 0, 
    backgroundColor: '#0f0f23',
    color: '#ffffff',
    fontSize: 10,
    lineHeight: 1.5
  },
  
  // Artistic Header with Gradient Effect
  headerContainer: {
    backgroundColor: '#1a1a3a',
    paddingHorizontal: 40,
    paddingVertical: 50,
    position: 'relative',
    borderBottomWidth: 4,
    borderBottomColor: '#ff6b6b'
  },
  decorativeElement: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: 200,
    backgroundColor: '#4ecdc4',
    opacity: 0.1,
    borderRadius: 100
  },
  name: { 
    fontSize: 42, 
    fontWeight: 'bold', 
    color: '#ffffff',
    marginBottom: 12,
    letterSpacing: -1,
    textTransform: 'uppercase'
  },
  titleContainer: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginBottom: 20
  },
  title: { 
    fontSize: 14, 
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  contactGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    gap: 15
  },
  contactChip: { 
    backgroundColor: '#2a2a4a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4ecdc4'
  },
  contactText: { 
    fontSize: 9,
    color: '#4ecdc4',
    fontWeight: 500
  },
  
  // Content with Creative Layout
  contentArea: {
    paddingHorizontal: 40,
    paddingTop: 30,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    minHeight: 600
  },
  
  // Creative Two-column with asymmetric design
  asymmetricContainer: {
    flexDirection: 'row',
    gap: 25
  },
  mainColumn: {
    flex: 2.5,
    paddingRight: 20
  },
  accentColumn: {
    flex: 1,
    paddingLeft: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#ff6b6b'
  },
  
  // Section Styling with Creative Flair
  section: { 
    marginBottom: 35
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  },
  sectionIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#ff6b6b',
    borderRadius: 12,
    marginRight: 12
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1a1a3a',
    textTransform: 'uppercase',
    letterSpacing: 1.5
  },
  
  // Professional Profile with Creative Styling
  profileContainer: {
    backgroundColor: '#f8f9ff',
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4ecdc4',
    marginBottom: 20
  },
  profileText: { 
    fontSize: 11, 
    lineHeight: 1.8,
    color: '#2a2a4a',
    textAlign: 'justify',
    fontStyle: 'italic'
  },
  
  // Experience with Creative Cards
  experienceCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e8ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative'
  },
  experienceAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    backgroundColor: '#4ecdc4'
  },
  jobTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  jobTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#1a1a3a',
    flex: 1
  },
  dateChip: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  dateText: {
    fontSize: 8,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  companyName: { 
    fontSize: 12, 
    color: '#4ecdc4', 
    fontWeight: 'bold',
    marginRight: 10
  },
  locationBadge: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4ecdc4'
  },
  locationText: {
    fontSize: 8,
    color: '#2a2a4a'
  },
  descriptionText: { 
    fontSize: 10, 
    marginLeft: 0, 
    marginBottom: 4,
    color: '#4a4a6a',
    lineHeight: 1.6
  },
  
  // Skills with Creative Progress Bars
  skillsGrid: {
    gap: 12
  },
  skillItem: {
    backgroundColor: '#f8f9ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  skillName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a3a'
  },
  skillLevel: {
    fontSize: 9,
    color: '#6a6a8a',
    backgroundColor: '#e1e8ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8
  },
  skillBarContainer: {
    height: 6,
    backgroundColor: '#e1e8ff',
    borderRadius: 3,
    overflow: 'hidden'
  },
  skillBar: {
    height: 6,
    backgroundColor: '#4ecdc4',
    borderRadius: 3
  },
  
  // Projects with Creative Layout
  projectCard: {
    backgroundColor: '#1a1a3a',
    padding: 18,
    marginBottom: 16,
    borderRadius: 12,
    color: '#ffffff'
  },
  projectTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4ecdc4',
    marginBottom: 8
  },
  projectMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  techStackContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 8
  },
  techChip: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    fontSize: 7,
    color: '#ffffff'
  },
  
  // Achievements with Awards Style
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#fff9e6',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffa726'
  },
  achievementIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#ffa726',
    borderRadius: 10,
    marginRight: 12,
    marginTop: 2
  },
  achievementContent: {
    flex: 1
  },
  achievementTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a3a',
    marginBottom: 4
  },
  achievementDesc: {
    fontSize: 9,
    color: '#4a4a6a',
    lineHeight: 1.5
  },
  
  // Sidebar Styling
  sidebarSection: {
    marginBottom: 25
  },
  sidebarTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a3a',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  
  // Education with Academic Style
  educationCard: {
    backgroundColor: '#f0f8ff',
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4ecdc4'
  },
  degreeTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a3a',
    marginBottom: 3
  },
  institutionName: {
    fontSize: 10,
    color: '#4ecdc4',
    fontWeight: 500,
    marginBottom: 4
  },
  dateInfo: {
    fontSize: 8,
    color: '#6a6a8a'
  },
  
  // Languages with Flag-like Design
  languageItem: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e8ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  languageName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a3a'
  },
  proficiencyBadge: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10
  },
  proficiencyText: {
    fontSize: 7,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  
  // Certifications as Badges
  certBadge: {
    backgroundColor: '#ff6b6b',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center'
  },
  certText: {
    fontSize: 8,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  
  // Hobbies with Creative Icons
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  hobbyTag: {
    backgroundColor: '#f8f9ff',
    borderWidth: 1,
    borderColor: '#4ecdc4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 8,
    color: '#2a2a4a'
  }
});

export default function CreativeTemplatePDF({ data }: CreativeTemplateProps) {
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
    const levels = { 'Beginner': 25, 'Intermediate': 50, 'Advanced': 75, 'Expert': 90 };
    return levels[level as keyof typeof levels] || 50;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Creative Header */}
        <View style={styles.headerContainer}>
          <View style={styles.decorativeElement} />
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          {data.personalInfo.summary && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {data.personalInfo.summary.split('\n')[0].substring(0, 60)}
              </Text>
            </View>
          )}
          <View style={styles.contactGrid}>
            {data.personalInfo.email && (
              <View style={styles.contactChip}>
                <Text style={styles.contactText}>✉ {data.personalInfo.email}</Text>
              </View>
            )}
            {data.personalInfo.phone && (
              <View style={styles.contactChip}>
                <Text style={styles.contactText}>📱 {data.personalInfo.phone}</Text>
              </View>
            )}
            {data.personalInfo.location && (
              <View style={styles.contactChip}>
                <Text style={styles.contactText}>📍 {data.personalInfo.location}</Text>
              </View>
            )}
            {data.personalInfo.linkedin && (
              <View style={styles.contactChip}>
                <Text style={styles.contactText}>💼 LinkedIn</Text>
              </View>
            )}
            {data.personalInfo.website && (
              <View style={styles.contactChip}>
                <Text style={styles.contactText}>🌐 Portfolio</Text>
              </View>
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
                    <Text style={styles.sectionTitle}>Experience</Text>
                  </View>
                  {(data.experience || []).map(exp => (
                    <View key={exp.id} style={styles.experienceCard}>
                      <View style={styles.experienceAccent} />
                      <View style={styles.jobTitleRow}>
                        <Text style={styles.jobTitle}>{exp.position}</Text>
                        <View style={styles.dateChip}>
                          <Text style={styles.dateText}>
                            {formatDate(exp.startDate)} - {exp.current ? 'Now' : formatDate(exp.endDate)}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.companyInfo}>
                        <Text style={styles.companyName}>{exp.company}</Text>
                        {exp.location && (
                          <View style={styles.locationBadge}>
                            <Text style={styles.locationText}>{exp.location}</Text>
                          </View>
                        )}
                      </View>
                      {exp.description && exp.description.split('\n').map((line, idx) => (
                        <Text key={idx} style={styles.descriptionText}>• {line}</Text>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {/* Projects */}
              {hasContent(data.projects || []) && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Featured Projects</Text>
                  </View>
                  {(data.projects || []).map(project => (
                    <View key={project.id} style={styles.projectCard}>
                      <Text style={styles.projectTitle}>{project.name}</Text>
                      <View style={styles.projectMeta}>
                        <Text style={[styles.dateText, { color: '#ffffff' }]}>
                          {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Ongoing'}
                        </Text>
                      </View>
                      {project.description && project.description.split('\n').map((line, idx) => (
                        <Text key={idx} style={[styles.descriptionText, { color: '#e1e8ff', marginBottom: 3 }]}>
                          • {line}
                        </Text>
                      ))}
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
                        <Text style={[styles.contactText, { marginTop: 8 }]}>🔗 {project.link}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* Achievements */}
              {hasContent(data.achievements || []) && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Achievements</Text>
                  </View>
                  {(data.achievements || []).map(ach => (
                    <View key={ach.id} style={styles.achievementItem}>
                      <View style={styles.achievementIcon} />
                      <View style={styles.achievementContent}>
                        <Text style={styles.achievementTitle}>{ach.title}</Text>
                        {ach.date && (
                          <Text style={[styles.dateInfo, { marginBottom: 4 }]}>
                            {formatDate(ach.date)}
                          </Text>
                        )}
                        {ach.description && ach.description.split('\n').map((line, idx) => (
                          <Text key={idx} style={styles.achievementDesc}>• {line}</Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Accent Column */}
            <View style={styles.accentColumn}>
              
              {/* Skills */}
              {hasContent(data.skills || []) && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Skills</Text>
                  <View style={styles.skillsGrid}>
                    {(data.skills || []).map(skill => (
                      <View key={skill.id} style={styles.skillItem}>
                        <View style={styles.skillHeader}>
                          <Text style={styles.skillName}>{skill.name}</Text>
                          <Text style={styles.skillLevel}>{skill.level}</Text>
                        </View>
                        <View style={styles.skillBarContainer}>
                          <View style={[styles.skillBar, { width: `${getSkillWidth(skill.level)}%` }]} />
                        </View>
                      </View>
                    ))}
                  </View>
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
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </Text>
                      {edu.description && (
                        <Text style={[styles.achievementDesc, { marginTop: 4 }]}>
                          {edu.description}
                        </Text>
                      )}
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

              {/* Volunteer Work */}
              {hasContent(data.volunteerWork || []) && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Volunteer Work</Text>
                  {(data.volunteerWork || []).map(vol => (
                    <View key={vol.id} style={[styles.educationCard, { backgroundColor: '#fff9e6', borderColor: '#ffa726' }]}>
                      <Text style={styles.degreeTitle}>{vol.role}</Text>
                      <Text style={styles.institutionName}>{vol.organization}</Text>
                      <Text style={styles.dateInfo}>
                        {formatDate(vol.startDate)} - {vol.current ? 'Present' : formatDate(vol.endDate)}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Hobbies & Interests */}
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
                        <Text style={[styles.contactText, { fontSize: 7, color: '#2a2a4a', marginTop: 2 }]}>
                          ✉ {ref.email}
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

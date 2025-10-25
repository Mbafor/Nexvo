// Modern Elite Template - Google-inspired design with stunning visual hierarchy
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface ModernTemplateProps {
  data: CVData;
}

const styles = StyleSheet.create({
  page: { 
    fontFamily: 'Helvetica', 
    padding: 0, 
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontSize: 10,
    lineHeight: 1.6
  },
  
  // Header Section - Hero style
  headerContainer: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 40,
    paddingTop: 50,
    paddingBottom: 40,
    position: 'relative'
  },
  headerAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#2563eb'
  },
  name: { 
    fontSize: 36, 
    fontWeight: 'bold', 
    color: '#0f172a',
    marginBottom: 8,
    letterSpacing: -0.5
  },
  title: { 
    fontSize: 16, 
    color: '#475569',
    marginBottom: 20,
    fontWeight: 300,
    lineHeight: 1.4
  },
  contactGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    gap: 20
  },
  contactItem: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  contactIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
    color: '#2563eb'
  },
  contactText: { 
    fontSize: 10,
    color: '#64748b',
    fontWeight: 400
  },
  
  // Content Area
  contentArea: {
    paddingHorizontal: 40,
    paddingTop: 30
  },
  
  // Two-column layout
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 30
  },
  leftColumn: {
    flex: 2,
    paddingRight: 15
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 15,
    borderLeftWidth: 1,
    borderLeftColor: '#e2e8f0'
  },
  
  // Section Styling
  section: { 
    marginBottom: 30
  },
  sectionTitleContainer: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb'
  },
  sectionTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#1e293b',
    textTransform: 'uppercase',
    letterSpacing: 1.2
  },
  
  // Professional Profile
  profileText: { 
    fontSize: 11, 
    lineHeight: 1.7,
    color: '#374151',
    textAlign: 'justify',
    fontWeight: 300
  },
  
  // Experience Styling
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  jobTitle: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#1e293b',
    marginBottom: 4
  },
  companyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  companyName: { 
    fontSize: 11, 
    color: '#2563eb', 
    fontWeight: 500
  },
  dateRange: {
    fontSize: 9,
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12
  },
  bulletPoint: { 
    fontSize: 10, 
    marginLeft: 12, 
    marginBottom: 4,
    color: '#475569',
    lineHeight: 1.5
  },
  
  // Skills Styling
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8
  },
  skillTag: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 9,
    color: '#1e40af',
    fontWeight: 500
  },
  
  // Education Styling
  educationItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2563eb'
  },
  degreeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 3
  },
  institutionName: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 2
  },
  
  // Projects Styling
  projectItem: {
    marginBottom: 18,
    padding: 14,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 6
  },
  projectMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12
  },
  techStack: {
    fontSize: 9,
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8
  },
  
  // Achievements
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingLeft: 8
  },
  achievementIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#fbbf24',
    borderRadius: 8,
    marginRight: 10,
    marginTop: 2
  },
  achievementText: {
    flex: 1,
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.5
  },
  
  // Sidebar sections
  sidebarSection: {
    marginBottom: 24
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8
  },
  
  // Language/Skills Progress
  progressItem: {
    marginBottom: 8
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3
  },
  progressLabel: {
    fontSize: 9,
    color: '#374151',
    fontWeight: 500
  },
  progressLevel: {
    fontSize: 8,
    color: '#64748b'
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    position: 'relative'
  },
  progressFill: {
    height: 4,
    backgroundColor: '#2563eb',
    borderRadius: 2
  },
  
  // Certifications
  certificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f0f9ff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#bae6fd'
  },
  certIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#0ea5e9',
    borderRadius: 6,
    marginRight: 8
  },
  certText: {
    flex: 1,
    fontSize: 9,
    color: '#0c4a6e',
    fontWeight: 400
  },
  
  // Hobbies
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  hobbyChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 8,
    color: '#4b5563'
  }
});

export default function ModernTemplatePDF({ data }: ModernTemplateProps) {
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

  const getSkillLevel = (level: string) => {
    const levels = { 'Beginner': 25, 'Intermediate': 50, 'Advanced': 75, 'Expert': 100 };
    return levels[level as keyof typeof levels] || 50;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerAccent} />
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          {data.personalInfo.summary && (
            <Text style={styles.title}>
              {data.personalInfo.summary.split('\n')[0].substring(0, 120)}
            </Text>
          )}
          <View style={styles.contactGrid}>
            {data.personalInfo.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>✉ {data.personalInfo.email}</Text>
              </View>
            )}
            {data.personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>📱 {data.personalInfo.phone}</Text>
              </View>
            )}
            {data.personalInfo.location && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>📍 {data.personalInfo.location}</Text>
              </View>
            )}
            {data.personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>💼 {data.personalInfo.linkedin}</Text>
              </View>
            )}
            {data.personalInfo.website && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>🌐 {data.personalInfo.website}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
          <View style={styles.twoColumnContainer}>
            
            {/* Left Column - Main Content */}
            <View style={styles.leftColumn}>
              
              {/* Professional Profile */}
              {data.personalInfo.summary && (
                <View style={styles.section}>
                  <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Professional Profile</Text>
                  </View>
                  <Text style={styles.profileText}>{data.personalInfo.summary}</Text>
                </View>
              )}

              {/* Work Experience */}
              {hasContent(data.experience || []) && (
                <View style={styles.section}>
                  <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Professional Experience</Text>
                  </View>
                  {(data.experience || []).map(exp => (
                    <View key={exp.id} style={styles.experienceItem}>
                      <Text style={styles.jobTitle}>{exp.position}</Text>
                      <View style={styles.companyInfo}>
                        <Text style={styles.companyName}>{exp.company}</Text>
                        <Text style={styles.dateRange}>
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </Text>
                      </View>
                      {exp.location && (
                        <Text style={[styles.contactText, { marginBottom: 6 }]}>📍 {exp.location}</Text>
                      )}
                      {exp.description && exp.description.split('\n').map((line, idx) => (
                        <Text key={idx} style={styles.bulletPoint}>• {line}</Text>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {/* Projects */}
              {hasContent(data.projects || []) && (
                <View style={styles.section}>
                  <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Key Projects</Text>
                  </View>
                  {(data.projects || []).map(project => (
                    <View key={project.id} style={styles.projectItem}>
                      <Text style={styles.projectTitle}>{project.name}</Text>
                      <View style={styles.projectMeta}>
                        <Text style={styles.dateRange}>
                          {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
                        </Text>
                        {project.technologies && (
                          <Text style={styles.techStack}>{project.technologies}</Text>
                        )}
                      </View>
                      {project.description && project.description.split('\n').map((line, idx) => (
                        <Text key={idx} style={styles.bulletPoint}>• {line}</Text>
                      ))}
                      {project.link && (
                        <Text style={[styles.contactText, { marginTop: 4 }]}>🔗 {project.link}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* Achievements */}
              {hasContent(data.achievements || []) && (
                <View style={styles.section}>
                  <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Achievements & Awards</Text>
                  </View>
                  {(data.achievements || []).map(ach => (
                    <View key={ach.id} style={styles.achievementItem}>
                      <View style={styles.achievementIcon} />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.achievementText, { fontWeight: 'bold', marginBottom: 2 }]}>
                          {ach.title}
                        </Text>
                        {ach.date && (
                          <Text style={[styles.dateRange, { marginBottom: 4 }]}>
                            {formatDate(ach.date)}
                          </Text>
                        )}
                        {ach.description && ach.description.split('\n').map((line, idx) => (
                          <Text key={idx} style={styles.achievementText}>• {line}</Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Right Column - Sidebar */}
            <View style={styles.rightColumn}>
              
              {/* Skills */}
              {hasContent(data.skills || []) && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Skills & Expertise</Text>
                  {(data.skills || []).map(skill => (
                    <View key={skill.id} style={styles.progressItem}>
                      <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>{skill.name}</Text>
                        <Text style={styles.progressLevel}>{skill.level}</Text>
                      </View>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${getSkillLevel(skill.level)}%` }]} />
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Education */}
              {hasContent(data.education || []) && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Education</Text>
                  {(data.education || []).map(edu => (
                    <View key={edu.id} style={styles.educationItem}>
                      <Text style={styles.degreeTitle}>{edu.degree}</Text>
                      <Text style={styles.institutionName}>{edu.institution}</Text>
                      <Text style={styles.progressLevel}>
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </Text>
                      {edu.description && (
                        <Text style={[styles.bulletPoint, { marginLeft: 0, marginTop: 4 }]}>
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
                    <View key={lang.id} style={styles.progressItem}>
                      <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>{lang.name}</Text>
                        <Text style={styles.progressLevel}>{lang.level}</Text>
                      </View>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${getSkillLevel(lang.level)}%` }]} />
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
                    <View key={index} style={styles.certificationBadge}>
                      <View style={styles.certIcon} />
                      <Text style={styles.certText}>{cert}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Volunteer Work */}
              {hasContent(data.volunteerWork || []) && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Volunteer Experience</Text>
                  {(data.volunteerWork || []).map(vol => (
                    <View key={vol.id} style={[styles.educationItem, { backgroundColor: '#fef3c7' }]}>
                      <Text style={styles.degreeTitle}>{vol.role}</Text>
                      <Text style={styles.institutionName}>{vol.organization}</Text>
                      <Text style={styles.progressLevel}>
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
                      <Text key={index} style={styles.hobbyChip}>{hobby}</Text>
                    ))}
                  </View>
                </View>
              )}

              {/* References */}
              {hasContent(data.references || []) && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>References</Text>
                  {(data.references || []).map(ref => (
                    <View key={ref.id} style={styles.educationItem}>
                      <Text style={styles.degreeTitle}>{ref.name}</Text>
                      <Text style={styles.institutionName}>{ref.position}</Text>
                      {ref.company && (
                        <Text style={styles.progressLevel}>{ref.company}</Text>
                      )}
                      {ref.email && (
                        <Text style={[styles.contactText, { fontSize: 8 }]}>✉ {ref.email}</Text>
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

// Modern Elite Template - Professional design with visual hierarchy
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface ModernTemplateProps {
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
  
  // Header Section - Professional style
  headerContainer: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 25,
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerInfo: {
    flex: 1
  },
  name: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#0f172a',
    marginBottom: 16,
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
    gap: 15
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
    marginBottom: 20
  },
  sectionTitleContainer: {
    marginBottom: 12,
    paddingBottom: 6,
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
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  jobTitle: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#1e293b',
    flex: 1
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
    fontSize: 10,
    color: '#64748b',
    fontWeight: 400
  },
  locationText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#64748b',
    marginBottom: 6
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
    marginBottom: 16
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8
  },
  hobbyText: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.4
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

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const getSkillLevel = (level: string) => {
    const levels = { 
      'beginner': 25, 
      'intermediate': 50, 
      'advanced': 75, 
      'expert': 100,
      'Beginner': 25, 
      'Intermediate': 50, 
      'Advanced': 75, 
      'Expert': 100 
    };
    return levels[level as keyof typeof levels] || 50;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerAccent} />
          <View style={styles.headerContent}>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
              <View style={styles.contactGrid}>
                {data.personalInfo.email && (
                  <Text style={styles.contactText}>{data.personalInfo.email}</Text>
                )}
                {data.personalInfo.phone && (
                  <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
                )}
                {data.personalInfo.location && (
                  <Text style={styles.contactText}>{data.personalInfo.location}</Text>
                )}
                {data.personalInfo.linkedin && (
                  <Text style={styles.contactText}>{data.personalInfo.linkedin}</Text>
                )}
                {data.personalInfo.website && (
                  <Text style={styles.contactText}>{data.personalInfo.website}</Text>
                )}
              </View>
            </View>
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
              {data.experience?.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Professional Experience</Text>
                  </View>
                  {data.experience.map((exp, i) => (
                    <View key={i} style={styles.experienceItem}>
                      <View style={styles.experienceHeader}>
                        <Text style={styles.jobTitle}>{exp.position}, {exp.company}</Text>
                        <Text style={styles.dateRange}>
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </Text>
                      </View>
                      {exp.location && (
                        <Text style={styles.locationText}>{exp.location}</Text>
                      )}
                      {renderBulletPoints(exp.description, {})}
                    </View>
                  ))}
                </View>
              )}

              {/* Projects */}
              {data.projects && data.projects.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Key Projects</Text>
                  </View>
                  {(data.projects || []).map((project, i) => (
                    <View key={i} style={styles.experienceItem}>
                      <View style={styles.experienceHeader}>
                        <Text style={styles.jobTitle}>{project.name}</Text>
                        <Text style={styles.dateRange}>
                          {project.startDate} - {project.endDate || 'Present'}
                        </Text>
                      </View>
                      {project.technologies && (
                        <Text style={styles.locationText}>Technologies: {project.technologies}</Text>
                      )}
                      {renderBulletPoints(project.description, {})}
                      {project.link && (
                        <Text style={[styles.contactText, { marginTop: 4 }]}>🔗 {project.link}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* Volunteer Experience */}
              {data.volunteerWork?.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Volunteer Experience</Text>
                  </View>
                  {data.volunteerWork.map((vol, i) => (
                    <View key={i} style={styles.experienceItem}>
                      <View style={styles.experienceHeader}>
                        <Text style={styles.jobTitle}>{vol.role}, {vol.organization}</Text>
                        <Text style={styles.dateRange}>
                          {vol.startDate} - {vol.endDate || 'Present'}
                        </Text>
                      </View>
                      {renderBulletPoints(vol.description, {})}
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Right Column - Sidebar */}
            <View style={styles.rightColumn}>
              
              {/* Skills */}
              {data.skills?.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Skills & Expertise</Text>
                  {data.skills.map((skill, i) => (
                    <View key={i} style={styles.progressItem}>
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
              {data.education?.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Education</Text>
                  {data.education.map((edu, i) => (
                    <View key={i} style={styles.educationItem}>
                      <Text style={styles.degreeTitle}>{edu.degree}</Text>
                      <Text style={styles.institutionName}>{edu.institution}</Text>
                      <Text style={styles.contactText}>
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </Text>
                      {renderBulletPoints(edu.description, { marginLeft: 0, marginTop: 4 })}
                    </View>
                  ))}
                </View>
              )}

              {/* Languages */}
              {data.languages && data.languages.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Languages</Text>
                  {data.languages.map((lang, i) => (
                    <View key={i} style={styles.progressItem}>
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

              {/* Achievements */}
              {data.achievements?.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Achievements & Awards</Text>
                  {data.achievements.map((ach, i) => (
                    <View key={i} style={styles.educationItem}>
                      <Text style={styles.degreeTitle}>{ach.title}</Text>
                      {ach.date && (
                        <Text style={styles.contactText}>{ach.date}</Text>
                      )}
                      {ach.description && (
                        <Text style={styles.bulletPoint}>{ach.description}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* Hobbies & Interests */}
              {data.hobbies && data.hobbies.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Interests</Text>
                  <View style={styles.hobbiesContainer}>
                    {data.hobbies.map((hobby, index) => (
                      <Text key={index} style={styles.hobbyChip}>{hobby}</Text>
                    ))}
                  </View>
                </View>
              )}

              {/* References */}
              {data.references && data.references.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>References</Text>
                  {(data.references || []).map(ref => (
                    <View key={ref.id} style={styles.educationItem}>
                      <Text style={styles.degreeTitle}>{ref.name}</Text>
                      <Text style={styles.institutionName}>{ref.position}</Text>
                      {ref.company && (
                        <Text style={styles.contactText}>{ref.company}</Text>
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

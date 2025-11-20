// ATS-Optimized Creative Template - Image Top Right Corner
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, Link, StyleSheet } from '@react-pdf/renderer';

interface CreativeTemplateProps {
  data: CVData;
}

// Helper to render clean bullet points
const renderBulletPoints = (text: string | undefined, style: any) => {
  if (!text || !text.trim()) return null;
  
  const lines = text.split('\n').filter(line => line.trim());
  
  return (
    <View style={styles.bulletGroup}>
      {lines.map((line, index) => {
        const trimmedLine = line.trim();
        const bulletText = trimmedLine.startsWith('•') || trimmedLine.startsWith('-') 
          ? trimmedLine.substring(1).trim() 
          : trimmedLine;
        
        return (
          <View key={index} style={styles.bulletRow}>
             <Text style={styles.bulletSymbol}>•</Text>
             <Text style={[styles.bulletText, style]}>{bulletText}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  page: { 
    fontFamily: 'Helvetica', 
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 30, 
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontSize: 10,
    lineHeight: 1.4
  },

  // HEADER SECTION
  headerContainer: {
    marginBottom: 20,
    paddingBottom: 15,
    
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Pushes Name to Left, Image to Right
    alignItems: 'flex-start',        // Aligns them to the top
  },
  headerLeftContent: {
    flex: 1,
    paddingRight: 20, // Prevents text from hitting the image
  },
  name: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#3b82f6', // Light Blue
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  contactText: { 
    fontSize: 9,
    color: '#4b5563',
    marginRight: 10,
  },
 

  // TWO COLUMN LAYOUT CONTAINER
  mainContainer: {
    flexDirection: 'row',
  },
  
  // LEFT COLUMN (Main Content - 65%)
  leftColumn: {
    width: '65%',
    paddingRight: 15,
  },

  // RIGHT COLUMN (Sidebar - 35%)
  rightColumn: {
    width: '35%',
    paddingLeft: 15,
    borderLeftWidth: 1,
    borderLeftColor: '#e5e7eb',
  },

  // SECTION STYLES
  section: { 
    marginBottom: 15 
  },
  sectionTitle: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    color: '#3b82f6', // Light Blue Headings
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    borderBottomWidth: 1.5, 
    borderBottomColor: '#f3f4f6',
    paddingBottom: 2,
  },

  // EXPERIENCE & PROJECTS
  itemBlock: {
    marginBottom: 10,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 1,
  },
  positionTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#000000',
  },
  companyTitle: {
    fontSize: 10,
    color: '#374151', 
    fontStyle: 'italic',
  },
  dateText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4b5563',
    textAlign: 'right',
    minWidth: 60,
  },
  
  // BULLETS
  bulletGroup: {
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  bulletSymbol: {
    width: 8,
    fontSize: 10,
    color: '#3b82f6',
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.3,
  },

  // SIDEBAR SPECIFIC STYLES
  sidebarItem: {
    marginBottom: 10,
  },
  sidebarLabel: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 1,
  },
  sidebarText: {
    fontSize: 9,
    color: '#4b5563',
    lineHeight: 1.3,
  },
  
  // LINKS
  linkText: {
    color: '#4b5563',
    fontSize: 9,
    textDecoration: 'none',
  }
});

export default function CreativeTemplatePDF({ data }: CreativeTemplateProps) {
  const hasContent = (arr: any[] | undefined) => arr && arr.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            
            {/* Left Side: Name & Contact */}
            <View style={styles.headerLeftContent}>
              <Text style={styles.name}>{data.personalInfo.fullName}</Text>
              <View style={styles.contactRow}>
                {data.personalInfo.email && <Text style={styles.contactText}>{data.personalInfo.email}</Text>}
                {data.personalInfo.phone && <Text style={styles.contactText}>| {data.personalInfo.phone}</Text>}
                {data.personalInfo.location && <Text style={styles.contactText}>| {data.personalInfo.location}</Text>}
                
                {data.personalInfo.linkedin && (
                  <Link src={data.personalInfo.linkedin} style={styles.contactText}>
                    | LinkedIn
                  </Link>
                )}
                {data.personalInfo.website && (
                    <Link src={data.personalInfo.website} style={styles.contactText}>
                     | Portfolio
                   </Link>
                )}
              </View>
            </View>

          
          </View>
        </View>

        {/* MAIN LAYOUT */}
        <View style={styles.mainContainer}>
          
          {/* --- LEFT COLUMN --- */}
          <View style={styles.leftColumn}>
            
            {/* Profile */}
            {data.personalInfo.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text style={[styles.sidebarText, { fontSize: 9.5, textAlign: 'justify' }]}>
                  {data.personalInfo.summary}
                </Text>
              </View>
            )}

            {/* Experience */}
            {hasContent(data.experience) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {(data.experience || []).map((exp, i) => (
                  <View key={i} style={styles.itemBlock} wrap={false}>
                    <View style={styles.rowHeader}>
                      <View>
                        <Text style={styles.positionTitle}>{exp.position}</Text>
                        <Text style={styles.companyTitle}>
                          {exp.company} {exp.location ? `| ${exp.location}` : ''}
                        </Text>
                      </View>
                      <Text style={styles.dateText}>
                        {exp.startDate} – {exp.endDate || 'Present'}
                      </Text>
                    </View>
                    {renderBulletPoints(exp.description, {})}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {hasContent(data.projects) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Key Projects</Text>
                {(data.projects || []).map((project, i) => (
                  <View key={i} style={styles.itemBlock} wrap={false}>
                    <View style={styles.rowHeader}>
                      <Text style={styles.positionTitle}>{project.name}</Text>
                      <Text style={styles.dateText}>
                        {project.startDate} – {project.endDate || 'Present'}
                      </Text>
                    </View>
                    
                    {renderBulletPoints(project.description, {})}
                    
                    {project.technologies && (
                      <Text style={{ fontSize: 8.5, color: '#4b5563', marginTop: 2, fontStyle: 'italic' }}>
                        Tech: {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                      </Text>
                    )}
                    {project.link && (
                      <Link src={project.link} style={[styles.linkText, { marginTop: 2 }]}>
                        View Project Link
                      </Link>
                    )}
                  </View>
                ))}
              </View>
            )}
            
             {/* Volunteer */}
             {hasContent(data.volunteerWork) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Volunteer</Text>
                {(data.volunteerWork || []).map((vol, i) => (
                  <View key={i} style={styles.itemBlock} wrap={false}>
                    <View style={styles.rowHeader}>
                      <View>
                        <Text style={styles.positionTitle}>{vol.role}</Text>
                        <Text style={styles.companyTitle}>{vol.organization}</Text>
                      </View>
                      <Text style={styles.dateText}>
                        {vol.startDate} – {vol.endDate || 'Present'}
                      </Text>
                    </View>
                    {renderBulletPoints(vol.description, {})}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* --- RIGHT COLUMN --- */}
          <View style={styles.rightColumn}>
            
            {/* Skills */}
            {hasContent(data.skills) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                
                {(data.skills || []).filter(skill => skill.type === 'technical').length > 0 && (
                  <View style={{ marginBottom: 6 }}>
                    <Text style={[styles.sidebarLabel, { fontSize: 9, fontStyle: 'italic' }]}>Technical</Text>
                    <Text style={styles.sidebarText}>
                      {(data.skills || [])
                        .filter(skill => skill.type === 'technical')
                        .map(skill => skill.name)
                        .join(', ')}
                    </Text>
                  </View>
                )}
                
                {(data.skills || []).filter(skill => skill.type === 'soft').length > 0 && (
                  <View>
                    <Text style={[styles.sidebarLabel, { fontSize: 9, fontStyle: 'italic' }]}>Soft Skills</Text>
                    <Text style={styles.sidebarText}>
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
            {hasContent(data.education) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {(data.education || []).map((edu, i) => (
                  <View key={i} style={styles.sidebarItem}>
                    <Text style={styles.sidebarLabel}>{edu.degree}</Text>
                    <Text style={styles.sidebarText}>{edu.institution}</Text>
                    <Text style={[styles.sidebarText, { fontStyle: 'italic', fontSize: 8 }]}>
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </Text>
                  </View>
                ))}
              </View>
            )}

             {/* Certifications */}
             {hasContent(data.certifications) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {(data.certifications || []).map((cert, i) => (
                  <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
                    <Text style={[styles.bulletSymbol, { width: 6 }]}>•</Text>
                    <Text style={styles.sidebarText}>{cert}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {hasContent(data.languages) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Languages</Text>
                {(data.languages || []).map((lang, i) => (
                   <Text key={i} style={styles.sidebarText}>
                     • {lang.name} ({lang.level})
                   </Text>
                ))}
              </View>
            )}

            {/* Hobbies */}
            {hasContent(data.hobbies) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Interests</Text>
                <Text style={styles.sidebarText}>
                  {(data.hobbies || []).join(', ')}
                </Text>
              </View>
            )}
            
            {/* References */}
            {hasContent(data.references) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>References</Text>
                {(data.references || []).map((ref, i) => (
                  <View key={i} style={styles.sidebarItem}>
                    <Text style={styles.sidebarLabel}>{ref.name}</Text>
                    <Text style={styles.sidebarText}>{ref.position}</Text>
                    <Text style={styles.sidebarText}>{ref.company}</Text>
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
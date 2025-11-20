// Elite Professional Template - Swiss-Style (Gap Fixed & High Density)
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, Link, StyleSheet } from '@react-pdf/renderer';

interface EliteTemplateProps {
  data: CVData;
}

// Helper for clean bullet points
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
    paddingTop: 30,        // Reduced from 40
    paddingBottom: 30,     // Reduced from 40
    paddingHorizontal: 40, // Slightly tighter margins
    backgroundColor: '#ffffff',
    color: '#1f2937', 
    fontSize: 10,
    lineHeight: 1.35       // Tighter line height for density
  },

  // --- HEADER ---
  headerContainer: {
    marginBottom: 15,      // Reduced from 25
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  name: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    color: '#111827', // Light/Royal Blue for Name Only
    textTransform: 'uppercase',
    letterSpacing: 1.5, 
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 12, 
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: { 
    fontSize: 9,
    color: '#4b5563', 
    textDecoration: 'none',
    letterSpacing: 0.3,
  },
  contactLabel: {
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 4,
    fontSize: 9,
  },

  // --- LAYOUT ---
  mainContainer: {
    flexDirection: 'row',
  },
  leftSidebar: {
    width: '28%', // Slightly narrower sidebar
    paddingRight: 15,
  },
  rightContent: {
    width: '72%',
    paddingLeft: 15,
    borderLeftWidth: 1,
    borderLeftColor: '#f3f4f6', 
  },

  // --- SECTIONS ---
  section: { 
    marginBottom: 16 // Reduced from 22 to prevent pushing content
  },
  sidebarSection: {
    marginBottom: 18,
  },
  sectionTitle: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
    paddingBottom: 3,
    borderBottomWidth: 1.5,
    borderBottomColor: '#111827', 
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },

  // --- CONTENT BLOCKS ---
  blockContainer: {
    marginBottom: 10, // Reduced from 14
  },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  blockTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#000000',
  },
  blockSubtitle: {
    fontSize: 10,
    color: '#374151', 
    fontStyle: 'italic',
  },
  blockDate: {
    fontSize: 9,
    color: '#6b7280', 
    textAlign: 'right',
    fontWeight: 'bold',
  },
  
  // Sidebar specific blocks
  skillBlock: {
    marginBottom: 8,
  },
  skillCategory: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  skillText: {
    fontSize: 9,
    color: '#4b5563',
    lineHeight: 1.3,
  },
  eduBlock: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  eduSchool: {
    fontSize: 9,
    color: '#4b5563',
  },
  eduDate: {
    fontSize: 8.5,
    color: '#9ca3af',
    marginTop: 1,
  },

  // --- BULLETS ---
  bulletGroup: {
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 1,
    paddingLeft: 4,
  },
  bulletSymbol: {
    width: 10,
    fontSize: 10, 
    color: '#6b7280', 
    marginTop: -1,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    color: '#374151',
    lineHeight: 1.3,
  },
  
  // --- MISC ---
  techStackText: {
    fontSize: 8.5,
    color: '#6b7280',
    marginTop: 2,
    fontFamily: 'Helvetica-Oblique',
  },
  link: {
    textDecoration: 'none',
    color: '#4b5563',
  }
});

export default function EliteTemplate({ data }: EliteTemplateProps) {
  const has = (arr: any[] | undefined) => arr && arr.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          
          <View style={styles.contactRow}>
            {data.personalInfo.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{data.personalInfo.email}</Text>
              </View>
            )}
            {data.personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
              </View>
            )}
            {data.personalInfo.location && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{data.personalInfo.location}</Text>
              </View>
            )}
            {data.personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Link src={data.personalInfo.linkedin} style={styles.contactText}>LinkedIn</Link>
              </View>
            )}
            {data.personalInfo.website && (
              <View style={styles.contactItem}>
                <Link src={data.personalInfo.website} style={styles.contactText}>Portfolio</Link>
              </View>
            )}
          </View>
        </View>

        {/* MAIN CONTENT */}
        <View style={styles.mainContainer}>
          
          {/* --- LEFT SIDEBAR (Quick Info) --- */}
          <View style={styles.leftSidebar}>
            
            {/* Education */}
            {has(data.education) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Education</Text>
                {(data.education || []).map((edu, i) => (
                  <View key={i} style={styles.eduBlock}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.institution}</Text>
                    <Text style={styles.eduDate}>{edu.endDate}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {has(data.skills) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Expertise</Text>
                
                {data.skills?.filter(s => s.type === 'technical').length! > 0 && (
                  <View style={styles.skillBlock}>
                    <Text style={styles.skillCategory}>Technical</Text>
                    <Text style={styles.skillText}>
                      {data.skills?.filter(s => s.type === 'technical').map(s => s.name).join(', ')}
                    </Text>
                  </View>
                )}

                {data.skills?.filter(s => s.type === 'soft').length! > 0 && (
                  <View style={styles.skillBlock}>
                    <Text style={styles.skillCategory}>Professional</Text>
                    <Text style={styles.skillText}>
                      {data.skills?.filter(s => s.type === 'soft').map(s => s.name).join(', ')}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Certifications */}
            {has(data.certifications) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Credentials</Text>
                {(data.certifications || []).map((cert, i) => (
                  <Text key={i} style={[styles.skillText, { marginBottom: 4 }]}>• {cert}</Text>
                ))}
              </View>
            )}

            {/* Languages */}
            {has(data.languages) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Languages</Text>
                {(data.languages || []).map((lang, i) => (
                  <Text key={i} style={[styles.skillText, { marginBottom: 2 }]}>
                    {lang.name} <Text style={{color: '#9ca3af'}}>— {lang.level}</Text>
                  </Text>
                ))}
              </View>
            )}

            {/* Hobbies */}
            {has(data.hobbies) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Interests</Text>
                <Text style={styles.skillText}>{(data.hobbies || []).join(', ')}</Text>
              </View>
            )}

            {/* References */}
            {has(data.references) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>References</Text>
                {(data.references || []).map((ref, i) => (
                  <View key={i} style={{ marginBottom: 6 }}>
                    <Text style={[styles.skillText, { fontWeight: 'bold' }]}>{ref.name}</Text>
                    <Text style={[styles.skillText, { fontSize: 8 }]}>{ref.company}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* --- RIGHT CONTENT (Main Work) --- */}
          <View style={styles.rightContent}>
            
            {/* Profile Summary */}
            {data.personalInfo.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text style={{ fontSize: 10, lineHeight: 1.4, color: '#374151', textAlign: 'justify' }}>
                  {data.personalInfo.summary}
                </Text>
              </View>
            )}

            {/* Professional Experience */}
            {has(data.experience) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {(data.experience || []).map((exp, i) => (
                  /* REMOVED wrap={false} TO FIX GAPS */
                  <View key={i} style={styles.blockContainer}>
                    <View style={styles.blockHeader}>
                      <View style={{flex: 1}}>
                        <Text style={styles.blockTitle}>{exp.position}</Text>
                        <Text style={styles.blockSubtitle}>
                          {exp.company} {exp.location ? `— ${exp.location}` : ''}
                        </Text>
                      </View>
                      <Text style={styles.blockDate}>
                        {exp.startDate} – {exp.endDate || 'Present'}
                      </Text>
                    </View>
                    {renderBulletPoints(exp.description, {})}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {has(data.projects) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Key Projects</Text>
                {(data.projects || []).map((proj, i) => (
                  /* REMOVED wrap={false} TO FIX GAPS */
                  <View key={i} style={styles.blockContainer}>
                    <View style={styles.blockHeader}>
                      <View style={{flex: 1}}>
                        <Text style={styles.blockTitle}>{proj.name}</Text>
                        {proj.link && (
                           <Link src={proj.link} style={[styles.blockSubtitle, { color: '#4b5563', fontSize: 9 }]}>
                             View Project
                           </Link>
                        )}
                      </View>
                      <Text style={styles.blockDate}>
                        {proj.startDate} – {proj.endDate || 'Present'}
                      </Text>
                    </View>
                    
                    {renderBulletPoints(proj.description, {})}
                    
                    {proj.technologies && (
                      <Text style={styles.techStackText}>
                        Stack: {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Volunteer Work */}
            {has(data.volunteerWork) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Volunteering</Text>
                {(data.volunteerWork || []).map((vol, i) => (
                  <View key={i} style={styles.blockContainer}>
                    <View style={styles.blockHeader}>
                      <View style={{flex: 1}}>
                        <Text style={styles.blockTitle}>{vol.role}</Text>
                        <Text style={styles.blockSubtitle}>{vol.organization}</Text>
                      </View>
                      <Text style={styles.blockDate}>
                        {vol.startDate} – {vol.endDate || 'Present'}
                      </Text>
                    </View>
                    {renderBulletPoints(vol.description, {})}
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
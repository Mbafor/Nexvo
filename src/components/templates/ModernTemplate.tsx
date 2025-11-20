// ATS-Optimized Modern Elite Template - Linear Layout
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, Link, StyleSheet } from '@react-pdf/renderer';

interface ModernTemplateProps {
  data: CVData;
  translations?: {
    [key: string]: string;
  };
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
    paddingTop: 35,
    paddingBottom: 35,
    paddingHorizontal: 40, 
    backgroundColor: '#ffffff',
    color: '#1e293b', // Slate-900 (High contrast dark grey)
    fontSize: 10,
    lineHeight: 1.4
  },
  
  // HEADER SECTION
  headerContainer: {
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#334155', // Blue Accent Line
    paddingBottom: 12,
  },
  name: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#3b82f6', // Modern Blue
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  contactText: { 
    fontSize: 9.5,
    color: '#334155',
    textDecoration: 'none',
  },
  separator: {
    marginHorizontal: 6,
    color: '#cbd5e1', // Light separator
  },

  // SECTIONS GLOBAL
  section: { 
    marginBottom: 14 
  },
  sectionTitle: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    backgroundColor: '#eff6ff', // Subtle grey background for modern feel
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 2,
  },

  // CONTENT ROWS (Experience, Edu, etc)
  itemBlock: {
    marginBottom: 10,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  leftHeader: {
    flex: 1,
    paddingRight: 15,
  },
  rightHeader: {
    textAlign: 'right',
    minWidth: 85,
  },
  
  // TYPOGRAPHY
  primaryTitle: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    color: '#1e293b',
  },
  secondaryTitle: { 
    fontSize: 11, 
    color: '#334155', // Blue for companies/institutions
    fontWeight: 'medium',
  },
  dateText: {
    fontSize: 10,
    color: '#475569',
    fontWeight: 'bold',
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#334155',
    textAlign: 'justify',
  },
  
  // BULLETS
  bulletGroup: {
    marginTop: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 2,
  },
  bulletSymbol: {
    width: 10,
    fontSize: 10,
    color: '#334155', // Blue bullets
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.4,
  },

  // SKILLS & METADATA
  metaRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
    width: 80,
  },
  metaContent: {
    flex: 1,
    fontSize: 10,
    color: '#334155',
  },

  // LINKS
  linkText: {
    color: '#2563eb',
    fontSize: 9,
    marginTop: 2,
    textDecoration: 'none',
  }
});

export default function ModernTemplate({ data, translations }: ModernTemplateProps) {
  const renderSeparator = () => <Text style={styles.separator}>|</Text>;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <View style={styles.contactRow}>
            {data.personalInfo.email && <Text style={styles.contactText}>{data.personalInfo.email}</Text>}
            
            {data.personalInfo.phone && (
              <>
                {renderSeparator()}
                <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
              </>
            )}
            
            {data.personalInfo.location && (
              <>
                {renderSeparator()}
                <Text style={styles.contactText}>{data.personalInfo.location}</Text>
              </>
            )}
            
            {data.personalInfo.linkedin && (
              <>
                {renderSeparator()}
                <Link src={data.personalInfo.linkedin} style={styles.contactText}>
                  LinkedIn
                </Link>
              </>
            )}

            {data.personalInfo.website && (
              <>
                {renderSeparator()}
                <Link src={data.personalInfo.website} style={styles.contactText}>
                  Portfolio
                </Link>
              </>
            )}
          </View>
        </View>

        {/* SUMMARY */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations?.summary || 'Professional Profile'}</Text>
            <Text style={styles.summaryText}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations?.experience || 'Professional Experience'}</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.itemBlock}>
                <View style={styles.rowHeader} wrap={false}>
                  <View style={styles.leftHeader}>
                    <Text style={styles.primaryTitle}>{exp.position}</Text>
                    <Text style={styles.secondaryTitle}>
                      {exp.company} {exp.location ? `— ${exp.location}` : ''}
                    </Text>
                  </View>
                  <View style={styles.rightHeader}>
                    <Text style={styles.dateText}>
                      {exp.startDate} – {exp.endDate || 'Present'}
                    </Text>
                  </View>
                </View>
                {renderBulletPoints(exp.description, {})}
              </View>
            ))}
          </View>
        )}

        {/* PROJECTS */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations?.projects || 'Key Projects'}</Text>
            {data.projects.map((project, i) => (
              <View key={i} style={styles.itemBlock}>
                <View style={styles.rowHeader} wrap={false}>
                  <View style={styles.leftHeader}>
                    <Text style={styles.primaryTitle}>{project.name}</Text>
                  </View>
                  <View style={styles.rightHeader}>
                    <Text style={styles.dateText}>
                      {project.startDate} – {project.endDate || 'Present'}
                    </Text>
                  </View>
                </View>
                
                {renderBulletPoints(project.description, {})}
                
                {/* Tech Stack displayed as text */}
                {project.technologies && (
                  <Text style={{ fontSize: 9, color: '#475569', marginTop: 2, fontStyle: 'italic' }}>
                    <Text style={{ fontWeight: 'bold' }}>Technologies:</Text> {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                  </Text>
                )}
                
                {project.link && (
                  <Link src={project.link} style={styles.linkText}>
                    View Project
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* SKILLS - Converted from Progress Bars to Text */}
        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations?.skills || 'Skills & Expertise'}</Text>
            {(() => {
               // Group skills for better readability
               const technical = data.skills.filter(s => s.type === 'technical' || !s.type); // Default to technical
               const soft = data.skills.filter(s => s.type === 'soft');

               return (
                 <>
                   {technical.length > 0 && (
                     <View style={styles.metaRow}>
                       <Text style={styles.metaLabel}>Technical:</Text>
                       <Text style={styles.metaContent}>
                         {technical.map(s => s.name).join(', ')}
                       </Text>
                     </View>
                   )}
                   {soft.length > 0 && (
                     <View style={styles.metaRow}>
                       <Text style={styles.metaLabel}>Soft Skills:</Text>
                       <Text style={styles.metaContent}>
                         {soft.map(s => s.name).join(', ')}
                       </Text>
                     </View>
                   )}
                 </>
               )
            })()}
          </View>
        )}

        {/* EDUCATION */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations?.education || 'Education'}</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.itemBlock} wrap={false}>
                <View style={styles.rowHeader}>
                  <View style={styles.leftHeader}>
                    <Text style={styles.primaryTitle}>{edu.degree}</Text>
                    <Text style={styles.secondaryTitle}>{edu.institution}</Text>
                  </View>
                  <View style={styles.rightHeader}>
                    <Text style={styles.dateText}>
                      {edu.startDate ? `${edu.startDate} - ` : ''}{edu.endDate}
                    </Text>
                  </View>
                </View>
                {renderBulletPoints(edu.description, {})}
              </View>
            ))}
          </View>
        )}

        {/* ACHIEVEMENTS */}
        {data.achievements?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations?.achievements || 'Achievements & Awards'}</Text>
            {data.achievements.map((ach, i) => (
              <View key={i} style={styles.itemBlock} wrap={false}>
                <View style={styles.rowHeader}>
                  <View style={styles.leftHeader}>
                    <Text style={styles.primaryTitle}>{ach.title}</Text>
                  </View>
                  <View style={styles.rightHeader}>
                    <Text style={styles.dateText}>{ach.date}</Text>
                  </View>
                </View>
                {renderBulletPoints(ach.description, {})}
              </View>
            ))}
          </View>
        )}
        
        {/* CERTIFICATIONS */}
        {data.certifications && data.certifications.length > 0 && (
           <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, i) => (
              <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
                 <Text style={styles.bulletSymbol}>•</Text>
                 <Text style={[styles.bulletText, { marginLeft: 2 }]}>{cert}</Text>
              </View>
            ))}
          </View>
        )}

        {/* VOLUNTEER */}
        {data.volunteerWork?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations?.volunteerWork || 'Volunteer Experience'}</Text>
            {data.volunteerWork.map((vol, i) => (
              <View key={i} style={styles.itemBlock} wrap={false}>
                <View style={styles.rowHeader}>
                  <View style={styles.leftHeader}>
                    <Text style={styles.primaryTitle}>{vol.role}</Text>
                    <Text style={styles.secondaryTitle}>{vol.organization}</Text>
                  </View>
                  <View style={styles.rightHeader}>
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

        {/* LANGUAGES */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations?.languages || 'Languages'}</Text>
             <View style={styles.metaRow}>
               <Text style={styles.metaContent}>
                 {data.languages.map(l => `${l.name} (${l.level})`).join(', ')}
               </Text>
             </View>
          </View>
        )}

        {/* REFERENCES */}
        {data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations?.references || 'References'}</Text>
            {data.references.map((ref, i) => (
              <View key={i} style={styles.itemBlock} wrap={false}>
                <Text style={styles.primaryTitle}>{ref.name}</Text>
                <Text style={styles.secondaryTitle}>{ref.position} at {ref.company}</Text>
                {ref.email && <Text style={{ fontSize: 9, color: '#475569' }}>{ref.email}</Text>}
              </View>
            ))}
          </View>
        )}
        
        {/* HOBBIES */}
        {data.hobbies && data.hobbies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{translations?.interests || 'Interests'}</Text>
             <Text style={styles.metaContent}>{data.hobbies.join(', ')}</Text>
          </View>
        )}

      </Page>
    </Document>
  );
}
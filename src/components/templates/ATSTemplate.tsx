// ATS-Optimized Elite Template - Complete Single Column Edition (Gap Fixed)
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, Link, StyleSheet } from '@react-pdf/renderer';

interface ATSTemplateProps {
  data: CVData;
}

// Helper function to render bullet points (Optimized for ATS parsing)
const renderBulletPoints = (text: string | undefined, style: any) => {
  if (!text || !text.trim()) return null;
  
  const lines = text.split('\n').filter(line => line.trim());
  
  return (
    <View style={styles.bulletGroup}>
      {lines.map((line, index) => {
        const trimmedLine = line.trim();
        // Clean up bullet format for consistency
        const bulletText = trimmedLine.startsWith('•') || trimmedLine.startsWith('-') 
          ? trimmedLine.substring(1).trim() 
          : trimmedLine;
        
        return (
          <View key={index} style={styles.bulletRow}>
             <Text style={styles.bulletPoint}>•</Text>
             <Text style={[styles.bulletContent, style]}>{bulletText}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    paddingTop: 30,        // Reduced from 35
    paddingBottom: 30,     // Reduced from 35
    paddingHorizontal: 40,
    backgroundColor: '#ffffff',
    color: '#1F2937',
    fontSize: 10.5,
    lineHeight: 1.3,       // Reduced from 1.4 to fit more content
  },

  // HEADER
  header: {
    marginBottom: 12,      // Reduced from 18
    paddingBottom: 0,
    borderBottomWidth: 0, 
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold', 
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,       // Reduced margin
    textTransform: 'uppercase',
  },
  contactBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  contactText: {
    fontSize: 9.5,
    color: '#1F2937',
    marginHorizontal: 5,   // Tighter horizontal spacing
    textDecoration: 'none',
  },
  separator: {
    fontSize: 9.5,
    color: '#1F2937',
  },

  // GLOBAL SECTION STYLES
  section: {
    marginBottom: 10,      // Reduced from 14 (Key fix for gaps)
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,       // Reduced from 8
    borderBottomWidth: 0.5,
    borderBottomColor: '#1F2937',
    paddingBottom: 2,
  },
  
  // ITEM ROWS
  itemBlock: {
    marginBottom: 6,       // Reduced from 10 (Key fix for gaps)
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  leftHeader: {
    flex: 1,
    paddingRight: 10,
  },
  rightHeader: {
    textAlign: 'right',
    minWidth: 80,
  },
  
  // TEXT STYLES
  mainTitle: {
    fontSize: 11,
    fontWeight: 'bold', 
    color: '##1F2937',
  },
  subTitle: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#1F2937',
  },
  dateText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  summary: {
    fontSize: 10.5,
    color: '#1F2937',
    lineHeight: 1.3, // Tighter line height
    textAlign: 'justify',
  },

  // BULLETS
  bulletGroup: {
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 1, // Tighter bullets
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
    color: '#1F2937',
  },
  bulletContent: {
    flex: 1,
    fontSize: 10.5,
    color: '#1F2937',
    lineHeight: 1.3, // Tighter line height
  },

  // SKILLS SPECIFIC
  skillRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  skillLabel: {
    fontSize: 10.5,
    fontWeight: 'bold',
    width: 85, 
    color: '#1F2937',
  },
  skillList: {
    flex: 1,
    fontSize: 10.5,
    color: '#1F2937',
  },

  // TECH STACK TEXT
  techStackText: {
    fontSize: 9.5,
    marginTop: 1,
    color: '#1F2937',
    fontStyle: 'italic',
  },

  // REFERENCES SPECIFIC
  referenceItem: {
    marginBottom: 6,
  },
  referenceText: {
    fontSize: 10.5,
    color: '#1F2937',
  }
});

export const ATSTemplate = ({ data }: ATSTemplateProps) => {
  const renderSeparator = () => <Text style={styles.separator}> | </Text>;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <View style={styles.contactBlock}>
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
                  {data.personalInfo.linkedin}
                </Link>
              </>
            )}
            
            {data.personalInfo.website && (
              <>
                {renderSeparator()}
                <Link src={data.personalInfo.website} style={styles.contactText}>
                  Portfolio/Website
                </Link>
              </>
            )}
          </View>
        </View>

        {/* SUMMARY */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{data.personalInfo.summary}</Text>
          </View>
        )}

         {/* EDUCATION */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.itemBlock}>
                {/* Header stays together (wrap=false) so title doesn't split from date */}
                <View style={styles.rowHeader} wrap={false}>
                  <View style={styles.leftHeader}>
                    <Text style={styles.mainTitle}>
                      {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                    </Text>
                    <Text style={styles.subTitle}>{edu.institution}</Text>
                  </View>
                  <View style={styles.rightHeader}>
                    <Text style={styles.dateText}>{edu.endDate}</Text>
                  </View>
                </View>
                {renderBulletPoints(edu.description, {})}
              </View>
            ))}
          </View>
        )}

        {/* SKILLS */}
        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {(() => {
              const technicalSkills = data.skills.filter(skill => skill.type === 'technical');
              const softSkills = data.skills.filter(skill => skill.type === 'soft');
              
              return (
                <>
                  {technicalSkills.length > 0 && (
                    <View style={styles.skillRow}>
                      <Text style={styles.skillLabel}>Technical:</Text>
                      <Text style={styles.skillList}>
                        {technicalSkills.map(s => s.name).join(', ')}
                      </Text>
                    </View>
                  )}
                  {softSkills.length > 0 && (
                    <View style={styles.skillRow}>
                      <Text style={styles.skillLabel}>Soft Skills:</Text>
                      <Text style={styles.skillList}>
                        {softSkills.map(s => s.name).join(', ')}
                      </Text>
                    </View>
                  )}
                </>
              );
            })()}
          </View>
        )}

        {/* PROJECTS */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.itemBlock}>
                <View style={styles.rowHeader} wrap={false}>
                  <View style={styles.leftHeader}>
                    <Text style={styles.mainTitle}>{proj.name}</Text>
                  </View>
                  <View style={styles.rightHeader}>
                    <Text style={styles.dateText}>
                      {proj.startDate} – {proj.endDate || 'Present'}
                    </Text>
                  </View>
                </View>
                {renderBulletPoints(proj.description, {})}
                {proj.technologies && (
                  <Text style={styles.techStackText}>
                    <Text style={{fontWeight: 'bold'}}>Tech:</Text> {' '}
                    {Array.isArray(proj.technologies) 
                      ? proj.technologies.join(', ') 
                      : proj.technologies}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.itemBlock}>
                <View style={styles.rowHeader} wrap={false}>
                  <View style={styles.leftHeader}>
                    <Text style={styles.mainTitle}>{exp.position}</Text>
                    <Text style={styles.subTitle}>
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

        {/* CERTIFICATIONS - Wrap false keeps certs together */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, i) => (
              <Text key={i} style={{ fontSize: 10.5, marginBottom: 3 }}>
                • {cert}
              </Text>
            ))}
          </View>
        )}

        {/* LANGUAGES */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={{ fontSize: 10.5 }}>
              {data.languages.map((lang) => 
                `${lang.name || lang.language} (${lang.level || lang.proficiency})`
              ).join(', ')}
            </Text>
          </View>
        )}

        {/* ACHIEVEMENTS */}
        {data.achievements?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements & Awards</Text>
            {data.achievements.map((ach, i) => (
              <View key={i} style={styles.itemBlock}>
                <View style={styles.rowHeader} wrap={false}>
                  <View style={styles.leftHeader}>
                    <Text style={styles.mainTitle}>{ach.title}</Text>
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

        {/* VOLUNTEER EXPERIENCE */}
        {data.volunteerWork?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Experience</Text>
            {data.volunteerWork.map((v, i) => (
              <View key={i} style={styles.itemBlock}>
                 <View style={styles.rowHeader} wrap={false}>
                  <View style={styles.leftHeader}>
                    <Text style={styles.mainTitle}>{v.role}</Text>
                    <Text style={styles.subTitle}>{v.organization}</Text>
                  </View>
                  <View style={styles.rightHeader}>
                    <Text style={styles.dateText}>
                      {v.startDate} – {v.endDate || 'Present'}
                    </Text>
                  </View>
                </View>
                {renderBulletPoints(v.description, {})}
              </View>
            ))}
          </View>
        )}

        {/* REFERENCES */}
        {data.references?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            {data.references.map((r, i) => (
              <View key={i} style={styles.referenceItem} wrap={false}>
                <Text style={[styles.referenceText, { fontWeight: 'bold' }]}>{r.name}</Text>
                <Text style={[styles.referenceText, { fontStyle: 'italic' }]}>
                  {r.position} at {r.company}
                </Text>
                {r.email && <Text style={styles.referenceText}>Email: {r.email}</Text>}
                {r.phone && <Text style={styles.referenceText}>Phone: {r.phone}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* HOBBIES */}
        {data.hobbies && data.hobbies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <Text style={{ fontSize: 10.5 }}>
              {data.hobbies.join(', ')}
            </Text>
          </View>
        )}

      </Page>
    </Document>
  );
};

export default ATSTemplate;
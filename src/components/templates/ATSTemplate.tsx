// ATS-Optimized Elite Template - Single Column Edition (Refined for ATS + Visual Balance)
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface ATSTemplateProps {
  data: CVData;
}

// Helper function to render bullet points
const renderBulletPoints = (text: string | undefined, style: any) => {
  if (!text || !text.trim()) return null;
  
  const lines = text.split('\n').filter(line => line.trim());
  
  return (
    <View style={styles.bulletGroup}>
      {lines.map((line, index) => {
        const trimmedLine = line.trim();
        // Ensure bullet point format
        const bulletText = trimmedLine.startsWith('•') || trimmedLine.startsWith('-') 
          ? trimmedLine 
          : `• ${trimmedLine}`;
        
        return (
          <Text key={index} style={[styles.bulletItem, style]}>
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
    padding: 50,
    backgroundColor: '#ffffff',
    color: '#2c2c2c',
    fontSize: 11,
    lineHeight: 1.5,
  },

  // HEADER
  header: {
    textAlign: 'center',
    marginBottom: 16,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#d9dee2',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  contactBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 2,
    lineHeight: 1.4,
  },
  contactText: {
    fontSize: 10,
    color: '#4a5568',
    marginHorizontal: 8,
    marginVertical: 2,
  },

  // SECTIONS
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2c2c2c',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },

  summary: {
    fontSize: 10,
    color: '#4a5568',
    lineHeight: 1.4,
  },

  // EXPERIENCE
  experienceItem: {
    marginBottom: 8,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  positionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  companyLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 10.5,
    color: '#4a5568',
  },
  dateRange: {
    fontSize: 10,
    color: '#4a5568',
    marginHorizontal: 8,
    marginVertical: 2,
  },
  locationText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6b7280',
    marginBottom: 3,
  },
  bulletGroup: {
    marginLeft: 0,
    marginTop: 2,
  },
  bulletItem: {
    fontSize: 10,
    color: '#4a5568',
    marginBottom: 1,
    lineHeight: 1.4,
  },

  // EDUCATION
  educationItem: {
    marginBottom: 8,
  },
  degreeTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  institutionName: {
    fontSize: 10.5,
    color: '#4a5568',
  },
  graduationDate: {
    fontSize: 10,
    color: '#4a5568',
    marginHorizontal: 8,
    marginVertical: 2,
  },
  educationDetails: {
    fontSize: 10,
    color: '#6b7280',
    lineHeight: 1.4,
  },

  // SKILLS
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  skillItem: {
    fontSize: 10,
    color: '#4a5568',
    backgroundColor: '#f7fafc',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 3,
    marginBottom: 3,
  },
  skillCategory: {
    marginBottom: 1,
  },
  skillCategoryTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 1,
  },
  skillText: {
    fontSize: 10,
    color: '#4a5568',
    lineHeight: 1.4,
  },

  // PROJECTS
  projectItem: {
    marginBottom: 8,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  projectName: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  projectDate: {
    fontSize: 10,
    color: '#4a5568',
    marginHorizontal: 8,
    marginVertical: 2,
  },
  projectDescription: {
    fontSize: 10,
    color: '#4a5568',
    marginBottom: 3,
    lineHeight: 1.4,
  },
  projectTechs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  techItem: {
    fontSize: 9,
    color: '#6b7280',
    backgroundColor: '#edf2f7',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    marginRight: 3,
    marginBottom: 2,
  },

  // CERTIFICATIONS
  certificationItem: {
    marginBottom: 4,
  },
  certificationName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },

  // LANGUAGES
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  languageName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginRight: 6,
  },
  languageLevel: {
    fontSize: 10,
    color: '#4a5568',
  },
  languageText: {
    fontSize: 10,
    color: '#4a5568',
    lineHeight: 1.4,
  },

  // ACHIEVEMENTS
  achievementItem: {
    marginBottom: 6,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  achievementTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  achievementDate: {
    fontSize: 10,
    color: '#4a5568',
    marginHorizontal: 8,
    marginVertical: 2,
  },
  achievementDescription: {
    fontSize: 10,
    color: '#4a5568',
    lineHeight: 1.4,
  },

  // VOLUNTEER
  volunteerItem: {
    marginBottom: 8,
  },
  volunteerRole: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  volunteerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  volunteerOrganization: {
    fontSize: 10,
    color: '#4a5568',
  },
  volunteerDate: {
    fontSize: 10,
    color: '#4a5568',
    marginHorizontal: 8,
    marginVertical: 2,
  },
  volunteerDescription: {
    fontSize: 10,
    color: '#4a5568',
    lineHeight: 1.4,
  },

  // REFERENCES
  referenceItem: {
    marginBottom: 4,
  },
  referenceName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 1,
  },
  referenceTitle: {
    fontSize: 10,
    color: '#4a5568',
    marginBottom: 1,
  },
  referenceContact: {
    fontSize: 9.5,
    color: '#6b7280',
  },

  // HOBBIES
  hobbyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  hobbyTag: {
    backgroundColor: '#f7fafc',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 3,
    marginBottom: 3,
  },
  hobbyText: {
    fontSize: 10,
    color: '#4a5568',
  },
});

export const ATSTemplate = ({ data }: ATSTemplateProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <View style={styles.contactBlock}>
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

        {/* SUMMARY */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.positionTitle}>{exp.position}, {exp.company}</Text>
                  <Text style={styles.dateRange}>
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </Text>
                </View>
                {exp.location && <Text style={styles.locationText}>{exp.location}</Text>}
                {renderBulletPoints(exp.description, {})}
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <Text style={styles.degreeTitle}>{edu.degree}</Text>
                  <Text style={styles.graduationDate}>{edu.endDate}</Text>
                </View>
                <Text style={styles.institutionName}>{edu.institution}</Text>
                {edu.field && (
                  <Text style={styles.educationDetails}>Field: {edu.field}</Text>
                )}
                {renderBulletPoints(edu.description, styles.educationDetails)}
              </View>
            ))}
          </View>
        )}

        {/* SKILLS */}
        {data.skills?.length > 0 && (() => {
          const technicalSkills = data.skills.filter(skill => skill.type === 'technical');
          const softSkills = data.skills.filter(skill => skill.type === 'soft');
          
          return (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              
              {technicalSkills.length > 0 && (
                <View style={[styles.skillCategory, { marginBottom: softSkills.length > 0 ? 3 : 0 }]}>
                  <Text style={styles.skillCategoryTitle}>Technical:</Text>
                  <Text style={styles.skillText}>
                    {technicalSkills.map(skill => skill.name).join(', ')}
                  </Text>
                </View>
              )}
              
              {softSkills.length > 0 && (
                <View style={[styles.skillCategory, { marginBottom: 0 }]}>
                  <Text style={styles.skillCategoryTitle}>Soft Skills:</Text>
                  <Text style={styles.skillText}>
                    {softSkills.map(skill => skill.name).join(', ')}
                  </Text>
                </View>
              )}
            </View>
          );
        })()}

        {/* PROJECTS */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.projectItem}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  <Text style={styles.projectDate}>
                    {proj.startDate} - {proj.endDate || 'Present'}
                  </Text>
                </View>
                {renderBulletPoints(proj.description, styles.projectDescription)}
                {proj.technologies && (
                  <View style={styles.projectTechs}>
                    {(Array.isArray(proj.technologies)
                      ? proj.technologies
                      : [proj.technologies]
                    ).map((t, j) => (
                      <Text key={j} style={styles.techItem}>
                        {t}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* CERTIFICATIONS */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, i) => (
              <View key={i} style={styles.certificationItem}>
                <Text style={styles.certificationName}>
                  {cert}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* LANGUAGES */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.languageText}>
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
              <View key={i} style={styles.achievementItem}>
                <View style={styles.achievementHeader}>
                  <Text style={styles.achievementTitle}>{ach.title}</Text>
                  <Text style={styles.achievementDate}>{ach.date}</Text>
                </View>
                {renderBulletPoints(ach.description, styles.achievementDescription)}
              </View>
            ))}
          </View>
        )}

        {/* VOLUNTEER */}
        {data.volunteerWork?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Experience</Text>
            {data.volunteerWork.map((v, i) => (
              <View key={i} style={styles.volunteerItem}>
                <Text style={styles.volunteerRole}>{v.role}</Text>
                <View style={styles.volunteerHeader}>
                  <Text style={styles.volunteerOrganization}>{v.organization}</Text>
                  <Text style={styles.volunteerDate}>
                    {v.startDate} - {v.endDate || 'Present'}
                  </Text>
                </View>
                {renderBulletPoints(v.description, styles.volunteerDescription)}
              </View>
            ))}
          </View>
        )}

        {/* REFERENCES */}
        {data.references?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional References</Text>
            {data.references.map((r, i) => (
              <View key={i} style={styles.referenceItem}>
                <Text style={styles.referenceName}>{r.name}</Text>
                <Text style={styles.referenceTitle}>
                  {r.position} at {r.company}
                </Text>
                {r.email && <Text style={styles.referenceContact}>{r.email}</Text>}
                {r.phone && <Text style={styles.referenceContact}>{r.phone}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* HOBBIES */}
        {data.hobbies && data.hobbies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests & Hobbies</Text>
            <Text style={styles.hobbyText}>
              {data.hobbies.join(', ')}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ATSTemplate;

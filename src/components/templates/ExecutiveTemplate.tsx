// "The Jessica" - Modern Top-Banner Template (Image Replica)
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';

interface TemplateProps {
  data: CVData;
}

// Helper to render clean bullet points
const renderBulletPoints = (text: string | undefined, style: any) => {
  if (!text || !text.trim()) return null;
  
  const lines = text.split('\n').filter(line => line.trim());
  
  return (
    <View>
      {lines.map((line, index) => {
        const trimmedLine = line.trim();
        const bulletText = trimmedLine.startsWith('•') || trimmedLine.startsWith('-') 
          ? trimmedLine.substring(1).trim() 
          : trimmedLine;
        
        return (
          <View key={index} style={{ flexDirection: 'row', marginBottom: 2 }}>
             <Text style={{ width: 10, fontSize: 12, color: '#000000' }}>•</Text>
             <Text style={[style, { flex: 1 }]}>{bulletText}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 0, // Zero padding to allow full-width banner
    backgroundColor: '#ffffff',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#000000',
  },

  // --- TOP BANNER (Light Blue) ---
  topBanner: {
    backgroundColor: '#dbeafe', // Light Powder Blue (Matches image)
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  contactText: {
    fontSize: 9,
    color: '#1f2937', // Dark Grey
    fontWeight: 'medium',
  },
  separator: {
    color: '#3b82f6', // Blue separator
    marginHorizontal: 5,
    fontWeight: 'bold',
  },

  // --- NAME SECTION ---
  nameContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 30,
  },
  name: {
    fontSize: 32,
    fontWeight: 'normal', // The image uses a clean, non-bold font for the name
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 4, // Wide letter spacing like the image
    marginBottom: 5,
  },
  role: {
    fontSize: 12,
    color: '#4b5563',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  // --- SECTION LAYOUT (Left Rail Header) ---
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  // The thick blue line above each section
  sectionLine: {
    height: 2,
    backgroundColor: '#bfdbfe', // Light Blue Line
    width: '100%',
    marginBottom: 12,
  },
  sectionContentRow: {
    flexDirection: 'row',
  },
  
  // Left Column (Header) - 25%
  leftColumn: {
    width: '25%',
    paddingRight: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1,
    lineHeight: 1.4,
  },

  // Right Column (Body) - 75%
  rightColumn: {
    width: '75%',
  },
  
  // --- CONTENT STYLES ---
  summaryText: {
    fontSize: 10,
    textAlign: 'justify',
    color: '#000000',
    lineHeight: 1.6,
  },
  
  // Work History Block
  jobBlock: {
    marginBottom: 12,
  },
  jobHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
  },
  companyName: {
    fontSize: 10,
    color: '#4b5563',
    fontStyle: 'italic',
  },
  dateText: {
    fontSize: 9,
    color: '#000000',
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  descriptionText: {
    fontSize: 10,
    color: '#000000',
    lineHeight: 1.5,
  },

  // Skills Grid
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    width: '50%', // 2 Columns for skills within the right pane
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillBullet: {
    marginRight: 6,
    fontSize: 10,
    color: '#000000',
  },
  skillText: {
    fontSize: 10,
    color: '#000000',
  },

  // Education
  eduBlock: {
    marginBottom: 8,
  },
});

export default function JessicaTemplate({ data }: TemplateProps) {
  const renderSeparator = () => <Text style={styles.separator}>|</Text>;
  const has = (arr: any[] | undefined) => arr && arr.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* --- TOP BANNER (Contact) --- */}
        <View style={styles.topBanner}>
          {data.personalInfo.location && (
            <>
               <View style={styles.contactItem}>
                 <Text style={styles.contactText}>{data.personalInfo.location}</Text>
               </View>
               {renderSeparator()}
            </>
          )}
          
          {data.personalInfo.phone && (
            <>
               <View style={styles.contactItem}>
                 <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
               </View>
               {renderSeparator()}
            </>
          )}
          
          {data.personalInfo.email && (
             <View style={styles.contactItem}>
               <Text style={styles.contactText}>{data.personalInfo.email}</Text>
             </View>
          )}

          {/* Optional: Add LinkedIn/Web if space permits, or add a second row */}
          {data.personalInfo.linkedin && (
            <>
              {renderSeparator()}
              <Link src={data.personalInfo.linkedin} style={[styles.contactItem, { textDecoration: 'none' }]}>
                 <Text style={styles.contactText}>LinkedIn</Text>
              </Link>
            </>
          )}
        </View>

        {/* --- NAME HEADER --- */}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
        </View>

        {/* --- PROFESSIONAL SUMMARY --- */}
        {data.personalInfo.summary && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionLine} />
            <View style={styles.sectionContentRow}>
              <View style={styles.leftColumn}>
                <Text style={styles.sectionTitle}>SUMMARY</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.summaryText}>{data.personalInfo.summary}</Text>
              </View>
            </View>
          </View>
        )}

        {/* --- SKILLS --- */}
        {has(data.skills) && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionLine} />
            <View style={styles.sectionContentRow}>
              <View style={styles.leftColumn}>
                <Text style={styles.sectionTitle}>SKILLS</Text>
              </View>
              <View style={styles.rightColumn}>
                <View style={styles.skillGrid}>
                  {data.skills?.map((skill, i) => (
                    <View key={i} style={styles.skillItem}>
                      <Text style={styles.skillBullet}>•</Text>
                      <Text style={styles.skillText}>{skill.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* --- WORK HISTORY --- */}
        {has(data.experience) && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionLine} />
            <View style={styles.sectionContentRow}>
              <View style={styles.leftColumn}>
                <Text style={styles.sectionTitle}>WORK HISTORY</Text>
              </View>
              <View style={styles.rightColumn}>
                {data.experience?.map((exp, i) => (
                  <View key={i} style={styles.jobBlock} wrap={false}>
                    <View style={styles.jobHeaderRow}>
                      <View>
                        <Text style={styles.jobTitle}>{exp.position}</Text>
                        <Text style={styles.companyName}>
                           {exp.company} {exp.location ? `- ${exp.location}` : ''}
                        </Text>
                      </View>
                      <Text style={styles.dateText}>
                         {exp.startDate} - {exp.endDate || 'Present'}
                      </Text>
                    </View>
                    {renderBulletPoints(exp.description, styles.descriptionText)}
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* --- PROJECTS --- */}
        {has(data.projects) && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionLine} />
            <View style={styles.sectionContentRow}>
              <View style={styles.leftColumn}>
                <Text style={styles.sectionTitle}>PROJECTS</Text>
              </View>
              <View style={styles.rightColumn}>
                {data.projects?.map((proj, i) => (
                  <View key={i} style={styles.jobBlock} wrap={false}>
                    <View style={styles.jobHeaderRow}>
                      <Text style={styles.jobTitle}>{proj.name}</Text>
                      <Text style={styles.dateText}>
                         {proj.startDate} - {proj.endDate || 'Present'}
                      </Text>
                    </View>
                    {renderBulletPoints(proj.description, styles.descriptionText)}
                    {proj.technologies && (
                      <Text style={{ fontSize: 9, fontStyle: 'italic', marginTop: 2, color: '#4b5563' }}>
                        Tech: {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* --- EDUCATION --- */}
        {has(data.education) && (
          <View style={styles.sectionContainer}>
             <View style={styles.sectionLine} />
             <View style={styles.sectionContentRow}>
               <View style={styles.leftColumn}>
                 <Text style={styles.sectionTitle}>EDUCATION</Text>
               </View>
               <View style={styles.rightColumn}>
                 {data.education?.map((edu, i) => (
                   <View key={i} style={styles.eduBlock}>
                     <View style={styles.jobHeaderRow}>
                        <Text style={styles.jobTitle}>
                          {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                        </Text>
                        <Text style={styles.dateText}>{edu.endDate}</Text>
                     </View>
                     <Text style={styles.companyName}>{edu.institution}</Text>
                     {edu.description && <Text style={[styles.descriptionText, { marginTop: 2 }]}>{edu.description}</Text>}
                   </View>
                 ))}
               </View>
             </View>
          </View>
        )}

        {/* --- VOLUNTEER --- */}
        {has(data.volunteerWork) && (
           <View style={styles.sectionContainer}>
             <View style={styles.sectionLine} />
             <View style={styles.sectionContentRow}>
               <View style={styles.leftColumn}>
                 <Text style={styles.sectionTitle}>VOLUNTEER</Text>
               </View>
               <View style={styles.rightColumn}>
                 {data.volunteerWork?.map((vol, i) => (
                   <View key={i} style={styles.jobBlock}>
                     <View style={styles.jobHeaderRow}>
                       <Text style={styles.jobTitle}>{vol.role}</Text>
                       <Text style={styles.dateText}>
                         {vol.startDate} - {vol.endDate || 'Present'}
                       </Text>
                     </View>
                     <Text style={styles.companyName}>{vol.organization}</Text>
                     {renderBulletPoints(vol.description, styles.descriptionText)}
                   </View>
                 ))}
               </View>
             </View>
           </View>
        )}

        {/* --- ACHIEVEMENTS --- */}
        {has(data.achievements) && (
           <View style={styles.sectionContainer}>
             <View style={styles.sectionLine} />
             <View style={styles.sectionContentRow}>
               <View style={styles.leftColumn}>
                 <Text style={styles.sectionTitle}>AWARDS</Text>
               </View>
               <View style={styles.rightColumn}>
                 {data.achievements?.map((ach, i) => (
                   <View key={i} style={{ marginBottom: 6 }}>
                      <View style={styles.jobHeaderRow}>
                        <Text style={styles.jobTitle}>{ach.title}</Text>
                        <Text style={styles.dateText}>{ach.date}</Text>
                      </View>
                      {ach.description && <Text style={styles.descriptionText}>{ach.description}</Text>}
                   </View>
                 ))}
               </View>
             </View>
           </View>
        )}
        
        {/* --- REFERENCES --- */}
        {has(data.references) && (
           <View style={styles.sectionContainer}>
             <View style={styles.sectionLine} />
             <View style={styles.sectionContentRow}>
               <View style={styles.leftColumn}>
                 <Text style={styles.sectionTitle}>REFERENCES</Text>
               </View>
               <View style={styles.rightColumn}>
                 {data.references?.map((ref, i) => (
                   <View key={i} style={{ marginBottom: 8 }}>
                     <Text style={styles.jobTitle}>{ref.name}</Text>
                     <Text style={styles.companyName}>
                       {ref.position}, {ref.company}
                     </Text>
                     {ref.email && <Text style={styles.descriptionText}>{ref.email}</Text>}
                   </View>
                 ))}
               </View>
             </View>
           </View>
        )}

      </Page>
    </Document>
  );
}
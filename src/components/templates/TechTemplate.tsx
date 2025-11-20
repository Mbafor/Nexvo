// "The Image Replica" - Navy Sidebar & Light Grey Body (Full ATS Optimization)
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet, Image, Link } from '@react-pdf/renderer';

interface TechTemplateProps {
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
             <Text style={{ width: 10, fontSize: 12, color: '#374151' }}>•</Text>
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
    flexDirection: 'row', // Split Layout
    backgroundColor: '#ffffff',
    minHeight: '100%',
  },

  // --- LEFT SIDEBAR (Navy Blue) ---
  sidebar: {
    width: '35%',
    backgroundColor: '#1e2a3a', // Dark Navy from image
    color: '#ffffff',
    padding: 24,
    alignItems: 'flex-start',
  },

  // --- RIGHT CONTENT (Light Grey) ---
  mainContent: {
    width: '65%',
    backgroundColor: '#e5e7eb', // Light Grey from image
    color: '#1f2937',
    padding: 35,
    paddingTop: 45,
  },

  // --- IMAGES ---
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circle
    borderWidth: 4,
    borderColor: '#ffffff',
    alignSelf: 'center',
    marginBottom: 20,
    objectFit: 'cover',
  },

  // --- LEFT COLUMN STYLES ---
  sidebarHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 15,
    marginBottom: 8,
  },
  sidebarDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ffffff',
    opacity: 0.4,
    marginBottom: 12,
  },
  sidebarText: {
    fontSize: 9.5,
    color: '#d1d5db', // Light grey text
    marginBottom: 4,
    lineHeight: 1.4,
  },
  sidebarBold: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 6,
  },
  
  // Contact Icons/Rows
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconText: {
    fontSize: 9,
    color: '#ffffff',
    marginRight: 8,
  },

  // --- RIGHT COLUMN STYLES ---
  name: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#374151', // Dark Grey
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 14,
    color: '#4b5563',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 10,
  },
  titleDivider: {
    width: 50,
    height: 4,
    backgroundColor: '#374151', // Dark accent line
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1e2a3a', // Navy Blue headings
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 10,
    marginBottom: 5,
  },
  sectionDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#9ca3af', // Darker grey divider
    marginBottom: 15,
  },

  // --- EXPERIENCE & CONTENT BLOCKS ---
  // The image uses a timeline style line on the left of the text
  timelineBlock: {
    borderLeftWidth: 2,
    borderLeftColor: '#9ca3af',
    paddingLeft: 15,
    marginLeft: 5,
    marginBottom: 15,
    position: 'relative',
  },
  // The "Dot" on the timeline
  timelineDot: {
    position: 'absolute',
    left: -20, // -2 (border) - 4 (half dot) - gap
    top: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1e2a3a',
  },
  
  blockTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  blockSubtitle: {
    fontSize: 10.5,
    color: '#4b5563',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  blockDate: {
    fontSize: 9,
    color: '#6b7280',
    textAlign: 'right',
    position: 'absolute',
    right: 0,
    top: 0,
    fontFamily: 'Helvetica-Bold',
  },
  bodyText: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  
  // Tags
  tagContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginTop: 4,
    gap: 4,
  },
  tag: {
    fontSize: 8, 
    backgroundColor: '#d1d5db', 
    paddingHorizontal: 6, 
    paddingVertical: 2, 
    borderRadius: 4, 
    color: '#1f2937'
  }
});

export default function TechTemplate({ data }: TechTemplateProps) {
  // Checks if array has data
  const has = (arr: any[] | undefined) => arr && arr.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* ================= LEFT SIDEBAR (Navy) ================= */}
        <View style={styles.sidebar}>
          
          {/* Profile Photo */}
          {data.personalInfo.photo && (
            <Image src={data.personalInfo.photo} style={styles.profileImage} />
          )}

          {/* CONTACT */}
          <Text style={styles.sidebarHeader}>CONTACT</Text>
          <View style={styles.sidebarDivider} />
          
          {data.personalInfo.phone && (
            <View style={styles.contactRow}>
        
              <Text style={styles.sidebarText}>{data.personalInfo.phone}</Text>
            </View>
          )}
          {data.personalInfo.email && (
            <View style={styles.contactRow}>
             
              <Text style={styles.sidebarText}>{data.personalInfo.email}</Text>
            </View>
          )}
          {data.personalInfo.location && (
            <View style={styles.contactRow}>
              
              <Text style={styles.sidebarText}>{data.personalInfo.location}</Text>
            </View>
          )}
          {data.personalInfo.linkedin && (
             <View style={styles.contactRow}>
            
              <Link src={data.personalInfo.linkedin} style={[styles.sidebarText, {textDecoration:'none'}]}>
                LinkedIn Profile
              </Link>
            </View>
          )}
           {data.personalInfo.website && (
             <View style={styles.contactRow}>
              
              <Link src={data.personalInfo.website} style={[styles.sidebarText, {textDecoration:'none'}]}>
                Portfolio / Website
              </Link>
            </View>
          )}

          {/* EDUCATION (Moved to Left as per Image) */}
          {has(data.education) && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sidebarHeader}>EDUCATION</Text>
              <View style={styles.sidebarDivider} />
              {data.education?.map((edu, i) => (
                <View key={i} style={{ marginBottom: 12 }}>
                  <Text style={[styles.sidebarText, { fontWeight: 'bold', color: '#ffffff' }]}>
                    {edu.endDate}
                  </Text>
                  <Text style={[styles.sidebarText, { textTransform: 'uppercase', fontWeight: 'bold' }]}>
                    {edu.institution}
                  </Text>
                  <Text style={styles.sidebarText}>{edu.degree}</Text>
                </View>
              ))}
            </View>
          )}

          {/* SKILLS */}
          {has(data.skills) && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sidebarHeader}>SKILLS</Text>
              <View style={styles.sidebarDivider} />
              {data.skills?.map((skill, i) => (
                <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
                   <Text style={{ color: '#ffffff', marginRight: 5 }}>•</Text>
                   <Text style={styles.sidebarText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* CERTIFICATIONS */}
          {has(data.certifications) && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sidebarHeader}>CERTIFICATIONS</Text>
              <View style={styles.sidebarDivider} />
              {data.certifications?.map((cert, i) => (
                <Text key={i} style={styles.sidebarText}>• {cert}</Text>
              ))}
            </View>
          )}

          {/* LANGUAGES */}
          {has(data.languages) && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sidebarHeader}>LANGUAGES</Text>
              <View style={styles.sidebarDivider} />
              {data.languages?.map((lang, i) => (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                   <Text style={styles.sidebarText}>{lang.name}</Text>
                   <Text style={[styles.sidebarText, { opacity: 0.7 }]}>{lang.level}</Text>
                </View>
              ))}
            </View>
          )}

          {/* HOBBIES */}
          {has(data.hobbies) && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sidebarHeader}>INTERESTS</Text>
              <View style={styles.sidebarDivider} />
              <Text style={styles.sidebarText}>{data.hobbies?.join(', ')}</Text>
            </View>
          )}
        </View>

        {/* ================= RIGHT CONTENT (Light Grey) ================= */}
        <View style={styles.mainContent}>
          
          {/* Header */}
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
        
          <View style={styles.titleDivider} />

          {/* PROFILE */}
          {data.personalInfo.summary && (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sectionTitle}>PROFILE</Text>
              <View style={styles.sectionDivider} />
              <Text style={styles.bodyText}>{data.personalInfo.summary}</Text>
            </View>
          )}

          {/* WORK EXPERIENCE */}
          {has(data.experience) && (
            <View>
              <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
              <View style={styles.sectionDivider} />
              
              {data.experience?.map((exp, i) => (
                <View key={i} style={styles.timelineBlock} wrap={false}>
                   <View style={styles.timelineDot} />
                   
                   {/* Date is absolutely positioned top-right to match image style */}
                   <Text style={styles.blockDate}>
                      {exp.startDate} - {exp.endDate || 'PRESENT'}
                   </Text>
                   
                   <Text style={styles.blockTitle}>{exp.company}</Text>
                   <Text style={styles.blockSubtitle}>{exp.position}</Text>
                   
                   {renderBulletPoints(exp.description, styles.bodyText)}
                </View>
              ))}
            </View>
          )}

          {/* KEY PROJECTS */}
          {has(data.projects) && (
            <View>
              <Text style={styles.sectionTitle}>KEY PROJECTS</Text>
              <View style={styles.sectionDivider} />
              
              {data.projects?.map((proj, i) => (
                <View key={i} style={styles.timelineBlock} wrap={false}>
                   <View style={styles.timelineDot} />
                   <Text style={styles.blockDate}>
                      {proj.startDate} - {proj.endDate || 'PRESENT'}
                   </Text>
                   <Text style={styles.blockTitle}>{proj.name}</Text>
                   
                   {renderBulletPoints(proj.description, styles.bodyText)}
                   
                   {proj.technologies && (
                     <View style={styles.tagContainer}>
                       {(Array.isArray(proj.technologies) ? proj.technologies : [proj.technologies]).map((t, k) => (
                         <Text key={k} style={styles.tag}>{t}</Text>
                       ))}
                     </View>
                   )}
                   {proj.link && (
                     <Link src={proj.link} style={{ fontSize: 9, color: '#1e2a3a', marginTop: 3 }}>
                       View Project
                     </Link>
                   )}
                </View>
              ))}
            </View>
          )}

          {/* VOLUNTEER */}
          {has(data.volunteerWork) && (
            <View>
              <Text style={styles.sectionTitle}>VOLUNTEER EXPERIENCE</Text>
              <View style={styles.sectionDivider} />
              
              {data.volunteerWork?.map((vol, i) => (
                <View key={i} style={styles.timelineBlock} wrap={false}>
                   <View style={styles.timelineDot} />
                   <Text style={styles.blockDate}>
                      {vol.startDate} - {vol.endDate || 'PRESENT'}
                   </Text>
                   <Text style={styles.blockTitle}>{vol.organization}</Text>
                   <Text style={styles.blockSubtitle}>{vol.role}</Text>
                   {renderBulletPoints(vol.description, styles.bodyText)}
                </View>
              ))}
            </View>
          )}

          {/* ACHIEVEMENTS */}
          {has(data.achievements) && (
            <View>
              <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
              <View style={styles.sectionDivider} />
              {data.achievements?.map((ach, i) => (
                 <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={[styles.blockTitle, { fontSize: 11 }]}>• {ach.title}</Text>
                    {ach.date && <Text style={{ fontSize: 9, color: '#6b7280', marginLeft: 10 }}>{ach.date}</Text>}
                    {ach.description && <Text style={[styles.bodyText, { marginLeft: 10 }]}>{ach.description}</Text>}
                 </View>
              ))}
            </View>
          )}

          {/* REFERENCES */}
          {has(data.references) && (
            <View>
              <Text style={styles.sectionTitle}>REFERENCES</Text>
              <View style={styles.sectionDivider} />
              {data.references?.map((ref, i) => (
                 <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={[styles.blockTitle, { fontSize: 11 }]}>{ref.name}</Text>
                    <Text style={styles.blockSubtitle}>
                      {ref.position}, {ref.company}
                    </Text>
                    {ref.email && <Text style={{ fontSize: 9, color: '#4b5563' }}>{ref.email}</Text>}
                 </View>
              ))}
            </View>
          )}

        </View>

      </Page>
    </Document>
  );
}
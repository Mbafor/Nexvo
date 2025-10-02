// src/components/templates/CreativeTemplate.tsx
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
<a href="https://www.flaticon.com/free-icons/contact" title="contact icons">Contact icons created by th studio - Flaticon</a>

interface CreativeTemplateProps {
  data: CVData;
}

const styles = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Helvetica', width: '210mm', height: '297mm' },
  sidebar: { width: '35%', backgroundColor: '#1f3b57', padding: 15, color: '#fff' },
  main: { width: '65%', padding: 20, backgroundColor: '#fff', color: '#111' },

  // Sidebar
  profilePhoto: { width: 100, height: 100, borderRadius: 50, marginBottom: 15, alignSelf: 'center', borderWidth: 2, borderColor: '#3b82f6' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginVertical: 6, textTransform: 'uppercase', paddingBottom: 2, borderBottomWidth: 1, borderBottomColor: '#3b82f6' },
  text: { fontSize: 10, marginBottom: 4, color: '#fff' },
  bullet: { fontSize: 10, marginBottom: 2, marginLeft: 4, color: '#111' },
  contactRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  contactIcon: { width: 10, height: 10, marginRight: 6 },

  // Skill/Language bars
  skillContainer: { marginBottom: 6 },
  skillLabel: { fontSize: 10, marginBottom: 2, color: '#fff' },
  skillBar: { height: 5, backgroundColor: '#fff', borderRadius: 3 },
  skillLevel: { height: 5, borderRadius: 3, backgroundColor: '#3b82f6' },

  // References in sidebar
  referencesSection: { marginTop: 12 },
  referenceItem: { marginBottom: 4 },
  referenceText: { fontSize: 10, color: '#fff', marginBottom: 2, lineHeight: 1.7 },

  // Main
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 4, color: '#1f3b57' },
  role: { fontSize: 12, marginBottom: 12, color: '#3b3b3b', textTransform: 'uppercase' },
  subSection: { marginBottom: 12 },
  jobTitle: { fontSize: 12, fontWeight: 'bold', color: '#111' },
  company: { fontSize: 10, fontWeight: 'bold', color: '#1f3b57' },
  companyLine: { fontSize: 10, color: '#555' },
  dates: { fontSize: 9, color: '#555', textAlign: 'right' },
});

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const getSkillWidth = (level: string) => {
    switch (level) {
      case 'expert': return '100%';
      case 'advanced': return '75%';
      case 'intermediate': return '50%';
      default: return '30%';
    }
  };

  const getLanguageWidth = (level: string) => {
    switch (level) {
      case 'native': return '100%';
      case 'fluent': return '85%';
      case 'advanced': return '70%';
      case 'intermediate': return '50%';
      case 'beginner': return '30%';
      default: return '25%';
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {data.personalInfo.photo && <Image style={styles.profilePhoto} src={data.personalInfo.photo} />}

          {/* Contact */}
          <Text style={styles.sectionTitle}>Contact</Text>
          {data.personalInfo.phone && <View style={styles.contactRow}><Image src="/Images/phone.png" style={styles.contactIcon} /><Text style={styles.text}>{data.personalInfo.phone}</Text></View>}
          {data.personalInfo.email && <View style={styles.contactRow}><Image src="/Images/email.png" style={styles.contactIcon} /><Text style={styles.text}>{data.personalInfo.email}</Text></View>}
          {data.personalInfo.location && <View style={styles.contactRow}><Image src="/Images/location.png" style={styles.contactIcon} /><Text style={styles.text}>{data.personalInfo.location}</Text></View>}
          {data.personalInfo.linkedin && <View style={styles.contactRow}><Image src="/Images/linkedin.png" style={styles.contactIcon} /><Text style={styles.text}>{data.personalInfo.linkedin}</Text></View>}
          {data.personalInfo.website && <View style={styles.contactRow}><Image src="/Images/website.png" style={styles.contactIcon} /><Text style={styles.text}>{data.personalInfo.website}</Text></View>}

          {/* Education */}
          {data.education?.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map(edu => (
                <View key={edu.id} style={{ marginBottom: 6 }}>
                  <Text style={styles.text}>{edu.degree}</Text>
                  <Text style={styles.text}>{edu.institution}</Text>
                  <Text style={styles.text}>{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Skills</Text>
              {data.skills.map(skill => (
                <View key={skill.id} style={styles.skillContainer}>
                  <Text style={styles.skillLabel}>• {skill.name}</Text>
                  <View style={styles.skillBar}>
                    <View style={{ ...styles.skillLevel, width: getSkillWidth(skill.level) }} />
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* References */}
          {data.references?.length > 0 && (
            <View style={styles.referencesSection}>
              <Text style={styles.sectionTitle}>References</Text>
              {data.references.map(ref => (
                <View key={ref.id} style={styles.referenceItem}>
                  <Text style={styles.referenceText}>• {ref.name}</Text>
                  <Text style={styles.referenceText}>• {ref.position} at {ref.company}</Text>
                  {ref.phone && <Text style={styles.referenceText}>• Phone: {ref.phone}</Text>}
                  {ref.email && <Text style={styles.referenceText}>• Email: {ref.email}</Text>}
                </View>
              ))}
            </View>
          )}
{/* Languages */}
{data.languages && data.languages.length > 0 && (
  <View>
    <Text style={styles.sectionTitle}>Languages</Text>
    {data.languages.map(lang => (
      <View key={lang.id} style={styles.skillContainer}>
        <Text style={styles.skillLabel}>• {lang.name}</Text>
        <View style={styles.skillBar}>
          <View style={{ ...styles.skillLevel, width: getLanguageWidth(lang.level) }} />
        </View>
      </View>
    ))}
  </View>
)}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <View style={{ width: 60, height: 2, backgroundColor: '#3b82f6', marginBottom: 12 }} />

          {/* Profile */}
          {data.personalInfo.summary && (
            <View style={styles.subSection}>
              <Text style={styles.sectionTitle}>Profile</Text>
              {data.personalInfo.summary.split('\n').map((line, idx) => (
                <Text key={idx} style={styles.bullet}>{line}</Text>
              ))}
            </View>
          )}

          {/* Work Experience */}
          {data.experience?.length > 0 && (
            <View style={styles.subSection}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {data.experience.map(exp => (
                <View key={exp.id} style={{ marginBottom: 8 }}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.dates}>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</Text>
                  {exp.description && exp.description.split('\n').map((line, idx) => (
                    <Text key={idx} style={styles.bullet}>• {line}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Volunteer Experience */}
          {data.volunteerWork?.length > 0 && (
            <View style={styles.subSection}>
              <Text style={styles.sectionTitle}>Volunteer Experience</Text>
              {data.volunteerWork.map(vol => (
                <View key={vol.id} style={{ marginBottom: 8 }}>
                  <Text style={styles.jobTitle}>{vol.role}</Text>
                  <Text style={styles.company}>{vol.organization}</Text>
                  <Text style={styles.dates}>{formatDate(vol.startDate)} - {vol.current ? 'Present' : formatDate(vol.endDate)}</Text>
                  {vol.description && vol.description.split('\n').map((line, idx) => (
                    <Text key={idx} style={styles.bullet}>• {line}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <View style={styles.subSection}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map(proj => (
                <View key={proj.id} style={{ marginBottom: 6 }}>
                  <Text style={styles.jobTitle}>{proj.name}</Text>
                  {proj.startDate && <Text style={styles.dates}>{formatDate(proj.startDate)} - {proj.endDate ? formatDate(proj.endDate) : 'Present'}</Text>}
                  {proj.description && proj.description.split('\n').map((line, idx) => (
                    <Text key={idx} style={styles.bullet}>• {line}</Text>
                  ))}
                  {proj.technologies && <Text style={styles.bullet}>• Technologies: {proj.technologies}</Text>}
                  {proj.link && <Text style={styles.bullet}>• Link: {proj.link}</Text>}
                </View>
              ))}
            </View>
          )}

{/* Achievements */}
{data.achievements?.length > 0 && (
  <View style={styles.subSection}>
    <Text style={styles.sectionTitle}>Achievements</Text>
    {data.achievements.map(ach => (
      <View key={ach.id} style={{ marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Text style={styles.jobTitle}>{ach.title}</Text>
          {ach.date && <Text style={styles.companyLine}>{formatDate(ach.date)}</Text>}
        </View>
        {ach.description && ach.description.split('\n').map((line, idx) => (
          <Text key={idx} style={styles.bullet}>• {line}</Text>
        ))}
      </View>
    ))}
  </View>
)}


        </View>
      </Page>
    </Document>
  );
}

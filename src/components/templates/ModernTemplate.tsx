// src/components/templates/ModernTemplatePDF.tsx
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface ModernTemplateProps {
  data: CVData;
}

const styles = StyleSheet.create({
  page: { 
    fontFamily: 'Helvetica', 
    padding: 30, 
    backgroundColor: '#ffffff',
    color: '#111827'
  },
  header: { marginBottom: 20, alignItems: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase' },
  surnameHighlight: { color: '#0e7490' }, 
  title: { fontSize: 12, marginTop: 4, textTransform: 'uppercase' },
  contactRow: { flexDirection: 'row', justifyContent: 'center', fontSize: 10, marginTop: 6 },
  contactText: { marginHorizontal: 6 },
  section: { marginBottom: 14 },
  sectionTitle: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginBottom: 6, 
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 2
  },
  text: { fontSize: 10, lineHeight: 1.4 },
  jobTitle: { fontSize: 11, fontWeight: 'bold', marginTop: 4 },
  companyLine: { fontSize: 10, color: '#4b5563', marginBottom: 2 },
  bullet: { fontSize: 10, marginLeft: 10, marginBottom: 2 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  skill: { fontSize: 10, marginRight: 12, marginBottom: 4 },
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactText}>
              {[data.personalInfo.phone, data.personalInfo.email, data.personalInfo.location, data.personalInfo.linkedin, data.personalInfo.website]
                .filter(Boolean)
                .join(' | ')}
            </Text>
          </View>
        </View>

        {/* Profile */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Profile</Text>
            <Text style={styles.text}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {hasContent(data.experience || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {(data.experience || []).map(exp => (
              <View key={exp.id} style={{ marginBottom: 6 }}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.companyLine}>
                  {exp.company}{exp.location ? ` | ${exp.location}` : ''} | {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </Text>
                {exp.description && exp.description.split('\n').map((line, idx) => (
                  <Text key={idx} style={styles.bullet}>• {line}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
{hasContent(data.skills || []) && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Skills</Text>
    <Text style={styles.skill}>
      {(data.skills || [])
        .map(skill => `${skill.name} (${skill.level})`)
        .join(', ')}
    </Text>
  </View>
)}

        {/* Education */}
        {hasContent(data.education || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {(data.education || []).map(edu => (
              <View key={edu.id} style={{ marginBottom: 6 }}>
                <Text style={styles.jobTitle}>{edu.degree} in {edu.field}</Text>
                <Text style={styles.companyLine}>
                  {edu.institution} | {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                </Text>
                {edu.description && <Text style={styles.text}>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}

{/* Projects */}
{hasContent(data.projects || []) && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Projects</Text>
    {(data.projects || []).map(project => (
      <View key={project.id} style={{ marginBottom: 6 }}>
        <Text style={styles.jobTitle}>{project.name}</Text>
        <Text style={styles.companyLine}>
          {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
        </Text>
        {project.description && project.description.split('\n').map((line, idx) => (
          <Text key={idx} style={styles.bullet}>• {line}</Text>
        ))}
        {project.technologies && (
          <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Technologies:</Text> {project.technologies}</Text>
        )}
        {project.link && (
          <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Link:</Text> {project.link}</Text>
        )}
      </View>
    ))}
  </View>
)}

{/* Achievements */}
{hasContent(data.achievements || []) && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Achievements</Text>
    {(data.achievements || []).map(ach => (
      <View key={ach.id} style={{ marginBottom: 4 }}>
        <Text>
          <Text style={styles.jobTitle}>{ach.title}</Text>
          {ach.date && <Text style={styles.companyLine}>  |  {formatDate(ach.date)}</Text>}
        </Text>
        {ach.description && ach.description.split('\n').map((line, idx) => (
          <Text key={idx} style={styles.bullet}>• {line}</Text>
        ))}
      </View>
    ))}
  </View>
)}

        {/* Voluntary Experience */}
        {hasContent(data.volunteerWork || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Voluntary Experience</Text>
            {(data.volunteerWork || []).map(vol => (
              <View key={vol.id} style={{ marginBottom: 6 }}>
                <Text style={styles.jobTitle}>{vol.role}</Text>
                <Text style={styles.companyLine}>
                 {formatDate(vol.startDate)} - {vol.current ? 'Present' : formatDate(vol.endDate)}
                </Text>
                {vol.description && vol.description.split('\n').map((line, idx) => (
                  <Text key={idx} style={styles.bullet}>• {line}</Text>
                ))}
              </View>
            ))}
          </View>
        )}


         {/* Languages */}
        {hasContent(data.languages || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.skill}>
              {(data.languages || []).map(lang => `${lang.name} (${lang.level})`).join(', ')}
            </Text>
          </View>
        )}


      {/* References */}
{hasContent(data.references || []) && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>References</Text>
    {(data.references || []).map(ref => (
      <View key={ref.id} style={{ marginBottom: 6 }}>
        <Text style={styles.jobTitle}>{ref.name}</Text>
        <Text style={styles.companyLine}>
          {ref.position}{ref.company ? ` | ${ref.company}` : ''}
        </Text>
        {(ref.email || ref.phone) && (
          <Text style={styles.text}>
            {ref.email ? `Email: ${ref.email}` : ''}{ref.email && ref.phone ? ' | ' : ''}{ref.phone ? `Phone: ${ref.phone}` : ''}
          </Text>
        )}
      </View>
    ))}
  </View>
)}


      </Page>
    </Document>
  );
}

// src/components/templates/ATSTemplatePDF.tsx
import { CVData } from '../../types/cv';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface ATSTemplateProps {
  data: CVData;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 30,
    width: '210mm',
    minHeight: '297mm',
    color: '#111827',
    fontSize: 11,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 2, // slightly more space after header
    paddingBottom: 12,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15, // more space before contacts
    textTransform: 'uppercase',
  },
  contactRow: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 3, // increased spacing between rows
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactText: {
    marginHorizontal: 8, // more breathing room between items
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 3,
  },
  subItem: {
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 1,
  },
  dates: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'right',
  },
  bullet: {
    fontSize: 10.5,
    marginLeft: 10,
    marginBottom: 2,
  },
  skillText: {
    fontSize: 10.5,
    marginRight: 6,
  },
  projectBox: {
    marginBottom: 6,
  },
  referenceBox: {
    marginBottom: 6,
  },
});

export default function ATSTemplatePDF({ data }: ATSTemplateProps) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const hasContent = (arr: any[]) =>
    arr && arr.length > 0 && arr.some(item =>
      Object.values(item).some(val => val && val !== '' && (typeof val !== 'object' || Object.keys(val).length > 0))
    );

  const renderBulletText = (text: string) => {
    return text.split('\n').map((line, idx) => (
      <Text key={idx} style={styles.bullet}>• {line}</Text>
    ));
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>

          <View style={styles.contactRow}>
            {[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location]
              .filter(Boolean)
              .map((c, i) => (
                <Text key={i} style={styles.contactText}>
                  {i > 0 && '• '} {c}
                </Text>
              ))}
          </View>
        </View>

        {/* Summary */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            {renderBulletText(data.personalInfo.summary)}
          </View>
        )}

        {/* Education */}
        {hasContent(data.education || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {(data.education || []).map(edu => (
              <View key={edu.id} style={styles.subItem}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={styles.jobTitle}>{edu.degree} in {edu.field}</Text>
                    <Text style={styles.company}>{edu.institution}</Text>
                  </View>
                  <Text style={styles.dates}>{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</Text>
                </View>
                {edu.description && renderBulletText(edu.description)}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {hasContent(data.skills || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {(data.skills || []).map((skill, i) => (
                <Text key={skill.id} style={styles.skillText}>
                  {skill.name}{i < data.skills.length - 1 ? ' • ' : ''}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {hasContent(data.projects || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {(data.projects || []).map(proj => (
              <View key={proj.id} style={styles.projectBox}>
                <Text style={styles.jobTitle}>{proj.name}</Text>
                {proj.description && renderBulletText(proj.description)}
                {proj.technologies && <Text>Technologies: {proj.technologies}</Text>}
                {proj.link && <Text>Link: {proj.link}</Text>}
              </View>
            ))}
          </View>
        )}

        
        {/* Work Experience */}
        {hasContent(data.experience || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {(data.experience || []).map(exp => (
              <View key={exp.id} style={styles.subItem}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company}{exp.location ? ` | ${exp.location}` : ''}</Text>
                  </View>
                  <Text style={styles.dates}>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</Text>
                </View>
                {exp.description && renderBulletText(exp.description)}
              </View>
            ))}
          </View>
        )}

        {/* Volunteer */}
        {hasContent(data.volunteerWork || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Work</Text>
            {(data.volunteerWork || []).map(vol => (
              <View key={vol.id} style={styles.subItem}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={styles.jobTitle}>{vol.role}</Text>
                    <Text style={styles.company}>{vol.organization}</Text>
                  </View>
                  <Text style={styles.dates}>{formatDate(vol.startDate)} - {vol.current ? 'Present' : formatDate(vol.endDate)}</Text>
                </View>
                {vol.description && renderBulletText(vol.description)}
              </View>
            ))}
          </View>
        )}

        {/* Achievements */}
        {hasContent(data.achievements || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements & Awards</Text>
            {(data.achievements || []).map(ach => (
              <View key={ach.id} style={styles.subItem}>
                {/* Align title + date in one row */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.jobTitle}>{ach.title}</Text>
                  {ach.date && <Text style={styles.dates}>{formatDate(ach.date)}</Text>}
                </View>
                {ach.description && renderBulletText(ach.description)}
              </View>
            ))}
          </View>
        )}

       {/* Languages */}
{hasContent(data.languages || []) && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Languages</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {(data.languages ?? []).map((lang, i, arr) => (
        <Text key={lang.id} style={styles.skillText}>
          {lang.name} ({lang.level}){i < arr.length - 1 ? ' • ' : ''}
        </Text>
      ))}
    </View>
  </View>
)}


        {/* References */}
        {hasContent(data.references || []) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            {(data.references || []).map(ref => (
              <View key={ref.id} style={styles.referenceBox}>
                <Text style={styles.jobTitle}>{ref.name}</Text>
                <Text>{ref.position} at {ref.company}</Text>
                {ref.email && <Text>{ref.email}</Text>}
                {ref.phone && <Text>{ref.phone}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

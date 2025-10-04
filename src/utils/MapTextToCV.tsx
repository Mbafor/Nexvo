// src/utils/mapTextToCV.ts
import { CVData, Education, Experience, VolunteerWork, Skill, Project, Achievement, Reference, Language } from "../types/cv";
import { v4 as uuidv4 } from "uuid";

/**
 * Top-level smart CV text parser
 * Detects and extracts all major sections to fit CVData
 */
export function mapTextToCV(text: string): CVData {
  const clean = text.replace(/\r\n/g, "\n").trim();

  // Helper to extract the first capture group from regex
  const extract = (pattern: RegExp, src: string = clean): string => {
    const match = src.match(pattern);
    return match ? match[1].trim() : "";
  };

  // Helper to get section text
  const section = (titles: string[]): string => {
    const pattern = new RegExp(`(${titles.join("|")})[\\s\\n]*[:\\-]?([\\s\\S]*?)(?=\\n(?:[A-Z][a-z]+\\s*:?|$))`, "i");
    const match = clean.match(pattern);
    return match ? match[2].trim() : "";
  };

  // 🧍 Personal Info
  const personalInfo = {
    fullName:
      extract(/name[:\-]?\s*([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/i) ||
      extract(/^([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/m),
    email: extract(/\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/i),
    phone: extract(/(\+?\d[\d\s().-]{7,}\d)/),
    location: extract(/address[:\-]?\s*(.*)/i) || extract(/location[:\-]?\s*(.*)/i),
    linkedin: extract(/(https?:\/\/)?(www\.)?linkedin\.com\/[^\s)]+/i),
    website: extract(/(https?:\/\/[^\s]+(\.com|\.net|\.org|\.io)[^\s]*)/i),
    summary: section(["summary", "profile", "objective"]),
    photo: "",
  };

  // 🏫 Education
  const eduSection = section(["education", "academic background", "studies", "qualifications"]);
  const education: Education[] = [];
  if (eduSection) {
    const eduBlocks = eduSection.split(/\n{2,}/);
    for (const block of eduBlocks) {
      if (block.trim().length < 6) continue;
      const line = block.replace(/\n/g, " ");
      education.push({
        id: uuidv4(),
        institution: extract(/(?:university|college|school)[:\-]?\s*(.*)/i, line) || line.split(",")[0] || "",
        degree: extract(/(bachelor|master|phd|mba|diploma|degree|certificate)[^.,]*/i, line),
        field: extract(/in\s+([A-Za-z\s&]+)/i, line),
        startDate: extract(/(\d{4})\s*[-–to]+\s*(\d{4}|present|current)/i, line).split(/[-–to]+/)[0]?.trim() || "",
        endDate: extract(/(\d{4})\s*[-–to]+\s*(\d{4}|present|current)/i, line).split(/[-–to]+/)[1]?.trim() || "",
        current: /present|current/i.test(line),
        description: block.trim(),
      });
    }
  }

  // 💼 Experience
  const expSection = section(["experience", "work experience", "employment", "career history", "professional experience"]);
  const experience: Experience[] = [];
  if (expSection) {
    const expBlocks = expSection.split(/\n{2,}/);
    for (const block of expBlocks) {
      if (block.trim().length < 6) continue;
      const line = block.replace(/\n/g, " ");
      experience.push({
        id: uuidv4(),
        company: extract(/(?:at|@)\s*([A-Za-z0-9&\s]+?)(?=\s|,|$)/i, line) || extract(/company[:\-]?\s*(.*)/i, line),
        position: extract(/(?:position|role|title)[:\-]?\s*(.*)/i, line) || line.split(",")[0],
        location: extract(/location[:\-]?\s*(.*)/i, line),
        startDate: extract(/(\d{4}|[A-Za-z]{3,9}\s\d{4})\s*[-–to]+\s*(\d{4}|[A-Za-z]{3,9}\s\d{4}|present|current)/i, line).split(/[-–to]+/)[0]?.trim() || "",
        endDate: extract(/(\d{4}|[A-Za-z]{3,9}\s\d{4})\s*[-–to]+\s*(\d{4}|[A-Za-z]{3,9}\s\d{4}|present|current)/i, line).split(/[-–to]+/)[1]?.trim() || "",
        current: /present|current/i.test(line),
        description: block.trim(),
      });
    }
  }

  // 🤝 Volunteer Work
  const volSection = section(["volunteer", "volunteering", "community service"]);
  const volunteerWork: VolunteerWork[] = [];
  if (volSection) {
    const volBlocks = volSection.split(/\n{2,}/);
    for (const block of volBlocks) {
      if (block.trim().length < 6) continue;
      volunteerWork.push({
        id: uuidv4(),
        organization: extract(/organization[:\-]?\s*(.*)/i, block) || block.split(",")[0],
        role: extract(/role[:\-]?\s*(.*)/i, block) || "",
        startDate: extract(/(\d{4}).*[-–to]+.*(\d{4}|present|current)/i, block).split(/[-–to]+/)[0]?.trim() || "",
        endDate: extract(/(\d{4}).*[-–to]+.*(\d{4}|present|current)/i, block).split(/[-–to]+/)[1]?.trim() || "",
        current: /present|current/i.test(block),
        description: block.trim(),
      });
    }
  }

  // 💬 Skills
  const skillSection = section(["skills", "technical skills", "core competencies"]);
  const skills: Skill[] = [];
  if (skillSection) {
    const skillItems = skillSection.split(/[,;•\n|]/);
    for (const s of skillItems) {
      const trimmed = s.trim();
      if (trimmed.length > 1) {
        skills.push({ id: uuidv4(), name: trimmed, level: "intermediate" });
      }
    }
  }

  // 🚀 Projects
  const projSection = section(["projects", "personal projects", "key projects"]);
  const projects: Project[] = [];
  if (projSection) {
    const projBlocks = projSection.split(/\n{2,}/);
    for (const block of projBlocks) {
      if (block.trim().length < 6) continue;
      const firstLine = block.split("\n")[0];
      projects.push({
        id: uuidv4(),
        name: firstLine.trim(),
        description: block.trim(),
        technologies: extract(/technologies[:\-]?\s*(.*)/i, block),
        link: extract(/(https?:\/\/[^\s]+)/i, block),
        startDate: "",
        endDate: "",
      });
    }
  }

  // 🏆 Achievements
  const achSection = section(["achievements", "awards", "honors", "recognition"]);
  const achievements: Achievement[] = [];
  if (achSection) {
    const achItems = achSection.split(/[,;•\n|]/);
    for (const a of achItems) {
      const trimmed = a.trim();
      if (trimmed.length > 3) {
        achievements.push({ id: uuidv4(), title: trimmed, description: trimmed, date: "" });
      }
    }
  }

  // 🌍 Languages
  const langSection = section(["languages"]);
  const languages: Language[] = [];
  if (langSection) {
    const langItems = langSection.split(/[,;•\n|]/);
    for (const l of langItems) {
      const match = l.match(/([A-Za-z\s]+)\s*[-–:]?\s*(Fluent|Native|Advanced|Intermediate|Basic)?/i);
      if (match) {
        languages.push({
          id: uuidv4(),
          name: match[1].trim(),
          level: (match[2] as Language["level"]) || "Fluent",
        });
      }
    }
  }

  // 💬 Hobbies / Certifications / References
  const hobbies = section(["hobbies", "interests"])
    .split(/[,;•\n|]/)
    .map((h) => h.trim())
    .filter(Boolean);

  const certifications = section(["certifications", "licenses"])
    .split(/[,;•\n|]/)
    .map((c) => c.trim())
    .filter(Boolean);

  const refSection = section(["references", "referees"]);
  const references: Reference[] = [];
  if (refSection) {
    const refBlocks = refSection.split(/\n{2,}/);
    for (const block of refBlocks) {
      if (block.trim().length < 6) continue;
      references.push({
        id: uuidv4(),
        name: extract(/name[:\-]?\s*(.*)/i, block) || block.split(",")[0],
        position: extract(/position[:\-]?\s*(.*)/i, block),
        company: extract(/company[:\-]?\s*(.*)/i, block),
        email: extract(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, block),
        phone: extract(/(\+?\d[\d\s().-]{7,}\d)/, block),
      });
    }
  }

  // ✅ Build final CVData
  const cvData: CVData = {
    personalInfo,
    education,
    experience,
    volunteerWork,
    skills,
    projects,
    achievements,
    references,
    languages,
    hobbies,
    certifications,
  };

  return cvData;
}

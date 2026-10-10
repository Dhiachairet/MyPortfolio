// Portfolio copy, kept in sync with public/DhiaChairetResume.pdf

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "AMSYS Consulting",
    role: "Full-Stack Developer Intern",
    period: "Jul to Sep 2026",
    location: "Remote",
    stack: ["Java 21", "Spring Boot", "Angular", "PostgreSQL"],
    highlights: [
      "Owned 2 modules of a travel booking platform end to end, including a supplier integration service that unifies 4 flight and hotel APIs (Duffel, Sabre, Travelport, Hotelbeds) behind one REST API using a hexagonal design.",
      "Ran supplier searches in parallel on Java virtual threads with per-supplier timeouts, so one failing supplier never blocks the rest, and made bookings safe with idempotency keys, per-supplier rate limits, and search-only retries.",
      "Built the master catalogue service and its Angular admin app (15 screens): 13 entities, 81 REST endpoints, JWT roles, Flyway migrations, and an approval workflow for supplier data mappings.",
    ],
  },
  {
    company: "IResCoMath Lab",
    role: "Full-Stack Developer Intern",
    period: "Feb to Jun 2024",
    location: "Tunis, Tunisia",
    stack: ["MongoDB", "Express.js", "React", "Node.js"],
    highlights: [
      "Built a research management system for 30+ members, covering authentication, publications, and member management.",
      "Engineered a custom XML parser to automatically sync publication data from DBLP.org into MongoDB, eliminating manual data entry for the research team.",
    ],
  },
  {
    company: "Mammut Web Solutions",
    role: "Mobile & Web Developer Intern",
    period: "Jun to Jul 2023 · Jul to Aug 2025",
    location: "Remote",
    stack: ["Flutter", "React", "Node.js", "Express.js", "MongoDB"],
    highlights: [
      "Built full-stack features across two internships, spanning a Flutter quiz app for medical professionals with 10+ question categories and a MERN admin dashboard to manage it.",
      "Developed the Node.js/Express.js REST API behind the app (quiz logic, user sessions, result tracking, tested with Postman) and the dashboard that lets the team manage questions, categories, and users without editing the database by hand.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Java", "TypeScript", "JavaScript", "Python", "PHP", "Dart", "C++"] },
  { group: "Frontend", items: ["Next.js", "React", "Angular", "Flutter", "Thymeleaf", "Twig", "HTML/CSS"] },
  { group: "Backend", items: ["Node.js", "Express.js", "Spring Boot", "Symfony", ".NET"] },
  { group: "AI & APIs", items: ["OpenAI API", "Gemini API", "Vapi AI", "ElevenLabs", "Google OAuth"] },
  { group: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL"] },
  { group: "Testing & QA", items: ["JUnit", "Mockito", "Postman", "Thunder Client", "Swagger"] },
  {
    group: "DevOps & Tools",
    items: ["Git", "GitHub", "GitLab", "GitHub Actions", "Docker", "Linux", "Vercel", "Figma", "VS Code"],
  },
  { group: "Practices", items: ["REST APIs", "JWT Authentication", "RBAC", "Agile"] },
];

export const education = [
  {
    school: "TEK-UP University",
    degree: "Engineering Degree in Software Engineering (GLSI), final year",
    period: "Expected 2027",
    location: "Tunis, Tunisia",
  },
  {
    school: "Higher Institute of Computer Science and Multimedia (ISIMG)",
    degree: "License in Computer Science and Multimedia",
    period: "2022 to 2024",
    location: "Gabes, Tunisia",
  },
];

export const spokenLanguages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "C1" },
  { name: "French", level: "B2" },
];

export const involvement = [{ name: "AIESEC Member", period: "2022 to 2023" }];

export const marqueeStack = [
  "Java",
  "Spring Boot",
  "TypeScript",
  "Next.js",
  "React",
  "Angular",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Flutter",
  "Symfony",
  "OpenAI",
  "Gemini",
];

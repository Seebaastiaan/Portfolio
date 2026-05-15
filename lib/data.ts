export const personalInfo = {
  name: "Sebastian Jara",
  title: "Software Engineer",
  role: "Software Engineer",
  location: "Remote · Available worldwide",
  location2: "Mexico City, Mexico",
  status: "Open to new opportunities",
  headline: "Engineering. Designed.",
  subheadline:
    "Precise, performant product interfaces — built end-to-end with the same care a design team gives a poster.",
  bio: "I'm a software engineer who treats engineering as a design discipline. I build systems, not just screens — focused on frontend craft, design systems, and applied engineering.",
  email: "sebasjara1503@gmail.com",
};

export const socialLinks = {
  linkedin: "https://linkedin.com/in/sebastianjara24/",
  github: "https://github.com/Seebaastiaan",
  resume: "/Resume.pdf",
  email: "mailto:sebasjara1503@gmail.com",
};

export interface Project {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  role: string;
  videoUrl?: string;
  imageUrl?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    index: "01",
    title: "LearnQuest",
    tagline: "Gamified exam prep, end-to-end.",
    description:
      "A Duolingo-style learning platform for pre-university entrance exams. Eight subjects, an XP system, lives, daily streaks, and KaTeX-rendered question content — all behind a Supabase-backed progress engine.",
    year: "2025",
    role: "Solo product engineer",
    videoUrl: "/LearnQuestPromo.mp4",
    techStack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Framer Motion",
      "Zustand",
      "KaTeX",
    ],
    githubUrl: "https://github.com/Seebaastiaan/LearnQuest",
    liveUrl: "https://learn-quest-theta.vercel.app",
  },
  {
    id: "2",
    index: "02",
    title: "MindfulSpace",
    tagline: "AI-assisted journaling for emotional clarity.",
    description:
      "A digital psychological journal with a Gemini-powered companion. Daily entries, mood trend analytics, and an empathetic chat surface — wrapped in a clean PWA that runs offline-first.",
    year: "2024",
    role: "Design & engineering",
    videoUrl: "/MindfulSpacePromo.mp4",
    techStack: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Gemini API",
      "Material-UI",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/Seebaastiaan/MindfulSpace",
    liveUrl: "https://pwa-psycho.vercel.app",
  },
  {
    id: "3",
    index: "03",
    title: "Algoritmo Lanczos",
    tagline: "Eigenvalue approximation in pure C.",
    description:
      "A C implementation of the Lanczos algorithm for approximating eigenvalues and eigenvectors of large symmetric matrices. Generates random matrices, normalizes vectors, and builds the resulting tridiagonal matrix.",
    year: "2024",
    role: "Numerical methods coursework",
    imageUrl: "/Lanczos.png",
    techStack: ["C", "Linear Algebra", "Numerical Methods"],
    githubUrl: "https://github.com/Seebaastiaan/AlgoritmoLanczos",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "C", "SQL"],
  },
  {
    group: "Frameworks",
    items: ["React", "Next.js", "Node.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    group: "Platforms",
    items: ["Supabase", "Firebase", "PostgreSQL", "Vercel", "GraphQL"],
  },
  {
    group: "Craft",
    items: [
      "Design Systems",
      "System Design",
      "Web Performance",
      "Accessibility",
      "Figma",
    ],
  },
];

export const skillMarquee = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "GraphQL",
  "Tailwind CSS",
  "Framer Motion",
  "Figma",
  "System Design",
  "Accessibility",
  "Web Performance",
];

export const principles = [
  {
    index: "01",
    title: "Engineering as craft.",
    body: "Treat the codebase as a product surface. Readable diffs, tight types, intentional abstractions over clever ones.",
  },
  {
    index: "02",
    title: "Design that explains itself.",
    body: "Interfaces should feel inevitable. The right hierarchy, the right typography, the right amount of motion — nothing more.",
  },
  {
    index: "03",
    title: "Systems, not screens.",
    body: "Tokens, primitives, patterns. Build so the product can scale without entropy creeping in.",
  },
];

export const navigation = [
  { label: "Overview", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const globalNav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Resume", href: "/Resume.pdf" },
];

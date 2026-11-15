export const personalInfo = {
  name: "Sebastian Jara",
  role: "Software Engineer",
  location: "Mexico City, Mexico",
  availability: "Remote · Available worldwide",
  status: "Open to new opportunities",
  headline: "Engineering. Designed.",
  subheadline:
    "Precise, performant product interfaces — built end-to-end with the same care a design team gives a poster.",
  email: "sebasjara1503@gmail.com",
};

/** Drawing metadata — the portfolio is laid out as a single engineering sheet. */
export const sheet = {
  number: "SJ—001",
  coordinates: "19.4326° N  99.1332° W",
  scale: "1:1",
};

export const socialLinks = {
  linkedin: "https://linkedin.com/in/sebastianjara24/",
  github: "https://github.com/Seebaastiaan",
  resume: "/Resume.pdf",
  email: "mailto:sebasjara1503@gmail.com",
};

/** Procedural 3D models, one per figure. */
export type ModelId =
  | "pitch"
  | "rail"
  | "crate"
  | "ring"
  | "steps"
  | "journal"
  | "matrix";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year?: string;
  role: string;
  /** Prize or placement, when the project won one. */
  award?: string;
  model: ModelId;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  /** Label for the live link; defaults to "Open live". */
  liveLabel?: string;
}

export const projects: Project[] = [
  {
    id: "stuffplus",
    title: "Stuff+ 2240",
    tagline: "Pitch analytics for the Diablos Rojos.",
    description:
      "Winning entry at the ISAC Sports Analytics Hackathon. I helped filter and process three seasons of LMB pitch-by-pitch Trackman data so the model could be trained and validated, then built the React interface and a three.js 3D lab for exploring how each pitch behaves.",
    year: "2026",
    role: "Data processing · Frontend & 3D",
    award: "1st place — ISAC Sports Analytics Hackathon",
    model: "pitch",
    techStack: ["React", "three.js", "Trackman data", "Vercel"],
    githubUrl: "https://github.com/JoahanMorales/stuffplus2240",
    liveUrl: "https://stuffplus2240.vercel.app/",
    liveLabel: "Open demo",
  },
  {
    id: "learnquest",
    title: "LearnQuest",
    tagline: "Gamified exam prep, end-to-end.",
    description:
      "A Duolingo-style learning platform for the UNAM entrance exam. Around 1,000 exercises, an SM-2 spaced-repetition engine, XP, lives and daily streaks — behind Google OAuth and Row Level Security on a Supabase-backed progress engine.",
    year: "2025",
    role: "Solo product engineer",
    model: "steps",
    techStack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Zustand",
      "KaTeX",
    ],
    githubUrl: "https://github.com/Seebaastiaan/LearnQuest",
    liveUrl: "https://learn-quest-theta.vercel.app",
  },
  {
    id: "mindfulspace",
    title: "MindfulSpace",
    tagline: "AI-assisted journaling for emotional clarity.",
    description:
      "A digital psychological journal with a Gemini-powered companion. Daily entries, mood trend analytics, and an empathetic chat surface — wrapped in a clean PWA that runs offline-first.",
    year: "2024",
    role: "Design & engineering",
    model: "journal",
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
    id: "railsense",
    title: "RailSense",
    tagline: "Rail networks, read by machine.",
    description:
      "Built in 24 hours at the Mobility & AI Hackathon: a system that uses computer vision to digitize railway maps and NLP to process social media and internal reports, comparing the rail systems of Vienna and Mexico City. I built the frontend.",
    year: "2025",
    role: "Frontend developer",
    award: "Open Source Winner — Mobility & AI Hackathon",
    model: "rail",
    techStack: ["Frontend", "Computer Vision", "NLP"],
    githubUrl: "https://github.com/AxolutionsDevs/MobilityAI-Hackaton",
  },
  {
    id: "uxersii",
    title: "UxerSii",
    tagline: "Less food waste, by donation and detection.",
    description:
      "An app that reduces food waste through donations and AI detection of the condition of fruit and vegetables from a photo. I designed and built the whole responsive React frontend, wired it to the backend and the model, and ran recorded usability tests that cut interaction times by 30%.",
    year: "2024",
    role: "Frontend developer",
    award: "3rd place nationwide — Best High School Prototype",
    model: "crate",
    techStack: ["React", "AI image detection", "Usability testing"],
  },
  {
    id: "luchador",
    title: "Steal a Luchador!",
    tagline: "A published Roblox experience.",
    description:
      "A Roblox game I developed and published, implementing most of its core functionality independently: user interfaces and game logic, client–server communication through RemoteEvents, and player progress saved with DataStoreService.",
    role: "Game developer",
    model: "ring",
    techStack: ["Roblox Studio", "Luau", "RemoteEvents", "DataStoreService"],
    liveUrl: "https://www.roblox.com/games/119704902099957/Steal-a-Luchador",
    liveLabel: "Play on Roblox",
  },
  {
    id: "lanczos",
    title: "Algoritmo Lanczos",
    tagline: "Eigenvalue approximation in pure C.",
    description:
      "A C implementation of the Lanczos algorithm for approximating eigenvalues and eigenvectors of large symmetric matrices. Generates random matrices, normalizes vectors, and builds the resulting tridiagonal matrix.",
    year: "2024",
    role: "Numerical methods coursework",
    model: "matrix",
    techStack: ["C", "Linear Algebra", "Numerical Methods"],
    githubUrl: "https://github.com/Seebaastiaan/AlgoritmoLanczos",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "SQL", "JavaScript", "TypeScript", "Java", "C", "Luau"],
  },
  {
    group: "Development",
    items: [
      "React",
      "Next.js",
      "Django",
      "Tailwind CSS",
      "REST APIs",
      "Roblox Studio",
    ],
  },
  {
    group: "Data & AI",
    items: [
      "PostgreSQL",
      "Supabase",
      "Firebase",
      "pandas",
      "scikit-learn",
      "LightGBM",
      "Computer Vision",
      "NLP",
      "LLM APIs",
      "n8n",
    ],
  },
  {
    group: "Tools & cloud",
    items: [
      "Git",
      "GitHub",
      "pytest",
      "Vitest",
      "Docker",
      "Linux",
      "Google Cloud",
      "Vercel",
      "Cloudflare Pages",
    ],
  },
];

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "Materials", href: "#materials" },
  { label: "Contact", href: "#contact" },
];

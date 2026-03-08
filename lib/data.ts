export const personalInfo = {
  name: "Sebastian Jara",
  title: "Software Engineer",
  bio: "I build interfaces that feel inevitable. Currently crafting experiences at the intersection of design and engineering.",
  email: "sebasjara1503@gmail.com",
  greeting: "Hey there 👋",
  tagline: "I design systems, not just screens",
};

export const socialLinks = {
  linkedin: "https://linkedin.com/in/sebastianjara24/",
  github: "https://github.com/Seebaastiaan",
  resume: "/Resume.pdf", // Place your resume PDF in the /public folder
};

export interface Project {
  id: string;
  title: string;
  description: string;
  imagePlaceholder: string; // Hex color or gradient
  videoUrl?: string; // Optional video (place file in /public folder)
  imageUrl?: string; // Optional image (place file in /public folder)
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  size: "small" | "medium" | "large" | "wide";
}

export const projects: Project[] = [
  {
    id: "1",
    title: "LearnQuest",
    description:
      "Gamified learning platform for UNAM entrance exam prep. Study 8 subjects with an XP system, lives, and daily streaks — like Duolingo, but for pre-university exams.",
    imagePlaceholder: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
    size: "large",
  },
  {
    id: "2",
    title: "Algoritmo Lanczos",
    description:
      "C implementation of the Lanczos algorithm to approximate eigenvalues and eigenvectors of large symmetric matrices. Generates random matrices, normalizes vectors, and builds the resulting tridiagonal matrix.",
    imagePlaceholder: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
    imageUrl: "/Lanczos.png",
    techStack: ["C", "Linear Algebra", "Numerical Methods"],
    githubUrl: "https://github.com/Seebaastiaan/AlgoritmoLanczos",
    size: "medium",
  },
  {
    id: "3",
    title: "MindfulSpace",
    description:
      "AI-powered emotional support companion and digital psychological journal. Write daily entries, track your mood trends, and chat with an empathetic Gemini-powered assistant.",
    imagePlaceholder: "linear-gradient(135deg, #a8edea 0%, #6a85f0 100%)",
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
    size: "wide",
  },
];

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "GraphQL",
  "Tailwind CSS",
  "Framer Motion",
  "Figma",
  "System Design",
  "Web Performance",
  "Accessibility (a11y)",
];

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
];

import ActionCard from "@/components/ActionCard";
import Header from "@/components/Header";
import IntroCard from "@/components/IntroCard";
import ProjectCard from "@/components/ProjectCard";
import SkillsCard from "@/components/SkillsCard";
import { projects } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Work Section */}
        <section
          id="work"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]"
        >
          <IntroCard />
          <ActionCard />
          <SkillsCard />
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)] mt-4 md:mt-6"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-neutral-500 text-sm font-mono">
            Built with Next.js, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </footer>
    </div>
  );
}

import { projects } from "@/lib/data";
import FigureMedia from "./FigureMedia";
import Measure from "./Measure";
import { Split, Zone } from "./Zone";

export default function Figures() {
  return (
    <Zone id="work" letter="B" label="Figures">
      <div className="anno flex flex-wrap items-center justify-between gap-x-8 gap-y-1 px-5 py-4 sm:px-8 lg:px-12">
        <h2 className="font-medium">Figures 1—{projects.length}</h2>
        <span className="text-ink-soft">Selected work, 2024—2026</span>
      </div>

      {projects.map((project, i) => (
        <Split
          key={project.id}
          className="border-t border-line"
          side={
            <article
              aria-labelledby={`fig-${project.id}`}
              className="gap-x-12 md:max-lg:grid md:max-lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)]"
            >
              <div>
                <p className="anno font-medium">Fig. {i + 1}</p>
                <h3 id={`fig-${project.id}`} className="title mt-4">
                  {project.title}
                </h3>
                <p className="mt-2 text-ink-soft">{project.tagline}</p>
                {project.award && (
                  <p className="anno mt-4 flex items-start gap-2.5 font-medium">
                    <span
                      aria-hidden
                      className="mt-[5px] h-1.5 w-1.5 flex-none bg-accent"
                    />
                    {project.award}
                  </p>
                )}
                <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.6]">
                  {project.description}
                </p>
              </div>

              <div>
                <dl className="anno mt-8 border-t border-line md:max-lg:mt-0">
                  {project.year && (
                    <div className="flex justify-between gap-6 border-b border-line py-2.5">
                      <dt className="text-ink-soft">Year</dt>
                      <dd>{project.year}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-6 border-b border-line py-2.5">
                    <dt className="text-ink-soft">Role</dt>
                    <dd className="text-right">{project.role}</dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-line py-2.5">
                    <dt className="text-ink-soft">Materials</dt>
                    <dd className="text-right">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="block">
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <div className="anno mt-4 flex flex-wrap gap-x-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link py-2"
                    >
                      {project.liveLabel ?? "Open live"} ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link py-2"
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          }
        >
          <Measure mode="wh">
            <FigureMedia project={project} />
          </Measure>
        </Split>
      ))}
    </Zone>
  );
}

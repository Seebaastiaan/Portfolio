"use client";

import { Project } from "@/lib/data";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const primaryHref = project.liveUrl ?? project.githubUrl;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, delay: 0.05 }}
      className="group border-t border-cocoa-ink"
    >
      {/* Header row — index sits as a small eyebrow above title */}
      <div className="pt-10 pb-6">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink/70">
            ({project.index}) — Project
          </span>
          <span className="font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink/70">
            {project.year}
          </span>
        </div>

        {primaryHref ? (
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h3 className="font-neuehaasdisplay text-[clamp(48px,10vw,144px)] leading-[0.88] tracking-[-0.03em] text-cocoa-ink uppercase break-words">
              {project.title}
            </h3>
          </a>
        ) : (
          <h3 className="font-neuehaasdisplay text-[clamp(48px,10vw,144px)] leading-[0.88] tracking-[-0.03em] text-cocoa-ink uppercase break-words">
            {project.title}
          </h3>
        )}
      </div>

      {/* Meta sub-row */}
      <div className="grid grid-cols-12 gap-6 border-t border-cocoa-ink/30 py-5">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow opacity-50 mb-1">Tagline</p>
          <p className="font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink">
            {project.tagline}
          </p>
        </div>

        <div className="col-span-6 md:col-span-3">
          <p className="eyebrow opacity-50 mb-1">Discipline</p>
          <p className="font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink">
            {project.role}
          </p>
        </div>

        <div className="col-span-3 md:col-span-2">
          <p className="eyebrow opacity-50 mb-1">Year</p>
          <p className="font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink">
            {project.year}
          </p>
        </div>

        <div className="col-span-3 md:col-span-1 text-right">
          <p className="eyebrow opacity-50 mb-1">View</p>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-dashed font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink"
            >
              Live ↗
            </a>
          ) : project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-dashed font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink"
            >
              Code ↗
            </a>
          ) : null}
        </div>
      </div>

      {/* Media strip */}
      <div className="mt-8">
        <div className="relative w-full overflow-hidden bg-pure-white aspect-[21/9]">
          {project.videoUrl ? (
            <video
              ref={videoRef}
              src={project.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
            />
          ) : project.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.imageUrl}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
            />
          ) : null}

          <div
            aria-hidden
            className="absolute left-4 top-4 inline-flex items-center gap-2 font-sfuidisplay text-[11px] uppercase tracking-[0.08em] text-pure-white mix-blend-difference"
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 bg-alert-crimson"
            />
            {project.index} / {project.year}
          </div>
        </div>
      </div>

      {/* Description + stack */}
      <div className="grid grid-cols-12 gap-6 pt-10 pb-16">
        <div className="col-span-12 md:col-span-6">
          <p className="font-sfuidisplay text-[15px] leading-[1.5] tracking-[-0.01em] text-cocoa-ink/85">
            {project.description}
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <p className="eyebrow opacity-50 mb-3">Stack</p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {project.techStack.map((tech, i) => (
              <li
                key={tech}
                className="font-sfuidisplay text-[11px] uppercase tracking-[0.06em] text-cocoa-ink"
              >
                {tech}
                {i < project.techStack.length - 1 && (
                  <span aria-hidden className="ml-4 text-cocoa-ink/30">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-dashed font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink"
              >
                Visit live ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-dashed font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink"
              >
                View source ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <span aria-hidden className="sr-only">
        {index}
      </span>
    </motion.article>
  );
}

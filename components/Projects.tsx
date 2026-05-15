"use client";

import { projects } from "@/lib/data";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import SectionLabel from "./SectionLabel";

export default function Projects() {
  return (
    <section
      id="work"
      className="relative scroll-mt-24 bg-canvas-parchment px-8 py-[120px] lg:px-12 lg:py-[200px]"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-6 border-t border-cocoa-ink pt-8">
          <div className="col-span-12 md:col-span-4">
            <SectionLabel index="02" label="Index of Work" />
          </div>
          <div className="col-span-12 md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="display-mega"
            >
              WORK
              <br />
              <span className="text-cocoa-ink/40">/ {projects.length}</span>
            </motion.h2>
            <p className="mt-10 max-w-xl font-sfuidisplay text-[15px] leading-[1.4] tracking-[-0.01em] text-cocoa-ink uppercase">
              Selected projects, 2024&ndash;2026 &mdash; design, engineering,
              and the unglamorous bits in between.
            </p>
          </div>
        </div>

        {/* Project entries */}
        <div className="mt-[120px] flex flex-col">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          <div className="border-t border-cocoa-ink" aria-hidden />
        </div>
      </div>
    </section>
  );
}

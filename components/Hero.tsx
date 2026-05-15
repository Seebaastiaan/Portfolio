"use client";

import { personalInfo, socialLinks } from "@/lib/data";
import { motion } from "framer-motion";

export default function Hero() {
  const [first, last] = personalInfo.name.split(" ");

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-canvas-parchment pt-[120px] lg:pt-[140px]"
    >
      <div className="mx-auto max-w-[1440px] px-8 lg:px-12">
        {/* Top meta row */}
        <div className="grid grid-cols-12 gap-6 pb-12">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow opacity-70">
              <span className="text-cocoa-ink">(01)</span>
              <span className="mx-3 inline-block align-middle h-px w-6 bg-cocoa-ink/40" />
              Portfolio · 2026
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:text-right">
            <p className="eyebrow opacity-70 inline-flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 bg-alert-crimson"
              />
              {personalInfo.status}
            </p>
          </div>
        </div>

        {/* Monumental headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="display-mega select-none"
        >
          {first.toUpperCase()}
          <br />
          {last.toUpperCase()}
        </motion.h1>

        {/* Sub-grid */}
        <div className="mt-20 grid grid-cols-12 gap-6 border-t border-cocoa-ink pt-8 pb-[160px] lg:pb-[200px]">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow opacity-60">Role</p>
            <p className="mt-2 font-sfuidisplay text-[15px] leading-[1.4] tracking-[-0.01em] text-cocoa-ink">
              {personalInfo.role}
            </p>
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow opacity-60">Based</p>
            <p className="mt-2 font-sfuidisplay text-[15px] leading-[1.4] tracking-[-0.01em] text-cocoa-ink">
              {personalInfo.location}
            </p>
            <p className="mt-2 font-sfuidisplay text-[15px] leading-[1.4] tracking-[-0.01em] text-cocoa-ink">
              {personalInfo.location2}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6">
            <p className="eyebrow opacity-60">Manifesto</p>
            <p className="mt-2 font-sfuidisplay text-[15px] leading-[1.4] tracking-[-0.01em] text-cocoa-ink uppercase">
              {personalInfo.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3">
              <a
                href="#work"
                className="link-dashed font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink"
              >
                View selected work →
              </a>
              <a
                href={socialLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="link-dashed font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink"
              >
                Read résumé ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

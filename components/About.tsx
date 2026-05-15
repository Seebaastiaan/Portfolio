"use client";

import { personalInfo, principles } from "@/lib/data";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 bg-canvas-parchment px-8 py-[120px] lg:px-12 lg:py-[200px]"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-12 gap-6 border-t border-cocoa-ink pt-8">
          <div className="col-span-12 md:col-span-4">
            <SectionLabel index="03" label="About" />
          </div>
          <div className="col-span-12 md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="display-lg"
            >
              THREE
              <br />
              PRINCIPLES.
            </motion.h2>
            <p className="mt-10 max-w-xl font-sfuidisplay text-[15px] leading-[1.5] tracking-[-0.01em] text-cocoa-ink/85">
              {personalInfo.bio}
            </p>
          </div>
        </div>

        <div className="mt-[120px] flex flex-col">
          {principles.map((p, i) => (
            <motion.div
              key={p.index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="grid grid-cols-12 gap-6 border-t border-cocoa-ink py-12"
            >
              <div className="col-span-12 md:col-span-2">
                <p className="eyebrow opacity-70">({p.index})</p>
              </div>
              <div className="col-span-12 md:col-span-6">
                <h3 className="font-neuehaasdisplay text-[clamp(28px,3.5vw,44px)] leading-[1] tracking-[-0.025em] text-cocoa-ink uppercase">
                  {p.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-4">
                <p className="font-sfuidisplay text-[15px] leading-[1.5] tracking-[-0.01em] text-cocoa-ink/85">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-cocoa-ink" aria-hidden />
        </div>
      </div>
    </section>
  );
}

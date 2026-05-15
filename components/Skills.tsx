"use client";

import { skills } from "@/lib/data";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 bg-canvas-parchment px-8 py-[120px] lg:px-12 lg:py-[200px]"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-12 gap-6 border-t border-cocoa-ink pt-8">
          <div className="col-span-12 md:col-span-4">
            <SectionLabel index="04" label="Stack" />
          </div>
          <div className="col-span-12 md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="display-lg"
            >
              TOOLS &amp;
              <br />
              CRAFT.
            </motion.h2>
            <p className="mt-10 max-w-xl font-sfuidisplay text-[15px] leading-[1.4] tracking-[-0.01em] text-cocoa-ink uppercase">
              The toolkit I reach for daily — selected for speed of iteration,
              type safety, and long-term maintainability.
            </p>
          </div>
        </div>

        <div className="mt-[120px] grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {skills.map((group, i) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="border-t border-cocoa-ink pt-6"
            >
              <h3 className="eyebrow opacity-70">
                ({String(i + 1).padStart(2, "0")}) {group.group}
              </h3>
              <ul className="mt-8 flex flex-col gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-neuehaasdisplay text-[22px] leading-[1] tracking-[-0.02em] text-cocoa-ink uppercase"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

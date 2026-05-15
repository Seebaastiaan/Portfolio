"use client";

import { personalInfo, socialLinks } from "@/lib/data";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 bg-canvas-parchment px-8 py-[120px] lg:px-12 lg:py-[200px]"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-12 gap-6 border-t border-cocoa-ink pt-8">
          <div className="col-span-12 md:col-span-4">
            <SectionLabel index="05" label="Contact" />
          </div>
          <div className="col-span-12 md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="display-mega"
            >
              LET&rsquo;S
              <br />
              BUILD.
            </motion.h2>
            <p className="mt-12 max-w-xl font-sfuidisplay text-[15px] leading-[1.5] tracking-[-0.01em] text-cocoa-ink uppercase">
              I&apos;m {personalInfo.status.toLowerCase()}. Drop me a line — I
              reply within a day.
            </p>
          </div>
        </div>

        <div className="mt-[120px] grid grid-cols-12 gap-6 border-t border-cocoa-ink pt-12">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow opacity-70">Email</p>
            <a
              href={socialLinks.email}
              className="link-dashed mt-3 inline-block font-neuehaasdisplay text-[clamp(22px,2.6vw,27px)] leading-[1] tracking-[-0.02em] text-cocoa-ink"
            >
              {personalInfo.email}
            </a>
          </div>

          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow opacity-70">Elsewhere</p>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-dashed font-neuehaasdisplay text-[22px] leading-[1.1] tracking-[-0.02em] text-cocoa-ink uppercase"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-dashed font-neuehaasdisplay text-[22px] leading-[1.1] tracking-[-0.02em] text-cocoa-ink uppercase"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-dashed font-neuehaasdisplay text-[22px] leading-[1.1] tracking-[-0.02em] text-cocoa-ink uppercase"
                >
                  Résumé ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow opacity-70">Location</p>
            <p className="mt-3 font-neuehaasdisplay text-[22px] leading-[1.1] tracking-[-0.02em] text-cocoa-ink uppercase">
              {personalInfo.location}
            </p>
            <p className="mt-3 font-neuehaasdisplay text-[22px] leading-[1.1] tracking-[-0.02em] text-cocoa-ink uppercase">
              {personalInfo.location2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

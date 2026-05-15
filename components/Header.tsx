"use client";

import { globalNav, personalInfo } from "@/lib/data";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-canvas-parchment/90 backdrop-blur-md"
          : "bg-canvas-parchment"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-8 lg:px-12">
        <a
          href="#top"
          aria-label={`${personalInfo.name} — home`}
          className="text-cocoa-ink"
        >
          <span className="font-neuehaasdisplay text-[20px] leading-none tracking-[-0.02em]">
            {personalInfo.name.split(" ")[0].toUpperCase()}
            <span className="opacity-50">
              {" "}
              / {personalInfo.name.split(" ")[1].toUpperCase()}
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-12">
            {globalNav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("/") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("/")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="link-dashed font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <span className="font-sfuidisplay text-[12px] uppercase tracking-[0.04em] text-cocoa-ink/70">
            {personalInfo.location.split("·")[0].trim()}
          </span>
        </div>
      </div>
    </header>
  );
}

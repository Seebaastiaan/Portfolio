"use client";

import { socialLinks } from "@/lib/data";
import { motion } from "framer-motion";
import { Download, Github, Linkedin } from "lucide-react";

export default function ActionCard() {
  const buttons = [
    {
      label: "Connect on LinkedIn",
      icon: Linkedin,
      href: socialLinks.linkedin,
      color: "linkedin",
      delay: 0.2,
    },
    {
      label: "Explore my Code",
      icon: Github,
      href: socialLinks.github,
      color: "github",
      delay: 0.3,
    },
    {
      label: "Download Resume",
      icon: Download,
      href: socialLinks.resume,
      color: "resume",
      delay: 0.4,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-200/50 
                 hover:shadow-xl hover:border-neutral-300/80 transition-all duration-500
                 col-span-full md:col-span-1 row-span-1"
    >
      <h2 className="text-2xl font-mono font-bold mb-6 text-neutral-900">
        Let's Connect
      </h2>

      <div className="flex flex-col gap-3">
        {buttons.map((button) => (
          <motion.a
            key={button.label}
            href={button.href}
            target={button.color !== "resume" ? "_blank" : undefined}
            rel={button.color !== "resume" ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: button.delay }}
            whileHover={{ scale: 1.03, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`
              group relative flex items-center justify-between px-5 py-4 rounded-2xl
              font-medium transition-all duration-300 overflow-hidden
              ${
                button.color === "linkedin"
                  ? "bg-neutral-100 hover:bg-[#0077B5] text-neutral-900 hover:text-white"
                  : button.color === "github"
                    ? "bg-neutral-100 hover:bg-neutral-900 text-neutral-900 hover:text-white"
                    : "bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
              }
            `}
          >
            <span className="relative z-10 flex items-center gap-3">
              <button.icon className="w-5 h-5" />
              <span className="text-sm">{button.label}</span>
            </span>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

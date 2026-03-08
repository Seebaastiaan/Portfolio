"use client";

import { skills } from "@/lib/data";
import { motion } from "framer-motion";

export default function SkillsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-200/50 
                 hover:shadow-xl hover:border-neutral-300/80 transition-all duration-500
                 col-span-full md:col-span-1 row-span-1"
    >
      <h2 className="text-2xl font-mono font-bold mb-6 text-neutral-900">
        Tech Stack
      </h2>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="px-4 py-2 bg-neutral-100 text-neutral-800 rounded-xl 
                     text-sm font-medium hover:bg-[#7C3AED] hover:text-white 
                     transition-colors duration-300 cursor-default
                     border border-neutral-200/50 hover:border-[#7C3AED]"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

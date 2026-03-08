"use client";

import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";

export default function IntroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-200/50 
                 hover:shadow-xl hover:border-neutral-300/80 transition-all duration-500 
                 col-span-full md:col-span-2 row-span-2"
    >
      <div className="flex flex-col justify-between h-full">
        <section>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#7C3AED] font-mono text-sm mb-4 tracking-wide font-bold"
          >
            {personalInfo.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-4 text-neutral-900 font-mono tracking-tight"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl text-neutral-600 font-mono mb-6"
          >
            {personalInfo.tagline}
          </motion.p>
        </section>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-neutral-500 text-base md:text-lg leading-relaxed max-w-xl"
        >
          {personalInfo.bio}
        </motion.p>
      </div>
    </motion.div>
  );
}

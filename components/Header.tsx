"use client";

import { navigation } from "@/lib/data";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <nav
        className="bg-white/80 backdrop-blur-xl rounded-full px-6 py-3 
                    shadow-lg border border-neutral-200/50"
      >
        <ul className="flex items-center gap-8">
          {navigation.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <a
                href={item.href}
                className="text-neutral-700 hover:text-[#7C3AED] font-medium text-sm 
                         transition-colors duration-300 relative group"
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7C3AED] 
                               group-hover:w-full transition-all duration-300"
                />
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}

"use client";

import { Project } from "@/lib/data";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const sizeClasses = {
    small: "col-span-full md:col-span-1 row-span-1",
    medium: "col-span-full md:col-span-1 row-span-2",
    large: "col-span-full md:col-span-2 row-span-2",
    wide: "col-span-full md:col-span-2 row-span-1",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      className={`
        ${sizeClasses[project.size]}
        bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-200/50
        hover:shadow-xl hover:border-neutral-300/80 transition-all duration-500
        cursor-pointer group
      `}
    >
      {/* Image/Video Placeholder */}
      <motion.div
        className={`w-full relative overflow-hidden ${project.videoUrl || project.imageUrl ? "aspect-video" : "h-48"}`}
        style={{
          background:
            project.videoUrl || project.imageUrl
              ? undefined
              : project.imagePlaceholder,
        }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.6 }}
      >
        {project.videoUrl ? (
          <video
            ref={videoRef}
            src={project.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
      </motion.div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold font-mono text-neutral-900">
            {project.title}
          </h3>

          {/* Links - Visible on hover */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="flex gap-2"
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-900 
                         hover:text-white transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-100 hover:bg-[#7C3AED] 
                         hover:text-white transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        </div>

        <p className="text-neutral-600 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack - Revealed on hover */}
        <motion.div
          initial={{ opacity: 0, y: 10, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
            height: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2 overflow-hidden"
        >
          {project.techStack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ delay: i * 0.05 }}
              className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-lg 
                       text-xs font-medium font-mono"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

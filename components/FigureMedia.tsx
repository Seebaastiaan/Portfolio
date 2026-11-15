"use client";

import type { Project } from "@/lib/data";
import { useEffect, useRef } from "react";

/** The drawing inside a figure frame. Videos only run while on screen. */
export default function FigureMedia({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true;
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="frame">
      <i className="mark tl" />
      <i className="mark tr" />
      <i className="mark bl" />
      <i className="mark br" />
      {project.videoUrl ? (
        <video
          ref={videoRef}
          src={project.videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${project.title} — product walkthrough`}
          style={{ aspectRatio: project.mediaRatio }}
          className="block w-full object-cover"
        />
      ) : project.imageUrl ? (
        <div className="p-6 sm:p-10">
          {/* A line diagram: multiply it so its white becomes the sheet's paper. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={`${project.title} — diagram of the restarted Lanczos loop`}
            loading="lazy"
            style={{
              aspectRatio: project.mediaRatio,
              clipPath: project.imageTrimTop
                ? `inset(${project.imageTrimTop} 0 0 0)`
                : undefined,
            }}
            className="block w-full mix-blend-multiply"
          />
        </div>
      ) : null}
    </div>
  );
}

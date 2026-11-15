"use client";

import { useEffect, useRef, useState } from "react";

interface MeasureProps {
  children: React.ReactNode;
  /** Shrink to the content's own width (for text) instead of filling the column. */
  fit?: boolean;
  /** Report width only, or width × height. */
  mode?: "w" | "wh";
  className?: string;
}

/**
 * Wraps an element and draws a dimension line under it showing its real,
 * live size on screen. The drawing measures itself.
 */
export default function Measure({
  children,
  fit = false,
  mode = "w",
  className = "",
}: MeasureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const label = size
    ? mode === "wh"
      ? `${size.w} × ${size.h} px`
      : `${size.w} px`
    : "— px";

  return (
    <div className={`${fit ? "w-fit max-w-full" : ""} ${className}`}>
      <div ref={ref}>{children}</div>
      <div aria-hidden className="dim anno mt-4">
        <i />
        <span>{label}</span>
        <i />
      </div>
    </div>
  );
}

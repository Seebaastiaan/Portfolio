"use client";

import { useEffect, useRef } from "react";

const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, "0");

/**
 * CAD-style pointer: hairline crosshair across the viewport and a live
 * X/Y readout of the pointer's position on the sheet. Fine pointers only.
 */
export default function Cursor() {
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let clientX = 0;
    let clientY = 0;
    let frame = 0;

    const paint = () => {
      frame = 0;
      if (xRef.current) xRef.current.textContent = pad(clientX + window.scrollX);
      if (yRef.current) yRef.current.textContent = pad(clientY + window.scrollY);
      if (hRef.current)
        hRef.current.style.transform = `translate3d(0, ${clientY}px, 0)`;
      if (vRef.current)
        vRef.current.style.transform = `translate3d(${clientX}px, 0, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const setOn = (on: boolean) => {
      hRef.current?.setAttribute("data-on", String(on));
      vRef.current?.setAttribute("data-on", String(on));
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      clientX = e.clientX;
      clientY = e.clientY;
      setOn(true);
      schedule();
    };
    const onLeave = () => setOn(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <span aria-hidden className="anno whitespace-nowrap text-ink-soft">
        X <span ref={xRef}>0000</span>
        <span className="mx-2 opacity-50">/</span>Y{" "}
        <span ref={yRef}>0000</span>
      </span>
      <div ref={hRef} aria-hidden className="crosshair h" />
      <div ref={vRef} aria-hidden className="crosshair v" />
    </>
  );
}

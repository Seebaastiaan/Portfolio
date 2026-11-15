"use client";

import type { ModelId } from "@/lib/data";
import type { Viewport } from "@/lib/viewport3d";
import { useEffect, useRef, useState } from "react";

const AUTO_SPIN = 0.22; // rad / s
const RESUME_AFTER = 2500; // ms of rest after a drag before spinning again
/** How far outside the screen a figure gets its WebGL context, and keeps it. */
const NEAR = "700px 0px";

const deg = (rad: number) =>
  String(Math.round((((rad * 180) / Math.PI) % 360) + 360) % 360).padStart(3, "0");

/**
 * An orthographic 3D viewport: drag to orbit the model, like a CAD view.
 *
 * three.js is fetched the first time a figure comes near the screen. Each
 * figure only holds a WebGL context while it is near, and only draws while it
 * is actually visible, so a page of figures costs about as much as one.
 */
export default function ModelViewport({
  model,
  label,
}: {
  model: ModelId;
  label: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const yawRef = useRef<HTMLSpanElement>(null);
  const elevationRef = useRef<HTMLSpanElement>(null);
  const axesRef = useRef<SVGGElement>(null);
  const [status, setStatus] = useState<"idle" | "ready" | "failed">("idle");

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let viewport: Viewport | null = null;
    let canvas: HTMLCanvasElement | null = null;
    let generation = 0; // bumps on every mount/unmount, to drop stale imports
    let near = false;
    let visible = false;
    let dragging = false;
    let restUntil = 0;
    let frame = 0;
    let last = 0;
    let clock = 0;
    // Remembered across unmounts, so a model comes back as it was left.
    let pose: { yaw: number; elevation: number } | null = null;

    const readout = () => {
      if (!viewport) return;
      const { yaw, elevation } = viewport;
      if (yawRef.current) yawRef.current.textContent = deg(yaw);
      if (elevationRef.current)
        elevationRef.current.textContent = deg(elevation).slice(1);
      // Axis triad: the model's X/Y/Z as they currently project on screen.
      const [c, s, se, ce] = [
        Math.cos(yaw),
        Math.sin(yaw),
        Math.sin(elevation),
        Math.cos(elevation),
      ];
      const ends = [
        [c, -s * se],
        [0, -ce],
        [s, c * se],
      ];
      axesRef.current?.querySelectorAll("line").forEach((line, i) => {
        line.setAttribute("x2", (ends[i][0] * 15).toFixed(2));
        line.setAttribute("y2", (ends[i][1] * 15).toFixed(2));
      });
      axesRef.current?.querySelectorAll("text").forEach((text, i) => {
        text.setAttribute("x", (ends[i][0] * 22).toFixed(2));
        text.setAttribute("y", (ends[i][1] * 22 + 3).toFixed(2));
      });
    };

    const draw = (animate: boolean) => {
      viewport?.render(animate ? clock : undefined);
      readout();
    };

    const tick = (now: number) => {
      frame = 0;
      if (!viewport || !visible) return;
      const dt = Math.min(Math.max((now - last) / 1000, 0), 0.05);
      last = now;
      clock += dt;
      if (!dragging && now > restUntil) viewport.yaw += dt * AUTO_SPIN;
      draw(true);
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (still || frame || !viewport || !visible) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    // Orbit. Touch only spins, so a vertical swipe still scrolls the page.
    let lastX = 0;
    let lastY = 0;
    const onDown = (e: PointerEvent) => {
      if (!canvas) return;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging || !viewport) return;
      viewport.yaw += (e.clientX - lastX) * 0.008;
      if (e.pointerType !== "touch") {
        viewport.elevation = Math.min(
          1.35,
          Math.max(0.06, viewport.elevation + (e.clientY - lastY) * 0.006),
        );
      }
      lastX = e.clientX;
      lastY = e.clientY;
      if (still) draw(false);
    };
    const onUp = () => {
      dragging = false;
      restUntil = performance.now() + RESUME_AFTER;
      if (canvas) canvas.style.cursor = "grab";
    };
    const onKey = (e: KeyboardEvent) => {
      if (!viewport) return;
      const step = { ArrowLeft: -0.15, ArrowRight: 0.15 }[e.key];
      if (!step) return;
      e.preventDefault();
      viewport.yaw += step;
      restUntil = performance.now() + RESUME_AFTER;
      if (still) draw(false);
    };

    const unmount = () => {
      generation++;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      dragging = false;
      if (viewport) {
        pose = { yaw: viewport.yaw, elevation: viewport.elevation };
        viewport.dispose();
        viewport = null;
      }
      // The context dies with its canvas, so the canvas goes too.
      canvas?.remove();
      canvas = null;
    };

    const mount = async () => {
      const mine = ++generation;
      try {
        const { createViewport } = await import("@/lib/viewport3d");
        if (mine !== generation || !near) return;

        canvas = document.createElement("canvas");
        canvas.className =
          "absolute inset-0 block h-full w-full cursor-grab touch-pan-y";
        canvas.setAttribute("role", "img");
        canvas.setAttribute(
          "aria-label",
          `${label} Drag, or use the left and right arrow keys, to rotate.`,
        );
        canvas.tabIndex = 0;
        canvas.addEventListener("pointerdown", onDown);
        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerup", onUp);
        canvas.addEventListener("pointercancel", onUp);
        canvas.addEventListener("keydown", onKey);
        stage.append(canvas);

        viewport = createViewport(canvas, model);
        if (pose) Object.assign(viewport, pose);
        viewport.resize(wrap.clientWidth, wrap.clientHeight);
        draw(false);
        setStatus("ready");
        start();
      } catch {
        if (mine !== generation) return;
        unmount();
        setStatus("failed");
      }
    };

    const resizer = new ResizeObserver(() => {
      if (!viewport || !wrap.clientWidth) return;
      viewport.resize(wrap.clientWidth, wrap.clientHeight);
      draw(false);
    });
    const nearWatcher = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === near) return;
        near = entry.isIntersecting;
        if (near) mount();
        else unmount();
      },
      { rootMargin: NEAR },
    );
    const visibleWatcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    resizer.observe(wrap);
    nearWatcher.observe(wrap);
    visibleWatcher.observe(wrap);

    return () => {
      resizer.disconnect();
      nearWatcher.disconnect();
      visibleWatcher.disconnect();
      near = false;
      unmount();
    };
  }, [model, label]);

  return (
    <div ref={wrapRef} className="relative h-full w-full select-none">
      <div ref={stageRef} className="absolute inset-0" />
      {status !== "ready" && (
        <p
          aria-hidden={status === "idle"}
          className="anno pointer-events-none absolute inset-0 grid place-items-center text-ink-soft"
        >
          {status === "failed"
            ? "3D view unavailable in this browser"
            : "Loading model…"}
        </p>
      )}

      <p
        aria-hidden
        className="anno pointer-events-none absolute left-4 top-4 text-ink-soft max-sm:hidden"
      >
        Model · Orthographic
      </p>
      <p
        aria-hidden
        className="anno pointer-events-none absolute right-3 top-3 text-ink-soft sm:right-4 sm:top-4"
      >
        Drag to rotate
      </p>
      <svg
        aria-hidden
        viewBox="-30 -30 60 60"
        className="anno pointer-events-none absolute bottom-2 left-2 h-[60px] w-[60px] text-ink sm:bottom-3 sm:left-3"
      >
        <g ref={axesRef} stroke="currentColor" strokeWidth="1">
          {["X", "Y", "Z"].map((axis) => (
            <line key={axis} x1="0" y1="0" x2="0" y2="0" />
          ))}
          {["X", "Y", "Z"].map((axis) => (
            <text
              key={axis}
              fill="currentColor"
              stroke="none"
              fontSize="8"
              textAnchor="middle"
            >
              {axis}
            </text>
          ))}
        </g>
      </svg>
      <p
        aria-hidden
        className="anno pointer-events-none absolute bottom-4 right-4 text-ink-soft max-sm:hidden"
      >
        θ <span ref={yawRef}>000</span>°
        <span className="mx-2 opacity-50">/</span>φ{" "}
        <span ref={elevationRef}>00</span>°
      </p>
    </div>
  );
}

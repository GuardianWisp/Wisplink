"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { isChromeFreePath } from "@/lib/site";
import { useTheme } from "./ThemeProvider";

type Star = {
  x: number;
  y: number;
  r: number;
  base: number;
  speed: number;
  phase: number;
};

/**
 * Fixed, full-viewport canvas of twinkling white dots on black — the
 * monochrome "star" theme's backdrop. It paints behind body's own
 * background, so it only becomes visible where a section has no
 * opaque background of its own (gutters, hero, footer, etc).
 */
export default function StarField() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (theme !== "dark") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;

    function seed() {
      const count = Math.floor((width * height) / 2800);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.25,
        base: Math.random() * 0.5 + 0.35,
        speed: Math.random() * 0.015 + 0.004,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height);
      for (const s of stars) {
        const tw = reduceMotion
          ? s.base
          : s.base + Math.sin(t * s.speed + s.phase) * 0.35;
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(240,240,238,${Math.max(0, Math.min(1, tw))})`;
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    if (reduceMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [theme]);

  if (theme !== "dark" || isChromeFreePath(pathname)) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-paper"
    >
      <div
        className="absolute -right-[10vw] -top-[10vw] h-[50vw] w-[50vw] rounded-full opacity-[0.06] blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)",
        }}
      />
      <div
        className="absolute -left-[15vw] top-[35vh] h-[40vw] w-[40vw] rounded-full opacity-[0.04] blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.8), transparent 72%)",
        }}
      />
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

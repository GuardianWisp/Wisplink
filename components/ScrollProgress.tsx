"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline-thin vertical line along the right edge that fills as you
 * scroll the page — a quiet "you are here" rail rather than a UI widget.
 * Desktop only (hidden md:block); on small screens there's rarely enough
 * margin for it to read as intentional rather than cramped.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
  });

  return (
    <div
      className="pointer-events-none fixed right-0 top-0 z-[150] hidden h-screen w-px bg-line-strong/60 md:block"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full origin-top bg-ink"
        style={{ scaleY }}
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

type DoodleVariant = "underline" | "circle" | "arrow" | "spark";

const paths: Record<DoodleVariant, { viewBox: string; d: string }> = {
  // wavy underline — sits beneath a word to give it emphasis
  underline: {
    viewBox: "0 0 200 20",
    d: "M2 12C40 2 80 18 100 10C130 0 160 18 198 8",
  },
  // loose, slightly imperfect ring — as if circled by hand
  circle: {
    viewBox: "0 0 100 60",
    d: "M52 4C24 2 4 18 6 34C8 50 30 58 54 56C80 54 96 40 93 24C90 8 62 1 38 6",
  },
  // small curved arrow with a hand-drawn arrowhead
  arrow: {
    viewBox: "0 0 90 60",
    d: "M4 10C30 4 58 18 78 44M78 44L62 41M78 44L73 27",
  },
  // four-point spark / asterisk mark
  spark: {
    viewBox: "0 0 40 40",
    d: "M20 3V37M3 20H37M8 8L32 32M32 8L8 32",
  },
};

export default function Doodle({
  variant,
  className = "",
  color = "text-ink",
  strokeWidth = 2.5,
  delay = 0.3,
}: {
  variant: DoodleVariant;
  /** Positioning + sizing — pass absolute positioning + width utilities here. */
  className?: string;
  color?: string;
  strokeWidth?: number;
  delay?: number;
}) {
  const { viewBox, d } = paths[variant];

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none hidden select-none md:block ${color} ${className}`}
    >
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </svg>
  );
}

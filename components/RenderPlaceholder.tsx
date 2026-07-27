"use client";

import { motion } from "framer-motion";

type RenderPlaceholderProps = {
  label?: string;
  index?: string;
  aspect?: "portrait" | "landscape" | "square" | "wide";
  className?: string;
  priority?: boolean;
};

const aspectMap: Record<string, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

/**
 * Placeholder for a future 3D render.
 * Replace the inner content with next/image or a <video> element
 * once final renders are available — the outer frame, hover and
 * reveal behaviour can stay exactly as-is.
 */
export default function RenderPlaceholder({
  label = "Render pending",
  index,
  aspect = "landscape",
  className = "",
  priority = false,
}: RenderPlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative w-full overflow-hidden bg-panel ${aspectMap[aspect]} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 transition-transform duration-1100 ease-studio group-hover:scale-[1.015]">
        <span className="label text-faint">{label}</span>
        {index && (
          <span className="font-mono text-xs text-faint">{index}</span>
        )}
      </div>
      <div className="absolute inset-0 border border-line-strong/60" aria-hidden />
      {priority && (
        <span className="sr-only">Placeholder image reserved for hero render</span>
      )}
    </motion.div>
  );
}

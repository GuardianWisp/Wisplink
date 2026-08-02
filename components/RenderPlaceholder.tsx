"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { MouseEventHandler } from "react";

type RenderPlaceholderProps = {
  /** Real image path — when provided, renders the actual image instead of a placeholder. */
  src?: string;
  alt?: string;
  label?: string;
  index?: string;
  aspect?: "portrait" | "landscape" | "square" | "wide";
  className?: string;
  priority?: boolean;
  /** Skip the scroll-triggered reveal — used inside the fullscreen lightbox. */
  static?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const aspectMap: Record<string, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

/**
 * Frame for a 3D render. Pass `src` to show a real image; omit it to
 * show a placeholder box (label + index) reserved for work not shot yet.
 * The outer frame, hover-zoom and reveal behaviour is identical either way.
 */
export default function RenderPlaceholder({
  src,
  alt,
  label = "Рендер скоро появится",
  index,
  aspect = "landscape",
  className = "",
  priority = false,
  static: isStatic = false,
  onClick,
}: RenderPlaceholderProps) {
  const revealProps = isStatic
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10% 0px" },
      };

  return (
    <motion.div
      {...revealProps}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`group relative w-full overflow-hidden bg-panel ${aspectMap[aspect]} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || label}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover transition-transform duration-1100 ease-studio group-hover:scale-[1.03]"
        />
      ) : (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 transition-transform duration-1100 ease-studio group-hover:scale-[1.015]">
          <span className="label text-faint">{label}</span>
          {index && (
            <span className="font-mono text-xs text-faint">{index}</span>
          )}
        </div>
      )}
      <div className="absolute inset-0 border border-line-strong/60" aria-hidden />
      {priority && !src && (
        <span className="sr-only">Место зарезервировано для главного рендера</span>
      )}
    </motion.div>
  );
}

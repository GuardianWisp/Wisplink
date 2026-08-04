"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { MouseEventHandler } from "react";
import { withBasePath } from "@/lib/paths";

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
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // If the browser already has this image cached, the load event can fire
  // before React attaches the listener (or not fire at all) — checking
  // `.complete` on mount catches that case so a cached image never gets
  // stuck at opacity-0, or double-fades in.
  useEffect(() => {
    setFailed(false);
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  const showImage = Boolean(src) && !failed;

  // Only when there's a real photo do we need the container itself to be
  // visible immediately (so its bg-panel shows through as a calm "loading"
  // state) — the container only slides, it doesn't fade. The image is the
  // only thing that fades, once, when it's actually ready. Stacking two
  // separate opacity fades (container + image) is what read as a "blink".
  const revealProps = isStatic
    ? { initial: { y: 0 }, animate: { y: 0 } }
    : src
      ? {
          initial: { y: 24 },
          whileInView: { y: 0 },
          viewport: { once: true, margin: "-10% 0px" },
        }
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
      {...(onClick ? { "data-cursor-label": "Открыть" } : {})}
      className={`group relative w-full overflow-hidden bg-panel ${aspectMap[aspect]} ${className}`}
    >
      {showImage ? (
        <Image
          ref={imgRef}
          src={withBasePath(src!)}
          alt={alt || label}
          fill
          priority={priority}
          decoding="async"
          sizes="(max-width: 768px) 100vw, 80vw"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`transform-gpu object-cover ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-700 ease-studio group-hover:scale-[1.03] group-hover:transition-transform group-hover:duration-1100`}
        />
      ) : (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 transition-transform duration-1100 ease-studio group-hover:scale-[1.015]">
          <span className="label text-faint">
            {failed ? "Не удалось загрузить изображение" : label}
          </span>
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

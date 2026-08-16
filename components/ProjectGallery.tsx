"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RenderPlaceholder from "./RenderPlaceholder";
import type { GalleryImage } from "@/lib/projects";

type Aspect = "portrait" | "landscape" | "square" | "wide";
type Size = "sm" | "md" | "lg" | "xl";

type GalleryItem = {
  type: "render" | "process";
  src: string;
  size: Size;
  aspect: Aspect;
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * How much grid space + which default aspect each size tier gets.
 * `grid-flow-row-dense` on the container (below) backfills any gaps
 * left when spans don't divide evenly into a row — so any mix of
 * sizes, in any order, still lays out cleanly with no holes.
 */
const sizeMap: Record<Size, { col: string; aspect: Aspect }> = {
  sm: { col: "md:col-span-4", aspect: "square" },
  md: { col: "md:col-span-6", aspect: "landscape" },
  lg: { col: "md:col-span-8", aspect: "landscape" },
  xl: { col: "md:col-span-12", aspect: "wide" },
};

/**
 * Automatic rhythm used only for images that don't specify their own
 * size — so a plain list of image paths still reads as a considered,
 * asymmetric layout with zero manual curation required.
 */
const defaultSizeCycle: Size[] = ["lg", "sm", "md", "xl", "sm", "md"];

function resolveImage(
  image: GalleryImage,
  fallbackSize: Size
): { src: string; size: Size; aspect: Aspect } {
  if (typeof image === "string") {
    return { src: image, size: fallbackSize, aspect: sizeMap[fallbackSize].aspect };
  }
  const size = image.size ?? fallbackSize;
  const aspect = image.aspect ?? sizeMap[size].aspect;
  return { src: image.src, size, aspect };
}

/**
 * Builds the interleaved sequence — renders lead, then renders and
 * process stills alternate roughly 2:1 — then resolves each item's
 * size/aspect, respecting any manual override on that specific image.
 */
function buildSequence(
  renders: GalleryImage[],
  process: GalleryImage[]
): GalleryItem[] {
  const raw: { type: "render" | "process"; image: GalleryImage }[] = [];
  let r = 0;
  let p = 0;

  const lead = Math.min(2, renders.length);
  for (let i = 0; i < lead; i++) {
    raw.push({ type: "render", image: renders[r]! });
    r++;
  }

  while (r < renders.length || p < process.length) {
    for (let k = 0; k < 2 && r < renders.length; k++) {
      raw.push({ type: "render", image: renders[r]! });
      r++;
    }
    if (p < process.length) {
      raw.push({ type: "process", image: process[p]! });
      p++;
    }
  }

  return raw.map((item, i) => {
    const fallbackSize = defaultSizeCycle[i % defaultSizeCycle.length]!;
    const resolved = resolveImage(item.image, fallbackSize);
    return { type: item.type, ...resolved };
  });
}

export default function ProjectGallery({
  title,
  renders,
  process,
}: {
  title: string;
  renders: GalleryImage[];
  process: GalleryImage[];
}) {
  const items = useMemo(
    () => buildSequence(renders, process),
    [renders, process]
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % items.length));
  }, [items.length]);
  const prev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + items.length) % items.length
    );
  }, [items.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, next, prev]);

  if (items.length === 0) return null;

  const current = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <div className="grid grid-flow-row-dense grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        {items.map((item, i) => (
          <div key={item.src} className={sizeMap[item.size].col}>
            <RenderPlaceholder
              src={item.src}
              alt={
                item.type === "render"
                  ? `${title} — рендер`
                  : `${title} — процесс`
              }
              label={
                item.type === "render"
                  ? `${title} — Рендер`
                  : `${title} — Процесс`
              }
              index={String(i + 1).padStart(2, "0")}
              aspect={item.aspect}
              onClick={() => setOpenIndex(i)}
              className="cursor-zoom-in transition-opacity duration-500 hover:opacity-90"
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {current && openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-0 z-[100] flex flex-col bg-paper"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — просмотр изображений`}
            onClick={close}
          >
            <div className="flex items-center justify-between px-6 py-5 md:px-12 md:py-8">
              <span className="label">
                {String(openIndex + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")} —{" "}
                {current.type === "render" ? "Рендер" : "Процесс"}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Закрыть просмотр"
                className="label border border-ink px-4 py-2 transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                Закрыть ✕
              </button>
            </div>

            <div
              className="relative flex flex-1 items-center justify-center px-4 pb-8 md:px-16 md:pb-16"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={prev}
                aria-label="Предыдущее изображение"
                className="label absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 border border-ink bg-paper px-3 py-3 transition-colors duration-300 hover:bg-ink hover:text-paper md:left-6 md:block"
              >
                ←
              </button>

              <motion.div
                key={openIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease }}
                className="h-full w-full max-w-6xl"
              >
                <RenderPlaceholder
                  src={current.src}
                  alt={
                    current.type === "render"
                      ? `${title} — рендер`
                      : `${title} — процесс`
                  }
                  label={
                    current.type === "render"
                      ? `${title} — Рендер`
                      : `${title} — Процесс`
                  }
                  index={String(openIndex + 1).padStart(2, "0")}
                  aspect="wide"
                  static
                  className="h-[62vh] w-full md:h-[76vh]"
                />
              </motion.div>

              <button
                type="button"
                onClick={next}
                aria-label="Следующее изображение"
                className="label absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 border border-ink bg-paper px-3 py-3 transition-colors duration-300 hover:bg-ink hover:text-paper md:right-6 md:block"
              >
                →
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 pb-8 md:hidden">
              <button
                type="button"
                onClick={prev}
                aria-label="Предыдущее изображение"
                className="label border border-ink px-4 py-2"
              >
                ← Назад
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Следующее изображение"
                className="label border border-ink px-4 py-2"
              >
                Далее →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

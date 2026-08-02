"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RenderPlaceholder from "./RenderPlaceholder";

type Aspect = "portrait" | "landscape" | "square" | "wide";

type GalleryItem = {
  type: "render" | "process";
  src: string;
  aspect: Aspect;
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * A 6-step column/aspect rhythm that repeats down the page:
 * wide + narrow → three even squares → one full-width breather.
 * Renders and process shots share the same rhythm so the whole
 * gallery reads as one considered sequence, not two separate grids.
 */
const layoutPattern: { col: string; aspect: Aspect }[] = [
  { col: "md:col-span-7", aspect: "landscape" },
  { col: "md:col-span-5", aspect: "portrait" },
  { col: "md:col-span-4", aspect: "square" },
  { col: "md:col-span-4", aspect: "square" },
  { col: "md:col-span-4", aspect: "square" },
  { col: "md:col-span-12", aspect: "wide" },
];

/**
 * Builds the interleaved sequence directly from the real image arrays —
 * renders lead, then renders and process stills alternate roughly 2:1,
 * so process work surfaces naturally through the set instead of being
 * siloed at the end. Reading straight from array length (not a separate
 * count field) means there's nothing to keep in sync by hand.
 */
function buildSequence(renders: string[], process: string[]): GalleryItem[] {
  const items: { type: "render" | "process"; src: string }[] = [];
  let r = 0;
  let p = 0;

  const lead = Math.min(2, renders.length);
  for (let i = 0; i < lead; i++) {
    items.push({ type: "render", src: renders[r]! });
    r++;
  }

  while (r < renders.length || p < process.length) {
    for (let k = 0; k < 2 && r < renders.length; k++) {
      items.push({ type: "render", src: renders[r]! });
      r++;
    }
    if (p < process.length) {
      items.push({ type: "process", src: process[p]! });
      p++;
    }
  }

  return items.map((item, i) => ({
    ...item,
    aspect: layoutPattern[i % layoutPattern.length]!.aspect,
  }));
}

export default function ProjectGallery({
  title,
  renders,
  process,
}: {
  title: string;
  renders: string[];
  process: string[];
}) {
  const items = buildSequence(renders, process);
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        {items.map((item, i) => (
          <div key={item.src} className={layoutPattern[i % layoutPattern.length]!.col}>
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
            className="fixed inset-0 z-[100] flex flex-col bg-paper/98 backdrop-blur-sm"
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

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RenderPlaceholder from "./RenderPlaceholder";
import type { GalleryImage } from "@/lib/projects";
import { useLocale } from "./LocaleProvider";

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
 * Default aspect per size tier — only used as the placeholder's fallback
 * box (real photos/videos size themselves from their own intrinsic
 * ratio in the masonry below, so this never crops actual work).
 * `xl` additionally means "break out and span every column."
 */
const sizeMap: Record<Size, { aspect: Aspect }> = {
  sm: { aspect: "square" },
  md: { aspect: "landscape" },
  lg: { aspect: "landscape" },
  xl: { aspect: "wide" },
};

/** Numeric version of the same ratios, used only to estimate column
 *  heights while packing — how tall each item is guessed to render
 *  at a fixed column width, before its real size is known. */
const aspectRatioMap: Record<Aspect, number> = {
  portrait: 4 / 5,
  landscape: 16 / 10,
  square: 1,
  wide: 21 / 9,
};

/**
 * Column count follows the same breakpoints the grid used to rely on
 * Tailwind's `columns-*` utilities for. Native CSS multi-column balance
 * isn't guaranteed identical across browsers — Chrome and Safari can
 * legitimately pick different break points for the same content — so
 * columns are packed by hand here instead, which is deterministic
 * everywhere.
 */
function useColumnCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 1024) return 2;
      return 3;
    };
    const update = () => setCount(compute());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

type IndexedItem = { item: GalleryItem; index: number };
type GallerySegment =
  | { type: "columns"; columns: IndexedItem[][] }
  | { type: "full"; entry: IndexedItem };

/**
 * Greedy shortest-column-first packing (the actual Pinterest algorithm):
 * each item goes into whichever column is currently shortest, using its
 * fallback aspect ratio as a height estimate. An `xl` item breaks out
 * to its own full-width segment instead of joining a column.
 */
function distributeIntoColumns(
  items: GalleryItem[],
  columnCount: number
): GallerySegment[] {
  const segments: GallerySegment[] = [];
  let pending: IndexedItem[] = [];

  const flushColumns = () => {
    if (pending.length === 0) return;
    const heights = new Array(columnCount).fill(0);
    const columns: IndexedItem[][] = Array.from({ length: columnCount }, () => []);
    for (const entry of pending) {
      let target = 0;
      for (let c = 1; c < columnCount; c++) {
        if (heights[c] < heights[target]) target = c;
      }
      columns[target].push(entry);
      heights[target] += 1 / aspectRatioMap[entry.item.aspect];
    }
    segments.push({ type: "columns", columns });
    pending = [];
  };

  items.forEach((item, index) => {
    if (item.size === "xl") {
      flushColumns();
      segments.push({ type: "full", entry: { item, index } });
    } else {
      pending.push({ item, index });
    }
  });
  flushColumns();

  return segments;
}

/**
 * Automatic rhythm used only for images that don't specify their own
 * size. In the masonry grid below, actual tile width comes from each
 * item's own intrinsic aspect ratio — `size` only still matters for
 * `xl` (breaks out to span every column), which is why it's excluded
 * here: auto-assigning a full-bleed span to whatever happens to land
 * on that beat would blow up a tall/portrait item to full width.
 * `xl` stays available as an explicit, intentional opt-in per image.
 */
const defaultSizeCycle: Size[] = ["lg", "sm", "md", "sm", "md", "lg"];

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
  const { t } = useLocale();
  const items = useMemo(
    () => buildSequence(renders, process),
    [renders, process]
  );
  const columnCount = useColumnCount();
  const segments = useMemo(
    () => distributeIntoColumns(items, columnCount),
    [items, columnCount]
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

  const renderTile = ({ item, index }: IndexedItem) => (
    <RenderPlaceholder
      key={item.src}
      src={item.src}
      alt={
        item.type === "render"
          ? `${title} — ${t.gallery.renderAlt}`
          : `${title} — ${t.gallery.processAlt}`
      }
      label={
        item.type === "render"
          ? `${title} — ${t.gallery.render}`
          : `${title} — ${t.gallery.process}`
      }
      index={String(index + 1).padStart(2, "0")}
      aspect={item.aspect}
      natural
      onClick={() => setOpenIndex(index)}
      className="cursor-zoom-in transition-opacity duration-500 hover:opacity-90"
    />
  );

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-8">
        {segments.map((segment, si) =>
          segment.type === "full" ? (
            <div key={`full-${segment.entry.index}`}>
              {renderTile(segment.entry)}
            </div>
          ) : (
            <div
              key={`row-${si}`}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
            >
              {segment.columns.map((column, ci) => (
                <div key={ci} className="flex flex-col gap-6 md:gap-8">
                  {column.map((entry) => renderTile(entry))}
                </div>
              ))}
            </div>
          )
        )}
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
            aria-label={`${title} — ${t.gallery.imagesView}`}
            onClick={close}
          >
            <div className="flex items-center justify-between px-6 py-5 md:px-12 md:py-8">
              <span className="label">
                {String(openIndex + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")} —{" "}
                {current.type === "render" ? t.gallery.render : t.gallery.process}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label={t.gallery.closeView}
                className="label border border-ink px-4 py-2 transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                {t.gallery.close}
              </button>
            </div>

            <div
              className="relative flex flex-1 items-center justify-center px-4 pb-8 md:px-16 md:pb-16"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={prev}
                aria-label={t.gallery.prevImage}
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
                      ? `${title} — ${t.gallery.renderAlt}`
                      : `${title} — ${t.gallery.processAlt}`
                  }
                  label={
                    current.type === "render"
                      ? `${title} — ${t.gallery.render}`
                      : `${title} — ${t.gallery.process}`
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
                aria-label={t.gallery.nextImage}
                className="label absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 border border-ink bg-paper px-3 py-3 transition-colors duration-300 hover:bg-ink hover:text-paper md:right-6 md:block"
              >
                →
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 pb-8 md:hidden">
              <button
                type="button"
                onClick={prev}
                aria-label={t.gallery.prevImage}
                className="label border border-ink px-4 py-2"
              >
                {t.gallery.back}
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={t.gallery.nextImage}
                className="label border border-ink px-4 py-2"
              >
                {t.gallery.forward}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

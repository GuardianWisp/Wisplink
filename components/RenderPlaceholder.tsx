"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { MouseEventHandler } from "react";
import { useLocale } from "./LocaleProvider";

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
  /**
   * Size the frame to the media's own intrinsic aspect ratio instead of
   * cropping it into a fixed box — what a masonry/Pinterest-style grid
   * needs. Renders a plain `<img>` (no next/image `fill`, which requires
   * a pre-set box) and lets `<video>` report its natural size once its
   * metadata loads.
   */
  natural?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const aspectMap: Record<string, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

// Numeric fallback for `natural` mode — reserves a sensible box the
// instant the tile mounts, before the media's real ratio is known, so
// a slow-loading video never collapses to zero height and yanks the
// masonry column around once it finally arrives.
const aspectRatioMap: Record<string, number> = {
  portrait: 4 / 5,
  landscape: 16 / 10,
  square: 1,
  wide: 21 / 9,
};

const VIDEO_EXTENSION = /\.(mp4|webm|mov)$/i;

/**
 * Frame for a 3D render. Pass `src` to show a real image; omit it to
 * show a placeholder box (label + index) reserved for work not shot yet.
 * The outer frame, hover-zoom and reveal behaviour is identical either way.
 */
export default function RenderPlaceholder({
  src,
  alt,
  label,
  index,
  aspect = "landscape",
  className = "",
  priority = false,
  static: isStatic = false,
  natural = false,
  onClick,
}: RenderPlaceholderProps) {
  const { t } = useLocale();
  const resolvedLabel = label ?? t.renderPlaceholder.comingSoon;
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ratio, setRatio] = useState<number | null>(null);
  const isVideo = Boolean(src) && VIDEO_EXTENSION.test(src!);

  // If the browser already has this image cached, the load event can fire
  // before React attaches the listener (or not fire at all) — checking
  // `.complete` on mount catches that case so a cached image never gets
  // stuck at opacity-0, or double-fades in.
  // React's `muted` JSX prop doesn't reliably set the underlying IDL
  // property before autoplay is attempted, so the browser's autoplay
  // policy silently blocks playback — setting it imperatively fixes that.
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    videoRef.current.muted = true;
    videoRef.current.play().catch(() => {});
  }, [isVideo, src]);

  useEffect(() => {
    setFailed(false);
    setRatio(null);
    if (isVideo) {
      const v = videoRef.current;
      if ((v?.readyState ?? 0) >= 2) setLoaded(true);
      if (v?.videoWidth && v?.videoHeight) setRatio(v.videoWidth / v.videoHeight);
      return;
    }
    const img = imgRef.current;
    if (img?.complete) {
      setLoaded(true);
      if (img.naturalWidth && img.naturalHeight) {
        setRatio(img.naturalWidth / img.naturalHeight);
      }
    }
  }, [src, isVideo]);

  const showImage = Boolean(src) && !isVideo && !failed;
  const showVideo = Boolean(src) && isVideo && !failed;

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
      {...(onClick ? { "data-cursor-label": t.renderPlaceholder.open } : {})}
      className={`group relative w-full overflow-hidden bg-panel ${natural ? "" : aspectMap[aspect]} ${className}`}
      style={natural ? { aspectRatio: ratio ?? aspectRatioMap[aspect] } : undefined}
    >
      {showVideo ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight);
          }}
          onLoadedData={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`transform-gpu transition-opacity duration-700 ease-studio group-hover:scale-[1.03] group-hover:transition-transform group-hover:duration-1100 ${
            natural ? "block h-auto w-full" : "h-full w-full object-cover"
          } ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : showImage && natural ? (
        // eslint-disable-next-line @next/next/no-img-element -- intrinsic sizing for masonry; next/image's `fill` needs a pre-set box, which is exactly what a natural-ratio tile can't have.
        <img
          ref={imgRef}
          src={src}
          alt={alt || resolvedLabel}
          decoding="async"
          onLoad={(e) => {
            setLoaded(true);
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight) {
              setRatio(img.naturalWidth / img.naturalHeight);
            }
          }}
          onError={() => setFailed(true)}
          className={`block h-auto w-full transform-gpu transition-opacity duration-700 ease-studio group-hover:scale-[1.03] group-hover:transition-transform group-hover:duration-1100 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : showImage ? (
        <Image
          ref={imgRef}
          src={src!}
          alt={alt || resolvedLabel}
          fill
          priority={priority}
          decoding="async"
          quality={90}
          sizes="(max-width: 768px) 100vw, 80vw"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`transform-gpu object-cover ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-700 ease-studio group-hover:scale-[1.03] group-hover:transition-transform group-hover:duration-1100`}
        />
      ) : (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 transition-transform duration-1100 ease-studio group-hover:scale-[1.015]">
          <span className="label text-faint">
            {failed ? t.renderPlaceholder.failedToLoad : resolvedLabel}
          </span>
          {index && (
            <span className="font-mono text-xs text-faint">{index}</span>
          )}
        </div>
      )}
      <div className="absolute inset-0 border border-line-strong/60" aria-hidden />
      {priority && !src && (
        <span className="sr-only">{t.renderPlaceholder.heroReserved}</span>
      )}
    </motion.div>
  );
}

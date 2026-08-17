"use client";

import { usePathname } from "next/navigation";
import { isChromeFreePath } from "@/lib/site";

/**
 * A static, extremely subtle grain texture over the whole viewport —
 * gives the flat white background a printed-paper feel rather than a
 * bare digital one. Pure SVG noise, rendered once, no animation and no
 * JS on the main thread — the cheapest possible way to do this.
 */
export default function GrainOverlay() {
  const pathname = usePathname();
  if (isChromeFreePath(pathname)) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[110] opacity-[0.045] mix-blend-multiply"
      aria-hidden="true"
    >
      <svg className="h-full w-full">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.2126 0.7152 0.0722 0 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

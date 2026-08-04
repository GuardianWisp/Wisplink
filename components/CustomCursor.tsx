"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Replaces the native cursor with a small dot + a spring-lagged trailing
 * ring on devices that actually have a mouse (`hover: hover` + `pointer:
 * fine`). Touch devices are left completely untouched — the check runs
 * once on mount and the component renders nothing until it passes, so
 * there's zero risk of this ever interfering with touch/mobile use.
 *
 * Any `<a>` or `<button>` grows the ring automatically. Add
 * `data-cursor-label="Смотреть"` to an element for a custom ring label —
 * RenderPlaceholder and WorkCard already do this for gallery images and
 * project cards.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!isFinePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    function onMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = (e.target as HTMLElement)?.closest?.<HTMLElement>(
        "a, button, [data-cursor]"
      );
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor-label"));
      } else {
        setHovering(false);
        setLabel(null);
      }
    }

    function onLeaveWindow() {
      setHovering(false);
      setLabel(null);
    }

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-ink"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center overflow-hidden rounded-full border border-ink bg-paper/40 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? (label ? 92 : 52) : 26,
          height: hovering ? (label ? 92 : 52) : 26,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {label && (
          <span className="label px-2 text-center text-[9px] leading-tight text-ink">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type RenderPlaceholderProps = {
  src: string;
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

export default function RenderPlaceholder({
  src,
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
      <div className="absolute inset-0 transition-transform duration-700 ease-studio group-hover:scale-[1.015]">
        <Image
          src={src}
          alt="Biotech 3D artwork"
          fill
          priority={priority}
          className="object-cover"
        />
      </div>

      <div
        className="absolute inset-0 border border-line-strong/60"
        aria-hidden
      />
    </motion.div>
  );
}
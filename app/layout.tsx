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

// Определяем basePath для production-сборки на GitHub Pages
const basePath = process.env.NODE_ENV === "production" ? "/Wisplink" : "";

export default function RenderPlaceholder({
  src,
  label = "3D Artwork",
  aspect = "landscape",
  className = "",
  priority = false,
}: RenderPlaceholderProps) {
  // Если src начинается со слэша, склеиваем с basePath, если путь уже полный — оставляем как есть
  const imageSrc = src.startsWith("/") ? `${basePath}${src}` : src;

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
          src={imageSrc}
          alt={label}
          fill
          priority={priority}
          className="object-cover"
          unoptimized // Гарантирует корректную работу со статическими путями в export
        />
      </div>

      <div
        className="absolute inset-0 border border-line-strong/60"
        aria-hidden
      />
    </motion.div>
  );
}
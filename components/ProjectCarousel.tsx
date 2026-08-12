"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import RenderPlaceholder from "./RenderPlaceholder";

export default function ProjectCarousel({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // No real images yet — fall back to a single placeholder, same as before.
  if (images.length === 0) {
    return (
      <RenderPlaceholder
        label={`${title} — Полноэкранный рендер`}
        index="01"
        aspect="wide"
        priority
        className="h-[60vh] md:h-[86vh]"
      />
    );
  }

  return (
    <div
      className="group relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} — избранные рендеры`}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div key={src} className="relative min-w-0 flex-[0_0_100%]">
              <RenderPlaceholder
                src={src}
                alt={`${title} — рендер ${i + 1}`}
                aspect="wide"
                static
                priority={i === 0}
                className="h-[60vh] md:h-[86vh]"
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-between px-4 md:bottom-10 md:px-10">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Предыдущий слайд"
              className="label pointer-events-auto border border-ink bg-paper px-4 py-3 transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              ←
            </button>

            <span className="label pointer-events-none bg-paper px-3 py-2">
              {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Следующий слайд"
              className="label pointer-events-auto border border-ink bg-paper px-4 py-3 transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              →
            </button>
          </div>

          {/* thin progress line — quieter than dots, reads as a measurement not a UI widget */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-line-strong/70">
            <div
              className="h-full bg-ink transition-all duration-500 ease-studio"
              style={{
                width: `${((selectedIndex + 1) / images.length) * 100}%`,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

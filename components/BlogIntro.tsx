"use client";

import Reveal from "@/components/Reveal";
import { useLocale } from "./LocaleProvider";

export default function BlogIntro() {
  const { t } = useLocale();
  return (
    <Reveal>
      <span className="label">{t.blog.eyebrow}</span>
      <h1 className="mt-4 max-w-2xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-tightest">
        {t.blog.heading}
      </h1>
    </Reveal>
  );
}

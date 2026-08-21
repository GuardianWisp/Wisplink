"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

export function WorkSectionHeading({
  count,
  yearRange,
}: {
  count: number;
  yearRange: string;
}) {
  const { t } = useLocale();
  return (
    <Reveal className="flex flex-col gap-4 border-t border-line pt-10 md:flex-row md:items-end md:justify-between md:pt-14">
      <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-tighter">
        {t.home.workHeading}
      </h2>
      <span className="label">
        {count.toString().padStart(2, "0")} {t.home.projectsSuffix} —{" "}
        {yearRange}
      </span>
    </Reveal>
  );
}

export function HomeCta() {
  const { t } = useLocale();
  return (
    <section className="container-studio">
      <div className="border-t border-line py-24 md:py-32">
        <Reveal className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[0.98] tracking-tighter md:col-span-8">
            {t.home.ctaHeading}
          </h2>
          <div className="md:col-span-4 md:justify-self-end">
            <Link
              href="/contact"
              className="label inline-flex items-center gap-3 border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              {t.home.ctaButton}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

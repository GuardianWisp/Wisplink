"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";

export default function Process() {
  const { t } = useLocale();

  return (
    <section className="container-studio">
      <div className="border-t border-line py-24 md:py-32">
        <Reveal>
          <span className="label">{t.process.eyebrow}</span>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-4 md:gap-8">
          {t.process.steps.map((step, i) => (
            <Reveal
              key={step.index}
              delay={i * 0.08}
              className="border-t border-line pt-6"
            >
              <span className="label">{step.index}</span>
              <h3 className="mt-4 text-2xl font-medium tracking-tighter">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

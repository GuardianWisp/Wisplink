"use client";

import RenderPlaceholder from "@/components/RenderPlaceholder";
import Reveal from "@/components/Reveal";
import { useLocale } from "./LocaleProvider";

export default function AboutContent() {
  const { t } = useLocale();
  const { about } = t;

  return (
    <div className="container-studio py-16 md:py-24">
      <Reveal>
        <span className="label">{about.eyebrow}</span>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-tightest">
          {about.heading}
        </h1>
        <a
          href="/cv.pdf"
          download
          className="label mt-8 inline-flex items-center gap-3 border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
        >
          {about.downloadCv}
        </a>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-5">
          <RenderPlaceholder
            src="/images/portrait.webp"
            alt={about.portraitAlt}
            aspect="portrait"
            priority
          />
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          {about.bio.map((paragraph, i) => (
            <p
              key={i}
              className={`text-lg leading-relaxed text-muted ${i > 0 ? "mt-6" : ""}`}
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-14">
            <span className="label">{about.experienceLabel}</span>
            <ul className="mt-5 flex flex-col gap-4">
              {about.experience.map((item) => (
                <li
                  key={item.role}
                  className="flex flex-col gap-1 border-t border-line pt-4 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="text-sm">{item.role}</span>
                  <span className="font-mono text-xs text-muted">
                    {item.years}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-10 border-t border-line pt-14 md:mt-28 md:grid-cols-2 md:gap-12 md:pt-20">
        <Reveal>
          <span className="label">{about.skillsLabel}</span>
          <ul className="mt-5 flex flex-col gap-3">
            {about.skills.map((skill) => (
              <li key={skill} className="text-base">
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="label">{about.softwareLabel}</span>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
            {about.software.map((tool) => (
              <li key={tool} className="text-base">
                {tool}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-20 border-t border-line pt-14 md:mt-28 md:pt-20">
        <Reveal>
          <span className="label">{about.servicesLabel}</span>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-10 md:grid-cols-2">
          {about.services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 0.05}
              className="border-t border-line pt-6"
            >
              <h3 className="text-2xl font-medium tracking-tighter">
                {service.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

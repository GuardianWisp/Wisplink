"use client";

import Reveal from "@/components/Reveal";
import Doodle from "@/components/Doodle";
import { social, email } from "@/data/social";
import { useLocale } from "./LocaleProvider";

export default function ContactContent() {
  const { t } = useLocale();
  const { contact } = t;

  return (
    <div className="container-studio py-16 md:py-24">
      <Reveal>
        <span className="label">{contact.eyebrow}</span>
        <h1 className="mt-4 max-w-2xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-tightest">
          {contact.heading}
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="relative mt-16 border-t border-line pt-12 md:mt-24 md:pt-16">
        <Doodle
          variant="spark"
          className="absolute right-0 top-8 w-6 text-muted md:top-12 md:w-8"
          delay={0.6}
        />
        <span className="label">{contact.emailLabel}</span>
        <a
          href={`mailto:${email}`}
          className="mt-4 block text-[clamp(2rem,6vw,4.5rem)] font-medium leading-none tracking-tighter transition-colors duration-300 hover:text-muted"
        >
          {email}
        </a>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-12 border-t border-line pt-12 md:mt-20 md:grid-cols-12 md:gap-12 md:pt-16">
        <Reveal delay={0.05} className="md:col-span-6">
          <span className="label">{contact.detailsLabel}</span>
          <dl className="mt-5 flex flex-col gap-5">
            {contact.details.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 border-t border-line pt-4 first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <dt className="label">{item.label}</dt>
                <dd className="text-base text-muted sm:max-w-xs sm:text-right">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          <span className="label">{contact.socialLabel}</span>
          <ul className="mt-5 flex flex-col gap-3">
            {social.map((item) => (
              <li
                key={item.label}
                className="border-t border-line pt-3 first:border-t-0 first:pt-0"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-lg tracking-tight transition-colors duration-300 hover:text-muted"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}

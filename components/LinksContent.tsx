"use client";

import Link from "next/link";
import RenderPlaceholder from "@/components/RenderPlaceholder";
import { social, email } from "@/data/social";
import { useLocale } from "./LocaleProvider";

const buttonClass =
  "label block w-full border border-ink px-6 py-4 text-center text-ink transition-colors duration-300 hover:bg-ink hover:text-paper";

export default function LinksContent() {
  const { t } = useLocale();
  const links = [
    { label: t.links.portfolio, href: "/" },
    { label: t.links.projects, href: "/#work" },
    { label: t.links.blog, href: "/blog" },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mx-auto w-24">
          <RenderPlaceholder
            src="/images/portrait.webp"
            alt={t.about.portraitAlt}
            aspect="square"
            priority
          />
        </div>

        <div className="mt-6 text-center">
          <span className="font-mono text-sm tracking-label text-ink">
            {t.personName}
          </span>
          <p className="label mt-1">{t.links.tagline}</p>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={buttonClass}>
              {item.label}
            </Link>
          ))}

          <a href={`mailto:${email}`} className={buttonClass}>
            {t.links.write}
          </a>

          <a href="/cv.pdf" download className={buttonClass}>
            {t.links.downloadCv}
          </a>

          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonClass}
            >
              {item.label}
            </a>
          ))}
        </div>

        <p className="label mt-10 text-center text-faint">
          &copy; {new Date().getFullYear()} Wisplink
        </p>
      </div>
    </div>
  );
}

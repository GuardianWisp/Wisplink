import type { Metadata } from "next";
import Link from "next/link";
import RenderPlaceholder from "@/components/RenderPlaceholder";
import { social, email } from "@/data/social";
import { withBasePath } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Все ссылки",
  description: "Портфолио, журнал, CV и соцсети — Wisplink, 3D-генералист.",
};

const buttonClass =
  "label block w-full border border-ink px-6 py-4 text-center text-ink transition-colors duration-300 hover:bg-ink hover:text-paper";

const links = [
  { label: "Портфолио", href: "/" },
  { label: "Проекты", href: "/#work" },
  { label: "Журнал", href: "/blog" },
];

export default function LinksPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mx-auto w-24">
          <RenderPlaceholder src="/images/portrait.webp" alt="Портрет" aspect="square" priority />
        </div>

        <div className="mt-6 text-center">
          <span className="font-mono text-sm tracking-label text-ink">
            НИКИТА ИСАЕВ
          </span>
          <p className="label mt-1">3D-генералист, фриланс</p>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={buttonClass}>
              {item.label}
            </Link>
          ))}

          <a href={`mailto:${email}`} className={buttonClass}>
            Написать
          </a>

          <a href={withBasePath("/cv.pdf")} download className={buttonClass}>
            Скачать CV
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

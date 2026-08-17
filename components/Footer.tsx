"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { social, email } from "@/data/social";
import { isChromeFreePath } from "@/lib/site";

export default function Footer() {
  const pathname = usePathname();
  if (isChromeFreePath(pathname)) return null;

  return (
    <footer className="border-t border-line">
      <div className="container-studio flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between md:py-14">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm tracking-label text-ink">
            НИКИТА ИСАЕВ
          </span>
          <span className="label">AI-дизайнер и моушн-дизайнер</span>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="label text-ink transition-colors duration-300 hover:text-muted"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-1 md:items-end">
          <a
            href={`mailto:${email}`}
            className="label text-ink transition-colors duration-300 hover:text-muted"
          >
            {email}
          </a>
          <span className="label">
            &copy; {new Date().getFullYear()} Wisplink
          </span>
        </div>
      </div>

      <div className="container-studio pb-10">
        <Link href="#main" className="label text-faint hover:text-muted">
          Наверх ↑
        </Link>
      </div>
    </footer>
  );
}

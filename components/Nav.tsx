"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isChromeFreePath } from "@/lib/site";
import { useLocale } from "./LocaleProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  const links = [
    { href: "/#work", label: t.nav.work },
    { href: "/blog", label: t.nav.blog },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // /links and /admin render entirely on their own — no site chrome.
  if (isChromeFreePath(pathname)) return null;

  return (
    <header className="sticky top-0 z-50 isolate border-b border-line bg-paper">
      <div className="container-studio flex h-20 items-center justify-between md:h-24">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-label text-ink"
        >
          {t.nav.brand}
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label text-ink transition-colors duration-300 hover:text-muted"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-5 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t.nav.menuCloseLabel : t.nav.menuOpenLabel}
            className="label flex items-center gap-3"
          >
            {open ? t.nav.menuCloseText : t.nav.menuOpenText}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="container-studio flex flex-col gap-6 py-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-3xl tracking-tighter"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

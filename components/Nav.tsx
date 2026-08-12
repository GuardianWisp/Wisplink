"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/#work", label: "Проекты" },
  { href: "/blog", label: "Журнал" },
  { href: "/about", label: "Обо мне" },
  { href: "/contact", label: "Контакты" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // /links is a standalone link-in-bio page — no site chrome around it.
  if (pathname === "/links") return null;

  return (
    <header className="sticky top-0 z-50 isolate border-b border-line bg-paper">
      <div className="container-studio flex h-20 items-center justify-between md:h-24">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-label text-ink"
        >
          Wisp
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
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          className="label flex items-center gap-3 md:hidden"
        >
          {open ? "Закрыть" : "Меню"}
        </button>
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

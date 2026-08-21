"use client";

import { useLocale } from "./LocaleProvider";

export default function SkipLink() {
  const { t } = useLocale();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
    >
      {t.skipLink}
    </a>
  );
}

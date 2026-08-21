"use client";

import { useLocale } from "./LocaleProvider";
import type { Locale } from "@/lib/i18n";

const options: Locale[] = ["ru", "en"];

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.languageSwitcher.label}
      className={`inline-flex items-center gap-1 font-mono text-xs tracking-label text-muted ${className}`}
    >
      {options.map((option, i) => (
        <span key={option} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden>/</span>}
          <button
            type="button"
            onClick={() => setLocale(option)}
            aria-pressed={locale === option}
            className={`uppercase transition-colors duration-300 ${
              locale === option ? "text-ink" : "hover:text-ink"
            }`}
          >
            {option}
          </button>
        </span>
      ))}
    </div>
  );
}

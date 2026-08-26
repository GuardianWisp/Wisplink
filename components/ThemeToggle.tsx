"use client";

import { useTheme } from "./ThemeProvider";
import { useLocale } from "./LocaleProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? t.themeSwitcher.toLight : t.themeSwitcher.toDark}
      title={isDark ? t.themeSwitcher.toLight : t.themeSwitcher.toDark}
      className={`inline-flex h-6 w-6 items-center justify-center text-ink transition-colors duration-300 hover:text-muted ${className}`}
    >
      {isDark ? (
        <svg
          aria-hidden="true"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
        >
          <path
            d="M7.5 1v1.6M7.5 12.4V14M14 7.5h-1.6M2.6 7.5H1M12.1 2.9l-1.13 1.13M4.03 10.97 2.9 12.1M12.1 12.1l-1.13-1.13M4.03 4.03 2.9 2.9"
            strokeLinecap="round"
          />
          <circle cx="7.5" cy="7.5" r="3.1" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

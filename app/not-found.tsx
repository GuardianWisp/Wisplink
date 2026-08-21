"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <div className="container-studio flex min-h-[70vh] flex-col justify-center py-24">
      <span className="label">404</span>
      <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-tightest">
        {t.notFound.heading}
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">{t.notFound.body}</p>
      <div className="mt-10 flex gap-6">
        <Link
          href="/"
          className="label border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
        >
          {t.notFound.backHome}
        </Link>
      </div>
    </div>
  );
}

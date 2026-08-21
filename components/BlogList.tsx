"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import type { PostMeta } from "@/lib/posts";
import { useLocale } from "./LocaleProvider";

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const { t, dateLocale } = useLocale();

  function formatDate(iso: string) {
    if (!iso) return "";
    const date = new Date(iso);
    return date.toLocaleDateString(dateLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const tags = useMemo(() => {
    const all = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => all.add(t)));
    return Array.from(all).sort((a, b) =>
      a === "AI" ? -1 : b === "AI" ? 1 : 0
    );
  }, [posts]);

  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? posts.filter((p) => p.tags?.includes(active))
    : posts;

  if (posts.length === 0) {
    return (
      <p className="mt-16 max-w-md text-lg text-muted">
        {t.blog.emptyArchive}
      </p>
    );
  }

  return (
    <>
      {tags.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
          <button
            type="button"
            onClick={() => setActive(null)}
            className={`label border px-4 py-2 transition-colors duration-300 ${
              active === null
                ? "border-ink bg-ink text-paper"
                : "border-line-strong text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {t.blog.all}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              className={`label border px-4 py-2 transition-colors duration-300 ${
                active === tag
                  ? "border-ink bg-ink text-paper"
                  : "border-line-strong text-muted hover:border-ink hover:text-ink"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 md:mt-10">
        {filtered.map((post, i) => (
          <Reveal
            key={post.slug}
            delay={i * 0.05}
            className="border-t border-line py-10 first:border-t-0 md:py-12"
          >
            <Link
              href={`/blog/${post.slug}`}
              data-cursor-label={t.blog.readCursor}
              className="group grid grid-cols-1 gap-3 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="label md:col-span-2">
                {formatDate(post.date)}
              </span>
              <div className="md:col-span-8">
                <h2 className="text-2xl font-medium tracking-tighter transition-colors duration-300 group-hover:text-muted md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
                  {post.excerpt}
                </p>
              </div>
              <span className="label text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-300 group-hover:decoration-ink md:col-span-2 md:text-right">
                {t.blog.readMore}
              </span>
            </Link>
          </Reveal>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-muted">{t.blog.noTaggedPosts}</p>
        )}
      </div>
    </>
  );
}

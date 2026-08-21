"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Post } from "@/lib/posts";
import { useLocale } from "./LocaleProvider";

export default function BlogPostContent({
  post,
  mdxContent,
}: {
  post: Post;
  mdxContent: ReactNode;
}) {
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

  return (
    <article className="container-studio py-16 md:py-24">
      <Reveal>
        <Link href="/blog" className="label text-muted hover:text-ink">
          {t.blog.backToBlog}
        </Link>
      </Reveal>

      <Reveal delay={0.05} className="mt-8 md:mt-12">
        <span className="label">{formatDate(post.meta.date)}</span>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[0.98] tracking-tightest">
          {post.meta.title}
        </h1>
        {post.meta.tags && post.meta.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {post.meta.tags.map((tag) => (
              <span key={tag} className="label text-faint">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Reveal>

      <Reveal delay={0.1} className="mt-12 md:mt-16">
        {mdxContent}
      </Reveal>

      <Reveal delay={0.15} className="mt-16 border-t border-line pt-10 md:mt-24">
        <Link
          href="/blog"
          className="label inline-flex items-center gap-3 border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
        >
          {t.blog.allPosts}
        </Link>
      </Reveal>
    </article>
  );
}

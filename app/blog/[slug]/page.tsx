import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/posts";
import MdxContent from "@/components/MdxContent";
import Reveal from "@/components/Reveal";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: `${post.meta.title} — Wisplink`,
      description: post.meta.excerpt,
    },
  };
}

function formatDate(iso: string) {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="container-studio py-16 md:py-24">
      <Reveal>
        <Link href="/blog" className="label text-muted hover:text-ink">
          ← Журнал
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
        <MdxContent source={post.content} />
      </Reveal>

      <Reveal delay={0.15} className="mt-16 border-t border-line pt-10 md:mt-24">
        <Link
          href="/blog"
          className="label inline-flex items-center gap-3 border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
        >
          ← Все записи
        </Link>
      </Reveal>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Журнал",
  description:
    "Заметки о процессе, 3D-пайплайне, работе с AI-инструментами и наблюдения из практики.",
};

function formatDate(iso: string) {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container-studio py-16 md:py-24">
      <Reveal>
        <span className="label">Журнал</span>
        <h1 className="mt-4 max-w-2xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-tightest">
          Заметки о процессе.
        </h1>
      </Reveal>

      {posts.length === 0 ? (
        <p className="mt-16 max-w-md text-lg text-muted">
          Пока здесь пусто — первая запись скоро появится.
        </p>
      ) : (
        <div className="mt-16 md:mt-24">
          {posts.map((post, i) => (
            <Reveal
              key={post.slug}
              delay={i * 0.05}
              className="border-t border-line py-10 first:border-t-0 md:py-12"
            >
              <Link
                href={`/blog/${post.slug}`}
                data-cursor-label="Читать"
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
                  Читать →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import BlogList from "@/components/BlogList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Журнал",
  description:
    "Заметки о процессе, AI в пайплайне, 3D и наблюдения из практики.",
};

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

      <BlogList posts={posts} />
    </div>
  );
}

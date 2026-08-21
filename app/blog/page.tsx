import type { Metadata } from "next";
import BlogIntro from "@/components/BlogIntro";
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
      <BlogIntro />

      <BlogList posts={posts} />
    </div>
  );
}

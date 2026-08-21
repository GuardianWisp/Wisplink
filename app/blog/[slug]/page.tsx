import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/posts";
import BlogPostContent from "@/components/BlogPostContent";
import MdxContent from "@/components/MdxContent";
import { blogPostingJsonLd } from "@/lib/structured-data";

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

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd(post.meta)) }}
      />
      <BlogPostContent post={post} mdxContent={<MdxContent source={post.content} />} />
    </>
  );
}

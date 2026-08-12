import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO date, e.g. "2025-06-01"
  excerpt: string;
  cover?: string;
  tags?: string[];
};

export type Post = {
  meta: PostMeta;
  content: string; // raw MDX body, compiled at render time
};

function readSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** All posts, newest first — used by the archive page. */
export function getAllPosts(): PostMeta[] {
  return readSlugs()
    .map((slug) => getPost(slug)?.meta)
    .filter((meta): meta is PostMeta => Boolean(meta))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** A single post by slug, or null if it doesn't exist. */
export function getPost(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      cover: data.cover ?? undefined,
      tags: data.tags ?? undefined,
    },
    content,
  };
}

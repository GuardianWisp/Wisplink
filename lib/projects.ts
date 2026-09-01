import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

/**
 * A gallery image, in the simplest case just a path. To control how much
 * visual weight it gets in the gallery grid, use the object form instead:
 *
 *   "/images/projects/silt/render-02.webp"                          // default size
 *   { src: "/images/projects/silt/render-02.webp", size: "xl" }      // full-width feature
 *   { src: "/images/projects/silt/render-03.webp", size: "sm" }      // small accent tile
 *
 * size: "sm" | "md" | "lg" | "xl" (defaults to an automatic rhythm if omitted)
 * aspect: optional override — otherwise a sensible aspect is picked per size
 */
export type GalleryImage =
  | string
  | {
      src: string;
      size?: "sm" | "md" | "lg" | "xl";
      aspect?: "portrait" | "landscape" | "square" | "wide";
    };

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  index: string;
  summary: string;
  software: string[];
  services: string[];
  aspect: "portrait" | "landscape" | "square";
  /** Cover image used on the homepage work list. */
  cover: string;
  /** Fullscreen hero image at the top of the project page. */
  hero: string;
  /** How many leading `renders` join `hero` in the top carousel (default 4). */
  heroCount?: number;
  /** Gallery images, in order — leave empty to fall back to placeholders. */
  renders: GalleryImage[];
  process: GalleryImage[];
};

export type ProjectWithContent = Project & {
  /** Raw MDX body — the project description, rendered via MdxContent. */
  content: string;
};

function readSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) return [];
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * All projects, sorted by their `index` field (as shown in the UI) —
 * except "archive", which is the oldest, roughest, pre-portfolio work
 * and always sorts last regardless of its own index or how many other
 * projects get added later.
 */
export function getAllProjects(): Project[] {
  return readSlugs()
    .map((slug) => getProject(slug))
    .filter((p): p is ProjectWithContent => Boolean(p))
    .sort((a, b) => {
      if (a.slug === "archive") return 1;
      if (b.slug === "archive") return -1;
      return a.index.localeCompare(b.index);
    })
    .map(({ content, ...project }) => project);
}

/** A single project by slug, including its MDX body — or null if it doesn't exist. */
export function getProject(slug: string): ProjectWithContent | null {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    category: data.category ?? "",
    year: data.year ?? "",
    client: data.client ?? "",
    index: data.index ?? "00",
    summary: data.summary ?? "",
    software: data.software ?? [],
    services: data.services ?? [],
    aspect: data.aspect ?? "landscape",
    cover: data.cover ?? "",
    hero: data.hero ?? "",
    heroCount: data.heroCount,
    renders: data.renders ?? [],
    process: data.process ?? [],
    content,
  };
}

import { siteUrl } from "./site";
import { social, email } from "@/data/social";
import type { Project } from "./projects";
import type { PostMeta } from "./posts";

const personName = "Никита Исаев";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personName,
    url: siteUrl,
    email: `mailto:${email}`,
    jobTitle: "AI-дизайнер",
    sameAs: social.map((item) => item.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Wisplink",
    url: siteUrl,
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/work/${project.slug}`,
    creator: { "@type": "Person", name: personName },
    ...(project.cover ? { image: `${siteUrl}${project.cover}` } : {}),
    ...(project.year ? { datePublished: project.year } : {}),
  };
}

export function blogPostingJsonLd(post: PostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${siteUrl}/blog/${post.slug}`,
    author: { "@type": "Person", name: personName },
    ...(post.date ? { datePublished: post.date } : {}),
    ...(post.cover ? { image: `${siteUrl}${post.cover}` } : {}),
  };
}

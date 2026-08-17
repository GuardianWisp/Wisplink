import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact", "/blog", "/links"].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })
  );

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date || new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}

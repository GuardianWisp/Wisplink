import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const siteUrl = "https://forme.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}

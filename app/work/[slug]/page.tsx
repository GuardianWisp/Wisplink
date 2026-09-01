import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getAllProjects } from "@/lib/projects";
import ProjectPageContent from "@/components/ProjectPageContent";
import MdxContent from "@/components/MdxContent";
import { projectJsonLd } from "@/lib/structured-data";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Wisplink`,
      description: project.summary,
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const projects = getAllProjects();
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length] ?? projects[0]!;

  // Hero image plus the first few renders — a curated highlight reel,
  // separate from the full render+process set browsable in the Gallery below.
  // Most projects have enough visual variety for the default of 4; a
  // project can override with `heroCount` if its early renders read as
  // too repetitive next to each other in the carousel.
  const heroImages = [
    project.hero,
    ...project.renders
      .slice(0, project.heroCount ?? 4)
      .map((r) => (typeof r === "string" ? r : r.src)),
  ].filter((src): src is string => Boolean(src));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <ProjectPageContent
        project={project}
        next={next}
        heroImages={heroImages}
        mdxContent={<MdxContent source={project.content} />}
      />
    </>
  );
}

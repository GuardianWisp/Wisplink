"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectGallery from "@/components/ProjectGallery";
import Reveal from "@/components/Reveal";
import type { Project, ProjectWithContent } from "@/lib/projects";
import { useLocale } from "./LocaleProvider";

export default function ProjectPageContent({
  project,
  next,
  heroImages,
  mdxContent,
}: {
  project: ProjectWithContent;
  next: Project;
  heroImages: string[];
  mdxContent: ReactNode;
}) {
  const { t } = useLocale();

  return (
    <article>
      <header className="container-studio pb-14 pt-14 md:pb-20 md:pt-20">
        <Link href="/#work" className="label text-muted hover:text-ink">
          {t.work.backToProjects}
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-12 md:items-end">
          <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.95] tracking-tightest md:col-span-8">
            {project.title}
          </h1>
          <dl className="grid grid-cols-2 gap-6 md:col-span-4 md:justify-items-end md:text-right">
            <div>
              <dt className="label">{t.work.category}</dt>
              <dd className="mt-1 text-sm">{project.category}</dd>
            </div>
            <div>
              <dt className="label">{t.work.year}</dt>
              <dd className="mt-1 text-sm">{project.year}</dd>
            </div>
            <div>
              <dt className="label">{t.work.client}</dt>
              <dd className="mt-1 text-sm">{project.client}</dd>
            </div>
            <div>
              <dt className="label">{t.work.services}</dt>
              <dd className="mt-1 text-sm">{project.services.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </header>

      <Reveal className="px-0" y={28}>
        <ProjectCarousel title={project.title} images={heroImages} />
      </Reveal>

      <section className="container-studio py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>{mdxContent}</Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal>
              <span className="label">{t.work.software}</span>
              <ul className="mt-4 flex flex-col gap-2">
                {project.software.map((tool) => (
                  <li key={tool} className="text-sm text-ink">
                    {tool}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {(project.renders.length > 0 || project.process.length > 0) && (
        <section className="container-studio">
          <div className="border-t border-line py-16 md:py-24">
            <Reveal className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="label">{t.work.gallery}</span>
              <span className="label text-faint">{t.work.galleryHint}</span>
            </Reveal>
            <div className="mt-8 md:mt-10">
              <ProjectGallery
                title={project.title}
                renders={project.renders}
                process={project.process}
              />
            </div>
          </div>
        </section>
      )}

      <section className="container-studio">
        <div className="border-t border-line py-16 md:py-24">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="label">{t.work.nextProject}</span>
              <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-medium leading-none tracking-tighter">
                {next.title}
              </h2>
            </div>
            <Link
              href={`/work/${next.slug}`}
              className="label inline-flex items-center gap-3 border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              {t.work.viewProject}
            </Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getAllProjects } from "@/lib/projects";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectGallery from "@/components/ProjectGallery";
import MdxContent from "@/components/MdxContent";
import Reveal from "@/components/Reveal";

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
  const heroImages = [
    project.hero,
    ...project.renders.slice(0, 4).map((r) => (typeof r === "string" ? r : r.src)),
  ].filter((src): src is string => Boolean(src));

  return (
    <article>
      <header className="container-studio pb-14 pt-14 md:pb-20 md:pt-20">
        <Link href="/#work" className="label text-muted hover:text-ink">
          ← Все проекты
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-12 md:items-end">
          <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.95] tracking-tightest md:col-span-8">
            {project.title}
          </h1>
          <dl className="grid grid-cols-2 gap-6 md:col-span-4 md:justify-items-end md:text-right">
            <div>
              <dt className="label">Категория</dt>
              <dd className="mt-1 text-sm">{project.category}</dd>
            </div>
            <div>
              <dt className="label">Год</dt>
              <dd className="mt-1 text-sm">{project.year}</dd>
            </div>
            <div>
              <dt className="label">Клиент</dt>
              <dd className="mt-1 text-sm">{project.client}</dd>
            </div>
            <div>
              <dt className="label">Услуги</dt>
              <dd className="mt-1 text-sm">{project.services.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </header>

      {/* hero carousel — a curated highlight reel of the project's top renders */}
      <Reveal className="px-0" y={28}>
        <ProjectCarousel title={project.title} images={heroImages} />
      </Reveal>

      <section className="container-studio py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <MdxContent source={project.content} />
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal>
              <span className="label">Используемый софт</span>
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

      {/* gallery — renders and process interleaved, click any image to open fullscreen */}
      {(project.renders.length > 0 || project.process.length > 0) && (
        <section className="container-studio border-t border-line py-16 md:py-24">
          <Reveal className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <span className="label">Галерея</span>
            <span className="label text-faint">Нажмите на фото для полноэкранного просмотра</span>
          </Reveal>
          <div className="mt-8 md:mt-10">
            <ProjectGallery
              title={project.title}
              renders={project.renders}
              process={project.process}
            />
          </div>
        </section>
      )}

      <section className="container-studio border-t border-line py-16 md:py-24">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label">Следующий проект</span>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-medium leading-none tracking-tighter">
              {next.title}
            </h2>
          </div>
          <Link
            href={`/work/${next.slug}`}
            className="label inline-flex items-center gap-3 border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            Смотреть проект →
          </Link>
        </Reveal>
      </section>
    </article>
  );
}

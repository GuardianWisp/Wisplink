import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projects } from "@/data/projects";
import RenderPlaceholder from "@/components/RenderPlaceholder";
import Reveal from "@/components/Reveal";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Forme`,
      description: project.summary,
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <article>
      <header className="container-studio pb-14 pt-14 md:pb-20 md:pt-20">
        <Link href="/#work" className="label text-muted hover:text-ink">
          ← All work
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-12 md:items-end">
          <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.95] tracking-tightest md:col-span-8">
            {project.title}
          </h1>
          <dl className="grid grid-cols-2 gap-6 md:col-span-4 md:justify-items-end md:text-right">
            <div>
              <dt className="label">Category</dt>
              <dd className="mt-1 text-sm">{project.category}</dd>
            </div>
            <div>
              <dt className="label">Year</dt>
              <dd className="mt-1 text-sm">{project.year}</dd>
            </div>
            <div>
              <dt className="label">Client</dt>
              <dd className="mt-1 text-sm">{project.client}</dd>
            </div>
            <div>
              <dt className="label">Services</dt>
              <dd className="mt-1 text-sm">{project.services.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </header>

      {/* fullscreen hero render */}
      <Reveal className="px-0" y={28}>
        <RenderPlaceholder
          label={`${project.title} — Fullscreen render`}
          index="01"
          aspect="wide"
          priority
          className="h-[60vh] md:h-[86vh]"
        />
      </Reveal>

      <section className="container-studio py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            {project.description.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted last:mb-0">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal>
              <span className="label">Software used</span>
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

      {/* process gallery */}
      <section className="container-studio border-t border-line py-16 md:py-24">
        <Reveal>
          <span className="label">Process</span>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-2 md:gap-8">
          {Array.from({ length: project.processCount }).map((_, i) => (
            <RenderPlaceholder
              key={i}
              label="Process still"
              index={String(i + 1).padStart(2, "0")}
              aspect={i % 3 === 0 ? "portrait" : "landscape"}
            />
          ))}
        </div>
      </section>

      {/* additional renders */}
      <section className="container-studio border-t border-line py-16 md:py-24">
        <Reveal>
          <span className="label">More from this project</span>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3 md:gap-8">
          {Array.from({ length: project.renderCount }).map((_, i) => (
            <RenderPlaceholder
              key={i}
              label={`${project.title} — Render`}
              index={String(i + 1).padStart(2, "0")}
              aspect="square"
            />
          ))}
        </div>
      </section>

      <section className="container-studio border-t border-line py-16 md:py-24">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label">Next project</span>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-medium leading-none tracking-tighter">
              {next.title}
            </h2>
          </div>
          <Link
            href={`/work/${next.slug}`}
            className="label inline-flex items-center gap-3 border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            View project →
          </Link>
        </Reveal>
      </section>
    </article>
  );
}

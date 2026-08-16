import Link from "next/link";
import type { Project } from "@/lib/projects";
import RenderPlaceholder from "./RenderPlaceholder";
import Reveal from "./Reveal";

export default function WorkCard({
  project,
  reverse = false,
}: {
  project: Project;
  reverse?: boolean;
}) {
  return (
    <Reveal className="group border-t border-line py-16 first:border-t-0 md:py-24">
      <Link
        href={`/work/${project.slug}`}
        data-cursor-label="Смотреть"
        className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12"
      >
        <div
          className={`md:col-span-7 ${
            reverse ? "md:order-2" : "md:order-1"
          }`}
        >
          <RenderPlaceholder
            src={project.cover}
            alt={`${project.title} — обложка`}
            label={`${project.title} — Рендер`}
            index={project.index}
            aspect={project.aspect === "square" ? "square" : "landscape"}
          />
        </div>

        <div
          className={`flex flex-col justify-between md:col-span-5 ${
            reverse ? "md:order-1" : "md:order-2"
          }`}
        >
          <div>
            <span className="label">{project.index}</span>
            <h3 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[0.95] tracking-tighter">
              {project.title}
            </h3>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              {project.summary}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 md:mt-0">
            <span className="label">{project.category}</span>
            <span className="label">{project.year}</span>
            <span className="label text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-300 group-hover:decoration-ink">
              Смотреть проект →
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

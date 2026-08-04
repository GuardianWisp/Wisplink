import Hero from "@/components/Hero";
import WorkCard from "@/components/WorkCard";
import Process from "@/components/Process";
import Reveal from "@/components/Reveal";
import Doodle from "@/components/Doodle";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function HomePage() {
  const years = projects.map((p) => parseInt(p.year, 10)).filter(Boolean);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearRange = minYear === maxYear ? `${minYear}` : `${minYear}–${maxYear}`;

  return (
    <>
      <Hero />

      <section id="work" className="container-studio scroll-mt-24">
        <Reveal className="flex flex-col gap-4 border-t border-line pt-10 md:flex-row md:items-end md:justify-between md:pt-14">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-tighter">
            Избранные проекты
          </h2>
          <span className="label">
            {projects.length.toString().padStart(2, "0")} проектов —{" "}
            {yearRange}
          </span>
        </Reveal>

        <div>
          {projects.map((project, i) => (
            <WorkCard
              key={project.slug}
              project={project}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      <Process />

      <section className="container-studio border-t border-line py-24 md:py-32">
        <Reveal className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[0.98] tracking-tighter md:col-span-8">
            Есть проект, который заслуживает такого же внимания к деталям?
          </h2>
          <div className="relative md:col-span-4 md:justify-self-end">
            <Doodle
              variant="arrow"
              className="absolute -top-10 right-6 w-16 -rotate-12 text-muted"
              delay={0.5}
            />
            <Link
              href="/contact"
              className="label inline-flex items-center gap-3 border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              Обсудить проект →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

import Hero from "@/components/Hero";
import WorkCard from "@/components/WorkCard";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="work" className="container-studio scroll-mt-24">
        <Reveal className="flex flex-col gap-4 border-t border-line pt-10 md:flex-row md:items-end md:justify-between md:pt-14">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-tighter">
            Избранные работы
          </h2>
          <span className="label">
            {projects.length.toString().padStart(2, "0")} проектов — 2023
            &ndash; 2025
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

      <section className="container-studio border-t border-line py-24 md:py-32">
        <Reveal className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[0.98] tracking-tighter md:col-span-8">
            Есть проект, который заслуживает такого же внимания?
          </h2>
          <div className="md:col-span-4 md:justify-self-end">
            <Link
              href="/contact"
              className="label inline-flex items-center gap-3 border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              Начать проект →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

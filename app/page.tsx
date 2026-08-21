import Hero from "@/components/Hero";
import WorkList from "@/components/WorkList";
import Process from "@/components/Process";
import { WorkSectionHeading, HomeCta } from "@/components/HomeSections";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getAllProjects();
  const years = projects.map((p) => parseInt(p.year, 10)).filter(Boolean);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearRange = minYear === maxYear ? `${minYear}` : `${minYear}–${maxYear}`;

  return (
    <>
      <Hero />

      <section id="work" className="container-studio scroll-mt-24">
        <WorkSectionHeading count={projects.length} yearRange={yearRange} />

        <WorkList projects={projects} />
      </section>

      <Process />

      <HomeCta />
    </>
  );
}

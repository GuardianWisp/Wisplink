import Hero from "@/components/Hero";
import WorkList from "@/components/WorkList";
import Process from "@/components/Process";
import { WorkSectionHeading, HomeCta } from "@/components/HomeSections";
import { getAllProjects } from "@/lib/projects";
import { getHomeSettings } from "@/lib/home";

export default function HomePage() {
  const projects = getAllProjects();
  const years = projects.map((p) => parseInt(p.year, 10)).filter(Boolean);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearRange = minYear === maxYear ? `${minYear}` : `${minYear}–${maxYear}`;
  const home = getHomeSettings();

  return (
    <>
      <Hero image={home.image} imageAlt={home.alt} />

      <section id="work" className="container-studio scroll-mt-24">
        <WorkSectionHeading count={projects.length} yearRange={yearRange} />

        <WorkList projects={projects} />
      </section>

      <Process />

      <HomeCta />
    </>
  );
}

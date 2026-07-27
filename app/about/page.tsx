import type { Metadata } from "next";
import RenderPlaceholder from "@/components/RenderPlaceholder";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Forme is a small studio working in three dimensions — 3D design, motion, brand identity and creative direction.",
};

const software = [
  "Cinema 4D",
  "Midjourney",
  "Houdini",
  "Redshift",
  "Substance 3D",
  "ZBrush",
  "After Effects",
  "Figma",
];

const skills = [
  "3D Моделинг",
  "Освещение сцен",
  "Создание материалов",
  "Ai изображения и видео",
  "Дизайн интерфейсов",
  "Симуляции / Нодовые генерации",
  "Моушн и анимации",
];

const experience = [
  { years: "2023 — Present", role: "Фрилансер" },
  { years: "2018 — 2023", role: "Middle 3D Designer, Chipsa Design" },
  { years: "2019 — 2021", role: "Дизайнер интерфейсов" },
];

const services = [
  {
    title: "3D Design",
    description:
      "Still and rendered imagery — product visualization, abstract form studies and key visuals built for print, packaging and screen.",
  },
  {
    title: "Motion Design",
    description:
      "Looping and narrative animation for campaigns, product launches and spatial storytelling, rendered frame-accurate.",
  },
  {
    title: "Brand Identity",
    description:
      "Identity systems built from three-dimensional material rather than a logotype alone — form, light and texture as brand language.",
  },
  {
    title: "Creative Direction",
    description:
      "End-to-end direction for studios and in-house teams who need a singular point of view carried across a full campaign.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-studio py-16 md:py-24">
      <Reveal>
        <span className="label">About</span>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-tightest">
          A small studio, working in a narrow range, deliberately.
        </h1>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-5">
          <RenderPlaceholder label="Portrait" index="—" aspect="portrait" />
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <p className="text-lg leading-relaxed text-muted">
            Forme was founded in 2021 on a simple premise: most 3D work is
            rushed, and it shows. We take on a small number of projects each
            year and give each one the time a physical craft would demand —
            weeks of material study before a single final render.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            The studio is led by a single creative direction, supported by a
            close network of specialist collaborators brought in project by
            project. Clients work with the same person from first sketch to
            final delivery.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            We're based between Amsterdam and Zürich, and work with clients
            across Europe and North America.
          </p>

          <div className="mt-14">
            <span className="label">Experience</span>
            <ul className="mt-5 flex flex-col gap-4">
              {experience.map((item) => (
                <li
                  key={item.role}
                  className="flex flex-col gap-1 border-t border-line pt-4 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="text-sm">{item.role}</span>
                  <span className="font-mono text-xs text-muted">
                    {item.years}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-10 border-t border-line pt-14 md:mt-28 md:grid-cols-2 md:gap-12 md:pt-20">
        <Reveal>
          <span className="label">Skills</span>
          <ul className="mt-5 flex flex-col gap-3">
            {skills.map((skill) => (
              <li key={skill} className="text-base">
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="label">Software</span>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
            {software.map((tool) => (
              <li key={tool} className="text-base">
                {tool}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-20 border-t border-line pt-14 md:mt-28 md:pt-20">
        <Reveal>
          <span className="label">Services</span>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-10 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 0.05}
              className="border-t border-line pt-6"
            >
              <h3 className="text-2xl font-medium tracking-tighter">
                {service.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

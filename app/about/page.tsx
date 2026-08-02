import type { Metadata } from "next";
import RenderPlaceholder from "@/components/RenderPlaceholder";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Обо мне",
  description:
    "3D Generalist и Motion Designer. Специализируюсь на 3D-моделировании, моушн-дизайне, симуляциях и визуале для брендов.",
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
  "AI изображения и видео",
  "Дизайн интерфейсов",
  "Симуляции / Нодовые генерации",
  "Моушн и анимации",
];

const experience = [
  { years: "2023 — Наст. время", role: "3D Generalist / Motion Designer (Freelance)" },
  { years: "2018 — 2023", role: "Middle 3D Designer & UX/UI, Chipsa Design" },
  { years: "2019 — 2021", role: "UX/UI Дизайнер" },
];

const services = [
  {
    title: "3D Дизайн & Визуализация",
    description:
      "Рендеры любой сложности, продуктовая визуализация, реалистичные 3D-мокапы и ключевые визуалы (Key Visuals) для брендов и промо-кампаний.",
  },
  {
    title: "Моушн & Видеоролики",
    description:
      "Динамичная анимация, промо-видео и презентационные ролики для запусков продуктов, сочетающие техническую точность и эстетику.",
  },
  {
    title: "Визуальная концептуализация",
    description:
      "Разработка объемного визуального языка: передача характера бренда через форму, свет, фактуру материалов и движение.",
  },
  {
    title: "AI & Генеративный визуал",
    description:
      "Активная интеграция ИИ в пайплайн: быстрый концепт-арт, нейро-видео и ускорение 3D-продакшна с помощью Midjourney и современных AI-инструментов.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-studio py-16 md:py-24">
      <Reveal>
        <span className="label">Обо мне</span>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-tightest">
          3D Generalist с фокусом на Motion дизайне и Ai.
        </h1>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-5">
          <RenderPlaceholder
            src="./images/portrait.webp"
            alt="Портрет"
            aspect="portrait"
            priority
          />
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <p className="text-lg leading-relaxed text-muted">
            Мой путь в дизайн начался в 2018 году с увлечения трёхмерной графикой. Позже я прошёл обучение в школе дизайна по направлению UX/UI, что дало мне сильную базу в понимании структуры, логики и пользовательского опыта.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            В студии Chipsa я начинал как UX/UI специалист, позже полностью переключился на 3D-контент и графику. Там я работал над крупными проектами: создавал 3D-мокапы, Key Visuals для брендов, рекламные видеоролики и графику для презентаций.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Понимание UX/UI помогает мне делать 3D не просто красивой картинкой, а продуманным инструментом, который работает на задачи продукта и аккуратно вписывается в любой интерфейс или бренд-систему.
          </p>

          <div className="mt-14">
            <span className="label">Опыт работы</span>
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
          <span className="label">Навыки</span>
          <ul className="mt-5 flex flex-col gap-3">
            {skills.map((skill) => (
              <li key={skill} className="text-base">
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="label">Софт</span>
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
          <span className="label">Услуги</span>
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

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  index: string;
  summary: string;
  description: string[];
  software: string[];
  services: string[];
  renderCount: number;
  processCount: number;
  aspect: "portrait" | "landscape" | "square";
  cover: string;
  hero: string;
  renders: string[];
  process: string[];
};

export const projects: Project[] = [
  {
    slug: "biotech",
    title: "Biotech",
    category: "3D Design — Визуализация микроорганизмов",
    year: "2023",
    client: "Artlife Biotech",
    index: "01",
    summary:
      "Визузализация микроаргонизмов для компании Artlife.",
    description: [
      "biotech began as an exercise in restraint — how little geometry is needed to describe weight, texture and material truth. The brief called for a set of key visuals that could carry a mineral skincare line across packaging, print and digital without leaning on photography.",
      "We built a small library of eroded, sediment-like forms and lit them the way a geologist might document a core sample: flat, even, unsentimental. The palette was drawn entirely from the minerals themselves — no colour was added in post.",
      "The result is a system of eleven renders that the client continues to draw from a year later, extended for new products without a single reshoot.",
    ],
    software: ["Cinema 4D", "Redshift", "Substance 3D", "Figma"],
    services: ["3D Design", "Creative Direction"],
    renderCount: 2,
    processCount: 2,
    aspect: "landscape",
    cover: "/images/projects/biotech/cover.webp",
    hero: "/images/projects/biotech/hero.webp",
    renders: [
      "/images/projects/biotech/render-01.webp",
      "/images/projects/biotech/render-02.webp",
    ],
    process: [
      "/images/projects/biotech/process-01.webp",
      "/images/projects/biotech/process-02.webp",
    ],
  },
  {
    slug: "kozhindev",
    title: "Оформление кейсов для KozhinDev",
    category: "3D Motion & Презентация кейсов",
    year: "2024",
    client: "KozhinDev",
    index: "02",
    summary:
      "Визуальная 3D-система и графический пак для презентации проектов и оформления кейсов IT-студии.",
    description: [
      "Цель проекта — сформировать современный визуальный язык для презентации цифровых продуктов kozhindev. Вместо стандартной плоской демонстрации интерфейсов упор был сделан на объёмные 3D-композиции, атмосферные сцены и кинематографичный свет, повышающие воспринимаемую ценность разработок.",
      "Для проекта был разработан комплект модульных 3D-ассетов, кей-визуалов и анимационных элементов. Использование процедурных текстур, глубокой работы с освещением и мягких облетов камеры позволило превратить абстрактные технологические решения в понятные и запоминающиеся визуальные образы.",
      "Дизайн интерфейсов (UI/UX) предоставлен командой kozhindev. Со своей стороны я полностью отвечал за построение 3D-сцен, работу со светом и материалами, композицию, моушн-дизайн и финальную сборку графического пака.",
    ],
    software: ["Cinema 4D", "Redshift", "After Effects", "Figma"],
    services: ["3D Generalist", "Motion Design", "Visual Direction"],
    renderCount: 9,
    processCount: 3,
    aspect: "landscape",
    cover: "/images/projects/kozhindev/cover.webp",
    hero: "/images/projects/kozhindev/hero.webp",
    renders: [
      "/images/projects/kozhindev/render-01.webp",
      "/images/projects/kozhindev/render-02.webp",
      "/images/projects/kozhindev/render-03.webp",
      "/images/projects/kozhindev/render-04.webp",
      "/images/projects/kozhindev/render-05.webp",
      "/images/projects/kozhindev/render-06.webp",
      "/images/projects/kozhindev/render-07.webp",
      "/images/projects/kozhindev/render-08.webp",
    ],
    process: [
      "/images/projects/kozhindev/process-01.webp",
      "/images/projects/kozhindev/process-02.webp",
      "/images/projects/kozhindev/process-03.webp",
    ],
  },
  {
    slug: "aperture",
    title: "Aperture",
    category: "Motion Design — Campaign",
    year: "2024",
    client: "Aperture Optics",
    index: "03",
    summary:
      "A twelve-second loop exploring how glass bends light, built for an eyewear launch.",
    description: [
      "Aperture Optics wanted a single moving image that could run silently in a shop window and carry the same weight as a thirty-second broadcast spot. We chose to slow everything down instead of speeding it up.",
      "A single lens, a single light source, and twelve seconds of refraction — rendered at a resolution high enough to hold up on a five-metre storefront screen.",
      "The loop has since run in fourteen cities with no edits, a rare outcome for a campaign asset built this early in a product's life.",
    ],
    software: ["Houdini", "Redshift", "After Effects", "DaVinci Resolve"],
    services: ["Motion Design", "Creative Direction"],
    renderCount: 4,
    processCount: 3,
    aspect: "landscape",
    cover: "/images/projects/aperture/cover.webp",
    hero: "/images/projects/aperture/hero.webp",
    renders: [
      "/images/projects/aperture/render-01.webp",
      "/images/projects/aperture/render-02.webp",
    ],
    process: [
      "/images/projects/aperture/process-01.webp",
      "/images/projects/aperture/process-02.webp",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
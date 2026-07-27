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
      "A study of biological structures translated into a futuristic 3D visual system.",
    description: [
      "biotech began as an exercise in restraint — how little geometry is needed to describe weight, texture and material truth. The brief called for a set of key visuals that could carry a mineral skincare line across packaging, print and digital without leaning on photography.",
      "We built a small library of eroded, sediment-like forms and lit them the way a geologist might document a core sample: flat, even, unsentimental. The palette was drawn entirely from the minerals themselves — no colour was added in post.",
      "The result is a system of eleven renders that the client continues to draw from a year later, extended for new products without a single reshoot.",
    ],
    software: ["Cinema 4D", "Redshift", "Substance 3D", "Photoshop"],
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
    slug: "ballast",
    title: "Ballast",
    category: "3D Design — Brand Identity",
    year: "2025",
    client: "Ballast Freight Co.",
    index: "02",
    summary:
      "A modular identity system built from a single extruded form, used to signal weight and reliability.",
    description: [
      "Ballast needed an identity that could feel industrial without feeling cold. Rather than start from a logotype, we started from a single extruded steel form and let the mark emerge from how that form could be lit, cropped and repeated.",
      "The system scales from a single hero render on the homepage to a set of sixty-four generated variations used across the client's fleet livery — all rendered from the same base geometry.",
      "Motion was treated as a material property, not decoration: every animated transition follows the physical logic of the object rotating under a fixed light.",
    ],
    software: ["Blender", "Octane", "After Effects", "Figma"],
    services: ["Brand Identity", "3D Design", "Motion Design"],
    renderCount: 5,
    processCount: 5,
    aspect: "landscape",
    cover: "/images/projects/ballast/cover.webp",
    hero: "/images/projects/ballast/hero.webp",
    renders: [
      "/images/projects/ballast/render-01.webp",
      "/images/projects/ballast/render-02.webp",
    ],
    process: [
      "/images/projects/ballast/process-01.webp",
      "/images/projects/ballast/process-02.webp",
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
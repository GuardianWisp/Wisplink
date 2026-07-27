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
};

export const projects: Project[] = [
  {
    slug: "silt",
    title: "Silt",
    category: "3D Design — Product Visualization",
    year: "2025",
    client: "Private Client",
    index: "01",
    summary:
      "A study of sediment and light, translated into a series of still forms for a mineral skincare line.",
    description: [
      "Silt began as an exercise in restraint — how little geometry is needed to describe weight, texture and material truth. The brief called for a set of key visuals that could carry a mineral skincare line across packaging, print and digital without leaning on photography.",
      "We built a small library of eroded, sediment-like forms and lit them the way a geologist might document a core sample: flat, even, unsentimental. The palette was drawn entirely from the minerals themselves — no colour was added in post.",
      "The result is a system of eleven renders that the client continues to draw from a year later, extended for new products without a single reshoot.",
    ],
    software: ["Cinema 4D", "Redshift", "Substance 3D", "Photoshop"],
    services: ["3D Design", "Creative Direction"],
    renderCount: 4,
    processCount: 4,
    aspect: "portrait",
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
  },
  {
    slug: "quarry",
    title: "Quarry",
    category: "3D Design — Editorial",
    year: "2024",
    client: "Field Journal",
    index: "04",
    summary:
      "A set of abstract stone compositions commissioned for a magazine feature on material honesty.",
    description: [
      "Field Journal approached us for a portfolio of images to accompany a long-form piece on material honesty in architecture. Rather than illustrate the article literally, we built eight compositions that behave like quarried stone photographed in a studio — heavy, quiet, slightly imperfect.",
      "Each form was sculpted procedurally and then hand-finished, keeping just enough irregularity to avoid looking synthetic.",
      "Two of the eight images were later licensed for the magazine's cover and a gallery print run.",
    ],
    software: ["ZBrush", "Cinema 4D", "Redshift"],
    services: ["3D Design"],
    renderCount: 4,
    processCount: 4,
    aspect: "portrait",
  },
  {
    slug: "meridian",
    title: "Meridian",
    category: "Brand Identity — Spatial",
    year: "2023",
    client: "Meridian Architecture",
    index: "05",
    summary:
      "An identity expressed entirely through light and shadow cast across architectural models.",
    description: [
      "Meridian Architecture wanted an identity that lived in the same material world as their buildings. We built a set of physical-feeling 3D forms and let the studio's mark exist only as the shadow they cast — no applied logotype anywhere in the system.",
      "Every touchpoint, from business cards to the practice's website, derives its layout from the angle of a single fixed light source at a specific latitude.",
      "The system was presented to the practice's partners as a working model before a single pixel was finalised — a process we've since repeated with three other studios.",
    ],
    software: ["Blender", "Cycles", "Illustrator", "Figma"],
    services: ["Brand Identity", "Creative Direction"],
    renderCount: 5,
    processCount: 4,
    aspect: "square",
  },
  {
    slug: "vessel",
    title: "Vessel",
    category: "3D Design — Product Visualization",
    year: "2023",
    client: "Vessel Ceramics",
    index: "06",
    summary:
      "Hero renders for a ceramics studio, built to be indistinguishable from a kiln photograph.",
    description: [
      "Vessel Ceramics needed hero imagery for a new collection before the first physical piece had been fired. We modelled each form from the maker's sketches and technical drawings, then spent the bulk of the project on glaze and light — the two things that make ceramics feel real.",
      "The final renders were shown alongside the physical pieces at launch and most visitors could not tell which was which.",
      "This project became the studio's internal benchmark for material realism in still imagery.",
    ],
    software: ["Cinema 4D", "Redshift", "Substance 3D"],
    services: ["3D Design"],
    renderCount: 4,
    processCount: 3,
    aspect: "portrait",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

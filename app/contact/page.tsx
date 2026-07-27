import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Forme about a new 3D design, motion, brand identity or creative direction project.",
};

const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Are.na", href: "https://are.na" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

const details = [
  {
    label: "Studio",
    value: "Amsterdam & Zürich",
  },
  {
    label: "Availability",
    value: "A small number of new partnerships each year",
  },
  {
    label: "Response time",
    value: "Within two working days",
  },
];

export default function ContactPage() {
  return (
    <div className="container-studio py-16 md:py-24">
      <Reveal>
        <span className="label">Contact</span>
        <h1 className="mt-4 max-w-2xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-tightest">
          Let's talk about the work.
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="mt-16 border-t border-line pt-12 md:mt-24 md:pt-16">
        <span className="label">Email</span>
        <a
          href="mailto:studio@forme.design"
          className="mt-4 block text-[clamp(2rem,6vw,4.5rem)] font-medium leading-none tracking-tighter transition-colors duration-300 hover:text-muted"
        >
          studio@forme.design
        </a>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-12 border-t border-line pt-12 md:mt-20 md:grid-cols-12 md:gap-12 md:pt-16">
        <Reveal delay={0.05} className="md:col-span-6">
          <span className="label">Details</span>
          <dl className="mt-5 flex flex-col gap-5">
            {details.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 border-t border-line pt-4 first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <dt className="label">{item.label}</dt>
                <dd className="text-base text-muted sm:max-w-xs sm:text-right">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          <span className="label">Follow</span>
          <ul className="mt-5 flex flex-col gap-3">
            {social.map((item) => (
              <li
                key={item.label}
                className="border-t border-line pt-3 first:border-t-0 first:pt-0"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-lg tracking-tight transition-colors duration-300 hover:text-muted"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}

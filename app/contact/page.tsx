import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Doodle from "@/components/Doodle";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь со мной для обсуждения проектов по 3D-графике, моушн-дизайну и визуальным концептам.",
};

const social = [
  { label: "Telegram", href: "https://t.me/wispsoul" },
  { label: "Behance", href: "https://behance.net/wisplink" },
  { label: "Instagram", href: "https://instagram.com/wisplink" },
  { label: "LinkedIn", href: "https://linkedin.com/in/wisplink" },
];

const details = [
  {
    label: "Локация",
    value: "Россия / Удаленно",
  },
  {
    label: "Формат работы",
    value: "Фриланс, проектная занятость",
  },
  {
    label: "Время ответа",
    value: "В течение нескольких часов",
  },
];

export default function ContactPage() {
  return (
    <div className="container-studio py-16 md:py-24">
      <Reveal>
        <span className="label">Контакты</span>
        <h1 className="mt-4 max-w-2xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-tightest">
          Давайте обсудим ваш проект.
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="relative mt-16 border-t border-line pt-12 md:mt-24 md:pt-16">
        <Doodle
          variant="spark"
          className="absolute right-0 top-8 w-6 text-muted md:top-12 md:w-8"
          delay={0.6}
        />
        <span className="label">Email</span>
        <a
          href="mailto:wisplink@icloud.com"
          className="mt-4 block text-[clamp(2rem,6vw,4.5rem)] font-medium leading-none tracking-tighter transition-colors duration-300 hover:text-muted"
        >
          wisplink@icloud.com
        </a>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-12 border-t border-line pt-12 md:mt-20 md:grid-cols-12 md:gap-12 md:pt-16">
        <Reveal delay={0.05} className="md:col-span-6">
          <span className="label">Детали</span>
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
          <span className="label">Соцсети & Связь</span>
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

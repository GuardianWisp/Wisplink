import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "Обо мне",
  description:
    "AI-дизайнер и Motion Designer. Держу AI в центре процесса — от концепта до продакшна — и работаю через 3D, моушн и интерфейсы.",
};

export default function AboutPage() {
  return <AboutContent />;
}

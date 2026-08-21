import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "Обо мне",
  description:
    "AI-дизайнер и 3D-дженералист. Держу AI в центре процесса — от концепта до продакшна — и работаю через UX/UI и 3D.",
};

export default function AboutPage() {
  return <AboutContent />;
}

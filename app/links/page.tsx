import type { Metadata } from "next";
import LinksContent from "@/components/LinksContent";

export const metadata: Metadata = {
  title: "Все ссылки",
  description: "Портфолио, журнал, CV и соцсети — Wisplink, AI-дизайнер.",
};

export default function LinksPage() {
  return <LinksContent />;
}

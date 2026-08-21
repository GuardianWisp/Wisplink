import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь со мной для обсуждения проектов по AI-дизайну, 3D-графике, моушн-дизайну и визуальным концептам.",
};

export default function ContactPage() {
  return <ContactContent />;
}

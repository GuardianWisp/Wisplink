import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Добавили поддержку кириллицы
const inter = Inter({
  subsets: ["latin", "cyrillic"], // 👈 добавлена кириллица
  variable: "--font-inter",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"], // 👈 добавлена кириллица
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://isaevnikita.tilda.ws/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Никита Исаев — 3D Generalist & Motion Designer",
    template: "%s — Никита Исаев", // 👈 Каждая страница будет именоваться как "Заголовок — Никита Исаев"
  },
  description:
    "Портфолио 3D Generalist и Motion Designer. 3D-визуализация, моушн-дизайн, мокапы и концепты для брендов.",
  keywords: [
    "3D generalist",
    "motion designer",
    "3D дизайн",
    "моушн дизайн",
    "3D мокапы",
    "key visuals",
    "CGI",
  ],
  openGraph: {
    title: "Никита Исаев — 3D Generalist & Motion Designer",
    description:
      "Портфолио 3D Generalist и Motion Designer. Избранные проекты по 3D, моушн-дизайну и визуальным концептам.",
    url: siteUrl,
    siteName: "Никита Исаев",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Никита Исаев — 3D Generalist & Motion Designer",
    description:
      "Портфолио 3D Generalist и Motion Designer. Избранные проекты по 3D, моушн-дизайну и визуальным концептам.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${mono.variable}`}> {/* 👈 Изменили lang="en" на lang="ru" */}
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Перейти к содержимому
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
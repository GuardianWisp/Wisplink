import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://guardianwisp.github.io/Wisplink";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wisplink — 3D-генералист, фриланс",
    template: "%s — Wisplink",
  },
  description:
    "Wisplink — портфолио фрилансера, 3D-генералиста. 3D-дизайн, моушн-дизайн, айдентика и креативное направление для клиентов, которые ценят точность и сдержанность.",
  keywords: [
    "3D генералист",
    "3D графика",
    "моушн дизайн",
    "фрилансер 3D",
    "брендинг",
    "креативное направление",
  ],
  openGraph: {
    title: "Wisplink — 3D-генералист, фриланс",
    description:
      "Фрилансер, работающий в трёхмерной графике. Избранные работы по 3D, моушну и айдентике.",
    url: siteUrl,
    siteName: "Wisplink",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wisplink — 3D-генералист, фриланс",
    description:
      "Фрилансер, работающий в трёхмерной графике. Избранные работы по 3D, моушну и айдентике.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased font-sans">
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
        <ScrollProgress />
        <GrainOverlay />
        <CustomCursor />
      </body>
    </html>
  );
}

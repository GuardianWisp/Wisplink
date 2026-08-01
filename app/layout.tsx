import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://guardianwisp.github.io/Wisplink";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wisplink — 3D Generalist & Freelance Designer",
    template: "%s — Wisplink",
  },
  description:
    "Wisplink is the portfolio of a freelance 3D generalist, producing 3D design, motion, brand identity and creative direction for clients who value precision and restraint.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">

        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to content
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
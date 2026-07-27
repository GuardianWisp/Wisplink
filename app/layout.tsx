import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://isaevnikita.tilda.ws/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Forme — Studio for Three-Dimensional Form",
    template: "%s — Forme",
  },
  description:
    "Forme is a design studio working in three dimensions. We produce 3D design, motion, brand identity and creative direction for clients who value precision and restraint.",
  keywords: [
    "3D design studio",
    "3D graphic design",
    "motion design",
    "brand identity",
    "creative direction",
    "CGI studio",
  ],
  openGraph: {
    title: "Forme — Studio for Three-Dimensional Form",
    description:
      "A design studio working in three dimensions. Selected 3D, motion and identity work.",
    url: siteUrl,
    siteName: "Forme",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forme — Studio for Three-Dimensional Form",
    description:
      "A design studio working in three dimensions. Selected 3D, motion and identity work.",
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
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
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

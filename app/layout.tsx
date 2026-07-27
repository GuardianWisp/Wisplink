import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google"; // 1. Импортируем шрифт

// 2. Настраиваем шрифт
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata = {
  title: "Wisplink",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}> {/* 3. Добавляем класс к <html> */}
      <body className="bg-background text-foreground antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
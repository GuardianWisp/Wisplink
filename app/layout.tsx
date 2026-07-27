import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
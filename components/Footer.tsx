import Link from "next/link";

const social = [
  { label: "Instagram", href: "https://instagram.com/wisplink/" },
  { label: "Telegram", href: "https://t.me/wispsoul" }, // 
  { label: "Behance", href: "https://behance.net/wisplink" },
  { label: "LinkedIn", href: "https://linkedin.com/in/wisplink" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-studio flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between md:py-14">
        {/* Блок бренда */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm tracking-label text-ink">
            НИКИТА ИСАЕВ
          </span>
          <span className="label">3D Generalist & Motion Designer</span>
        </div>

        {/* Навигация по соцсетям */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="label text-ink transition-colors duration-300 hover:text-muted"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Контакты и копирайт */}
        <div className="flex flex-col gap-1 md:items-end">
          <a
            href="mailto:wisplink@icloud.com" // 👈 
            className="label text-ink transition-colors duration-300 hover:text-muted"
          >
            wisplink@icloud.com
          </a>
          <span className="label">
            &copy; {new Date().getFullYear()} Wisplink          </span>
        </div>
      </div>

      <div className="container-studio pb-10">
        <Link href="#main" className="label text-faint hover:text-muted">
          Наверх ↑
        </Link>
      </div>
    </footer>
  );
}
import Link from "next/link";

const social = [
  { label: "Instagram", href: "https://instagram.com/wisplink/" },
  { label: "Behance", href: "https://behance.net/wisplink" },
  { label: "LinkedIn", href: "https://linkedin.com/in/wisplink" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-studio flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between md:py-14">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm tracking-label text-ink">
            FORME
          </span>
          <span className="label">Studio for three-dimensional form</span>
        </div>

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

        <div className="flex flex-col gap-1 md:items-end">
          <a
            href="mailto:studio@forme.design"
            className="label text-ink transition-colors duration-300 hover:text-muted"
          >
            studio@forme.design
          </a>
          <span className="label">
            &copy; {new Date().getFullYear()} Forme. All rights reserved.
          </span>
        </div>
      </div>
      <div className="container-studio pb-10">
        <Link href="/" className="label text-faint hover:text-muted">
          Back to top
        </Link>
      </div>
    </footer>
  );
}

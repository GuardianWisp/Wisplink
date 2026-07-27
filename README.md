# Forme — Studio Portfolio

A premium, minimalist portfolio for a 3D design studio. Built with
Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion.

The UI is intentionally quiet — large type, generous whitespace and a
single hairline-grey palette — so that the 3D artwork itself is the only
thing carrying colour. Every render slot in the site is currently a
placeholder ready to be swapped for real work.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## Folder structure

```
app/
  layout.tsx          Root layout — fonts, metadata, Nav/Footer
  page.tsx             Home — Hero + Selected Work
  about/page.tsx        About — bio, skills, software, services
  contact/page.tsx      Contact — email + details
  work/[slug]/page.tsx   Project detail — fullscreen render, process, gallery
  sitemap.ts / robots.ts SEO
components/
  Nav.tsx, Footer.tsx
  Hero.tsx
  WorkCard.tsx           Large project card used in the work grid
  RenderPlaceholder.tsx  Placeholder for every future 3D render
  Reveal.tsx             Shared scroll-fade animation wrapper
data/
  projects.ts            All project content — edit here to add/change work
```

## Adding or editing projects

Everything about a project — title, category, year, description,
software list and image counts — lives in `data/projects.ts`. Add a new
object to the `projects` array and a project page is generated
automatically at `/work/<slug>`, including static params for the build.

## Replacing placeholders with real renders

Every render in the site goes through `components/RenderPlaceholder.tsx`.
To swap in a real image or video:

1. Add the asset under `public/` (or use a remote URL with `next/image`).
2. Replace the placeholder's inner `div` with `next/image` (for stills) or
   a native `<video>` element (for loops), keeping the same wrapping
   `motion.div` so hover/reveal behaviour is unchanged.
3. Remove the `label`/`index` overlay once a real image is in place.

## Design tokens

Defined in `tailwind.config.ts`:

| Token   | Value      | Use                          |
| ------- | ---------- | ----------------------------- |
| paper   | `#FFFFFF`  | Background                    |
| ink     | `#111111`  | Primary text                  |
| muted   | `#777777`  | Secondary text                |
| line    | `#E6E6E4`  | Hairline dividers              |
| panel   | `#F1F1EF`  | Placeholder render fill        |

Typography: Inter (grotesque, weight-driven hierarchy) for display and
body copy, IBM Plex Mono for labels, indices and metadata — a deliberate
nod to technical/production data (`SOFTWARE USED`, `01`, `2025`).

## Deploying to GitHub Pages

The site is a fully static export (no server-side rendering, no API
routes), so GitHub Pages works out of the box. This is already wired up:

- `next.config.js` sets `output: "export"` and auto-detects the correct
  `basePath` when building inside GitHub Actions.
- `.github/workflows/deploy.yml` builds the site and publishes it to
  Pages on every push to `main`.
- `public/.nojekyll` stops GitHub Pages' Jekyll processor from ignoring
  the `_next/` folder.

**One-time setup:**

1. Push this project to a GitHub repository.
2. In the repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
   The site will be live at `https://<your-username>.github.io/<repo-name>/`.

If your repo is named `<your-username>.github.io` (a user/org page), the
site is served from the domain root and no `basePath` prefix is added —
this is also detected automatically.

**Building the static export manually (no GitHub Actions):**

```bash
npm run build
```

Output goes to the `out/` folder — upload its contents to any static
host (Pages, Netlify, S3, etc).

## Accessibility & performance notes

- Visible focus states on every interactive element (`:focus-visible`).
- `prefers-reduced-motion` disables all animation/scroll-smoothing.
- Semantic headings, labelled form fields, skip-to-content link.
- Static generation for all project pages; no client-side data fetching
  on first paint.

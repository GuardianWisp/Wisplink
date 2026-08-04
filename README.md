# Wisplink — Personal Portfolio

A premium, minimalist portfolio for a freelance 3D generalist. Built with
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
  ProjectCarousel.tsx    Embla carousel — hero highlight reel on the project page
  ProjectGallery.tsx     Interleaved render/process grid + fullscreen lightbox
  RenderPlaceholder.tsx  Placeholder for every future 3D render
  Reveal.tsx             Shared scroll-fade animation wrapper
data/
  projects.ts            All project content — edit here to add/change work
```

## Adding or editing projects

Everything about a project — title, category, year, description,
software list and images — lives in `data/projects.ts`. Add a new object
to the `projects` array and a project page is generated automatically at
`/work/<slug>`, including static params for the build.

Each project has:

```ts
cover: string;             // thumbnail shown on the homepage work list
hero: string;               // fullscreen image at the top of the project page
renders: GalleryImage[];    // gallery — final render images, in order
process: GalleryImage[];    // gallery — process/behind-the-scenes images, in order
```

Drop the actual image files under `public/images/projects/<slug>/` and
point these fields at them (e.g. `/images/projects/silt/cover.webp`).
`renders` and `process` can hold any number of images — the gallery on
the project page builds itself from however many you provide, in an
interleaved, asymmetric grid (see `components/ProjectGallery.tsx`).

Leave `renders`/`process` empty (`[]`) and that project's Gallery section
simply won't render. Leave `cover` or `hero` as an empty string and that
specific spot falls back to a placeholder box automatically — no other
code changes needed.

### Controlling how much space an image gets

A `GalleryImage` is either just a path, or an object when you want to
control its size in the grid:

```ts
renders: [
  "/images/projects/silt/render-01.webp",                              // automatic size
  { src: "/images/projects/silt/render-02.webp", size: "xl" },          // full-width feature
  { src: "/images/projects/silt/render-03.webp", size: "sm" },          // small accent tile
  { src: "/images/projects/silt/render-04.webp", size: "lg", aspect: "portrait" }, // size + aspect override
],
```

`size` is `"sm" | "md" | "lg" | "xl"`. Leave it off and the image falls
back to an automatic rhythm (`components/ProjectGallery.tsx` →
`defaultSizeCycle`) so a plain list of paths still looks considered with
zero curation. `aspect` is optional too — each size already has a
sensible default aspect ratio; only set it if you want e.g. a tall
portrait crop on a large tile.

The grid uses `grid-flow-row-dense`, so any mix of sizes in any order
packs cleanly with no leftover gaps — put your best shot at `xl` wherever
it falls in the sequence, no need to reorder anything around it.

## How images render

`components/RenderPlaceholder.tsx` is the one component every image in
the site goes through — homepage cards, the project hero, and every
gallery/lightbox image. Pass it a `src` and it renders the real image
(via `next/image`, object-cover, with the site's hover-zoom and hairline
border already applied); omit `src` and it shows a "Render pending"
placeholder box instead. This means a project can mix real and
not-yet-shot images with zero extra markup.

## Hero carousel vs. gallery grid

The project page has two ways to browse images, deliberately not
overlapping:

- **`ProjectCarousel.tsx`** (top of the page) — an Embla carousel showing
  a curated highlight reel: `project.hero` plus the first four items in
  `project.renders`. One large slide at a time, thin hairline arrows,
  and a progress line instead of dots (keeps the editorial tone). This
  is the first impression — a handful of the best shots.
- **`ProjectGallery.tsx`** (further down) — the full, interleaved
  render + process set in an asymmetric grid with a fullscreen lightbox.
  This is the complete archive for anyone who wants to go deeper.

Showing the same images in both would be redundant, so the carousel
intentionally only pulls from the front of `renders` — adjust the slice
in `app/work/[slug]/page.tsx` (`project.renders.slice(0, 4)`) if you
want more or fewer highlight slides.

## Hand-drawn accents (Doodle.tsx)

`components/Doodle.tsx` adds small, thin monoline SVG marks — an
underline, a loose circle, an arrow, a spark — as "margin note" style
accents (editorial, not cartoon). A few are already placed: under the
hero headline, pointing at the homepage CTA, circling "404", and beside
the email on the contact page.

```tsx
<div className="relative">
  <Doodle
    variant="underline" // "underline" | "circle" | "arrow" | "spark"
    className="absolute -bottom-2 left-0 w-full" // position + size it here
    color="text-ink" // or "text-muted"
  />
  Your content
</div>
```

Rules that keep it from hurting responsiveness or clutter:
- Always `absolute`-positioned inside a `relative` parent — doodles are
  decorative and sit outside the document flow, so they can never shift
  or wrap surrounding layout.
- Hidden below the `md` breakpoint automatically (built into the
  component) — there's rarely room for them on mobile.
- Use sparingly — one or two per page reads as intentional; more starts
  to look decorative rather than editorial.



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

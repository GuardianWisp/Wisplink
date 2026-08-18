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
  page.tsx             Home — Hero + Selected Work + Process + CTA
  about/page.tsx        About — bio, skills, software, services, CV download
  contact/page.tsx      Contact — email + details
  work/[slug]/page.tsx   Project detail — carousel, description, gallery
  blog/page.tsx          Blog archive
  blog/[slug]/page.tsx    Blog post
  admin/page.tsx          Decap CMS editor — see "Decap CMS" below
  admin/config.yml/route.ts  Serves the CMS schema Decap auto-discovers
  api/auth, api/callback   GitHub OAuth for the admin editor
  sitemap.ts / robots.ts SEO
components/
  Nav.tsx, Footer.tsx
  Hero.tsx, Process.tsx
  WorkCard.tsx           Large project card used in the work grid
  ProjectCarousel.tsx    Embla carousel — hero highlight reel on the project page
  ProjectGallery.tsx     Interleaved render/process grid + fullscreen lightbox
  RenderPlaceholder.tsx  Placeholder for every future 3D render
  MdxContent.tsx         Styled MDX renderer for blog posts
  Doodle.tsx, CustomCursor.tsx, GrainOverlay.tsx, ScrollProgress.tsx  Atmosphere
  Reveal.tsx             Shared scroll-fade animation wrapper
data/
  social.ts               Social links + email — shared by Footer, Contact, /links
content/
  projects/*.mdx           Project case studies — see "Adding or editing projects" below
  posts/*.mdx              Blog posts — see "Blog / Журнал" below
lib/
  projects.ts              Reads + parses content/projects at build time
  posts.ts                 Reads + parses content/posts at build time
  site.ts                   Canonical site URL, configurable via env var
```

## Tag filters

Both the homepage project list and the blog archive have a tag filter
row above the list — built automatically from whatever tags exist in
the data, no separate list to maintain:

- **Projects** — filters by each project's `services` array (already
  used for the "Услуги" field on the project page, doing double duty).
  Add a new value to any project's `services` and it shows up as a
  filter automatically.
- **Blog posts** — filters by the `tags` field in each post's
  frontmatter. Same idea — add a tag to a post's frontmatter and it
  appears as a filter button on `/blog`.

The filter row only renders when there's more than one distinct tag —
a single-tag site just shows the plain list, no empty "Все" button.

## Adding or editing projects

Each project is its own file — **`content/projects/<slug>.mdx`** — same
pattern as blog posts. Add a new file and a project page is generated
automatically at `/work/<slug>`, including static params for the build.
No central list to edit, no risk of breaking a different project's
object while editing one.

Naming the file *is* what sets the URL — a `slug` field in frontmatter
is optional and only there for the Decap CMS editor's convenience (see
"Decap CMS" below); the site itself always reads the slug from the
filename.

```mdx
---
title: "Название проекта"
category: "3D Design — Product Visualization"
year: "2025"
client: "Имя клиента"
index: "05"                # controls sort order across the site
summary: "Одно-два предложения для карточки в списке проектов."
software: ["Cinema 4D", "Redshift"]
services: ["3D Design", "Creative Direction"]   # also powers the tag filter
aspect: "landscape"          # "portrait" | "landscape" | "square" — homepage card shape
cover: "/images/projects/slug/cover.webp"
hero: "/images/projects/slug/hero.webp"
renders: []
process: []
---

Описание проекта — обычный Markdown/MDX. Поддерживает `##` заголовки,
**жирный текст**, ссылки, `> цитаты`, списки и `![картинки](/images/...)`,
не только голый текст абзацами.
```

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

A `GalleryImage` in `renders`/`process` is either just a path, or a map
when you want to control its size in the grid — in frontmatter (YAML),
that looks like:

```yaml
renders:
  - "/images/projects/silt/render-01.webp"          # automatic size
  - src: "/images/projects/silt/render-02.webp"
    size: xl                                         # full-width feature
  - src: "/images/projects/silt/render-03.webp"
    size: sm                                          # small accent tile
  - src: "/images/projects/silt/render-04.webp"
    size: lg
    aspect: portrait                                    # size + aspect override
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

## Link-in-bio page (`/links`)

A standalone, mobile-first page for pasting into an Instagram/Telegram
bio — avatar, name, and a stack of full-width buttons (portfolio,
projects, blog, email, CV, social). It deliberately has **no site
Nav/Footer** — both components check `usePathname()` and render nothing
on `/links`, so the page is just itself with no extra chrome to scroll
past on a phone.

Social links and the contact email live in one place —
**`data/social.ts`** — shared by the Footer, Contact page and this page.
Edit there once; it updates everywhere.

## Blog / Журнал

Real content, written as `.mdx` files — supports headings, paragraphs,
links, blockquotes, lists and images, styled to match the site's own
type system (not generic Tailwind Typography defaults).

**Add a post:** create `content/posts/<slug>.mdx` with frontmatter:

```mdx
---
title: "Заголовок поста"
date: "2025-08-12"        # ISO date — controls sort order on /blog
excerpt: "Одно-два предложения для карточки в архиве."
tags: ["процесс", "AI"]    # optional
---

Текст поста — обычный Markdown/MDX. Поддерживаются `##` заголовки,
**жирный текст**, [ссылки](/), `> цитаты`, списки и `![картинки](/images/...)`.
```

That's it — no other file needs editing. `/blog` (archive) and
`/blog/<slug>` (post page) are generated automatically from whatever's
in `content/posts/`, the same static-generation pattern as `/work/<slug>`.
Delete the two example posts in that folder whenever you're ready to
publish your own.

Under the hood: `lib/posts.ts` reads the folder + parses frontmatter
(`gray-matter`) at build time; `next-mdx-remote/rsc` renders the MDX
body as a Server Component — both are static-export-safe, nothing here
needs a runtime server.

## "How I work" section + CV download

`components/Process.tsx` is a 4-step section on the homepage, between
Selected Work and the closing CTA — edit the `steps` array directly in
that file to change the copy.

The About page has a "Скачать CV →" button linking to `public/cv.pdf`.
**A placeholder PDF is already there** so the link isn't broken by
default — replace `public/cv.pdf` with your real resume, same filename,
nothing else to change.

## Atmosphere components

Three small, purely decorative components mounted once in `app/layout.tsx`,
each with a built-in safety rail so they can't hurt responsiveness or a11y:

- **`CustomCursor.tsx`** — dot + trailing ring cursor, grows and shows a
  label over `<a>`/`<button>`/`[data-cursor]` elements. Only activates
  after confirming a real mouse via `matchMedia("(hover: hover) and
  (pointer: fine)")` — never touches touch/mobile devices, and renders
  nothing until that check passes. Add `data-cursor-label="..."` to any
  element for a custom label (already on project cards and every
  clickable gallery image).
- **`GrainOverlay.tsx`** — static SVG noise, ~4.5% opacity, `mix-blend-
  multiply`. No animation, no JS cost after first paint — just texture.
- **`ScrollProgress.tsx`** — hairline vertical rail on the right edge
  that fills as you scroll the page. `hidden md:block` — skipped on
  mobile where there's no margin for it.

**`Doodle.tsx`** — thin monoline SVG marks (underline, circle, arrow,
spark) as "margin note" style accents. Used sparingly on purpose — right
now just the `spark` beside the email on the Contact page. Other variants
exist in the component if you want to add an accent elsewhere:

```tsx
<div className="relative">
  <Doodle
    variant="spark" // "underline" | "circle" | "arrow" | "spark"
    className="absolute right-0 top-8 w-6" // position + size it here
  />
  Your content
</div>
```

Always wrap in a `relative` parent — the doodle is `absolute`, so it sits
outside the document flow and can never affect layout. Hidden below the
`md` breakpoint automatically.

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

## Decap CMS (`/admin`)

A git-based editor that talks **only to GitHub and this site itself** —
no third-party CMS cloud service in the loop, so nothing to be blocked
or need a VPN for. The admin UI (`app/admin/page.tsx`), the CMS schema
it auto-discovers (`app/admin/config.yml/route.ts` — a route, not a
static file, so it can inject the right domain automatically instead of
it being hardcoded), and the two API routes login needs
(`app/api/auth`, `app/api/callback`) are already written. What's left
is creating your own GitHub OAuth App — this part needs your GitHub
login, can't be done for you:

1. On GitHub: **Settings → Developer settings → OAuth Apps → New OAuth
   App**.
2. Fill in:
   - **Homepage URL**: your site's URL (e.g. `https://wisplink.vercel.app`)
   - **Authorization callback URL**: the same URL + `/api/callback`
     (e.g. `https://wisplink.vercel.app/api/callback`)
3. Register the app, then click **Generate a new client secret**.
4. Copy the **Client ID** and the **Client secret**.
5. Add both as environment variables in **Vercel** (Project → Settings
   → Environment Variables):
   - `OAUTH_GITHUB_CLIENT_ID`
   - `OAUTH_GITHUB_CLIENT_SECRET`
   Redeploy after adding them.
6. For local editing, copy `.env.example` to `.env.local` and fill in
   the same two values (you'll need a second OAuth App with a
   `localhost:3000` callback URL if you want to log in locally too —
   optional, editing via the deployed `/admin` is enough on its own).

Once deployed, the editor is at **`/admin`** — log in with your GitHub
account (the one with access to this repo), and every save commits an
updated `.mdx` file straight to `main`. No database, nothing else to
host, and the login flow never leaves GitHub + your own Vercel domain.

The site keeps reading content exactly the same way it already does
(`lib/projects.ts` / `lib/posts.ts`, plain `fs` reads at build time) —
Decap only ever touches the files, nothing about how pages render
changes. New entries need a unique `slug` field (Latin letters, no
spaces) — that becomes the filename, and therefore the URL.

## Deploying to Vercel

No static export, no basePath, no manual workflow file — Vercel builds
and deploys Next.js natively.

**One-time setup:**

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click
   **Add New → Project**, and import this repo. Vercel auto-detects
   Next.js — no config needed, just click **Deploy**.
3. Once deployed, note the URL Vercel gives you (something like
   `wisplink.vercel.app`, or your custom domain if you add one under
   **Settings → Domains**).
4. Set the environment variable **`NEXT_PUBLIC_SITE_URL`** in
   **Settings → Environment Variables** to that exact URL (e.g.
   `https://wisplink.vercel.app`, no trailing slash) — this feeds
   `sitemap.xml`, `robots.txt` and OpenGraph tags via `lib/site.ts`.
   Redeploy after setting it (Vercel → Deployments → ⋯ → Redeploy).

That's it — every push to `main` auto-deploys from here on, and every
pull request gets its own preview URL automatically.

**Building locally, same as before:**

```bash
npm run dev     # local dev server
npm run build   # production build
npm run start   # serve the production build locally
```

## Accessibility & performance notes

- Visible focus states on every interactive element (`:focus-visible`).
- `prefers-reduced-motion` disables all animation/scroll-smoothing.
- Semantic headings, labelled form fields, skip-to-content link.
- Static generation for all project pages; no client-side data fetching
  on first paint.

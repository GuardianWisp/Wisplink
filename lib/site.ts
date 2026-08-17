/**
 * The canonical site URL, used for metadataBase, sitemap.xml and OpenGraph
 * tags. Set NEXT_PUBLIC_SITE_URL in Vercel's project settings once you know
 * your final domain (the *.vercel.app one, or a custom domain) — falls back
 * to Vercel's own preview-deployment URL, then localhost for local dev.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

/**
 * Routes that render entirely on their own — no Nav/Footer, and none of
 * the atmosphere components (cursor, grain, scroll rail). `/admin` is a
 * separate React app (Decap CMS) that needs the whole page to itself, or
 * its own DOM reconciliation fights with Next's and throws removeChild
 * errors; `/links` is a standalone link-in-bio page by design.
 */
const CHROME_FREE_PATHS = ["/links", "/admin"];

export function isChromeFreePath(pathname: string | null): boolean {
  if (!pathname) return false;
  return CHROME_FREE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

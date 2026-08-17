/**
 * The canonical site URL, used for metadataBase, sitemap.xml and OpenGraph
 * tags. Set NEXT_PUBLIC_SITE_URL in Vercel's project settings once you know
 * your final domain (the *.vercel.app one, or a custom domain) — falls back
 * to Vercel's own preview-deployment URL, then localhost for local dev.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

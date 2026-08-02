const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prepends the GitHub Pages basePath (e.g. "/Wisplink") to a root-relative
 * local asset path. Needed because next/image does not automatically add
 * basePath to the `src` when `images.unoptimized` is true — so every real
 * image in the site is funnelled through this (see RenderPlaceholder.tsx)
 * instead of relying on Next.js to do it.
 *
 * Leaves external URLs (http/https) untouched, and is a no-op locally
 * where basePath is "".
 */
export function withBasePath(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  if (basePath && path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

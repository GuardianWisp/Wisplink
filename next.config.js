/** @type {import('next').NextConfig} */

// When building in GitHub Actions for a *project* page
// (https://<user>.github.io/<repo>/), assets and links need to be
// prefixed with "/<repo>". This derives that automatically from the
// GITHUB_REPOSITORY env var GitHub Actions sets for you — nothing to
// edit by hand. Building locally (`npm run dev` / `npm run build`
// outside CI) is unaffected.
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrgPage = repoName?.endsWith(".github.io");
const basePath =
  process.env.GITHUB_ACTIONS && repoName && !isUserOrOrgPage
    ? `/${repoName}`
    : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export", // static HTML export — required for GitHub Pages
  basePath,
  assetPrefix: basePath,
  trailingSlash: true, // /about/ instead of /about — matches how GH Pages resolves folders
  images: {
    unoptimized: true, // GH Pages has no image optimization server
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;

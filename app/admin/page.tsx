"use client";

import Script from "next/script";

// The <link> below is an ABSOLUTE path on purpose — without it, Decap
// falls back to a *relative* fetch of "config.yml", which resolves
// against "/admin" (no trailing slash) as if "admin" were a filename,
// landing on "/config.yml" at the site root instead of "/admin/config.yml".
// Next.js hoists <link> tags rendered anywhere in the tree into <head>.
export default function AdminPage() {
  return (
    <>
      <link rel="cms-config-url" href="/admin/config.yml" />
      <div id="nc-root" />
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
      />
    </>
  );
}

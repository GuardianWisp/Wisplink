"use client";

import Script from "next/script";

// Decap CMS auto-discovers /admin/config.yml (served by
// app/admin/config.yml/route.ts) — no manual init needed here.
export default function AdminPage() {
  return (
    <>
      <div id="nc-root" />
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
      />
    </>
  );
}

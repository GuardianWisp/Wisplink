"use client";

import { useEffect } from "react";

/**
 * Decap CMS's bundle auto-initializes itself on load by looking for a
 * <link rel="cms-config-url"> in <head> and fetching whatever it points
 * to. JSX-rendered <link> tags with a non-standard `rel` value aren't
 * reliably hoisted into <head> by React, so this appends the tag to
 * document.head directly — the one approach that's actually guaranteed
 * to land there before the script runs.
 */
export default function AdminPage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "cms-config-url";
    link.href = "/admin/config.yml";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return <div id="nc-root" />;
}

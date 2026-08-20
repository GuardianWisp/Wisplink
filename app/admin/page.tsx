"use client";

import { useEffect } from "react";

/**
 * Decap CMS's bundle auto-initializes itself on load by looking for a
 * <link rel="cms-config-url"> in <head> and fetching whatever it points
 * to. JSX-rendered <link> tags with a non-standard `rel` value aren't
 * reliably hoisted into <head> by React, so this appends the tag to
 * document.head directly — the one approach that's actually guaranteed
 * to land there before the script runs. Decap also silently ignores the
 * link unless `type` is "text/yaml" / "application/x-yaml" — without it
 * it falls back to fetching "config.yml" at the site root.
 */
export default function AdminPage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "cms-config-url";
    link.type = "text/yaml";
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

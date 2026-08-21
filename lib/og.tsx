import type { ReactElement } from "react";

export const ogSize = { width: 1200, height: 630 };

async function loadGoogleFont(weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);
  const fontUrl = match?.[1];
  if (!fontUrl) throw new Error("Failed to resolve Inter font asset");
  const res = await fetch(fontUrl);
  if (!res.ok) throw new Error("Failed to fetch Inter font asset");
  return res.arrayBuffer();
}

/** Loads only the glyphs actually used across the card, subset per request. */
export async function loadOgFonts(text: string) {
  const [medium, bold] = await Promise.all([
    loadGoogleFont(500, text),
    loadGoogleFont(700, text),
  ]);
  return [
    { name: "Inter", data: medium, weight: 500 as const },
    { name: "Inter", data: bold, weight: 700 as const },
  ];
}

/**
 * Shared OG card layout — mirrors the site's own hairline-grey, label +
 * big-type language (see RenderPlaceholder / the `label` utility class)
 * so shared links look like they came from the site itself.
 */
export function OgCard({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
}): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        padding: "76px",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: "#111111",
        }}
      >
        Wisplink
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#777777",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 26 ? 60 : 82,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
            color: "#111111",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {meta && (
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 500,
              color: "#777777",
            }}
          >
            {meta}
          </div>
        )}
      </div>
    </div>
  );
}

import { ImageResponse } from "next/og";
import { OgCard, loadOgFonts, ogSize } from "@/lib/og";

export const alt = "Wisplink — AI-дизайнер, фриланс";
export const size = ogSize;
export const contentType = "image/png";

const eyebrow = "Портфолио";
const title = "AI-дизайнер, фриланс.";
const meta = "3D, моушн и AI-дизайн";

export default async function Image() {
  const fonts = await loadOgFonts(`Wisplink${eyebrow}${title}${meta}`);

  return new ImageResponse(
    <OgCard eyebrow={eyebrow} title={title} meta={meta} />,
    { ...size, fonts }
  );
}

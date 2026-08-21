import { ImageResponse } from "next/og";
import { getProject } from "@/lib/projects";
import { OgCard, loadOgFonts, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  const title = project?.title ?? "Wisplink";
  const eyebrow = project?.category ?? "Проект";
  const meta = project
    ? [project.client, project.year].filter(Boolean).join(" · ")
    : undefined;

  const fonts = await loadOgFonts(`Wisplink${eyebrow}${title}${meta ?? ""}`);

  return new ImageResponse(
    <OgCard eyebrow={eyebrow} title={title} meta={meta} />,
    { ...size, fonts }
  );
}

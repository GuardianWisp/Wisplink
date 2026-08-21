import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";
import { OgCard, loadOgFonts, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const title = post?.meta.title ?? "Wisplink";
  const eyebrow = "Журнал";
  const meta = post ? formatDate(post.meta.date) : undefined;

  const fonts = await loadOgFonts(`Wisplink${eyebrow}${title}${meta ?? ""}`);

  return new ImageResponse(
    <OgCard eyebrow={eyebrow} title={title} meta={meta} />,
    { ...size, fonts }
  );
}

import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import RenderPlaceholder from "./RenderPlaceholder";

const components = {
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="mt-14 text-2xl font-medium tracking-tighter first:mt-0 md:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mt-10 text-xl font-medium tracking-tight" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mt-6 text-lg leading-relaxed text-muted" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a
      className="text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-300 hover:decoration-ink"
      {...props}
    />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-8 border-l-2 border-ink py-1 pl-6 text-xl leading-relaxed tracking-tight text-ink"
      {...props}
    />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul
      className="mt-6 flex list-none flex-col gap-3 text-lg leading-relaxed text-muted"
      {...props}
    />
  ),
  li: (props: ComponentProps<"li">) => (
    <li className="flex gap-3 before:mt-3 before:h-1 before:w-1 before:shrink-0 before:bg-ink" {...props} />
  ),
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-medium text-ink" {...props} />
  ),
  hr: () => <div className="my-12 border-t border-line" />,
  img: ({ src, alt }: { src?: string; alt?: string }) =>
    src ? (
      <span className="my-10 block">
        <RenderPlaceholder src={src} alt={alt} aspect="landscape" />
      </span>
    ) : null,
};

export default function MdxContent({ source }: { source: string }) {
  return (
    <div className="max-w-2xl">
      <MDXRemote source={source} components={components} />
    </div>
  );
}

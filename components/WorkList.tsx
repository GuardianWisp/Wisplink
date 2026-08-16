"use client";

import { useMemo, useState } from "react";
import WorkCard from "./WorkCard";
import type { Project } from "@/lib/projects";

export default function WorkList({ projects }: { projects: Project[] }) {
  const tags = useMemo(() => {
    const all = new Set<string>();
    projects.forEach((p) => p.services.forEach((s) => all.add(s)));
    return Array.from(all).sort((a, b) =>
      a === "AI" ? -1 : b === "AI" ? 1 : 0
    );
  }, [projects]);

  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? projects.filter((p) => p.services.includes(active))
    : projects;

  return (
    <>
      {tags.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
          <button
            type="button"
            onClick={() => setActive(null)}
            className={`label border px-4 py-2 transition-colors duration-300 ${
              active === null
                ? "border-ink bg-ink text-paper"
                : "border-line-strong text-muted hover:border-ink hover:text-ink"
            }`}
          >
            Все
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              className={`label border px-4 py-2 transition-colors duration-300 ${
                active === tag
                  ? "border-ink bg-ink text-paper"
                  : "border-line-strong text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div>
        {filtered.map((project, i) => (
          <WorkCard key={project.slug} project={project} reverse={i % 2 === 1} />
        ))}
        {filtered.length === 0 && (
          <p className="border-t border-line py-16 text-muted">
            Пока нет проектов с этим тегом.
          </p>
        )}
      </div>
    </>
  );
}

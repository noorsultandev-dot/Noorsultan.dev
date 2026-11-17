"use client";

import { useState } from "react";
import { clientProjects } from "@/lib/data";
import ProjectCard from "./ProjectCard";

const filters = ["All", "HubSpot", "GoHighLevel"] as const;
type Filter = (typeof filters)[number];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? clientProjects : clientProjects.filter((p) => p.platform === filter);
  const count = (f: Filter) => (f === "All" ? clientProjects.length : clientProjects.filter((p) => p.platform === f).length);

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="Filter projects by platform">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
              filter === f
                ? "border-accent bg-accent text-black"
                : "border-white/15 text-neutral-300 hover:border-white/40 hover:text-white"
            }`}
          >
            {f} <span className={filter === f ? "text-black/60" : "text-neutral-500"}>{count(f)}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
        {shown.map((p, i) => (
          <ProjectCard key={`${filter}-${p.repo}`} p={p} delay={(i % 2) * 0.08} />
        ))}
      </div>
    </>
  );
}

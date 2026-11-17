"use client";

import { useState } from "react";
import { clientProjects, platforms, type Platform } from "@/lib/data";
import ProjectCard from "./ProjectCard";

type Tab = "All" | Platform;
const tabs: Tab[] = ["All", ...platforms];

export default function ProjectsGrid() {
  const [tab, setTab] = useState<Tab>("All");
  const shown = tab === "All" ? clientProjects : clientProjects.filter((p) => p.platform === tab);
  const count = (t: Tab) => (t === "All" ? clientProjects.length : clientProjects.filter((p) => p.platform === t).length);

  return (
    <>
      <div className="-mx-5 mb-12 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap" role="tablist" aria-label="Projects by platform">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                tab === t
                  ? "border-accent bg-accent text-black"
                  : "border-white/15 text-neutral-300 hover:border-white/40 hover:text-white"
              }`}
            >
              {t} <span className={tab === t ? "text-black/60" : "text-neutral-500"}>{count(t)}</span>
            </button>
          ))}
        </div>
      </div>

      {shown.length > 0 ? (
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2" role="tabpanel">
          {shown.map((p, i) => (
            <ProjectCard key={`${tab}-${p.repo}`} p={p} delay={(i % 2) * 0.08} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/15 px-6 py-20 text-center" role="tabpanel">
          <p className="text-2xl font-medium tracking-tight text-white">{tab} projects are coming soon.</p>
          <p className="mx-auto mt-3 max-w-md text-neutral-400">
            I&apos;m adding these to the site. If you&apos;d like to see examples now, send me a message.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-accent hover:text-accent"
          >
            Ask for examples →
          </a>
        </div>
      )}
    </>
  );
}

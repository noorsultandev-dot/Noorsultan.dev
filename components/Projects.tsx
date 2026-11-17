"use client";

import { motion } from "framer-motion";
import { clientProjects, projects, type ClientProject } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const RepoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
  </svg>
);

/** Browser-window preview of a client site, drawn in its brand colours. */
function SitePreview({ p }: { p: ClientProject }) {
  const { primary, dark } = p.brand;
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white">
      <div className="flex items-center gap-1.5 bg-slate-200 px-2.5 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 flex-1 truncate rounded bg-white px-2 py-0.5 font-mono text-[9px] text-slate-500">
          {p.url ? p.url.replace(/^https?:\/\//, "") : `${p.repo}.com`}
        </span>
      </div>
      {p.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.image} alt={`${p.client} website screenshot`} className="aspect-[16/10] w-full object-cover object-top transition-transform duration-[2500ms] group-hover:object-bottom" />
      ) : (
        <div className="aspect-[16/10] w-full">
          <div className="flex items-center justify-between bg-white px-3 py-2">
            <span className="font-bold text-[10px]" style={{ color: dark }}>
              {p.client}
            </span>
            <span className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1 w-5 rounded bg-slate-300" />
              ))}
              <span className="h-2.5 w-10 rounded-full" style={{ background: primary }} />
            </span>
          </div>
          <div
            className="relative flex h-[46%] flex-col justify-center px-4"
            style={{ background: `linear-gradient(120deg, ${dark}f2, ${primary}cc)` }}
          >
            <p className="max-w-[78%] text-[11px] font-bold leading-tight text-white sm:text-[12.5px]">{p.headline}</p>
            <div className="mt-2 flex gap-1.5">
              <span className="h-3 w-14 rounded" style={{ background: primary, outline: "1px solid #ffffff55" }} />
              <span className="h-3 w-14 rounded border border-white/60" />
            </div>
            <span className="mt-1.5 text-[7px] text-amber-300">★★★★★</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-50 p-2.5">
            {p.sections.slice(1, 4).map((s) => (
              <div key={s} className="rounded border border-slate-200 bg-white p-1.5">
                <span className="block h-2 w-2 rounded-sm" style={{ background: primary }} />
                <span className="mt-1 block truncate text-[7px] font-semibold text-slate-600">{s}</span>
                <span className="mt-1 block h-0.5 w-full rounded bg-slate-200" />
              </div>
            ))}
          </div>
          <div className="h-[12%]" style={{ background: dark }} />
        </div>
      )}
    </div>
  );
}

function ClientCard({ p, i }: { p: ClientProject; i: number }) {
  const href = p.url || "#contact";
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
      data-cursor="card"
      className="panel glow-border group relative flex flex-col overflow-hidden rounded-xl p-5 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center gap-2 text-slate-400">
        <RepoIcon />
        <p className="truncate font-mono text-[14px]">
          <span className="text-slate-500 xl:hidden">noorsultandev / </span>
          <span className="font-semibold text-cyan-300 group-hover:underline">{p.repo}</span>
        </p>
        <span className="ml-auto shrink-0 rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] text-slate-400">
          Client
        </span>
      </div>

      <div className="relative mt-4">
        <SitePreview p={p} />
        {/* terminal hover overlay */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 rounded-md border border-emerald-400/30 bg-ink-950/90 px-3 py-2 font-mono text-[11px] text-emerald-300 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          $ deploy {p.repo} --platform gohighlevel
          <br />
          <span className="text-slate-400">✓ live · {p.location}</span>
        </div>
      </div>

      <p className="mt-4 font-semibold text-white">
        {p.client} <span className="font-normal text-slate-500">· {p.industry}</span>
      </p>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-400">{p.description}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <li key={t} className="rounded-full bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[11px] text-cyan-200">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-4 pt-5 font-mono text-[12px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.brand.primary }} />
          GoHighLevel
        </span>
        <span>📍 {p.location}</span>
        <a
          href={href}
          target={p.url ? "_blank" : undefined}
          rel={p.url ? "noopener noreferrer" : undefined}
          className="ml-auto inline-flex items-center gap-1 rounded-md border border-cyan-400/30 px-3 py-1.5 text-cyan-300 transition hover:bg-cyan-400/10"
        >
          {p.url ? "View Project" : "Ask about it"} <span aria-hidden>↗</span>
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          file="projects.tsx"
          title="Featured client work"
          sub="Lead-generation websites I built on GoHighLevel for US service businesses, plus the kinds of work I do every week."
        />

        <div className="mb-6 flex items-center gap-3 font-mono text-[12px] text-slate-500">
          <span className="rounded-md border border-white/10 bg-ink-900/70 px-2.5 py-1 text-slate-300">⎇ main</span>
          <span>{clientProjects.length} client repositories</span>
          <span className="hidden sm:inline">· sorted by: recently shipped</span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {clientProjects.map((p, i) => (
            <ClientCard key={p.repo} p={p} i={i} />
          ))}
        </div>

        <h3 className="mb-6 mt-20 font-mono text-[13px] text-slate-500">
          <span className="text-cyan-300">$</span> ls ./capabilities
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article
              key={p.repo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              data-cursor="card"
              className="panel glow-border group flex flex-col rounded-xl p-5"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <RepoIcon />
                <span className="font-mono text-[14px] font-semibold text-cyan-300 group-hover:underline">{p.repo}</span>
                <span className="ml-auto rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px]">Public</span>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-400">{p.description}</p>
              <div className="mt-4 rounded-md border border-white/5 bg-ink-950/80 px-3 py-2.5 font-mono text-[11.5px] leading-5">
                {p.preview.map((l, k) => (
                  <p key={k} className={l.startsWith("✓") ? "text-emerald-300" : l.startsWith("!") ? "text-rose-300" : "text-slate-300"}>
                    {l}
                  </p>
                ))}
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full bg-violet-400/10 px-2.5 py-0.5 font-mono text-[11px] text-violet-200">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-2 pt-4 font-mono text-[12px] text-slate-500">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.lang.color }} />
                {p.lang.name}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { aboutCode, profile, skillGroups, experience } from "@/lib/data";
import CodeBlock from "./CodeBlock";
import SectionHeading from "./SectionHeading";
import { useLineTyper } from "./useTypewriter";

const TABS = ["about.js", "skills.json", "contact.js"] as const;
type Tab = (typeof TABS)[number];

const files: Record<Tab, string> = {
  "about.js": aboutCode,
  "skills.json": JSON.stringify(
    Object.fromEntries(skillGroups.map((g) => [g.name, g.items.slice(0, 5)])),
    null,
    2,
  ),
  "contact.js": `export const contact = {
  email: "${profile.email}",
  linkedin: "${profile.linkedin.replace("https://www.", "")}",
  github: "${profile.github.replace("https://", "")}",
  location: "${profile.location}",
  status: "${profile.status}"
};`,
};

const TREE = [
  { name: "portfolio", depth: 0, folder: true },
  { name: "src", depth: 1, folder: true },
  { name: "about.js", depth: 2, color: "#facc15" },
  { name: "skills.json", depth: 2, color: "#fbbf24" },
  { name: "contact.js", depth: 2, color: "#facc15" },
  { name: "security", depth: 1, folder: true },
  { name: "harden.ts", depth: 2, color: "#38bdf8" },
  { name: "firewall.rules", depth: 2, color: "#f472b6" },
  { name: "package.json", depth: 1, color: "#4ade80" },
  { name: "README.md", depth: 1, color: "#94a3b8" },
];

function Editor() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [tab, setTab] = useState<Tab>("about.js");
  const lines = useMemo(() => files[tab].split("\n"), [tab]);
  return (
    <div ref={ref} className="panel overflow-hidden rounded-xl shadow-2xl shadow-cyan-950/40">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-ink-900/80 px-3.5 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto min-w-0 truncate font-mono text-[11px] text-slate-500">{tab} — portfolio — Visual Studio Code</span>
      </div>
      <div className="flex">
        {/* activity bar */}
        <div className="hidden w-12 shrink-0 flex-col items-center gap-5 border-r border-white/5 bg-ink-950/60 py-4 text-slate-500 sm:flex">
          {["M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4z", "M11 4a7 7 0 1 0 4.9 12l4.1 4", "M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9"].map(
            (d, i) => (
              <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={i === 0 ? "text-slate-200" : ""} aria-hidden>
                <path d={d} />
              </svg>
            ),
          )}
        </div>
        {/* explorer */}
        <aside className="hidden w-52 shrink-0 border-r border-white/5 bg-ink-900/50 py-3 md:block">
          <p className="px-4 pb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Explorer</p>
          {TREE.map((f) => {
            const isTab = (TABS as readonly string[]).includes(f.name);
            return (
              <button
                key={f.name}
                type="button"
                disabled={!isTab}
                onClick={() => isTab && setTab(f.name as Tab)}
                className={`flex w-full items-center gap-1.5 py-[3px] text-left font-mono text-[12.5px] ${
                  tab === f.name ? "bg-cyan-400/10 text-white" : "text-slate-400"
                } ${isTab ? "hover:bg-white/5" : "cursor-default"}`}
                style={{ paddingLeft: 16 + f.depth * 12 }}
              >
                {f.folder ? (
                  <span className="text-slate-500">▾</span>
                ) : (
                  <span className="h-2 w-2 rounded-sm" style={{ background: f.color }} />
                )}
                <span className={f.folder ? "text-slate-300" : ""}>{f.name}</span>
              </button>
            );
          })}
        </aside>
        {/* editor */}
        <div className="min-w-0 flex-1">
          <div className="no-scrollbar flex overflow-x-auto border-b border-white/5 bg-ink-900/60">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex shrink-0 items-center gap-2 border-r border-white/5 px-4 py-2 font-mono text-[12.5px] transition ${
                  tab === t ? "border-t-2 border-t-cyan-400 bg-ink-850 text-white" : "border-t-2 border-t-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                <span className="h-2 w-2 rounded-sm" style={{ background: t.endsWith("json") ? "#fbbf24" : "#facc15" }} />
                {t}
              </button>
            ))}
          </div>
          <TypedFile key={tab} lines={lines} start={inView} />
        </div>
      </div>
      {/* status bar */}
      <div className="flex items-center gap-4 bg-cyan-500/90 px-3 py-1 font-mono text-[11px] text-ink-950">
        <span>⎇ main</span>
        <span className="hidden sm:inline">✓ 0 problems</span>
        <span className="ml-auto">{tab.endsWith("json") ? "JSON" : "JavaScript"}</span>
        <span className="hidden sm:inline">UTF-8</span>
      </div>
    </div>
  );
}

function TypedFile({ lines, start }: { lines: string[]; start: boolean }) {
  const { visible, activeLine } = useLineTyper(lines, start, 10);
  return (
    <div className="max-h-[460px] min-h-[420px] overflow-auto px-2 py-4">
      <CodeBlock lines={visible} activeLine={activeLine} caret minLines={lines.length} />
    </div>
  );
}

export default function About() {
  const stats = [
    { k: "2.7", l: "years experience" },
    { k: "3", l: "companies" },
    { k: "6+", l: "platforms" },
    { k: "24/7", l: "security mindset" },
  ];
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading file="about.tsx" title="About me" sub={profile.summary} />
        <div className="grid gap-8 lg:grid-cols-[1.45fr_1fr]">
          <motion.div className="min-w-0" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <Editor />
          </motion.div>

          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="panel rounded-xl p-5"
                >
                  <p className="font-mono text-3xl font-bold text-cyan-300">{s.k}</p>
                  <p className="mt-1 text-sm text-slate-400">{s.l}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="panel flex-1 rounded-xl p-5"
            >
              <p className="font-mono text-[12px] text-slate-500">$ git log --oneline --career</p>
              <ol className="mt-4 space-y-4">
                {experience.map((e) => (
                  <li key={e.hash} className="relative border-l border-white/10 pl-4">
                    <span
                      className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${e.current ? "bg-emerald-400 shadow-[0_0_10px_2px_rgba(74,222,128,.6)]" : "bg-slate-600"}`}
                    />
                    <p className="font-mono text-[11px] text-amber-300/80">
                      {e.hash} <span className="text-slate-500">· {e.period}</span>
                    </p>
                    <p className="mt-0.5 font-semibold text-slate-100">
                      {e.role} <span className="font-normal text-slate-400">@ {e.company}</span>
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 border-t border-white/5 pt-4 text-sm text-slate-400">
                <p>
                  <span className="font-mono text-violet-300">education:</span> BS Software Engineering, Virtual University of
                  Pakistan (2023 – present)
                </p>
                <p className="mt-1">
                  <span className="font-mono text-violet-300">languages:</span> {profile.languages.join(", ")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

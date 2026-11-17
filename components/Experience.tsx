"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading file="experience.log" title="Commit history" sub="Where I've shipped, fixed and secured websites." />
        <div className="relative">
          <div className="absolute bottom-0 left-[11px] top-2 w-px bg-gradient-to-b from-cyan-400/60 via-violet-400/30 to-transparent sm:left-[15px]" aria-hidden />
          {experience.map((e, i) => (
            <motion.article
              key={e.hash}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="relative mb-8 pl-10 sm:pl-14"
            >
              <span
                className={`absolute left-[4px] top-5 grid h-4 w-4 place-items-center rounded-full border-2 sm:left-[8px] ${
                  e.current ? "border-emerald-400 bg-emerald-400/30" : "border-slate-500 bg-ink-950"
                }`}
              />
              <div className="panel glow-border rounded-xl p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px]">
                  <span className="text-amber-300">commit {e.hash}</span>
                  {e.current && (
                    <span className="rounded border border-emerald-400/40 bg-emerald-400/10 px-1.5 text-emerald-300">HEAD → main</span>
                  )}
                  <span className="text-slate-500">{e.period}</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {e.role} <span className="text-slate-400">@ {e.company}</span>
                </h3>
                <ul className="mt-4 space-y-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
                      <span className="mt-[3px] font-mono text-emerald-400">+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

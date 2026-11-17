"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          file="skills/"
          title="The stack"
          sub="What I work with every day, from building pages to hardening servers."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="panel glow-border group rounded-xl p-5"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[12.5px] text-slate-400">
                  <span className="mr-2 inline-block h-2 w-2 rounded-sm" style={{ background: g.color }} />
                  {g.file}
                </p>
                <span className="font-mono text-[11px] text-slate-600">{g.items.length} deps</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{g.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border px-2.5 py-1 font-mono text-[12px] text-slate-200 transition group-hover:border-opacity-60"
                    style={{ borderColor: g.color + "33", background: g.color + "0d" }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

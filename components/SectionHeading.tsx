"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ file, title, sub }: { file: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-10 sm:mb-14"
    >
      <p className="font-mono text-[13px] text-cyan-300/80">
        <span className="text-slate-500">~/portfolio/</span>
        {file}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-slate-400">{sub}</p>}
    </motion.div>
  );
}

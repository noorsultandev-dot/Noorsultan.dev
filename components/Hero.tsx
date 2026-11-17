"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { heroSnippets, profile } from "@/lib/data";
import CodeBlock from "./CodeBlock";
import WindowChrome from "./WindowChrome";
import Terminal from "./Terminal";
import { useLineTyper } from "./useTypewriter";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center font-mono text-xs text-cyan-300/70">
      initializing hologram<span className="caret !h-3 !w-1.5" />
    </div>
  ),
});

const TOOLS = [
  { label: "WP", title: "WordPress", color: "#a78bfa", pos: "left-[6%] top-[46%]" },
  { label: "JS", title: "JavaScript", color: "#facc15", pos: "right-[4%] top-[40%]" },
  { label: "⚛", title: "React", color: "#22d3ee", pos: "left-[16%] bottom-[10%]" },
  { label: "S", title: "Shopify", color: "#4ade80", pos: "right-[46%] bottom-[3%]" },
  { label: "☁", title: "Cloudflare", color: "#fb923c", pos: "left-[42%] top-[2%]" },
  { label: "3D", title: "Three.js", color: "#f472b6", pos: "left-[2%] bottom-[34%]" },
];

function RotatingTitle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % profile.titles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <motion.span
        key={i}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-gradient whitespace-nowrap font-semibold"
      >
        {profile.titles[i]}
      </motion.span>
    </span>
  );
}

function TypedPanel({ code, delay, title }: { code: string; delay: number; title: string }) {
  const lines = code.split("\n");
  const [start, setStart] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(id);
  }, [delay]);
  const { visible, activeLine } = useLineTyper(lines, start, 22);
  return (
    <WindowChrome title={title} variant="holo">
      <div className="px-2 py-2.5">
        <CodeBlock lines={visible} activeLine={activeLine} caret minLines={lines.length} className="!text-[11.5px] !leading-[1.35rem]" />
      </div>
    </WindowChrome>
  );
}

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const near = { x: useTransform(sx, (v) => v * 18), y: useTransform(sy, (v) => v * 14) };
  const far = { x: useTransform(sx, (v) => v * -12), y: useTransform(sy, (v) => v * -10) };

  return (
    <section
      id="home"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative overflow-hidden pt-24 lg:min-h-screen lg:pt-20"
    >
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-[130px]" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1.02fr_1fr] lg:gap-6">
        {/* Left: intro + terminal */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.status.toLowerCase()} · {profile.location}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-mono text-sm text-slate-400"
          >
            <span className="text-violet-400">const</span> <span className="text-sky-300">hello</span> ={" "}
            <span className="text-emerald-300">&quot;world&quot;</span>; <span className="text-slate-500">// I&apos;m</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mt-2 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Noor Sultan<span className="text-cyan-300">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-4 text-xl text-slate-300 sm:text-2xl"
          >
            <RotatingTitle />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-slate-400"
          >
            I build fast WordPress, Shopify and GoHighLevel websites, and I keep them safe: recovering hacked sites,
            stopping bot and DDoS attacks, and tracing how attackers got in.{" "}
            <span className="font-mono text-cyan-300">Build. Secure. Optimize.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 font-mono text-sm font-semibold text-ink-950 shadow-glow transition hover:bg-cyan-300"
            >
              ./view-projects
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-mono text-sm text-slate-200 transition hover:border-violet-400/60 hover:bg-violet-400/10"
            >
              $ hire --me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-9 max-w-xl"
          >
            <Terminal />
          </motion.div>
        </div>

        {/* Right: 3D portrait + floating holographic code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[520px] sm:h-[600px] lg:h-[720px]"
        >
          <div className="absolute inset-0">
            <HeroScene />
          </div>

          {/* floating code panels */}
          <motion.div style={near} className="absolute left-0 top-[6%] hidden w-[300px] sm:block lg:-left-10">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <TypedPanel code={heroSnippets.developer} delay={1200} title="developer.js" />
            </motion.div>
          </motion.div>

          <motion.div style={far} className="absolute bottom-[14%] right-0 hidden w-[270px] sm:block lg:-right-6">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
              <TypedPanel code={heroSnippets.future} delay={3600} title="future.js" />
            </motion.div>
          </motion.div>

          <motion.div style={far} className="absolute right-[2%] top-[4%] hidden w-[230px] xl:block">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
              <TypedPanel code={heroSnippets.secure} delay={5200} title="harden.ts" />
            </motion.div>
          </motion.div>

          {/* mobile: one compact panel */}
          <div className="absolute inset-x-2 bottom-0 sm:hidden">
            <TypedPanel code={heroSnippets.future} delay={1500} title="future.js" />
          </div>

          {/* floating tool icons */}
          {TOOLS.map((t, i) => (
            <motion.div
              key={t.title}
              className={`absolute ${t.pos} hidden sm:block`}
              animate={{ y: [0, i % 2 ? 8 : -8, 0] }}
              transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                title={t.title}
                className="grid h-10 w-10 place-items-center rounded-xl border bg-ink-900/70 font-mono text-xs font-bold backdrop-blur"
                style={{ color: t.color, borderColor: t.color + "55", boxShadow: `0 0 22px -6px ${t.color}` }}
              >
                {t.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] text-slate-500 lg:flex"
      >
        scroll
        <span className="h-8 w-[1px] animate-pulse bg-gradient-to-b from-cyan-400 to-transparent" />
      </a>
    </section>
  );
}

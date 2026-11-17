"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navItems } from "@/lib/data";
import { isSoundOn, onSoundChange, setSound } from "@/lib/sound";

export default function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [sound, setSoundState] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSoundState(isSoundOn());
    const off = onSoundChange(setSoundState);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => {
      off();
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/5 bg-ink-950/75 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <a href="#home" className="group flex items-center gap-2 font-mono text-lg font-bold tracking-tight" data-cursor="link">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-cyan-400/40 bg-cyan-400/10 text-sm text-cyan-300 shadow-glow">
            {"</>"}
          </span>
          <span>
            NS<span className="text-cyan-300">.dev</span>
          </span>
        </a>

        {/* Editor-style file tabs */}
        <ul className="ml-auto hidden items-center rounded-lg border border-white/5 bg-ink-900/60 p-1 md:flex">
          {navItems.map((n) => (
            <li key={n.id} className="relative">
              <a
                href={`#${n.id}`}
                data-cursor="link"
                className={`relative z-10 flex items-center gap-1.5 rounded-md px-3.5 py-1.5 font-mono text-[13px] transition-colors ${
                  active === n.id ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="text-[10px] text-cyan-400">TS</span>
                {n.file}
              </a>
              {active === n.id && (
                <motion.span
                  layoutId="active-file"
                  className="absolute inset-0 rounded-md border-t-2 border-cyan-400 bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setSound(!sound)}
          aria-pressed={sound}
          aria-label={sound ? "Turn typing sound off" : "Turn typing sound on"}
          data-cursor="link"
          className="ml-auto flex items-center gap-2 rounded-md border border-white/10 px-2.5 py-1.5 font-mono text-[11px] text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-300 md:ml-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            {sound ? <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /> : <path d="m22 9-6 6M16 9l6 6" />}
          </svg>
          <span className="hidden sm:inline">sound: {sound ? "on" : "off"}</span>
        </button>

        <button
          type="button"
          className="rounded-md border border-white/10 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-ink-950/95 px-4 pb-4 backdrop-blur-xl md:hidden">
          <p className="py-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">Explorer</p>
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 rounded-md px-3 py-2.5 font-mono text-sm ${
                active === n.id ? "bg-white/5 text-cyan-300" : "text-slate-300"
              }`}
            >
              <span className="text-[10px] text-cyan-400">TS</span>
              {n.file}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

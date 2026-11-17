"use client";

import { useEffect, useRef } from "react";

const FRAGMENTS = [
  "const", "=>", "{ }", "</>", "<div>", "</section>", "async", "await", "return", "npm run dev",
  "display: grid;", "color: #22d3ee;", "useEffect()", "fetch('/api')", "git push", "01001110", "10110011",
  "wp_enqueue_script", "{% liquid %}", "ssh root@", "sudo ufw allow", "chmod 644", "$_POST", "Ω", "λ", "&&", "||",
  "export default", "import * as THREE", "<?php", "@media", "flex: 1;", "200 OK", "WAF:block", "0x1F", "[]", "#!/bin/bash",
];

/**
 * Low-opacity animated code backdrop: drifting code fragments plus a faint
 * matrix-style column rain. Pauses when the tab is hidden.
 */
export default function CodeBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      raf = 0,
      dpr = 1;

    type Frag = { x: number; y: number; vy: number; text: string; alpha: number; size: number; hue: number };
    let frags: Frag[] = [];
    let cols: number[] = [];
    const COL = 22;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(46, (w * h) / 32000));
      frags = Array.from({ length: count }, () => spawn(true));
      cols = Array.from({ length: Math.ceil(w / COL) }, () => Math.random() * -h);
    };

    const spawn = (anywhere = false): Frag => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 20,
      vy: 0.12 + Math.random() * 0.35,
      text: FRAGMENTS[(Math.random() * FRAGMENTS.length) | 0],
      alpha: 0.05 + Math.random() * 0.1,
      size: 11 + Math.random() * 5,
      hue: Math.random() < 0.6 ? 188 : Math.random() < 0.5 ? 258 : 142,
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // matrix rain (very faint)
      ctx.font = `12px ui-monospace, monospace`;
      for (let i = 0; i < cols.length; i++) {
        const y = cols[i];
        if (y > 0) {
          ctx.fillStyle = `rgba(74,222,128,0.07)`;
          ctx.fillText(Math.random() < 0.5 ? "0" : "1", i * COL, y);
          ctx.fillStyle = `rgba(74,222,128,0.03)`;
          ctx.fillText(Math.random() < 0.5 ? "0" : "1", i * COL, y - 16);
        }
        cols[i] = y > h + Math.random() * 4000 ? 0 : y + 1.6;
      }
      // floating fragments
      for (const f of frags) {
        f.y -= f.vy;
        if (f.y < -20) Object.assign(f, spawn());
        ctx.font = `${f.size}px ui-monospace, SFMono-Regular, monospace`;
        ctx.fillStyle = `hsla(${f.hue}, 85%, 65%, ${f.alpha})`;
        ctx.fillText(f.text, f.x, f.y);
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
    const vis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10" aria-hidden />;
}

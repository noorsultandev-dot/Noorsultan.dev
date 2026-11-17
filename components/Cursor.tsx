"use client";

import { useEffect, useRef, useState } from "react";

/** Glowing dot + lagging ring. Desktop (fine pointer) only. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mq.matches || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2,
      y = window.innerHeight / 2,
      rx = x,
      ry = y,
      raf = 0;
    let mode: "default" | "link" | "card" | "text" = "default";

    const setMode = (m: typeof mode) => {
      if (m === mode || !ring.current || !label.current) return;
      mode = m;
      ring.current.dataset.mode = m;
      label.current.textContent = m === "card" ? "view" : "";
    };

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button, input, textarea");
      if (!t) setMode("default");
      else if (t.dataset.cursor === "card") setMode("card");
      else if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") setMode("text");
      else setMode("link");
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const down = () => ring.current?.classList.add("scale-75");
    const up = () => ring.current?.classList.remove("scale-75");
    const leave = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };
    const enter = () => {
      if (dot.current) dot.current.style.opacity = "1";
      if (ring.current) ring.current.style.opacity = "1";
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        .cur-ring{width:34px;height:34px;margin:-17px 0 0 -17px;border:1px solid rgba(34,211,238,.55);transition:width .25s,height .25s,margin .25s,background .25s,border-color .25s,border-radius .25s}
        .cur-ring[data-mode=link]{width:50px;height:50px;margin:-25px 0 0 -25px;background:rgba(34,211,238,.08);border-color:rgba(34,211,238,.9)}
        .cur-ring[data-mode=card]{width:72px;height:72px;margin:-36px 0 0 -36px;background:rgba(167,139,250,.14);border-color:rgba(167,139,250,.9)}
        .cur-ring[data-mode=text]{width:4px;height:28px;margin:-14px 0 0 -2px;border-radius:2px;background:rgba(74,222,128,.8);border-color:transparent}
      `}</style>
      <div
        ref={ring}
        data-mode="default"
        className="cur-ring pointer-events-none fixed left-0 top-0 z-[100] grid place-items-center rounded-full"
        aria-hidden
      >
        <span ref={label} className="font-mono text-[10px] uppercase tracking-widest text-violet-200" />
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[101] -ml-1 -mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_3px_rgba(34,211,238,.8)]"
        aria-hidden
      />
    </>
  );
}

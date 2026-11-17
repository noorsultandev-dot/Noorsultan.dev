"use client";

import { useEffect, useRef, useState } from "react";
import { terminalScript, profile, skillGroups } from "@/lib/data";
import { keyClick } from "@/lib/sound";
import WindowChrome from "./WindowChrome";

type Line = { kind: "cmd" | "out" | "err"; text: string };

const COMMANDS: Record<string, () => string[]> = {
  help: () => ["available: whoami, role, skills, stack, location, status, contact, experience, clear"],
  whoami: () => [profile.name],
  role: () => [profile.titles.join(" | ")],
  skills: () => ["JavaScript, React, WordPress, Shopify, Three.js"],
  stack: () => skillGroups.map((g) => `${g.name.padEnd(28, ".")} ${g.items.slice(0, 4).join(", ")}`),
  location: () => [profile.location],
  status: () => [profile.status],
  experience: () => ["2 years 7 months · SpeedX Marketing · IndusBird · Techowdy"],
  contact: () => [profile.email, profile.linkedin.replace("https://www.", "")],
  sudo: () => ["nice try. this incident has been logged 🔒"],
};

export default function Terminal({ className = "" }: { className?: string }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [interactive, setInteractive] = useState(false);
  const [input, setInput] = useState("");
  const body = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // scripted intro
  useEffect(() => {
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
    (async () => {
      await sleep(900);
      for (const step of terminalScript) {
        for (let i = 1; i <= step.cmd.length; i++) {
          if (cancelled) return;
          setTyping(step.cmd.slice(0, i));
          keyClick();
          await sleep(55 + Math.random() * 60);
        }
        await sleep(220);
        if (cancelled) return;
        setTyping("");
        setLines((l) => [...l, { kind: "cmd", text: step.cmd }, ...step.out.map((t) => ({ kind: "out" as const, text: t }))]);
        await sleep(380);
      }
      if (!cancelled) {
        setLines((l) => [...l, { kind: "out", text: "type `help` to explore ↓" }]);
        setInteractive(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: "smooth" });
  }, [lines, typing]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") return setLines([]);
    const fn = COMMANDS[cmd.split(" ")[0]];
    setLines((l) => [
      ...l,
      { kind: "cmd", text: raw.trim() },
      ...(fn ? fn().map((t) => ({ kind: "out" as const, text: t })) : [{ kind: "err" as const, text: `command not found: ${cmd}. try \`help\`` }]),
    ]);
  };

  return (
    <WindowChrome
      title="noor@ns-dev: ~/portfolio — zsh"
      right={<span className="font-mono text-[10px] text-emerald-400">● online</span>}
      className={className}
    >
      <div
        ref={body}
        onClick={() => inputRef.current?.focus()}
        className="no-scrollbar h-[230px] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6"
      >
        {lines.map((l, i) =>
          l.kind === "cmd" ? (
            <div key={i}>
              <span className="text-emerald-400">$</span> <span className="text-slate-100">{l.text}</span>
            </div>
          ) : (
            <div key={i} className={`${l.kind === "err" ? "text-rose-400" : "text-cyan-200/90"} whitespace-pre-wrap`}>
              {l.text}
            </div>
          ),
        )}
        {!interactive ? (
          <div>
            <span className="text-emerald-400">$</span> <span className="text-slate-100">{typing}</span>
            <span className="caret" />
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(input);
              setInput("");
            }}
            className="flex items-center"
          >
            <span className="text-emerald-400">$</span>
            <label htmlFor="term-input" className="sr-only">
              Terminal command
            </label>
            <input
              id="term-input"
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                keyClick();
              }}
              autoComplete="off"
              spellCheck={false}
              className="ml-2 flex-1 bg-transparent text-slate-100 caret-emerald-400 outline-none"
              placeholder="help"
            />
          </form>
        )}
      </div>
    </WindowChrome>
  );
}

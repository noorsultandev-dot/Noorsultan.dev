"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import WindowChrome from "./WindowChrome";
import { keyClick } from "@/lib/sound";

const links = [
  { label: "email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "linkedin", value: "in/noor-sultan-dev", href: profile.linkedin },
  { label: "github", value: "noorsultandev-dot", href: profile.github },
  { label: "location", value: profile.location },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "w-full rounded-md border border-white/10 bg-ink-950/70 px-3 py-2.5 font-mono text-[14px] text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20";

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          file="contact.tsx"
          title="Let's build something"
          sub="Need a new website, a store, a migration, or a hacked site cleaned up today? Send me a message."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <WindowChrome title="contact.json">
              <div className="p-5 font-mono text-[14px] leading-8">
                <p className="text-slate-500">{"{"}</p>
                {links.map((l, i) => (
                  <p key={l.label} className="pl-5">
                    <span className="text-sky-300">&quot;{l.label}&quot;</span>
                    <span className="text-slate-400">: </span>
                    {l.href ? (
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-emerald-300 underline-offset-4 hover:underline"
                      >
                        &quot;{l.value}&quot;
                      </a>
                    ) : (
                      <span className="text-emerald-300">&quot;{l.value}&quot;</span>
                    )}
                    {i < links.length - 1 && <span className="text-slate-400">,</span>}
                  </p>
                ))}
                <p className="text-slate-500">{"}"}</p>
                <div className="mt-4 flex items-center gap-2 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-[12.5px] text-emerald-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  {profile.status} · replies within 24h
                </div>
              </div>
            </WindowChrome>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <WindowChrome title="~/portfolio — send-message.sh">
              <form onSubmit={submit} className="space-y-4 p-5">
                <p className="font-mono text-[12.5px] text-slate-500">
                  <span className="text-emerald-400">$</span> ./send-message.sh --to noor
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[12px] text-cyan-300">--name</span>
                    <input
                      required
                      className={field}
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        keyClick();
                      }}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[12px] text-cyan-300">--email</span>
                    <input
                      required
                      type="email"
                      className={field}
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        keyClick();
                      }}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[12px] text-cyan-300">--message</span>
                  <textarea
                    required
                    rows={5}
                    className={field}
                    placeholder="Tell me about your project…"
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      keyClick();
                    }}
                  />
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 font-mono text-sm font-semibold text-ink-950 shadow-glow transition hover:bg-cyan-300"
                  >
                    execute <span aria-hidden>⏎</span>
                  </button>
                  {sent && (
                    <p className="font-mono text-[12.5px] text-emerald-300" role="status">
                      ✓ opening your mail app…
                    </p>
                  )}
                </div>
              </form>
            </WindowChrome>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

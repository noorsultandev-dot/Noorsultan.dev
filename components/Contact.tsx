"use client";

import Link from "next/link";
import { useState } from "react";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";

/** Full contact content for the /contact page. */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full border-b border-white/15 bg-transparent py-3.5 text-base text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-accent";

  return (
    <section className="mx-auto grid max-w-6xl gap-16 px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44 lg:grid-cols-2">
      <Reveal>
        <Link href="/" className="text-sm text-neutral-500 transition-colors hover:text-white">
          ← Back to home
        </Link>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          <span className="text-accent">/</span> Contact
        </p>
        <h1 className="mt-4 text-5xl font-medium leading-none tracking-[-0.03em] text-white sm:text-7xl">
          Let&apos;s build something <span className="font-serif font-normal italic text-accent">good</span>.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-400">
          Need a new site, a store, a migration, or a hacked site cleaned up? Tell me what&apos;s going on.
        </p>

        <dl className="mt-12 space-y-6 border-t border-white/10 pt-8">
          <div>
            <dt className="text-sm text-neutral-500">Email</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${profile.email}`}
                className="break-all border-b border-accent pb-0.5 text-xl font-medium text-white transition-colors hover:text-accent"
              >
                {profile.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-neutral-500">Elsewhere</dt>
            <dd className="mt-1 flex gap-6 text-base text-white">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                LinkedIn ↗
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                GitHub ↗
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-neutral-500">Based in</dt>
            <dd className="mt-1 text-base text-white">{profile.location} (UTC+5)</dd>
          </div>
        </dl>
      </Reveal>

      <Reveal delay={0.1} className="lg:pt-24">
        <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-card p-7 sm:p-10">
          <label className="block">
            <span className="text-sm text-neutral-500">Your name</span>
            <input
              required
              className={field}
              placeholder="Jane Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label className="mt-6 block">
            <span className="text-sm text-neutral-500">Email</span>
            <input
              required
              type="email"
              className={field}
              placeholder="jane@company.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label className="mt-6 block">
            <span className="text-sm text-neutral-500">Project details</span>
            <textarea
              required
              rows={5}
              className={`${field} resize-none`}
              placeholder="What do you need help with?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <button
            type="submit"
            className="mt-9 w-full rounded-full bg-accent py-4 text-[15px] font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            Send message →
          </button>
          <p className="mt-4 text-center text-sm text-neutral-500">This opens your email app with the message filled in.</p>
        </form>
      </Reveal>
    </section>
  );
}

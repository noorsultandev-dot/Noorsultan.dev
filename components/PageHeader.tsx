import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Top of every inner page: back link, small label, big title, intro. */
export default function PageHeader({ label, intro, children }: { label: string; intro: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-14 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
      <Reveal>
        <Link href="/" className="text-sm text-neutral-500 transition-colors hover:text-white">
          ← Back to home
        </Link>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          <span className="text-accent">/</span> {label}
        </p>
        <h1 className="mt-4 max-w-4xl text-5xl font-medium leading-none tracking-[-0.03em] text-white sm:text-7xl">
          {children}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">{intro}</p>
      </Reveal>
    </section>
  );
}

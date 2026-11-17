import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHead({ index, label, children }: { index: string; label: string; children: ReactNode }) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
        <span className="text-accent">{index}</span> — {label}
      </p>
      <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl">
        {children}
      </h2>
    </Reveal>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Closing strip that sends people to the contact page. */
export default function CtaBand({ children }: { children: ReactNode }) {
  return (
    <section className="border-t border-white/10">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-20 sm:px-8 sm:py-28 md:flex-row md:items-center">
        <h2 className="max-w-2xl text-4xl font-medium leading-tight tracking-tight text-white sm:text-6xl">{children}</h2>
        <Link
          href="/contact"
          className="shrink-0 rounded-full bg-accent px-8 py-4 text-[15px] font-semibold text-black transition-transform hover:-translate-y-0.5"
        >
          Get in touch →
        </Link>
      </Reveal>
    </section>
  );
}

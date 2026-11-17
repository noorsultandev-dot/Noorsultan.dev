import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectsGrid from "@/components/ProjectsGrid";
import Reveal from "@/components/Reveal";
import { clientProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — Noor Sultan",
  description:
    "Client websites built by Noor Sultan on WordPress, GoHighLevel and HubSpot, plus custom-coded sites: generator service companies, a cybersecurity platform, a trades academy and local service businesses.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44">
          <Reveal>
            <Link href="/" className="text-sm text-neutral-500 transition-colors hover:text-white">
              ← Back to home
            </Link>
            <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
              <span className="text-accent">{clientProjects.length}</span> — Projects
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-medium leading-none tracking-[-0.03em] text-white sm:text-7xl">
              Client sites I&apos;ve <span className="font-serif font-normal italic text-accent">built</span>.
            </h1>
            <p className="mb-14 mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
              Websites on WordPress, GoHighLevel and HubSpot, plus custom-coded and AI-built sites, from generator service companies to a
              cybersecurity platform.
            </p>
          </Reveal>

          <ProjectsGrid />
        </section>

        <section className="border-t border-white/10">
          <Reveal className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-20 sm:px-8 md:flex-row md:items-center">
            <h2 className="text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
              Your project could be <span className="font-serif font-normal italic text-accent">next</span>.
            </h2>
            <Link
              href="/#contact"
              className="shrink-0 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              Get in touch →
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}

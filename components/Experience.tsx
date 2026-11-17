import Link from "next/link";
import { experience } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const education = [
  { period: "2023 – Present", title: "BS Software Engineering", place: "Virtual University of Pakistan" },
  { period: "2021 – 2023", title: "Intermediate, ICS (Physics)", place: "Govt. Graduate College of Science, Faisalabad" },
];

function CurrentBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Current
    </span>
  );
}

/** Short version for the home page: roles only. */
export function ExperienceTeaser() {
  return (
    <section id="experience" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHead index="03" label="Experience">
          Where I&apos;ve <span className="font-serif font-normal italic text-accent">worked</span>.
        </SectionHead>
        <div className="border-t border-white/10">
          {experience.map((e) => (
            <Reveal
              key={e.hash}
              className="grid items-center gap-2 border-b border-white/10 py-7 md:grid-cols-[220px_1fr_auto] md:gap-10"
            >
              <p className="text-sm text-neutral-500">{e.period}</p>
              <div>
                <h3 className="text-2xl font-medium tracking-tight text-white">{e.role}</h3>
                <p className="mt-1 text-neutral-400">{e.company}</p>
              </div>
              {e.current && <CurrentBadge />}
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <Link
            href="/experience"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:border-accent hover:text-accent"
          >
            Full experience
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** Full content for the /experience page. */
export default function Experience() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="border-t border-white/10">
        {experience.map((e) => (
          <Reveal key={e.hash} className="grid gap-4 border-b border-white/10 py-10 md:grid-cols-[220px_1fr] md:gap-10">
            <div>
              <p className="mb-3 text-sm text-neutral-500">{e.period}</p>
              {e.current && <CurrentBadge />}
            </div>
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">{e.role}</h2>
              <p className="mt-1 text-neutral-400">{e.company}</p>
              <ul className="mt-5 space-y-2.5">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-neutral-400">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-24">
        <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">Education</h2>
      </Reveal>
      <div className="mt-8 border-t border-white/10">
        {education.map((e) => (
          <Reveal key={e.title} className="grid gap-2 border-b border-white/10 py-7 md:grid-cols-[220px_1fr] md:gap-10">
            <p className="text-sm text-neutral-500">{e.period}</p>
            <div>
              <h3 className="text-xl font-medium tracking-tight text-white">{e.title}</h3>
              <p className="mt-1 text-neutral-400">{e.place}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

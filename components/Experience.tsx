import { experience } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Experience() {
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
              className="grid gap-4 border-b border-white/10 py-10 md:grid-cols-[220px_1fr] md:gap-10"
            >
              <div>
                <p className="text-sm text-neutral-500">{e.period}</p>
                {e.current && (
                  <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Current
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-medium tracking-tight text-white">{e.role}</h3>
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
      </div>
    </section>
  );
}

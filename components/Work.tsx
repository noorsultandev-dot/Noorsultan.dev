import Link from "next/link";
import { clientProjects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

// The four projects shown on the home page. The rest are on /projects.
const featured = ["power-champions", "ai-ciso", "ubuildit-north-texas", "mi-floor-coatings"];

export default function Work() {
  const shown = featured
    .map((repo) => clientProjects.find((p) => p.repo === repo))
    .filter((p): p is (typeof clientProjects)[number] => Boolean(p));

  return (
    <section id="work" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHead index="02" label="Selected work">
          Client sites that bring in <span className="font-serif font-normal italic text-accent">leads</span>.
        </SectionHead>

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {shown.map((p, i) => (
            <ProjectCard key={p.repo} p={p} delay={(i % 2) * 0.08} />
          ))}
        </div>

        <Reveal className="mt-16 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-[15px] font-medium text-white transition-colors hover:border-accent hover:text-accent"
          >
            View all {clientProjects.length} projects
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

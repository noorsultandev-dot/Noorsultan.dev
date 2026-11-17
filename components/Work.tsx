import { clientProjects, type ClientProject } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

/** Preview of a client site. Shows a real screenshot when `image` is set. */
function SitePreview({ p }: { p: ClientProject }) {
  const { primary, dark } = p.brand;
  if (p.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p.image} alt={`${p.client} website`} className="aspect-[16/10] w-full object-cover object-top" />;
  }
  return (
    <div className="flex aspect-[16/10] w-full flex-col bg-white">
      <div className="flex items-center justify-between px-[5%] py-[3%]">
        <span className="text-[11px] font-bold sm:text-xs" style={{ color: dark }}>
          {p.client}
        </span>
        <span className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1 w-6 rounded bg-neutral-300" />
          ))}
          <span className="h-3.5 w-14 rounded-full" style={{ background: primary }} />
        </span>
      </div>
      <div
        className="flex flex-1 flex-col justify-center px-[7%]"
        style={{ background: `linear-gradient(120deg, ${dark}, ${primary})` }}
      >
        <p className="max-w-[75%] text-sm font-bold leading-tight text-white sm:text-lg">{p.headline}</p>
        <div className="mt-3 flex gap-2">
          <span className="h-4 w-20 rounded bg-white/90" />
          <span className="h-4 w-20 rounded border border-white/70" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[3%] px-[5%] py-[3.5%]">
        {p.sections.slice(1, 4).map((s) => (
          <div key={s} className="rounded-md border border-neutral-200 p-2">
            <span className="block h-2.5 w-2.5 rounded-sm" style={{ background: primary }} />
            <span className="mt-1.5 block truncate text-[9px] font-semibold text-neutral-700 sm:text-[10px]">{s}</span>
            <span className="mt-1.5 block h-0.5 w-full rounded bg-neutral-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHead index="02" label="Selected work">
          Client sites that bring in <span className="font-serif font-normal italic text-accent">leads</span>.
        </SectionHead>

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {clientProjects.map((p, i) => (
            <Reveal key={p.repo} delay={(i % 2) * 0.08}>
              <a
                href={p.url || "#contact"}
                target={p.url ? "_blank" : undefined}
                rel={p.url ? "noopener noreferrer" : undefined}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card p-3 transition-colors group-hover:border-accent/50 sm:p-4">
                  <div className="overflow-hidden rounded-xl">
                    <div className="transition-transform duration-700 group-hover:scale-[1.03]">
                      <SitePreview p={p} />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight text-white">{p.client}</h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {p.industry} · {p.location} · {p.platform}
                    </p>
                  </div>
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-black"
                    aria-hidden
                  >
                    ↗
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-400">{p.description}</p>
              </a>
            </Reveal>
          ))}

          {/* Sixth tile: invitation */}
          <Reveal delay={0.08}>
            <a
              href="#contact"
              className="group flex aspect-[16/10] flex-col justify-between rounded-2xl border border-dashed border-white/15 p-8 transition-colors hover:border-accent"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Next</p>
              <p className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
                Your project could be <span className="font-serif font-normal italic text-accent">here</span>.
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

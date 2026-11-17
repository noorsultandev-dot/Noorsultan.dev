import Image from "next/image";
import Link from "next/link";
import { skillGroups } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const services = [
  {
    n: "01",
    title: "WordPress development",
    text: "Custom sites with Elementor, Divi, Avada and WooCommerce, built to be easy to manage.",
  },
  {
    n: "02",
    title: "Shopify & e-commerce",
    text: "Stores set up end to end: themes, products, apps and checkout flows.",
  },
  {
    n: "03",
    title: "Security & recovery",
    text: "Hacked-site cleanup, malware removal, Cloudflare WAF, DDoS mitigation and log forensics.",
  },
  {
    n: "04",
    title: "Funnels & migrations",
    text: "GoHighLevel and HubSpot builds, and moves between platforms that keep your SEO intact.",
  },
];

const facts = [
  { k: "Based in", v: "Lahore, Pakistan" },
  { k: "Currently", v: "SpeedX Marketing" },
  { k: "Education", v: "BS Software Engineering, VU" },
  { k: "Languages", v: "English, Urdu, Punjabi" },
];

function Story() {
  return (
    <>
      <p className="text-xl leading-relaxed text-neutral-300 sm:text-2xl sm:leading-relaxed">
        For 2 years and 7 months I&apos;ve built, secured and maintained websites for agencies and their clients, across
        WordPress, Shopify, GoHighLevel, HubSpot and Wix.
      </p>
      <p className="mt-6 text-lg leading-relaxed text-neutral-400">
        The part most developers avoid is the part I like. When a site is hacked or under attack, I clean it, read the
        server logs to find how the attacker got in, close that door and harden the site so it doesn&apos;t happen
        again.
      </p>
    </>
  );
}

function Services({ wide = false }: { wide?: boolean }) {
  return (
    <div
      className={`grid gap-px self-start overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 ${
        wide ? "lg:grid-cols-4" : ""
      }`}
    >
      {services.map((s, i) => (
        <Reveal key={s.n} delay={i * 0.06} className="bg-bg p-7 transition-colors hover:bg-card">
          <p className="font-mono text-xs text-accent">{s.n}</p>
          <h3 className="mt-8 text-xl font-medium tracking-tight text-white">{s.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">{s.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/** Short version for the home page. */
export function AboutTeaser() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHead index="01" label="About">
        I build websites, and I keep them <span className="font-serif font-normal italic text-accent">standing</span>.
      </SectionHead>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Story />
          <Link
            href="/about"
            className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:border-accent hover:text-accent"
          >
            More about me
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </Link>
        </Reveal>
        <Services />
      </div>
    </section>
  );
}

/** Full content for the /about page. */
export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="grid gap-12 lg:grid-cols-[340px_1fr] lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[24px] bg-neutral-800">
            <Image
              src="/portrait.png"
              alt="Portrait of Noor Sultan"
              fill
              sizes="340px"
              className="object-cover object-top grayscale"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <Story />
          <dl className="mt-10 grid grid-cols-2 gap-y-6 border-t border-white/10 pt-8 text-sm">
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="text-neutral-500">{f.k}</dt>
                <dd className="mt-1 pr-4 text-base text-white">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mt-24">
        <Reveal>
          <h2 className="mb-8 text-3xl font-medium tracking-tight text-white sm:text-4xl">What I do</h2>
        </Reveal>
        <Services wide />
      </div>

      <div className="mt-24">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">Tools I work with</h2>
        </Reveal>
        <div className="mt-8 border-t border-white/10">
          {skillGroups.map((g, i) => (
            <Reveal
              key={g.name}
              delay={i * 0.04}
              className="grid gap-3 border-b border-white/10 py-6 sm:grid-cols-[260px_1fr] sm:gap-8"
            >
              <p className="text-neutral-500">{g.name}</p>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-neutral-200 transition-colors hover:border-accent hover:text-accent"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const ease: [number, number, number, number] = [0.21, 0.6, 0.35, 1];
const up = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

const stats = [
  { k: "2.7", unit: "yrs", l: "Experience" },
  { k: "6", unit: "+", l: "Platforms" },
  { k: "3", unit: "", l: "Companies" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* 3D wave */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, #000 45%, #000 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 45%, #000 80%, transparent)",
        }}
        aria-hidden
      >
        <HeroScene />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-40 pt-32 sm:px-8 lg:min-h-screen lg:grid-cols-[1.3fr_0.7fr] lg:gap-10 lg:pb-52 lg:pt-28">
        <div>
          <motion.p
            {...up(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-neutral-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for new projects
          </motion.p>

          <motion.h1
            {...up(0.08)}
            className="mt-7 text-[clamp(2.7rem,7.2vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.03em] text-white"
          >
            Websites that are fast, <span className="font-serif font-normal italic text-accent">secure</span> and built
            to convert.
          </motion.h1>

          <motion.p {...up(0.16)} className="mt-7 max-w-xl text-lg leading-relaxed text-neutral-400">
            I&apos;m Noor Sultan, a web developer in Lahore. I build WordPress, Shopify and GoHighLevel websites, and I
            rescue the ones that get hacked.
          </motion.p>

          <motion.div {...up(0.24)} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              See my work
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:border-white/40"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.dl {...up(0.32)} className="mt-10 flex gap-10 border-t border-white/10 pt-6 sm:gap-14">
            {stats.map((s) => (
              <div key={s.l}>
                <dd className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  {s.k}
                  <span className="ml-0.5 text-lg text-accent">{s.unit}</span>
                </dd>
                <dt className="mt-1 text-sm text-neutral-500">{s.l}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-[320px] lg:max-w-none"
        >
          <div className="absolute -inset-3 rounded-[32px] border border-accent/30" aria-hidden />
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[24px] bg-neutral-800">
            <Image
              src="/portrait.png"
              alt="Portrait of Noor Sultan"
              fill
              priority
              sizes="(max-width: 1024px) 320px, 400px"
              className="object-cover object-top grayscale transition duration-700 group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent" aria-hidden />
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
              <div>
                <p className="text-lg font-semibold leading-tight text-white">Noor Sultan</p>
                <p className="text-sm text-neutral-300">Web Developer · Lahore, PK</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-lg text-black" aria-hidden>
                ↗
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import CodeBackground from "@/components/CodeBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { profile } from "@/lib/data";

export default function Home() {
  return (
    <>
      <CodeBackground />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 font-mono text-[12px] text-slate-500 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.name} · <span className="text-cyan-300">Build. Secure. Optimize.</span>
          </p>
          <p>
            built with next.js + three.js · <span className="text-emerald-400">●</span> all systems operational
          </p>
        </div>
      </footer>
    </>
  );
}

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { profile } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Contact />
      </main>
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-neutral-500 sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a href="#home" className="transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}

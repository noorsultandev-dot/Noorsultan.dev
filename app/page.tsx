import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import { AboutTeaser } from "@/components/About";
import Work from "@/components/Work";
import { ExperienceTeaser } from "@/components/Experience";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Marquee />
        <AboutTeaser />
        <Work />
        <ExperienceTeaser />
        <CtaBand>
          Let&apos;s build something <span className="font-serif font-normal italic text-accent">good</span>.
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}

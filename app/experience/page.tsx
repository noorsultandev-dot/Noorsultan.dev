import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Experience from "@/components/Experience";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Experience — Noor Sultan",
  description:
    "Noor Sultan's work history: WordPress developer at SpeedX Marketing and IndusBird Technologies, and frontend developer at Techowdy.",
};

export default function ExperiencePage() {
  return (
    <>
      <Nav />
      <main id="top">
        <PageHeader
          label="Experience"
          intro="2 years and 7 months across three companies, building, securing and maintaining client websites."
        >
          Where I&apos;ve <span className="font-serif font-normal italic text-accent">worked</span>.
        </PageHeader>
        <Experience />
        <CtaBand>
          Need this experience on your <span className="font-serif font-normal italic text-accent">project</span>?
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}

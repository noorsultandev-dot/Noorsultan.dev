import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import About from "@/components/About";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About — Noor Sultan",
  description:
    "About Noor Sultan, a Lahore-based web developer who builds WordPress, Shopify, GoHighLevel and HubSpot websites and recovers hacked ones.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <PageHeader
          label="About"
          intro="Web developer in Lahore. I build sites on WordPress, Shopify, GoHighLevel and HubSpot, and I fix the ones that get hacked."
        >
          I build websites, and I keep them <span className="font-serif font-normal italic text-accent">standing</span>.
        </PageHeader>
        <About />
        <CtaBand>
          Want to work <span className="font-serif font-normal italic text-accent">together</span>?
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}

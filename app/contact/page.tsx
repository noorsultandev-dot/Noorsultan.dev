import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact — Noor Sultan",
  description: "Get in touch with Noor Sultan about a new website, a store, a migration or a hacked site.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <Contact />
      </main>
      <Footer />
    </>
  );
}

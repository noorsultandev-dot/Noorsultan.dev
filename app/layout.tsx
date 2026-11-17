import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://noorsultan.dev"),
  title: "Noor Sultan — Web Developer & Website Security Specialist",
  description:
    "Noor Sultan is a Lahore-based web developer building and securing WordPress, Shopify and GoHighLevel websites: hacked-site recovery, DDoS mitigation, migrations and fast, SEO-friendly builds.",
  keywords: [
    "Noor Sultan",
    "WordPress Developer",
    "Shopify Developer",
    "GoHighLevel Developer",
    "Website Security",
    "Hacked Website Recovery",
    "Lahore",
  ],
  openGraph: {
    title: "Noor Sultan — Web Developer",
    description: "WordPress, Shopify and GoHighLevel websites that are fast, secure and built to convert.",
    type: "website",
    images: ["/portrait.png"],
  },
};

export const viewport: Viewport = { themeColor: "#0a0a0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

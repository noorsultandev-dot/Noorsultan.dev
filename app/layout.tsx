import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
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
    title: "Noor Sultan — NS.dev",
    description: "Build. Secure. Optimize. WordPress, Shopify & website security specialist.",
    type: "website",
    images: ["/portrait.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#03050a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

// All site content lives here, taken from Noor Sultan's resume.
// Edit this file to update the website.

export const profile = {
  name: "Noor Sultan",
  handle: "NS.dev",
  role: "Web Developer",
  titles: ["WordPress Developer", "Shopify Developer", "Website Security Specialist"],
  location: "Lahore, Pakistan",
  experience: "2+ Years",
  email: "noorsultan.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/noor-sultan-dev",
  github: "https://github.com/noorsultandev-dot",
  status: "Available for Opportunities",
  languages: ["English", "Urdu", "Punjabi"],
  summary:
    "Web developer with 2 years 7 months of experience building, customizing, securing and maintaining WordPress, Shopify and multi-CMS websites. I recover hacked sites, stop bot and DDoS attacks, and trace how attackers got in, then harden everything so it doesn't happen again.",
};

export const heroSnippets = {
  developer: `const developer = {
  name: "Noor Sultan",
  role: "Web Developer",
  experience: "2+ Years",
  passion: "Building Digital Experiences"
};`,
  future: `function buildFuture() {
  return "Turning Ideas Into Reality";
}`,
  secure: `// harden.ts
await site.scan({ malware: true });
waf.block(attacker.ip);
site.status = "secure";`,
};

export const terminalScript: { cmd: string; out: string[] }[] = [
  { cmd: "whoami", out: ["Noor Sultan"] },
  { cmd: "role", out: ["WordPress Developer | Website Security Specialist"] },
  { cmd: "skills", out: ["JavaScript, React, WordPress, Shopify, Three.js"] },
  { cmd: "location", out: ["Lahore, Pakistan"] },
  { cmd: "status", out: ["Available for Opportunities"] },
];

export const aboutCode = `// About Me
const NoorSultan = {
  profession: "Web Developer",
  experience: "2 years 7 months",
  location: "Lahore, Pakistan",
  specialization: [
    "WordPress Development",
    "Shopify Development",
    "Website Security",
    "Frontend Development"
  ],
  education: "BS Software Engineering @ Virtual University",
  languages: ["English", "Urdu", "Punjabi"],
  mission: "Build. Secure. Optimize."
};

export default NoorSultan;`;

export const skillGroups: { name: string; file: string; color: string; items: string[] }[] = [
  {
    name: "Frontend",
    file: "frontend.ts",
    color: "#22d3ee",
    items: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap", "Responsive Design", "React", "Three.js"],
  },
  {
    name: "WordPress",
    file: "wordpress.php",
    color: "#a78bfa",
    items: ["WordPress", "Elementor", "Divi", "Avada", "Jet Plugins", "WooCommerce", "Contact Form 7", "Theme Customization"],
  },
  {
    name: "CMS Platforms",
    file: "cms.json",
    color: "#4ade80",
    items: ["Shopify", "HubSpot", "GoHighLevel", "Wix"],
  },
  {
    name: "Security & Incident Response",
    file: "security.sh",
    color: "#f472b6",
    items: [
      "Hacked Site Recovery",
      "Malware Removal",
      "Bot & DDoS Mitigation",
      "Cloudflare WAF",
      "Log Analysis",
      "Attack Forensics",
      "Server Hardening",
      "Wordfence",
      "WPMU DEV Defender",
    ],
  },
  {
    name: "Hosting & Infra",
    file: "infra.yml",
    color: "#fbbf24",
    items: ["WPMU DEV", "Cloudflare", "Hostinger", "WHM", "cPanel", "SiteGround", "Vercel"],
  },
  {
    name: "Integrations & Workflow",
    file: "workflow.md",
    color: "#38bdf8",
    items: ["REST APIs", "Google Analytics", "Tag Manager", "GitHub", "On-Page SEO", "Performance", "AI-Assisted Dev"],
  },
];

export const experience = [
  {
    hash: "a3f9c21",
    role: "WordPress Developer",
    company: "SpeedX Marketing",
    period: "Dec 2024 – Present",
    current: true,
    points: [
      "Build and maintain WordPress sites with Elementor, Divi, Avada and Jet Plugins, plus WooCommerce and Shopify stores.",
      "Recover hacked client sites end to end: remove malware and injected code, restore clean backups, close the entry point, harden.",
      "Trace attacks through server access and error logs (vulnerable plugins, weak credentials, backdoors) and document findings.",
      "Stop bot and DDoS attacks with Cloudflare WAF rules, rate limiting and IP blocking.",
      "WPMU DEV server specialist: hosting, Hub, Defender, uptime monitoring and Snapshot backups.",
      "Migrate sites across WordPress, Shopify, HubSpot, GoHighLevel and Wix while keeping SEO intact.",
    ],
  },
  {
    hash: "7d02be4",
    role: "WordPress Developer",
    company: "IndusBird Technologies",
    period: "Jun 2024 – Dec 2024",
    current: false,
    points: [
      "Built WordPress websites and landing pages with Elementor, Divi and Avada.",
      "Configured and customized plugins to extend functionality and simplify content management.",
      "Delivered responsive, cross-browser sites with SEO-friendly practices and ongoing maintenance.",
    ],
  },
  {
    hash: "1c4e8f0",
    role: "Frontend Developer",
    company: "Faisalabad Techowdy Software House",
    period: "Mar 2024 – May 2024",
    current: false,
    points: [
      "Turned UI designs into working HTML, CSS and JavaScript pages.",
      "Built Bootstrap layouts and jQuery interactions; fixed cross-browser and mobile issues.",
    ],
  },
];

// Featured client builds (GoHighLevel). Add the live URL to `url`, and a
// screenshot at public/projects/<repo>.jpg (then set `image`) to show it.
export const platforms = ["WordPress", "GoHighLevel", "HubSpot", "Custom", "AI Websites"] as const;
export type Platform = (typeof platforms)[number];

export type ClientProject = {
  repo: string;
  client: string;
  platform: Platform;
  location: string;
  industry: string;
  headline: string;
  description: string;
  sections: string[];
  tags: string[];
  brand: { primary: string; accent: string; dark: string };
  url?: string;
  image?: string;
  /** Tall full-page screenshot shown under the hero image. */
  imageFull?: string;
  /** How far down the full-page image its hero ends, as % of its width. */
  fullOffset?: number;
};

export const clientProjects: ClientProject[] = [
  {
    repo: "power-champions",
    client: "PowerChampions",
    platform: "HubSpot",
    location: "Nationwide, USA",
    industry: "Critical Power Network",
    headline: "A national network rooted in trust, integrity and a shared purpose",
    description:
      "Main site for a national network of generator service providers: company values, the market-partner model, partner testimonials, news, blog, podcast and careers.",
    sections: ["Hero", "Our Values", "Partner Model", "Testimonials", "Become a Partner"],
    tags: ["HubSpot", "Multi-site", "Blog", "Lead Gen"],
    brand: { primary: "#eaa607", accent: "#ffffff", dark: "#101010" },
    url: "https://www.power-champions.com/",
  },
  {
    repo: "power-champions-greenville",
    client: "PowerChampions of Greenville",
    platform: "HubSpot",
    location: "Greenville, SC",
    industry: "Commercial Generators",
    headline: "Commercial Generator Services in Greenville, SC",
    description:
      "Local branch site: generator sales, installation, repair, rentals and load bank testing, the industries served, FAQs and request-service calls to action.",
    sections: ["Hero", "Services", "Industries", "Why Us", "Request a Quote"],
    tags: ["HubSpot", "Local SEO", "Service Pages", "Lead Gen"],
    brand: { primary: "#f57500", accent: "#ffffff", dark: "#101010" },
    url: "https://www.greenville.power-champions.com/",
  },
  {
    repo: "power-champions-atlanta",
    client: "PowerChampions of Georgia",
    platform: "HubSpot",
    location: "Atlanta, GA",
    industry: "Commercial Generators",
    headline: "Commercial Generator Services in Atlanta, GA",
    description:
      "Metro Atlanta branch site with a stats band, four service cards, industry pages, client results and 24/7 emergency service requests.",
    sections: ["Hero", "Stats", "Services", "Industries", "Client Results"],
    tags: ["HubSpot", "Local SEO", "Industry Pages", "Lead Gen"],
    brand: { primary: "#b8862b", accent: "#ffffff", dark: "#0f1317" },
    url: "https://www.atlanta.power-champions.com/",
  },
  {
    repo: "triple-t-power",
    client: "Triple T Critical Power Services",
    platform: "HubSpot",
    location: "Columbia, SC",
    industry: "Electrical & Generators",
    headline: "Commercial Electrical Services in Columbia",
    description:
      "Electrical and generator services site: core services, critical-facility focus, six industries supported and consultation requests.",
    sections: ["Hero", "Generators", "Core Services", "Industries", "Consultation"],
    tags: ["HubSpot", "Service Pages", "Local SEO", "Lead Gen"],
    brand: { primary: "#0c5394", accent: "#ffffff", dark: "#082f55" },
    url: "https://www.tripletpower.com/",
  },
  {
    repo: "asta-learning",
    client: "American Skilled Trades Academy",
    platform: "HubSpot",
    location: "USA",
    industry: "Trades Training",
    headline: "American Skilled Trades Academy",
    description:
      "Training academy site for technicians and employers: programs, partners, events and news, with enrolment and talk-to-our-team calls to action.",
    sections: ["Hero", "Who It's For", "Our Approach", "Training Programs", "Enroll"],
    tags: ["HubSpot", "Education", "Programs", "Events"],
    brand: { primary: "#0c5394", accent: "#ffffff", dark: "#082f55" },
    url: "https://www.astalearning.com/",
  },
  {
    repo: "ai-ciso",
    client: "AI CISO",
    platform: "HubSpot",
    location: "USA",
    industry: "Cybersecurity",
    headline: "Your Cybersecurity Easy Button",
    description:
      "Cybersecurity platform and virtual CISO site for SMBs and MSPs: nine platform services, partner logos, industries supported and a book-a-demo form.",
    sections: ["Hero", "Partners", "Platform", "Core Services", "Industries"],
    tags: ["HubSpot", "SaaS", "Demo Form", "Blog"],
    brand: { primary: "#e37d30", accent: "#ffffff", dark: "#1c4073" },
    url: "https://aiciso.com/",
  },
  {
    repo: "ubuildit-north-texas",
    image: "/projects/ubuildit-north-texas-hero.jpg",
    imageFull: "/projects/ubuildit-north-texas-full.jpg",
    fullOffset: 41,
    client: "UBuildIt North Texas",
    location: "North Texas",
    platform: "GoHighLevel",
    industry: "Home Building",
    headline: "Build Your Dream Home — With Expert Help & Full Control",
    description:
      "Lead-generation site for a home-building consultancy: services grid, team profiles, FAQ accordion, testimonials and quote CTAs throughout.",
    sections: ["Hero + CTA", "About", "Services", "Team", "FAQ", "Testimonials"],
    tags: ["GoHighLevel", "Funnel", "Lead Gen", "Responsive"],
    brand: { primary: "#9b1c2c", accent: "#ffffff", dark: "#0b0b0f" },
  },
  {
    repo: "mi-floor-coatings",
    image: "/projects/mi-floor-coatings-hero.jpg",
    imageFull: "/projects/mi-floor-coatings-full.jpg",
    fullOffset: 43,
    client: "Mi Floor Coatings",
    location: "Southeast Michigan",
    platform: "GoHighLevel",
    industry: "Concrete Coatings",
    headline: "Porch & Patio Floor Coating Services in Southeast Michigan",
    description:
      "Veteran-owned coatings brand: service pages, trust badges, review highlights, before/after gallery and click-to-call quote flow.",
    sections: ["Hero + Reviews", "Why Us", "Services", "Testimonials", "Before/After"],
    tags: ["GoHighLevel", "Local SEO", "Click-to-Call", "Gallery"],
    brand: { primary: "#2f5f9e", accent: "#ffffff", dark: "#1d3f6e" },
  },
  {
    repo: "tdi-air-conditioning",
    image: "/projects/tdi-air-conditioning-hero.jpg",
    imageFull: "/projects/tdi-air-conditioning-full.jpg",
    fullOffset: 33,
    client: "TDi Air Conditioning",
    location: "Tyler, TX",
    platform: "GoHighLevel",
    industry: "HVAC",
    headline: "Fast, Reliable AC Installs & Replacements in Tyler, TX",
    description:
      "Two-office HVAC site with per-office call buttons, service cards, areas served, partner carousel, FAQ and an embedded contact form.",
    sections: ["Hero", "Services", "Areas Served", "Partners", "FAQ", "Contact Form"],
    tags: ["GoHighLevel", "Forms", "Carousel", "Local SEO"],
    brand: { primary: "#0b2f8f", accent: "#ffffff", dark: "#06205f" },
  },
  {
    repo: "ktm-exteriors-roofing",
    image: "/projects/ktm-exteriors-roofing-hero.jpg",
    imageFull: "/projects/ktm-exteriors-roofing-full.jpg",
    fullOffset: 34,
    client: "KTM Exteriors & Roofing",
    location: "Boston, MA",
    platform: "GoHighLevel",
    industry: "Roofing",
    headline: "Boston's Trusted Roof Installation & Replacement Company",
    description:
      "Roofing contractor site: service gallery, installation process steps, Google reviews feed, FAQ, contact form and certification logos.",
    sections: ["Hero", "Services", "Process", "Google Reviews", "FAQ", "Contact"],
    tags: ["GoHighLevel", "Reviews", "Forms", "Responsive"],
    brand: { primary: "#1e7fd6", accent: "#ffffff", dark: "#0f2236" },
  },
  {
    repo: "702-plumbair",
    image: "/projects/702-plumbair-hero.jpg",
    imageFull: "/projects/702-plumbair-full.jpg",
    fullOffset: 33,
    client: "702 PlumbAIR",
    location: "Las Vegas, NV",
    platform: "GoHighLevel",
    industry: "Plumbing & AC",
    headline: "Fast, Reliable Air Conditioning Repair in Las Vegas",
    description:
      "Same-day AC repair site with problem-based service cards, testimonials, FAQ and a schedule-service booking form.",
    sections: ["Hero", "Why Us", "Services", "Testimonials", "FAQ", "Booking"],
    tags: ["GoHighLevel", "Booking", "Lead Gen", "Responsive"],
    brand: { primary: "#9fd36b", accent: "#0d3b5e", dark: "#0d3b5e" },
  },
  {
    repo: "ns-dev-portfolio",
    client: "NS.dev Portfolio",
    platform: "Custom",
    location: "Lahore, PK",
    industry: "Personal Site",
    headline: "Websites that are fast, secure and built to convert.",
    description:
      "This website. Hand-coded with Next.js, Tailwind CSS and a Three.js dot wave, with a filterable projects page.",
    sections: ["Hero", "About", "Projects", "Experience", "Contact"],
    tags: ["Next.js", "Three.js", "Tailwind CSS", "Framer Motion"],
    brand: { primary: "#8fb321", accent: "#ffffff", dark: "#0a0a0a" },
    url: "https://github.com/noorsultandev-dot/Noorsultan.dev",
  },
];

// Capability cards (skill areas from the resume).
export const projects = [
  {
    repo: "hacked-site-recovery",
    description:
      "End-to-end recovery of compromised WordPress sites: malware and injected-code removal, clean backup restore, entry-point closure and hardening.",
    tags: ["WordPress", "Wordfence", "Forensics", "Backups"],
    lang: { name: "PHP", color: "#a78bfa" },
    stars: "security",
    link: "#contact",
    preview: ["$ scan --deep ./wp-content", "! 14 infected files found", "✓ cleaned · entry point closed"],
  },
  {
    repo: "ddos-shield",
    description:
      "Bot and DDoS mitigation for client sites using Cloudflare WAF rules, rate limiting, IP blocking and live monitoring.",
    tags: ["Cloudflare", "WAF", "Rate Limiting", "Monitoring"],
    lang: { name: "Config", color: "#fbbf24" },
    stars: "security",
    link: "#contact",
    preview: ["req/s ▁▂▇█▇▃▁", "rule: block bad-bots", "✓ traffic normalized"],
  },
  {
    repo: "ecommerce-stores",
    description:
      "WooCommerce and Shopify stores: themes, products, apps and plugins, and checkout flows built for real client operations.",
    tags: ["WooCommerce", "Shopify", "Checkout", "Liquid"],
    lang: { name: "Liquid", color: "#4ade80" },
    stars: "commerce",
    link: "#contact",
    preview: ["cart.add(product)", "checkout.flow = 'one-page'", "✓ store live"],
  },
  {
    repo: "cms-migrations",
    description:
      "Site migrations across WordPress, Shopify, HubSpot, GoHighLevel and Wix, and between hosts, with SEO structure preserved.",
    tags: ["Migration", "SEO", "HubSpot", "GoHighLevel"],
    lang: { name: "Shell", color: "#22d3ee" },
    stars: "ops",
    link: "#contact",
    preview: ["$ migrate --from wix --to wp", "301 redirects: 128 mapped", "✓ rankings preserved"],
  },
  {
    repo: "wpmu-dev-ops",
    description:
      "Managing client fleets on WPMU DEV: hosting, Hub, Defender security, uptime monitoring and Snapshot backups.",
    tags: ["WPMU DEV", "Hosting", "Uptime", "Snapshots"],
    lang: { name: "YAML", color: "#f472b6" },
    stars: "ops",
    link: "#contact",
    preview: ["uptime: 99.98%", "snapshot: nightly 02:00", "defender: ✓ hardened"],
  },
  {
    repo: "responsive-frontends",
    description:
      "Pixel-accurate HTML, CSS and JavaScript builds from UI designs, with Bootstrap layouts and jQuery interactions.",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    lang: { name: "JavaScript", color: "#facc15" },
    stars: "frontend",
    link: "#contact",
    preview: ["<section class='hero'>", "@media (max-width: 768px)", "✓ lighthouse 98"],
  },
];

export const navItems = [
  { id: "home", file: "home.tsx" },
  { id: "about", file: "about.tsx" },
  { id: "projects", file: "projects.tsx" },
  { id: "contact", file: "contact.tsx" },
];

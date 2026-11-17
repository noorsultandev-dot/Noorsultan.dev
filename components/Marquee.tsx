const items = [
  "WordPress",
  "Shopify",
  "GoHighLevel",
  "WooCommerce",
  "Elementor",
  "Cloudflare",
  "HubSpot",
  "WPMU DEV",
  "JavaScript",
  "Divi",
  "Wix",
  "Wordfence",
];

export default function Marquee() {
  const row = items.concat(items);
  return (
    <div className="overflow-hidden border-y border-white/10 py-6" aria-hidden>
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap pl-14 text-xl font-medium text-neutral-500 sm:text-2xl">
            {t}
            <span className="ml-14 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

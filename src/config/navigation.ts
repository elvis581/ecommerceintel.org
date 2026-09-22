export type NavItem = { label: string; href: string };
export type NavGroup = { label: string; href?: string; items: NavItem[] };

export const navigation: NavGroup[] = [
  {
    label: "Reviews",
    href: "/reviews",
    items: [
      { label: "WinningHunter Review", href: "/winninghunter-review" },
      { label: "Kalodata Review", href: "/reviews/kalodata" },
      { label: "PipiAds Review", href: "/reviews/pipiads" },
      { label: "ShopHunter Review", href: "/reviews/shophunter" },
      { label: "TrendTrack Review", href: "/reviews/trendtrack" },
    ],
  },
  {
    label: "Comparisons",
    href: "/compare",
    items: [
      { label: "WinningHunter vs Kalodata", href: "/winninghunter-vs-kalodata" },
      { label: "WinningHunter vs PipiAds", href: "/winninghunter-vs-pipiads" },
      { label: "WinningHunter vs ShopHunter", href: "/winninghunter-vs-shophunter" },
    ],
  },
  {
    label: "Pricing",
    href: "/winninghunter-pricing",
    items: [
      { label: "WinningHunter Pricing", href: "/winninghunter-pricing" },
      { label: "Pricing in the Review", href: "/winninghunter-review" },
    ],
  },
  {
    label: "Alternatives",
    href: "/winninghunter-alternatives",
    items: [
      { label: "WinningHunter Alternatives", href: "/winninghunter-alternatives" },
      { label: "Compare Tools Before Switching", href: "/compare" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    items: [
      { label: "Resource Library", href: "/resources" },
      { label: "Our Methodology", href: "/methodology" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    ],
  },
  { label: "About", href: "/about", items: [] },
];

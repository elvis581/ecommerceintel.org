export type NavItem = { label: string; href: string };
export type NavGroup = { label: string; href?: string; items: NavItem[] };

export const navigation: NavGroup[] = [
  { label: "Reviews", href: "/reviews", items: [] },
  { label: "Comparisons", href: "/compare", items: [] },
  { label: "Pricing", href: "/winninghunter-pricing", items: [] },
  { label: "Alternatives", href: "/winninghunter-alternatives", items: [] },
  { label: "Resources", href: "/resources", items: [] },
  { label: "About", href: "/about", items: [] },
];

export type NavItem = { label: string; href: string };
export type NavGroup = { label: string; href?: string; items: NavItem[] };

export const navigation: NavGroup[] = [
  { label: "Reviews", href: "/reviews", items: [] },
  { label: "Comparisons", href: "/compare", items: [] },
  { label: "WinningHunter", href: "/winninghunter-review", items: [] },
  { label: "Resources", href: "/resources", items: [] },
];

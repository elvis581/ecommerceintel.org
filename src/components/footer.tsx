import { Logo } from "./logo";
import { TrackedLink } from "./tracked-link";

const reviewLinks = [
  { label: "All Reviews", href: "/reviews" },
  { label: "WinningHunter Review", href: "/winninghunter-review" },
  { label: "Kalodata Review", href: "/reviews/kalodata" },
  { label: "PipiAds Review", href: "/reviews/pipiads" },
];
const comparisonLinks = [
  { label: "Comparison Hub", href: "/compare" },
  { label: "WinningHunter vs Kalodata", href: "/winninghunter-vs-kalodata" },
  { label: "WinningHunter vs PipiAds", href: "/winninghunter-vs-pipiads" },
  { label: "WinningHunter Alternatives", href: "/winninghunter-alternatives" },
];
const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/methodology" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Resources", href: "/resources" },
];

export function Footer() {
  return <footer className="footer-ledger border-t border-slate-200 bg-slate-950 text-slate-300">
    <div className="site-container grid gap-10 py-12 md:grid-cols-[1.1fr_2fr]">
      <div><Logo inverse /><p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">A small research desk for ecommerce product, ad, store and marketplace decisions.</p></div>
      <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
        {[{ label: "Reviews", items: reviewLinks }, { label: "Comparisons", items: comparisonLinks }, { label: "About", items: companyLinks }].map((group) => <div key={group.label}><p className="mb-3 text-xs font-bold uppercase text-white">{group.label}</p>{group.items.map((item) => <TrackedLink key={item.href} href={item.href} eventName="internal_link_click" eventParams={{ placement: "footer", label: item.label }} className="mb-2 block text-sm hover:text-white">{item.label}</TrackedLink>)}</div>)}
      </div>
    </div>
    <div className="border-t border-slate-800"><div className="site-container flex flex-col gap-2 py-5 text-xs text-slate-500 sm:flex-row sm:justify-between"><p>© 2026 Ecommerce Intel. Independent ecommerce research.</p><p>Product names belong to their respective owners.</p></div></div>
  </footer>;
}

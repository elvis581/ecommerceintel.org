import { ArrowRight } from "lucide-react";
import { TrackedLink } from "./tracked-link";

const guides = [
  { label: "In-depth review", title: "Revid AI for ecommerce video creators", description: "Product video, ad creative and short-form workflows, with limits explained.", href: "/revid-ai-review", accent: "bg-blue-600" },
  { label: "Creator workflow", title: "Crayo AI for ecommerce short videos", description: "Faceless formats, captions and social-ready drafts for product content.", href: "/crayo-ai-review", accent: "bg-emerald-600" },
  { label: "Business workflow", title: "Dokie AI for ecommerce teams", description: "Sales decks, partner pitches, reports and presentation first drafts.", href: "/dokie-ai-review", accent: "bg-rose-500" },
];

export function FeaturedGuides() { return <div className="grid gap-4 lg:grid-cols-3">{guides.map((guide) => <article key={guide.href} className="guide-card"><div className={`h-1.5 ${guide.accent}`} /><div className="p-6"><p className="eyebrow">{guide.label}</p><h3>{guide.title}</h3><p>{guide.description}</p><TrackedLink href={guide.href}>Read review<ArrowRight className="size-4" /></TrackedLink></div></article>)}</div>; }

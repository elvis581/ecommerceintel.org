import { ArrowUpRight } from "lucide-react";
import { articlePageMap } from "@/config/pages";
import { TrackedLink } from "./tracked-link";
export function InternalLinks({ slugs }: { slugs: string[] }) { return <section className="article-section"><h2>Related research paths</h2><div className="grid gap-3 sm:grid-cols-2">{slugs.map((slug) => { const page = articlePageMap[slug]; const hub = slug === "reviews" ? { h1: "Reviews & Comparisons" } : null; const target = page || hub; return target ? <TrackedLink key={slug} href={`/${slug}`} eventName="internal_link_click" eventParams={{placement:"related_content",destination:`/${slug}`}} className="internal-link"><span>{target.h1}</span><ArrowUpRight className="size-4 shrink-0" /></TrackedLink> : null; })}</div></section>; }

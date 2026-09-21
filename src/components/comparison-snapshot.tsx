import type { ArticlePage } from "@/config/pages";
import { getPricingSummary } from "@/config/pricing";
import { TrackedLink } from "./tracked-link";

export function ComparisonSnapshot({ page }: { page: ArticlePage }) {
  const match = page.h1.match(/^(.+?)\s+vs\s+(.+?)(?::|$)/i);
  const left = match?.[1] || "Tool A";
  const right = match?.[2] || "Tool B";
  const leftKey = left.toLowerCase().replaceAll(" ", "");
  const rightKey = right.toLowerCase().replaceAll(" ", "");
  const leftPrice = getPricingSummary(leftKey);
  const rightPrice = getPricingSummary(rightKey);
  return <section className="comparison-snapshot" aria-label="Comparison decision snapshot">
    <div className="comparison-snapshot-heading"><div><p className="eyebrow">Winner by use case</p><h2>Choose the workflow that starts with your real entity</h2></div><p>{page.verdict}</p></div>
    <div className="comparison-snapshot-grid"><div><span>Best for {left.toLowerCase()} workflows</span><strong>{left}</strong><p>{page.bestFor[0] || "A defined recurring research brief"}</p><small>{leftPrice}</small></div><div><span>Best for {right.toLowerCase()} workflows</span><strong>{right}</strong><p>{page.bestFor[1] || "A different market or entity model"}</p><small>{rightPrice}</small></div><div><span>Best overall</span><strong>Depends on the starting entity</strong><p>Test {left} and {right} against one shared brief before choosing.</p><TrackedLink href="/compare" eventName="internal_link_click" eventParams={{placement:"comparison_snapshot",label:"Open comparison hub"}}>See all comparisons</TrackedLink></div></div>
  </section>;
}

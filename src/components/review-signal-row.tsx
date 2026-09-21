import type { ArticlePage } from "@/config/pages";
import { getPricingSummary } from "@/config/pricing";
import { TrackedLink } from "./tracked-link";
import { AffiliateCta } from "./affiliate-cta";

export function ReviewSignalRow({ page }: { page: ArticlePage }) {
  const bestFor = page.bestFor.slice(0, 2).join(" · ");
  const watchFor = page.watchFor.slice(0, 2).join(" · ");
  const price = page.toolKey ? getPricingSummary(page.toolKey) : "Check current plans";
  const verdict = page.verdict.split(/(?<=[.!?])\s+/)[0];
  return <section className="review-signal-row" aria-label="Review signals">
    <div className="review-signal-heading">
      <div><p className="eyebrow">At a glance</p><h2>Decide whether this tool belongs on the shortlist</h2></div>
      <span className="review-signal-basis">{page.researchStatus || "Operator workflow review"}</span>
    </div>
    <div className="review-signal-grid">
      <div><p>Verdict</p><strong>{verdict}</strong></div>
      <div><p>Best for</p><strong>{bestFor}</strong></div>
      <div><p>Watch first / not ideal for</p><strong>{watchFor}</strong></div>
      <div><p>Starting price</p><strong>{price}</strong></div>
      <div><p>Next action</p><TrackedLink href={page.toolKey === "winninghunter" ? "/winninghunter-pricing" : "/reviews"} eventName="internal_link_click" eventParams={{placement:"review_signal_row",label:"Check current plans"}}>Check current plans</TrackedLink></div>
    </div>
    {page.toolKey && <div className="review-signal-cta"><AffiliateCta toolKey={page.toolKey} ctaLabel={page.toolKey === "winninghunter" ? "Start with WinningHunter" : "Check the current product"} heading={page.toolKey === "winninghunter" ? "Test the current WinningHunter workflow" : "Check the current product terms"} description="Use one known research brief before choosing a longer commitment." placement="review_decision_snapshot" secondaryHref={page.toolKey === "winninghunter" ? "/winninghunter-pricing" : undefined} secondaryLabel={page.toolKey === "winninghunter" ? "Review pricing" : undefined} /></div>}
  </section>;
}

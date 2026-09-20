import type { ArticlePage } from "@/config/pages";

export function ReviewSignalRow({ page }: { page: ArticlePage }) {
  const bestFor = page.bestFor.slice(0, 2).join(" · ");
  const watchFor = page.watchFor.slice(0, 2).join(" · ");
  return <section className="review-signal-row" aria-label="Review signals">
    <div className="review-signal-heading">
      <div><p className="eyebrow">At a glance</p><h2>Decide whether this tool belongs on the shortlist</h2></div>
      <span className="review-signal-basis">{page.researchStatus || "Operator workflow review"}</span>
    </div>
    <div className="review-signal-grid">
      <div><p>Best for</p><strong>{bestFor}</strong></div>
      <div><p>Watch first</p><strong>{watchFor}</strong></div>
    </div>
  </section>;
}

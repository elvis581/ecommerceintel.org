import type { ArticlePage } from "@/config/pages";
import { getGeoContext } from "@/config/geo";

export function DecisionSnapshot({ page }: { page: ArticlePage }) {
  const context = getGeoContext(page.slug);
  return (
    <section className="geo-summary" aria-labelledby="decision-snapshot-title">
      <p className="eyebrow">Evidence card</p>
      <h2 id="decision-snapshot-title">What this page can support</h2>
      <dl>
        <div><dt>Research subject</dt><dd>{context.primaryTopic}</dd></div>
        <div><dt>Useful for</dt><dd>{page.bestFor.slice(0, 2).join(" and ")}</dd></div>
        <div><dt>Constraint</dt><dd>{page.watchFor.slice(0, 2).join("; ")}</dd></div>
        <div><dt>Evidence basis</dt><dd>{context.citations.length ? "Public product information and the official sources listed in this guide." : "Ecommerce Intel policy, visible site behavior and the page terms described below."}</dd></div>
      </dl>
    </section>
  );
}

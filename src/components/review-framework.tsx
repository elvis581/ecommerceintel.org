import type { ArticlePage, ContentSection } from "@/config/pages";
import { pricingByTool } from "@/config/pricing";

export const reviewFrameworkTocSections: ContentSection[] = [
  { heading: "Evidence & Test Scope", id: "review-framework-scope" },
  { heading: "How I Evaluated", id: "review-method" },
  { heading: "Where It Works Well", id: "where-works-well" },
  { heading: "Pricing & Real Usage Limits", id: "pricing-real-usage" },
  { heading: "What Could Be Better", id: "what-could-be-better" },
  { heading: "Support & Billing Experience", id: "support-billing" },
];

const productName = (page: ArticlePage) => {
  const record = page.toolKey ? pricingByTool[page.toolKey as keyof typeof pricingByTool] : undefined;
  if (record?.tool) return record.tool;
  return page.h1.replace(/\s+Review.*$/i, "");
};

const planVerification = (plan: (typeof pricingByTool)[keyof typeof pricingByTool]["plans"][number]) => {
  if ("features" in plan && Array.isArray(plan.features)) return plan.features.slice(0, 3).join("; ");
  return "Credits, history, exports and seats";
};

export function ReviewFramework({ page }: { page: ArticlePage }) {
  if (!page.reviewFramework) return null;
  const name = productName(page);
  const record = page.toolKey ? pricingByTool[page.toolKey as keyof typeof pricingByTool] : undefined;
  const plans = record?.plans || [];

  return <>
    <section className="article-section review-framework-section" id="review-framework-scope">
      <h2>Evidence &amp; Test Scope</h2>
      <div className="article-table"><table><tbody>
        <tr><th scope="row">Evidence basis</th><td>{page.reviewBasisLabel || page.researchStatus || "Public product research"}</td></tr>
        <tr><th scope="row">Primary workflow</th><td>{page.reviewWorkflow || "The workflow described in the article"}</td></tr>
        <tr><th scope="row">Operator fit</th><td>{page.bestFor[0]}</td></tr>
        <tr><th scope="row">Decision question</th><td>Does {name} improve {page.reviewFocus || "the defined research decision"} enough to justify a repeatable workflow?</td></tr>
        <tr><th scope="row">Unrecorded evidence</th><td>No account-level result counts, revenue, conversion rate or controlled commercial outcome are claimed on this page.</td></tr>
      </tbody></table></div>
      <p>This scope keeps {name} useful as a decision aid while leaving supplier, margin, policy and first-party performance checks with the operator.</p>
    </section>
    <section className="article-section review-framework-section" id="review-method">
      <h2>How I Evaluated {name}</h2>
      <p>This {name} review uses {page.reviewBasisLabel || page.researchStatus || "public product research"} as its evidence basis. It separates vendor-stated capability, public platform evidence and editorial interpretation, then checks whether the workflow improves a defined operator decision.</p>
      <p>The available {name} evidence does not support a durable numeric score. A score would imply a repeatable account benchmark that pricing, coverage, data freshness and plan access have not established here.</p>
    </section>

    <section className="article-section review-framework-section" id="where-works-well">
      <h2>Where {name} Works Well</h2>
      {page.reviewFramework.feedback.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {page.reviewFramework.feedback.bullets && <ul>{page.reviewFramework.feedback.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
    </section>

    <section className="article-section review-framework-section" id="pricing-real-usage">
      <h2>Pricing &amp; Real Usage Limits</h2>
      <p>{plans.length ? `The current public snapshot lists ${plans.map((plan) => `${plan.name} at ${plan.monthly}`).join(", ")}. Treat those amounts as dated reference points and verify the checkout total, renewal and included limits before subscribing.` : `A current public paid amount for ${name} was not confirmed in the available evidence. Check the official plan or account flow before treating any search result, discount or comparison figure as current.`}</p>
      {plans.length > 0 && <div className="article-table"><table><thead><tr><th scope="col">Plan</th><th scope="col">Public monthly amount</th><th scope="col">What to verify</th></tr></thead><tbody>{plans.map((plan) => <tr key={plan.name}><th scope="row">{plan.name}</th><td>{plan.monthly}</td><td>{planVerification(plan)}</td></tr>)}</tbody></table><p className="article-table-caption">{name} amounts are a dated snapshot. Annual discounts, renewal totals, credits and account-level limits require an official check.</p></div>}
      <div className="review-usage-grid">
        <div><h3>Light user</h3><p>Use {name} for one or two briefs each week. Confirm that the entry plan exposes the required records and that manual verification time still makes the subscription worthwhile.</p></div>
        <div><h3>Daily researcher</h3><p>Use {name} for repeated searches or monitoring most workdays. Measure credits, history, exports and saved records in a normal week before upgrading.</p></div>
        <div><h3>Team</h3><p>Use {name} across several operators or clients. Check seats, shared evidence, export retention, renewal ownership and whether each team member has a distinct recurring job.</p></div>
      </div>
    </section>

    <section className="article-section review-framework-section" id="what-could-be-better">
      <h2>What Could Be Better</h2>
      <ul>{page.reviewFramework.changes.map((change) => <li key={change}>{change}</li>)}</ul>
    </section>

    <section className="article-section review-framework-section" id="support-billing">
      <h2>Support &amp; Billing Experience</h2>
      {page.reviewFramework.support.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {page.reviewFramework.support.bullets && <ul>{page.reviewFramework.support.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
    </section>
  </>;
}

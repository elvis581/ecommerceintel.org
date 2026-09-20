import type { ArticlePage, ContentBlock } from "@/config/pages";
import { pricingNotice } from "@/config/pricing";
import { Breadcrumb } from "./breadcrumb";
import { LastUpdated } from "./last-updated";
import { QuickVerdict } from "./quick-verdict";
import { ProsCons } from "./pros-cons";
import { Faq } from "./faq";
import { AffiliateCta } from "./affiliate-cta";
import { DisclosureBox } from "./disclosure-box";
import { InternalLinks } from "./internal-links";
import { ComparisonTable } from "./comparison-table";
import { comparisonRowsBySlug } from "@/config/comparisons";
import { DecisionSnapshot } from "./decision-snapshot";
import { ResearchStatus } from "./research-status";
import { GuideCard } from "./guide-card";
import { OperatorView } from "./operator-view";
import { TrackedLink } from "./tracked-link";
import { Fragment } from "react";
import { ReviewDecisionCard } from "./review-decision-card";
import { SourceList } from "./source-list";
import { affiliateTools } from "@/config/affiliate";
import { ReviewSignalRow } from "./review-signal-row";

const textPanelHeadings = new Set([
  "Quick answer",
  "The operator check",
  "Final recommendation",
  "Final verdict",
  "Final buying rule",
  "The evidence boundary",
  "Start with the switching reason",
]);

export function ArticleLayout({ page }: { page: ArticlePage }) {
  const comparisonRows = comparisonRowsBySlug[page.slug];
  const ctaKeys = page.toolKeys || (page.toolKey ? [page.toolKey] : []);
  const disclosureToolKeys = page.reviewDecision ? [...ctaKeys, page.reviewDecision.toolKey] : ctaKeys;
  const hasSponsoredLink = disclosureToolKeys.some((toolKey) => {
    const tool = affiliateTools[toolKey];
    return Boolean(tool?.isAffiliateEnabled || tool?.isSponsored);
  });
  return (
    <>
    <main>
      <header className="article-header"><div className="article-container"><Breadcrumb current={page.h1} /><p className="eyebrow">{page.eyebrow}</p><h1>{page.h1}</h1><p className="article-intro">{page.intro}</p><div className="flex flex-wrap items-center gap-4"><LastUpdated />{page.kind === "legal" || page.slug === "affiliate-disclosure" ? <span className="text-sm text-slate-500">Site operator: <strong className="text-slate-700">EcommerceIntel</strong></span> : <span className="text-sm text-slate-500">Reviewed by <TrackedLink href="/about" eventName="internal_link_click" eventParams={{placement:"author_byline",label:"Elvis"}} className="font-bold text-slate-700 hover:text-emerald-700">Elvis, Ecommerce Operator</TrackedLink></span>}{page.researchStatus && <ResearchStatus status={page.researchStatus} label={page.reviewBasisLabel} />}</div>{page.kind !== "review" && page.reviewDates && <dl className="review-dates"><div><dt>Test conducted</dt><dd>{page.reviewDates.testConducted}</dd></div><div><dt>Pricing checked</dt><dd>{page.reviewDates.pricingChecked}</dd></div></dl>}</div></header>
      <article className={`article-container py-10 sm:py-14 ${page.kind === "review" ? "review-article" : ""}`}>
        {page.kind === "review" && <ReviewSignalRow page={page} />}
        {!page.hideQuickVerdict && <QuickVerdict text={page.verdict} label={page.verdictLabel} />}
        {page.reviewDecision ? <ReviewDecisionCard decision={page.reviewDecision} /> : page.earlyCta && <div className="mt-8"><AffiliateCta toolKey={page.earlyCta.toolKey} ctaLabel={page.earlyCta.label} eyebrow={page.earlyCta.eyebrow} heading={page.earlyCta.heading} description={page.earlyCta.description} placement="review_early_cta" secondaryHref={page.earlyCta.secondaryHref} secondaryLabel={page.earlyCta.secondaryLabel} /></div>}
        {!page.hideProsCons && page.kind !== "review" && <div className="mt-8"><ProsCons bestFor={page.bestFor} watchFor={page.watchFor} /></div>}
        {!page.hideDecisionSnapshot && <DecisionSnapshot page={page} />}
        {!page.hideOperatorView && !page.operatorViewAfterSection && <OperatorView slug={page.slug} />}
        {page.myView && !page.hideMyView && <section className="article-section"><h2>My View</h2><p>{page.myView}</p></section>}
        {page.cards && <section className="article-section"><h2>{page.cardsHeading || "Choose Your Next Step"}</h2><div className="grid gap-4 sm:grid-cols-2">{page.cards.map((card) => <GuideCard key={`${card.href}-${card.title}`} card={card} />)}</div></section>}
        {comparisonRows && !page.hideComparisonTable && <section className="article-section"><h2>{page.kind === "comparison" ? "Decision-Changing Comparison" : "Best Tool by Use Case"}</h2><ComparisonTable rows={comparisonRows} /></section>}
        {page.sections.map((section) => <Fragment key={section.heading}><section id={section.id} className={`article-section scroll-mt-24 ${textPanelHeadings.has(section.heading) ? "text-panel" : ""}`}><h2>{section.heading}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{section.blocks?.map((block, index) => <ArticleContentBlock key={`${section.heading}-${index}`} block={block} />)}</section>{!page.hideOperatorView && page.operatorViewAfterSection === section.heading && <OperatorView slug={page.slug} />}{page.midCta?.afterSection === section.heading && <section className="article-section"><AffiliateCta toolKey={page.midCta.toolKey} ctaLabel={page.midCta.label} eyebrow={page.midCta.eyebrow} heading={page.midCta.heading} description={page.midCta.description} placement="review_mid_cta" secondaryHref={page.midCta.secondaryHref} secondaryLabel={page.midCta.secondaryLabel} /></section>}{page.sectionCtas?.filter((cta) => cta.afterSection === section.heading).map((cta) => <section className="article-section" key={`${section.heading}-${cta.label}`}><AffiliateCta toolKey={cta.toolKey} ctaLabel={cta.label} eyebrow={cta.eyebrow} heading={cta.heading} description={cta.description} placement={`review_section_${section.id || section.heading.toLowerCase().replaceAll(" ", "_")}`} secondaryHref={cta.secondaryHref} secondaryLabel={cta.secondaryLabel} /></section>)}</Fragment>)}
        {!page.hideWorkflow && <section className="article-section workflow-steps"><h2>Decision trail</h2><ol>{page.workflow.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></section>}
        {page.showPricingNotice && <DisclosureBox text={`${pricingNotice.title}: ${pricingNotice.body}`} />}
        {!page.hideFaq && <Faq items={page.faqs} />}
        {!page.hideSourceList && <SourceList slug={page.slug} />}
        {!page.hideFinalCta && ctaKeys.length > 0 && <section className="article-section commercial-cta-section"><h2>Verify the current product record</h2><p>Open the official destination to confirm the markets, plan limits, pricing and trial terms that apply to this decision.</p><div className="grid gap-4">{page.finalCta ? <AffiliateCta toolKey={page.finalCta.toolKey} ctaLabel={page.finalCta.label} eyebrow={page.finalCta.eyebrow} heading={page.finalCta.heading} description={page.finalCta.description} placement="review_final_cta" secondaryHref={page.finalCta.secondaryHref} secondaryLabel={page.finalCta.secondaryLabel} /> : ctaKeys.map((toolKey) => <AffiliateCta key={toolKey} toolKey={toolKey} />)}</div></section>}
        <InternalLinks slugs={page.related} />
        {page.disclaimer && <p className="standard-estimate-disclaimer mt-5 text-sm leading-6 text-slate-500">{page.disclaimer}</p>}
        {page.kind !== "review" && page.kind !== "legal" && <section className="article-section decision-box"><h2>Editorial handoff</h2><p>{page.verdict}</p></section>}
      </article>
    </main>
    {!page.hideDisclosure && hasSponsoredLink && <div className="article-container py-6"><DisclosureBox sitewide /></div>}
    </>
  );
}

function ArticleContentBlock({ block }: { block: ContentBlock }) {
  if (block.type === "paragraph") return <p>{block.text}</p>;
  if (block.type === "subheading") return <h3>{block.text}</h3>;
  if (block.type === "list") return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
  if (block.type === "quote") return <blockquote>{block.text}</blockquote>;
  if (block.type === "evidenceSlot") return <figure className="evidence-slot"><div><span>{block.label}</span><p>{block.description}</p></div><figcaption>{block.caption}</figcaption></figure>;
  if (block.type === "keyFacts") return <dl className="article-key-facts">{block.items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>;
  if (block.type === "internalLink") return <div className="article-inline-link"><TrackedLink href={block.href} eventName="internal_link_click" eventParams={{placement:"article_body",label:block.label}}>{block.label}</TrackedLink>{block.description && <p>{block.description}</p>}</div>;
  if (block.type === "externalLink") return <div className="article-inline-link article-official-link source-list"><a href={block.href} target="_blank" rel="noopener noreferrer">{block.label}</a>{block.description && <p>{block.description}</p>}</div>;
  return <div className="article-table" tabIndex={0} aria-label={block.caption || "Article data table"}><table><thead><tr>{block.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{block.rows.map((row, rowIndex) => <tr key={`${rowIndex}-${row.join("-")}`}>{row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>)}</tbody></table>{block.caption && <p className="article-table-caption">{block.caption}</p>}</div>;
}

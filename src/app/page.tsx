import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { Faq } from "@/components/faq";
import { DisclosureBox } from "@/components/disclosure-box";
import { JsonLd } from "@/components/json-ld";
import { createMetadata } from "@/lib/seo/metadata";
import { websiteSchema } from "@/lib/seo/schema";
import { TrackedLink } from "@/components/tracked-link";
import { TrustStrip } from "@/components/trust-strip";
import { FeaturedComparison } from "@/components/featured-comparison";
import { WorkflowNavigation } from "@/components/workflow-navigation";
import { LatestVerifiedUpdates } from "@/components/latest-verified-updates";

const homeFaqs = [
  { question: "What does Ecommerce Intel review?", answer: "The site reviews and compares software for product research, ad intelligence, Shopify research and ecommerce operations. Each page states what the evidence supports and what still needs validation." },
  { question: "Is Ecommerce Intel affiliated with WinningHunter?", answer: "Ecommerce Intel is an independent research site. Some WinningHunter links may use an affiliate destination when a real URL is configured, and the relationship is disclosed." },
  { question: "Can a research tool guarantee a winning product?", answer: "No. Software can organize signals and shorten research, but it cannot guarantee demand, margin, supplier quality or future sales." },
  { question: "How should I choose between a review and a comparison?", answer: "Use a review when one product is the main decision. Use a comparison when two named tools must answer the same brief with the same market, entities and date range." },
];

export const metadata = createMetadata("Ecommerce Research Desk for Product, Ad and Store Decisions", "Read independent EcommerceIntel reviews and comparisons built around the evidence an operator needs before paying for a research tool.");

const reviews = [
  { title: "WinningHunter", type: "Review", bestFor: "Product, ad and Shopify research", evidence: "Workflow evaluation", checked: "Sep 21, 2026", href: "/winninghunter-review" },
  { title: "Kalodata", type: "Review", bestFor: "TikTok Shop products, shops and creators", evidence: "Workflow evaluation", checked: "Sep 20, 2026", href: "/reviews/kalodata" },
  { title: "PipiAds", type: "Review", bestFor: "Advertising and creative research", evidence: "Workflow evaluation", checked: "Sep 20, 2026", href: "/reviews/pipiads" },
  { title: "ShopHunter", type: "Review", bestFor: "Known Shopify store research", evidence: "Workflow evaluation", checked: "Sep 20, 2026", href: "/reviews/shophunter" },
];

export default function Home() {
  return <main><JsonLd data={websiteSchema(homeFaqs)} /><Hero />
    <TrustStrip />
    <section className="home-decision-brief page-band"><div className="site-container"><p className="eyebrow">Quick answer</p><h2 className="section-title">Choose the path that matches the evidence you need.</h2><dl className="article-key-facts"><div><dt>Product and ad research</dt><dd>Start with the WinningHunter review when the brief connects visible advertising activity to products and Shopify stores.</dd></div><div><dt>TikTok Shop research</dt><dd>Start with the Kalodata review or the WinningHunter vs Kalodata comparison when products, shops and creators are central.</dd></div><div><dt>Known store research</dt><dd>Start with the ShopHunter review when a store domain, assortment and offer context are the starting point.</dd></div></dl></div></section>
    <FeaturedComparison />
    <WorkflowNavigation />
    <section className="home-reviews-band page-band"><div className="site-container"><div className="home-section-heading"><div><p className="eyebrow">Featured reviews</p><h2>Read the evidence record before the feature list.</h2></div><TrackedLink href="/reviews" className="home-section-link" eventName="internal_link_click" eventParams={{ placement: "home_reviews", label: "See all reviews" }}>See all files <span aria-hidden="true">→</span></TrackedLink></div><div className="home-review-list">{reviews.map((review) => <article className="home-review-row" key={review.href}><div><p className="home-review-type">{review.type} · {review.evidence}</p><h3>{review.title}</h3></div><p><strong>Best for</strong>{review.bestFor}</p><p><strong>Last checked</strong>{review.checked}</p><TrackedLink href={review.href} className="home-review-link" eventName="internal_link_click" eventParams={{ placement: "home_reviews", label: `Read ${review.title}` }}>Read review <span aria-hidden="true">→</span></TrackedLink></article>)}</div></div></section>
    <section className="home-priority-band"><div className="site-container"><div className="home-priority-grid"><TrackedLink href="/winninghunter-pricing" className="home-priority-link" eventName="internal_link_click" eventParams={{ placement: "home_priority", label: "WinningHunter Pricing" }}><span className="eyebrow">Pricing</span><strong>WinningHunter Pricing</strong><p>See the $49, $79 and $249 public monthly snapshot, billing discounts and limits to verify.</p><span>Review current pricing →</span></TrackedLink><TrackedLink href="/winninghunter-alternatives" className="home-priority-link" eventName="internal_link_click" eventParams={{ placement: "home_priority", label: "WinningHunter Alternatives" }}><span className="eyebrow">Alternatives</span><strong>WinningHunter Alternatives</strong><p>Compare switching reasons across TikTok Shop, ad and store-first workflows.</p><span>Compare switching paths →</span></TrackedLink></div></div></section>
    <LatestVerifiedUpdates />
    <section className="home-method-band"><div className="site-container"><p className="eyebrow">Evaluation method</p><h2 className="section-title">Every page leaves one clear next check.</h2><div className="home-method-grid"><div><span>01</span><h3>Define the operating question</h3><p>Name the market, entity, date window and output before opening a vendor page.</p></div><div><span>02</span><h3>Separate visible evidence from estimates</h3><p>Keep public facts, vendor claims, modeled values and unknowns distinct.</p></div><div><span>03</span><h3>Verify the final decision outside the dashboard</h3><p>Move the shortlist into platform, supplier, margin, policy or creative validation.</p></div></div></div></section>
    <section className="home-faq-band"><div className="article-container"><SectionHeading eyebrow="FAQ" title="Questions before choosing a tool" /><Faq items={homeFaqs} /><DisclosureBox text="Some links on Ecommerce Intel may be affiliate links. I may earn a commission at no extra cost to you. This does not change the evaluation criteria." /></div></section>
  </main>;
}

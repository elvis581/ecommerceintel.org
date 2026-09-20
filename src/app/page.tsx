import { Hero } from "@/components/hero";
import { OperatorCredibility } from "@/components/operator-credibility";
import { SectionHeading } from "@/components/section-heading";
import { Faq } from "@/components/faq";
import { DisclosureBox } from "@/components/disclosure-box";
import { JsonLd } from "@/components/json-ld";
import { GuideCard } from "@/components/guide-card";
import { createMetadata } from "@/lib/seo/metadata";
import { websiteSchema } from "@/lib/seo/schema";
import { LastUpdated } from "@/components/last-updated";

const homeFaqs = [
  { question: "What does Ecommerce Intel review?", answer: "The site reviews and compares software for product research, ad intelligence, Shopify research and ecommerce operations. Each page states what the evidence supports and what still needs validation." },
  { question: "Is Ecommerce Intel affiliated with WinningHunter?", answer: "Ecommerce Intel is an independent research site. Some WinningHunter links may use an affiliate destination when a real URL is configured, and the relationship is disclosed." },
  { question: "Can a research tool guarantee a winning product?", answer: "No. Software can organize signals and shorten research, but it cannot guarantee demand, margin, supplier quality or future sales." },
];

export const metadata = createMetadata("Ecommerce Research Desk for Product, Ad and Store Decisions", "Read independent EcommerceIntel reviews and comparisons built around the evidence an operator needs before paying for a research tool.");

const reviews = [
  { title: "WinningHunter Review", description: "Evaluate the ad-to-product and Shopify store research workflow.", href: "/winninghunter-review", label: "Money page" },
  { title: "Kalodata Review", description: "Follow a TikTok Shop marketplace-first research path.", href: "/reviews/kalodata", label: "Review" },
  { title: "PipiAds Review", description: "Study the advertising-first product research workflow and limits.", href: "/reviews/pipiads", label: "Review" },
  { title: "ShopHunter Review", description: "Start with store and competitor research when that is the real question.", href: "/reviews/shophunter", label: "Review" },
];
const comparisons = [
  { title: "WinningHunter vs Kalodata", description: "Compare Shopify ad research with TikTok Shop intelligence.", href: "/winninghunter-vs-kalodata", label: "Comparison" },
  { title: "WinningHunter vs PipiAds", description: "Compare two advertising-led research paths.", href: "/winninghunter-vs-pipiads", label: "Comparison" },
  { title: "WinningHunter vs ShopHunter", description: "Compare ad-first and store-first workflows.", href: "/winninghunter-vs-shophunter", label: "Comparison" },
];

export default function Home() {
  return <main><JsonLd data={websiteSchema(homeFaqs)} /><Hero /><OperatorCredibility />
    <section className="home-paths-band"><div className="site-container"><div className="home-section-heading"><div><p className="eyebrow">Choose a research path</p><h2>Start with the question behind the subscription.</h2></div><LastUpdated /></div><div className="home-path-grid">{[{ title: "Find a product", description: "Trace a product through shops, creators or visible ads before checking margin.", href: "/reviews/kalodata", label: "Marketplace path" }, { title: "Read an ad", description: "Move from a creative to its advertiser, store, offer and follow-up check.", href: "/winninghunter-review", label: "Ad path" }, { title: "Inspect a store", description: "Start with a known store and record the product, offer and positioning evidence.", href: "/reviews/shophunter", label: "Store path" }, { title: "Choose between tools", description: "Run one matched brief before adding a second dashboard to the stack.", href: "/compare", label: "Decision path" }].map((card, index) => <div className="home-path-item" key={card.href}><span>0{index + 1}</span><GuideCard card={card} /></div>)}</div></div></section>
    <section className="home-reviews-band"><div className="site-container"><SectionHeading eyebrow="Current review files" title="Read the evidence record before the feature list" description="Each review names the job, the useful signal, the boundary and the next test." /><div className="home-review-grid">{reviews.map((card) => <GuideCard key={card.href} card={card} />)}</div></div></section>
    <section className="home-comparisons-band"><div className="site-container"><div className="home-comparison-heading"><SectionHeading eyebrow="Matched comparisons" title="Put two tools through the same brief" description="A comparison is useful when it shows the cost of missing records, unclear history and extra verification work." /><span>COMPARE / 03</span></div><div className="home-comparison-grid">{comparisons.map((card, index) => <div className="home-comparison-item" key={card.href}><span>0{index + 1}</span><GuideCard card={card} /></div>)}</div></div></section>
    <section className="home-method-band"><div className="article-container"><SectionHeading eyebrow="The research handoff" title="Every page should leave one clear next check" /><div className="home-method-grid"><div><span>01</span><h3>Write the brief</h3><p>Name the market, entity, date window and output before opening a vendor page.</p></div><div><span>02</span><h3>Mark the evidence</h3><p>Separate what is visible, vendor-stated, estimated and still unknown.</p></div><div><span>03</span><h3>Set the next check</h3><p>Move the shortlist into platform, supplier, margin, policy or creative validation.</p></div></div></div></section>
    <section className="home-faq-band"><div className="article-container"><SectionHeading eyebrow="FAQ" title="Questions before choosing a tool" /><Faq items={homeFaqs} /><DisclosureBox text="Some links on Ecommerce Intel may be affiliate links. I may earn a commission at no extra cost to you. This does not change the evaluation criteria." /></div></section>
  </main>;
}

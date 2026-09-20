import { createMetadata } from "@/lib/seo/metadata";
import { ArticleLayout } from "@/components/article-layout";
import { articlePageMap } from "@/config/pages";
import { JsonLd } from "@/components/json-ld";
import { articleSchema } from "@/lib/seo/schema";

export const metadata = createMetadata("Ecommerce Research Resources for Operators", "Research resources for choosing ecommerce intelligence, ad research and product research software.", "/resources");

export default function ResourcesPage() {
  const page = articlePageMap["resources"] || {
    slug: "resources", title: "Ecommerce Research Resources for Operators", h1: "Ecommerce Research Resources for Operators",
    description: "Research resources for ecommerce operators.", eyebrow: "Resources",
    intro: "Use the published reviews and comparisons as a structured path for ecommerce research decisions.",
    verdict: "Start with a named workflow, compare the relevant tools and verify current official evidence before subscribing.",
    bestFor: ["Ecommerce operators"], watchFor: ["Unverified data"], kind: "hub" as const,
    sections: [{ heading: "Start with a decision", paragraphs: ["Choose a review when one product dominates the question. Choose a comparison when two tools are on the shortlist. Use the methodology page to understand the evidence boundary.", "The published library is intentionally small in Phase 1. It focuses on WinningHunter, the closest competitor workflows and the comparison paths most likely to affect a subscription decision. Planned Shopify intelligence, ad libraries, calculators and software database routes stay out of the index until they have a complete user journey.", "A good research record names the market, date range, known entities, filters and decision owner. Keep a copy of the result outside the vendor dashboard so a later plan change does not erase the reasoning. When a metric is estimated or a record is missing, label it and add the next first-party check.", "Use the official destination for current pricing and terms. The resource library helps you choose what to test; it does not replace supplier checks, contribution-margin work, platform policy review or a controlled launch decision."] }],
    workflow: ["Choose the question.", "Read the review.", "Compare alternatives.", "Verify the current terms."],
    faqs: [
      { question: "Where should I start?", answer: "Start with the review that matches the tool or workflow you are evaluating, then use a comparison when two products remain." },
      { question: "Are planned tools listed here?", answer: "No. The public resource page lists routes with complete content and leaves planned calculators and databases out until they are ready." },
      { question: "Do affiliate links change the criteria?", answer: "No. Affiliate relationships are disclosed and do not change the evaluation criteria." },
      { question: "How current are prices?", answer: "Pricing can change, so use each page's official destination to confirm current plans, limits and billing terms." },
    ], related: ["reviews", "compare", "methodology"], cards: [
      { title: "WinningHunter Review", description: "Assess the ad-to-product and Shopify research workflow.", href: "/winninghunter-review", label: "Review" },
      { title: "WinningHunter Pricing", description: "Check what to verify before choosing a plan.", href: "/winninghunter-pricing", label: "Pricing" },
      { title: "WinningHunter Alternatives", description: "Compare switching reasons and adjacent workflows.", href: "/winninghunter-alternatives", label: "Alternatives" },
      { title: "Compare Ecommerce Tools", description: "Use matched tests for named product comparisons.", href: "/compare", label: "Comparisons" },
    ],
  };
  return <><JsonLd data={articleSchema(page)} /><ArticleLayout page={page} /></>;
}

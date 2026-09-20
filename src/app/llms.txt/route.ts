import seoTargets from "../../../seo-targets.json";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  const corePages = seoTargets
    .filter((target) => target.core)
    .map((target) => `- ${target.primaryKeyword}: ${siteConfig.url}${target.route === "/" ? "" : target.route}`)
    .join("\n");

  const body = `# EcommerceIntel

EcommerceIntel is an independent English-language ecommerce research and intelligence site helping sellers find products, analyze competitors and choose better ecommerce tools.

Last reviewed: ${siteConfig.lastUpdatedIso}
Publisher: ${siteConfig.name} (${siteConfig.url})
Editorial author: ${siteConfig.editorialAuthor.name} (${siteConfig.url}/about)

## Scope

- Independent ecommerce intelligence tool reviews, comparisons, buying guides and operating workflows.
- First-stage coverage focuses on product research, competitor intelligence and advertising research.
  - The core intelligence shortlist currently covers WinningHunter, Kalodata, TrendTrack, ShopHunter and PipiAds by research job. Comparison and alternatives pages include other products only where they clarify the reader's decision.
- Public product information is checked against official sources linked on relevant pages.
- Recommendations focus on workflow fit, limitations and decision criteria.
- Evidence notes label public observations, vendor statements, editorial interpretation and claims that require live verification.

## Core pages

${corePages}

## Editorial principles

- I do not fabricate pricing, discounts, ratings or test results.
- I distinguish public product information from my editorial analysis.
- I do not promise winning products, ROAS, sales, reach or monetization outcomes.
- Affiliate relationships are disclosed and do not make a vendor an official partner of this site.

## Evidence levels

- Personally tested: documented direct use exists for the stated scope.
- Used by my team: documented team use exists for the stated scope.
- Feature research and operator workflow evaluation: official product evidence is assessed against an operating workflow without claiming current paid-account use.
- Public information overview: a narrower conclusion is used when reliable product access is limited.
- Comparison-only inclusion: the product is included to clarify a buying decision, not as a full review.

## Trust pages

- About and editorial policy: ${siteConfig.url}/about
- Affiliate disclosure: ${siteConfig.url}/affiliate-disclosure
- Privacy policy: ${siteConfig.url}/privacy
- Terms of use: ${siteConfig.url}/terms

## Discovery

- XML sitemap: ${siteConfig.url}/sitemap.xml
- Pages use claim boundaries and structured official-source citations without a separate user-visible source register.

Production site: ${siteConfig.url}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

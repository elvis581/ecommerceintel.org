# EcommerceIntel Week 2 Content Brief

Date: August 12, 2026
Batch: Facebook ad observation, Shopify identity and product validation workflows
Status: Local publication gates passed; production publication not claimed.

## Source Pack

### Meta Ad Library

- Primary source: Meta Ad Library, https://www.facebook.com/ads/library/
- Use for public advertiser/page identity, visible ad creative, copy, format, destination and any date/status fields shown in the interface.
- Check date recorded in `src/config/sources.ts`: August 12, 2026.
- Missing fields remain `not shown`, `unavailable` or `unresolved`; no launch date, spend, impressions, conversion, sales, revenue or profit is inferred.

### Shopify public-store evidence

- Use the public destination reached from an ad, the final domain, visible product and brand identity, public checkout/storefront conventions, policy pages and a reputable technology signal where available.
- A Shopify footprint supports a narrow platform observation only. It does not prove ownership, store sales, traffic, revenue, margins or business relationship.
- Redirects, unavailable ads, marketplaces and generic landing pages lower confidence. Record the advertiser -> ad -> destination -> product -> domain chain and the date checked.

## Page Ownership

| Route | Primary keyword | Intent and output | Key internal links |
| --- | --- | --- | --- |
| `/how-to-analyze-competitor-facebook-ads` | how to analyze competitor Facebook ads | Analyze creative, offer and landing-page patterns; output an original test brief and follow-up questions. | Facebook ads product research, ad spy tools, WinningHunter review |
| `/how-to-find-shopify-stores-from-facebook-ads` | how to find Shopify stores from Facebook ads | Trace a public ad to a verified store identity; output an identity record with high/medium/unresolved confidence. | Competitor ad analysis, Shopify competitor monitoring, WinningHunter and Minea reviews |
| `/how-to-track-shopify-competitor-ads` | how to track Shopify competitor ads | Run recurring monitoring with a named owner, cadence, change signals and retirement rules. | Competitor ad analysis, Shopify store tracing, ad spy tools |
| `/how-to-use-meta-ad-library-for-product-research` | how to use Meta Ad Library for product research | Use the official free library as an observation layer; output Test, Hold or Reject after operating checks. | Facebook ads product research, competitor ad analysis, validation workflow, ad spy tools |
| `/how-to-validate-products-found-in-facebook-ads` | how to validate products found in Facebook ads | Validate margin, supplier, fulfillment, policy, differentiation and controlled-test conditions before action. | Meta Ad Library workflow, Facebook ads product research, product research tools |

## Differentiation From the Parent Workflow

`/how-to-research-products-with-facebook-ads` owns the broad product-discovery workflow and its complete Test/Hold/Reject record. Week 2 pages own separate stages:

- observation and creative/offer analysis;
- advertiser-to-Shopify identity tracing;
- recurring competitor monitoring;
- official Meta source usage;
- post-discovery operating validation.

No Week 2 page uses a generic ranking or claims that visible advertising activity proves commercial performance.

## Evidence Boundary

The following fields cannot be proved by a public Facebook ad, Meta Ad Library record, Shopify technology signal or third-party ad-intelligence estimate alone:

- spend, impressions, conversion rate, orders, sales, GMV, revenue and profit;
- contribution margin, refunds, inventory, supplier consistency or fulfillment quality;
- store ownership, private account access, customer quality or platform approval;
- future demand, product-market fit or a guarantee that a creative will work.

Material decisions end with first-party, supplier, finance, policy or controlled-test evidence. Missing evidence is assigned to an owner or becomes Hold/Reject; it is never filled with an estimate.

## QA Output

- Body words: 1,130 / 1,065 / 926 / 926 / 1,020 respectively.
- SEO/AEO/GEO: 100/90/100 on all five routes.
- Repeated editorial paragraphs: 0.
- Repeated FAQ answers: 0.
- Operator style violations: 0.
- Browser matrix: 390, 1024 and 1440 for all five routes; no horizontal overflow.
- FAQ Enter/Space: pass on all five routes; console errors: 0.
- Local production build and SEO audit: pass. Production publication remains unverified.

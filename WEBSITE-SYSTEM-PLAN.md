# EcommerceIntel V2 Website System Plan

Audit date: 2026-07-28
Controller: `affiliate-website-system`
Scope: current EcommerceIntel V2 local production build at `http://localhost:4324`

## Positioning and architecture

EcommerceIntel is an independent English ecommerce intelligence and tool-research site for operators working across TikTok Shop, Shopify, Amazon and cross-border markets. The V2 architecture assigns one primary decision to each normal route:

| Route group | Decision owner |
| --- | --- |
| `/` | Choose a research path and understand the independent publisher |
| `/reviews` | Choose a single-tool review or comparison path |
| `/best-ecommerce-intelligence-tools` | Choose an ecommerce intelligence subscription |
| `/best-ecommerce-product-research-tools` | Shortlist product-research tools |
| `/best-ecommerce-ad-spy-tools` | Shortlist ad-spy tools for Shopify-led research |
| Four review routes | Decide whether one named tool is worth testing or paying for |
| `/kalodata-vs-fastmoss` | Choose between two TikTok Shop research workflows |
| `/kalodata-alternatives` | Keep Kalodata or switch for a defined reason |
| `/how-to-research-products-for-tiktok-shop` | Execute one repeatable product-research workflow |
| Trust/legal routes | Verify publisher, disclosure, privacy and terms |

Retired `/tools`, `/resources` and `/best-tiktok-shop-tools` routes return `410`. Other launch-only routes return `404`. The sitemap contains the 16 current indexable canonical routes.

## Audit result

The native EcommerceIntel checks pass: typecheck, lint, production build, content quality, metadata, sitemap alignment, internal links, icons, social image, robots, `llms.txt`, 404/410 behavior, UTM propagation and browser interactions. The stricter Website Release Gate is not yet satisfied because release evidence is incomplete.

## Winning Hunter keyword ownership

The supplied workbook `cs_1783237126797_1_s41b0q.xlsx` was inspected from `Worksheet!A1:K101` (100 usable records). The publisher explicitly selected `winning hunter` as the primary keyword, overriding the previous inferred `winninghunter review` phrase. The review keeps the official product spelling `WinningHunter` in the naming explanation and uses natural supporting queries for pricing, free trial, product research, ad spy, Shopify store tracking, AI, login and the relevant brand misspellings. The post-build measurement is 53 exact matches / 2,565 visible tokens = **2.07%**, which passes the 2.00%–3.00% density gate without changing the page's single Review intent.

The full page execution record is in [page-reference-audit.json](./page-reference-audit.json). Release inputs are in [website-release-inputs.json](./website-release-inputs.json).

## Priorities

### P0: resolve before public release

1. Verify Cloudflare production routes for HTTPS, apex, `www`, redirect behavior, known routes and missing routes.
2. Record the legal publisher identity and a monitored contact channel.
3. Update Privacy to identify GA4 `G-W85K9NCP1F`, consent behavior, retention and regional review, then rerun the analytics checker.
4. Capture page-specific visual and responsive lead evidence at 390, 1024 and 1440 CSS pixels for every commercial page.
5. Make the static checker recognize the visible WinningHunter disclosure and page-specific closing decision components, or document and approve a checker-compatible adapter.
6. Decide whether the affiliate-website-system 2.00%–3.00% density gate is applicable to this editorial system. Winning Hunter now passes the gate; the other commercial pages remain intentionally natural and fail the numeric gate rather than receiving mechanical padding.

### P1: strengthen after the release blockers

1. Add exact `buying-guide` and `navigation-hub` entries to the shared page-reference registry so `/reviews` and the three buying guides do not need a closest-type fallback.
2. Add dedicated intent-matched screenshots or visual evidence to the commercial routes.
3. Re-run the static closing-section and navigation check after adding compatible semantic classes (`site-nav`, decision callout marker) if that remains the preferred integration.

### Defer

- Do not restore thin `/tools`, `/resources` or `/platforms` hubs until they own distinct, useful content.
- Do not add new product reviews until source coverage, a clear test scope and a page-specific visual are available.

## Current decision

**Release: No**
**Technical blockers: Present**
**Evidence confidence: Medium**

This is a release-evidence decision, not a claim that the current local build is broken. The local site is healthy; production proof and several deterministic gate inputs are still missing.

## 90-day content production roadmap

Roadmap date: 2026-08-06
Execution window: 2026-08-06 through 2026-11-05
Publishing target: 52 new indexable pages over 12 weeks
Weekly floor: 4-5 new pages that pass the Page Publication Gate
Existing-page updates: additional work and not counted toward the weekly floor
Planning confidence: Medium
Execution checklist: [CONTENT-PRODUCTION-TASKS.md](./CONTENT-PRODUCTION-TASKS.md)

EcommerceIntel remains a traditional affiliate site organized around operator decisions. The roadmap expands the existing advertising, Shopify and TikTok Shop clusters before opening an Amazon cluster. It does not restore the retired `/tools`, `/resources`, `/platforms` or `/best-tiktok-shop-tools` routes.

The supplied WinningHunter workbook was inspected at `Worksheet!A1:K101` with 100 usable rows. It provides directional evidence for brand, Shopify store-tracker and Facebook ad-spy topics, but its source tool, market and export date are missing and some metric columns are shifted. Search metrics from that file must not be presented as verified volume. GSC, Bing and affiliate-click data are not yet available for roadmap prioritization, so the order must be reviewed every four weeks.

### Production rule

A page counts toward the weekly floor only after it:

- owns one distinct primary search intent;
- contains at least 650 useful English words, excluding navigation and repeated sitewide copy;
- passes the manual thin-content and differentiation reviews;
- scores at least 90 at the Page Publication Gate with factual integrity at least 22/25;
- records the approved primary keyword and a 2.00%-3.00% visible-content density result without mechanical padding;
- includes a page-specific answer, operational decision, FAQ or recorded reason no FAQ is needed, and a useful next click;
- uses current official sources for changeable claims and records the checked date;
- uses a unique, intent-matched visual or workflow asset;
- passes internal-link, canonical, sitemap, schema, CTA, disclosure and 390/1024/1440 responsive checks;
- avoids invented prices, discounts, ratings, results, tool access or operator experience.

If a scheduled page fails, it returns to Improve and does not count. An approved reserve topic takes its production slot. The weekly quantity requirement is therefore maintained by a larger researched backlog, not by publishing thin pages.

### Indexing and release policy

- Planned routes do not enter `articlePages`, navigation, the sitemap or public index until their individual gate passes.
- Research and draft artifacts remain unpublished; do not expose placeholder pages or coming-soon cards.
- A passing page is added to the correct directory or Workflows hub, receives its canonical, enters the sitemap and is added to the page-reference audit in the same change.
- Reserve topics remain `Defer` until activated. They are not part of the 52-page indexed target unless they replace a failed scheduled route.
- A failed scheduled route remains `Defer` and does not coexist with a reserve page that owns the same intent.
- Existing Website Release P0 work continues in parallel and is not counted as page production.

### Trust, affiliate and AI Search path

Commercial CTAs follow a visible decision and use only the configured affiliate destination with `rel="sponsored nofollow noopener"`. Official evidence links remain ordinary text links. Each commercial page uses the sitewide disclosure and links to `/affiliate-disclosure`; workflow and template pages do not manufacture a commercial CTA when no recommendation follows from the content.

Each page includes a concise answer near the lead, clear entity names, a direct decision or action, evidence boundaries, an updated date and headings that can be extracted without losing context. Tables are used only for real comparisons. Review, Article, FAQ and Breadcrumb schema are added only when the visible page supports them.

### First 10 actions

1. Resolve or explicitly track the existing production-route, publisher/contact, GA4 privacy/consent and responsive-evidence P0 items.
2. Add `/workflows` to the approved architecture and point the existing Workflows navigation item to it.
3. Create the Week 1 briefs with one primary keyword, one decision and two reserve briefs.
4. Refresh official WinningHunter, Minea, Shopify and Meta source records with checked dates.
5. Build `/winninghunter-vs-minea` using equal evidence and a choose-one verdict.
6. Build the two alternatives pages with different product-specific switching triggers.
7. Build the Facebook-ads product workflow and link it to the existing ad-spy guide.
8. Run differentiation against all 16 current routes and the other Week 1 drafts.
9. Run page QA, responsive browser checks, production build and route/sitemap verification for passing pages.
10. Publish 4-5 passing pages, update `/reviews` or `/workflows`, then prepare Week 2 plus two reserve topics.

### Page-skill routing

| Page type | Required primary Skill |
| --- | --- |
| Navigation hub | `$navigation-hub-page` |
| Single-tool review | `$ecommerceintel-operator-review` |
| Head-to-head comparison | `$tool-comparison` |
| Alternatives page | `$tool-alternatives` |
| Multi-product buying guide | `$best-tools-buying-guide` |
| Workflow, checklist or operational template | `$operator-workflow-guide` |

Every page also receives shared EcommerceIntel voice/evidence rules, SEO/AEO/GEO review and an independent quality pass. A Review Skill must not be used for a standalone comparison, alternatives page, buying guide or workflow.

### Month 1: advertising and Shopify intelligence

Goal: complete the WinningHunter/Minea commercial path, add a scalable Workflows entry, and own the ad-to-store research journey.

#### Week 1 - 5 pages

| No. | Route | Primary keyword | Type | Unique job | Required next click |
| ---: | --- | --- | --- | --- | --- |
| 1 | `/workflows` | ecommerce research workflows | Navigation hub | Route readers by research job without adding every article to the main navigation | Relevant workflow cluster |
| 2 | `/winninghunter-vs-minea` | winninghunter vs minea | Comparison | Choose focused Shopify/Meta research or broader cross-channel research | Both reviews and current plans |
| 3 | `/winninghunter-alternatives` | winninghunter alternatives | Alternatives | Replace WinningHunter for a named channel, coverage or workflow gap | WinningHunter Review and best-fit replacement |
| 4 | `/minea-alternatives` | minea alternatives | Alternatives | Replace Minea when breadth, credits or workflow complexity is the problem | Minea Review and best-fit replacement |
| 5 | `/how-to-research-products-with-facebook-ads` | how to research products with facebook ads | Workflow | Move from an ad observation to a documented product test decision | Ad Spy Tools and relevant review |

Evidence gate: refresh WinningHunter, Minea, Shopify and Meta official sources. Comparison rows must use equivalent evidence. Pricing remains checked-at-source information, not a frozen promise.

#### Week 2 - 5 pages

| No. | Route | Primary keyword | Type | Unique job | Required next click |
| ---: | --- | --- | --- | --- | --- |
| 6 | `/how-to-analyze-competitor-facebook-ads` | how to analyze competitor facebook ads | Workflow | Extract hooks, offers, formats and landing-page questions from known competitors | Facebook product-research workflow |
| 7 | `/how-to-find-shopify-stores-from-facebook-ads` | find shopify stores from facebook ads | Workflow | Trace ads to identifiable stores and record what can and cannot be verified | WinningHunter or Minea Review |
| 8 | `/how-to-track-shopify-competitor-ads` | track shopify competitor ads | Workflow | Build a recurring monitoring process rather than a one-time search | Competitor-ad analysis and tool comparison |
| 9 | `/how-to-use-meta-ad-library-for-product-research` | meta ad library product research | Workflow | Use Meta's official public source as the verification layer | Ad Spy Tools buying guide |
| 10 | `/how-to-validate-products-found-in-facebook-ads` | validate products found in facebook ads | Workflow | Decide whether an ad-found product deserves a controlled test | Product Research Tools guide |

Evidence gate: official Meta Ad Library material, current Shopify guidance and clearly labeled third-party estimates. No spend, sales or profitability inference may be presented as observed fact.

#### Week 3 - 4 pages

| No. | Route | Primary keyword | Type | Unique job | Required next click |
| ---: | --- | --- | --- | --- | --- |
| 11 | `/best-shopify-store-tracker-tools` | shopify store tracker | Buying guide | Choose a tool for recurring store, product and advertising monitoring | WinningHunter, Minea and official Shopify verification |
| 12 | `/how-to-research-shopify-competitors` | how to research shopify competitors | Workflow | Complete a broad competitor research brief covering offer, assortment, ads and store | Store Tracker Tools guide |
| 13 | `/how-to-estimate-shopify-store-sales` | how to estimate shopify store sales | Workflow | Explain defensible estimation inputs and where estimation must stop | Store Tracker Tools guide |
| 14 | `/how-to-track-shopify-competitor-products` | track shopify competitor products | Workflow | Monitor assortment, launch timing and product changes over time | Shopify competitor workflow |

Evidence gate: distinguish public store observations, vendor estimates and operator judgment. Never describe estimated revenue or order counts as audited store records.

#### Week 4 - 4 pages

| No. | Route | Primary keyword | Type | Unique job | Required next click |
| ---: | --- | --- | --- | --- | --- |
| 15 | `/shopify-competitor-analysis-checklist` | shopify competitor analysis checklist | Workflow resource | Provide a complete, downloadable analysis checklist with decision fields | Shopify competitor workflow |
| 16 | `/how-to-monitor-shopify-product-launches` | monitor shopify product launches | Workflow | Record new-product, offer and advertising changes on a repeat schedule | Competitor-product tracking workflow |
| 17 | `/how-to-compare-shopify-product-pages` | compare shopify product pages | Workflow | Compare offer, proof, merchandising and conversion structure without copying | Shopify competitor workflow |
| 18 | `/how-to-build-a-shopify-competitor-watchlist` | shopify competitor watchlist | Workflow | Select which stores deserve recurring monitoring and define stop conditions | Store Tracker Tools guide |

Evidence gate: page 15 must ship with a real downloadable CSV or editable template. It cannot be a text-only placeholder presented as a resource.

### Month 2: TikTok Shop entity workflows

Goal: extend the existing product-research workflow into separate shop, competitor, creator, video, livestream and market decisions.

#### Week 5 - 5 pages

| No. | Route | Primary keyword | Type | Unique job | Required next click |
| ---: | --- | --- | --- | --- | --- |
| 19 | `/how-to-research-tiktok-shop-competitors` | tiktok shop competitor research | Workflow | Build a one-time competitor research brief across shops, products and content | Existing TikTok product workflow |
| 20 | `/how-to-analyze-tiktok-shop-stores` | tiktok shop store analysis | Workflow | Evaluate assortment, concentration, creator participation and visible momentum | Kalodata or FastMoss Review |
| 21 | `/how-to-find-tiktok-shop-creators` | how to find tiktok shop creators | Workflow | Build an initial creator candidate set for a defined product and market | Creator evaluation workflow |
| 22 | `/how-to-evaluate-tiktok-shop-creators` | evaluate tiktok shop creators | Workflow | Decide whom to contact using fit, concentration, content and operating constraints | Creator shortlist template |
| 23 | `/how-to-track-tiktok-shop-competitors` | track tiktok shop competitors | Workflow | Convert one-time competitor research into recurring monitoring | Competitor analysis template |

Evidence gate: use official TikTok Shop resources as the account and policy authority. Third-party creator, GMV and shop values remain labeled estimates.

#### Week 6 - 5 pages

| No. | Route | Primary keyword | Type | Unique job | Required next click |
| ---: | --- | --- | --- | --- | --- |
| 24 | `/how-to-research-tiktok-shop-videos` | tiktok shop video research | Workflow | Analyze content patterns, product context and repeatability | Creator and product workflows |
| 25 | `/how-to-research-tiktok-shop-livestreams` | tiktok shop livestream research | Workflow | Evaluate livestream participation and product presentation without inferring profit | Store and creator workflows |
| 26 | `/how-to-compare-tiktok-shop-markets` | compare tiktok shop markets | Workflow | Compare the same category across supported countries using consistent fields | FastMoss Review |
| 27 | `/how-to-analyze-tiktok-shop-categories` | tiktok shop category analysis | Workflow | Move from a broad category to a documented opportunity and risk map | Existing product-research workflow |
| 28 | `/how-to-build-a-tiktok-shop-research-brief` | tiktok shop research brief | Workflow resource | Define market, entities, evidence and final decision before opening a tool | Workflows hub |

Evidence gate: page 28 requires a real research-brief download. Market comparisons must state the exact countries and checked dates and cannot imply equal tool coverage.

#### Week 7 - 4 pages

| No. | Route | Primary keyword | Type | Unique job | Required next click |
| ---: | --- | --- | --- | --- | --- |
| 29 | `/shoplus-review` | shoplus review | Review | Decide whether Shoplus is worth testing for content, creator and TikTok commerce research | Relevant comparison or current plans |
| 30 | `/kalodata-vs-shoplus` | kalodata vs shoplus | Comparison | Choose marketplace depth or content/creator-oriented research | Both reviews |
| 31 | `/fastmoss-vs-shoplus` | fastmoss vs shoplus | Comparison | Choose cross-market analytics or content/creator-oriented research | Both reviews |
| 32 | `/fastmoss-alternatives` | fastmoss alternatives | Alternatives | Replace FastMoss for a named market, entity, export or workflow limitation | FastMoss Review and best-fit replacement |

Evidence gate: this is a live-evidence batch. Shoplus requires an actual operator workflow record and page-specific screenshots. Both comparisons require equivalent evidence for both products. If any page fails, use the reserve pool and keep the unsupported URL unpublished.

#### Week 8 - 4 pages

| No. | Route | Primary keyword | Type | Unique job | Required next click |
| ---: | --- | --- | --- | --- | --- |
| 33 | `/tiktok-shop-product-research-checklist` | tiktok shop product research checklist | Workflow resource | Turn the existing broad workflow into a usable product validation record | Existing product-research workflow |
| 34 | `/tiktok-shop-competitor-analysis-template` | tiktok shop competitor analysis template | Workflow resource | Capture competitor shops, products, creators, content and risks consistently | Competitor research workflow |
| 35 | `/tiktok-shop-creator-research-template` | tiktok shop creator research template | Workflow resource | Create a contact-ready creator shortlist with evidence and rejection reasons | Creator evaluation workflow |
| 36 | `/tiktok-shop-market-comparison-template` | tiktok shop market comparison template | Workflow resource | Compare countries without mixing incompatible dates or metric definitions | Market comparison workflow |

Evidence gate: every template route requires a real downloadable CSV or editable artifact, instructions, a completed example with non-sensitive sample data, and a clear link back to its parent workflow.

### Month 3: Amazon research cluster

Goal: open Amazon only after building current official platform and vendor source dossiers. The cluster starts with workflows and buying guides before publishing product reviews.

#### Week 9 - 4 pages

| No. | Route | Primary keyword | Type | Unique job | Required next click |
| ---: | --- | --- | --- | --- | --- |
| 37 | `/best-amazon-product-research-tools` | best amazon product research tools | Buying guide | Shortlist tools by demand, competition, keyword and operating workflow | Amazon workflow and qualified reviews |
| 38 | `/how-to-research-products-on-amazon` | how to research products on amazon | Workflow | Run the complete Amazon product-research sequence | Product Research Tools guide |
| 39 | `/how-to-validate-amazon-product-demand` | validate amazon product demand | Workflow | Decide whether visible demand deserves deeper economics and supply review | Amazon research workflow |
| 40 | `/how-to-analyze-amazon-competitors` | amazon competitor analysis | Workflow | Compare listings, offers, reviews and visible market structure | Amazon competitor tools guide |

Evidence gate: refresh Amazon Seller Central and public Amazon documentation. Do not imply access to seller-only data that was not actually inspected.

#### Week 10 - 4 pages

| No. | Route | Primary keyword | Type | Unique job | Required next click |
| ---: | --- | --- | --- | --- | --- |
| 41 | `/how-to-research-amazon-keywords` | amazon keyword research | Workflow | Build a keyword set and connect it to product and listing decisions | Amazon keyword tools guide |
| 42 | `/how-to-analyze-amazon-listing-competition` | amazon listing competition analysis | Workflow | Compare listing quality and search-positioning evidence rather than total market size | Amazon competitor workflow |
| 43 | `/how-to-use-amazon-reviews-for-product-research` | amazon review analysis for product research | Workflow | Convert review patterns into product requirements and risks | Amazon product workflow |
| 44 | `/how-to-evaluate-amazon-sales-estimates` | amazon sales estimate accuracy | Workflow | Explain estimate inputs, comparison methods and stop conditions | Amazon tools guide |

Evidence gate: no sales estimate is presented as Amazon settlement data. Review analysis must not copy customer text at scale or expose personal data.

#### Week 11 - 4 pages

| No. | Route | Primary keyword | Type | Unique job | Required next click |
| ---: | --- | --- | --- | --- | --- |
| 45 | `/best-amazon-keyword-research-tools` | best amazon keyword research tools | Buying guide | Choose a system specifically for search demand and listing decisions | Amazon keyword workflow |
| 46 | `/best-amazon-competitor-research-tools` | best amazon competitor research tools | Buying guide | Choose a system for listings, assortment, reviews and visible competition | Amazon competitor workflow |
| 47 | `/amazon-product-research-checklist` | amazon product research checklist | Workflow resource | Provide a complete product validation record | Amazon product workflow |
| 48 | `/amazon-competitor-analysis-template` | amazon competitor analysis template | Workflow resource | Capture comparable competitor evidence and next actions | Amazon competitor workflow |

Evidence gate: buying guides require current first-party sources for every included product. Resource pages require actual downloadable files and completed examples.

#### Week 12 - 4 pages

| No. | Route | Primary keyword | Type | Unique job | Required next click |
| ---: | --- | --- | --- | --- | --- |
| 49 | `/helium-10-review` | helium 10 review | Review | Decide whether Helium 10 fits the documented Amazon workflow and business model | Current plans, alternatives and comparison |
| 50 | `/jungle-scout-review` | jungle scout review | Review | Decide whether Jungle Scout fits the documented Amazon workflow and business model | Current plans, alternatives and comparison |
| 51 | `/helium-10-vs-jungle-scout` | helium 10 vs jungle scout | Comparison | Choose one product using the same market, product and keyword assignment | Both reviews |
| 52 | `/helium-10-alternatives` | helium 10 alternatives | Alternatives | Replace Helium 10 for a named workflow, price or complexity reason | Helium 10 Review and best-fit replacement |

Evidence gate: Weeks 9-11 must produce first-party source dossiers, real workflow records and page-specific screenshots before these pages enter Build. If the evidence is incomplete, these URLs stay unpublished and reserve workflows take their places in the weekly production count.

### Reserve production pool

Reserve pages are researched in advance but activated only when a scheduled page fails evidence, differentiation or quality review. They are not automatically indexable and must pass the same gates.

| Reserve route | Primary intent | Use when |
| --- | --- | --- |
| `/how-to-compare-facebook-ad-creatives` | Compare hooks, formats and offer structure | An ad-tool decision page lacks equivalent product evidence |
| `/how-to-organize-an-ad-spy-workflow` | Create a repeatable ad-research operating process | A commercial ad page is not ready |
| `/shopify-product-page-analysis-template` | Record product-page evidence consistently | A Shopify commercial page fails qualification |
| `/shopify-competitor-watchlist-template` | Maintain a recurring competitor record | A store-tracker page is delayed |
| `/how-to-create-a-tiktok-shop-competitor-report` | Turn research into an operator decision report | A TikTok comparison lacks live evidence |
| `/how-to-create-a-tiktok-shop-creator-shortlist` | Produce a contact-ready creator list | A TikTok Review lacks test evidence |
| `/how-to-build-a-tiktok-shop-content-tracker` | Track video and livestream patterns over time | A content-tool page is delayed |
| `/how-to-audit-a-tiktok-shop-category` | Complete a category audit with stop conditions | A market comparison is delayed |
| `/how-to-compare-amazon-product-research-tools` | Run an equal-input tool trial | An Amazon Review is not ready |
| `/amazon-keyword-research-template` | Record keyword evidence and listing decisions | An Amazon commercial page is delayed |
| `/amazon-product-validation-template` | Document demand, competition, economics and risks | An Amazon Review or comparison is delayed |
| `/jungle-scout-alternatives` | Replace Jungle Scout for a named workflow gap | Evidence is sufficient but another Week 12 page fails |

### Internal-link architecture

The main navigation remains compact:

```text
Intelligence Tools | Reviews & Comparisons | Workflows | About
```

`Workflows` links to `/workflows`; individual workflow pages do not expand the main navigation. The `/reviews` directory continues to contain Reviews, Comparisons and Alternatives only.

Required journeys:

```text
Advertising workflow -> Ad Spy buying guide -> Review -> Comparison/Alternatives -> affiliate CTA
Shopify workflow -> Store Tracker buying guide -> WinningHunter/Minea decision page
TikTok workflow -> existing product workflow or entity workflow -> Kalodata/FastMoss/Shoplus decision page
Amazon workflow -> Amazon buying guide -> evidence-qualified Review -> Comparison/Alternatives
Template -> parent workflow -> relevant buying guide or Review
```

Every new page must receive at least two contextual inbound links and include two to four next-step internal links. The home page and main navigation must not become a list of all 52 URLs.

### Cannibalization control

| Query family | Primary owner | Supporting-page boundary |
| --- | --- | --- |
| WinningHunter brand, pricing, free trial, login, AI and spelling variants | `/winninghunter-review` | Comparison and alternatives pages may mention plan fit but must not retarget brand navigation or pricing |
| WinningHunter versus Minea | `/winninghunter-vs-minea` | The two Reviews explain each product independently and link to the comparison for the choose-one decision |
| Facebook ads product research | `/how-to-research-products-with-facebook-ads` | Competitor-ad analysis covers creative/offer interpretation; Meta Ad Library covers the official-source workflow; validation begins only after discovery |
| Shopify competitor research | `/how-to-research-shopify-competitors` | Store tracking is a buying decision; sales estimation is a method boundary; watchlists and product tracking are recurring monitoring outputs |
| TikTok Shop product research | `/how-to-research-products-for-tiktok-shop` | New pages own shops, creators, videos, livestreams, categories, markets or recurring monitoring and must not rewrite the broad product workflow |
| TikTok Shop creator research | `/how-to-find-tiktok-shop-creators` | Creator evaluation owns the contact decision; the template owns the downloadable record, not another general guide |
| TikTok Shop competitor research | `/how-to-research-tiktok-shop-competitors` | Tracking owns recurring monitoring; the template owns the output format; store analysis owns one entity |
| Amazon product research | `/how-to-research-products-on-amazon` | Demand, keyword, review and competitor pages each own one validation stage; the buying guide owns software selection |
| Amazon product research tools | `/best-amazon-product-research-tools` | Keyword and competitor tool guides stay limited to their named specialist decisions |
| Helium 10 versus Jungle Scout | `/helium-10-vs-jungle-scout` | Reviews answer worth-it questions separately; alternatives answer replacement questions |

Before Build, compare every brief with the owner in this table. A supporting page that cannot maintain its boundary is merged into the owner page or replaced by a reserve topic.

### Weekly operating schedule

| Day | Work |
| --- | --- |
| Monday | Approve 4-5 primary briefs plus two reserves; lock intent, primary keyword, evidence status and next click |
| Tuesday | Complete source review and Build the first two pages |
| Wednesday | Build the remaining two or three pages and add page-specific visuals or downloadable resources |
| Thursday | Run Improve, differentiation, density, source, CTA, schema, internal-link and responsive reviews |
| Friday | Publish only passing pages; update sitemap, page-reference audit, QA evidence and the next-week reserve queue |

Existing-page maintenance is scheduled separately. Each week, update the two to three current pages most affected by the new internal links, but do not count those changes toward the 4-5 page publishing floor.

### Four-week review gates

At the end of Weeks 4, 8 and 12:

1. Record GSC and Bing impressions, clicks, average position and query-to-page ownership when available.
2. Record GA4 page views and real `affiliate_cta_click` events without inventing attribution.
3. Check indexing, canonical selection, sitemap inclusion, orphan routes and broken links.
4. Identify pages with overlapping query ownership and merge or retarget them before publishing another nearby URL.
5. Refresh changeable pricing, plan, market and feature claims from official sources.
6. Reorder the next four-week queue using real evidence while preserving the 4-5 page weekly floor.

### Explicit exclusions

Do not create separate pages for WinningHunter pricing, free trial, login, AI or typo terms during this roadmap. Those remain supporting intents owned by `/winninghunter-review`. Do not publish Pipiads Review or a Pipiads comparison until equal official and workflow evidence exists. Do not open generic Amazon, Shopify or TikTok platform hubs merely to create navigation depth.

### Roadmap gate decision

Artifact: 90-day page plan
Gate used: planning qualification, not Page Publication Gate
Technical blockers: Existing Website Release blockers remain present
Evidence confidence: Medium
Plan status: Approved for brief and evidence production
Automatic publication approval: No

This roadmap establishes production order and page ownership. It does not pre-approve any individual page for indexing. Each page must pass its own Build, Review, Improve and Page Publication Gate before it can count toward the weekly 4-5 page total.

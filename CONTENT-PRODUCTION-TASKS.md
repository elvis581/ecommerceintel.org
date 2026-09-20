# EcommerceIntel 90-Day Content Production Tasks

Created: 2026-08-06
Execution window: 2026-08-06 to 2026-11-05
Source plan: [WEBSITE-SYSTEM-PLAN.md](./WEBSITE-SYSTEM-PLAN.md#90-day-content-production-roadmap)
Target: 52 new pages, 4-5 passing pages per week

## Task status

```text
[ ] Backlog or not started
[~] In progress or waiting for evidence
[x] Completed and verified
[!] Blocked or failed a gate
```

A page is not complete when the draft exists. Mark a page task complete only after the rendered route, audit record and publication evidence all pass.

## Parallel P0 tasks

These tasks run alongside content production and do not count toward the weekly 4-5 page floor.

- [x] `P0-01` Verify production HTTPS, apex, `www`, known routes, redirects and two unpredictable missing routes. Verified on 2026-08-06 after Vercel deployed commit `79f06e7`.
- [ ] `P0-02` Record legal publisher identity and verify that `hello@ecommerce-intel.com` is monitored.
- [~] `P0-03` Update Privacy for GA4 `G-W85K9NCP1F`; record consent, retention and regional-review decisions. Privacy and the measurement ID are updated; consent, retention and regional review remain unresolved.
- [~] `P0-04` Capture per-commercial-page responsive evidence at 390, 1024 and 1440 CSS pixels. Week 1 is complete; pre-existing commercial pages remain.
- [x] `P0-05` Resolve checker compatibility for main navigation, closing decision sections and affiliate disclosure placement.
- [~] `P0-06` Record the final project decision for the 2.00%-3.00% keyword-density gate without padding copy. Week 1 passes; older commercial routes remain outside the gate.
- [~] `P0-07` Rerun the website release preflight and keep `Release: No` until every binary blocker is closed.
- [x] `P0-08` Add exact `navigation-hub`, `buying-guide` and `workflow-resource` entries to the shared page-reference registry, including required references, companion Skills, default index state and checks; validate the registry before Week 1 Build.

## Repeated page task

Apply this checklist to every planned or reserve page. Copy the result into the page's execution record.

- [ ] `A. Route brief` Lock route, page type, primary keyword, reader, one decision, next click and closest competing pages.
- [ ] `B. Skill route` Read the page-reference registry entry, its references, universal commercial references and the required page Skill.
- [ ] `C. Source pack` Record official URLs, checked date, evidence level, changeable claims and missing evidence.
- [ ] `D. Outline` Create a page-specific opening, answer, decision sections, executable workflow or comparison structure, FAQ routing and closing decision.
- [ ] `E. Build` Write at least 650 useful English words and add a page-specific visual, screenshot or usable downloadable asset.
- [ ] `F. Integrity review` Separate observed facts, vendor claims, operator judgment and estimates; remove unsupported experience, prices, results and guarantees.
- [ ] `G. Differentiation` Compare against all indexable pages and inspect the three closest pages in detail. Record thin-content, template and cannibalization risk.
- [ ] `H. SEO/AEO/GEO` Verify unique Title, Description, H1, canonical, OG/Twitter, Article/Breadcrumb and only supported Review/FAQ schema.
- [ ] `I. Keyword QA` Run density after Build and after Improve. Record matches, visible tokens and 2.00%-3.00% result without stuffing.
- [ ] `J. Conversion QA` Verify the decision-led CTA, configured affiliate URL, `sponsored nofollow noopener`, disclosure placement and real click event.
- [ ] `K. Internal links` Add at least two contextual inbound links and two to four next-step links; update `/reviews` or `/workflows` when applicable.
- [ ] `L. Browser QA` Check 390, 1024 and 1440 widths, navigation, keyboard access, FAQ, tables, downloads, overflow and console errors.
- [ ] `M. Release QA` Run lint, typecheck, content audit, SEO audit and production build; verify route, sitemap, robots and true missing-route behavior.
- [ ] `N. Evidence sync` Update `seo-targets.json`, `page-reference-audit.json`, `QA-REPORT.md`, source records and release inputs where applicable.
- [ ] `O. Publish decision` Record Page Publication score, factual-integrity score, evidence confidence, blockers, `Publish: Yes/No` and remaining risks.

## Files normally touched by a passing batch

- `src/config/pages.ts` or a page-specific content module
- `src/config/final-page-content-overrides.ts`
- `src/config/sources.ts`
- `src/config/navigation.ts` only for approved hub-level changes
- `src/config/reviews-directory.ts` for Review, Comparison and Alternatives entries
- the Workflows directory data for workflow and resource entries
- `seo-targets.json`
- `page-reference-audit.json`
- `QA-REPORT.md`
- `website-release-inputs.json` when release evidence changes
- `public/images/` or `public/resources/` for page-specific assets

Do not add a route to `articlePages`, navigation, sitemap or a public directory before its individual gate passes.

## Week 1 tasks - 5 pages

Goal: create the scalable Workflows entry and complete the first WinningHunter/Minea decision path.

- [x] `W01-S01` Refresh WinningHunter, Minea, Shopify and Meta official sources; record checked dates and missing comparison evidence.
- [x] `W01-S02` Approve the five primary briefs and reserve briefs for `/how-to-compare-facebook-ad-creatives` and `/how-to-organize-an-ad-spy-workflow`.
- [x] `W01-P01` Build `/workflows` for `ecommerce research workflows` with Advertising, Shopify, TikTok Shop and future Amazon sections; use `$navigation-hub-page`; point the main Workflows navigation item to it.
- [x] `W01-P02` Build `/winninghunter-vs-minea` for `winninghunter vs minea`; use `$tool-comparison`; apply the same product, channel, store and monitoring criteria to both tools and end with choose A, B or neither.
- [x] `W01-P03` Build `/winninghunter-alternatives` for `winninghunter alternatives`; use `$tool-alternatives`; separate direct ad-research replacements from different-workflow substitutes and explain when to keep WinningHunter.
- [x] `W01-P04` Build `/minea-alternatives` for `minea alternatives`; use `$tool-alternatives`; make cross-channel breadth, credits, image/supplier research and workflow complexity the switching reasons.
- [x] `W01-P05` Build `/how-to-research-products-with-facebook-ads`; use `$operator-workflow-guide`; end with one documented test or rejection decision.
- [x] `W01-QA` Run batch differentiation against the current 16 pages and among all five drafts; fix page ownership and repeated CTA/FAQ language.
- [x] `W01-PUB` Publish 4-5 passing pages, update `/reviews` and `/workflows`, synchronize sitemap/audit artifacts and record any reserve substitution. Five pages are live; production routes, sitemap, Canonical, Open Graph, GA4 and true 404 behavior are verified.

## Week 2 tasks - 5 pages

Goal: cover the distinct observation, tracing, monitoring, official-source and validation stages of Facebook ad research.

- [x] `W02-S01` Build a Meta Ad Library source pack and a Shopify public-store evidence pack; define fields that cannot prove spend, sales or profit.
- [x] `W02-S02` Compare all five briefs against `/how-to-research-products-with-facebook-ads` and lock non-overlapping outputs.
- [x] `W02-P06` Build `/how-to-analyze-competitor-facebook-ads`; output a creative, offer, landing-page and follow-up-question analysis.
- [x] `W02-P07` Build `/how-to-find-shopify-stores-from-facebook-ads`; output an ad-to-store investigation record with identity-confidence labels.
- [x] `W02-P08` Build `/how-to-track-shopify-competitor-ads`; output a recurring monitoring cadence, fields and stop conditions.
- [x] `W02-P09` Build `/how-to-use-meta-ad-library-for-product-research`; keep Meta's public library as the primary evidence source and link to paid tools only as optional workflow accelerators.
- [x] `W02-P10` Build `/how-to-validate-products-found-in-facebook-ads`; require margin, supplier, competition, policy and controlled-test checks before action.
- [x] `W02-QA` Verify the five pages do not repeat the same opening, five-step sequence, disclaimer, FAQ or decision.
- [~] `W02-PUB` Publish 4-5 passing pages and add contextual inbound links from Ad Spy Tools, Product Research Tools and relevant Reviews. Local publication gate passed; production publication not yet verified.

## Week 3 tasks - 4 pages

Goal: establish the Shopify store-intelligence buying and operating path.

- [ ] `W03-S01` Refresh WinningHunter, Minea and Shopify sources; identify which store and sales fields are vendor estimates.
- [ ] `W03-S02` Create an equal-input store-tracker evaluation brief and two reserves: `/shopify-product-page-analysis-template` and `/shopify-competitor-watchlist-template`.
- [ ] `W03-P11` Build `/best-shopify-store-tracker-tools`; use `$best-tools-buying-guide`; compare tools by recurring decision, store/product/ad connection, history, export and estimate labeling.
- [ ] `W03-P12` Build `/how-to-research-shopify-competitors`; create the broad parent workflow for offer, assortment, ads, store and final response.
- [ ] `W03-P13` Build `/how-to-estimate-shopify-store-sales`; explain observable inputs, estimate methods, cross-checks and conditions where no estimate should be used.
- [ ] `W03-P14` Build `/how-to-track-shopify-competitor-products`; focus on recurring assortment, launch, price and offer changes rather than broad competitor research.
- [ ] `W03-QA` Compare store-tracker, competitor-research, sales-estimation and product-tracking intent boundaries.
- [ ] `W03-PUB` Publish four passing pages and link the buying guide to WinningHunter, Minea and the three workflows.

## Week 4 tasks - 4 pages

Goal: produce concrete Shopify operating outputs and complete the first monthly evidence review.

- [ ] `W04-S01` Define CSV schemas for competitor analysis and watchlist outputs; use non-sensitive sample rows.
- [ ] `W04-P15` Build `/shopify-competitor-analysis-checklist` and ship a real downloadable checklist with required decision fields.
- [ ] `W04-P16` Build `/how-to-monitor-shopify-product-launches`; define observation schedule, evidence fields, alert threshold and stop condition.
- [ ] `W04-P17` Build `/how-to-compare-shopify-product-pages`; compare offer, proof, merchandising and conversion structure without encouraging copying.
- [ ] `W04-P18` Build `/how-to-build-a-shopify-competitor-watchlist`; define inclusion, priority, ownership, review cadence and removal rules.
- [ ] `W04-QA` Test downloads, file names, analytics events, mobile tables and parent-workflow links.
- [ ] `W04-DATA` Record available GSC, Bing, GA4 and affiliate-click evidence; do not invent missing performance data.
- [ ] `W04-REVIEW` Review Weeks 1-4 ownership, indexing, canonical selection and internal links; reprioritize Month 2 without lowering the 4-5 page floor.

## Week 5 tasks - 5 pages

Goal: split TikTok Shop competitor, shop and creator decisions into executable workflows.

- [ ] `W05-S01` Refresh TikTok Shop, Kalodata and FastMoss sources; document estimated GMV, shop and creator-data boundaries.
- [ ] `W05-S02` Approve five entity-specific briefs and reserves for competitor-report and creator-shortlist workflows.
- [ ] `W05-P19` Build `/how-to-research-tiktok-shop-competitors`; make it the one-time parent brief across shops, products and content.
- [ ] `W05-P20` Build `/how-to-analyze-tiktok-shop-stores`; focus on assortment, concentration, creator participation and visible momentum.
- [ ] `W05-P21` Build `/how-to-find-tiktok-shop-creators`; end with an initial creator candidate set for one product and market.
- [ ] `W05-P22` Build `/how-to-evaluate-tiktok-shop-creators`; end with contact, hold or reject decisions and reasons.
- [ ] `W05-P23` Build `/how-to-track-tiktok-shop-competitors`; focus on recurring monitoring, change detection and stop rules.
- [ ] `W05-QA` Compare all pages with the existing broad TikTok product-research workflow and remove duplicated product-validation sections.
- [ ] `W05-PUB` Publish 4-5 passing pages and route them through `/workflows`, Kalodata Review and FastMoss Review.

## Week 6 tasks - 5 pages

Goal: cover TikTok Shop video, livestream, market, category and research-brief outputs.

- [ ] `W06-S01` Confirm the exact markets used in examples and record tool coverage as checked, estimated or unavailable.
- [ ] `W06-S02` Create the TikTok Shop research-brief CSV before drafting its resource page.
- [ ] `W06-P24` Build `/how-to-research-tiktok-shop-videos`; output repeatable content patterns and product-context questions.
- [ ] `W06-P25` Build `/how-to-research-tiktok-shop-livestreams`; output product-presentation and participation observations without inferring profit.
- [ ] `W06-P26` Build `/how-to-compare-tiktok-shop-markets`; use the same category, dates and metric definitions across named countries.
- [ ] `W06-P27` Build `/how-to-analyze-tiktok-shop-categories`; output an opportunity/risk map and next validation action.
- [ ] `W06-P28` Build `/how-to-build-a-tiktok-shop-research-brief`; ship the real brief download plus a completed sample.
- [ ] `W06-QA` Verify examples do not mix countries, time windows or incompatible tool metrics.
- [ ] `W06-PUB` Publish 4-5 passing pages; add parent/child links and test the downloadable brief.

## Week 7 tasks - 4 pages

Goal: publish the Shoplus/FastMoss decision batch only with equivalent live evidence.

- [ ] `W07-S01` Complete a Shoplus operator workflow record covering market, product, shop, creator/content path, result and limitations.
- [ ] `W07-S02` Capture page-specific Shoplus screenshots and refresh current plan/coverage sources.
- [ ] `W07-S03` Repeat the same known-entity assignment in Kalodata and FastMoss for equivalent comparison evidence.
- [ ] `W07-P29` Build `/shoplus-review`; use `$ecommerceintel-operator-review`; do not publish if hands-on evidence is absent.
- [ ] `W07-P30` Build `/kalodata-vs-shoplus`; use `$tool-comparison`; select by marketplace depth versus content/creator workflow.
- [ ] `W07-P31` Build `/fastmoss-vs-shoplus`; use `$tool-comparison`; select by cross-market analytics versus content/creator workflow.
- [ ] `W07-P32` Build `/fastmoss-alternatives`; use `$tool-alternatives`; organize replacements by market, entity, history, export and workflow limitation.
- [ ] `W07-RESERVE` If any product page lacks equal evidence, activate competitor-report, creator-shortlist, content-tracker or category-audit reserve tasks.
- [ ] `W07-QA` Require separate evidence tables, conclusions and screenshots; reject template-swapped Review or Comparison copy.
- [ ] `W07-PUB` Publish four passing primary or reserve pages and record every substitution.

## Week 8 tasks - 4 pages

Goal: ship four real TikTok Shop resources and complete the second monthly review.

- [ ] `W08-S01` Define four distinct CSV schemas and completed sample records; prevent duplicate columns that make the resources interchangeable.
- [ ] `W08-P33` Build `/tiktok-shop-product-research-checklist`; ship a product validation checklist linked to the existing product workflow.
- [ ] `W08-P34` Build `/tiktok-shop-competitor-analysis-template`; ship a competitor shop/product/creator/content record.
- [ ] `W08-P35` Build `/tiktok-shop-creator-research-template`; ship a contact-ready creator record with evidence and rejection reasons.
- [ ] `W08-P36` Build `/tiktok-shop-market-comparison-template`; ship a country-comparison record with dates and metric definitions.
- [ ] `W08-QA` Test every download, sample, link, mobile table and resource-specific analytics event.
- [ ] `W08-DATA` Review GSC, Bing, GA4, affiliate clicks, indexing and canonical evidence for Weeks 1-8.
- [ ] `W08-REVIEW` Confirm Amazon source readiness; if it is insufficient, activate researched workflow reserves instead of publishing unsupported buying guides.

## Week 9 tasks - 4 pages

Goal: open the Amazon cluster with official platform evidence and workflows before product Reviews.

- [ ] `W09-S01` Build an Amazon official-source dossier for product, keyword, listing, review and seller-data boundaries.
- [ ] `W09-S02` Build current source dossiers for every tool included in the Amazon buying guide; mark untested products clearly.
- [ ] `W09-P37` Build `/best-amazon-product-research-tools`; use `$best-tools-buying-guide`; shortlist by recurring decision, not feature count.
- [ ] `W09-P38` Build `/how-to-research-products-on-amazon`; make it the parent workflow for demand, competition, keywords, reviews and economics.
- [ ] `W09-P39` Build `/how-to-validate-amazon-product-demand`; isolate the demand-validation stage and end with continue, hold or reject.
- [ ] `W09-P40` Build `/how-to-analyze-amazon-competitors`; focus on listings, offers, reviews and visible market structure.
- [ ] `W09-QA` Remove any claim that depends on unverified Seller Central access, proprietary sales data or future demand.
- [ ] `W09-PUB` Publish four passing pages and create the Amazon section in `/workflows` without adding a generic platform hub.

## Week 10 tasks - 4 pages

Goal: publish four distinct Amazon evidence and analysis workflows.

- [ ] `W10-S01` Create non-sensitive example records for keyword, listing, review and sales-estimate analysis.
- [ ] `W10-P41` Build `/how-to-research-amazon-keywords`; connect keywords to product and listing decisions rather than producing a raw list.
- [ ] `W10-P42` Build `/how-to-analyze-amazon-listing-competition`; focus on listing quality and search-positioning evidence.
- [ ] `W10-P43` Build `/how-to-use-amazon-reviews-for-product-research`; convert review patterns into product requirements without bulk-copying customer text.
- [ ] `W10-P44` Build `/how-to-evaluate-amazon-sales-estimates`; explain estimate methods, cross-checks and stop conditions.
- [ ] `W10-QA` Verify the four pages own different stages and do not repeat the parent Amazon workflow.
- [ ] `W10-PUB` Publish four passing pages and add contextual links from the Amazon parent workflow and buying guide.

## Week 11 tasks - 4 pages

Goal: add specialist Amazon buying guides and real operational resources.

- [ ] `W11-S01` Refresh official sources for every product included in the keyword and competitor tool guides.
- [ ] `W11-S02` Build and test product-research and competitor-analysis downloadable resources before page drafting.
- [ ] `W11-P45` Build `/best-amazon-keyword-research-tools`; use `$best-tools-buying-guide`; keep the decision limited to search demand and listing work.
- [ ] `W11-P46` Build `/best-amazon-competitor-research-tools`; use `$best-tools-buying-guide`; keep the decision limited to listing, assortment, review and visible competition research.
- [ ] `W11-P47` Build `/amazon-product-research-checklist`; ship a complete demand, competition, economics and risk record.
- [ ] `W11-P48` Build `/amazon-competitor-analysis-template`; ship a comparable competitor evidence and action record.
- [ ] `W11-QA` Check specialist guides against the broad Amazon tools guide and test both resource downloads and completed examples.
- [ ] `W11-PUB` Publish four passing pages and finish the Helium 10/Jungle Scout equal-input test required for Week 12.

## Week 12 tasks - 4 pages

Goal: publish the Amazon tool decision cluster only after three weeks of source and workflow preparation.

- [ ] `W12-S01` Complete Helium 10 and Jungle Scout product profiles, current pricing/limit source checks and equivalent workflow evidence.
- [ ] `W12-S02` Capture distinct screenshots for both Reviews and comparison-specific evidence.
- [ ] `W12-P49` Build `/helium-10-review`; use `$ecommerceintel-operator-review`; recommend, limit or reject by Amazon workflow and business-model fit.
- [ ] `W12-P50` Build `/jungle-scout-review`; use `$ecommerceintel-operator-review`; use independent evidence and a different operator conclusion.
- [ ] `W12-P51` Build `/helium-10-vs-jungle-scout`; use `$tool-comparison`; apply the same product, market, keyword and competitor assignment to both tools.
- [ ] `W12-P52` Build `/helium-10-alternatives`; use `$tool-alternatives`; organize options by switching reason and explain when to keep Helium 10.
- [ ] `W12-RESERVE` If live evidence fails, activate Amazon comparison workflow, keyword template, product-validation template or Jungle Scout Alternatives only when its own evidence passes.
- [ ] `W12-QA` Run independent review across all four money pages and reject any page that relies on feature-list paraphrasing.
- [ ] `W12-DATA` Complete the 90-day GSC, Bing, GA4, affiliate-click, indexing, internal-link and source-freshness review.
- [ ] `W12-PUB` Publish four passing primary or reserve pages, update all directories and record the final 52-page completion count.

## Weekly publication report

Complete this report every Friday:

```text
Week: 1 (2026-08-06)
Primary pages scheduled: 5
Reserve pages activated: 0
Pages published: 5 production / 5 local publication gates passed
Pages returned to Improve: 0
Pages deferred for evidence: 0
Published route count: 21 local / 21 production
Sitemap route count: 21 local / 21 production
Broken links: 0 local; 0 published-route failures in production; two unpredictable missing routes returned 404
Keyword ownership conflicts: 0 in the Week 1 batch; homepage vs core intelligence buying guide remains an observed site-level overlap
Page Publication scores: 99, 97, 97, 96, 98
Density results: 2.05%, 2.22%, 2.10%, 2.10%, 2.09%
Responsive evidence paths: responsive-layout-audit.json; reports/screenshots/week-01/
Affiliate CTA events verified: affiliate_cta_click, external_cta_click, comparison_cta_click
Build/lint/typecheck/audit results: pass
Next-week source blockers: Meta and Shopify automated-access challenges; no matched Minea paid-account evidence
```

## 90-day completion definition

- [ ] 52 unique planned or approved substitute pages have passed their individual Page Publication Gate.
- [ ] Every published page appears once in the sitemap and resolves to its own canonical URL.
- [ ] `/reviews` contains all published Reviews, Comparisons and Alternatives without listing workflow pages.
- [ ] `/workflows` contains all published workflows and real resources without expanding the main navigation into article links.
- [ ] Every page has two contextual inbound links and two to four next-step links.
- [ ] No two indexable pages own the same primary keyword or reader decision.
- [ ] Every commercial page has current sources, decision-led CTA behavior and disclosure evidence.
- [ ] Every resource route includes a working download and completed sample.
- [ ] Every Review and tool Comparison has the required real or equivalent workflow evidence.
- [ ] All project checks and production route checks pass, or remaining Website Release blockers are explicitly recorded as unresolved.

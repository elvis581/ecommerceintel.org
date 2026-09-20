# EcommerceIntel Week 1 QA Report

Audit date: 2026-08-06
Primary controller: `affiliate-website-system`
Local production URL: `http://localhost:4329`
Production URL: `https://www.ecommerce-intel.com`
Published commit: `79f06e7`

## Findings first

### Remaining Website Release blockers

1. Legal publisher identity and monitored status for `hello@ecommerce-intel.com` are not verified.
2. GA4 `G-W85K9NCP1F` is implemented and disclosed, but consent, retention and regional legal review are not recorded.
3. Current affiliate-program approval and commercial-rights evidence were not supplied.
4. The 390/1024/1440 responsive matrix is complete for Week 1, but not yet for every pre-existing commercial page.

These site-level items keep **Website Release: No**. They do not invalidate the five Week 1 Page Publication Gates.

### Week 1 publication status

All five routes pass locally and in production. Vercel deployed commit `79f06e7`; the five Week 1 routes return HTTP 200 and appear once in the 21-route production sitemap.

| Route | Words | SEO/AEO/GEO | Density | Page score | Factual integrity | Publish |
| --- | ---: | --- | ---: | ---: | ---: | --- |
| `/workflows` | 993 | 100/90/100 | 2.05% (23/1,122) | 99/100 | 24/25 | Yes |
| `/winninghunter-vs-minea` | 995 | 100/90/100 | 2.22% (31/1,396) | 97/100 | 23/25 | Yes |
| `/winninghunter-alternatives` | 931 | 100/90/100 | 2.10% (28/1,335) | 97/100 | 23/25 | Yes |
| `/minea-alternatives` | 964 | 97/90/100 | 2.10% (28/1,334) | 96/100 | 22/25 | Yes |
| `/how-to-research-products-with-facebook-ads` | 988 | 100/80/100 | 2.09% (27/1,289) | 98/100 | 24/25 | Yes |

Evidence confidence is High for rendered structure and browser behavior, and Medium for vendor capabilities that were verified only from current public product material. No page implies matched Minea paid-account evidence or invents current pricing, sales, spend, revenue or profitability.

## Differentiation and intent

- Automated thin-content risk: Low on all five pages.
- Automated template risk: Low on all five pages.
- Repeated long blocks: 0.
- Highest body similarity: 3.0% between the two Alternatives pages.
- Cross-site material overlap: none detected.

Manual ownership review:

- `/workflows` owns navigation to the correct operational process.
- `/winninghunter-vs-minea` owns the same-task choose-A/B/neither decision.
- `/winninghunter-alternatives` owns switching away from WinningHunter for a named gap.
- `/minea-alternatives` owns breadth, credits, image/supplier research and workflow-complexity switching reasons.
- `/how-to-research-products-with-facebook-ads` owns the eight-step Test/Hold/Reject workflow.

## Browser QA

Evidence: [responsive-layout-audit.json](./responsive-layout-audit.json) and `reports/screenshots/week-01/`.

- Five routes at 390, 1024 and 1440 CSS pixels: pass, 15/15.
- Global horizontal overflow: none.
- Longest mobile H1: 171px high, contained within the 390px viewport.
- CTA mobile size: 44px high; white text on `rgb(5, 150, 105)` background; no clipping.
- Wide table: local `overflow-x:auto`; verified `scrollLeft 0 -> 240` with maximum 240.
- FAQ Enter/Space: pass on all five pages.
- Reviews filter Enter: pass.
- Desktop dropdown click/Enter/Escape: pass.
- Mobile menu Enter/Escape: pass.
- Browser console errors: 0.

## UTM and Analytics events

Test query:

`utm_source=qa&utm_medium=test&utm_campaign=week1&utm_term=tool&utm_content=cta`

- Internal comparison CTA preserved all five parameters.
- WinningHunter retained `ref=review` and appended all five UTM parameters at click time.
- Minea official link appended all five UTM parameters at click time.
- `affiliate_cta_click`: triggered.
- `external_cta_click`: triggered.
- `comparison_cta_click`: triggered.

The browser exposed the site's deterministic last-event state. GA4 network receipt was not independently proven because browser tracking protection and consent state are separate from event-handler execution.

## Deterministic checks

- `npm run typecheck`: pass.
- `npm run lint`: pass.
- `npm run audit:copy`: pass.
- `npm run audit:seo`: pass.
- Production build: pass.
- Native content quality: repeated editorial paragraphs 0; repeated FAQ answers 0; review source failures 0.
- Native SEO/AEO/GEO: 17/17 core pages pass.
- Sitemap: 21/21 routes.
- Metadata uniqueness, internal links, robots, true 404, favicon, Apple icon, PWA icons, maskable icon, 1200x630 social image and `llms.txt`: pass.
- Navigation checker: 21/21 published pages pass.
- Analytics checker: 21/21 published pages pass with one loader/config pair and matching Privacy disclosure.
- Conversion CTA checker: pass.
- Commercial closing-section checker: pass.
- Affiliate Disclosure Placement checker: pass.

## Multi-Site Auditor interpretation

The local deterministic crawl discovered 21 pages and no P0. Its raw 37/100 score is not used as the Page Publication score because the tool counted JSON-LD as body text and did not recognize visible bylines, dates and decision sections. Local sitemap inventory is valid; the localhost report treated production `www` URLs as cross-origin.

The post-deployment production crawl discovered 21 pages and no P0. All 21 sitemap pages use matching `www` Canonical and Open Graph URLs. The raw 37/100 score remains a heuristic result driven by unrecognized bylines, dates and decision wording; it is not used as the Page Publication score.

## Gate decisions

**Week 1 five-page batch**
Gate used: Page Publication Gate
Technical blockers: None in the local or production Week 1 batch
Production verification: 5/5 routes HTTP 200; sitemap 21/21; Canonical/OG 21/21; GA4 loader/config 21/21; two random missing routes HTTP 404
Publish: Yes

**EcommerceIntel website**
Gate used: Website Release Gate
Technical blockers: Present at site-level trust/consent/commercial-rights scope
Release: No
Remaining risks: publisher identity, monitored contact, analytics legal review, commercial rights and full-site responsive evidence.

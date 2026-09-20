# EcommerceIntel

EcommerceIntel is an English ecommerce research and intelligence site built from cross-border operating experience. The first release focuses on product research, competitor intelligence, advertising research and responsible affiliate recommendations.

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Configuration-driven static content
- Lucide icons
- Vercel-ready production output

No database, login, CMS, comments, ratings or payment system is included in the first release.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production validation:

```bash
npm run lint
npm run typecheck
npm run audit:copy
npm run audit:seo
```

`audit:seo` builds the production site, starts an isolated local server and audits every route for metadata, canonical URLs, structured data, content, links, official sources, comparison structure, SEO, AEO and GEO. It also verifies robots, sitemap, 404, favicon, Apple/PWA/maskable icons, social image and `llms.txt`.

## Launch Pages

The sitemap contains exactly 19 launch pages:

- Homepage, Start Here, Resources, Tools and Platforms
- Three buying guides: product research, TikTok Shop and ad spy tools
- Kalodata, FastMoss, WinningHunter and Minea reviews
- Kalodata vs FastMoss and Kalodata Alternatives
- How to Research Products for TikTok Shop
- About, Privacy, Affiliate Disclosure and Terms

The authoritative route and keyword list is [`seo-targets.json`](./seo-targets.json). Unfinished pages must not be added to this file, `articlePages`, navigation or the sitemap.

## Content Locations

- Homepage: `src/app/page.tsx`
- Page content and route model: `src/config/pages.ts`
- Static route renderer: `src/app/[slug]/page.tsx`
- Shared article layout: `src/components/article-layout.tsx`
- Comparison tables: `src/config/comparisons.ts`
- Homepage FAQ: `src/config/faqs.ts`
- Platform and workflow data: `src/config/platforms.ts`, `src/config/workflows.ts`
- Metadata and Schema: `src/lib/seo/`
- Sitemap, robots and manifest: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`

## Add an Article

1. Add one complete entry to `articlePages` in `src/config/pages.ts`.
2. Give it a unique slug, title, description, H1, intent, sections, workflow, FAQ and related links.
3. Add official source keys in `src/config/sources.ts` when the page makes product or platform claims.
4. Add a comparison table in `src/config/comparisons.ts` when comparison structure is required.
5. Add the route and keyword intent to `seo-targets.json` only after the page is complete.
6. Run the full production validation commands.

The dynamic route automatically generates metadata, Breadcrumb and FAQ Schema for complete entries. Editorial guides, reviews and comparisons use Article Schema; Resources uses CollectionPage; About uses AboutPage; legal and navigation hubs use WebPage.

## Tool and Affiliate Data

Edit `src/config/affiliate.ts` to change tool descriptions, official URLs, approved affiliate URLs, CTA text, research status and last-checked dates.

To enable an approved affiliate link:

1. Set `affiliateUrl` to the approved HTTPS tracking URL.
2. Set `isAffiliateEnabled: true`.
3. Set `isSponsored` according to the commercial arrangement.
4. Update `lastChecked` after checking the destination.

When affiliate mode is disabled or the tracking URL is empty, the CTA uses the official URL with `rel="noopener noreferrer"`. Approved affiliate or sponsored destinations use `rel="sponsored nofollow noopener noreferrer"`.

## Research Status

Supported statuses are:

- `Personally tested`
- `Used by my team`
- `Researched`
- `Comparison only`

The default launch status is `Researched`. Do not change a tool to `Personally tested` or `Used by my team` without documented evidence. Review-page status is displayed near the last-checked date.

## Pricing and Sources

- Pricing records: `src/config/pricing.ts`
- Official sources: `src/config/sources.ts`

Do not hard-code unverified plan prices into page content. Update a pricing record and its `lastChecked` value only after reviewing the official pricing source. When a current price cannot be confirmed, keep the standard pricing-change notice.

## Analytics

All interactions pass through `trackEvent` in `src/lib/analytics.ts`. It supports `window.gtag` and otherwise writes events to `dataLayer` so behavior can be verified without a provider.

To connect GA4:

1. Follow the current official Next.js and Google guidance for loading the tag.
2. Configure consent where required.
3. Keep `trackEvent` as the single integration boundary.
4. Verify the events listed in `plannedEvents` in GA4 DebugView.
5. Update the Privacy Policy before production collection begins.

UTM parameters are retained across internal navigation and appended to outbound commercial CTAs.

## Newsletter

`src/components/newsletter-form.tsx` is intentionally a front-end preview. It validates the field and triggers `newsletter_cta_click`, but it does not transmit or store the email address.

To connect Beehiiv, ConvertKit, Resend or Mailchimp:

1. Add a server action or Route Handler with validation and rate limiting.
2. Store provider credentials in Vercel environment variables.
3. Replace the preview handler with the server call.
4. Add provider errors, duplicate-subscriber and consent states.
5. Update Privacy before collecting addresses.

## Add a Review or Comparison

For a review, use the existing `reviewPage` helper, provide tool-specific features, use cases, strengths, limitations and alternatives, and connect a valid `toolKey`. For a comparison, add a dedicated page entry with user-type conclusions instead of forcing one universal winner.

Both page types require official sources, a last-checked date, visible disclosure, FAQ, internal links and a next action. Never add Review, Product, AggregateRating or offer Schema without real supporting data.

## Vercel Deployment

1. Import the repository into Vercel.
2. Keep the standard Next.js build command and output settings.
3. Attach `ecommerce-intel.com` as the production domain.
4. Add analytics or newsletter environment variables only when those integrations exist.
5. Run all production checks before deployment.
6. After deployment, verify canonical URLs, robots, sitemap, `llms.txt`, manifest, icons, social image and outbound destinations.

## Current Limitations

- Newsletter delivery is not connected.
- No analytics provider is enabled by default.
- Affiliate tracking URLs are empty and disabled.
- Tool coverage, market data and prices must be rechecked on official sources.
- Research status is conservative and does not claim hands-on testing without evidence.

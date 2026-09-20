export type EvidenceStatus = "Observed in public material" | "Vendor-stated" | "Editorial interpretation" | "Requires live verification";

export type OfficialSource = {
  label: string;
  url: string;
  publisher: string;
  sourceType: "Official vendor" | "Official platform";
  accessed: string;
};

export const sources = {
  kalodata: { label: "Kalodata official site", url: "https://www.kalodata.com/", publisher: "Kalodata", sourceType: "Official vendor", accessed: "2026-07-11" },
  kalodataSitemap: { label: "Kalodata public product and market sitemap", url: "https://www.kalodata.com/sitemap-base.xml", publisher: "Kalodata", sourceType: "Official vendor", accessed: "2026-07-11" },
  fastmoss: { label: "FastMoss official site", url: "https://www.fastmoss.com/", publisher: "FastMoss", sourceType: "Official vendor", accessed: "2026-07-11" },
  shoplus: { label: "Shoplus official site", url: "https://www.shoplus.net/", publisher: "Shoplus", sourceType: "Official vendor", accessed: "2026-07-11" },
  winninghunter: { label: "WinningHunter official site", url: "https://winninghunter.com/", publisher: "WinningHunter", sourceType: "Official vendor", accessed: "2026-08-06" },
  minea: { label: "Minea official site", url: "https://www.minea.com/", publisher: "Minea", sourceType: "Official vendor", accessed: "2026-08-06" },
  mineaProducts: { label: "Minea product research page", url: "https://www.minea.com/winning-product", publisher: "Minea", sourceType: "Official vendor", accessed: "2026-08-06" },
  mineaCompetitors: { label: "Minea competitor ad analysis page", url: "https://www.minea.com/competitor-ad-analysis", publisher: "Minea", sourceType: "Official vendor", accessed: "2026-08-06" },
  mineaShopify: { label: "Minea Shopify sales tracker page", url: "https://www.minea.com/shopify-sales-tracker", publisher: "Minea", sourceType: "Official vendor", accessed: "2026-08-06" },
  mineaTikTok: { label: "Minea TikTok Shop products page", url: "https://www.minea.com/tiktok-shop-products", publisher: "Minea", sourceType: "Official vendor", accessed: "2026-08-06" },
  mineaPricing: { label: "Minea official pricing", url: "https://www.minea.com/pricing", publisher: "Minea", sourceType: "Official vendor", accessed: "2026-08-06" },
  echotik: { label: "EchoTik official site", url: "https://echotik.live/", publisher: "EchoTik", sourceType: "Official vendor", accessed: "2026-07-12" },
  echotikPricing: { label: "EchoTik official pricing", url: "https://echotik.live/pricing/annually", publisher: "EchoTik", sourceType: "Official vendor", accessed: "2026-07-12" },
  tabcut: { label: "Tabcut official site", url: "https://www.tabcut.com/", publisher: "Tabcut", sourceType: "Official vendor", accessed: "2026-07-12" },
  gloda: { label: "Gloda official site", url: "https://www.gloda.vip/", publisher: "Gloda", sourceType: "Official vendor", accessed: "2026-07-12" },
  pipiads: { label: "Pipiads official site", url: "https://www.pipiads.com/", publisher: "Pipiads", sourceType: "Official vendor", accessed: "2026-08-06" },
  shophunter: { label: "ShopHunter official site", url: "https://shophunter.com/", publisher: "ShopHunter", sourceType: "Official vendor", accessed: "2026-09-20" },
  metaAdLibrary: { label: "Meta Ad Library", url: "https://www.facebook.com/ads/library/", publisher: "Meta", sourceType: "Official platform", accessed: "2026-08-12" },
  tiktok: { label: "TikTok Shop seller resources", url: "https://seller.tiktokglobalshop.com/business/en", publisher: "TikTok Shop", sourceType: "Official platform", accessed: "2026-07-11" },
  amazon: { label: "Amazon Seller Central", url: "https://sellercentral.amazon.com/", publisher: "Amazon", sourceType: "Official platform", accessed: "2026-07-11" },
  shopify: { label: "Shopify Help Center", url: "https://help.shopify.com/", publisher: "Shopify", sourceType: "Official platform", accessed: "2026-08-06" },
  shopifyProductResearch: { label: "Shopify product research guidance", url: "https://www.shopify.com/blog/product-research", publisher: "Shopify", sourceType: "Official platform", accessed: "2026-09-20" },
  googleTrends: { label: "Google Trends", url: "https://trends.google.com/", publisher: "Google", sourceType: "Official platform", accessed: "2026-09-20" },
  shopifySidekick: { label: "Shopify Sidekick documentation", url: "https://help.shopify.com/en/manual/shopify-admin/productivity-tools/sidekick", publisher: "Shopify", sourceType: "Official platform", accessed: "2026-07-11" },
  openai: { label: "OpenAI official site", url: "https://openai.com/", publisher: "OpenAI", sourceType: "Official vendor", accessed: "2026-07-11" },
  anthropic: { label: "Anthropic official site", url: "https://www.anthropic.com/", publisher: "Anthropic", sourceType: "Official vendor", accessed: "2026-07-11" },
  canva: { label: "Canva official site", url: "https://www.canva.com/", publisher: "Canva", sourceType: "Official vendor", accessed: "2026-07-11" },
  gorgias: { label: "Gorgias official site", url: "https://www.gorgias.com/", publisher: "Gorgias", sourceType: "Official vendor", accessed: "2026-07-11" },
  klaviyo: { label: "Klaviyo official site", url: "https://www.klaviyo.com/", publisher: "Klaviyo", sourceType: "Official vendor", accessed: "2026-07-11" },
  zapier: { label: "Zapier official site", url: "https://zapier.com/", publisher: "Zapier", sourceType: "Official vendor", accessed: "2026-07-11" },
  make: { label: "Make official site", url: "https://www.make.com/", publisher: "Make", sourceType: "Official vendor", accessed: "2026-07-11" },
} as const satisfies Record<string, OfficialSource>;

export type SourceKey = keyof typeof sources;

export type ClaimEvidence = {
  claim: string;
  sourceKeys: SourceKey[];
  status: EvidenceStatus;
  limitation: string;
};

const researchSources: SourceKey[] = ["kalodata", "fastmoss", "shoplus", "winninghunter", "minea", "tiktok"];
export const sourceKeysBySlug: Record<string, SourceKey[]> = {
  home: researchSources,
  "start-here": researchSources,
  tools: ["kalodata", "kalodataSitemap", "fastmoss", "shoplus", "winninghunter", "minea", "tiktok", "amazon", "shopify"],
  platforms: ["tiktok", "amazon", "shopify", "kalodata", "fastmoss", "winninghunter", "minea"],
  "best-ecommerce-intelligence-tools": ["winninghunter", "kalodata", "kalodataSitemap", "minea", "fastmoss", "tiktok", "shopify"],
  "best-ecommerce-product-research-tools": researchSources,
  "best-tiktok-shop-tools": ["kalodata", "fastmoss", "shoplus", "tiktok"],
  "best-ecommerce-ad-spy-tools": ["winninghunter", "minea"],
  "kalodata-review": ["kalodata", "kalodataSitemap", "tiktok"],
  "reviews/kalodata": ["kalodata", "kalodataSitemap", "tiktok"],
  "fastmoss-review": ["fastmoss", "tiktok"],
  "winninghunter-review": ["winninghunter", "shopify", "tiktok"],
  "winninghunter-pricing": ["winninghunter"],
  "reviews/trendtrack": ["shopifyProductResearch", "googleTrends"],
  "reviews/shophunter": ["shophunter", "shopify"],
  "reviews/pipiads": ["pipiads", "metaAdLibrary"],
  "winninghunter-vs-kalodata": ["winninghunter", "kalodata"],
  "winninghunter-vs-pipiads": ["winninghunter", "pipiads", "metaAdLibrary"],
  "winninghunter-vs-shophunter": ["winninghunter", "shophunter", "shopify"],
  "minea-review": ["minea", "mineaPricing", "mineaProducts", "mineaCompetitors", "mineaShopify", "mineaTikTok"],
  "kalodata-vs-fastmoss": ["kalodata", "kalodataSitemap", "fastmoss", "tiktok"],
  "kalodata-alternatives": ["kalodata", "kalodataSitemap", "fastmoss", "shoplus", "winninghunter", "tiktok"],
  "how-to-research-products-for-tiktok-shop": ["tiktok", "kalodata", "fastmoss", "shoplus"],
  workflows: ["metaAdLibrary", "shopify", "tiktok", "amazon"],
  "winninghunter-vs-minea": ["winninghunter", "minea", "mineaPricing", "mineaProducts", "mineaCompetitors", "mineaShopify", "pipiads", "metaAdLibrary", "shopify"],
  "winninghunter-alternatives": ["winninghunter", "minea", "mineaPricing", "pipiads", "metaAdLibrary", "shopify"],
  "minea-alternatives": ["minea", "mineaPricing", "mineaProducts", "mineaCompetitors", "mineaShopify", "winninghunter", "pipiads", "metaAdLibrary"],
  "how-to-research-products-with-facebook-ads": ["metaAdLibrary", "winninghunter", "minea", "shopify"],
  "how-to-analyze-competitor-facebook-ads": ["metaAdLibrary", "shopify", "winninghunter", "minea"],
  "how-to-find-shopify-stores-from-facebook-ads": ["metaAdLibrary", "shopify", "winninghunter", "minea"],
  "how-to-track-shopify-competitor-ads": ["metaAdLibrary", "shopify", "winninghunter", "minea"],
  "how-to-use-meta-ad-library-for-product-research": ["metaAdLibrary", "shopify", "winninghunter"],
  "how-to-validate-products-found-in-facebook-ads": ["metaAdLibrary", "shopify", "winninghunter", "minea"],
  resources: ["tiktok", "amazon", "shopify", "kalodata", "fastmoss", "shoplus", "winninghunter", "minea"],
};

export const sourceEvidenceBySlug: Record<string, ClaimEvidence[]> = {
  home: [
    { claim: "The launch shortlist covers TikTok Shop marketplace research plus advertising, product and store intelligence.", sourceKeys: ["kalodata", "fastmoss", "shoplus", "winninghunter", "minea"], status: "Editorial interpretation", limitation: "Each product has a different evidence boundary and none is presented as a guaranteed winner." },
    { claim: "Platform-native seller resources remain the verification layer for account, policy and operating decisions.", sourceKeys: ["tiktok", "amazon", "shopify"], status: "Observed in public material", limitation: "External tools can prioritize research questions but do not replace first-party account records." },
  ],
  "start-here": [
    { claim: "TikTok Shop marketplace research and ecommerce ad research require different tool shortlists.", sourceKeys: ["kalodata", "fastmoss", "shoplus", "winninghunter", "minea"], status: "Editorial interpretation", limitation: "The route directs readers by job; it does not claim equal data coverage across vendors." },
    { claim: "A new subscription should be tested against known entities and current official platform requirements.", sourceKeys: ["tiktok", "amazon", "shopify"], status: "Editorial interpretation", limitation: "Current markets, plans, exports and integrations require verification at the time of purchase." },
  ],
  tools: [
    { claim: "The directory separates TikTok Shop marketplace research from advertising, product and store intelligence.", sourceKeys: ["kalodata", "fastmoss", "shoplus", "winninghunter", "minea"], status: "Editorial interpretation", limitation: "The categories overlap at the edges, so each tool still requires a representative workflow test." },
    { claim: "Platform-native resources remain the source of truth for account, policy and operating records.", sourceKeys: ["tiktok", "amazon", "shopify"], status: "Observed in public material", limitation: "Third-party intelligence can prioritize investigation but cannot replace seller-account data." },
  ],
  platforms: [
    { claim: "TikTok Shop, Amazon and Shopify require different platform-specific research briefs and source-of-truth records.", sourceKeys: ["tiktok", "amazon", "shopify"], status: "Editorial interpretation", limitation: "Current platform features and policies must be checked in the official destination." },
    { claim: "External intelligence tools can support marketplace, advertising and store research around those platform workflows.", sourceKeys: ["kalodata", "fastmoss", "winninghunter", "minea"], status: "Vendor-stated", limitation: "Coverage, estimates, history and plan access require live verification." },
  ],
  resources: [
    { claim: "Official platform resources and seller accounts remain the source of truth for policies and operating records.", sourceKeys: ["tiktok", "amazon", "shopify"], status: "Observed in public material", limitation: "Readers must still confirm which instructions and account features apply to their market and current setup." },
    { claim: "Vendor evidence records need capability, access-date and live-verification boundaries.", sourceKeys: ["kalodata", "fastmoss", "shoplus", "winninghunter", "minea"], status: "Editorial interpretation", limitation: "An official vendor page supports positioning, not guaranteed coverage, accuracy or commercial performance." },
  ],
  "best-ecommerce-intelligence-tools": [
    { claim: "WinningHunter, Kalodata, Minea and FastMoss support different combinations of advertising, store, marketplace, product and creator research.", sourceKeys: ["winninghunter", "kalodata", "kalodataSitemap", "minea", "fastmoss"], status: "Editorial interpretation", limitation: "The shortlist distinguishes research jobs and does not claim equal coverage or a universal winner." },
    { claim: "Platform-native TikTok Shop and Shopify sources remain the verification layer for account, policy and operating decisions.", sourceKeys: ["tiktok", "shopify"], status: "Observed in public material", limitation: "Third-party intelligence can prioritize questions but cannot replace first-party account records or business economics." },
  ],
  "best-ecommerce-product-research-tools": [
    { claim: "The shortlist spans TikTok Shop marketplace research and advertising-led product discovery.", sourceKeys: ["kalodata", "fastmoss", "shoplus", "winninghunter", "minea"], status: "Editorial interpretation", limitation: "The tools expose different entities and should not be scored as interchangeable datasets." },
    { claim: "TikTok Shop account and policy decisions should be checked in official seller resources.", sourceKeys: ["tiktok"], status: "Observed in public material", limitation: "Third-party estimates do not replace first-party account records." },
  ],
  "best-tiktok-shop-tools": [
    { claim: "Kalodata publicly exposes category, product, shop, creator, video and livestream routes.", sourceKeys: ["kalodataSitemap"], status: "Observed in public material", limitation: "A public route does not prove equal data depth in every country or plan." },
    { claim: "FastMoss and Shoplus belong on a TikTok research shortlist based on their official positioning.", sourceKeys: ["fastmoss", "shoplus"], status: "Vendor-stated", limitation: "Entity depth, exports and current market access require a live known-entity test." },
  ],
  "best-ecommerce-ad-spy-tools": [
    { claim: "WinningHunter and Minea position their products around ecommerce advertising and product research.", sourceKeys: ["winninghunter", "minea"], status: "Vendor-stated", limitation: "Tool coverage and historical depth can vary by channel and plan." },
    { claim: "Ad research can reveal patterns but cannot confirm profitable spend or future performance.", sourceKeys: ["winninghunter", "minea"], status: "Editorial interpretation", limitation: "Profitability requires first-party cost, conversion, margin and return data." },
  ],
  "kalodata-review": [
    { claim: "Kalodata has public routes for categories, shops, products, creators, videos and livestreams.", sourceKeys: ["kalodataSitemap"], status: "Observed in public material", limitation: "Entity depth, history and exports vary by current plan and market." },
    { claim: "Kalodata is evaluated as a TikTok Shop research system, not a source of guaranteed official sales data.", sourceKeys: ["kalodata", "tiktok"], status: "Editorial interpretation", limitation: "Estimated values require platform-native and commercial validation." },
  ],
  "fastmoss-review": [
    { claim: "FastMoss presents itself as a TikTok Shop analytics and research platform.", sourceKeys: ["fastmoss"], status: "Vendor-stated", limitation: "Current modules, markets and plan allowances should be checked before purchase." },
    { claim: "Products, shops, creators, videos, markets and exports should be compared with known entities before purchase.", sourceKeys: ["fastmoss", "tiktok"], status: "Editorial interpretation", limitation: "Country depth and plan allowances can differ." },
  ],
  "winninghunter-review": [
    { claim: "WinningHunter is positioned for product, advertising and store research.", sourceKeys: ["winninghunter"], status: "Vendor-stated", limitation: "Current filters, history and estimates must be checked in the subscribed plan." },
    { claim: "Shopify and TikTok Shop operating facts should be verified with official platform information.", sourceKeys: ["shopify", "tiktok"], status: "Editorial interpretation", limitation: "A third-party research record is not a platform account record." },
  ],
  "winninghunter-pricing": [
    { claim: "WinningHunter plan names, prices, limits and billing terms should be checked on the current official destination before subscribing.", sourceKeys: ["winninghunter"], status: "Requires live verification", limitation: "A public pricing amount can change and does not prove coverage, history, exports or live-account access for a specific market." },
  ],
  "reviews/trendtrack": [
    { claim: "TrendTrack is evaluated as a dated trend and product-research workflow, using platform guidance and trend observation as the verification context.", sourceKeys: ["shopifyProductResearch", "googleTrends"], status: "Editorial interpretation", limitation: "Trend direction does not prove demand, margin or product-market fit." },
  ],
  "reviews/shophunter": [
    { claim: "ShopHunter is evaluated as a store and product research workflow, with Shopify operating context kept separate from third-party estimates.", sourceKeys: ["shophunter", "shopify"], status: "Editorial interpretation", limitation: "Store visibility does not prove current sales, conversion or contribution margin." },
  ],
  "winninghunter-vs-kalodata": [
    { claim: "This comparison uses each vendor's official product surface to frame workflow and price checks; neither source proves live-account coverage for every market.", sourceKeys: ["winninghunter", "kalodata"], status: "Requires live verification", limitation: "Run the same known-entity brief in both products before subscribing." },
  ],
  "winninghunter-vs-pipiads": [
    { claim: "This comparison uses official vendor pages plus Meta Ad Library context for the two advertising-led workflows.", sourceKeys: ["winninghunter", "pipiads", "metaAdLibrary"], status: "Requires live verification", limitation: "Visible ad records do not establish profitable spend or current plan depth." },
  ],
  "winninghunter-vs-shophunter": [
    { claim: "This comparison separates WinningHunter's ad-to-store path from ShopHunter's store-first path using official vendor and Shopify context.", sourceKeys: ["winninghunter", "shophunter", "shopify"], status: "Requires live verification", limitation: "A matched store and product brief is still required to confirm the better fit." },
  ],
  "minea-review": [
    { claim: "Minea publishes dedicated material for product, competitor-ad, Shopify and TikTok Shop research, plus current public pricing.", sourceKeys: ["mineaProducts", "mineaCompetitors", "mineaShopify", "mineaTikTok", "mineaPricing"], status: "Observed in public material", limitation: "Feature availability, credits and data limits can depend on the current plan." },
    { claim: "Minea is best assessed through a repeated advertiser and product workflow rather than a single discovery result.", sourceKeys: ["minea"], status: "Editorial interpretation", limitation: "The recommendation is research-based, not a claim of long-term hands-on use." },
  ],
  "kalodata-vs-fastmoss": [
    { claim: "Kalodata has the stronger independently visible public entity structure in this comparison.", sourceKeys: ["kalodataSitemap"], status: "Observed in public material", limitation: "Public visibility is not the same as logged-in workflow quality." },
    { claim: "FastMoss can only win the comparison after a live test of required markets, entities, history and exports.", sourceKeys: ["fastmoss"], status: "Requires live verification", limitation: "The public site did not support an equal evidence depth during research." },
  ],
  "kalodata-alternatives": [
    { claim: "FastMoss is the closest direct Kalodata replacement to test, while Shoplus is a specialist option for content and creator research.", sourceKeys: ["kalodataSitemap", "fastmoss", "shoplus"], status: "Editorial interpretation", limitation: "Neither product should replace Kalodata without a live known-entity test in every required market." },
    { claim: "WinningHunter fits an advertising-led workflow, TikTok Shop Seller Center remains the official verification companion and keeping Kalodata is valid when no alternative improves the recurring job.", sourceKeys: ["winninghunter", "tiktok", "kalodata"], status: "Editorial interpretation", limitation: "Advertising tools and official account records solve different jobs from external TikTok Shop marketplace intelligence." },
  ],
  "how-to-research-products-for-tiktok-shop": [
    { claim: "TikTok Shop product validation should combine platform evidence with external research signals.", sourceKeys: ["tiktok"], status: "Editorial interpretation", limitation: "The official seller resource remains the authority for current platform rules and account data." },
    { claim: "Kalodata, FastMoss and Shoplus can be compared as research inputs, not winning-product guarantees.", sourceKeys: ["kalodata", "fastmoss", "shoplus"], status: "Vendor-stated", limitation: "Demand, margin, supply, compliance and creative execution need separate validation." },
  ],
  workflows: [
    { claim: "Advertising, Shopify, TikTok Shop and Amazon research require different evidence and outputs.", sourceKeys: ["metaAdLibrary", "shopify", "tiktok", "amazon"], status: "Editorial interpretation", limitation: "The hub routes only to published workflows and does not claim that one process fits every platform." },
  ],
  "winninghunter-vs-minea": [
    { claim: "WinningHunter has the documented hands-on ad-to-product-and-store workflow on this site, while Minea publicly documents product, image, supplier and store-research paths that still require a matched live-account test.", sourceKeys: ["winninghunter", "minea", "mineaProducts", "mineaCompetitors", "mineaShopify"], status: "Editorial interpretation", limitation: "Both products make multichannel claims. The comparison does not infer a winner from channel names or manufacture equal test evidence." },
    { claim: "Current pricing and limits must be checked live.", sourceKeys: ["mineaPricing", "winninghunter"], status: "Requires live verification", limitation: "Minea's pricing page returned 200, while WinningHunter's former public /pricing path returned 404 on 2026-08-06." },
  ],
  "winninghunter-alternatives": [
    { claim: "Minea is the closest adjacent replacement for image, supplier and store research, Pipiads is a specialist option and Meta Ad Library is the official free verification path.", sourceKeys: ["winninghunter", "minea", "pipiads", "metaAdLibrary"], status: "Editorial interpretation", limitation: "Every replacement requires a matched advertiser, product, store and export test before migration." },
  ],
  "minea-alternatives": [
    { claim: "WinningHunter is the replacement with a documented ad-to-product-and-store workflow on this site, while Pipiads and Meta Ad Library solve narrower creative or verification jobs.", sourceKeys: ["minea", "winninghunter", "pipiads", "metaAdLibrary"], status: "Editorial interpretation", limitation: "A replacement may not reproduce Minea-specific image, supplier, saved-data, monitoring or plan workflows." },
  ],
  "how-to-research-products-with-facebook-ads": [
    { claim: "Meta Ad Library is the primary public source used to observe Meta advertising records.", sourceKeys: ["metaAdLibrary"], status: "Observed in public material", limitation: "Automated requests were challenged during the source refresh; the current interface should be checked in a normal browser." },
    { claim: "Visible advertising activity does not prove spend, conversion, margin or profit.", sourceKeys: ["metaAdLibrary", "shopify"], status: "Editorial interpretation", limitation: "Material decisions require supplier, platform and first-party test evidence." },
  ],
  "how-to-analyze-competitor-facebook-ads": [
    { claim: "Meta Ad Library is used as the public observation layer for advertiser, creative and destination research.", sourceKeys: ["metaAdLibrary"], status: "Observed in public material", limitation: "Visible ad activity does not prove spend, conversion, margin or profit." },
    { claim: "Competitor ad analysis should connect creative, offer and landing-page observations to an original test brief.", sourceKeys: ["metaAdLibrary", "shopify"], status: "Editorial interpretation", limitation: "Do not copy protected creative or infer competitor performance from visibility." },
  ],
  "how-to-find-shopify-stores-from-facebook-ads": [
    { claim: "The workflow traces a public advertiser, ad, destination, product and store domain identity chain.", sourceKeys: ["metaAdLibrary", "shopify"], status: "Editorial interpretation", limitation: "Technology signals support but do not prove ownership, sales or revenue." },
  ],
  "how-to-track-shopify-competitor-ads": [
    { claim: "A recurring watchlist should record dated public ad changes and map each change to an owner and decision.", sourceKeys: ["metaAdLibrary", "shopify"], status: "Editorial interpretation", limitation: "Monitoring visibility is not a performance or market-share report." },
  ],
  "how-to-use-meta-ad-library-for-product-research": [
    { claim: "Meta Ad Library is the primary official public source in this free product-research workflow.", sourceKeys: ["metaAdLibrary"], status: "Observed in public material", limitation: "Interface fields and availability can change; public records do not prove economics." },
  ],
  "how-to-validate-products-found-in-facebook-ads": [
    { claim: "Product validation requires margin, supplier, fulfillment, policy and controlled-test checks beyond ad visibility.", sourceKeys: ["metaAdLibrary", "shopify"], status: "Editorial interpretation", limitation: "Supplier quotes, platform rules and first-party results must be confirmed for the actual business." },
  ],
};

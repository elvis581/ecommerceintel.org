export type ComparisonRow = { useCase: string; choice: string; reason: string };

const researchRows: ComparisonRow[] = [
  { useCase: "TikTok Shop product research", choice: "Kalodata or FastMoss", reason: "Compare current market coverage and the path from products to shops, creators and content." },
  { useCase: "Additional TikTok commerce view", choice: "Shoplus", reason: "Useful as another research workflow when its market coverage matches the assignment." },
  { useCase: "Product and ad research", choice: "WinningHunter", reason: "Relevant when Shopify store and advertising signals lead the brief." },
  { useCase: "Cross-channel ad intelligence", choice: "Minea", reason: "Relevant when creative and advertiser research is the primary job." },
];

export const comparisonRowsBySlug: Record<string, ComparisonRow[]> = {
  tools: researchRows,
  "best-ecommerce-intelligence-tools": [
    { useCase: "Shopify ad-to-store product research", choice: "WinningHunter", reason: "Connect advertising activity to products, stores and competitor context." },
    { useCase: "TikTok Shop marketplace intelligence", choice: "Kalodata", reason: "Move between products, shops, creators and content in one focused research path." },
    { useCase: "Broad cross-channel ad intelligence", choice: "Minea", reason: "Use when several paid channels and creative formats belong to the same brief." },
    { useCase: "Cross-market TikTok Shop team research", choice: "Trial FastMoss", reason: "Verify known-entity retrieval, history and exports in every required country." },
    { useCase: "Occasional verification", choice: "Start free", reason: "Use platform-native records, public ad libraries and a dated spreadsheet before subscribing." },
  ],
  platforms: [
    { useCase: "Marketplace, creator and content research", choice: "TikTok Shop", reason: "Connect products and shops to creators, videos, livestreams and current seller requirements." },
    { useCase: "Listings, advertising and inventory", choice: "Amazon", reason: "Keep Seller Central and official marketplace records close to each decision." },
    { useCase: "Owned store, marketing and automation", choice: "Shopify", reason: "Connect store research and advertising to owned-funnel economics and operations." },
  ],
  "best-ecommerce-product-research-tools": researchRows,
  "best-tiktok-shop-tools": [
    { useCase: "Product and shop research", choice: "Kalodata", reason: "Shortlist when its current TikTok Shop workflow fits the market and team." },
    { useCase: "Market and creator analytics", choice: "FastMoss", reason: "Compare when cross-market and creator questions are central." },
    { useCase: "Alternative commerce research", choice: "Shoplus", reason: "Use as another view of products, stores and creators." },
  ],
  "best-ecommerce-ad-spy-tools": [
    { useCase: "Shopify product and ad research", choice: "WinningHunter", reason: "Connect product, store and advertising investigation." },
    { useCase: "Advertising and creative research", choice: "Minea", reason: "Study advertiser and creative patterns across currently supported sources." },
    { useCase: "Primary public ad records", choice: "Platform ad libraries", reason: "Verify public campaign evidence directly when available." },
  ],
  "kalodata-review": [
    { useCase: "Documented marketplace entities", choice: "Kalodata", reason: "Its public routes clearly connect categories, products, shops, creators, videos and livestreams." },
    { useCase: "Cross-market live-account test", choice: "Compare both", reason: "Run the same known entities in Kalodata and FastMoss for every required country." },
    { useCase: "TikTok content and influencer trends", choice: "Shoplus", reason: "Consider it when videos, music, ads and influencer discovery lead the brief." },
    { useCase: "Meta ads and Shopify stores", choice: "Neither", reason: "Use WinningHunter or Minea when advertising and owned-store research are the primary job." },
    { useCase: "Occasional product inspiration", choice: "Start manual", reason: "Platform-native checks may be sufficient until research becomes a recurring workflow." },
  ],
  "fastmoss-review": [
    { useCase: "Verified live market depth", choice: "FastMoss", reason: "Choose it only when the account retrieves the required products, shops and creators in each country." },
    { useCase: "Clear accessible entity evidence", choice: "Kalodata", reason: "Its public sitemap provides a stronger documented starting point before live testing." },
    { useCase: "Cross-market agency workflow", choice: "Test both", reason: "Compare retrieval, dates, history, exports and missing entities with the same assignment." },
    { useCase: "TikTok content discovery", choice: "Shoplus", reason: "Consider it when videos, music, ads and influencers matter more than marketplace depth." },
    { useCase: "Meta or Shopify research", choice: "Neither", reason: "Use an advertising and store-intelligence tool for that decision." },
  ],
  "winninghunter-review": [
    { useCase: "Shopify plus Meta ad research", choice: "WinningHunter", reason: "A focused starting point when ads need to connect to products, stores and competitors." },
    { useCase: "TikTok Shop products, shops and creators", choice: "Kalodata", reason: "Use a marketplace-first workflow when the brief begins with TikTok Shop entities." },
    { useCase: "Advertising and creative pattern research", choice: "PipiAds", reason: "Consider it when ad discovery and creative comparison lead the brief." },
    { useCase: "Known Shopify store investigation", choice: "ShopHunter", reason: "Use a store-first workflow when the domain and assortment are already known." },
    { useCase: "Store and product connection analysis", choice: "WinningHunter", reason: "Its main decision value is the path from advertising activity into Shopify-oriented store and product context." },
    { useCase: "TikTok Shop shops, creators or livestreams", choice: "Neither", reason: "Start with a dedicated TikTok Shop marketplace-intelligence tool." },
    { useCase: "Occasional beginner ad inspiration", choice: "Start free", reason: "Use public ad libraries first; pay only when a recurring research workflow justifies the subscription." },
  ],
  "minea-review": [
    { useCase: "Meta, TikTok and Pinterest research", choice: "Minea", reason: "Start here when broad cross-channel creative discovery belongs to one brief." },
    { useCase: "Reverse-image and supplier discovery", choice: "Minea", reason: "Its documented image and supplier workflows distinguish it from a narrower ad tool." },
    { useCase: "Shopify-centered Meta research", choice: "WinningHunter", reason: "Consider it when ads, products, stores and competitors are the main connected path." },
    { useCase: "TikTok Shop marketplace entities", choice: "Neither", reason: "Use a dedicated product for shops, creators, videos and livestreams." },
    { useCase: "Occasional creative inspiration", choice: "Start free", reason: "Use public ad libraries before paying for cross-channel monitoring and credits." },
  ],
  "kalodata-vs-fastmoss": [
    { useCase: "Product research", choice: "Test both", reason: "Use the same market, filters and shortlist to compare evidence quality." },
    { useCase: "Creator research", choice: "Workflow-dependent", reason: "Choose the interface that makes concentration and recent activity clearer." },
    { useCase: "Agency research", choice: "Coverage-dependent", reason: "Confirm markets, seats, exports and shared workflow requirements." },
    { useCase: "Beginner workflow", choice: "Ease-dependent", reason: "Choose the product that produces a documented shortlist with less confusion." },
  ],
  "kalodata-alternatives": [
    { useCase: "Closest marketplace alternative", choice: "FastMoss", reason: "Trial with known products, shops, creators and markets before subscribing." },
    { useCase: "TikTok content and influencer research", choice: "Shoplus", reason: "Use when videos, music, ads and influencer discovery lead the brief." },
    { useCase: "Documented entity and livestream routes", choice: "Keep Kalodata", reason: "Retain it when the current workflow and target markets already fit." },
    { useCase: "Meta ads and Shopify stores", choice: "WinningHunter or Minea", reason: "Choose another category when TikTok Shop entities are not the main question." },
  ],
  "how-to-research-products-for-tiktok-shop": [
    { useCase: "Product and shop signals", choice: "Kalodata", reason: "One option for focused TikTok Shop investigation." },
    { useCase: "Market and creator context", choice: "FastMoss", reason: "Compare when cross-market research matters." },
    { useCase: "Alternative dataset", choice: "Shoplus", reason: "Use as another source of directional research evidence." },
  ],
};

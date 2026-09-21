export type ResearchStatus = "Personally tested" | "Used by my team" | "Feature research and operator workflow evaluation" | "Public information overview" | "Comparison-only inclusion" | "Official pricing page checked September 21, 2026";

export type AffiliateTool = {
  name: string;
  slug: string;
  category: string;
  officialUrl: string;
  affiliateUrl: string;
  ctaText: string;
  shortDescription: string;
  bestFor: string;
  researchStatus: ResearchStatus;
  isAffiliateEnabled: boolean;
  isSponsored: boolean;
  lastChecked: string;
  affiliatePath?: string;
};

export const defaultWinningHunterAffiliateUrl = "https://winninghunter.com/?ref=zlreviews";
const winningHunterAffiliateUrl = process.env.WINNINGHUNTER_AFFILIATE_URL?.trim() || defaultWinningHunterAffiliateUrl;

export const affiliateTools: Record<string, AffiliateTool> = {
  kalodata: { name: "Kalodata", slug: "kalodata", category: "TikTok Shop intelligence", officialUrl: "https://www.kalodata.com/", affiliateUrl: "", ctaText: "Visit Kalodata", shortDescription: "Research TikTok Shop products, shops, creators, videos and category activity from one market-intelligence workspace.", bestFor: "TikTok Shop sellers building product and creator shortlists", researchStatus: "Feature research and operator workflow evaluation", isAffiliateEnabled: false, isSponsored: false, lastChecked: "2026-07-11" },
  fastmoss: { name: "FastMoss", slug: "fastmoss", category: "TikTok Shop analytics", officialUrl: "https://www.fastmoss.com/", affiliateUrl: "", ctaText: "Visit FastMoss", shortDescription: "Explore TikTok Shop market, product, shop, creator and content signals across supported regions.", bestFor: "Teams comparing products, creators and markets", researchStatus: "Public information overview", isAffiliateEnabled: false, isSponsored: false, lastChecked: "2026-07-12" },
  shoplus: { name: "Shoplus", slug: "shoplus", category: "TikTok content and influencer research", officialUrl: "https://www.shoplus.net/", affiliateUrl: "", ctaText: "Visit Shoplus", shortDescription: "Research popular TikTok videos, music, ads and influencers, then verify any current TikTok Shop commerce modules in a live account.", bestFor: "Content and creator teams investigating TikTok trends", researchStatus: "Public information overview", isAffiliateEnabled: false, isSponsored: false, lastChecked: "2026-07-11" },
  winninghunter: { name: "WinningHunter", slug: "winninghunter", category: "Product and ad research", officialUrl: "https://winninghunter.com/", affiliateUrl: winningHunterAffiliateUrl, affiliatePath: "/go/winninghunter", ctaText: "Explore WinningHunter", shortDescription: "Study ecommerce products, advertising activity and store signals when researching opportunities and creative patterns.", bestFor: "Shopify-focused product and ad researchers", researchStatus: "Feature research and operator workflow evaluation", isAffiliateEnabled: Boolean(winningHunterAffiliateUrl), isSponsored: Boolean(winningHunterAffiliateUrl), lastChecked: "2026-09-20" },
  minea: { name: "Minea", slug: "minea", category: "Ad intelligence", officialUrl: "https://www.minea.com/", affiliateUrl: "", ctaText: "Visit Minea", shortDescription: "Research ecommerce advertising, products, creatives and competitors across the channels currently supported by the platform.", bestFor: "Teams comparing advertising and creative signals", researchStatus: "Feature research and operator workflow evaluation", isAffiliateEnabled: false, isSponsored: false, lastChecked: "2026-08-06" },
  pipiads: { name: "PipiAds", slug: "pipiads", category: "Ad intelligence", officialUrl: "https://www.pipiads.com/", affiliateUrl: "", ctaText: "Visit PipiAds", shortDescription: "Review visible advertising and product signals as part of a repeatable research brief.", bestFor: "Performance marketers and product researchers", researchStatus: "Feature research and operator workflow evaluation", isAffiliateEnabled: false, isSponsored: false, lastChecked: "2026-09-20" },
  shophunter: { name: "ShopHunter", slug: "shophunter", category: "Store research", officialUrl: "https://shophunter.com/", affiliateUrl: "", ctaText: "Visit ShopHunter", shortDescription: "Investigate ecommerce stores, products and competitor positioning.", bestFor: "Shopify store researchers", researchStatus: "Feature research and operator workflow evaluation", isAffiliateEnabled: false, isSponsored: false, lastChecked: "2026-09-20" },
};

export function getToolUrl(tool: AffiliateTool) {
  return tool.isAffiliateEnabled && tool.affiliateUrl ? tool.affiliatePath || tool.affiliateUrl : tool.officialUrl;
}

export function getToolLinkRel(tool: AffiliateTool) {
  return tool.isAffiliateEnabled || tool.isSponsored
    ? "sponsored nofollow noopener noreferrer"
    : "noopener noreferrer";
}

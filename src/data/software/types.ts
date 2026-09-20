export interface SoftwareTool {
  name: string;
  slug: string;
  website?: string;
  description: string;
  categories: string[];
  platforms: string[];
  bestFor: string[];
  notIdealFor: string[];
  capabilities: {
    facebookAds?: boolean;
    tiktokAds?: boolean;
    shopifyTracking?: boolean;
    productResearch?: boolean;
    storeResearch?: boolean;
    competitorResearch?: boolean;
    aiFeatures?: boolean;
    api?: boolean;
    mcp?: boolean;
  };
  pricing?: { startingPrice?: string; billingPeriod?: string; freeTrial?: string; notes?: string };
  pros: string[];
  cons: string[];
  affiliateUrl?: string;
  lastChecked: string;
}

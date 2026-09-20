export type ToolDirectoryCategory = "tiktok-shop" | "ad-intelligence" | "shopify";

export type ToolDirectoryItem = {
  name: string;
  category: ToolDirectoryCategory;
  categoryLabel: string;
  bestFor: string;
  startingPrice: string;
  evidence: string;
  assessment: string;
  reviewHref: string;
};

export const toolDirectoryItems: ToolDirectoryItem[] = [
  { name: "Kalodata", category: "tiktok-shop", categoryLabel: "TikTok Shop analytics", bestFor: "Product, shop, creator, video and livestream research", startingPrice: "Check current plans", evidence: "Official research and workflow evaluation", assessment: "Strong documented workflow", reviewHref: "/kalodata-review" },
  { name: "FastMoss", category: "tiktok-shop", categoryLabel: "TikTok Shop analytics", bestFor: "Cross-market entity coverage and export testing", startingPrice: "Check current plans", evidence: "Official research and workflow evaluation", assessment: "Account test required", reviewHref: "/fastmoss-review" },
  { name: "WinningHunter", category: "shopify", categoryLabel: "Shopify and ad intelligence", bestFor: "Connecting ads, stores, products and competitors", startingPrice: "Check current plans", evidence: "Hands-on workflow test", assessment: "8.8/10", reviewHref: "/winninghunter-review" },
  { name: "Minea", category: "ad-intelligence", categoryLabel: "Cross-channel ad intelligence", bestFor: "Meta, TikTok, Pinterest, image and store research", startingPrice: "$49/month observed July 12, 2026", evidence: "Official research and workflow evaluation", assessment: "Strong documented breadth", reviewHref: "/minea-review" },
];

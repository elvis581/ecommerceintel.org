import { affiliateTools, getToolUrl } from "@/config/affiliate";
import { ToolCard } from "./tool-card";

const guideHrefs: Record<string, string> = {
  kalodata: "/kalodata-review",
  fastmoss: "/fastmoss-review",
  winninghunter: "/winninghunter-review",
  minea: "/minea-review",
};

const toolInsights: Record<string, { bestFor: string; myTake: string; reviewLabel: string }> = {
  kalodata: { bestFor: "TikTok Shop product and creator research", myTake: "My strongest starting point for connected TikTok Shop research. Treat GMV as a signal, not a sales record.", reviewLabel: "Read Kalodata Review" },
  fastmoss: { bestFor: "Cross-market TikTok Shop research", myTake: "The direct Kalodata alternative I would test when market breadth and entity coverage matter.", reviewLabel: "Read FastMoss Review" },
  winninghunter: { bestFor: "Shopify product and ad research", myTake: "Useful when ads need to connect to advertisers, stores, products and competitors.", reviewLabel: "Read WinningHunter Review" },
  minea: { bestFor: "Cross-channel ad and product research", myTake: "The broader choice when Meta, TikTok, Pinterest and image research belong to one brief.", reviewLabel: "Read Minea Review" },
};

export function ToolStackSection() {
  return <div className="grid gap-4 md:grid-cols-2">{Object.entries(affiliateTools).filter(([key]) => key in guideHrefs).map(([key, tool]) => <ToolCard key={key} name={tool.name} role={tool.category} href={guideHrefs[key]} externalHref={getToolUrl(tool)} externalLabel={tool.ctaText} sponsored={tool.isAffiliateEnabled || tool.isSponsored} {...toolInsights[key]} />)}</div>;
}

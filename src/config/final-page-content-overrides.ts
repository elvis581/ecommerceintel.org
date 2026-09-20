import type { ArticlePage } from "./pages";
import { buyingGuideFinalOverrides } from "./buying-guide-final-overrides";
import { decisionPageFinalOverrides } from "./decision-page-final-overrides";
import { fastMossReviewContent } from "./fastmoss-review-content";
import { hubTrustFinalOverrides } from "./hub-trust-final-overrides";
import { kalodataReviewContent } from "./kalodata-review-content";
import { mineaReviewContent } from "./minea-review-content";
import { winningHunterReviewContent } from "./winninghunter-review-content";
import { ecommerceIntelligenceToolsContent } from "./ecommerce-intelligence-tools-content";

type Override = Partial<ArticlePage>;

export const finalPageContentOverrides: Record<string, Override> = {
  ...hubTrustFinalOverrides,
  ...buyingGuideFinalOverrides,
  ...decisionPageFinalOverrides,
  "kalodata-review": kalodataReviewContent,
  "fastmoss-review": fastMossReviewContent,
  "minea-review": mineaReviewContent,
  "winninghunter-review": winningHunterReviewContent,
  "best-ecommerce-intelligence-tools": ecommerceIntelligenceToolsContent,
  workflows: { hideFaq: false },
};

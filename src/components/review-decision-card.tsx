"use client";

import { ExternalLink, ThumbsUp } from "lucide-react";
import type { ReviewDecision } from "@/config/pages";
import { affiliateTools, getToolLinkRel, getToolUrl } from "@/config/affiliate";
import { appendUtmParams } from "@/lib/utm";
import { trackEvent } from "@/lib/analytics";

export function ReviewDecisionCard({ decision }: { decision: ReviewDecision }) {
  const tool = affiliateTools[decision.toolKey];
  if (!tool) return null;

  return <aside className="review-decision-card"><div className="review-decision-status"><ThumbsUp className="size-5" /><div><p className="eyebrow">Editorial call</p><h2>{decision.status}</h2><p>{decision.basis}</p></div></div><dl><div><dt>Useful when</dt><dd>{decision.bestFor}</dd></div><div><dt>Strongest signal</dt><dd>{decision.mainStrength}</dd></div><div><dt>Limit to check</dt><dd>{decision.mainWeakness}</dd></div><div><dt>Buying approach</dt><dd>{decision.recommendation}</dd></div></dl><a href={getToolUrl(tool)} target="_blank" rel={getToolLinkRel(tool)} onClick={(event) => { const destination = appendUtmParams(getToolUrl(tool), window.location.search, window.location.origin); event.currentTarget.href = destination; const params = new URLSearchParams(window.location.search); trackEvent("affiliate_cta_click", {tool:tool.name,page:window.location.pathname,placement:"review_decision_card",destination,utm_source:params.get("utm_source") || "",utm_medium:params.get("utm_medium") || "",utm_campaign:params.get("utm_campaign") || "",utm_term:params.get("utm_term") || "",utm_content:params.get("utm_content") || ""}); }} className="btn button-primary">{decision.ctaLabel}<ExternalLink className="size-4" /></a></aside>;
}

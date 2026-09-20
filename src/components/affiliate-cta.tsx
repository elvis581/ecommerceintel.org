"use client";

import { ExternalLink } from "lucide-react";
import type { MouseEvent } from "react";
import { affiliateTools, getToolLinkRel, getToolUrl } from "@/config/affiliate";
import { trackEvent } from "@/lib/analytics";
import { appendUtmParams } from "@/lib/utm";
import { TrackedLink } from "./tracked-link";

type Props = {
  toolKey: string;
  ctaLabel?: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
  placement?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function AffiliateCta({ toolKey, ctaLabel, eyebrow, heading, description, placement = "article_cta", secondaryHref, secondaryLabel }: Props) {
  const tool = affiliateTools[toolKey];
  if (!tool) return null;
  const isCommercial = tool.isAffiliateEnabled || tool.isSponsored;
  const handleOutboundClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const destination = appendUtmParams(getToolUrl(tool), window.location.search, window.location.origin);
    event.currentTarget.href = destination;
    const params = new URLSearchParams(window.location.search);
    trackEvent(isCommercial ? "affiliate_outbound_click" : "external_cta_click", {
      tool: tool.name,
      page: window.location.pathname,
      position: placement,
      cta_text: ctaLabel || tool.ctaText,
    });
    trackEvent(isCommercial ? "affiliate_cta_click" : "external_cta_click", {
      tool: tool.name,
      page: window.location.pathname,
      placement,
      destination,
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
    });
  };

  return <aside aria-label={heading || tool.name} className={`affiliate-cta ${isCommercial ? "" : "affiliate-cta-official"}`}><div><p className="eyebrow">{eyebrow || (isCommercial ? "Sponsored tool" : "Official product page")}</p><p className="affiliate-cta-heading">{heading || tool.name}</p><p>{description || tool.shortDescription}</p></div><div className="affiliate-cta-actions"><a href={getToolUrl(tool)} target="_blank" rel={getToolLinkRel(tool)} onClick={handleOutboundClick} className={isCommercial ? "btn button-primary shrink-0" : "official-product-link"}>{ctaLabel || tool.ctaText}<ExternalLink className="size-4" /></a>{secondaryHref && secondaryLabel && <TrackedLink href={secondaryHref} className={isCommercial ? "button-secondary-light" : "official-product-link official-product-link-secondary"} eventName="comparison_cta_click" eventParams={{placement,tool:tool.name}}>{secondaryLabel}</TrackedLink>}</div></aside>;
}

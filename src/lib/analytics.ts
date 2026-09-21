"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export const plannedEvents = [
  "start_here_click", "platform_card_click", "workflow_card_click", "tool_card_click",
  "review_cta_click", "comparison_cta_click", "affiliate_cta_click", "resource_cta_click",
  "resource_download_click", "newsletter_cta_click", "internal_link_click", "external_cta_click",
  "affiliate_outbound_click", "money_page_click", "comparison_click", "review_click",
] as const;

export type AnalyticsEventName = (typeof plannedEvents)[number];

export function trackEvent(eventName: AnalyticsEventName, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const detail = { event: eventName, ...params };
  document.documentElement.dataset.lastAnalyticsEvent = eventName;
  window.dispatchEvent(new CustomEvent("ecommerce-intel:analytics", { detail }));
  const consent = window.localStorage.getItem("ecommerceintel-consent");
  if (consent !== "accepted") return;
  if (window.gtag) {
    window.gtag("event", eventName, params);
  } else {
    window.dataLayer ||= [];
    window.dataLayer.push(detail);
  }
  if (process.env.NODE_ENV === "development") console.info("[analytics]", eventName, params);
}

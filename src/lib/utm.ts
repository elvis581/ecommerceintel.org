const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export function appendUtmParams(href: string, currentSearch: string, currentOrigin?: string) {
  const destination = new URL(href, currentOrigin || "https://ecommerceintel.org");
  const current = new URLSearchParams(currentSearch);
  for (const key of UTM_KEYS) {
    const value = current.get(key);
    if (value && !destination.searchParams.has(key)) destination.searchParams.set(key, value);
  }
  if (href.startsWith("/")) return `${destination.pathname}${destination.search}${destination.hash}`;
  return destination.toString();
}

export const pricingNotice = {
  title: "Pricing changes frequently",
  body: "Check the official pricing page for current plans, limits, trial conditions and billing terms because prices and allowances can change.",
} as const;

export type PricingPlan = { name: string; monthly: string; note?: string };
export type PricingRecord = { tool: string; plans: readonly PricingPlan[]; lastChecked: string; sourceUrl: string; disclaimer: string };

export const pricingByTool = {
  kalodata: { tool: "Kalodata", plans: [], lastChecked: "2026-09-20", sourceUrl: "https://www.kalodata.com/", disclaimer: "Public plan pricing was not confirmed because the official site required an access challenge. Check the current official plans before subscribing." },
  fastmoss: { tool: "FastMoss", plans: [], lastChecked: "2026-07-11", sourceUrl: "https://www.fastmoss.com/", disclaimer: pricingNotice.body },
  shoplus: { tool: "Shoplus", plans: [], lastChecked: "2026-07-11", sourceUrl: "https://www.shoplus.net/", disclaimer: pricingNotice.body },
  winninghunter: { tool: "WinningHunter", plans: [{ name: "Basic", monthly: "$49/month" }, { name: "Standard", monthly: "$79/month" }, { name: "Premium", monthly: "$249/month" }], lastChecked: "2026-09-20", sourceUrl: "https://winninghunter.com/#pricing", disclaimer: pricingNotice.body },
  minea: { tool: "Minea", plans: [], lastChecked: "2026-07-11", sourceUrl: "https://www.minea.com/", disclaimer: pricingNotice.body },
  pipiads: { tool: "PipiAds", plans: [{ name: "Basic", monthly: "$49/month" }, { name: "Advanced", monthly: "$99/month" }, { name: "Enterprise", monthly: "$900/month" }], lastChecked: "2026-09-20", sourceUrl: "https://www.pipiads.com/pricing", disclaimer: "The official pricing page also lists a flexible custom plan. Confirm credits, users, trial terms and annual promotions before subscribing." },
  shophunter: { tool: "ShopHunter", plans: [], lastChecked: "2026-09-20", sourceUrl: "https://shophunter.io/", disclaimer: "The current public site did not expose a verifiable paid-plan amount. Check the official account or plan destination before comparing total cost." },
} satisfies Record<string, PricingRecord>;

export function getPricingSummary(toolKey: string) {
  const record = pricingByTool[toolKey as keyof typeof pricingByTool];
  if (!record || record.plans.length === 0) return "Public price not confirmed; check current official plans.";
  return record.plans.map((plan) => `${plan.name}: ${plan.monthly}`).join("; ");
}

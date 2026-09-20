import { ArrowRight, ClipboardCheck } from "lucide-react";
import { TrackedLink } from "./tracked-link";

export function ResourceCta() {
  return <section className="resource-cta"><div><ClipboardCheck className="size-7 text-emerald-300" /><p className="eyebrow mt-5 text-emerald-300">Published workflow</p><h2>My TikTok Shop Product Research Workflow</h2><p>See how I move from demand and creator signals to competition, margin, fulfillment risk and a testable shortlist. This is a complete guide you can use now, not a gated download or placeholder form.</p></div><TrackedLink href="/how-to-research-products-for-tiktok-shop" className="button-primary" eventName="resource_cta_click" eventParams={{resource:"tiktok_product_research_workflow"}}>Open the Research Workflow<ArrowRight className="size-4" /></TrackedLink></section>;
}

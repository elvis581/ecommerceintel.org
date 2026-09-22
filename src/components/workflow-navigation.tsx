import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "./tracked-link";

const workflows = [
  ["Product Research", "Shortlist products with market, seller and economics checks.", "/reviews/kalodata"],
  ["Ad Intelligence", "Trace visible campaigns into original product and creative questions.", "/winninghunter-review"],
  ["Store Research", "Inspect a known Shopify store, offer and assortment before comparing tools.", "/reviews/shophunter"],
  ["TikTok Shop", "Connect products, shops, creators, videos and livestream evidence.", "/reviews/kalodata"],
] as const;

export function WorkflowNavigation() {
  return <section className="workflow-navigation page-band" aria-labelledby="workflow-navigation-title"><div className="site-container"><div className="workflow-navigation-heading"><div><p className="eyebrow">Research by workflow</p><h2 id="workflow-navigation-title">Choose the question before the subscription.</h2></div><p>Each path points to a review or comparison that keeps the next verification step visible.</p></div><div className="workflow-navigation-list">{workflows.map(([title, description, href]) => <TrackedLink href={href} key={title} className="workflow-navigation-row" eventName="internal_link_click" eventParams={{ placement: "home_workflow_navigation", label: title }}><span>{title}</span><p>{description}</p><ArrowUpRight className="size-4" aria-hidden="true" /></TrackedLink>)}</div></div></section>;
}

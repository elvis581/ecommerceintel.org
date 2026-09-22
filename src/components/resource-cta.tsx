import { ArrowRight, ClipboardCheck } from "lucide-react";
import { TrackedLink } from "./tracked-link";

export function ResourceCta() {
  return <section className="resource-cta"><div><ClipboardCheck className="size-7 text-emerald-300" /><p className="eyebrow mt-5 text-emerald-300">Published methodology</p><h2>Build a Research Brief You Can Review</h2><p>Use the site&apos;s evidence and workflow framework to separate vendor signals from platform, supplier, margin and policy checks before choosing a tool.</p></div><TrackedLink href="/methodology" className="button-primary" eventName="resource_cta_click" eventParams={{ resource: "evaluation_methodology" }}>Open the Methodology<ArrowRight className="size-4" /></TrackedLink></section>;
}

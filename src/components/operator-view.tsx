import { UserRoundCheck } from "lucide-react";
import { TrackedLink } from "./tracked-link";

const relevantExperience: Record<string, string> = {
  "kalodata-review": "TikTok Shop research needs to connect product demand with shops, creators and content before a shortlist becomes useful.",
  "fastmoss-review": "Cross-market TikTok Shop research needs consistent entity retrieval, dates and comparison rules across every country in the brief.",
  "winninghunter-review": "Shopify product research becomes useful when ads can be connected to advertisers, stores, products and competitors.",
  "minea-review": "Cross-channel ad research needs to produce an original product or creative decision, not a larger collection of competitor assets.",
};

export function OperatorView({ slug }: { slug: string }) {
  return (
    <aside className="operator-view">
      <UserRoundCheck className="size-6 shrink-0 text-emerald-700" />
      <div>
        <p className="eyebrow">Operating question</p>
        <h2>The question to settle before subscribing</h2>
        <p>{relevantExperience[slug] || "The review focuses on the operating decision the tool needs to improve and the evidence required to support it."} <TrackedLink href="/about" eventName="internal_link_click" eventParams={{placement:"operator_experience",destination:"/about"}}>See the operating background.</TrackedLink></p>
      </div>
    </aside>
  );
}

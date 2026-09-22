import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "./tracked-link";

const rows = [
  { question: "Find products and analyze ads", path: "Product + ad research", tool: "WinningHunter", action: "Read review", href: "/winninghunter-review" },
  { question: "Research TikTok Shop opportunities", path: "TikTok Shop research", tool: "Kalodata", action: "Compare tools", href: "/winninghunter-vs-kalodata" },
  { question: "Analyze Shopify stores", path: "Shopify store research", tool: "ShopHunter", action: "Read review", href: "/reviews/shophunter" },
];

export function DecisionMatrix() {
  return <section className="decision-matrix" aria-labelledby="decision-matrix-title">
    <div className="decision-matrix-heading"><p className="eyebrow">Decision matrix</p><h2 id="decision-matrix-title">Start with the entity you need to understand.</h2></div>
    <div className="decision-matrix-table" role="table" aria-label="Research question recommendations">
      <div className="decision-matrix-row decision-matrix-header" role="row"><span role="columnheader">Starting question</span><span role="columnheader">Recommended path</span><span role="columnheader">Leading tool</span><span role="columnheader">Next step</span></div>
      {rows.map((row) => <div className="decision-matrix-row" role="row" key={row.question}><span role="cell">{row.question}</span><span role="cell" className="decision-matrix-path">{row.path}</span><span role="cell" className="decision-matrix-tool">{row.tool}</span><span role="cell"><TrackedLink href={row.href} eventName="internal_link_click" eventParams={{ placement: "home_decision_matrix", label: row.action }}>{row.action}<ArrowUpRight className="size-4" aria-hidden="true" /></TrackedLink></span></div>)}
    </div>
  </section>;
}

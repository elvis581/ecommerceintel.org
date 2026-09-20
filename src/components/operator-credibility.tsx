import { ClipboardCheck, FileSearch, Globe2, Layers3, Scale } from "lucide-react";

const points = [
  { icon: FileSearch, title: "Source first", text: "Official product and platform evidence" },
  { icon: Layers3, title: "Workflow fit", text: "The job a tool can actually support" },
  { icon: Globe2, title: "Market aware", text: "Country, channel and entity boundaries" },
  { icon: Scale, title: "Estimate labels", text: "Modeled values stay marked as estimates" },
  { icon: ClipboardCheck, title: "Next check", text: "A practical action after every review" },
];

export function OperatorCredibility() {
  return <section className="home-proof-band"><div className="site-container"><div className="home-proof-intro"><p className="eyebrow">How the desk works</p><h2 className="section-title">Every review has to survive the handoff to a real operator</h2><p>I use cross-border ecommerce experience to ask practical questions: which entities can be found, which values are modeled, which plan limits matter and what must be checked in the seller account or the margin sheet.</p></div><div className="home-proof-grid">{points.map((point, index) => <article key={point.title}><span className="home-proof-index">0{index + 1}</span><point.icon className="home-proof-icon" /><h3>{point.title}</h3><p>{point.text}</p></article>)}</div></div></section>;
}

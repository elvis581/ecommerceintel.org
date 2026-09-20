import { ArrowRight } from "lucide-react";
import type { PageCard } from "@/config/pages";
import { TrackedLink } from "./tracked-link";

export function GuideCard({ card }: { card: PageCard }) {
  return <article className="guide-card p-6"><p className="eyebrow">{card.label || "Next step"}</p><h3>{card.title}</h3><p>{card.description}</p>{(card.bestFor || card.myTake || card.limitation || card.chooseIf) && <dl className="guide-card-details">{card.bestFor && <div><dt>Useful when</dt><dd>{card.bestFor}</dd></div>}{card.myTake && <div><dt>Editorial read</dt><dd>{card.myTake}</dd></div>}{card.limitation && <div><dt>Limit to check</dt><dd>{card.limitation}</dd></div>}{card.chooseIf && <div><dt>Choose this path when</dt><dd>{card.chooseIf}</dd></div>}</dl>}<TrackedLink href={card.href} eventName="internal_link_click" eventParams={{placement:"page_card"}}>{card.linkLabel || "Read the file"}<ArrowRight className="size-4" /></TrackedLink></article>;
}

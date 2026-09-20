import { ArrowRight } from "lucide-react";
import { workflows } from "@/config/workflows";
import { TrackedLink } from "./tracked-link";

export function WorkflowCards() {
  return <div className="grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">{workflows.map((workflow) => <article key={workflow.title} className="workflow-tile"><h3>{workflow.title}</h3><p>{workflow.description}</p><small>{workflow.tools}</small><TrackedLink href={workflow.href} eventName="workflow_card_click" eventParams={{workflow:workflow.title}}>Open workflow<ArrowRight className="size-4" /></TrackedLink></article>)}</div>;
}

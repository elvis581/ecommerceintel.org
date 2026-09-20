import { ArrowRight } from "lucide-react";
import { TrackedLink } from "./tracked-link";
export function WorkflowCard({ number, title, description, href }: { number: string; title: string; description: string; href: string }) { return <TrackedLink href={href} className="workflow-card"><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><ArrowRight className="ml-auto size-4 shrink-0" /></TrackedLink>; }

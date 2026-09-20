import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "./tracked-link";
export function UseCaseCard({ title, description, href, tag }: { title: string; description: string; href: string; tag: string }) { return <TrackedLink href={href} className="use-case-card"><span>{tag}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight className="size-5" /></TrackedLink>; }

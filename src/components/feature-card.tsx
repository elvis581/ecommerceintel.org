import type { LucideIcon } from "lucide-react";
export function FeatureCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) { return <article className="plain-feature"><Icon className="size-6 text-blue-600" /><h3>{title}</h3><p>{description}</p></article>; }

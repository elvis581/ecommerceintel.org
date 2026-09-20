import { ArrowRight } from "lucide-react";
import { platforms } from "@/config/platforms";
import { TrackedLink } from "./tracked-link";

export function PlatformCards() {
  return <div className="grid gap-4 lg:grid-cols-3">{platforms.map((platform) => <article key={platform.name} className="platform-card"><p className="eyebrow">Platform</p><h3>{platform.name}</h3><p>{platform.description}</p><div className="mt-5 flex flex-wrap gap-2">{platform.topics.map((topic) => <span key={topic}>{topic}</span>)}</div><TrackedLink href={platform.href} eventName="platform_card_click" eventParams={{platform:platform.name}}>Explore {platform.name}<ArrowRight className="size-4" /></TrackedLink></article>)}</div>;
}

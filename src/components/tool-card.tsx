"use client";

import { ExternalLink } from "lucide-react";
import { appendUtmParams } from "@/lib/utm";
import { trackEvent } from "@/lib/analytics";
import { TrackedLink } from "./tracked-link";

type Props = { name: string; role: string; href: string; bestFor: string; myTake: string; reviewLabel: string; externalHref: string; externalLabel: string; sponsored: boolean };

export function ToolCard({ name, role, href, bestFor, myTake, reviewLabel, externalHref, externalLabel, sponsored }: Props) {
  return <article className="tool-card"><header className="tool-card-header"><div className="tool-monogram" aria-hidden="true">{name.slice(0, 2)}</div><div className="min-w-0"><p>{role}</p><h3>{name}</h3></div></header><div className="tool-card-body"><p className="tool-card-fit"><strong>Useful when</strong>{bestFor}</p><p className="tool-card-take">{myTake}</p></div><footer className="tool-card-actions"><TrackedLink href={href} eventName="tool_card_click" eventParams={{tool:name,placement:"tool_stack"}}>{reviewLabel}</TrackedLink><a href={externalHref} target="_blank" rel={sponsored ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"} onClick={(event) => { const destination = appendUtmParams(externalHref, window.location.search, window.location.origin); event.currentTarget.href = destination; const params = new URLSearchParams(window.location.search); trackEvent("affiliate_cta_click", {tool:name,page:window.location.pathname,placement:"home_tool_card",destination,utm_source:params.get("utm_source") || "",utm_medium:params.get("utm_medium") || "",utm_campaign:params.get("utm_campaign") || "",utm_term:params.get("utm_term") || "",utm_content:params.get("utm_content") || ""}); }}>{externalLabel}<ExternalLink className="size-3.5" /></a></footer></article>;
}

import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "./tracked-link";

const updates = [
  ["WinningHunter pricing", "Public monthly plans checked", "September 21, 2026", "/winninghunter-pricing"],
  ["WinningHunter review", "Product visuals and workflow evidence reviewed", "September 21, 2026", "/winninghunter-review"],
  ["Kalodata pricing", "Public price not confirmed", "September 20, 2026", "/reviews/kalodata"],
] as const;

export function LatestVerifiedUpdates() {
  return <section className="latest-verified-updates page-band" aria-labelledby="latest-verified-updates-title"><div className="site-container"><div className="latest-verified-heading"><div><p className="eyebrow">Latest verified updates</p><h2 id="latest-verified-updates-title">Fresh checks keep the files useful.</h2></div><p>These are page and source checks, not vendor news claims.</p></div><div className="latest-verified-list">{updates.map(([page, detail, date, href]) => <TrackedLink href={href} key={page} className="latest-verified-row" eventName="internal_link_click" eventParams={{ placement: "home_verified_updates", label: page }}><span>{page}</span><strong>{detail}</strong><small>{date}</small><ArrowUpRight className="size-4" aria-hidden="true" /></TrackedLink>)}</div></div></section>;
}

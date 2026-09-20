import { Info } from "lucide-react";
import { TrackedLink } from "./tracked-link";

export function DisclosureBox({ text = "Some links may be affiliate links. I may earn a commission at no extra cost to you.", sitewide = false }: { text?: string; sitewide?: boolean }) {
  return <aside className={`disclosure-box ${sitewide ? "disclosure" : ""}`}><Info className="mt-0.5 size-5 shrink-0" /><p>{text}{sitewide && <> <TrackedLink href="/affiliate-disclosure" eventName="internal_link_click" eventParams={{placement:"sitewide_disclosure",label:"Affiliate Disclosure"}}>Read the full Affiliate Disclosure.</TrackedLink></>}</p></aside>;
}

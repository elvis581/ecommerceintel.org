import { ChevronRight } from "lucide-react";
import { TrackedLink } from "./tracked-link";

export function Breadcrumb({ current }: { current: string }) {
  return <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-sm text-slate-500"><TrackedLink href="/" eventName="internal_link_click" eventParams={{placement:"breadcrumb",label:"Home"}} className="hover:text-slate-900">Home</TrackedLink><ChevronRight className="size-4" /><span className="line-clamp-1" aria-current="page">{current}</span></nav>;
}

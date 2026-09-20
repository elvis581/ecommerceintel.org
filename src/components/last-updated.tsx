import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/config/site";
export function LastUpdated() { return <p className="last-updated inline-flex items-center gap-2 text-sm text-slate-500"><CalendarDays className="size-4" />Last updated {siteConfig.lastUpdated}</p>; }

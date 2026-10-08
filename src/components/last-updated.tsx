import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/config/site";
export function LastUpdated({ modifiedIso }: { modifiedIso?: string }) {
  const date = modifiedIso || siteConfig.lastUpdatedIso;
  const label = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
  return <p className="last-updated inline-flex items-center gap-2 text-sm text-slate-500"><CalendarDays className="size-4" />Last updated {label}</p>;
}

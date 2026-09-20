import { Gauge } from "lucide-react";
export function QuickVerdict({ text, label = "Editorial call" }: { text: string; label?: string }) { return <aside className="quick-verdict"><Gauge className="size-6 shrink-0" /><div><p className="mb-1 text-xs font-extrabold uppercase">{label}</p><p>{text}</p></div></aside>; }

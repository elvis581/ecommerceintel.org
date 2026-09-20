import type { ResearchStatus as Status } from "@/config/affiliate";

export function ResearchStatus({ status, label }: { status: Status; label?: string }) {
  const labels: Record<Status, string> = {
    "Personally tested": "Personally tested",
    "Used by my team": "Used by my team",
    "Feature research and operator workflow evaluation": "Feature research and operator workflow evaluation",
    "Public information overview": "Public information overview",
    "Comparison-only inclusion": "Comparison-only inclusion",
  };
  return <p className="research-status"><span>Evidence level</span>{label || labels[status]}</p>;
}

import { ExternalLink } from "lucide-react";
import { sourceEvidenceBySlug, sourceKeysBySlug, sources } from "@/config/sources";

export function SourceList({ slug, collapsible = false }: { slug: string; collapsible?: boolean }) {
  const keys = sourceKeysBySlug[slug] || [];
  const evidence = sourceEvidenceBySlug[slug] || [];
  if (!keys.length) return null;

  const content = <>
    <p className="source-list-intro">These records separate public evidence, vendor statements, live checks and editorial interpretation. Dates show when I last checked each source.</p>
    {evidence.length > 0 && <div className="mt-6 grid gap-4">{evidence.map((item) => <article key={item.claim} className="source-evidence-item border-l-4 border-emerald-500 bg-slate-50 p-5">
      <p className="text-xs font-extrabold uppercase text-emerald-700">{item.status}</p>
      <h3 className="mt-2 text-base font-extrabold text-slate-950">{item.claim}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600"><strong>Boundary:</strong> {item.limitation}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600"><strong>Sources:</strong> {item.sourceKeys.map((key, index) => <span key={key}>{index > 0 ? ", " : ""}<a href={sources[key].url} target="_blank" rel="noopener noreferrer">{sources[key].label}</a></span>)}</p>
    </article>)}</div>}
    <details className="source-register">
      <summary>Source register <span>({keys.length} official sources)</span></summary>
      <ul>{keys.map((key) => <li key={key}><a href={sources[key].url} target="_blank" rel="noopener noreferrer">{sources[key].label}<ExternalLink className="size-4" /></a><span className="source-register-meta">{sources[key].publisher} · {sources[key].sourceType} · checked {sources[key].accessed}</span></li>)}</ul>
    </details>
  </>;

  if (collapsible) return <details className="article-section source-list source-list-collapsible"><summary>Evidence and Official Sources</summary>{content}</details>;
  return <section className="article-section source-list"><h2>Evidence and Official Sources</h2>{content}</section>;
}

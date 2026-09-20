export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return <div className="mb-7 max-w-2xl">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="section-title">{title}</h2>{description && <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>}</div>;
}

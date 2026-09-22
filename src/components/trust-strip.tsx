const trustPoints = [
  ["Independent reviews", "Editorial conclusions stay separate from vendor claims and affiliate links."],
  ["Evidence beside claims", "Public sources, estimates and unverified boundaries remain visible."],
  ["Built for operators", "Every page ends with a practical next check outside the dashboard."],
] as const;

export function TrustStrip() {
  return <section className="trust-strip" aria-label="Editorial standards"><div className="site-container trust-strip-grid">{trustPoints.map(([title, text]) => <div key={title}><strong>{title}</strong><span>{text}</span></div>)}</div></section>;
}

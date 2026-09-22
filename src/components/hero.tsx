import { ArrowUpRight } from "lucide-react";
import { DecisionMatrix } from "./decision-matrix";
import { TrackedLink } from "./tracked-link";

export function Hero() {
  return <section className="home-hero">
    <div className="site-container home-hero-grid">
      <div className="home-hero-copy">
        <p className="home-hero-kicker"><span>RESEARCH DESK / 2026</span></p>
        <h1>Choose the right ecommerce research tool.</h1>
        <p className="home-hero-dek">Independent, operator-led reviews for product, ad, store and marketplace research. See what each tool can support, what remains unverified and when it is worth paying for.</p>
        <div className="home-hero-actions">
          <TrackedLink href="/reviews" className="button-primary" eventName="start_here_click" eventParams={{ location: "hero", destination: "reviews" }}>Start with the shortlist <ArrowUpRight className="size-4" /></TrackedLink>
          <TrackedLink href="/methodology" className="home-hero-secondary" eventName="start_here_click" eventParams={{ location: "hero", destination: "methodology" }}>See the methodology</TrackedLink>
        </div>
      </div>
      <DecisionMatrix />
    </div>
  </section>;
}

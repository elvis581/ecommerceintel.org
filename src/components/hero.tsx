import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { TrackedLink } from "./tracked-link";

export function Hero() {
  return <section className="home-hero">
    <div className="site-container home-hero-grid">
      <div className="home-hero-copy">
        <p className="home-hero-kicker"><span>RESEARCH DESK / 2026</span></p>
        <h1>Choose the next research move before you choose a tool.</h1>
        <p className="home-hero-dek">Independent reviews for product, ad, store and marketplace research. Start with the decision, then use the smallest tool stack that leaves a record another operator can check.</p>
        <div className="home-hero-actions">
          <TrackedLink href="/winninghunter-review" className="button-primary" eventName="start_here_click" eventParams={{ location: "hero", destination: "winninghunter_review" }}>Read the lead review <ArrowUpRight className="size-4" /></TrackedLink>
          <TrackedLink href="/compare" className="home-hero-secondary" eventName="start_here_click" eventParams={{ location: "hero", destination: "compare" }}>Compare the shortlist</TrackedLink>
        </div>
        <div className="home-hero-proof">{["Decision before features", "Sources beside claims", "A reason to skip"].map((item) => <span key={item}><CheckCircle2 className="size-4" />{item}</span>)}</div>
      </div>
      <aside className="home-hero-board">
        <div className="home-hero-board-top"><span>01</span><span>Decision queue</span><span>Open</span></div>
        <div className="home-hero-board-rule" />
        <p className="home-hero-board-label">Before subscribing</p>
        <h2>Write the brief that the tool must complete.</h2>
        <ol><li><span>01</span><p>Name the market and known example.</p></li><li><span>02</span><p>Record what the source actually proves.</p></li><li><span>03</span><p>Set the check that remains outside the dashboard.</p></li></ol>
        <TrackedLink href="/methodology" className="home-hero-board-link" eventName="internal_link_click" eventParams={{ placement: "hero_board", label: "Read methodology" }}>Read the method <ArrowUpRight className="size-4" /></TrackedLink>
      </aside>
    </div>
  </section>;
}

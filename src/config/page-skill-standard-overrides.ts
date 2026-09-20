import type { ArticlePage, ContentSection, PageCard } from "./pages";

const buyingGuideCards: Record<string, PageCard[]> = {
  "best-ecommerce-product-research-tools": [
    { title: "Kalodata", label: "TikTok Shop starting point", description: "Marketplace entity research across categories, products, shops, creators and content.", bestFor: "TikTok Shop marketplace research", myTake: "The clearest documented starting point in this shortlist.", limitation: "Market depth and estimated metrics still need live verification.", chooseIf: "Products, shops and creators belong to the same weekly brief.", href: "/kalodata-review", linkLabel: "Read the Kalodata review" },
    { title: "FastMoss", label: "Cross-market trial candidate", description: "A live-account candidate for TikTok Shop products, shops, creators and markets.", bestFor: "Teams comparing several TikTok Shop countries", myTake: "Its value must be proven through known-entity retrieval.", limitation: "Accessible public evidence is limited.", chooseIf: "It retrieves required entities better than Kalodata in your markets.", href: "/fastmoss-review", linkLabel: "Read the FastMoss review" },
    { title: "Shoplus", label: "Content specialist", description: "TikTok video, music, ad and influencer discovery.", bestFor: "Creator and content research", myTake: "Useful for a different job from marketplace sales intelligence.", limitation: "Current commerce modules require live confirmation.", chooseIf: "Content patterns and creator discovery lead the decision.", href: "/kalodata-alternatives", linkLabel: "See where Shoplus fits" },
    { title: "WinningHunter", label: "Shopify and Meta", description: "Connect ads, products, stores and competitors.", bestFor: "Shopify-centered Meta research", myTake: "A focused choice when advertising leads product discovery.", limitation: "Estimated commercial fields do not prove profitability.", chooseIf: "The weekly brief starts with ads and Shopify stores.", href: "/winninghunter-review", linkLabel: "Read the WinningHunter review" },
    { title: "Minea", label: "Cross-channel research", description: "Meta, TikTok, Pinterest, image and store research in one broader system.", bestFor: "Teams using several ad-research modules", myTake: "Breadth is valuable only when the team actually uses it.", limitation: "The wider system can be unnecessary for one narrow job.", chooseIf: "Cross-channel monitoring belongs to the same recurring brief.", href: "/minea-review", linkLabel: "Read the Minea review" },
  ],
  "best-tiktok-shop-tools": [
    { title: "Kalodata", label: "Best documented entity structure", description: "Category, product, shop, creator, video and livestream research.", bestFor: "A marketplace-led TikTok Shop workflow", myTake: "My evidence-backed starting point.", limitation: "Public routes do not prove equal depth in every paid market.", chooseIf: "Known entities and creator relationships are retrieved clearly.", href: "/kalodata-review", linkLabel: "Read the Kalodata review" },
    { title: "FastMoss", label: "Best live coverage challenger", description: "Cross-market TikTok Shop research that must be tested in the account.", bestFor: "Agencies comparing country coverage", myTake: "Let retrieval quality win the subscription.", limitation: "Current depth and exports were not independently confirmed.", chooseIf: "It outperforms Kalodata on your exact markets and entities.", href: "/fastmoss-review", linkLabel: "Read the FastMoss review" },
    { title: "Shoplus", label: "Best content alternative", description: "TikTok videos, music, ads and influencer discovery.", bestFor: "Content and creator teams", myTake: "Treat it as a specialist until commerce depth is demonstrated.", limitation: "It is not a confirmed full marketplace replacement.", chooseIf: "The output is an original content or creator brief.", href: "/kalodata-alternatives", linkLabel: "Compare Shoplus as an alternative" },
    { title: "TikTok Shop Seller Resources", label: "Best official companion", description: "Current platform instructions and seller-account verification.", bestFor: "Policy, account and operating decisions", myTake: "This is the verification layer, not another discovery dashboard.", limitation: "It does not replace external competitor research.", chooseIf: "The decision concerns what the platform permits or what happened in the account.", href: "/platforms#tiktok-shop", linkLabel: "Open the TikTok Shop path" },
  ],
  "best-ecommerce-ad-spy-tools": [
    { title: "WinningHunter", label: "Best Shopify-centered option", description: "Meta ads connected to products, stores and competitors.", bestFor: "Shopify product and advertising research", myTake: "The focused starting point when Meta and store context lead the brief.", limitation: "Visible ads and estimates do not prove profit.", chooseIf: "It improves a recurring known-advertiser assignment.", href: "/winninghunter-review", linkLabel: "Read the WinningHunter review" },
    { title: "Minea", label: "Best cross-channel option", description: "Meta, TikTok, Pinterest, image, supplier and store research.", bestFor: "Broader creative and competitor monitoring", myTake: "Pay for the breadth only when several modules have a weekly owner.", limitation: "Credits and broad scope can add unnecessary cost.", chooseIf: "Pinterest, image or cross-channel research changes the decision.", href: "/minea-review", linkLabel: "Read the Minea review" },
    { title: "Official Ad Libraries", label: "Best free starting point", description: "Primary public campaign records for known advertisers and creatives.", bestFor: "Occasional research and evidence verification", myTake: "Most beginners should start here before buying another feed.", limitation: "Manual history, organization and store connections take more work.", chooseIf: "You do not yet have a recurring research volume that justifies software.", href: "/best-ecommerce-intelligence-tools", linkLabel: "Use the free research path" },
  ],
};

const commonNonReviewFlags = {
  hideQuickVerdict: true,
  hideProsCons: true,
  hideDecisionSnapshot: true,
  hideMyView: true,
  hideOperatorView: true,
  hideWorkflow: true,
} as const;

const startHereSections: ContentSection[] = [
  { heading: "Choose the Decision Blocking You", paragraphs: ["Start with the question, not a software category. Choose product research when you need a shortlist, competitor research when you need market context, advertising research when you need creative evidence, or a platform path when the decision belongs inside TikTok Shop, Amazon or Shopify."] },
  { heading: "Find and Validate a Product", paragraphs: ["Use the TikTok Shop workflow when products, shops, creators and content drive the decision. Use the product-research buying guide when you need to compare marketplace-led and advertising-led tools before building a shortlist."] },
  { heading: "Compare Tools Before Paying", paragraphs: ["Read one product review, then open a comparison or alternatives page only after the shortlist is narrow. Use known products, shops, creators or advertisers during the trial so a polished discovery result does not decide the subscription."] },
  { heading: "Use the Platform as the Verification Layer", paragraphs: ["Return to Seller Center, Amazon Seller Central or Shopify records for account, order, advertising, policy and settlement decisions. External intelligence should make the next check clearer, not replace first-party evidence."] },
];

function insertBefore(sections: ContentSection[], targetHeading: string, additions: ContentSection[]) {
  const index = sections.findIndex((section) => section.heading === targetHeading);
  if (index < 0) return [...sections, ...additions];
  return [...sections.slice(0, index), ...additions, ...sections.slice(index)];
}

function orderSections(sections: ContentSection[], headings: string[]) {
  const byHeading = new Map(sections.map((section) => [section.heading, section]));
  return headings.map((heading) => byHeading.get(heading)).filter((section): section is ContentSection => Boolean(section));
}

export function applyPageSkillStandards(page: ArticlePage): ArticlePage {
  if (page.slug === "start-here") {
    return {
      ...page,
      title: "Start Here: Choose Your Ecommerce Research Path",
      h1: "Start Here",
      description: "Choose the right EcommerceIntel review, comparison, buying guide or workflow for your current ecommerce decision.",
      intro: "I use this page to route you from the decision currently blocking the business to the shortest useful review, comparison, buying guide or workflow. You should not need to browse every tool first.",
      verdict: "Begin with platform-native evidence and one focused path. Add software only when it answers a recurring question and produces an output another operator can review.",
      sections: startHereSections,
      hideProsCons: true,
      hideDecisionSnapshot: true,
      hideMyView: true,
      hideWorkflow: true,
      hideNewsletter: true,
      hideOperatorView: true,
      hideQuickVerdict: true,
      hideFaq: true,
      hideSourceList: true,
      hideComparisonTable: true,
      hideFinalCta: true,
      cardsHeading: "Choose the Decision You Need to Make",
    };
  }

  if (page.slug === "kalodata-vs-fastmoss") {
    return {
      ...page,
      ...commonNonReviewFlags,
      title: "Kalodata vs FastMoss 2026: Which One Should You Choose?",
      h1: "Kalodata vs FastMoss 2026",
      description: "Compare Kalodata and FastMoss for TikTok Shop products, shops, creators, videos, markets, evidence quality, pricing fit and trial decisions.",
      reviewBasisLabel: "Comparative feature evaluation; live account testing required",
      sections: [
        { heading: "30-Second Verdict", paragraphs: [page.verdict] },
        { heading: "My Current Pick", paragraphs: ["Kalodata is the evidence-backed starting point because its public marketplace entity structure is clearer. FastMoss is the coverage challenger: I would choose it only when a live account retrieves the required products, shops, creators and history more reliably in the target markets."] },
        { heading: "Run the Same Task Before You Choose", paragraphs: ["I would test both tools with one known strong product, one weak product, an established shop, several creators and recent content in every required country. I would keep the market, date window and research questions identical, then record missing entities, visible history, estimate labels, navigation and export quality.", "The result should explain why the tools disagree. A difference may come from coverage, query behavior, entity matching or plan access. I would not pay for both unless each product answers a separate recurring question that the other cannot complete.", "Run part of the assignment again on a second date. Recency and stable retrieval matter because a tool that returns one polished result today may still be unreliable for monitoring. The final record should name the preferred product, the task it owns, the evidence it still cannot supply and the condition that would trigger a new comparison at renewal."] },
        { heading: "Choose Neither If", paragraphs: ["Choose neither when the main job is Meta advertising, Shopify store research, Amazon operations or occasional product inspiration. Platform-native records and a disciplined spreadsheet can also be enough when TikTok Shop intelligence is not a recurring weekly task. The right outcome can be postponing the subscription until the team has enough repeated research volume to evaluate it fairly."] },
        ...page.sections,
      ],
      hideNewsletter: true,
    };
  }

  if (page.slug === "kalodata-alternatives") {
    const classification: ContentSection = {
      heading: "Alternative Types at a Glance",
      bullets: [
        "Direct replacement: FastMoss for a live TikTok Shop marketplace-intelligence trial",
        "Specialist alternative: Shoplus for TikTok videos, music, ads and influencer discovery",
        "Different-workflow alternative: WinningHunter or Minea for Meta ads and Shopify stores",
        "Official verification companion: TikTok Shop seller resources and account records",
        "Keep Kalodata: when its documented entity workflow already fits the required markets",
      ],
    };
    return {
      ...page,
      ...commonNonReviewFlags,
      title: "Best Kalodata Alternatives in 2026",
      h1: "Best Kalodata Alternatives in 2026",
      description: "Compare FastMoss, Shoplus and different-workflow Kalodata alternatives by switching reason, market fit, evidence and migration cost.",
      cardsHeading: "Ranked Kalodata Alternatives by Switching Reason",
      cards: [
        { title: "1. FastMoss", label: "Best direct replacement", description: "The closest marketplace-intelligence trial candidate.", bestFor: "Products, shops, creators and market coverage", myTake: "It should replace Kalodata only after a live known-entity test.", limitation: "Current public evidence is restricted.", chooseIf: "Retrieval, history or exports are materially better in your markets.", href: "/fastmoss-review", linkLabel: "Review FastMoss" },
        { title: "2. Shoplus", label: "Best specialist alternative", description: "A content and influencer research option.", bestFor: "Videos, music, ads and creators", myTake: "This solves a different job from full marketplace intelligence.", limitation: "Commerce depth requires live verification.", chooseIf: "Content discovery is the reason you are switching.", href: "/best-ecommerce-intelligence-tools", linkLabel: "Compare TikTok Shop tools" },
        { title: "3. WinningHunter", label: "Best Shopify and Meta alternative", description: "A different-workflow option for ads, products and stores.", bestFor: "Shopify-centered Meta research", myTake: "Use another category when TikTok Shop entities are not the real job.", limitation: "It is not a Kalodata marketplace replacement.", chooseIf: "Advertising and store context lead the brief.", href: "/winninghunter-review", linkLabel: "Read the WinningHunter review" },
        { title: "4. Minea", label: "Best cross-channel alternative", description: "A broader ad, product, image and store research system.", bestFor: "Meta, TikTok and Pinterest research", myTake: "The breadth must justify the added workflow and cost.", limitation: "It can be excessive for one TikTok Shop task.", chooseIf: "Cross-channel monitoring is a recurring requirement.", href: "/minea-review", linkLabel: "Read the Minea review" },
        { title: "5. TikTok Shop Seller Resources", label: "Best official companion", description: "Use platform-native resources for policy, account and operating records.", bestFor: "Verification rather than discovery", myTake: "This is the source of truth for platform questions.", limitation: "It does not provide external competitor intelligence.", chooseIf: "The missing answer belongs to the platform account.", href: "/platforms#tiktok-shop", linkLabel: "Open the official-source path" },
        { title: "6. Keep Kalodata", label: "Best when the workflow already works", description: "Do not switch merely for a different interface.", bestFor: "Teams with a working entity and export process", myTake: "Migration needs a measurable operational gain.", limitation: "Existing market or plan gaps may remain.", chooseIf: "No alternative reduces verification work or improves decisions.", href: "/kalodata-review", linkLabel: "Recheck the Kalodata verdict" },
      ],
      sections: [classification, { heading: "My Switching Rule", paragraphs: ["I would start with the exact Kalodata gap, test the closest candidate against known entities and keep the current tool unless the replacement produces a clearer decision or meaningfully less verification work. I would not switch for a different interface alone.", "My next action would be a time-boxed FastMoss trial for a marketplace gap or a Shoplus trial for a content-led gap. I would compare the exported evidence and migration cost before cancelling the existing workflow."] }, ...page.sections.filter((section) => section.heading !== "Quick Recommendation")],
      hideComparisonTable: true,
      reviewBasisLabel: "Comparative public feature evaluation",
      hideNewsletter: true,
    };
  }

  const buyingCards = buyingGuideCards[page.slug];
  if (buyingCards) {
    const category = page.h1.replace(/^Best\s+/i, "");
    return {
      ...page,
      ...commonNonReviewFlags,
      title: `Best ${category} in 2026`,
      h1: `Best ${category} in 2026`,
      cardsHeading: "Quick Ranking by Use Case",
      cards: buyingCards,
      sections: [{ heading: "When You Do Not Need a Paid Tool", paragraphs: page.slug === "best-ecommerce-ad-spy-tools" ? ["Start with official Meta, TikTok and Pinterest ad libraries when the job is occasional verification or a small known-advertiser check. I would pay for an ad-intelligence platform only when history, filtering, saved monitoring and store connections improve a recurring weekly brief.", "Do not buy software to copy a visible creative. The paid tool should help identify a repeated pattern and preserve evidence for an original test; it cannot establish a competitor's profit or give permission to reuse protected work."] : page.slug === "best-tiktok-shop-tools" ? ["Begin with TikTok Shop seller resources, the seller account and a dated spreadsheet when product research is occasional. I would add a paid intelligence tool only when the team repeatedly needs external product, shop, creator, video or livestream relationships across defined markets.", "Do not subscribe because a global GMV headline looks large. The purchase should depend on known-entity retrieval, useful history, exportable evidence and a specific decision that platform-native records cannot answer alone."] : ["Use platform-native marketplace records, manual competitor checks and a dated product-research sheet when the team evaluates only a few candidates each month. I would pay when repeated filtering, history and connected entities materially reduce the work required to reject weak ideas.", "Do not buy a research platform when contribution margin, supplier reliability, product documents or fulfillment are the actual bottleneck. Those questions require operating evidence, not a larger candidate feed."] }, ...page.sections],
      hideNewsletter: true,
    };
  }

  if (page.slug === "how-to-research-products-for-tiktok-shop") {
    const decisionHierarchy: ContentSection[] = [
      { heading: "Hard Rejection Rules", bullets: ["The product creates unacceptable policy or regulatory risk", "Expected contribution margin falls below the required floor", "Supplier consistency, documents or lead time cannot be confirmed", "Fulfillment, return or product-claim exposure is unacceptable", "The proposed test cannot be limited with clear stop conditions"] },
      { heading: "Caution Signals", bullets: ["Demand depends on one creator, shop or viral event", "The category is seasonal or the observation window is short", "Competitors use nearly identical offers and creatives", "The product requires heavy paid advertising or livestream operations", "Differentiation and customer proof remain weak"] },
      { heading: "Positive Signals", bullets: ["Demand persists across several shops, creators or content formats", "The landed margin supports platform, creator, advertising and return costs", "The product can be demonstrated through several truthful angles", "Supply, fulfillment and documentation are stable", "The offer has a clear reason to exist beyond copying a ranking"] },
    ];
    return {
      ...page,
      ...commonNonReviewFlags,
      title: "How to Research Products for TikTok Shop: A Practical Workflow",
      hideComparisonTable: true,
      hideFinalCta: true,
      sections: orderSections([
        { heading: "Final Decision", bullets: ["Proceed: the product clears every hard rule and the small test has defined success and stop conditions", "Monitor: the opportunity is interesting but one or more evidence gaps need a dated follow-up", "Reject: policy, margin, supply, fulfillment or test-control risk is unacceptable"] },
        { heading: "Inputs Required", bullets: ["Target market and category", "Price range and contribution-margin floor", "Shipping, return and fulfillment limits", "Creator commission and advertising assumptions", "Test budget and maximum test quantity", "Product-documentation and compliance constraints", "Named owner and decision deadline"] },
        { heading: "Workflow Overview", paragraphs: ["The output is a dated product research brief, not a list of high-GMV screenshots. Move from market definition into demand, concentration, content, economics, supply and compliance, then finish with proceed, monitor or reject and a controlled validation plan."] },
        ...insertBefore(page.sections, "Build a Shortlist", decisionHierarchy),
        { heading: "Representative Example: Artificial Flowers", paragraphs: ["This is a representative decision record, not a claim that a specific tool produced a verified commercial result. I would define the target occasion and price band, then compare whether demand is distributed across several shops and creators or concentrated around one seasonal campaign.", "The candidate would move forward only if packaging, dimensional weight, breakage risk, visual accuracy, landed margin and creator demonstration all remain workable. I would reject it when shipping economics erase the margin, product images overstate the real appearance or demand depends on a single short-lived event."] },
        { heading: "TikTok Shop Product Research Brief Template", bullets: ["Decision, owner and deadline", "Market, category, customer and price band", "Demand evidence with source and date window", "Shop, creator, video and livestream concentration", "Offer, margin, commission, return and advertising assumptions", "Supplier, documentation, packaging and fulfillment evidence", "Hard rejection, caution and positive signals", "Proceed, monitor or reject with the next action", "Small-test quantity, budget, success metric and stop condition", "Post-test conversion, margin, returns, creator response and operating notes"] },
      ], ["Final Decision", "Inputs Required", "Workflow Overview", "What Makes a Product Worth Researching?", "Define the Target Market", "Review Category Demand", "Check Recent GMV Growth", "Study Creator Participation", "Review Video and Live Activity", "Analyze Competitor Pricing", "Check Advertising Activity", "Evaluate Reviews and Complaints", "Estimate Supply and Fulfillment Risk", "Compare Virality with Sustainable Demand", "Hard Rejection Rules", "Caution Signals", "Positive Signals", "Create a Product Research Scorecard", "Build a Shortlist", "Run a Small Validation Test", "Representative Example: Artificial Flowers", "TikTok Shop Product Research Brief Template", "Document the Validation Decision", "Keep a Research Log", "Common Mistakes", "Final Operator Checklist", "Recommended Research Tools"]),
      hideNewsletter: true,
    };
  }

  if (page.slug === "tools") {
    return {
      ...page,
      ...commonNonReviewFlags,
      cardsHeading: "Browse Tools by Research Job",
      cards: [
        { title: "Kalodata", label: "TikTok Shop intelligence", description: "Products, shops, creators, videos and livestreams.", bestFor: "Marketplace entity research", myTake: "The clearest documented TikTok Shop starting point.", limitation: "Estimated data and market depth need verification.", chooseIf: "Products, shops and creators belong to the same weekly brief.", href: "/kalodata-review", linkLabel: "Read the Kalodata review" },
        { title: "FastMoss", label: "TikTok Shop intelligence", description: "A cross-market product, shop and creator research candidate.", bestFor: "Known-entity market testing", myTake: "A legitimate coverage challenger that must prove itself in a live account.", limitation: "Public access did not confirm current depth.", chooseIf: "It retrieves known entities more reliably in your target markets.", href: "/fastmoss-review", linkLabel: "Read the FastMoss review" },
        { title: "Shoplus", label: "TikTok content intelligence", description: "Videos, music, ads and influencer discovery.", bestFor: "Content and creator briefs", myTake: "A specialist content option rather than a confirmed marketplace replacement.", limitation: "Commerce modules require live confirmation.", chooseIf: "Video, music and creator discovery are the real output.", href: "/kalodata-alternatives", linkLabel: "See where Shoplus fits" },
        { title: "WinningHunter", label: "Ad intelligence", description: "Trace Meta advertising activity into Shopify products, stores and competitor offers.", bestFor: "Shopify-centered product research", myTake: "The focused option when Meta and store context lead the brief.", limitation: "Commercial metrics may be estimates.", chooseIf: "Ads need to connect to products, stores and competitors.", href: "/winninghunter-review", linkLabel: "Read the WinningHunter review" },
        { title: "Minea", label: "Ad intelligence", description: "Meta, TikTok, Pinterest, image and store research.", bestFor: "Cross-channel monitoring", myTake: "Its breadth matters only when several modules have a weekly owner.", limitation: "The broader system may be unnecessary for one channel.", chooseIf: "Pinterest, image or cross-channel research changes the decision.", href: "/minea-review", linkLabel: "Read the Minea review" },
        { title: "Official Ad Libraries", label: "Free verification", description: "Check public campaign records before paying for a discovery feed.", bestFor: "Known-advertiser verification", myTake: "The right starting point before recurring volume justifies paid software.", limitation: "Manual research takes more organization.", chooseIf: "You need public campaign evidence rather than continuous monitoring.", href: "/best-ecommerce-intelligence-tools", linkLabel: "Open the research resources" },
        { title: "Platform Verification", label: "Official systems", description: "TikTok Shop, Amazon and Shopify records remain the source of truth.", bestFor: "Policies, accounts, orders and settlements", myTake: "Use these systems to verify what the platform permits and what happened in the account.", limitation: "Official systems do not replace external competitor research.", chooseIf: "The question concerns policy, account data or operating records.", href: "/platforms", linkLabel: "Browse platform paths" },
      ],
      sections: [
        { heading: "TikTok Shop Intelligence", paragraphs: ["Use Kalodata or FastMoss when the recurring job connects products to shops, creators and content. Use Shoplus when videos, music, ads and influencers are the real output. I would not assign all three the same role or pay for overlapping feeds without a separate owner and decision.", "Start with known products, shops and creators in every required country. The useful tool is the one that retrieves the entities, dates and relationships needed for a reviewable shortlist."] },
        { heading: "Ad Intelligence", paragraphs: ["WinningHunter is the more focused shortlist for Shopify-centered Meta research. Minea belongs in the comparison when Pinterest, reverse-image discovery or broader cross-channel monitoring changes the weekly brief. Official ad libraries remain the free verification layer.", "Active ads, estimated spend and visible stores do not establish profit. The output should be an original product or creative brief with source links, not a copied campaign."] },
        { heading: "Platform Verification", paragraphs: ["TikTok Shop Seller Center, Amazon Seller Central and Shopify account records own the operating truth: policies, orders, settlements, advertising cost and account status. Third-party tools help investigate external patterns but cannot replace those records.", "I would postpone another subscription when the business still lacks a named research question, a repeatable output or enough weekly volume to justify filtering, history, exports and monitoring."] },
        { heading: "How to Use This Directory", paragraphs: ["Choose one row from the directory and open the relevant review or buying guide. Write the market, known entities, date window and output before visiting a vendor. That preparation makes it easier to detect missing records and prevents a polished demo from changing the assignment.", "For a TikTok Shop brief, test products, shops and creators. For an ad brief, test known advertisers, creatives and stores. For a platform question, go directly to the seller account or official resource. I would not compare dashboard feature counts across jobs that require different evidence."] },
        { heading: "What the Content Labels Mean", paragraphs: ["Full review available means EcommerceIntel has a dedicated operator review with a stated evidence level. Comparison available means the product is included to clarify a choice. Public information overview signals narrower confidence because accessible evidence is limited. Official resource identifies a platform-owned verification path.", "These labels describe coverage on EcommerceIntel, not vendor quality. A full review can still recommend skipping the product, while a public overview can still identify a useful trial question without pretending that the current account experience was verified.", "When a category has no complete review path yet, I keep it out of the main directory rather than create a thin listing. That is why this launch directory is concentrated around TikTok Shop, advertising intelligence and the official platform systems needed to verify those research outputs."] },
      ],
      hideFaq: true,
      hideSourceList: true,
      hideComparisonTable: true,
      hideFinalCta: true,
      hideNewsletter: true,
    };
  }

  if (page.slug === "platforms") {
    return {
      ...page,
      ...commonNonReviewFlags,
      cardsHeading: "Choose the Platform Where the Decision Happens",
      cards: [
        { title: "TikTok Shop", label: "Marketplace, creators and content", description: "Connect product demand to shops, creators, videos and livestreams.", bestFor: "Creator-led marketplace research", myTake: "Use external tools for discovery and Seller Center for operating truth.", limitation: "Third-party GMV is not settlement data.", chooseIf: "The decision begins with TikTok Shop products or distribution.", href: "/best-ecommerce-intelligence-tools", linkLabel: "Compare TikTok Shop tools" },
        { title: "Amazon", label: "Listings, advertising and inventory", description: "Keep category, keyword, review, listing and inventory questions close to Seller Central.", bestFor: "Marketplace listing and operations decisions", myTake: "Amazon-native records should own the final answer.", limitation: "The current site does not yet publish a full Amazon tool cluster.", chooseIf: "The decision concerns an Amazon listing, ad or inventory workflow.", href: "/platforms#amazon", linkLabel: "Read the Amazon workflow" },
        { title: "Shopify", label: "Store, marketing and automation", description: "Connect products, offers, creatives, retention and store economics.", bestFor: "Owned-store research and growth workflows", myTake: "Evaluate the whole funnel, not a competitor revenue estimate.", limitation: "The current site does not yet publish a full Shopify platform hub.", chooseIf: "The decision begins with a store, offer or advertising workflow.", href: "/platforms#shopify", linkLabel: "Read the Shopify workflow" },
      ],
      sections: [
        ...page.sections.filter((section) => ["TikTok Shop: Marketplace, Creators and Content", "Amazon: Listings, Advertising and Inventory", "Shopify: Store, Marketing and Automation"].includes(section.heading)),
        { heading: "Use the Right Source of Truth", paragraphs: ["Platform accounts own orders, settlements, advertising cost and account status. Supplier records own lead time and product evidence. Finance records own contribution margin. Research tools own only the external observations and estimates they expose.", "A clean handoff moves from research shortlist to platform check, margin and supplier review, approved content, controlled test and then actual results. I would remove a tool when its role in that handoff cannot be explained."] },
        { heading: "What EcommerceIntel Covers Today", paragraphs: ["TikTok Shop currently has the deepest content path: a buying guide, Kalodata and FastMoss reviews, a head-to-head comparison, Kalodata alternatives and a product-research workflow. Shopify is covered through WinningHunter, Minea and the ad-intelligence guide. Amazon remains a platform workflow entry rather than a complete software cluster.", "I would rather show that coverage boundary than send a reader to a thin platform page. Amazon and Shopify can receive dedicated hubs after the site has enough sourced reviews, workflows and official references to support a real decision path."] },
        { heading: "Cross-Platform Handoffs", bullets: ["Research shortlist to margin and supplier review", "Platform policy check before listing or launch", "Approved product facts to original content brief", "Advertising evidence to a controlled creative test", "Actual orders, returns and support issues back into the research record"] },
      ],
      hideFaq: true,
      hideSourceList: true,
      hideComparisonTable: true,
      hideFinalCta: true,
      hideNewsletter: true,
    };
  }

  if (page.slug === "resources") {
    return {
      ...page,
      ...commonNonReviewFlags,
      cardsHeading: "Choose the Record or Checklist You Need",
      hideComparisonTable: true,
      hideFinalCta: true,
      hideNewsletter: true,
    };
  }

  if (page.kind === "review") {
    return { ...page, hideComparisonTable: true, hideNewsletter: true };
  }

  if (page.kind === "hub") {
    return {
      ...page,
      ...commonNonReviewFlags,
      hideFaq: page.slug !== "resources" || page.hideFaq,
      hideSourceList: page.slug !== "resources",
      hideComparisonTable: true,
      hideFinalCta: true,
      cardsHeading: page.cardsHeading || "Choose Your Next Path",
      hideNewsletter: true,
    };
  }

  if (page.slug === "about") {
    return {
      ...page,
      ...commonNonReviewFlags,
      hideComparisonTable: true,
      hideFinalCta: true,
      hideSourceList: true,
      hideNewsletter: true,
    };
  }

  if (page.slug === "privacy") {
    return {
      ...page,
      description: "Read how EcommerceIntel handles analytics, outbound links and information submitted through the current site.",
      intro: "This policy explains the current data behavior of EcommerceIntel. The site does not currently display or operate an email signup form.",
      verdict: "EcommerceIntel does not currently collect newsletter email addresses. External destinations and any configured analytics services operate under their own disclosed policies.",
      sections: [
        { heading: "Information You Provide", paragraphs: ["The current public site does not include an active newsletter or email-submission form. Do not send sensitive personal or commercial information through external product links unless you have reviewed the destination's privacy terms."] },
        { heading: "Analytics", paragraphs: ["The site uses a provider-neutral event layer for interaction measurement. When an analytics provider is configured, its collection and consent requirements must match this policy and the applicable visitor context."] },
        { heading: "External Links", paragraphs: ["EcommerceIntel links to official product and platform websites. Those destinations control their own cookies, accounts and privacy practices. Review the destination policy before submitting information."] },
        { heading: "Policy Updates", paragraphs: ["This page will be updated when forms, analytics or other data-processing systems materially change. The last-updated date records the current review date."] },
      ],
      hideNewsletter: true,
    };
  }

  return { ...page, hideNewsletter: true };
}

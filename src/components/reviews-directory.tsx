"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowUpRight, BarChart3, DollarSign, GitCompareArrows, Globe2, Layers3, RefreshCw, Target } from "lucide-react";
import { reviewsDirectoryItems, type ReviewsDirectoryItem, type ReviewsDirectoryType } from "@/config/reviews-directory";
import { TrackedLink } from "./tracked-link";

const filters: { label: string; value: "all" | ReviewsDirectoryType }[] = [
  { label: "All", value: "all" },
  { label: "Reviews", value: "reviews" },
  { label: "Comparisons", value: "comparisons" },
  { label: "Alternatives", value: "alternatives" },
  { label: "Pricing", value: "pricing" },
];
const workflowFilters = [
  { label: "All workflows", value: "all" },
  { label: "Product research", value: "product" },
  { label: "Ad intelligence", value: "ad" },
  { label: "Shopify", value: "shopify" },
  { label: "TikTok Shop", value: "tiktok" },
  { label: "Store tracking", value: "store" },
] as const;

const sectionLabels: Record<ReviewsDirectoryType, string> = {
  reviews: "Reviews",
  comparisons: "Comparisons",
  alternatives: "Alternatives",
  pricing: "Pricing",
};

const reviewIcons = {
  "Kalodata Review": BarChart3,
  "FastMoss Review": Globe2,
  "WinningHunter Review": Target,
  "Minea Review": Layers3,
  "Kalodata vs FastMoss": GitCompareArrows,
  "Kalodata Alternatives": RefreshCw,
  "WinningHunter Pricing": DollarSign,
};

export function ReviewsDirectory() {
  const [activeFilter, setActiveFilter] = useState<"all" | ReviewsDirectoryType>("all");
  const [activeWorkflow, setActiveWorkflow] = useState<(typeof workflowFilters)[number]["value"]>("all");
  const visibleSections = (Object.keys(sectionLabels) as ReviewsDirectoryType[]).filter((type) => activeFilter === "all" || activeFilter === type);
  const selectFilter = (event: KeyboardEvent<HTMLButtonElement>, value: "all" | ReviewsDirectoryType) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setActiveFilter(value);
  };

  const matchesWorkflow = (item: ReviewsDirectoryItem) => {
    if (activeWorkflow === "all") return true;
    const searchText = `${item.title} ${item.bestFor} ${item.platform}`.toLowerCase();
    const terms: Record<Exclude<typeof activeWorkflow, "all">, string[]> = {
      product: ["product", "research"],
      ad: ["ad", "advertising", "creative", "paid-social"],
      shopify: ["shopify", "store"],
      tiktok: ["tiktok"],
      store: ["store", "shopify"],
    };
    return terms[activeWorkflow].some((term) => searchText.includes(term));
  };

  return <>
    <div className="reviews-filters" aria-label="Filter review pages">
      {filters.map((filter) => <button key={filter.value} type="button" aria-pressed={activeFilter === filter.value} onClick={() => setActiveFilter(filter.value)} onKeyDown={(event) => selectFilter(event, filter.value)}>{filter.label}</button>)}
    </div>
    <div className="reviews-filters reviews-workflow-filters" aria-label="Filter by research workflow">
      <span className="reviews-filter-label">Workflow</span>
      {workflowFilters.map((filter) => <button key={filter.value} type="button" aria-pressed={activeWorkflow === filter.value} onClick={() => setActiveWorkflow(filter.value)}>{filter.label}</button>)}
    </div>
    <div aria-live="polite">
      {visibleSections.map((type) => {
        const items = reviewsDirectoryItems.filter((item) => item.type === type && matchesWorkflow(item)).sort((left, right) => Number(Boolean(right.featured)) - Number(Boolean(left.featured)));
        if (!items.length) return null;
        return <section className="reviews-directory-section" key={type}>
          <h2>{sectionLabels[type]}</h2>
          <div className={`reviews-card-grid ${type !== "reviews" ? "reviews-card-grid-small" : ""}`}>
            {items.map((item) => <ReviewDirectoryCard item={item} typeLabel={item.type === "reviews" ? "Review" : item.type === "comparisons" ? "Comparison" : item.type === "alternatives" ? "Alternative" : "Pricing"} key={item.href} />)}
          </div>
        </section>;
      })}
    </div>
  </>;
}

function ReviewDirectoryCard({ item, typeLabel }: { item: ReviewsDirectoryItem; typeLabel: string }) {
  const Icon = reviewIcons[item.title as keyof typeof reviewIcons] || BarChart3;
  return <TrackedLink href={item.href} eventName="internal_link_click" eventParams={{ placement: "reviews_directory", label: item.title }} className={`reviews-media-card ${item.featured ? "reviews-media-card-featured" : ""}`}>
    <div className={`reviews-card-cover reviews-card-cover-${item.coverTone}`} aria-hidden="true">
      <Icon className="reviews-card-cover-icon" />
      <span className="reviews-card-monogram">{item.coverMark}</span>
      <span className="reviews-card-cover-line reviews-card-cover-line-one" />
      <span className="reviews-card-cover-line reviews-card-cover-line-two" />
    </div>
    <div className="reviews-media-card-body">
      <div className="reviews-card-meta"><span>{typeLabel}</span><span>{item.evidence}</span></div>
      <h3>{item.title}</h3>
      <p className="reviews-card-summary">{item.conclusion}</p>
      <dl className="reviews-card-facts"><div><dt>Best for</dt><dd>{item.bestFor}</dd></div><div><dt>From</dt><dd>{item.price || "Check current plans"}</dd></div><div><dt>Updated</dt><dd>{item.updated || "Current file"}</dd></div></dl>
      <div className="reviews-card-bottom"><p><strong>Useful when:</strong> {item.bestFor}</p><ArrowUpRight className="size-5" aria-hidden="true" /></div>
    </div>
  </TrackedLink>;
}

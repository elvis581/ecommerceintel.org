"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { toolDirectoryItems, type ToolDirectoryCategory } from "@/config/tool-directory";
import { TrackedLink } from "./tracked-link";

const filters: { label: string; value: "all" | ToolDirectoryCategory }[] = [
  { label: "All tools", value: "all" },
  { label: "TikTok Shop", value: "tiktok-shop" },
  { label: "Ad intelligence", value: "ad-intelligence" },
  { label: "Shopify", value: "shopify" },
];

export function ToolDirectory() {
  const [activeFilter, setActiveFilter] = useState<"all" | ToolDirectoryCategory>("all");
  const visibleItems = toolDirectoryItems.filter((item) => activeFilter === "all" || item.category === activeFilter);
  const selectFilter = (event: KeyboardEvent<HTMLButtonElement>, value: "all" | ToolDirectoryCategory) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setActiveFilter(value);
  };
  return <>
    <div className="reviews-filters" aria-label="Filter ecommerce tools">{filters.map((filter) => <button key={filter.value} type="button" aria-pressed={activeFilter === filter.value} onClick={() => setActiveFilter(filter.value)} onKeyDown={(event) => selectFilter(event, filter.value)}>{filter.label}</button>)}</div>
    <div className="article-table tool-directory-table" tabIndex={0} aria-label="Ecommerce tool directory"><table><thead><tr><th scope="col">Tool</th><th scope="col">Category</th><th scope="col">Useful when</th><th scope="col">Starting price</th><th scope="col">Evidence level</th><th scope="col">Assessment</th><th scope="col">Review</th></tr></thead><tbody>{visibleItems.map((item) => <tr key={item.name}><th scope="row">{item.name}</th><td>{item.categoryLabel}</td><td>{item.bestFor}</td><td>{item.startingPrice}</td><td>{item.evidence}</td><td>{item.assessment}</td><td><TrackedLink href={item.reviewHref} eventName="internal_link_click" eventParams={{placement:"tool_directory",label:item.name}}>Read<ArrowRight className="size-4" aria-hidden="true" /></TrackedLink></td></tr>)}</tbody></table></div>
    <p className="tool-directory-count" aria-live="polite">Showing {visibleItems.length} of {toolDirectoryItems.length} reviewed tools.</p>
  </>;
}

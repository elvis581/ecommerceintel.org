"use client";

import type { ContentSection } from "@/config/pages";
import { getSectionIds } from "@/lib/section-ids";
import { useEffect, useState } from "react";

export function TableOfContents({ sections, className = "" }: { sections: ContentSection[]; className?: string }) {
  const ids = getSectionIds(sections);
  const idKey = ids.join("|");
  const [activeId, setActiveId] = useState(ids[0] || "");

  useEffect(() => {
    const currentIds = idKey ? idKey.split("|") : [];
    if (!currentIds.length) return;
    const headings = currentIds.map((id) => document.getElementById(id)).filter((heading): heading is HTMLElement => Boolean(heading));
    if (!headings.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]?.target.id) setActiveId(visible[0].target.id);
    }, { rootMargin: "-104px 0px -62% 0px", threshold: [0, 1] });
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [idKey]);

  if (!ids.length) return null;

  return (
    <details className={`toc ${className}`.trim()} open>
      <summary>On this page</summary>
      <nav aria-label="Table of contents">
        <ol>
          {sections.map((section, index) => (
            <li key={ids[index]}>
              <a href={`#${ids[index]}`} aria-current={activeId === ids[index] ? "location" : undefined}>{section.heading}</a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}

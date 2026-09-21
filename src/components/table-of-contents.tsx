import type { ContentSection } from "@/config/pages";
import { getSectionIds } from "@/lib/section-ids";

export function TableOfContents({ sections, className = "" }: { sections: ContentSection[]; className?: string }) {
  const ids = getSectionIds(sections);
  if (!ids.length) return null;

  return (
    <details className={`toc ${className}`.trim()} open>
      <summary>On this page</summary>
      <nav aria-label="Table of contents">
        <ol>
          {sections.map((section, index) => (
            <li key={ids[index]}>
              <a href={`#${ids[index]}`}>{section.heading}</a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}

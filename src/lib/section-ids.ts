import type { ContentSection } from "@/config/pages";

function slugifyHeading(heading: string) {
  const slug = heading
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-");
  return slug || "section";
}

export function getSectionIds(sections: ContentSection[]) {
  const used = new Set<string>();
  return sections.map((section) => {
    const base = section.id || slugifyHeading(section.heading);
    let id = base;
    let suffix = 2;
    while (used.has(id)) id = `${base}-${suffix++}`;
    used.add(id);
    return id;
  });
}

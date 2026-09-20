import seoTargets from "../../seo-targets.json";
import { sourceKeysBySlug, sources } from "./sources";

type SeoTarget = (typeof seoTargets)[number];

export type GeoContext = {
  primaryTopic: string;
  relatedTopics: string[];
  intent: string;
  targetReader: string;
  citations: string[];
};

export function getGeoContext(slug: string): GeoContext {
  const route = slug ? `/${slug}` : "/";
  const target = seoTargets.find((item) => item.route === route) as SeoTarget | undefined;
  const sourceKeys = slug ? sourceKeysBySlug[slug] || [] : [];
  return {
    primaryTopic: target?.primaryKeyword || "AI tools for ecommerce",
    relatedTopics: target?.secondaryKeywords || [],
    intent: target?.intent || "commercial investigation",
    targetReader: target?.targetReader || "ecommerce sellers and operators",
    citations: sourceKeys.map((key) => sources[key].url),
  };
}

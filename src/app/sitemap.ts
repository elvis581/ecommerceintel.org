import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { articlePages } from "@/config/pages";
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastUpdatedIso);
  return [
    { url: siteConfig.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/reviews`, lastModified, changeFrequency: "weekly", priority: .9 },
    { url: `${siteConfig.url}/resources`, lastModified, changeFrequency: "monthly", priority: .6 },
    ...articlePages.map((page) => ({ url: `${siteConfig.url}/${page.slug}`, lastModified, changeFrequency: "monthly" as const, priority: page.informational ? .5 : .8 })),
  ];
}

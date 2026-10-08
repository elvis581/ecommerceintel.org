import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { articlePages } from "@/config/pages";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, lastModified: new Date(siteConfig.homeModifiedIso), changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/reviews`, lastModified: new Date(siteConfig.reviewsModifiedIso), changeFrequency: "weekly", priority: .9 },
    { url: `${siteConfig.url}/resources`, lastModified: new Date(siteConfig.lastUpdatedIso), changeFrequency: "monthly", priority: .6 },
    ...articlePages.map((page) => ({ url: `${siteConfig.url}/${page.slug}`, lastModified: new Date(page.modifiedIso || siteConfig.lastUpdatedIso), changeFrequency: "monthly" as const, priority: page.informational ? .5 : .8 })),
  ];
}

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function createMetadata(title: string, description: string, path = "/", type: "website" | "article" = "website"): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: path },
    openGraph: { title, description, url, siteName: siteConfig.name, type, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${title} - Ecommerce Intel` }] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: "/opengraph-image", alt: `${title} - Ecommerce Intel` }] },
  };
}

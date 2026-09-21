import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function createMetadata(title: string, description: string, path = "/", type: "website" | "article" = "website"): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const cleanPath = path.replace(/^\//, "").replace(/\/$/, "");
  const isComparison = cleanPath.includes("-vs-") || cleanPath.startsWith("compare");
  const isReview = cleanPath.includes("review") || cleanPath.startsWith("reviews/");
  const socialType = isComparison ? "comparison" : isReview ? "review" : null;
  const imagePath = socialType ? `/og/${socialType}/${cleanPath.replaceAll("/", "--")}` : "/opengraph-image";
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: path },
    openGraph: { title, description, url, siteName: siteConfig.name, type, images: [{ url: imagePath, width: 1200, height: 630, alt: `${title} - EcommerceIntel` }] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: imagePath, alt: `${title} - EcommerceIntel` }] },
  };
}

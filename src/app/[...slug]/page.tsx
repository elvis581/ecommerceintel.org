import { notFound } from "next/navigation";
import { articlePageMap, articlePages } from "@/config/pages";
import { ArticleLayout } from "@/components/article-layout";
import { JsonLd } from "@/components/json-ld";
import { articleSchema } from "@/lib/seo/schema";
import { createMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;
export function generateStaticParams() { return articlePages.map((page) => ({ slug: page.slug.split("/") })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.join("/");
  const page = articlePageMap[key];
  if (!page) return {};
  const editorial = ["pillar", "review", "comparison", "guide"].includes(page.kind);
  return createMetadata(page.title, page.description, `/${page.slug}`, editorial ? "article" : "website");
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = articlePageMap[slug.join("/")];
  if (!page) notFound();
  return <><JsonLd data={articleSchema(page)} /><ArticleLayout page={page} /></>;
}

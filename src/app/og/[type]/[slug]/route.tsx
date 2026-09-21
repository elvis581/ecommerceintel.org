import { articlePageMap } from "@/config/pages";
import { createOgImage, ogSize } from "@/lib/seo/og-image";

export const contentType = "image/png";
export const size = ogSize;

export async function GET(_request: Request, { params }: { params: Promise<{ type: string; slug: string }> }) {
  const { type, slug } = await params;
  const page = articlePageMap[slug.replaceAll("--", "/")];
  const title = page?.h1 || (type === "comparison" ? "Ecommerce tool comparison" : "Ecommerce tool review");
  const subtitle = page?.description || "Evidence-led ecommerce software research for operators.";
  return createOgImage(title, subtitle, type === "comparison" ? "Head-to-head comparison" : "Independent software review");
}

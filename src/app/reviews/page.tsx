import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ReviewsDirectory } from "@/components/reviews-directory";
import { reviewsDirectoryItems } from "@/config/reviews-directory";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo/metadata";
import { TrackedLink } from "@/components/tracked-link";

const title = "Ecommerce Research Reviews & Comparisons";
const description = "Use EcommerceIntel review files to choose, compare or replace ecommerce research software by workflow fit and evidence quality.";
const url = `${siteConfig.url}/reviews`;
const topics = ["Ecommerce software reviews", "Ecommerce tool comparisons", "Ecommerce software alternatives"];

export const metadata = createMetadata(`${title} | EcommerceIntel`, description, "/reviews", "website");

const schema = [
  { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${url}#content`, name: title, description, url, inLanguage: "en", isAccessibleForFree: true, keywords: topics, about: topics.map((name) => ({ "@type": "Thing", name })), creator: { "@id": `${siteConfig.url}/about#editor` }, publisher: { "@id": `${siteConfig.url}/#organization` }, mainEntity: { "@id": `${url}#directory` } },
  { "@context": "https://schema.org", "@type": "ItemList", "@id": `${url}#directory`, name: "EcommerceIntel reviews, comparisons and alternatives", numberOfItems: reviewsDirectoryItems.length, itemListElement: reviewsDirectoryItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: `${siteConfig.url}${item.href}` })) },
  { "@context": "https://schema.org", "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name, url: siteConfig.url, logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon.svg` } },
  { "@context": "https://schema.org", "@type": "Person", "@id": `${siteConfig.url}/about#editor`, name: siteConfig.editorialAuthor.name, url: `${siteConfig.url}/about`, description: siteConfig.editorialAuthor.description, worksFor: { "@id": `${siteConfig.url}/#organization` } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: title, item: url }] },
];

export default function ReviewsPage() {
  return <main><article>
    <JsonLd data={schema} />
    <header className="article-header"><div className="site-container"><Breadcrumb current="Reviews & Comparisons" /><p className="eyebrow">Research files</p><h1>{title}</h1><p className="article-intro">Each file begins with a decision and ends with a next check. Open a review for one product, a comparison for two named tools or an alternatives page when the current workflow has a specific gap.</p></div></header>
    <div className="site-container page-band reviews-directory">
      <div className="reviews-directory-intro"><p>Start with the decision, then choose the file: a review tests one product, a comparison puts two named tools through the same brief, and an alternatives guide starts with a specific reason to switch. Every card shows the best fit, current price status, evidence basis and next action.</p><TrackedLink href="/compare" eventName="internal_link_click" eventParams={{placement:"reviews_intro",label:"Compare ecommerce tools"}} className="mt-5 inline-flex font-extrabold text-orange-700 hover:text-orange-900">Open the matched comparisons</TrackedLink></div>
      <ReviewsDirectory />
    </div>
  </article></main>;
}

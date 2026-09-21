import { siteConfig } from "@/config/site";
import { getGeoContext } from "@/config/geo";

type Faq = { question: string; answer: string };
type PageKind = "hub" | "pillar" | "review" | "comparison" | "guide" | "trust" | "legal";
type SchemaPage = { title: string; description: string; slug: string; faqs: Faq[]; kind: PageKind; hideFaq?: boolean; publishedIso?: string; modifiedIso?: string; reviewRating?: { ratingValue: number; bestRating: number; worstRating: number; itemName: string; itemUrl: string }; itemList?: { name: string; url: string; position: number }[] };

const topics = [
  "Ecommerce product research tools",
  "TikTok Shop product research",
  "Ecommerce competitor intelligence",
  "Ecommerce advertising intelligence",
  "TikTok creator research",
  "Cross-border ecommerce product validation",
];

const organization = {
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon.svg` },
  knowsAbout: topics,
};

const editorialAuthor = {
  "@type": "Person",
  "@id": `${siteConfig.url}/about#editor`,
  name: siteConfig.editorialAuthor.name,
  url: `${siteConfig.url}/about`,
  description: siteConfig.editorialAuthor.description,
  worksFor: { "@id": `${siteConfig.url}/#organization` },
  knowsAbout: topics,
};

export function websiteSchema(faqs: Faq[]) {
  return [
    { "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteConfig.url}/#website`, name: siteConfig.name, url: siteConfig.url, description: siteConfig.description, inLanguage: "en", about: topics.map((name) => ({ "@type": "Thing", name })), publisher: { "@id": `${siteConfig.url}/#organization` } },
    { "@context": "https://schema.org", ...organization },
    { "@context": "https://schema.org", ...editorialAuthor },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ecommerce Intel", item: siteConfig.url }] },
    faqSchema(faqs),
  ];
}

export function articleSchema(page: SchemaPage) {
  const url = `${siteConfig.url}/${page.slug}`;
  const socialType = page.kind === "comparison" ? "comparison" : page.kind === "review" ? "review" : null;
  const socialImage = socialType ? `${siteConfig.url}/og/${socialType}/${page.slug.replaceAll("/", "--")}` : `${siteConfig.url}/opengraph-image`;
  const context = getGeoContext(page.slug);
  const pageTopics = [context.primaryTopic, ...context.relatedTopics];
  const type = schemaType(page);
  const isArticle = type === "Article";
  const datePublished = page.publishedIso || siteConfig.publishedIso;
  const dateModified = page.modifiedIso || siteConfig.lastUpdatedIso;
  const primary = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#content`,
    ...(isArticle ? { headline: page.title } : { name: page.title }),
    description: page.description,
    url,
    ...(isArticle ? { datePublished } : {}),
    dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en",
    isAccessibleForFree: true,
    keywords: pageTopics,
    about: pageTopics.map((name) => ({ "@type": "Thing", name })),
    ...(context.citations.length ? {
      citation: context.citations,
      isBasedOn: context.citations.map((citationUrl) => ({ "@type": "CreativeWork", url: citationUrl })),
    } : {}),
    audience: { "@type": "Audience", audienceType: context.targetReader },
    ...(isArticle ? { author: { "@id": `${siteConfig.url}/about#editor` } } : { creator: { "@id": `${siteConfig.url}/about#editor` } }),
    publisher: { "@id": `${siteConfig.url}/#organization` },
    image: { "@type": "ImageObject", url: socialImage, width: 1200, height: 630 },
    ...(type === "AboutPage" ? { mainEntity: { "@id": `${siteConfig.url}/about#editor` } } : {}),
  };

  return [
    primary,
    page.reviewRating ? { "@context": "https://schema.org", "@type": "Review", "@id": `${url}#review`, itemReviewed: { "@type": "SoftwareApplication", name: page.reviewRating.itemName, url: page.reviewRating.itemUrl, applicationCategory: "BusinessApplication" }, author: { "@id": `${siteConfig.url}/about#editor` }, publisher: { "@id": `${siteConfig.url}/#organization` }, reviewRating: { "@type": "Rating", ratingValue: page.reviewRating.ratingValue, bestRating: page.reviewRating.bestRating, worstRating: page.reviewRating.worstRating }, datePublished: siteConfig.lastUpdatedIso, dateModified: siteConfig.lastUpdatedIso, reviewBody: page.description } : null,
    page.itemList ? { "@context": "https://schema.org", "@type": "ItemList", "@id": `${url}#alternatives`, name: page.title, numberOfItems: page.itemList.length, itemListElement: page.itemList.map((item) => ({ "@type": "ListItem", position: item.position, name: item.name, url: item.url })) } : null,
    { "@context": "https://schema.org", ...organization },
    { "@context": "https://schema.org", ...editorialAuthor },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: page.title, item: url }] },
    page.hideFaq ? null : faqSchema(page.faqs),
  ].filter(Boolean);
}

function schemaType(page: SchemaPage) {
  if (page.slug === "resources") return "CollectionPage";
  if (page.slug === "about") return "AboutPage";
  if (page.kind === "legal" || page.kind === "trust" || page.kind === "hub") return "WebPage";
  return "Article";
}

function faqSchema(faqs: Faq[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
}

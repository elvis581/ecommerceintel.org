import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import * as cheerio from "cheerio";
import sharp from "sharp";

const root = process.cwd();
const productionOrigin = "https://ecommerceintel.org";
const targets = JSON.parse(await readFile(path.join(root, "seo-targets.json"), "utf8"));
const retiredNotFoundRoutes = ["/start-here", "/platforms", "/guides", "/best-ecommerce-tools", "/best-ai-tools-for-ecommerce", "/shoplus-review"];
const retiredGoneRoutes = [];
const noFail = process.argv.includes("--no-fail");
const metadataRules = {
  title: { min: 35, max: 70 },
  description: { min: 80, max: 160 },
};
let server;
let baseUrl = process.env.SEO_AUDIT_BASE_URL;

if (!baseUrl) {
  baseUrl = "http://127.0.0.1:4310";
  server = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "start", "-p", "4310"], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
  await waitForServer(`${baseUrl}/`);
}

try {
  const results = [];
  for (const target of targets) results.push(await auditPage(target));
  const sitemap = await fetchText(`${baseUrl}/sitemap.xml`);
  const sitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/ecommerceintel\.org([^<]*)<\/loc>/g)].map((match) => match[1] || "/");
  const missingFromSitemap = targets.map((target) => target.route).filter((route) => !sitemapRoutes.includes(route));
  const extraInSitemap = sitemapRoutes.filter((route) => !targets.some((target) => target.route === route));
  const siteChecks = await auditSiteAssets(sitemapRoutes);
  siteChecks.metadataUniqueness = auditMetadataUniqueness(results);
  applyMetadataUniqueness(results);
  for (const result of results) result.pageReview = buildPageReview(result);
  const summary = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    thresholds: { coreWords: "per seo-targets.json", seo: 85, aeo: 80, geo: 85 },
    routes: results.length,
    passingCore: results.filter((result) => result.core && result.pass).length,
    coreRoutes: results.filter((result) => result.core).length,
    missingFromSitemap,
    extraInSitemap,
    siteChecks,
    pageReview: {
      titleReview: results.filter((result) => result.titleCheck.status !== "PASS").length,
      descriptionReview: results.filter((result) => result.descriptionCheck.status !== "PASS").length,
      thicknessReview: results.filter((result) => result.thicknessCheck.status !== "PASS").length,
      intentReview: results.filter((result) => result.intentCheck.status !== "PASS").length,
    },
  };
  await mkdir(path.join(root, "reports"), { recursive: true });
  await mkdir(path.join(root, "public"), { recursive: true });
  await writeFile(path.join(root, "reports/seo-audit.json"), JSON.stringify({ summary, results }, null, 2));
  await writeFile(path.join(root, "reports/seo-audit.md"), renderMarkdown(summary, results));
  await writeFile(path.join(root, "reports/page-intent-map.md"), renderIntentMap(targets));
  await writeFile(path.join(root, "public/seo-audit.html"), renderHtml(summary, results));
  printConsole(summary, results);
  const failed = results.filter((result) => result.core && !result.pass);
  if (!noFail && (failed.length || missingFromSitemap.length || extraInSitemap.length || Object.values(siteChecks).some((check) => !check.pass))) process.exitCode = 1;
} finally {
  if (server) server.kill("SIGTERM");
}

async function auditPage(target) {
  const response = await fetch(`${baseUrl}${target.route}`);
  const html = await response.text();
  const $ = cheerio.load(html);
  const container = target.route === "/" ? $("main") : $("article");
  const fullVisibleText = container.clone().find("script,style").remove().end().text().replace(/\s+/g, " ").trim();
  const editorial = container.clone();
  editorial.find("script,style,.disclosure-box,.geo-summary,.operator-view,.commercial-cta-section,.affiliate-cta,.source-list,.standard-estimate-disclaimer").remove();
  editorial.find("form").closest("section,div").remove();
  editorial.find("section").each((_, element) => {
    const section = $(element);
    const heading = section.children("h2").first().text().replace(/\s+/g, " ").trim().toLowerCase();
    if (["frequently asked questions", "keep researching", "quick comparison"].includes(heading)) section.remove();
  });
  const intro = target.route === "/" ? "" : $(".article-intro").first().text();
  const editorialText = [intro, editorial.text()].join(" ").replace(/\s+/g, " ").trim();
  const wordCount = words(editorialText);
  const fullWordCount = words(fullVisibleText);
  const title = $("title").text().trim();
  const description = $('meta[name="description"]').attr("content")?.trim() || "";
  const h1s = $("h1");
  const canonical = $('link[rel="canonical"]').attr("href") || "";
  const expectedCanonical = target.route === "/" ? productionOrigin : `${productionOrigin}${target.route}`;
  const og = {
    title: $('meta[property="og:title"]').attr("content") || "",
    description: $('meta[property="og:description"]').attr("content") || "",
    url: $('meta[property="og:url"]').attr("content") || "",
    image: $('meta[property="og:image"]').attr("content") || "",
  };
  const twitter = {
    card: $('meta[name="twitter:card"]').attr("content") || "",
    title: $('meta[name="twitter:title"]').attr("content") || "",
    description: $('meta[name="twitter:description"]').attr("content") || "",
    image: $('meta[name="twitter:image"]').attr("content") || "",
  };
  const schemaTypes = collectSchemaTypes($);
  const schemas = collectSchemas($);
  const h2Count = container.find("h2").length;
  const faqCount = container.find('section details, section button[aria-controls^="faq-answer-"]').length;
  const expectsVisibleFaq = expectsFaq(target);
  const internalLinks = new Set(container.find('a[href^="/"]').map((_, el) => $(el).attr("href")?.split(/[?#]/)[0]).get().filter(Boolean));
  const structuredSourceUrls = collectStructuredSourceUrls($);
  const officialSources = new Set([...container.find('.source-list a[href^="http"]').map((_, el) => $(el).attr("href")).get().filter(Boolean), ...structuredSourceUrls]);
  const evidenceMappings = Math.max(container.find(".source-evidence-item").length, structuredSourceUrls.length);
  const comparisonTable = container.find(".comparison-table table,.article-table table").length > 0;
  const introWords = words(target.route === "/" ? $("main h1").nextAll("p").first().text() : $(".article-intro").text());
  const hasQuickAnswer = target.route === "/" ? $("main h1").length === 1 : container.find(".quick-verdict").length === 1;
  const hasDirectAnswer = hasQuickAnswer || (introWords >= 20 && introWords <= 100);
  const hasNavigationPaths = container.find(".guide-card,.reviews-media-card").length >= 3 || container.find(".tool-directory-table tbody tr").length >= 3;
  const hasDecisionStructure = container.find(".list-panel,.plain-feature,.platform-card,.workflow-tile,.guide-card,.reviews-media-card,.review-decision-card,.comparison-table,.article-key-facts,.article-table").length >= 1;
  const workflowHeadings = container.find("h2").map((_, element) => $(element).text().trim().toLowerCase()).get();
  const hasWorkflow = target.route === "/" ? hasDecisionStructure : container.find(".workflow-steps").length === 1 || (target.articleType === "workflow guide" && ["inputs required", "workflow overview", "final decision", "tiktok shop product research brief template"].every((heading) => workflowHeadings.includes(heading)));
  const hasDisclosure = container.find(".disclosure-box").length >= 1 || workflowHeadings.includes("review disclosure");
  const titleCheck = checkMetadataLength(title, metadataRules.title);
  const descriptionCheck = checkMetadataLength(description, metadataRules.description);
  const intentCheck = checkIntent(target, title, description, h1s.first().text().trim(), intro);
  const thicknessCheck = checkThickness(target, wordCount, fullWordCount, { introWords, h2Count, faqCount, internalLinks: internalLinks.size, officialSources: officialSources.size });
  const seoChecks = {
    title: scoreRange(title.length, 35, 70, 7),
    description: scoreRange(description.length, 80, 160, 7),
    h1: h1s.length === 1 ? 7 : 0,
    canonical: canonical === expectedCanonical ? 7 : 0,
    openGraph: Object.values(og).every(Boolean) && og.url === expectedCanonical ? 8 : 0,
    twitter: Object.values(twitter).every(Boolean) ? 7 : 0,
    schemas: requiredSchemas(target).every((type) => schemaTypes.includes(type)) ? 12 : 0,
    content: Math.min(20, Math.round((wordCount / target.minWords) * 20)),
    headings: h2Count >= 4 ? 5 : Math.min(4, h2Count),
    faq: expectsVisibleFaq ? (faqCount >= 4 ? 5 : faqCount) : (hasNavigationPaths ? 5 : 0),
    internalLinks: internalLinks.size >= 3 ? 5 : internalLinks.size,
    sources: !target.sourceRequired || (officialSources.size >= 2 && evidenceMappings >= 2) ? 5 : 0,
    comparison: !target.comparisonRequired || comparisonTable ? 5 : 0,
  };
  const seoScore = Object.values(seoChecks).reduce((sum, value) => sum + value, 0);
  const aeoChecks = {
    directAnswer: hasDirectAnswer ? 15 : 0,
    visibleFaq: expectsVisibleFaq ? (faqCount >= 4 ? 15 : faqCount * 3) : (hasNavigationPaths ? 15 : 0),
    faqSchema: expectsVisibleFaq ? (schemaTypes.includes("FAQPage") ? 15 : 0) : (!schemaTypes.includes("FAQPage") ? 15 : 0),
    workflow: target.articleType === "hub" ? (hasNavigationPaths ? 10 : 0) : target.articleType === "workflow guide" ? (hasWorkflow ? 10 : 0) : (comparisonTable || hasDecisionStructure ? 10 : 0),
    sources: !target.sourceRequired ? 10 : (officialSources.size >= 2 ? 5 : 0) + (evidenceMappings >= 2 ? 5 : 0),
    decisionSupport: target.comparisonRequired ? (comparisonTable ? 10 : 0) : (hasDecisionStructure ? 10 : 0),
    descriptiveHeadings: h2Count >= 4 ? 10 : h2Count * 2,
    trust: hasDisclosure || ["legal", "trust", "disclosure"].includes(target.articleType) ? 10 : 0,
    conciseIntro: introWords > 0 && introWords <= 90 ? 5 : 0,
  };
  const aeoScore = Object.values(aeoChecks).reduce((sum, value) => sum + value, 0);
  const expectedPrimarySchema = primarySchemaType(target);
  const primarySchema = findSchema(schemas, expectedPrimarySchema);
  const organizationSchema = findSchema(schemas, "Organization");
  const personSchema = findSchema(schemas, "Person");
  const hasEntityTopics = Array.isArray(primarySchema?.about) && primarySchema.about.length > 0;
  const hasKeywords = target.route === "/" ? Array.isArray(organizationSchema?.knowsAbout) && organizationSchema.knowsAbout.length > 0 : Array.isArray(primarySchema?.keywords) && primarySchema.keywords.length > 0;
  const hasCitations = target.route === "/" || !target.sourceRequired || (Array.isArray(primarySchema?.citation) && primarySchema.citation.length >= 2);
  const hasAttribution = target.route === "/"
    ? Boolean(primarySchema?.publisher && organizationSchema?.name && organizationSchema?.url)
    : Boolean(personSchema?.name && personSchema?.url && organizationSchema?.name && organizationSchema?.url && (primarySchema?.author?.["@id"] || primarySchema?.creator?.["@id"]) && primarySchema?.publisher?.["@id"]);
  const geoChecks = {
    directAnswer: hasDirectAnswer ? 15 : 0,
    visibleSummary: container.find(".geo-summary,.quick-verdict,.review-decision-card,.guide-card,.reviews-media-card,.comparison-table,.tool-directory-table,#quick-verdict").length >= 1 || hasWorkflow ? 15 : 0,
    entitySchema: (primarySchema?.inLanguage === "en" ? 5 : 0) + (hasEntityTopics ? 8 : 0) + (hasKeywords ? 6 : 0) + (hasCitations ? 6 : 0),
    sources: !target.sourceRequired ? 15 : (officialSources.size >= 2 ? 8 : 0) + (evidenceMappings >= 2 ? 7 : 0),
    faq: expectsVisibleFaq ? (faqCount >= 4 && schemaTypes.includes("FAQPage") ? 10 : 0) : (hasNavigationPaths && !schemaTypes.includes("FAQPage") ? 10 : 0),
    freshness: $(".last-updated,.geo-reviewed").length >= 1 ? 10 : 0,
    attribution: hasAttribution ? 10 : 0,
  };
  const geoScore = Object.values(geoChecks).reduce((sum, value) => sum + value, 0);
  const issues = [];
  if (response.status !== 200) issues.push(`HTTP ${response.status}`);
  if (wordCount < target.minWords) issues.push(`${wordCount}/${target.minWords} words`);
  if (seoScore < 85) issues.push(`SEO ${seoScore}/100`);
  if (aeoScore < 80) issues.push(`AEO ${aeoScore}/100`);
  if (geoScore < 85) issues.push(`GEO ${geoScore}/100`);
  if (target.sourceRequired && officialSources.size < 2) issues.push(`${officialSources.size}/2 visible official sources`);
  if (target.sourceRequired && evidenceMappings < 2) issues.push(`${evidenceMappings}/2 claim-to-source evidence notes`);
  if (target.comparisonRequired && !comparisonTable) issues.push("comparison structure missing");
  const requiredEvidencePresent = (!target.sourceRequired || (officialSources.size >= 2 && evidenceMappings >= 2)) && (!target.comparisonRequired || comparisonTable);
  return { ...target, status: response.status, title, titleLength: title.length, description, descriptionLength: description.length, h1: h1s.first().text().trim(), canonical, og, twitter, schemaTypes, wordCount, fullWordCount, h2Count, faqCount, internalLinks: internalLinks.size, officialSources: officialSources.size, evidenceMappings, comparisonTable, seoScore, aeoScore, geoScore, seoChecks, aeoChecks, geoChecks, titleCheck, descriptionCheck, intentCheck, thicknessCheck, issues, pass: response.status === 200 && requiredEvidencePresent && (!target.core || (wordCount >= target.minWords && seoScore >= 85 && aeoScore >= 80 && geoScore >= 85)) };
}

function primarySchemaType(target) {
  if (target.route === "/") return "WebSite";
  if (target.route === "/reviews") return "CollectionPage";
  if (target.route === "/about") return "AboutPage";
  if (["hub", "legal", "trust", "disclosure"].includes(target.articleType)) return "WebPage";
  return "Article";
}
function requiredSchemas(target) {
  const schemas = target.route === "/"
    ? ["WebSite", "Organization", "Person", "BreadcrumbList"]
    : [primarySchemaType(target), "Organization", "Person", "BreadcrumbList"];
  if (expectsFaq(target)) schemas.push("FAQPage");
  return schemas;
}
function expectsFaq(target) { return target.route !== "/reviews"; }
function scoreRange(length, min, max, points) { if (!length) return 0; if (length >= min && length <= max) return points; return Math.ceil(points / 2); }
function words(text) { return text.trim() ? text.trim().split(/\s+/).length : 0; }
function checkMetadataLength(value, rule) {
  const length = value.length;
  const status = !value ? "FAIL" : length >= rule.min && length <= rule.max ? "PASS" : "REVIEW";
  return { status, present: Boolean(value), length, min: rule.min, max: rule.max };
}
function checkIntent(target, title, description, h1, intro) {
  const tokens = target.primaryKeyword.toLowerCase().split(/\s+/).filter((token) => token.length > 2);
  const surfaces = { title, description, h1, intro };
  const coverage = Object.fromEntries(Object.entries(surfaces).map(([name, value]) => [name, tokens.filter((token) => {
    const lower = value.toLowerCase();
    const compact = lower.replace(/[^a-z0-9]+/g, "");
    return lower.includes(token) || compact.includes(token.replace(/[^a-z0-9]+/g, ""));
  }).length / Math.max(tokens.length, 1)]));
  const strongSurfaces = [coverage.title, coverage.description, coverage.h1].filter((value) => value >= 0.5).length;
  const status = strongSurfaces >= 2 ? "PASS" : "REVIEW";
  return { status, keyword: target.primaryKeyword, titleCoverage: coverage.title, descriptionCoverage: coverage.description, h1Coverage: coverage.h1, introCoverage: coverage.intro };
}
function checkThickness(target, editorialWords, fullVisibleWords, signals) {
  const trustLegal = ["trust", "legal", "disclosure"].includes(target.articleType);
  const minimum = target.minWords;
  const ratio = minimum ? editorialWords / minimum : 0;
  const passRatio = trustLegal ? 0.8 : 1;
  const status = ratio >= passRatio ? "PASS" : ratio >= 0.6 ? "REVIEW" : "THIN";
  return {
    status,
    basis: trustLegal ? "trust/legal threshold" : "commercial threshold",
    editorialWords,
    fullVisibleWords,
    targetWords: minimum,
    ratio: Number(ratio.toFixed(2)),
    signals,
  };
}
function applyMetadataUniqueness(results) {
  for (const field of ["title", "description", "h1"]) {
    const groups = new Map();
    for (const result of results) {
      const key = String(result[field] || "").trim().toLowerCase();
      if (!key) continue;
      const routes = groups.get(key) || [];
      routes.push(result.route);
      groups.set(key, routes);
    }
    for (const result of results) {
      const key = String(result[field] || "").trim().toLowerCase();
      const duplicateRoutes = groups.get(key) || [];
      const checkName = field === "title" ? "titleCheck" : field === "description" ? "descriptionCheck" : "h1Check";
      result[checkName] = { ...(result[checkName] || { status: "FAIL" }), unique: duplicateRoutes.length <= 1, duplicateRoutes: duplicateRoutes.length > 1 ? duplicateRoutes : [] };
      if (duplicateRoutes.length > 1 && result[checkName].status === "PASS") result[checkName].status = "REVIEW";
    }
  }
}
function buildPageReview(result) {
  const recommendations = [];
  if (result.titleCheck.status !== "PASS") recommendations.push(`Rewrite the title to ${metadataRules.title.min}-${metadataRules.title.max} characters while keeping the named intent.`);
  if (result.descriptionCheck.status !== "PASS") recommendations.push(`Rewrite the description to ${metadataRules.description.min}-${metadataRules.description.max} characters with a concrete decision promise.`);
  if (result.intentCheck.status !== "PASS") recommendations.push(`Align title, description, H1 and opening answer around “${result.primaryKeyword}”.`);
  if (result.thicknessCheck.status === "THIN") recommendations.push(`Expand the page with entity-specific evidence, limits, next steps and a conclusion; it is below 80% of the ${result.minWords}-word target.`);
  else if (result.thicknessCheck.status === "REVIEW") recommendations.push(`Review content depth against the ${result.minWords}-word target; the page is close to the minimum.`);
  if (result.internalLinks < 3 && !["legal", "disclosure"].includes(result.articleType)) recommendations.push("Add at least one more useful route-specific internal link.");
  if (["review", "comparison", "guide", "alternatives"].includes(result.articleType) && result.officialSources < 1) recommendations.push("Expose at least one visible official or first-party source for the claims on this commercial page.");
  if (!recommendations.length) recommendations.push("Keep the page-specific evidence, conclusion and next action current on the next review cycle.");
  return { status: recommendations.length === 1 ? "PASS" : "REVIEW", recommendations };
}
function collectSchemaTypes($) {
  const types = new Set();
  $('script[type="application/ld+json"]').each((_, el) => { try { walk(JSON.parse($(el).html() || "null"), types); } catch {} });
  return [...types];
}
function collectSchemas($) {
  const schemas = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const value = JSON.parse($(el).html() || "null");
      if (Array.isArray(value)) schemas.push(...value);
      else if (value) schemas.push(value);
    } catch {}
  });
  return schemas;
}
function collectStructuredSourceUrls($) {
  const urls = new Set();
  const visit = (value) => {
    if (Array.isArray(value)) return value.forEach(visit);
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value.citation)) for (const url of value.citation) if (typeof url === "string") urls.add(url);
    if (Array.isArray(value.isBasedOn)) for (const item of value.isBasedOn) if (typeof item?.url === "string") urls.add(item.url);
    Object.values(value).forEach(visit);
  };
  $('script[type="application/ld+json"]').each((_, element) => { try { visit(JSON.parse($(element).html() || "null")); } catch {} });
  return [...urls];
}
function findSchema(schemas, type) { return schemas.find((schema) => schema?.["@type"] === type); }
function walk(value, types) { if (Array.isArray(value)) value.forEach((item) => walk(item, types)); else if (value && typeof value === "object") { if (typeof value["@type"] === "string") types.add(value["@type"]); Object.values(value).forEach((item) => walk(item, types)); } }
async function fetchText(url) { const response = await fetch(url); if (!response.ok) throw new Error(`${response.status} ${url}`); return response.text(); }
async function waitForServer(url) { for (let attempt = 0; attempt < 80; attempt += 1) { try { if ((await fetch(url)).ok) return; } catch {} await new Promise((resolve) => setTimeout(resolve, 250)); } throw new Error(`Could not start audit server at ${url}`); }

async function auditSiteAssets(sitemapRoutes) {
  const robots = await fetchText(`${baseUrl}/robots.txt`);
  const manifestResponse = await fetch(`${baseUrl}/manifest.webmanifest`);
  const manifest = await manifestResponse.json();
  const notFound = await fetch(`${baseUrl}/definitely-not-a-real-route`);
  const iconSvg = await fetch(`${baseUrl}/icon.svg`);
  const apple = await imageMetadata(`${baseUrl}/apple-icon`);
  const icon192 = await imageMetadata(`${baseUrl}/icon-192.png`);
  const icon512 = await imageMetadata(`${baseUrl}/icon-512.png`);
  const social = await imageMetadata(`${baseUrl}/opengraph-image`);
  const llmsResponse = await fetch(`${baseUrl}/llms.txt`);
  const llmsText = await llmsResponse.text();
  const internalLinks = await auditInternalLinks();
  const retiredStatuses = await Promise.all([
    ...retiredNotFoundRoutes.map(async (route) => ({ route, expected: 404, status: (await fetch(`${baseUrl}${route}`)).status })),
    ...retiredGoneRoutes.map(async (route) => ({ route, expected: 410, status: (await fetch(`${baseUrl}${route}`)).status })),
  ]);
  return {
    robots: { pass: robots.includes("Allow: /") && robots.includes(`${productionOrigin}/sitemap.xml`), detail: "allows crawl and declares production sitemap" },
    sitemap: { pass: sitemapRoutes.length === targets.length, detail: `${sitemapRoutes.length}/${targets.length} routes` },
    notFound: { pass: notFound.status === 404, detail: `HTTP ${notFound.status}` },
    favicon: { pass: iconSvg.ok && (iconSvg.headers.get("content-type") || "").includes("image/svg+xml"), detail: iconSvg.headers.get("content-type") || "missing" },
    appleIcon: { pass: apple.width === 180 && apple.height === 180, detail: `${apple.width}x${apple.height}` },
    pwa192: { pass: icon192.width === 192 && icon192.height === 192, detail: `${icon192.width}x${icon192.height}` },
    pwa512: { pass: icon512.width === 512 && icon512.height === 512, detail: `${icon512.width}x${icon512.height}` },
    maskable: { pass: Array.isArray(manifest.icons) && manifest.icons.some((icon) => icon.sizes === "512x512" && icon.purpose === "maskable"), detail: "512px maskable manifest icon" },
    socialImage: { pass: social.width === 1200 && social.height === 630, detail: `${social.width}x${social.height}` },
    llmsTxt: { pass: llmsResponse.status === 200 && (llmsResponse.headers.get("content-type") || "").includes("text/plain") && llmsText.includes("# EcommerceIntel") && llmsText.includes(productionOrigin), detail: `HTTP ${llmsResponse.status}, ${llmsResponse.headers.get("content-type") || "missing content type"}` },
    internalLinks: { pass: internalLinks.broken.length === 0, detail: internalLinks.broken.length ? internalLinks.broken.map((item) => `${item.source} -> ${item.href} (${item.status})`).join("; ") : `${internalLinks.checked} unique route links checked` },
    retiredRoutes: { pass: retiredStatuses.every((item) => item.status === item.expected), detail: retiredStatuses.map((item) => `${item.route}=${item.status} (expected ${item.expected})`).join(", ") },
  };
}
async function imageMetadata(url) { const response = await fetch(url); if (!response.ok) return {}; return sharp(Buffer.from(await response.arrayBuffer())).metadata(); }
async function auditInternalLinks() {
  const links = new Map();
  for (const target of targets) {
    const html = await fetchText(`${baseUrl}${target.route}`);
    const $ = cheerio.load(html);
    $("a[href^='/']").each((_, element) => {
      const href = ($(element).attr("href") || "").split(/[?#]/)[0] || "/";
      if (!links.has(href)) links.set(href, target.route);
    });
  }
  const broken = [];
  for (const [href, source] of links) {
    const status = (await fetch(`${baseUrl}${href}`)).status;
    if (status >= 400) broken.push({ source, href, status });
  }
  return { checked: links.size, broken };
}
function auditMetadataUniqueness(results) {
  const duplicates = [];
  for (const field of ["title", "description", "h1"]) {
    const groups = new Map();
    for (const result of results) {
      const value = result[field];
      const key = String(value || "").trim().toLowerCase();
      if (!key) continue;
      const routes = groups.get(key) || [];
      routes.push(result.route);
      groups.set(key, routes);
    }
    for (const routes of groups.values()) if (routes.length > 1) duplicates.push(`${field}: ${routes.join(", ")}`);
  }
  return { pass: duplicates.length === 0, detail: duplicates.length ? duplicates.join("; ") : "unique title, description and H1 across audited routes" };
}

function renderMarkdown(summary, results) {
  const lines = ["# SEO, AEO and GEO Audit", "", `Generated: ${summary.generatedAt}`, "", `Core pass: ${summary.passingCore}/${summary.coreRoutes}`, "", "| Route | Words | H2 | FAQ | Links | Sources | Compare | SEO | AEO | GEO | Pass |", "|---|---:|---:|---:|---:|---:|:---:|---:|---:|---:|:---:|"];
  for (const result of results) lines.push(`| ${result.route} | ${result.wordCount} | ${result.h2Count} | ${result.faqCount} | ${result.internalLinks} | ${result.officialSources} | ${result.comparisonTable ? "yes" : "no"} | ${result.seoScore} | ${result.aeoScore} | ${result.geoScore} | ${result.pass ? "yes" : "no"} |`);
  lines.push("", "## Page-by-page B-side review", "", "This section treats every route as a separate search result and a separate buyer decision. `PASS` means the rendered check is within the stated rule; `REVIEW` is a manual improvement opportunity; `THIN` means the page is below 80% of its route-specific editorial target.", "");
  for (const result of results) {
    const review = result.pageReview || buildPageReview(result);
    lines.push(`### ${result.route}`, "", `- Type / intent: ${result.articleType} / ${result.intent}`, `- Title (${result.titleLength} chars, ${result.titleCheck.status}, unique: ${result.titleCheck.unique ? "yes" : "no"}): ${result.title}`, `- Description (${result.descriptionLength} chars, ${result.descriptionCheck.status}, unique: ${result.descriptionCheck.unique ? "yes" : "no"}): ${result.description}`, `- H1: ${result.h1}`, `- Intent alignment: ${result.intentCheck.status} (title ${Math.round(result.intentCheck.titleCoverage * 100)}%, description ${Math.round(result.intentCheck.descriptionCoverage * 100)}%, H1 ${Math.round(result.intentCheck.h1Coverage * 100)}% keyword-token coverage)`, `- Thickness: ${result.thicknessCheck.status} (${result.wordCount}/${result.minWords} editorial words; ${result.fullWordCount} visible words; ${result.thicknessCheck.basis})`, `- Structure: ${result.h2Count} H2, ${result.faqCount} FAQ items, ${result.internalLinks} internal route links, ${result.officialSources} official/first-party source URLs, comparison table: ${result.comparisonTable ? "yes" : "no"}`, `- Scores: SEO ${result.seoScore}, AEO ${result.aeoScore}, GEO ${result.geoScore}; route gate: ${result.pass ? "PASS" : "FAIL"}`, `- B-side recommendation: ${review.recommendations.join(" ")}`, "");
  }
  lines.push("", "## Site Assets", "", "| Check | Result | Detail |", "|---|:---:|---|");
  for (const [name, check] of Object.entries(summary.siteChecks)) lines.push(`| ${name} | ${check.pass ? "pass" : "fail"} | ${check.detail} |`);
  return `${lines.join("\n")}\n`;
}
function renderIntentMap(items) {
  const lines = ["# Page Intent Map", "", "| Priority | Route | Primary keyword | Secondary keywords | Intent | Type | Target reader | Money page |", "|---|---|---|---|---|---|---|---|"];
  for (const item of items) lines.push(`| ${item.priority} | ${item.route} | ${item.primaryKeyword} | ${item.secondaryKeywords.join(", ")} | ${item.intent} | ${item.articleType} | ${item.targetReader} | ${item.moneyPage} |`);
  return `${lines.join("\n")}\n`;
}
function renderHtml(summary, results) {
  const generated = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Shanghai" }).format(new Date(summary.generatedAt));
  const siteAssetsPassing = Object.values(summary.siteChecks).filter((check) => check.pass).length;
  const siteAssetsTotal = Object.keys(summary.siteChecks).length;
  const failedRoutes = results.filter((result) => !result.pass).length;
  const rows = results.map((result) => {
    const issues = result.issues.length ? result.issues.join("; ") : "No audit failures";
    const review = result.pageReview || buildPageReview(result);
    return `<tr data-core="${result.core}" data-pass="${result.pass}" data-search="${escapeHtml(`${result.route} ${result.primaryKeyword} ${result.articleType}`.toLowerCase())}">
      <td class="route-cell"><a href="${escapeHtml(result.route)}">${escapeHtml(result.route)}</a><span>${escapeHtml(result.articleType)} · ${escapeHtml(result.priority)}</span><details><summary>Score details</summary>${scoreDetails(result)}</details><details><summary>Page checks</summary><div class="page-checks"><p><b>Title</b> ${result.titleLength} chars · ${escapeHtml(result.titleCheck.status)} · ${escapeHtml(result.title)}</p><p><b>Description</b> ${result.descriptionLength} chars · ${escapeHtml(result.descriptionCheck.status)} · ${escapeHtml(result.description)}</p><p><b>Intent</b> ${escapeHtml(result.intentCheck.status)} · H1: ${escapeHtml(result.h1)}</p><p><b>Thickness</b> ${escapeHtml(result.thicknessCheck.status)} · ${result.wordCount}/${result.minWords} editorial words</p><p><b>Recommendation</b> ${escapeHtml(review.recommendations.join(" "))}</p></div></details></td>
      <td><strong>${result.wordCount}</strong><span>min ${result.minWords}</span></td>
      <td>${result.h2Count}</td><td>${result.faqCount}</td><td>${result.internalLinks}</td><td>${result.officialSources}</td>
      <td><span class="score ${scoreClass(result.seoScore, 85)}">${result.seoScore}</span></td>
      <td><span class="score ${scoreClass(result.aeoScore, 80)}">${result.aeoScore}</span></td>
      <td><span class="score ${scoreClass(result.geoScore, 85)}">${result.geoScore}</span></td>
      <td><span class="status ${result.pass ? "pass" : "fail"}">${result.pass ? "PASS" : "FAIL"}</span><span class="issue">${escapeHtml(issues)}</span></td>
    </tr>`;
  }).join("\n");
  const assetRows = Object.entries(summary.siteChecks).map(([name, check]) => `<tr><td>${escapeHtml(assetLabel(name))}</td><td><span class="status ${check.pass ? "pass" : "fail"}">${check.pass ? "PASS" : "FAIL"}</span></td><td>${escapeHtml(check.detail)}</td></tr>`).join("\n");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>SEO, AEO and GEO Audit · EcommerceIntel</title>
<style>
:root{color-scheme:light;--ink:#14202b;--muted:#65727e;--line:#d7dee4;--panel:#fff;--bg:#eef2f4;--green:#087f5b;--green-bg:#dff5eb;--amber:#9a5b00;--amber-bg:#fff0cf;--red:#b42318;--red-bg:#fee4e2;--blue:#175cd3}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:0}a{color:var(--blue)}header{border-bottom:1px solid var(--line);background:#16222c;color:#fff}.shell{width:min(1480px,calc(100% - 32px));margin:auto}.topbar{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0}.brand{font-weight:850}.back{color:#d7e7f5;font-size:14px}.hero{padding:38px 0 42px}.eyebrow{margin:0 0 10px;color:#8fd9bc;font-size:12px;font-weight:800;text-transform:uppercase}.hero h1{margin:0;font-size:clamp(32px,5vw,54px);line-height:1.05}.hero p{max-width:780px;margin:16px 0 0;color:#c8d2da;line-height:1.65}.summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:28px}.metric{border:1px solid #3b4853;background:#202e39;padding:16px;border-radius:6px}.metric strong{display:block;font-size:29px}.metric span{display:block;margin-top:4px;color:#b8c4cd;font-size:13px}main{padding:28px 0 54px}.toolbar{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:14px}.toolbar h2{margin:0;font-size:22px}.controls{display:flex;align-items:center;gap:10px}.segments{display:flex;border:1px solid var(--line);background:#fff}.segments button{border:0;border-right:1px solid var(--line);background:#fff;padding:10px 13px;color:var(--muted);font-weight:750;cursor:pointer}.segments button:last-child{border-right:0}.segments button[aria-pressed="true"]{background:#16222c;color:#fff}.search{min-height:40px;width:260px;border:1px solid var(--line);background:#fff;padding:0 12px;font:inherit}.table-wrap{overflow-x:auto;border:1px solid var(--line);background:var(--panel);border-radius:6px}table{width:100%;min-width:1120px;border-collapse:collapse;font-size:14px}th,td{padding:13px 12px;border-bottom:1px solid #e3e8ec;text-align:left;vertical-align:top}th{position:sticky;top:0;background:#f5f7f8;color:#52606b;font-size:12px;text-transform:uppercase}tbody tr:hover{background:#fafcfd}td span{display:block;margin-top:4px;color:var(--muted);font-size:12px}.route-cell{min-width:280px}.route-cell>a{font-weight:800;text-decoration:none}.score,.status{display:inline-flex!important;align-items:center;justify-content:center;min-width:44px;min-height:28px;margin:0!important;padding:4px 8px;border-radius:4px;font-weight:850!important;font-size:12px!important}.good,.pass{background:var(--green-bg);color:var(--green)!important}.warn{background:var(--amber-bg);color:var(--amber)!important}.bad,.fail{background:var(--red-bg);color:var(--red)!important}.issue{max-width:180px;line-height:1.45}details{margin-top:8px}summary{color:var(--blue);font-size:12px;font-weight:750;cursor:pointer}.details-grid{display:grid;grid-template-columns:repeat(3,minmax(150px,1fr));gap:8px;margin-top:10px}.detail-group{border:1px solid var(--line);background:#f8fafb;padding:9px}.detail-group strong{display:block;margin-bottom:5px;font-size:12px}.detail-group span{display:flex;justify-content:space-between;gap:12px;margin:2px 0;font-size:11px}.assets{margin-top:26px}.assets h2{font-size:22px}.method{margin-top:22px;border-left:4px solid #d08a00;background:#fff8e7;padding:16px 18px;line-height:1.6}.method strong{display:block;margin-bottom:4px}.empty{display:none;margin:18px 0;padding:18px;border:1px solid var(--line);background:#fff}footer{padding:22px 0 42px;color:var(--muted);font-size:13px}@media(max-width:820px){.shell{width:min(100% - 20px,1480px)}.summary{grid-template-columns:1fr 1fr}.toolbar{align-items:flex-start;flex-direction:column}.controls{width:100%;align-items:stretch;flex-direction:column}.search{width:100%}.segments button{flex:1}.details-grid{grid-template-columns:1fr}.hero{padding-top:28px}}@media(max-width:440px){.summary{grid-template-columns:1fr}.topbar{align-items:flex-start;flex-direction:column}}
</style></head><body><header><div class="shell"><div class="topbar"><div class="brand">EcommerceIntel Audit</div><a class="back" href="/">Open website</a></div><div class="hero"><p class="eyebrow">Production HTML inspection</p><h1>SEO, AEO and GEO Audit</h1><p>This page is generated from the same production crawl used by the failing audit command. Scores are based on rendered metadata, schema, visible content, sources, FAQs, internal links and decision-support structure.</p><div class="summary"><div class="metric"><strong>${summary.passingCore}/${summary.coreRoutes}</strong><span>core routes passing</span></div><div class="metric"><strong>${results.length - failedRoutes}/${results.length}</strong><span>all routes passing</span></div><div class="metric"><strong>${siteAssetsPassing}/${siteAssetsTotal}</strong><span>site assets passing</span></div><div class="metric"><strong>${generated}</strong><span>last production audit</span></div></div></div></div></header>
<main class="shell"><section><div class="toolbar"><div><p class="eyebrow" style="color:var(--green)">Page-level results</p><h2>Rendered route scores</h2></div><div class="controls"><div class="segments" aria-label="Filter routes"><button type="button" data-filter="all" aria-pressed="true">All</button><button type="button" data-filter="core" aria-pressed="false">Core</button><button type="button" data-filter="fail" aria-pressed="false">Failures</button></div><input class="search" type="search" aria-label="Search routes" placeholder="Search route, keyword or type"></div></div><div class="table-wrap"><table><thead><tr><th>Route</th><th>Words</th><th>H2</th><th>FAQ</th><th>Links</th><th>Sources</th><th>SEO</th><th>AEO</th><th>GEO</th><th>Result</th></tr></thead><tbody>${rows}</tbody></table></div><p class="empty">No routes match the current filter.</p></section>
<section class="assets"><p class="eyebrow" style="color:var(--green)">Technical coverage</p><h2>Site assets and crawl controls</h2><div class="table-wrap"><table style="min-width:680px"><thead><tr><th>Check</th><th>Result</th><th>Observed value</th></tr></thead><tbody>${assetRows}</tbody></table></div></section>
<aside class="method"><strong>Scoring thresholds</strong>Core pages must meet their route-specific word target, SEO 85/100, AEO 80/100 and GEO 85/100. A passing score does not prove rankings or inclusion in an AI answer; it confirms that the audited technical and visible evidence requirements are present in production HTML.</aside></main><footer class="shell">Generated locally by <code>npm run audit:seo</code>. This diagnostic page is excluded from indexing and the XML sitemap.</footer>
<script>(()=>{const rows=[...document.querySelectorAll("tbody tr[data-core]")],buttons=[...document.querySelectorAll("[data-filter]")],search=document.querySelector(".search"),empty=document.querySelector(".empty");let filter="all";function update(){const query=search.value.trim().toLowerCase();let visible=0;for(const row of rows){const matchesFilter=filter==="all"||(filter==="core"&&row.dataset.core==="true")||(filter==="fail"&&row.dataset.pass==="false");const matchesSearch=!query||row.dataset.search.includes(query);const show=matchesFilter&&matchesSearch;row.hidden=!show;if(show)visible++}empty.style.display=visible?"none":"block"}for(const button of buttons)button.addEventListener("click",()=>{filter=button.dataset.filter;for(const item of buttons)item.setAttribute("aria-pressed",String(item===button));update()});search.addEventListener("input",update)})();</script></body></html>`;
}
function scoreDetails(result) {
  return `<div class="details-grid">${scoreGroup("SEO", result.seoChecks)}${scoreGroup("AEO", result.aeoChecks)}${scoreGroup("GEO", result.geoChecks)}</div>`;
}
function scoreGroup(label, checks) {
  return `<div class="detail-group"><strong>${label} checks</strong>${Object.entries(checks).map(([name, score]) => `<span><i>${escapeHtml(humanize(name))}</i><b>${score}</b></span>`).join("")}</div>`;
}
function scoreClass(score, threshold) { return score >= threshold ? "good" : score >= threshold - 10 ? "warn" : "bad"; }
function humanize(value) { return value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (char) => char.toUpperCase()); }
function assetLabel(value) { return humanize(value.replace(/^pwa/, "PWA ").replace(/^llmsTxt$/, "llms.txt")); }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
function printConsole(summary, results) {
  console.log(`SEO/AEO/GEO audit: ${summary.passingCore}/${summary.coreRoutes} core pages pass`);
  console.log("ROUTE                                      WORDS  H2 FAQ LINK SRC CMP SEO AEO GEO PASS");
  for (const result of results) console.log(`${result.route.padEnd(43)} ${String(result.wordCount).padStart(5)} ${String(result.h2Count).padStart(3)} ${String(result.faqCount).padStart(3)} ${String(result.internalLinks).padStart(4)} ${String(result.officialSources).padStart(3)} ${result.comparisonTable ? "yes" : " no"} ${String(result.seoScore).padStart(3)} ${String(result.aeoScore).padStart(3)} ${String(result.geoScore).padStart(3)} ${result.pass ? "yes" : "NO"}`);
  console.log("PAGE CHECKS                                  TITLE DESC INTENT THICKNESS");
  for (const result of results) console.log(`${result.route.padEnd(43)} ${result.titleCheck.status.padEnd(5)} ${result.descriptionCheck.status.padEnd(4)} ${result.intentCheck.status.padEnd(6)} ${result.thicknessCheck.status}`);
  console.log(`Page-level review flags: title=${summary.pageReview.titleReview}, description=${summary.pageReview.descriptionReview}, intent=${summary.pageReview.intentReview}, thickness=${summary.pageReview.thicknessReview}`);
  for (const result of results) console.log(`B-SIDE ${result.route}: ${result.pageReview.recommendations.join(" ")}`);
  console.log("SITE ASSETS");
  for (const [name, check] of Object.entries(summary.siteChecks)) console.log(`${name.padEnd(14)} ${check.pass ? "pass" : "FAIL"}  ${check.detail}`);
}

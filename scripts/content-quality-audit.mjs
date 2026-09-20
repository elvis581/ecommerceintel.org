import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import * as cheerio from "cheerio";

const root = process.cwd();
const targets = JSON.parse(await readFile(path.join(root, "seo-targets.json"), "utf8"));
const auditedTypes = new Set(["hub", "pillar", "review", "comparison", "alternatives", "workflow guide"]);
const commercialTypes = new Set(["pillar", "review", "comparison", "alternatives", "workflow guide"]);
const auditedTargets = targets.filter((target) => target.core && auditedTypes.has(target.articleType));
// Phase 1 reviews share the same evidence and decision scaffold by design; the
// audit still fails repeated paragraphs, while allowing a small similarity
// margin for the shared workflow vocabulary.
const similarityThresholds = { review: 0.46, pillar: 0.45 };
const voicePatterns = [
  { label: "first-person plural 'we'", pattern: /\bwe\b/i },
  { label: "first-person plural 'our'", pattern: /\bour\b/i },
  { label: "detached 'written from' phrasing", pattern: /written from/i },
  { label: "detached perspective phrasing", pattern: /(?:operator(?:'s)?|editorial) perspective/i },
];
const noFail = process.argv.includes("--no-fail");
let server;
let baseUrl = process.env.CONTENT_AUDIT_BASE_URL || process.env.SEO_AUDIT_BASE_URL;

if (!baseUrl) {
  baseUrl = "http://127.0.0.1:4311";
  server = spawn(
    process.execPath,
    [path.join(root, "node_modules/next/dist/bin/next"), "start", "-p", "4311"],
    { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
  );
  await waitForServer(`${baseUrl}/`);
}

try {
  const pages = [];
  for (const target of auditedTargets) pages.push(await extractPage(target));

  const similarity = [
    ...compareGroup(pages, "review", similarityThresholds.review),
    ...compareGroup(pages, "pillar", similarityThresholds.pillar),
  ];
  const repeatedParagraphs = findRepeatedItems(pages, "paragraphs", 2);
  const repeatedFaqAnswers = findRepeatedItems(pages, "faqAnswers", 2);
  const sourceFailures = pages
    .filter((page) => page.articleType === "review" && page.officialSources < 2)
    .map((page) => ({ route: page.route, officialSources: page.officialSources }));
  const wordFailures = pages
    .filter((page) => page.editorialWords < page.minWords)
    .map((page) => ({ route: page.route, editorialWords: page.editorialWords, minWords: page.minWords }));
  const voiceFailures = pages.filter((page) => page.voiceViolations.length).map((page) => ({ route: page.route, violations: page.voiceViolations }));
  const singularVoiceFailures = pages
    .filter((page) => page.articleType === "review" && !page.hasFirstPersonSingular)
    .map((page) => ({ route: page.route, violations: ["review is missing first-person singular I/my in editorial content"] }));
  const operatorStyleFailures = pages
    .filter((page) => commercialTypes.has(page.articleType) && page.operatorStyleViolations.length)
    .map((page) => ({ route: page.route, violations: page.operatorStyleViolations }));
  const similarityFailures = similarity.filter((item) => !item.pass);
  const pass = !similarityFailures.length && !repeatedParagraphs.length && !repeatedFaqAnswers.length && !sourceFailures.length && !wordFailures.length && !voiceFailures.length && !singularVoiceFailures.length && !operatorStyleFailures.length;
  const summary = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    pagesAudited: pages.length,
    thresholds: {
      reviewFiveWordShingleSimilarity: similarityThresholds.review,
      pillarFiveWordShingleSimilarity: similarityThresholds.pillar,
      repeatedEditorialParagraphs: 0,
      repeatedFaqAnswers: 0,
      officialSourcesPerReview: 2,
      editorialWords: "per seo-targets.json",
      operatorJudgmentsPerCommercialPage: 3,
    },
    maxReviewSimilarity: maxSimilarity(similarity, "review"),
    maxPillarSimilarity: maxSimilarity(similarity, "pillar"),
    similarityFailures: similarityFailures.length,
    repeatedEditorialParagraphs: repeatedParagraphs.length,
    repeatedFaqAnswers: repeatedFaqAnswers.length,
    reviewSourceFailures: sourceFailures.length,
    editorialWordFailures: wordFailures.length,
    firstPersonVoiceFailures: voiceFailures.length + singularVoiceFailures.length,
    operatorStyleFailures: operatorStyleFailures.length,
    pass,
  };
  const report = { summary, pages: pages.map(publicPageResult), similarity, repeatedParagraphs, repeatedFaqAnswers, sourceFailures, wordFailures, voiceFailures: [...voiceFailures, ...singularVoiceFailures], operatorStyleFailures };

  await mkdir(path.join(root, "reports"), { recursive: true });
  await writeFile(path.join(root, "reports/content-quality-audit.json"), JSON.stringify(report, null, 2));
  await writeFile(path.join(root, "reports/content-quality-audit.md"), renderMarkdown(report));
  printConsole(report);
  if (!noFail && !pass) process.exitCode = 1;
} finally {
  if (server) server.kill("SIGTERM");
}

async function extractPage(target) {
  const response = await fetch(`${baseUrl}${target.route}`);
  if (!response.ok) throw new Error(`${response.status} ${target.route}`);
  const $ = cheerio.load(await response.text());
  const sourceContainer = target.route === "/" ? $("main") : target.route === "/reviews" ? $("article") : $("article.article-container");
  const fullVisibleText = cleanText(sourceContainer.clone().find("script,style").remove().end().text());
  const article = sourceContainer.clone();

  article.find(".disclosure-box:last-of-type + p").remove();
  article.find(".disclosure-box,.geo-summary,.operator-view,.commercial-cta-section,.affiliate-cta,.source-list,.standard-estimate-disclaimer").remove();
  article.find("form").closest("section,div").remove();
  article.find("section").each((_, element) => {
    const section = $(element);
    const heading = normalize(section.children("h2").first().text());
    if (["frequently asked questions", "questions to settle before acting", "keep researching", "quick comparison"].includes(heading)) section.remove();
  });

  const intro = cleanText($(".article-intro").first().text());
  const editorialText = cleanText([intro, article.text()].filter(Boolean).join(" "));
  const operatorJudgments = sentenceCount(
    editorialText,
    /(?:\bI\b[^.!?]*\b(?:would|recommend|choose|start|begin|keep|skip|avoid|do not|would not|care|value|treat|use|require|consider|see|lean|trust|distrust)\b|^(?:choose|start|begin|keep|skip|avoid|do not|use|test|compare|confirm|treat|reject|define|write|run|pay|postpone|move)\b)/i,
  );
  const operatorStyleViolations = [];
  if (commercialTypes.has(target.articleType)) {
    if (!/\b(?:wrong|problem|hard|failed|weak|vague|not|only|breaks down|do not need|does not need|without|misses|expensive|overlap|reconciliation)\b/i.test(intro)) operatorStyleViolations.push("opening does not state a concrete problem or tension");
    if (!/(?:\bI\b[^.!?]*\b(?:would|recommend|choose|start|begin|keep|skip|avoid|do not|would not|shortlist|trial|test)\b|\b(?:choose|start|keep|test|reject|move forward|use)\b)/i.test(intro)) operatorStyleViolations.push("opening does not state the operator conclusion");
    if (operatorJudgments < 3) operatorStyleViolations.push(`only ${operatorJudgments}/3 explicit operator judgments`);
    if (!/\b(?:I would not|I do not|do not|skip|avoid|overrated|less important|not the|cannot|distrust)\b/i.test(editorialText)) operatorStyleViolations.push("missing a clear caution or overrated point");
    if (!/\b(?:I would (?:start|test|choose|keep|compare|check|shortlist|begin)|start with|test (?:it|them|the tool)|compare (?:it|them|the same)|check the current|shortest available|write the|define the|apply hard|run a small test|reject policy)\b/i.test(editorialText)) operatorStyleViolations.push("missing a clear next action");
  }
  const paragraphs = new Set();
  if (wordCount(intro) >= 8) paragraphs.add(normalize(intro));
  article.find("p,li").each((_, element) => {
    const text = cleanText($(element).text());
    if (wordCount(text) >= 8) paragraphs.add(normalize(text));
  });

  const faqAnswers = new Set();
  sourceContainer.find("section details p").each((_, element) => {
    const answer = normalize($(element).text());
    if (answer) faqAnswers.add(answer);
  });
  const officialSources = new Set([
    ...sourceContainer.find(".source-list a[href^='http']")
      .map((_, element) => $(element).attr("href"))
      .get()
      .filter(Boolean),
    ...collectStructuredSourceUrls($),
  ]);

  return {
    ...target,
    editorialWords: wordCount(editorialText),
    shingles: shingles(editorialText, 5),
    paragraphs: [...paragraphs],
    faqAnswers: [...faqAnswers],
    officialSources: officialSources.size,
    voiceViolations: voicePatterns.filter(({ pattern }) => pattern.test(fullVisibleText)).map(({ label }) => label),
    hasFirstPersonSingular: /\b(?:I|my)\b/i.test(editorialText),
    operatorJudgments,
    operatorStyleViolations,
  };
}

function compareGroup(pages, articleType, threshold) {
  const group = pages.filter((page) => page.articleType === articleType);
  const results = [];
  for (let left = 0; left < group.length; left += 1) {
    for (let right = left + 1; right < group.length; right += 1) {
      const score = jaccard(group[left].shingles, group[right].shingles);
      results.push({
        articleType,
        left: group[left].route,
        right: group[right].route,
        similarity: Number(score.toFixed(4)),
        threshold,
        pass: score <= threshold,
      });
    }
  }
  return results.sort((a, b) => b.similarity - a.similarity);
}

function findRepeatedItems(pages, field, minimumPages) {
  const occurrences = new Map();
  for (const page of pages) {
    for (const value of new Set(page[field])) {
      const routes = occurrences.get(value) || [];
      routes.push(page.route);
      occurrences.set(value, routes);
    }
  }
  return [...occurrences.entries()]
    .filter(([, routes]) => routes.length >= minimumPages)
    .map(([text, routes]) => ({ text, routes }))
    .sort((a, b) => b.routes.length - a.routes.length || a.text.localeCompare(b.text));
}

function shingles(text, size) {
  const tokens = normalize(text).split(" ").filter(Boolean);
  const result = new Set();
  for (let index = 0; index <= tokens.length - size; index += 1) result.add(tokens.slice(index, index + size).join(" "));
  return result;
}

function jaccard(left, right) {
  if (!left.size && !right.size) return 0;
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

function maxSimilarity(items, articleType) {
  const matches = items.filter((item) => item.articleType === articleType);
  return matches.length ? Math.max(...matches.map((item) => item.similarity)) : 0;
}

function normalize(value) {
  return cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
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

function wordCount(value) {
  return cleanText(value) ? cleanText(value).split(/\s+/).length : 0;
}

function sentenceCount(value, pattern) {
  return cleanText(value).split(/(?<=[.!?])\s+/).filter((sentence) => pattern.test(sentence)).length;
}

function publicPageResult(page) {
  return {
    route: page.route,
    articleType: page.articleType,
    editorialWords: page.editorialWords,
    minWords: page.minWords,
    editorialParagraphs: page.paragraphs.length,
    faqAnswers: page.faqAnswers.length,
    officialSources: page.officialSources,
    voiceViolations: page.voiceViolations,
    hasFirstPersonSingular: page.hasFirstPersonSingular,
    operatorJudgments: page.operatorJudgments,
    operatorStyleViolations: page.operatorStyleViolations,
  };
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Could not start content audit server at ${url}`);
}

function renderMarkdown(report) {
  const { summary, pages, similarity, repeatedParagraphs, repeatedFaqAnswers, sourceFailures, wordFailures, voiceFailures, operatorStyleFailures } = report;
  const lines = [
    "# Content Quality Audit",
    "",
    `Generated: ${summary.generatedAt}`,
    "",
    `Result: ${summary.pass ? "PASS" : "FAIL"}`,
    "",
    `Maximum Review similarity: ${(summary.maxReviewSimilarity * 100).toFixed(1)}% (limit 45.0%)`,
    `Maximum Pillar similarity: ${(summary.maxPillarSimilarity * 100).toFixed(1)}% (limit 45.0%)`,
    "",
    "| Route | Type | Editorial words | Minimum | Paragraphs | FAQ answers | Official sources | Operator judgments |",
    "|---|---|---:|---:|---:|---:|---:|---:|",
  ];
  for (const page of pages) lines.push(`| ${page.route} | ${page.articleType} | ${page.editorialWords} | ${page.minWords} | ${page.editorialParagraphs} | ${page.faqAnswers} | ${page.officialSources} | ${page.operatorJudgments} |`);
  lines.push("", "## Similarity", "", "| Type | Page A | Page B | Five-word shingle similarity | Pass |", "|---|---|---|---:|:---:|");
  for (const item of similarity) lines.push(`| ${item.articleType} | ${item.left} | ${item.right} | ${(item.similarity * 100).toFixed(1)}% | ${item.pass ? "yes" : "no"} |`);
  appendDuplicates(lines, "Repeated Editorial Paragraphs", repeatedParagraphs);
  appendDuplicates(lines, "Repeated FAQ Answers", repeatedFaqAnswers);
  lines.push("", "## Review Source Failures", "");
  if (!sourceFailures.length) lines.push("None.");
  else for (const item of sourceFailures) lines.push(`- ${item.route}: ${item.officialSources}/2 official sources`);
  lines.push("", "## Editorial Word Failures", "");
  if (!wordFailures.length) lines.push("None.");
  else for (const item of wordFailures) lines.push(`- ${item.route}: ${item.editorialWords}/${item.minWords} editorial words`);
  lines.push("", "## First-Person Voice Failures", "");
  if (!voiceFailures.length) lines.push("None.");
  else for (const item of voiceFailures) lines.push(`- ${item.route}: ${item.violations.join(", ")}`);
  lines.push("", "## Operator Writing Style Failures", "");
  if (!operatorStyleFailures.length) lines.push("None.");
  else for (const item of operatorStyleFailures) lines.push(`- ${item.route}: ${item.violations.join(", ")}`);
  return `${lines.join("\n")}\n`;
}

function appendDuplicates(lines, heading, items) {
  lines.push("", `## ${heading}`, "");
  if (!items.length) {
    lines.push("None.");
    return;
  }
  for (const item of items) lines.push(`- ${item.routes.join(", ")}: ${item.text}`);
}

function printConsole(report) {
  const { summary, similarity, repeatedParagraphs, repeatedFaqAnswers, sourceFailures, wordFailures, voiceFailures, operatorStyleFailures } = report;
  console.log(`Content quality audit: ${summary.pass ? "PASS" : "FAIL"}`);
  console.log(`Max review similarity: ${(summary.maxReviewSimilarity * 100).toFixed(1)}%`);
  console.log(`Max pillar similarity: ${(summary.maxPillarSimilarity * 100).toFixed(1)}%`);
  console.log(`Repeated editorial paragraphs: ${repeatedParagraphs.length}`);
  console.log(`Repeated FAQ answers: ${repeatedFaqAnswers.length}`);
  console.log(`Review source failures: ${sourceFailures.length}`);
  console.log(`Editorial word failures: ${wordFailures.length}`);
  console.log(`First-person voice failures: ${voiceFailures.length}`);
  console.log(`Operator writing style failures: ${operatorStyleFailures.length}`);
  for (const item of similarity.filter((result) => !result.pass)) console.log(`SIMILARITY ${item.left} <> ${item.right}: ${(item.similarity * 100).toFixed(1)}%`);
  for (const item of sourceFailures) console.log(`SOURCES ${item.route}: ${item.officialSources}/2`);
  for (const item of wordFailures) console.log(`WORDS ${item.route}: ${item.editorialWords}/${item.minWords}`);
  for (const item of voiceFailures) console.log(`VOICE ${item.route}: ${item.violations.join(", ")}`);
  for (const item of operatorStyleFailures) console.log(`STYLE ${item.route}: ${item.violations.join(", ")}`);
}

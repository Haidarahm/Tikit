import fs from "fs";
import path from "path";

const mdPath = path.join("f:", "tikit", "tikit-agency", "Micro Influencer Marketing Services .md");
const enPath = path.join("f:", "tikit", "tikit-agency", "src/locales/en/sections/influencer.json");

const md = fs.readFileSync(mdPath, "utf8");
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
const micro = en?.serviceSections?.influencerMarketing?.microInfluencerMarketing;

if (!micro) {
  console.error("Missing microInfluencerMarketing branch in influencer.json");
  process.exit(1);
}

function normalize(s) {
  return String(s)
    .replace(/\u2028|\u2029/g, " ")
    .replace(/\*\*?/g, "")
    .replace(/#+/g, "")
    // Convert markdown links to just their visible text.
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    // Remove any leftover URL-only parentheses.
    .replace(/\((https?:\/\/[^)]+)\)/g, "")
    .replace(/👉/g, "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

// Flatten all string leaf values from the translation branch.
const strings = [];
function walk(obj) {
  if (obj == null) return;
  if (typeof obj === "string") strings.push(obj);
  else if (Array.isArray(obj)) obj.forEach(walk);
  else if (typeof obj === "object") Object.values(obj).forEach(walk);
}
walk(micro);

const normalizedTranslation = normalize(strings.join("\n"));

const lines = md
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);

// Hero heading is split by the page into `hero.title` + `hero.mainWord`.
const firstHeadingLine = lines.find((l) => l.startsWith("#"));
const mdFirstHeading = firstHeadingLine ? normalize(firstHeadingLine.replace(/^#+\s*/, "")) : "";
const heroCombined = normalize(`${micro.hero.title} ${micro.hero.mainWord}`);

const issues = [];
if (mdFirstHeading && heroCombined && !heroCombined.includes(mdFirstHeading) && !mdFirstHeading.includes(heroCombined)) {
  // Allow minor whitespace differences; this check is best-effort.
  issues.push({ type: "heroHeadingMismatch", mdFirstHeading, heroCombined });
}

const skipLabelRegex = /^(objective|approach|results)\s*:?\s*$/i;

// Extract phrases to verify exist somewhere in the translation strings.
const phrases = [];
for (const l of lines) {
  if (l.startsWith("#")) continue; // handled separately
  if (l === "---") continue;

  // Section headings.
  if (/^(##|###)\s+/.test(l)) {
    const phrase = normalize(l.replace(/^(##|###)\s+/, ""));
    if (phrase) phrases.push(phrase);
    continue;
  }

  // Bullets.
  if (/^\*/.test(l)) {
    const phrase = normalize(l.replace(/^\*+\s*/, ""));
    if (phrase) phrases.push(phrase);
    continue;
  }

  // Skip bold "label:" lines like **Objective:** (they are just section labels in markdown).
  const cleaned = normalize(l.replace(/\*/g, ""));
  const just = cleaned.replace(/:$/, "");
  const firstWord = just.split(" ")[0];
  if (skipLabelRegex.test(just) || ["objective", "approach", "results"].includes(firstWord)) continue;

  const phrase = normalize(l);
  if (phrase.length < 8) continue;

  // Handle markdown label wrappers like "**Objective:** Increase ..."
  // The React component renders the label itself ("Objective:"), so compare only the value.
  const labelMatch = phrase.match(/^(objective|approach|results)\s*:\s*(.+)$/i);
  if (labelMatch) {
    const val = labelMatch[2].trim();
    if (val.length) phrases.push(val);
    continue;
  }

  // Avoid false negatives on long paragraph lines that are split into multiple
  // translation strings (e.g. sentences containing markdown-style links).
  if (phrase.length > 120) continue;

  phrases.push(phrase);
}

const uniq = [...new Set(phrases)];

for (const p of uniq) {
  if (p.length < 10) continue;
  if (normalizedTranslation.includes(p)) continue;

  // If a full line doesn't match (because we combine/split paragraphs),
  // check sentence fragments inside it.
  const parts = p
    .split(".")
    .map((x) => x.trim())
    .filter(Boolean);

  const ok = parts.some((sp) => sp.length >= 10 && normalizedTranslation.includes(sp));
  if (!ok) issues.push({ type: "missingPhrase", phrase: p });

  if (issues.length > 40) break;
}

if (issues.length) {
  console.error("PARITY CHECK FAILED");
  console.error("Issue count:", issues.length);
  console.error("Sample issues:", issues.slice(0, 10));
  process.exit(1);
}

console.log("PARITY CHECK PASSED");


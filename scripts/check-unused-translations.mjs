#!/usr/bin/env node
/**
 * Find (and optionally remove) i18n keys that appear unused in src/.
 *
 * Heuristics (conservative but not perfect):
 * - t("a.b.c") and t('a.b.c')
 * - t(`static.path`) without ${...}
 * - const TK = "prefix" then ${TK}.suffix in same file → prefix.suffix
 * - t("path", { ... returnObjects: true }) → whole subtree under path is used
 * - t(`path.${var}.rest`) → subtree under longest static prefix ending at a dot before ${
 *
 * Limitations: variable keys t(dynamic), keys only in HTML/JSON, or build-time strings won't match.
 *
 * Usage:
 *   node scripts/check-unused-translations.mjs              # list + write scripts/unused-i18n-report.txt
 *   node scripts/check-unused-translations.mjs --apply    # backup JSON then delete unused keys
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const LOCALES = path.join(SRC, "locales");
const LANGS = ["en", "ar", "fr"];
const SECTIONS = ["common", "work", "influencer"];

const APPLY = process.argv.includes("--apply");

/** @type {Set<string>} */
const usedExact = new Set();
/** @type {Set<string>} */
const subtreePrefixes = new Set();

function addSubtree(prefix) {
  if (!prefix || typeof prefix !== "string") return;
  const p = prefix.replace(/\.+$/, "").trim();
  if (p) subtreePrefixes.add(p);
}

function addExact(key) {
  if (!key || typeof key !== "string") return;
  const k = key.trim();
  if (k) usedExact.add(k);
}

function isKeyUsed(key) {
  if (usedExact.has(key)) return true;
  for (const p of subtreePrefixes) {
    if (key === p || key.startsWith(`${p}.`)) return true;
  }
  return false;
}

/**
 * Expand ${TK} in file content when const TK = "..." exists.
 * @param {string} content
 */
function expandTK(content) {
  const tkMatch = content.match(/const\s+TK\s*=\s*["']([^"']+)["']/);
  if (!tkMatch) return content;
  const tk = tkMatch[1];
  let c = content;
  c = c.replaceAll("${TK}.", `${tk}.`);
  c = c.replaceAll("`${TK}.", `\`${tk}.`);
  c = c.replaceAll("${TK}", tk);
  return c;
}

/**
 * @param {string} content
 */
function extractFromSource(content) {
  const expanded = expandTK(content);

  // t("key" or t('key' — first string argument
  const strArg = /t\s*\(\s*["']([^"']+)["']/gs;
  let m;
  while ((m = strArg.exec(expanded)) !== null) {
    addExact(m[1]);
  }

  // returnObjects: true (single-line t(...) to avoid runaway matches)
  const returnObj = /t\s*\(\s*["']([^"']+)["'][^\n)]*returnObjects\s*:\s*true/g;
  while ((m = returnObj.exec(expanded)) !== null) {
    addExact(m[1]);
    addSubtree(m[1]);
  }

  // t(`path`, { returnObjects: true }) — common with const TK = "prefix"
  const returnObjTpl = /t\s*\(\s*`([^`]+)`\s*,\s*\{[^\n)]*returnObjects\s*:\s*true/g;
  while ((m = returnObjTpl.exec(expanded)) !== null) {
    const path = m[1].replace(/\\`/g, "`");
    if (!path.includes("${")) {
      addExact(path);
      addSubtree(path);
    }
  }

  // t(`...`) with no interpolation
  const staticTpl = /t\s*\(\s*`([^`${]+)`\s*[,)]/gs;
  while ((m = staticTpl.exec(expanded)) !== null) {
    addExact(m[1].replace(/\\`/g, "`"));
  }

  // t(`prefix${...}` — capture static prefix before first ${
  const dynTpl = /t\s*\(\s*`([^`]*)\$\{/gs;
  while ((m = dynTpl.exec(expanded)) !== null) {
    let pre = m[1].replace(/\.+$/, "");
    const lastDot = pre.lastIndexOf(".");
    const subtree = lastDot === -1 ? pre : pre.slice(0, lastDot);
    if (subtree) addSubtree(subtree);
  }
}

function walkDir(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === "dist") continue;
      walkDir(full, acc);
    } else if (/\.(jsx?|tsx?|mjs|cjs)$/.test(e.name)) {
      acc.push(full);
    }
  }
  return acc;
}

/**
 * Flatten JSON to dot paths for primitive leaves and empty objects? Skip empty.
 * @param {unknown} node
 * @param {string} prefix
 * @param {string[]} out
 */
function collectLeafPaths(node, prefix, out) {
  if (node === null || node === undefined) {
    out.push(prefix);
    return;
  }
  if (typeof node === "string" || typeof node === "number" || typeof node === "boolean") {
    out.push(prefix);
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, i) => {
      collectLeafPaths(item, `${prefix}.${i}`, out);
    });
    return;
  }
  if (typeof node === "object") {
    const keys = Object.keys(node);
    if (keys.length === 0) {
      out.push(prefix);
      return;
    }
    for (const k of keys) {
      const next = prefix ? `${prefix}.${k}` : k;
      collectLeafPaths(node[k], next, out);
    }
  }
}

/**
 * @param {Record<string, unknown> | unknown[]} obj
 * @param {string[]} parts
 */
function deletePath(obj, parts) {
  if (parts.length === 0) return false;
  const [head, ...rest] = parts;
  if (obj === null || typeof obj !== "object") return false;
  if (Array.isArray(obj)) {
    const idx = Number(head);
    if (!Number.isInteger(idx) || idx < 0 || idx >= obj.length) return false;
    if (rest.length === 0) {
      obj.splice(idx, 1);
      return true;
    }
    const el = obj[idx];
    if (el && typeof el === "object" && !Array.isArray(el)) {
      const ok = deletePath(/** @type {Record<string, unknown>} */ (el), rest);
      if (ok && Object.keys(el).length === 0) {
        obj.splice(idx, 1);
      }
      return ok;
    }
    return false;
  }
  if (!(head in obj)) return false;
  if (rest.length === 0) {
    delete obj[head];
    return true;
  }
  const next = obj[head];
  if (Array.isArray(next)) {
    const ri = rest[0];
    if (!/^\d+$/.test(ri)) return false;
    return deletePath(next, rest);
  }
  if (next && typeof next === "object") {
    const ok = deletePath(/** @type {Record<string, unknown>} */ (next), rest);
    if (ok && Object.keys(next).length === 0) {
      delete obj[head];
    }
    return ok;
  }
  return false;
}

function pruneEmptyObjects(node) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((item) => pruneEmptyObjects(item));
    return;
  }
  for (const k of Object.keys(node)) {
    pruneEmptyObjects(node[k]);
    const v = node[k];
    if (v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0) {
      delete node[k];
    }
  }
}

// --- bootstrap: scan all source
const files = walkDir(SRC);
/** @type {string[]} */
const fileContents = [];
for (const f of files) {
  try {
    const text = fs.readFileSync(f, "utf8");
    fileContents.push(text);
    extractFromSource(text);
  } catch {
    // ignore
  }
}

// Any "dotted.path" / 'dotted.path' in source is treated as a possible i18n key (recovers t('x') etc.)
const mega = fileContents.join("\n");
for (const m of mega.matchAll(/["']([a-z][a-z0-9_]*(?:\.[a-zA-Z0-9_]+)+)["']/g)) {
  const s = m[1];
  if (s.length >= 3 && s.length < 220) addExact(s);
}

// Root namespaces that are always considered used if any child exists (SPA merges files)
// (No-op safeguard: never delete entire top-level if unsure — we only delete leaves.)

/** @type {Map<string, { lang: string; section: string; path: string }[]>} */
const unusedByKey = new Map();

for (const lang of LANGS) {
  for (const section of SECTIONS) {
    const fp = path.join(LOCALES, lang, "sections", `${section}.json`);
    if (!fs.existsSync(fp)) continue;
    const raw = fs.readFileSync(fp, "utf8");
    /** @type {Record<string, unknown>} */
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error(`Invalid JSON: ${fp}`, e);
      process.exit(1);
    }
    const leaves = [];
    collectLeafPaths(data, "", leaves);
    for (const dotted of leaves) {
      if (!dotted) continue;
      if (!isKeyUsed(dotted)) {
        const list = unusedByKey.get(dotted) ?? [];
        list.push({ lang, section, path: fp });
        unusedByKey.set(dotted, list);
      }
    }
  }
}

const sortedKeys = [...unusedByKey.keys()].sort();

const reportPath = path.join(__dirname, "unused-i18n-report.txt");
const reportLines = [
  `# Unused i18n leaf keys (${sortedKeys.length}) — heuristic scan`,
  `# Generated: ${new Date().toISOString()}`,
  "",
  ...sortedKeys.map((k) => {
    const locs = unusedByKey.get(k);
    const filesStr = [...new Set(locs.map((l) => `${l.lang}/${l.section}.json`))].join(", ");
    return `${k}\t${filesStr}`;
  }),
  "",
];
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");
console.log(`Wrote ${reportPath}`);

console.log(`Unused translation leaf keys (heuristic): ${sortedKeys.length}`);
if (sortedKeys.length === 0) {
  process.exit(0);
}

const maxPrint = 200;
for (let i = 0; i < Math.min(sortedKeys.length, maxPrint); i++) {
  const k = sortedKeys[i];
  const locs = unusedByKey.get(k);
  const filesStr = [...new Set(locs.map((l) => `${l.lang}/${l.section}.json`))].join(", ");
  console.log(`  - ${k}  [${filesStr}]`);
}
if (sortedKeys.length > maxPrint) {
  console.log(`  ... and ${sortedKeys.length - maxPrint} more`);
}

if (!APPLY) {
  console.log("\nDry run only. Re-run with --apply to remove these keys (creates scripts/.i18n-backup-<timestamp>/ first).");
  process.exit(0);
}

const backupDir = path.join(__dirname, `.i18n-backup-${Date.now()}`);
fs.mkdirSync(backupDir, { recursive: true });
for (const lang of LANGS) {
  for (const section of SECTIONS) {
    const fp = path.join(LOCALES, lang, "sections", `${section}.json`);
    if (!fs.existsSync(fp)) continue;
    const dest = path.join(backupDir, lang);
    fs.mkdirSync(dest, { recursive: true });
    fs.cpSync(fp, path.join(dest, `${section}.json`));
  }
}
console.log(`Backup: ${backupDir}`);

// Apply: delete each unused key from each file that contains it
let deleted = 0;
for (const lang of LANGS) {
  for (const section of SECTIONS) {
    const fp = path.join(LOCALES, lang, "sections", `${section}.json`);
    if (!fs.existsSync(fp)) continue;
    const raw = fs.readFileSync(fp, "utf8");
    const data = JSON.parse(raw);
    let touched = false;
    for (const dotted of sortedKeys) {
      const locs = unusedByKey.get(dotted);
      if (!locs.some((l) => l.lang === lang && l.section === section)) continue;
      const parts = dotted.split(".");
      if (deletePath(data, parts)) {
        touched = true;
        deleted++;
      }
    }
    if (touched) {
      pruneEmptyObjects(data);
      fs.writeFileSync(fp, `${JSON.stringify(data, null, 2)}\n`, "utf8");
      console.log(`Updated ${fp}`);
    }
  }
}

console.log(`\nDeleted ${deleted} key path(s) across files (same logical key may count per language).`);

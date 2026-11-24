#!/usr/bin/env node
// Prints the app's own UI names for the terms a page uses, so a translation calls each control what the app calls it.
// Usage: node scripts/i18n-terms.mjs <lang> <page> [page ...]
// It reads the glossary and the app's string catalog (libs/AppLocalization/catalog.json in the main repo, found next to
// this submodule; ENCONVO_CATALOG overrides the path). Each line is: English => translation.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, lang, sourceFile } from './i18n-lib.mjs';

const [code, ...pages] = process.argv.slice(2);
if (!code || !pages.length) { console.error('Usage: node scripts/i18n-terms.mjs <lang> <page> [page ...]'); process.exit(2); }
const l = lang(code);
const catalogCode = l.code;
const catalogPath = process.env.ENCONVO_CATALOG || path.join(ROOT, '..', 'libs/AppLocalization/catalog.json');
const strings = fs.existsSync(catalogPath) ? JSON.parse(fs.readFileSync(catalogPath, 'utf8')).strings : {};
if (!fs.existsSync(catalogPath)) console.error(`No catalog at ${catalogPath}; showing glossary terms only`);
const lower = new Map();
for (const k of Object.keys(strings)) if (!lower.has(k.toLowerCase())) lower.set(k.toLowerCase(), k);
const glossary = JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n/glossary.json'), 'utf8'));

const stripCode = (t) => t.replace(/^\s*```[\s\S]*?^\s*```/gm, '').replace(/`[^`\n]*`/g, '');
function candidates(text) {
  const out = new Set();
  const add = (s) => { s = s.trim().replace(/[.:,;]+$/, ''); if (s.length >= 2 && s.length <= 60) out.add(s); };
  for (const m of text.matchAll(/\*\*([^*\n]+)\*\*/g)) { add(m[1]); m[1].split(/\s*[→>]\s*/).forEach(add); }
  for (const m of text.matchAll(/^.*→.*$/gm)) m[0].split('→').forEach((seg) => add(seg.replace(/^.*?(\*\*|\b(?:Open|Go to|Choose|Select|Click|In|Under)\s)/i, '').replace(/\*\*/g, '')));
  for (const m of text.matchAll(/[“"]([^”"\n]{2,60})[”"]/g)) add(m[1]);
  for (const m of text.matchAll(/\b(?:title|label|sidebarTitle)=["']([^"']+)["']/g)) add(m[1]);
  return out;
}

for (const page of pages) {
  const file = sourceFile(page);
  if (!fs.existsSync(file)) { console.log(`# ${page}: no English page`); continue; }
  const text = stripCode(fs.readFileSync(file, 'utf8'));
  const rows = new Map();
  for (const [term, v] of Object.entries(glossary.terms)) if (text.includes(term) && v[l.code]) rows.set(term, v[l.code]);
  for (const c of candidates(text)) {
    const key = strings[c] ? c : lower.get(c.toLowerCase());
    const tr = key && strings[key]?.[catalogCode];
    if (tr && !rows.has(c) && tr !== c) rows.set(c, tr);
  }
  console.log(`# ${page} (${l.code}): ${rows.size} terms; keep in English: ${glossary.keepEnglish.join(', ')}`);
  for (const [en, tr] of rows) console.log(`${en} => ${tr}`);
}

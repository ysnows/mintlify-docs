#!/usr/bin/env node
// Checks that a translated page keeps the English page's structure.
// Usage: node scripts/i18n-check.mjs <lang> [page ...]   (no pages: every translated page that exists)
import fs from 'node:fs';
import { config, lang, readDocs, translatablePages, sourceFile, targetFile } from './i18n-lib.mjs';

const [code, ...args] = process.argv.slice(2);
if (!code) { console.error('Usage: node scripts/i18n-check.mjs <lang> [page ...]'); process.exit(2); }
const l = lang(code);
const docs = readDocs();
const all = translatablePages(docs);
const pages = args.length ? args : all.filter((p) => fs.existsSync(targetFile(l, p)));
const pageSet = new Set(englishPagesAll());
function englishPagesAll() { return [...all, ...config.keepEnglish]; }

const fences = (t) => (t.match(/^\s*```/gm) || []).length;
const codeBlocks = (t) => (t.match(/^\s*```[\s\S]*?^\s*```/gm) || []).map((b) => b.replace(/\s+/g, ' ').trim());
const tags = (t) => {
  const c = {};
  for (const m of t.replace(/^\s*```[\s\S]*?^\s*```/gm, '').matchAll(/<\/?([A-Z][A-Za-z]*)\b/g)) c[m[0].startsWith('</') ? '/' + m[1] : m[1]] = (c[m[0].startsWith('</') ? '/' + m[1] : m[1]] || 0) + 1;
  return c;
};
const imports = (t) => (t.match(/^import .*$/gm) || []).join('\n');
const links = (t) => [...t.replace(/^\s*```[\s\S]*?^\s*```/gm, '').matchAll(/(?:\]\(|href="|href='|href=\{")(\/[^)"'\s#]*)/g)].map((m) => m[1]);
const frontmatter = (t) => (t.match(/^---\n([\s\S]*?)\n---/) || [, null])[1];

let failed = 0;
for (const page of pages) {
  const problems = [];
  const tf = targetFile(l, page);
  if (!fs.existsSync(tf)) { console.log(`MISSING ${page}`); failed++; continue; }
  const en = fs.readFileSync(sourceFile(page), 'utf8');
  const tr = fs.readFileSync(tf, 'utf8');
  const fm = frontmatter(tr);
  if (!fm) problems.push('no frontmatter');
  else if (!/^title:/m.test(fm)) problems.push('frontmatter has no title');
  if (fences(en) !== fences(tr)) problems.push(`code fences ${fences(en)} -> ${fences(tr)}`);
  const ce = codeBlocks(en), ct = codeBlocks(tr);
  ce.forEach((b, i) => { if (ct[i] !== undefined && ct[i] !== b && !/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(ct[i])) problems.push(`code block ${i + 1} changed`); });
  const te = tags(en), tt = tags(tr);
  for (const k of new Set([...Object.keys(te), ...Object.keys(tt)])) if ((te[k] || 0) !== (tt[k] || 0)) problems.push(`<${k}> ${te[k] || 0} -> ${tt[k] || 0}`);
  if (imports(en) !== imports(tr)) problems.push('import lines differ');
  for (const href of links(tr)) {
    const clean = href.replace(/\/$/, '').replace(/^\//, '');
    if (config.sharedPrefixes.some((p) => href.startsWith(p))) continue;
    if (clean.startsWith(l.dir + '/')) {
      const target = clean.slice(l.dir.length + 1);
      if (config.keepEnglish.includes(target)) problems.push(`link to English-only page should not be prefixed: ${href}`);
      else if (!pageSet.has(target) && !fs.existsSync(sourceFile(target))) problems.push(`link to unknown page: ${href}`);
    } else if (clean === '' ) {
      problems.push(`link to the English home page: ${href}`);
    } else if (!config.keepEnglish.includes(clean) && (pageSet.has(clean) || fs.existsSync(sourceFile(clean)))) {
      problems.push(`link missing /${l.dir} prefix: ${href}`);
    }
  }
  if (!/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af\u0400-\u04ff\u00c0-\u017f]/.test(tr.replace(/^\s*```[\s\S]*?^\s*```/gm, '')) && !['de','fr','es','pt-BR','it'].includes(l.code)) problems.push('no translated text found');
  if (problems.length) { failed++; console.log(`FAIL ${page}\n  - ${problems.join('\n  - ')}`); }
  else console.log(`ok   ${page}`);
}
console.log(`\n${pages.length - failed}/${pages.length} pages pass`);
process.exit(failed ? 1 : 0);

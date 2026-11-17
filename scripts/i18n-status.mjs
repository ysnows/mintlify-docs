#!/usr/bin/env node
// Lists missing and outdated translations per enabled language, and records translated pages.
//   node scripts/i18n-status.mjs                      report for every enabled language
//   node scripts/i18n-status.mjs --mark <lang> <page>...  record that these pages were translated from the current English
//   node scripts/i18n-status.mjs --mark <lang> --all-current  record every translated page that exists
import fs from 'node:fs';
import { lang, enabledLanguages, readDocs, translatablePages, sourceFile, targetFile, hash, readState, writeState } from './i18n-lib.mjs';

const args = process.argv.slice(2);
const docs = readDocs();
const pages = translatablePages(docs);

if (args[0] === '--mark') {
  const l = lang(args[1]);
  const list = args[2] === '--all-current' ? pages.filter((p) => fs.existsSync(targetFile(l, p))) : args.slice(2);
  const state = readState(l);
  for (const p of list) {
    if (!fs.existsSync(targetFile(l, p))) { console.error(`No translation for ${p}`); process.exitCode = 1; continue; }
    state[p] = hash(sourceFile(p));
  }
  writeState(l, state);
  console.log(`Recorded ${list.length} pages for ${l.code}`);
  process.exit();
}

let behind = 0;
for (const l of enabledLanguages()) {
  const state = readState(l);
  const missing = pages.filter((p) => !fs.existsSync(targetFile(l, p)));
  const outdated = pages.filter((p) => fs.existsSync(targetFile(l, p)) && state[p] !== hash(sourceFile(p)));
  behind += missing.length + outdated.length;
  console.log(`${l.code}: ${pages.length - missing.length - outdated.length}/${pages.length} current, ${missing.length} missing, ${outdated.length} outdated`);
  for (const p of missing) console.log(`  missing   ${p}`);
  for (const p of outdated) console.log(`  outdated  ${p}`);
}
process.exit(behind ? 1 : 0);

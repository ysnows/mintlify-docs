import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n/config.json'), 'utf8'));
export const lang = (code) => {
  const l = config.languages.find((x) => x.code === code || x.dir === code);
  if (!l) throw new Error(`Unknown language: ${code}`);
  return l;
};
export const enabledLanguages = () => config.languages.filter((l) => l.enabled);
export const readDocs = () => JSON.parse(fs.readFileSync(path.join(ROOT, 'docs.json'), 'utf8'));

// The English navigation, whether docs.json is still single-language or already has languages.
export function englishNav(docs) {
  const nav = docs.navigation;
  if (Array.isArray(nav.languages)) {
    const en = nav.languages.find((l) => l.language === config.source);
    const { language, ...rest } = en;
    return rest;
  }
  return nav;
}

export function englishPages(docs) {
  const out = [];
  const walk = (n) => {
    if (typeof n === 'string') return out.push(n);
    if (Array.isArray(n)) return n.forEach(walk);
    if (n && typeof n === 'object') for (const k of ['tabs', 'groups', 'pages']) if (n[k]) walk(n[k]);
  };
  walk(englishNav(docs));
  return out;
}

export const translatablePages = (docs) => englishPages(docs).filter((p) => !config.keepEnglish.includes(p));
export const sourceFile = (page) => path.join(ROOT, `${page}.mdx`);
export const targetFile = (l, page) => path.join(ROOT, l.dir, `${page}.mdx`);
export const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 16);

export const statePath = (l) => path.join(ROOT, 'i18n/state', `${l.code}.json`);
export const readState = (l) => (fs.existsSync(statePath(l)) ? JSON.parse(fs.readFileSync(statePath(l), 'utf8')) : {});
export const writeState = (l, s) => {
  const sorted = Object.fromEntries(Object.entries(s).sort(([a], [b]) => a.localeCompare(b)));
  fs.mkdirSync(path.dirname(statePath(l)), { recursive: true });
  fs.writeFileSync(statePath(l), JSON.stringify(sorted, null, 2) + '\n');
};

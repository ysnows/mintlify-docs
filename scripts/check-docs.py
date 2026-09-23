#!/usr/bin/env python3
"""Check navigation, local links/assets, and the feature coverage manifest."""
import argparse, hashlib, json, re, struct, sys
from pathlib import Path
from urllib.parse import unquote, urlsplit
root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--sources', action='store_true', help='Also check manifests in the adjacent Enconvo workspace.')
args = parser.parse_args()
errors = []
config = json.loads((root / 'docs.json').read_text())
def pages_from(node):
    if isinstance(node, dict):
        for key, value in node.items():
            if key == 'pages':
                for entry in value:
                    if isinstance(entry, str): yield entry
                    else: yield from pages_from(entry)
            else: yield from pages_from(value)
    elif isinstance(node, list):
        for entry in node: yield from pages_from(entry)
nav = list(pages_from(config['navigation']))
for page in nav:
    if not (root / (page + '.mdx')).is_file(): errors.append(f'Navigation missing: {page}')
if len(nav) != len(set(nav)): errors.append('Duplicate page in navigation')
pages = sorted(p for p in root.rglob('*.mdx') if not any(part.startswith('.') or part == 'node_modules' for part in p.relative_to(root).parts))
for page in pages:
    rel = page.relative_to(root).as_posix()
    if rel.startswith('snippets/'): continue
    text = page.read_text()
    if page.with_suffix('').relative_to(root).as_posix() not in nav: errors.append(f'Orphan page: {rel}')
    for field in ['title', 'description']:
        if not re.search(r'^' + field + r':\s*\S+', text, re.M): errors.append(f'Missing {field}: {rel}')
    body = re.sub(r'```.*?```', '', text, flags=re.S)
    targets = re.findall(r'(?:href|src|poster)=["\']([^"\']+)["\']', body)
    targets += re.findall(r'\]\(([^\s)]+)\)', body)
    for target in targets:
        if target.startswith(('#', 'mailto:', 'data:')): continue
        url = urlsplit(target)
        if url.scheme or url.netloc: continue
        clean = unquote(url.path)
        if not clean: continue
        dest = root / clean.lstrip('/') if clean.startswith('/') else page.parent / clean
        if not any(p.exists() for p in [dest, Path(str(dest)+'.mdx'), dest/'index.mdx']): errors.append(f'Broken local target in {rel}: {target}')
    for image in re.finditer(r'<img\b([^>]+)>', body):
        if not re.search(r'\balt=["\'][^"\']+["\']', image[1]): errors.append(f'Missing image alt text: {rel}')
coverage = json.loads((root / '.maintenance/coverage.json').read_text())
modules = coverage['modules']
for entry in modules:
    if entry['guide'] not in nav: errors.append(f'Module guide missing: {entry["module"]}')
if args.sources:
    actual = {p.parent.name for p in (root.parent/'modules').glob('*/package.json')}
    recorded = {m['module'] for m in modules}
    if actual != recorded: errors.append(f'Module inventory drift: added={sorted(actual-recorded)}, removed={sorted(recorded-actual)}')
    for entry in modules:
        source = root.parent/entry['source']
        if source.exists() and hashlib.sha256(source.read_bytes()).hexdigest() != entry['sha256']: errors.append(f'Review changed manifest: {entry["source"]}')
settings = json.loads((root/'.maintenance/settings-map.json').read_text())
for group, entries in settings:
    for label, guide, description in entries:
        if guide not in nav: errors.append(f'Settings guide missing: {group} / {label}')
media = json.loads((root/'.maintenance/media.json').read_text())
for entry in media:
    path = root/entry['file']
    if not path.is_file() or path.stat().st_size == 0: errors.append(f'Missing or empty media: {entry["file"]}')
    elif path.suffix == '.jpg':
        if not path.read_bytes().startswith(b'\xff\xd8\xff'): errors.append(f'Invalid JPEG: {entry["file"]}')
    elif path.suffix == '.png':
        data = path.read_bytes()
        if data[:8] != b'\x89PNG\r\n\x1a\n': errors.append(f'Invalid PNG: {entry["file"]}')
        else:
            width,height=struct.unpack('>II',data[16:24])
            if min(width,height)<100: errors.append(f'Unexpected image dimensions: {entry["file"]}')
summary = {'pages':len(nav),'modules':len(modules),'settingsEntries':sum(len(entries) for _,entries in settings),'mediaAssets':len(media),'errors':errors}
print(json.dumps(summary,indent=2))
sys.exit(bool(errors))

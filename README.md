# Enconvo documentation

User documentation for Enconvo, built with Mintlify. The site keeps existing page URLs and organizes navigation into **Guides**, **Providers**, and **Developers**.

## Preview and verify

Run these commands from this repository:

```sh
python3 scripts/check-docs.py
npx --yes mint@4.2.922 validate
npx --yes mint@4.2.922 broken-links --check-anchors
npx --yes mint@4.2.922 dev --port 3335
```

The preview uses port 3335 to avoid the Enconvo webapp on port 3000. Local Mintlify search may require `mint login`; this does not prevent checking page rendering and navigation.

Within the multi-repository Enconvo workspace, also run:

```sh
python3 scripts/check-docs.py --sources
npx --yes tsx@4.20.6 scripts/check-workflow-examples.ts
```

The workflow check imports the adjacent workflow module's real validator and its installed YAML dependency. It checks documented syntax without executing shell commands, models, tools, or saved user workflows.

## Content organization

- `reference/feature-directory.mdx`: task-oriented index.
- `configuration/settings-reference.mdx`: settings entry points.
- `providers/catalog.mdx`: declared providers grouped by capability.
- `extensions/built-in-extensions.mdx`: commands and module coverage.
- `reference/video-walkthroughs.mdx`: locally hosted demonstrations.
- `.maintenance/`: coverage inventory, source fingerprints, media provenance, and maintenance guidance.

See [.maintenance/README.md](.maintenance/README.md) before adding or refreshing a guide. Deployment remains controlled by the repository's existing Mintlify integration; previewing locally does not publish changes.

# Documentation verification — 2026-09-23

Baseline: Enconvo 2.5.6 development. This records documentation coverage and focused checks; it does not certify every product feature or third-party service end to end.

## Coverage and organization

- 122 navigable pages grouped into Guides, Providers, and Developers.
- All 52 current module manifests mapped to guides, including supporting runtime modules.
- All 59 current Settings entries mapped to reader-facing instructions.
- 133 declared provider entries across 10 capabilities indexed by purpose.
- 15 actual-interface JPEG screenshots and four silent H.264 step walkthroughs.
- Existing page paths and historical `changelog.mdx` preserved; no publishing performed.

The feature directory, command catalog, provider catalog, and Settings reference provide complementary entry points. Native feature families and inactive exclusions are recorded in `coverage.json`. Module inventories and provider counts describe the reviewed development checkout; release-channel availability is explained in the public guides.

## Fresh checks

| Check | Result |
| --- | --- |
| `python3 scripts/check-docs.py --sources` | Passed: 122 pages, 52 modules, 59 Settings entries, 19 media assets, no errors. |
| `npx --yes mint@4.2.922 validate` | Build validation passed. |
| `npx --yes mint@4.2.922 broken-links --check-anchors` | No broken links found. |
| `npx --yes tsx@4.20.6 scripts/check-workflow-examples.ts` | 18 YAML examples passed the current workflow module validator. |
| `git diff --check` | Passed. |
| Minimal plugin command and Local API examples | TypeScript strict type-check passed against the local `@enconvo/api` SDK using ES2022, ESNext, Bundler resolution, and DOM types. |
| MCP server example | Installed SDK 1.29.0 with Zod 3 in an isolated temporary project; a stdio client discovered `greet`, received `Hello, Ada!`, and received an error for empty input. |
| Module builds | Not applicable: this task changes documentation, media, and documentation-check scripts; no code under `modules/` was changed by this task. |

The final source check detected concurrent manifest edits in `chat_with_ai` and `tts`. Both diffs were reviewed before their fingerprints were refreshed: one hides advanced credential fields and the other caches Gemini voice options. Neither changes the documented entry points or instructions. Their review notes remain in `coverage.json`.

## Rendered checks

The local Mintlify preview was inspected at `http://localhost:3335`. The home page, feature directory, provider catalog, and representative illustrated guides rendered correctly; inspected directory/catalog pages had no horizontal overflow, and their images loaded.

All four videos decoded and played in the rendered guide pages:

| Walkthrough | Duration | Decoded dimensions |
| --- | --- | --- |
| Scheduled job draft | 12 seconds | 800 × 1000 |
| Avatar gallery | 18 seconds | 1100 × 1064 |
| Dictionary draft | 13.5 seconds | 800 × 700 |
| Workflow editor | 18 seconds | 2012 × 1066 |

These videos are actual UI captures edited into steps with reading pauses, not continuous recordings. Their pages disclose this and include written instructions. Demonstration drafts were discarded; no job, dictionary entry, Agent assignment, download, or external message was created. The workflow demonstration only inspected views and controls.

## Impact and remaining limits

The changes affect documentation navigation, instructions, examples, and media. Existing URLs remain reachable, and the retired Companion Orb page points readers to Desktop Pets. Product runtime behavior is unchanged by this task.

Cloud authentication, paid generation, microphone and system-audio recording, model downloads, hardware-specific behavior, and every provider were not exercised end to end. Local link validation does not certify external services. The local preview's hosted search requires Mintlify authentication. Production publication and deployed-site checks remain outside this local documentation update.

# Documentation maintenance

Baseline: Enconvo 2.5.6 development, reviewed 2026-09-23. Release-channel availability can differ. Historical release notes remain unchanged.

## Coverage contract

`coverage.json` maps all 52 module manifests to reader-facing guides, distinguishes supporting runtime modules, and records native feature families. `settings-map.json` maps all 59 current Settings entries. `providers.json` records 133 declared provider entries across 10 capabilities. These counts describe product coverage, not end-to-end execution of every cloud service.

Run `python3 scripts/check-docs.py --sources` from the repository root after source changes. A manifest fingerprint mismatch requires reviewing that module's behavior and updating its guide before refreshing the fingerprint. Compare native action registration and `SettingsShell.tsx` when navigation or native surfaces change. Module manifests alone do not prove that a feature is active: Mobile Companion and AI Cursor are explicitly excluded where their registration or setup is not active.

## Authoring

Keep instructions task-oriented: entry point, prerequisites, steps, expected result, troubleshooting, related features. Preserve existing URLs or add intentional redirects. Use installed provider catalogs instead of fixed model/pricing rankings. Distinguish a local model from cloud processing by other tools. Do not claim encryption, offline behavior, automatic context collection limits, or supported platforms without checking the implementation.

Current workflows use `jobs` containing ordered `steps`; top-level `tasks` is rejected. Every published YAML example is checked against the real module validator by `scripts/check-workflow-examples.ts`. Snippet validation does not prove that an external API, model, or user's shell command will succeed.

## Screenshots and videos

`media.json` records capture date, origin, intended page, and video codec/dimensions/duration. Images are actual Enconvo UI captures, saved with their actual JPEG format. Do not invent UI or save account credentials, personal content, or private history. Crop to the feature content. Check the result visually after capture; browser zoom can affect crop coordinates.

The four silent MP4 walkthroughs use real UI captures taken during interaction, edited into steps with reading pauses. They are not continuous screen recordings. Their pages disclose this and provide equivalent written instructions. Captured scheduled-job, dictionary, and AI-command drafts were cancelled. No jobs, dictionary terms, Agent bindings, downloads, or external messages were created by the demonstrations. The workflow video only switches views and inspects inputs/configuration.

Videos use H.264, yuv420p, fast-start metadata, local posters, native controls, and no autoplay. Keep new captures similarly lightweight. Verify playback in the Mintlify preview, check the final and intermediate frames, and update the manifest when replacing media.

## Verification and limitations

Run the commands in the root README, visually inspect representative guide, provider, directory, and video pages, and check rendered image loading and video metadata. Local link checks exclude network destinations; account login, purchases, microphone recordings, model downloads, and every third-party provider are not exercised by documentation validation. Keep these distinctions in completion notes rather than claiming all product features were tested.

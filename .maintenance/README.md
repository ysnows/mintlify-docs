# Documentation maintenance

Baseline: Enconvo 2.5.10 Beta 2 development, reviewed 2026-10-25 when the whole site was reorganized into task groups and rewritten to the style below. Release-channel availability can differ. Historical release notes remain unchanged.

## Coverage contract

`coverage.json` maps all 52 module manifests to reader-facing guides, distinguishes supporting runtime modules, and records native feature families. `settings-map.json` maps all 71 current Settings entries, by sidebar section; `configuration/settings-reference.mdx` is written from the same list. `providers.json` records 133 declared provider entries across 10 capabilities. These counts describe product coverage, not end-to-end execution of every cloud service.

Run `python3 scripts/check-docs.py --sources` from the repository root after source changes. A manifest fingerprint mismatch requires reviewing that module's behavior and updating its guide before refreshing the fingerprint. Compare native action registration and `SettingsShell.tsx` when navigation or native surfaces change. Module manifests alone do not prove that a feature is active: Mobile Companion and AI Cursor are explicitly excluded where their registration or setup is not active.

## Authoring

Keep instructions task-oriented: entry point, prerequisites, steps, expected result, troubleshooting, related features. Preserve existing URLs or add intentional redirects. Use installed provider catalogs instead of fixed model/pricing rankings. Distinguish a local model from cloud processing by other tools. Do not claim encryption, offline behavior, automatic context collection limits, or supported platforms without checking the implementation.

### Writing style

Write for someone who just installed Enconvo and wants one thing done.

- Second person, present tense, short sentences. Say what to do and what happens; drop hedges such as "rather than assuming", "commonly", "if offered", "when needed", and "check the displayed result".
- Lead with the user's goal. The first paragraph says what the feature is for and when to reach for it, in two or three sentences, with no history.
- One idea per paragraph. Use a table only for real lookups (options, symptoms and fixes, comparisons), a `<Steps>` block or a numbered list for a procedure, and plain prose for everything else.
- Bold only the names of on-screen things (buttons, menu items, settings, pages). Use `code` only for text the user types or a file path.
- Keep every fact the page already states unless the product shows it is wrong. Never add behavior from memory: check the source (module manifests in `modules/*/package.json`, Settings pages in `modules/enconvo_webapp/src/app/settings/`, `changelogs/`) or leave it out.
- Use `<Note>` for what to know before starting, `<Tip>` for an optional shortcut, `<Warning>` only for data loss, cost, or account risk. At most two callouts per page.

### Page skeleton

Feature guides follow this order, leaving out what a page doesn't need:

1. Intro: what it is and when to use it.
2. `## Before you start` (only when there are prerequisites: a permission, a sign-in, a download).
3. `## <Task>`: one section per thing the user does, each with steps and the expected result.
4. `## Settings` or `## Options`: a table of the settings that matter, with what each changes.
5. `## Troubleshooting`: a two-column table, "Problem" and "What to do".
6. `## Related`: a `<CardGroup cols={2}>` of two to four cards.

Provider pages use the provider skeleton: intro, `## Connect` (steps), `## Models and options`, `## Troubleshooting`, `## Related`.

### Names and paths

- Settings paths use the Mac Settings sidebar entry, written **Settings → <Entry>**, then the control: **Settings → SmartBar → Default Agent**. Don't include the sidebar's section header ("Global Providers Settings", "Primary Function Area"). The current entries, by section, are: AI Model, Text-to-Speech, Web Search, Image Generation, Video Generation, Web Fetch, OCR · Agent List, About You, Avatar, IM Channels, Connections, Automations, Notifications, Calls from Agents, Variables · Voice Command, Live Talk, Quick Actions · AI Commands · Workflows › Manage · Context Awareness, Screen Doodle, Appshots · Plugins, Skills, MCP Servers, Computer Use, Browser Use · SmartBar, Dynamic Island, PopBar, Chat Window, Pet · App Sidebar, Applications, Websites · Credential Management · Dictionary, Speakers · Dictation, Dictation Models, Dictation History · Recordings, Recording Models · Transcription, Transcription Models · Live Captioning, Captioning Model · Memory, KnowledgeBase, Voice Note, Quick Capture · Account, Teams, Sync, Points Usage, Usage Statistics, Invite Friends, Redeem Code · General, Shortcut, Local Models, Permissions, Keep Awake, Diagnostics, About · Developer Tools, Hooks, APIs, CLI Guide. Check `modules/enconvo_webapp/src/app/settings/components/SettingsShell.tsx` when it changes.
- Keyboard shortcuts are written with symbols in bold: **⇧⌘D**.
- Providers use their own brand name in titles and prose (DeepSeek, Groq, xAI, Kimi, MiniMax, Google Gemini). When the app's label differs, name it once: "listed as **X.AI-GROK** in Settings".
- The app is "Enconvo". The iPhone app is "the iPhone app"; its own chats are "Phone chats".

Current workflows use `jobs` containing ordered `steps`; top-level `tasks` is rejected. Every published YAML example is checked against the real module validator by `scripts/check-workflow-examples.ts`. Snippet validation does not prove that an external API, model, or user's shell command will succeed.

## Screenshots and videos

`media.json` records capture date, origin, intended page, and video codec/dimensions/duration. Images are actual Enconvo UI captures, saved with their actual JPEG format. Do not invent UI or save account credentials, personal content, or private history. Crop to the feature content. Check the result visually after capture; browser zoom can affect crop coordinates.

The four silent MP4 walkthroughs use real UI captures taken during interaction, edited into steps with reading pauses. They are not continuous screen recordings. Their pages disclose this and provide equivalent written instructions. Captured scheduled-job, dictionary, and AI-command drafts were cancelled. No jobs, dictionary terms, Agent bindings, downloads, or external messages were created by the demonstrations. The workflow video only switches views and inspects inputs/configuration.

Videos use H.264, yuv420p, fast-start metadata, local posters, native controls, and no autoplay. Keep new captures similarly lightweight. Verify playback in the Mintlify preview, check the final and intermediate frames, and update the manifest when replacing media.

## Verification and limitations

Run the commands in the root README, visually inspect representative guide, provider, directory, and video pages, and check rendered image loading and video metadata. Local link checks exclude network destinations; account login, purchases, microphone recordings, model downloads, and every third-party provider are not exercised by documentation validation. Keep these distinctions in completion notes rather than claiming all product features were tested.

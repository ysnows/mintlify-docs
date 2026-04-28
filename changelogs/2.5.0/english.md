# Enconvo 2.5.0 Changelog (2026-04-28) 🚀

## SmartBar

- Resizable SmartBar window — position and size are persisted independently for Command List mode and Chat mode
- New SmartBar suggestion panel
- Dynamic Context: agents now read a live overview of your foreground context and pull in specific items only when needed (for example, ask about the current page directly in your open browser without manually attaching context or opening the App SideBar)
- Smoother task switching with optimized switch logic
- Ask AI: select text inside a SmartBar response and use it as context for follow-up questions
- SmartBar list: menu opens on both click and right-click; added a search box for quickly filtering options
- Pending messages — append new messages while the agent is still running; they are queued and consumed automatically

## Dictation

- Refreshed Dictation UI/UX
- Added Qwen ASR support (local, MLX-powered)
- New setting: toggle the start/stop sound effect when dictation is activated
- New setting: toggle whether system audio is muted while dictation is active
- Optimized post-dictation actions — defaults now include Polish and Translate
- New shortcut mode: "Hold or Toggle", default shortcut is `Right Command` (hold for push-to-talk, tap to toggle)
- AI-powered voice input dictionary for improved recognition of names, jargon, and custom terms

## Agent

- New Voice Trigger feature - use `Right Option` to trigger voice input directly to the agent.
- Improved session management
- Optimized context-compression logic

## Cron Scheduling

- Cron-scheduled execution for agents — let agents run tasks on a schedule
- Cron logs UI with fixed-height dialog and syntax-highlighted JSON detail view
- Can manage cron schedules from the UI and API

## IM Channels

- Unified IM Channels module supporting Discord, Telegram
- In-channel bot commands: `/new`, `/stop`, `/voice`, `/status`, `/audio`
- Access control: pairing-based system with approve/deny notifications

## Skills Support

- Skills Store with curated skills (PPT, DOCX, Excel, Obsidian, photo dedup, and more)
- Use skills with the `/` slash command
- Custom skills directories — pick your own folders or symlinked directories

## Knowledge Base

- Reindex ability — rebuild the knowledge base on demand from the UI
- Added xlsx support for knowledge base ingestion
- Audio/video transcription supported in the file loader
- Indexing errors are surfaced in the UI

## Memory

- New Memory management UI
- optimize memory use logic with smarter retrieval and compression strategies

## Recording

- Standalone, draggable recording bar with per-screen position persistence

## API system

- Expose Enconvo abilities through HTTP API — call Enconvo capabilities from external apps
- base url : `http://localhost:54535/`
- example: 
```
## tts
curl -X "POST" "http://localhost:54535/tts/tts" \
     -H 'Content-Type: application/json' \
     -d $'{
  "input_text": "hello, world"
}'
```

## Enconvo CLI

- Expose Enconvo abilities through a command-line interface
- `enconvo -h` shows the help message


## Computer Use 

- New `computer-use` extension for native macOS control


## TTS Improvements

- New providers: xAI TTS, Edge TTS (free), Gemini 3.1 Flash TTS 
- New Read Aloud UI/UX: horizontal bar with a live waveform, loading state


## AI Model Provider

- New providers: MiniMax, [Z.AI](http://z.ai) (Anthropic-compatible),
- Claude Opus 4.7  (Cloud Plan, Subscription, BYOK)
- Kimi 2.6 / Moonshot updates (Cloud Plan, BYOK)
- DeepSeek V4 Flash and V4 Pro (BYOK and Enconvo Cloud routing)


## Image Create

- gpt-image-2 model support (Cloud Plan & BYOK)


##  Web Fetch

- When fetching x.com, requests are redirected to the Enconvo fetch provider (jina.ai, free tier)

## Extensions Improvements

- `apple-apps-and-services` consolidates all macOS app integrations: Mail, Notes, Calendar, Reminders, Contacts, Messages, and Maps. Replaces the legacy `apple_mail` and `apple_reminders` extensions
- `media-utils` (renamed from `video_utils`) absorbs `audio_utils` and adds online video download (YouTube, TikTok, Instagram, etc.) plus audio compress and transcript APIs
- `bash` util uses RTK to reduce LLM token consumption by 60–90% on common dev commands
- `read_file` tool now reads images, audio, and video
- `image-utils` replaces bundled binaries with auto-download from GitHub Releases
- New standalone `config` module (split out of `enconvo`) with `get` / `set` / `preferences` endpoints, auto-resolved `storeType`, and password auto-encryption
- New `ai-command` extension with migration path from the legacy `custom_bot` (preserves message history)

## UI/UX Improvements

- Refreshed tool-call display
- Tools like `write_file` now stream their text content live 
- Workspace sidebar — quick access to the working directory and deliverables
- Customizable command icons
- Smoother agent flow
- Command settings now jump to a unified settings page


## PopBar

- Ask AI integration in PopBar

## Other Improvements

- `read_file` can read image content
- Prompts can reference settings parameters
- Screenshot explanation: clears prior conversation history and no longer auto-copies by default
- Anthropic SDK linked locally with a fork; added `jsonrepair` for robust streaming parses
- App shutdown: SIGTERM is sent to Python subprocess groups on app termination

## Bug Fixes

- Fixed up/down/enter behavior in settings input fields
- Fixed Ollama cloud model issues
- Fixed shortcut handling for menus
- Fixed `pasteIn` so keyboard events target the last frontmost app
- Fixed reasoning component flicker when content is empty or whitespace

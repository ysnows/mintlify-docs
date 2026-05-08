# Enconvo 2.5.1 Changelog (2026-05-07) 🚀

## OpenClaw

- Enconvo now supports **OpenClaw** as an LLM provider — bring any of your OpenClaw agents into Enconvo and run them seamlessly across **SmartBar**, **PopBar**, **App Sidebar**, and every other Enconvo surface

## Hermes

- Enconvo now supports **Hermes** as an LLM provider — every Hermes agent is instantly available across **SmartBar**, **PopBar**, **App Sidebar**, and the rest of Enconvo, so you can use them anywhere you work

## File Preview

- Added **File preview** support — you can now preview files (images, video, audio, Markdown, PDF, and more) right inside SmartBar, beside the chat
- Action buttons on the right side stay visible while previewing
- Fixed an issue with PDF page numbers

## MLX

- **Local MLX models** (beta) — run models on‑device for writing and translation use cases, keeping everything private and fully offline

## AI Model Provider

- New provider: **Xiaomi MiMo** (BYOK & Cloud Plan)

## TTS

- New provider: **Xiaomi MiMo TTS** (BYOK & Cloud Plan)
- New local TTS providers, all powered by **MLX** and running fully on‑device:
  - **Kokoro 82M** — lightweight and multilingual
  - **Qwen TTS** — multilingual with natural prosody

## Dictation

- New on‑device ASR providers, powered by **MLX**:
  - **Parakeet ASR**
  - **Whisper ASR**
- New realtime / sync ASR providers (BYOK & Cloud Plan):
  - **Azure** (realtime)
  - **ElevenLabs Scribe v2** (realtime / sync)
  - **AssemblyAI** (realtime / sync)
  - **Soniox** (realtime / sync)
  - **Volcengine** (realtime / sync)
- Your personal **Memory** is now used as the dictation dictionary, improving recognition of names, jargon, and custom terms you frequently use
- Smoother dictation experience in SmartBar with full **realtime / sync** mode support

## SmartBar

- **Explain follow‑up** — keep the conversation going naturally after an explanation
- **"Use as context"** is now the first action when you use `@`
- Improved **paste image** flow and refined screenshot logic for a smoother experience
- You can now **delete queued messages** while an agent is still running
- Context is now **automatically compacted** to keep long conversations responsive
- Fixed an issue with `@` mention switching

## Chat Window

- **Message history search** lets you quickly find past conversations in the chat window
- Fixed: model selection not being applied correctly
- Fixed: model selector dismissing unexpectedly
- Added a **Show in Finder** icon for delivered files

## Knowledge Base

- **Local embeddings** — embeddings now run on‑device, so your knowledge base data never leaves your machine
- Knowledge Base entries can now be referenced directly with **`@` context mentions**
- Knowledge Base search now accepts `query: string[]`, enabling multi‑query searches in a single call

## IM Channels

- Fixed: IM channels no longer disconnect when an error occurs
- Added a **verbose mode** — streams the agent's step‑by‑step execution details directly into your IM channel, so you can follow exactly what the agent is doing in real time

## Web Search

- New web search provider: **Brave Search**

## Analytics

- Integrated **PostHog** as the analytics platform — you can opt out at any time from **Settings → About**

## New Logo

- Enconvo has a fresh new look — meet the refreshed app logo

## Bug Fixes

- Fixed context handling when returning from another view
- Fixed an issue with the mail notification sound
- Fixed lost context messages
- Fixed an incorrect session directory being used
- Fixed a livescreen image issue

# Project structure

After trimming, the project contains only the minimal set needed to run this wiki.

## Top-level directories

- `website/`: the VitePress site (config, theme, dependencies).
  - `website/.vitepress/config.ts`: VitePress config, which triggers projection on load.
  - `website/docs.ts`: the page manifest (add or remove pages here).
  - `website/raw-markdown.ts`, `website/build.ts`: projection and build helpers.
- `docs/`: the source Markdown (where you write content).
- `scripts/`: only `project-doc-site.ts` and `markdown.ts`, the two projection scripts.
- `node_modules/`: installed dependencies.

## How docs become pages

1. You write Markdown under `docs/`.
2. On build/start it is projected into `website/.generated/`.
3. VitePress renders it into a static site.

## What was removed

The rest of dsh's code (`apps/`, `packages/`, `native/`, …) and old docs were removed; only what the wiki needs remains.

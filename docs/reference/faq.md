# FAQ

## `EUNSUPPORTEDPROTOCOL (workspace:)` error?

Running `npm install` directly inside `website/` mistakenly detects the parent pnpm monorepo. Use `npm install --workspaces=false` to install only this subpackage.

## Missing `@rollup/rollup-win32-x64-msvc` or `@esbuild/win32-x64`?

This is a known npm optional-dependency bug. Install the matching native package explicitly (see [Run locally](../develop/local-run.md)).

## The server exits right after starting?

Usually WorkBuddy's safe-delete guard blocked Vite from cleaning its `.cache` temp directory. Start with `CODEBUDDY_SAFE_DELETE_ENABLED=0` (see [Run locally](../develop/local-run.md)).

## How do I add a page?

Create a Markdown file under `docs/`, then add a `pairedPages` entry in `website/docs.ts`. The Chinese and English sources are `xxx.zh.md` and `xxx.md` respectively, and both must exist or projection fails.

## Why is the "On this page" outline empty?

The outline only lists level-2 (`##`) and level-3 (`###`) headings. If a page has only a level-1 title, the outline is empty — add `## Section` headings.

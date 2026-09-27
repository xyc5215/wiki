# Run locally

## Install dependencies

This repo is fundamentally a pnpm monorepo, but the `website` subpackage can be installed with npm alone:

```bash
cd website
npm install --workspaces=false
```

### Markdown parsing dependencies

Projection needs these Markdown parsers, already listed in `website/package.json` so `npm install` picks them up:

- `mdast-util-from-markdown`
- `mdast-util-gfm`
- `micromark-extension-gfm`

### Missing Windows native binaries

If you see an error about missing Windows native binaries, install the matching versions:

```bash
npm install --no-save --workspaces=false \
  @esbuild/win32-x64@<esbuild version> \
  @rollup/rollup-win32-x64-msvc@<rollup version>
```

## Start the dev server

> Note: WorkBuddy's safe-delete guard blocks Vite from cleaning temp dirs, which crashes the server during dependency optimization. Disable it at startup (only affects Vite's own cache cleanup, safe):

```bash
CODEBUDDY_SAFE_DELETE_ENABLED=0 npm run dev
```

Then open http://127.0.0.1:5173/ .

## Build a static site

```bash
npm run build
```

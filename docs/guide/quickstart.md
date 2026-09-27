# Quick start

Welcome to this lightweight wiki. This page explains what it is and where to go next.

## How it works

- Source files live in `docs/` (Markdown).
- `website/docs.ts` is a static manifest listing each page's source, route, sidebar and group.
- `scripts/project-doc-site.ts` projects those Markdown files into `website/.generated/` when the site starts, then VitePress renders them.
- Editing anything under `docs/` hot-reloads.

## Project layout

- `website/`: the VitePress site (config, theme, dependencies).
- `docs/`: where you write content.
- `scripts/`: the projection scripts.

## Next steps

- Read [Project structure](./structure.md)
- Learn [Run locally](../develop/local-run.md)
- See the [FAQ](../reference/faq.md)

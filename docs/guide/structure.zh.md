# 目录结构

精简后的项目只包含运行这个 Wiki 所需的最小集合。

## 顶层目录

- `website/`：VitePress 站点（配置、主题、依赖）。
  - `website/.vitepress/config.ts`：VitePress 配置，加载时调用投影。
  - `website/docs.ts`：页面清单（在这里增减页面）。
  - `website/raw-markdown.ts`、`website/build.ts`：投影与构建辅助。
- `docs/`：文档源 Markdown（你写内容的地方）。
- `scripts/`：只保留 `project-doc-site.ts` 与 `markdown.ts` 两个投影脚本。
- `node_modules/`：已安装的依赖。

## 文档如何变成网页

1. 你在 `docs/` 写 Markdown。
2. 构建/启动时被投影到 `website/.generated/`。
3. VitePress 渲染成静态站点。

## 被移除的内容

其余 dsh 的代码（`apps/`、`packages/`、`native/` 等）与旧文档都已移除，只保留 wiki 所需。

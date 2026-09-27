# 快速开始

欢迎使用这个轻量 Wiki。本页介绍它是什么，以及接下来可以看什么。

## 它是怎么工作的

- 文档源文件在 `docs/`（Markdown）。
- `website/docs.ts` 是一份静态清单，列出每一页的源路径、路由、侧边栏与分组。
- `scripts/project-doc-site.ts` 在站点启动时把这些 Markdown 投影到 `website/.generated/`，VitePress 再渲染。
- 改 `docs/` 下的内容会热更新。

## 项目结构一览

- `website/`：VitePress 站点（配置、主题、依赖）。
- `docs/`：你写内容的地方。
- `scripts/`：投影脚本。

## 下一步

- 了解 [目录结构](./structure.zh.md)
- 学习 [本地运行](../develop/local-run.zh.md)
- 查看 [常见问题](../reference/faq.zh.md)

# 常见问题

## 报 `EUNSUPPORTEDPROTOCOL (workspace:)` 怎么办？

在 `website/` 里直接 `npm install` 会误检父级 pnpm 单一代码库。用 `npm install --workspaces=false` 只装当前子包即可。

## 报缺少 `@rollup/rollup-win32-x64-msvc` 或 `@esbuild/win32-x64`？

这是 npm 可选依赖（optional）的已知 bug。显式补装匹配版本的原生包即可（见[本地运行](../develop/local-run.zh.md)）。

## 怎么新增一页？

在 `docs/` 下新建 Markdown，并在 `website/docs.ts` 的清单里加一条 `pairedPages` 记录——中英文源文件分别为 `xxx.md` 与 `xxx.zh.md`，二者都要存在，否则投影会报错。

## 页面右侧的「本页目录」为什么是空的？

`本页目录`（outline）只抓取页面的二级（`##`）与三级（`###`）标题。如果某页只有一级标题，目录就是空的——给页面补充 `## 小节` 即可。

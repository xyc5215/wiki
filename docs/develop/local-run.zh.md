# 本地运行

## 依赖安装

本仓库本质是一个 pnpm 单一代码库，但 `website` 子包可单独用 npm 安装：

```bash
cd website
npm install --workspaces=false
```

### 文档生成依赖

投影需要以下 Markdown 解析包，已写入 `website/package.json`，`npm install` 会自动装好：

- `mdast-util-from-markdown`
- `mdast-util-gfm`
- `micromark-extension-gfm`

### Windows 原生二进制缺失

若报缺少 Windows 原生二进制，按已装版本补装：

```bash
npm install --no-save --workspaces=false \
  @esbuild/win32-x64@<esbuild版本> \
  @rollup/rollup-win32-x64-msvc@<rollup版本>
```

## 启动开发服务器

> 注意：WorkBuddy 的安全删除防护会拦截 Vite 清理临时目录，导致服务在依赖预构建时退出。
> 启动时需关闭该防护（仅影响 Vite 自己的缓存清理，安全）：

```bash
CODEBUDDY_SAFE_DELETE_ENABLED=0 npm run dev
```

启动后访问 http://127.0.0.1:5173/ 。

## 构建静态站点

```bash
npm run build
```

# 我的 Wiki

一个基于 [VitePress](https://vitepress.dev/) 的轻量文档站，由 [xyc5215](https://github.com/xyc5215) 维护。
本站从 dsh（deepseek-harness）仓库精简而来，只保留运行这个 Wiki 所需的最小集合。

- 在线地址：通过 Cloudflare Pages 部署（见下文「部署」）。
- 源码仓库：<https://github.com/xyc5215/wiki>
- 每页底部都有「在 GitHub 上编辑此页」入口，直接跳到对应源文件。

## 目录结构

```
.
├── docs/                 # 文档源 Markdown（你写内容的地方）
│   ├── index.zh.md       # 中文首页
│   ├── index.md          # 英文首页
│   ├── guide/            # 入门：快速开始、目录结构
│   ├── develop/          # 开发：本地运行
│   └── reference/        # 参考：常见问题
├── scripts/              # 投影脚本（把 docs/ 变成 VitePress 源树）
│   ├── project-doc-site.ts
│   └── markdown.ts
└── website/              # VitePress 站点（配置、主题、依赖）
    ├── .vitepress/config.ts   # VitePress 配置，加载时调用投影
    ├── docs.ts                # 页面清单（在这里增减页面）
    ├── raw-markdown.ts
    ├── build.ts
    └── package.json
```

> 文档源文件在 `docs/`，由 `scripts/project-doc-site.ts` 投影到 `website/.generated/`（VitePress 的 `srcDir`），再由 VitePress 渲染。改 `docs/` 下的内容会热更新。

## 本地运行

> ⚠️ 本仓库本质是一个 pnpm 单一代码库，但 `website` 子包可单独用 npm 安装运行。
> 在 `website/` 里直接 `npm install` 会误检父级 pnpm 配置，务必加 `--workspaces=false`。

```bash
cd website
npm install --workspaces=false
```

启动开发服务器：

```bash
npm run dev
```

然后访问 <http://127.0.0.1:5173/> 。

构建静态站点：

```bash
npm run build        # 产物在 website/.dist
```

### 关于 Windows 原生二进制

VitePress 依赖 esbuild / rollup 的平台原生二进制（`@esbuild/win32-x64`、`@rollup/rollup-win32-x64-msvc`）。
npm 的 optional 依赖在某些环境下不会自动装上，若启动/构建报缺这两个包，按已装版本补装即可：

```bash
npm install --no-save --workspaces=false \
  @esbuild/win32-x64@<esbuild版本> \
  @rollup/rollup-win32-x64-msvc@<rollup版本>
```

> 这两个包已写入 `website/package.json` 的 `optionalDependencies`，正常情况下 `npm install` 会自动装好；
> 在 Linux（如 Cloudflare 构建机）上会因 os/cpu 不匹配自动跳过，由 esbuild/rollup 自身的 optional 依赖提供 Linux 版本。

## 增减页面

1. 在 `docs/` 下新建 Markdown，中英文源文件需成对出现：`xxx.zh.md` 与 `xxx.md`（二者都要存在，否则投影报错）。
2. 在 `website/docs.ts` 的清单里加一条 `pairedPages` 记录，指定 `source`、`route`、`label`、`sidebar`、`section`、`order`。
3. 每页默认开启右侧「本页目录」（抓取 `##` / `###` 标题）。想关闭或调整层级，给该页加 `outline` 字段即可。

## 部署（Cloudflare Pages）

构建目录在 `website/`，产物为 `website/.dist`。

### 方式一：Cloudflare 控制台直连（推荐，无需密钥）

1. 登录 Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → 连接 GitHub 仓库 `xyc5215/wiki`。
2. 构建设置：
   - **Build command**：`cd website && npm install --workspaces=false && npm run build`
   - **Build output directory**：`website/.dist`
3. 保存并部署。之后每次 push 到 `main` 自动重新部署。

### 方式二：GitHub Actions 自动部署

仓库已包含 `.github/workflows/deploy.yml`，push 到 `main` 时自动构建并部署。
需要在仓库 **Settings → Secrets and variables → Actions** 中添加两个密钥：

| 密钥 | 说明 |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token，需有 `Pages` 编辑权限（建议用 `Cloudflare Pages: Edit` 模板） |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID（Dashboard 右下角或 `wrangler whoami`） |

> 编辑链接使用分支 `main`（`https://github.com/xyc5215/wiki/edit/main/...`）。

## 许可证

仅供个人使用与学习。

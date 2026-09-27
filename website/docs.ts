/**
 * 本站文档清单（精简版）。
 *
 * Markdown 源文件放在仓库 `docs/` 下，由 `scripts/project-doc-site.ts` 投影到
 * VitePress 的 `website/.generated` 目录；修改 `docs/` 下的内容会热更新。
 * 想增减页面，改这里的 `pairedPages` 清单即可。
 */

/** VitePress 站点使用的语言键。 */
export type DocsLocale = 'root' | 'en'

/** 某一语言与顶层模块下的侧边栏集合。 */
export type DocsSidebar =
  | 'zh-guide'
  | 'zh-develop'
  | 'zh-reference'
  | 'en-guide'
  | 'en-develop'
  | 'en-reference'

/** 投影进 VitePress 源树的一页。 */
export interface DocsPage {
  /** VitePress 语言区域。 */
  locale: DocsLocale
  /** 当前投影的源文档语言。 */
  contentLocale: 'zh-CN' | 'en-US'
  /** 仓库相对的规范 Markdown 源路径。 */
  source: string
  /** VitePress 路由，含 `.md` 后缀。 */
  route: string
  /** 侧边栏显示名称。 */
  label: string
  /** 所属侧边栏集合，语言首页为 null。 */
  sidebar: DocsSidebar | null
  /** 侧边栏分组名。 */
  section: string
  /** 分组内稳定顺序。 */
  order: number
  /** 该页 VitePress 大纲包含的标题层级。 */
  outline?: number | readonly [number, number] | 'deep' | false
  /** 解析到本页的其它仓库路径。 */
  sourceAliases?: string[]
}

interface MirroredPage {
  source: string | Record<DocsLocale, string>
  route: string
  contentLocale: DocsPage['contentLocale'] | Record<DocsLocale, DocsPage['contentLocale']>
  label: Record<DocsLocale, string>
  sidebar: Record<DocsLocale, DocsSidebar | null>
  section: Record<DocsLocale, string>
  order: number
  outline?: DocsPage['outline']
  sourceAliases?: string[] | Partial<Record<DocsLocale, string[]>>
}

type PairedPage = Omit<MirroredPage, 'source' | 'contentLocale' | 'sourceAliases'> & {
  /** 英文侧源文件（中文侧会换成 `.zh.md`）。 */
  source: string
  sourceAliases?: string[]
}

function localized<T>(value: T | Record<DocsLocale, T>, locale: DocsLocale): T {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<DocsLocale, T>)[locale]
    : value
}

function mirroredPages(pages: MirroredPage[]): DocsPage[] {
  return pages.flatMap(page => (['root', 'en'] as const).map((locale) => {
    const aliases = page.sourceAliases === undefined
      ? undefined
      : Array.isArray(page.sourceAliases) ? page.sourceAliases : page.sourceAliases[locale]
    return {
      locale,
      contentLocale: localized(page.contentLocale, locale),
      source: localized(page.source, locale),
      route: locale === 'root' ? page.route : `en/${page.route}`,
      label: page.label[locale],
      sidebar: page.sidebar[locale],
      section: page.section[locale],
      order: page.order,
      // 默认给每页开启右侧"本页目录"（抓取 h2/h3）；单页仍可用 outline 字段覆盖。
      ...(page.outline === undefined ? { outline: [2, 3] } : { outline: page.outline }),
      ...(aliases === undefined ? {} : { sourceAliases: aliases }),
    }
  }))
}

function pairedPages(pages: PairedPage[]): DocsPage[] {
  return mirroredPages(pages.map((page) => {
    const chineseSource = page.source.replace(/\.md$/, '.zh.md')
    const sharedAliases = page.sourceAliases ?? []
    return {
      ...page,
      source: { root: chineseSource, en: page.source },
      contentLocale: { root: 'zh-CN', en: 'en-US' },
      sourceAliases: {
        root: [...sharedAliases, page.source],
        en: [...sharedAliases, chineseSource],
      },
    }
  }))
}

const homeAndGuide = pairedPages([
  {
    source: 'docs/index.md',
    route: 'index.md',
    label: { root: '我的 Wiki', en: 'My Wiki' },
    sidebar: { root: null, en: null },
    section: { root: '首页', en: 'Home' },
    order: 0,
  },
  {
    source: 'docs/guide/quickstart.md',
    route: 'guide/quickstart.md',
    label: { root: '快速开始', en: 'Quick start' },
    sidebar: { root: 'zh-guide', en: 'en-guide' },
    section: { root: '入门', en: 'Guide' },
    order: 1,
    sourceAliases: ['docs/guide'],
  },
  {
    source: 'docs/guide/structure.md',
    route: 'guide/structure.md',
    label: { root: '目录结构', en: 'Project structure' },
    sidebar: { root: 'zh-guide', en: 'en-guide' },
    section: { root: '入门', en: 'Guide' },
    order: 2,
  },
])

const develop = pairedPages([
  {
    source: 'docs/develop/local-run.md',
    route: 'develop/local-run.md',
    label: { root: '本地运行', en: 'Run locally' },
    sidebar: { root: 'zh-develop', en: 'en-develop' },
    section: { root: '基础', en: 'Basics' },
    order: 1,
    sourceAliases: ['docs/develop'],
  },
])

const reference = pairedPages([
  {
    source: 'docs/reference/faq.md',
    route: 'reference/faq.md',
    label: { root: '常见问题', en: 'FAQ' },
    sidebar: { root: 'zh-reference', en: 'en-reference' },
    section: { root: '参考', en: 'Reference' },
    order: 1,
  },
])

/** 每种语言侧边栏集合的声明顺序，导航栏与 llms.txt 均按此读取。 */
export const localeCollections = {
  root: ['zh-guide', 'zh-develop', 'zh-reference'],
  en: ['en-guide', 'en-develop', 'en-reference'],
} as const satisfies Record<DocsLocale, readonly DocsSidebar[]>

/** 一个侧边栏分组，按 label 与页面匹配。 */
export interface DocsSection {
  /** 分组标题，等于其下每页的 `section` 字段。 */
  label: string
  /** 未含当前阅读页时折叠该分组。 */
  collapsed?: boolean
}

const sections: Record<DocsLocale, readonly DocsSection[]> = {
  root: [
    { label: '首页' },
    { label: '入门' },
    { label: '基础' },
    { label: '参考' },
  ],
  en: [
    { label: 'Home' },
    { label: 'Guide' },
    { label: 'Basics' },
    { label: 'Reference' },
  ],
}

/**
 * 某一侧边栏分组的放置信息与折叠行为。
 *
 * @param locale - 构建侧边栏的路由树。
 * @param label - 分组标题，等于其下页面的 `section`。
 * @returns 声明过的分组及其在语言区中的序号。
 * @throws 当该语言未声明该分组时。仅靠列表成员关系排序会把未声明分组静默排到最前。
 */
export function sectionSpec(locale: DocsLocale, label: string): DocsSection & { index: number } {
  const declared = sections[locale]
  const section = declared.find(candidate => candidate.label === label)
  if (section === undefined) throw new Error(`Sidebar section "${label}" has no placement in the ${locale} locale.`)
  return { ...section, index: declared.indexOf(section) }
}

/** 文档站点发布的每一页。 */
export const docsPages: DocsPage[] = [
  ...homeAndGuide,
  ...develop,
  ...reference,
]

/**
 * 某一侧边栏集合的页面，按侧边栏列出顺序。
 *
 * @param locale - 构建侧边栏的路由树。
 * @param collection - 读取的侧边栏集合。
 * @returns 该集合页面，先按分组放置、再按 `order` 排序。
 */
export function orderedPages(locale: DocsLocale, collection: DocsSidebar): DocsPage[] {
  return docsPages
    .filter(page => page.locale === locale && page.sidebar === collection)
    .sort((left, right) => (
      sectionSpec(locale, left.section).index - sectionSpec(locale, right.section).index
      || left.order - right.order
    ))
}

/** 已发布路由的站点相对链接。 */
export function routeLink(route: string): string {
  return `/${route.replace(/(?:index)?\.md$/, '')}`
}

/**
 * 顶层导航项的落点。
 *
 * 落点由集合首篇页面推导，而非写死：首篇改名或重排时，导航栏不会指向一个已不存在的路由。
 *
 * @param locale - 导航项所属路由树。
 * @param collection - 导航项打开的侧边栏集合。
 * @returns 该集合首篇页面的站点相对链接。
 * @throws 当该集合没有发布页面时。
 */
export function landingLink(locale: DocsLocale, collection: DocsSidebar): string {
  const first = orderedPages(locale, collection)[0]
  if (first === undefined) throw new Error(`Sidebar collection "${collection}" publishes no page.`)
  return routeLink(first.route)
}

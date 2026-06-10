import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
// import { FileTrieNode } from "./quartz/util/fileTrie" // needed if explorerOpts is re-enabled

// Explorer is removed from the layout — breadcrumbs + wikilinks handle navigation.
// Kept here in case it's re-enabled; filter suppresses folder-note duplicates
// (Obsidian convention: file name = parent folder name).
// const explorerOpts = {
//   filterFn: (node: FileTrieNode) => {
//     if (node.slugSegment === "tags") return false
//     if (!node.isFolder) {
//       const parts = node.slug.split("/")
//       if (parts.at(-1) === parts.at(-2)) return false
//     }
//     return true
//   },
// }

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  // AppendixCollapse: collapses any heading starting with "Appendix" site-wide
  afterBody: [Component.ThemeImageSwap(), Component.AppendixCollapse()],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/AkashMer/Nole-Nexus",
      "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs({ showCurrentPage: false }),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.TileCard(),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.TableOfContents(),
  ],
  right: [Component.CitationMeta()],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs({ showCurrentPage: false }), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.TileCard(),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.TableOfContents(),
  ],
  right: [],
}

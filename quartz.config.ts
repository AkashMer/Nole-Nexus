import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Nole Nexus  ",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "akashmer.github.io/Nole-Nexus",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          // Solarized Light palette (ctp-solarized-light extended)
          // accent: rosewater (ctp-accent-light-rosewater → #E38359)
          light: "#FDF6E3",      // base
          lightgray: "#EDE8D6",  // mantle
          gray: "#93A1A1",       // overlay2
          darkgray: "#333333",   // custom text override
          dark: "#002B36",       // crust (darkest)
          secondary: "#E38359",  // rosewater accent
          tertiary: "#2AA198",   // teal
          highlight: "rgba(227, 131, 89, 0.15)",
          textHighlight: "#E3835988",
        },
        darkMode: {
          // Royal Velvet palette (ctp-royal-velvet extended)
          // accent: sapphire (#68C5F0)
          light: "#1E1E24",      // base
          lightgray: "#383B4C",  // surface1
          gray: "#8B8FA7",       // overlay2
          darkgray: "#EAEAEA",   // custom text override
          dark: "#F8F8F2",       // text (lightest)
          secondary: "#68C5F0",  // sapphire accent
          tertiary: "#F6C999",   // rosewater (warm highlight)
          highlight: "rgba(104, 197, 240, 0.15)",
          textHighlight: "#68C5F088",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false, comments: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.Robots(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config

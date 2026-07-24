import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import { FullSlug } from "../../util/path"

export const Robots: QuartzEmitterPlugin = () => ({
  name: "Robots",
  async *emit(ctx) {
    const base = ctx.cfg.configuration.baseUrl
    const content = `User-agent: *
Allow: /
${base ? `\nSitemap: https://${base}/sitemap.xml` : ""}
`
    yield write({
      ctx,
      content,
      slug: "robots" as FullSlug,
      ext: ".txt",
    })
  },
  async *partialEmit() {},
})

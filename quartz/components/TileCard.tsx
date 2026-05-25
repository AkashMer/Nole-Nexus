import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const TILES: Record<string, { label: string; cardClass: string; svg?: string; isFolder?: boolean }> = {
  Landscape: { label: "Landscape", cardClass: "card-landscape", svg: "landscape.svg", isFolder: true },
  Roots:     { label: "Roots",     cardClass: "card-roots",     svg: "groots.svg",    isFolder: true },
  Workbench: { label: "Workbench", cardClass: "card-workbench", svg: "workbench.svg", isFolder: true },
  About:     { label: "About",     cardClass: "card-about"                                           },
}

const TileCard: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = fileData.slug ?? ""
  const topFolder = slug.split("/")[0]
  const tile = TILES[topFolder]

  if (!tile) return null

  const baseDir = pathToRoot(fileData.slug!)
  const href = joinSegments(baseDir, topFolder) + (tile.isFolder ? "/" : "")
  const svgSrc = tile.svg ? joinSegments(baseDir, "static", tile.svg) : null

  return (
    <div class={`home-card sidebar-tile ${tile.cardClass}`}>
      <a href={href} class="card-link">
        <span class="card-title">{tile.label}</span>
        {svgSrc && <img src={svgSrc} class="card-illustration" alt="" />}
      </a>
    </div>
  )
}

export default (() => TileCard) satisfies QuartzComponentConstructor

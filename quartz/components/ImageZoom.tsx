import { QuartzComponentConstructor } from "./types"
// @ts-ignore
import imageZoomScript from "./scripts/imageZoom.inline"
import style from "./styles/imageZoom.scss"

export default (() => {
  function ImageZoom() {
    return <></>
  }

  ImageZoom.afterDOMLoaded = imageZoomScript
  ImageZoom.css = style
  return ImageZoom
}) satisfies QuartzComponentConstructor

import mediumZoom, { Zoom } from "medium-zoom"

let zoom: Zoom | null = null

function setupZoom() {
  if (zoom) {
    zoom.detach()
    zoom = null
  }

  zoom = mediumZoom("img:not(.card-illustration):not(.no-zoom)", {
    margin: 24,
    background: "var(--light)",
  })
}

document.addEventListener("nav", setupZoom)
setupZoom()

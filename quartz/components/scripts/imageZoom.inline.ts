import mediumZoom from "medium-zoom"

const zoom = mediumZoom("img:not(.card-illustration):not(.no-zoom)", {
  margin: 24,
  background: "var(--light)",
})

window.addCleanup(() => zoom.detach())

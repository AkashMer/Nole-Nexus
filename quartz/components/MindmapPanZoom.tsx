import { QuartzComponentConstructor } from "./types"

export default (() => {
  function MindmapPanZoom() {
    return null
  }

  MindmapPanZoom.afterDOMLoaded = `
    function setupMindmapPanZoom() {
      document.querySelectorAll('img[alt="mindmap"]').forEach(function(img) {
        if (img.parentElement && img.parentElement.classList.contains("mindmap-container")) return;

        const container = document.createElement("div");
        container.className = "mindmap-container";
        img.before(container);
        container.appendChild(img);

        let scale = 1;
        let panX = 0;
        let panY = 0;
        let dragging = false;
        let lastX = 0;
        let lastY = 0;

        function applyTransform() {
          img.style.transform = "translate(" + panX + "px, " + panY + "px) scale(" + scale + ")";
        }

        function fitToContainer() {
          const cw = container.clientWidth;
          const ch = container.clientHeight;
          const iw = img.naturalWidth || 800;
          const ih = img.naturalHeight || 600;
          scale = Math.min(cw / iw, ch / ih, 1);
          panX = (cw - iw * scale) / 2;
          panY = (ch - ih * scale) / 2;
          applyTransform();
        }

        if (img.complete && img.naturalWidth) {
          fitToContainer();
        } else {
          img.addEventListener("load", fitToContainer);
          window.addCleanup(function() { img.removeEventListener("load", fitToContainer); });
        }

        function onWheel(e) {
          if (!e.ctrlKey && !e.metaKey) return;
          e.preventDefault();
          const rect = container.getBoundingClientRect();
          const mx = e.clientX - rect.left;
          const my = e.clientY - rect.top;
          // Continuous, delta-proportional factor instead of a fixed step per
          // event: trackpads emit many small deltaY values (smooth zoom),
          // mouse wheels emit large discrete ones (still feels responsive).
          const factor = Math.exp(-e.deltaY * 0.0015);
          const newScale = Math.min(20, Math.max(0.1, scale * factor));
          panX = mx - (mx - panX) * (newScale / scale);
          panY = my - (my - panY) * (newScale / scale);
          scale = newScale;
          applyTransform();
        }

        function onMouseDown(e) {
          dragging = true;
          lastX = e.clientX;
          lastY = e.clientY;
          container.style.cursor = "grabbing";
          e.preventDefault();
        }

        function onMouseMove(e) {
          if (!dragging) return;
          panX += e.clientX - lastX;
          panY += e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;
          applyTransform();
        }

        function onMouseUp() {
          if (!dragging) return;
          dragging = false;
          container.style.cursor = "grab";
        }

        function onDblClick() {
          scale = 1; panX = 0; panY = 0;
          fitToContainer();
        }

        container.addEventListener("wheel", onWheel, { passive: false });
        container.addEventListener("mousedown", onMouseDown);
        container.addEventListener("dblclick", onDblClick);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        window.addCleanup(function() {
          container.removeEventListener("wheel", onWheel);
          container.removeEventListener("mousedown", onMouseDown);
          container.removeEventListener("dblclick", onDblClick);
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        });
      });
    }

    document.addEventListener("nav", setupMindmapPanZoom);
    setupMindmapPanZoom();
  `

  MindmapPanZoom.css = `
    .mindmap-container {
      position: relative;
      width: 100%;
      height: clamp(300px, 55vh, 500px);
      overflow: hidden;
      cursor: grab;
      border: 1.5px solid var(--gray);
      border-radius: 8px;
      background-color: var(--light);
      margin: 1.25rem 0;
      touch-action: none;
      user-select: none;
    }

    .mindmap-container img {
      position: absolute;
      top: 0;
      left: 0;
      max-width: none;
      transform-origin: 0 0;
      will-change: transform;
      -webkit-user-drag: none;
    }

    .mindmap-container::after {
      content: "ctrl+scroll to zoom · drag to pan · double-click to reset";
      position: absolute;
      bottom: 0.5rem;
      right: 0.75rem;
      font-size: 0.75rem;
      color: var(--darkgray);
      opacity: 0.8;
      pointer-events: none;
      font-family: var(--bodyFont);
    }
  `

  return MindmapPanZoom
}) satisfies QuartzComponentConstructor

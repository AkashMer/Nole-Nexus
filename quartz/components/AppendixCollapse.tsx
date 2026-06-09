import { QuartzComponentConstructor } from "./types"

export default (() => {
  function AppendixCollapse() {
    return null
  }

  AppendixCollapse.afterDOMLoaded = `
    function setupAppendixCollapse() {
      const article = document.querySelector("article");
      if (!article) return;

      const headings = Array.from(article.querySelectorAll("h1, h2, h3, h4, h5, h6"));

      headings.forEach(heading => {
        if (heading.classList.contains("appendix-heading")) return;
        const text = (heading.textContent ?? "").trim().toLowerCase();
        if (!text.startsWith("appendix")) return;

        const level = parseInt(heading.tagName[1], 10);
        const siblings = [];
        let next = heading.nextElementSibling;
        while (next) {
          if (/^H[1-6]$/.test(next.tagName) && parseInt(next.tagName[1], 10) <= level) break;
          siblings.push(next);
          next = next.nextElementSibling;
        }
        if (siblings.length === 0) return;

        const wrapper = document.createElement("div");
        wrapper.className = "appendix-content is-collapsed";
        const inner = document.createElement("div");
        inner.className = "appendix-inner";
        wrapper.appendChild(inner);
        siblings.forEach(s => inner.appendChild(s));
        heading.insertAdjacentElement("afterend", wrapper);

        heading.classList.add("appendix-heading", "is-collapsed");

        function toggle() {
          const collapsed = heading.classList.toggle("is-collapsed");
          wrapper.classList.toggle("is-collapsed", collapsed);
        }

        heading.addEventListener("click", toggle);
        window.addCleanup(() => heading.removeEventListener("click", toggle));
      });
    }

    document.addEventListener("nav", setupAppendixCollapse);
    setupAppendixCollapse();
  `

  AppendixCollapse.css = `
    .appendix-heading {
      cursor: pointer;
      user-select: none;
    }
    .appendix-heading::after {
      content: " ▸";
      font-size: 0.7em;
      opacity: 0.55;
      vertical-align: middle;
      color: var(--gray);
    }
    .appendix-heading:not(.is-collapsed)::after {
      content: " ▾";
    }
    .appendix-content {
      display: grid;
      grid-template-rows: 1fr;
      transition: grid-template-rows 0.3s ease;
    }
    .appendix-content.is-collapsed {
      grid-template-rows: 0fr;
    }
    .appendix-inner {
      overflow: hidden;
    }
  `

  return AppendixCollapse
}) satisfies QuartzComponentConstructor

import { QuartzComponentConstructor } from "./types"

export default (() => {
  function AddendumDate() {
    return null
  }

  // Detects headings starting with "Addendum" immediately followed by an
  // italicized date paragraph (e.g. "*Jul 18, 2026*") and tightens the gap
  // between them, since the default heading margin-bottom pushes them apart.
  AddendumDate.afterDOMLoaded = `
    function setupAddendumDate() {
      const article = document.querySelector("article");
      if (!article) return;

      const headings = Array.from(article.querySelectorAll("h1, h2, h3, h4, h5, h6"));
      const datePattern = /^[A-Z][a-z]{2} \\d{1,2}, \\d{4}$/;

      headings.forEach(heading => {
        if (heading.classList.contains("addendum-heading")) return;
        const text = (heading.textContent ?? "").trim().toLowerCase();
        if (!text.startsWith("addendum")) return;

        const next = heading.nextElementSibling;
        if (!next || next.tagName !== "P") return;
        const em = next.querySelector("em");
        if (!em || next.children.length !== 1) return;
        if (!datePattern.test((em.textContent ?? "").trim())) return;

        heading.classList.add("addendum-heading");
        next.classList.add("addendum-date");
      });
    }

    document.addEventListener("nav", setupAddendumDate);
    setupAddendumDate();
  `

  AddendumDate.css = `
    .addendum-heading {
      margin-bottom: 0.3rem;
    }
    .addendum-date {
      margin-top: 0;
    }
  `

  return AddendumDate
}) satisfies QuartzComponentConstructor

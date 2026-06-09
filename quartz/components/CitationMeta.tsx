import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/citationMeta.scss"

// Ordered list of frontmatter fields to display. Only fields present in a note's
// frontmatter are rendered — any missing or empty field is silently skipped.
// Keys match BetterBibTex / Zotero export conventions (case-sensitive).
const FIELDS: { key: string; label: string; list?: boolean; url?: boolean }[] = [
  { key: "itemType", label: "Type" },
  { key: "DOI", label: "DOI" },
  { key: "authors", label: "Authors", list: true },
  { key: "Year", label: "Year" },
  { key: "Journal", label: "Journal" },
  { key: "Volume", label: "Volume" },
  { key: "Issue", label: "Issue" },
  { key: "editors", label: "Editors", list: true },
  { key: "Book", label: "Book" },
  { key: "ISBN", label: "ISBN" },
  { key: "Publisher", label: "Publisher" },
  { key: "Pages", label: "Pages" },
  // Workbench posts: link to the source code repository
  { key: "source", label: "Code", url: true },
]

export default (() => {
  function CitationMeta({ fileData }: QuartzComponentProps) {
    const fm = fileData.frontmatter
    if (!fm) return null

    const rows = FIELDS.flatMap(({ key, label, list, url }) => {
      const val = fm[key]
      if (val === undefined || val === null || val === "") return []
      if (list && Array.isArray(val) && val.length === 0) return []

      let content
      if (list && Array.isArray(val)) {
        content = (
          <ul class="citation-list">
            {(val as string[]).map((v) => (
              <li>{v}</li>
            ))}
          </ul>
        )
      } else if (key === "DOI") {
        // Render DOI as a clickable doi.org link
        content = (
          <a href={`https://doi.org/${val}`} target="_blank" rel="noopener noreferrer">
            {String(val)}
          </a>
        )
      } else if (url) {
        // Render full-URL fields (e.g. source) as a plain "View ↗" link
        content = (
          <a href={String(val)} target="_blank" rel="noopener noreferrer">
            View ↗
          </a>
        )
      } else {
        // Convert camelCase itemType values (e.g. "journalArticle") to Title Case
        const display = key === "itemType" ? String(val).replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()) : String(val)
        content = <span>{display}</span>
      }

      return [
        <div class="citation-row">
          <dt>{label}</dt>
          <dd>{content}</dd>
        </div>,
      ]
    })

    // No citation fields present — this is a homepage, folder index, or non-literature note
    if (rows.length === 0) return null

    return (
      <div class="citation-meta">
        <h3>Source</h3>
        <dl>{rows}</dl>
      </div>
    )
  }

  // Re-render the citation panel on every SPA navigation. The head's #citation-data
  // script tag (non-persisted) is replaced by the SPA router on each nav, giving us
  // reliable per-page frontmatter without depending on micromorph updating the
  // right sidebar's children. No slug guard here — the empty-rows check handles
  // non-literature pages naturally since they lack citation-specific frontmatter.
  CitationMeta.afterDOMLoaded = `
    const CITATION_FIELDS = ${JSON.stringify(FIELDS)};

    function buildCitationHTML(fm) {
      if (!fm) return "";

      const rows = CITATION_FIELDS.flatMap(({ key, label, list, url }) => {
        const val = fm[key];
        if (val === undefined || val === null || val === "") return [];
        if (list && Array.isArray(val) && val.length === 0) return [];

        let content;
        if (list && Array.isArray(val)) {
          content = "<ul class=\\"citation-list\\">" + val.map(v => "<li>" + v + "</li>").join("") + "</ul>";
        } else if (key === "DOI") {
          content = "<a href=\\"https://doi.org/" + val + "\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">" + val + "</a>";
        } else if (url) {
          // Render full-URL fields (e.g. source) as a plain "View ↗" link
          content = "<a href=\\"" + val + "\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">View ↗</a>";
        } else {
          // Convert camelCase itemType values to Title Case
          const display = key === "itemType" ? String(val).replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase()) : val;
          content = "<span>" + display + "</span>";
        }
        return ["<div class=\\"citation-row\\"><dt>" + label + "</dt><dd>" + content + "</dd></div>"];
      });

      if (rows.length === 0) return "";
      return "<h3>Source</h3><dl>" + rows.join("") + "</dl>";
    }

    document.addEventListener("nav", () => {
      const sidebar = document.querySelector(".right.sidebar");
      if (!sidebar) return;

      // Always clear the existing panel first
      const existing = sidebar.querySelector(".citation-meta");
      if (existing) existing.remove();

      // Read frontmatter from the non-persisted head script the SPA router just replaced
      const store = document.getElementById("citation-data");
      if (!store) return;

      let fm;
      try { fm = JSON.parse(store.textContent || "{}"); } catch { return; }

      const html = buildCitationHTML(fm);
      if (!html) return;

      const panel = document.createElement("div");
      panel.className = "citation-meta";
      panel.innerHTML = html;
      sidebar.appendChild(panel);
    });
  `

  CitationMeta.css = style
  return CitationMeta
}) satisfies QuartzComponentConstructor

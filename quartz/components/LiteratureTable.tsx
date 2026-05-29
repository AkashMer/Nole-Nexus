import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { trieFromAllFiles } from "../util/ctx"
import { getDate, formatDate } from "./Date"
import style from "./styles/literatureTable.scss"

const LITERATURE_FOLDERS = ["landscape", "roots"]

function formatItemType(raw: string): string {
  return raw.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
}

function formatAuthor(authors: unknown): string {
  if (!Array.isArray(authors) || authors.length === 0) return ""
  const first = String(authors[0])
  return authors.length === 1 ? first : `${first} et al.`
}

export default (() => {
  function LiteratureTable({ fileData, allFiles, cfg, ctx }: QuartzComponentProps) {
    const slug = fileData.slug ?? ""
    const topFolder = slug.split("/")[0].toLowerCase()
    if (!LITERATURE_FOLDERS.includes(topFolder)) return null

    const trie = (ctx.trie ??= trieFromAllFiles(allFiles))
    const firstSeg = slug.split("/")[0]
    const folder = trie.findNode([firstSeg])
    if (!folder) return null

    // Each literature note uses the folder-note convention: Landscape/@Noda/@Noda
    // So the trie structure is: Landscape → @Noda (folder, data=null) → @Noda (data=noteData)
    // We need to go one level deeper into each child folder to find the note data.
    const pages = folder.children.flatMap((child) => {
      if (child.data) return [child.data]
      // folder-note: note is a direct child of the child folder
      return child.children.flatMap((grandchild) => (grandchild.data ? [grandchild.data] : []))
    })
      .sort((a, b) => {
        const da = getDate(cfg, a)
        const db = getDate(cfg, b)
        if (da && db) return db.getTime() - da.getTime()
        if (da) return -1
        if (db) return 1
        return 0
      })

    if (pages.length === 0) return null

    const rows = pages.map((page) => {
      const fm = page.frontmatter as Record<string, unknown> | undefined ?? {}
      const date = getDate(cfg, page)
      const dateStr = date ? formatDate(date, cfg.locale) : ""
      const dateIso = date ? date.toISOString() : ""
      const title = (fm["title"] as string | undefined) ?? page.slug ?? ""
      const href = resolveRelative(fileData.slug!, page.slug!)
      const itemType = fm["itemType"] ? formatItemType(String(fm["itemType"])) : ""
      const author = formatAuthor(fm["authors"])
      const year = fm["Year"] ? String(fm["Year"]) : ""

      return { dateStr, dateIso, title, href, itemType, author, year }
    })

    // Serialize rows for client-side sort
    const rowsJson = JSON.stringify(rows)

    return (
      <div class="literature-table-wrap">
        <table
          class="literature-table"
          data-rows={rowsJson}
          data-sort-col="0"
          data-sort-dir="desc"
        >
          <thead>
            <tr>
              <th aria-sort="descending" data-col="0">Published</th>
              <th data-col="1">Title</th>
              <th data-col="2">Type</th>
              <th data-col="3">Author</th>
              <th data-col="4">Year</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr>
                <td class="lit-date"><time datetime={r.dateIso}>{r.dateStr}</time></td>
                <td class="lit-title"><a href={r.href} class="internal">{r.title}</a></td>
                <td class="lit-type">{r.itemType}</td>
                <td class="lit-author">{r.author}</td>
                <td class="lit-year">{r.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  LiteratureTable.afterDOMLoaded = `
    function initLiteratureTable(table) {
      const rows = JSON.parse(table.dataset.rows || "[]");
      let sortCol = parseInt(table.dataset.sortCol ?? "0");
      let sortDir = table.dataset.sortDir ?? "desc"; // "asc" | "desc"

      const tbody = table.querySelector("tbody");
      const ths = table.querySelectorAll("th[data-col]");

      function cellValue(row, col) {
        // col 0 = dateIso (sort key), col 1 = title, col 2 = itemType, col 3 = author, col 4 = year
        switch (col) {
          case 0: return row.dateIso;
          case 1: return row.title.toLowerCase();
          case 2: return row.itemType.toLowerCase();
          case 3: return row.author.toLowerCase();
          case 4: return row.year;
          default: return "";
        }
      }

      function renderRows() {
        const sorted = [...rows].sort((a, b) => {
          const va = cellValue(a, sortCol);
          const vb = cellValue(b, sortCol);
          const cmp = va < vb ? -1 : va > vb ? 1 : 0;
          return sortDir === "asc" ? cmp : -cmp;
        });

        tbody.innerHTML = sorted.map(r =>
          '<tr>' +
          '<td class="lit-date"><time datetime="' + r.dateIso + '">' + r.dateStr + '</time></td>' +
          '<td class="lit-title"><a href="' + r.href + '" class="internal">' + r.title + '</a></td>' +
          '<td class="lit-type">' + r.itemType + '</td>' +
          '<td class="lit-author">' + r.author + '</td>' +
          '<td class="lit-year">' + r.year + '</td>' +
          '</tr>'
        ).join("");
      }

      ths.forEach(th => {
        th.addEventListener("click", () => {
          const col = parseInt(th.dataset.col);
          if (col === sortCol) {
            sortDir = sortDir === "asc" ? "desc" : "asc";
          } else {
            sortCol = col;
            sortDir = col === 0 || col === 4 ? "desc" : "asc";
          }
          ths.forEach(t => t.removeAttribute("aria-sort"));
          th.setAttribute("aria-sort", sortDir === "asc" ? "ascending" : "descending");
          renderRows();
        });
      });
    }

    function setupTables() {
      document.querySelectorAll("table.literature-table").forEach(initLiteratureTable);
    }

    document.addEventListener("nav", setupTables);
    setupTables();
  `

  LiteratureTable.css = style
  return LiteratureTable
}) satisfies QuartzComponentConstructor

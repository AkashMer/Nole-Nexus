import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { trieFromAllFiles } from "../util/ctx"
import { getDate, formatDate } from "./Date"
import style from "./styles/literatureTable.scss"

const LITERATURE_FOLDERS = ["landscape", "roots", "workbench"]

function formatItemType(raw: string): string {
  return raw.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
}

export default (() => {
  function LiteratureTable({ fileData, allFiles, cfg, ctx }: QuartzComponentProps) {
    const slug = fileData.slug ?? ""
    const topFolder = slug.split("/")[0].toLowerCase()
    if (!LITERATURE_FOLDERS.includes(topFolder)) return null
    const isWorkbench = topFolder === "workbench"

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
      const source = (fm["source"] as string | undefined) ?? ""

      return { dateStr, dateIso, title, href, itemType, source }
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
          data-table-type={isWorkbench ? "workbench" : "literature"}
        >
          <thead>
            <tr>
              <th aria-sort="descending" data-col="0">Published</th>
              <th data-col="1">Title</th>
              {isWorkbench ? (
                <th data-col="2">Source</th>
              ) : (
                <th data-col="2">Source Type</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr>
                <td class="lit-date"><time datetime={r.dateIso}>{r.dateStr}</time></td>
                <td class="lit-title"><a href={r.href} class="internal">{r.title}</a></td>
                {isWorkbench ? (
                  <td class="lit-source">
                    {r.source ? <a href={r.source} class="external" target="_blank" rel="noopener">Source ↗</a> : ""}
                  </td>
                ) : (
                  <td class="lit-type">{r.itemType}</td>
                )}
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
      const tableType = table.dataset.tableType ?? "literature";

      const tbody = table.querySelector("tbody");
      const ths = table.querySelectorAll("th[data-col]");

      function cellValue(row, col) {
        if (tableType === "workbench") {
          switch (col) {
            case 0: return row.dateIso;
            case 1: return row.title.toLowerCase();
            case 2: return row.source ? row.source.toLowerCase() : "";
            default: return "";
          }
        }
        // col 0 = dateIso (sort key), col 1 = title, col 2 = itemType
        switch (col) {
          case 0: return row.dateIso;
          case 1: return row.title.toLowerCase();
          case 2: return row.itemType.toLowerCase();
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

        tbody.innerHTML = sorted.map(r => {
          const extraCells = tableType === "workbench"
            ? '<td class="lit-source">' + (r.source ? '<a href="' + r.source + '" class="external" target="_blank" rel="noopener">Source ↗</a>' : '') + '</td>'
            : '<td class="lit-type">' + r.itemType + '</td>';
          return '<tr>' +
            '<td class="lit-date"><time datetime="' + r.dateIso + '">' + r.dateStr + '</time></td>' +
            '<td class="lit-title"><a href="' + r.href + '" class="internal">' + r.title + '</a></td>' +
            extraCells +
            '</tr>';
        }).join("");
      }

      ths.forEach(th => {
        th.addEventListener("click", () => {
          const col = parseInt(th.dataset.col);
          if (col === sortCol) {
            sortDir = sortDir === "asc" ? "desc" : "asc";
          } else {
            sortCol = col;
            sortDir = col === 0 ? "desc" : "asc";
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

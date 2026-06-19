import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot, joinSegments } from "../util/path"
import style from "./styles/profileLinks.scss"

const LINKEDIN_URL = "https://www.linkedin.com/in/akashmer/"
const CV_STATIC_PATH = "static/akash-mer-cv.pdf"
const CV_ABSOLUTE_URL = "https://akashmer.github.io/Nole-Nexus/static/akash-mer-cv.pdf"

export default (() => {
  function ProfileLinks({ fileData }: QuartzComponentProps) {
    if (fileData.slug !== "About") return null

    const baseDir = pathToRoot(fileData.slug!)
    const cvPath = joinSegments(baseDir, CV_STATIC_PATH)

    return (
      <div class="profile-links">
        {/* <h3>Header</h3> */}
        <dl>
          <div class="profile-row">
            <dt>LinkedIn</dt>
            <dd>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                Dr. Akash Mer ↗
              </a>
            </dd>
          </div>
          <div class="profile-row">
            <dt>Curriculum Vitae</dt>
            <dd>
              <a href={cvPath} target="_blank" rel="noopener noreferrer">
                Download ↗
              </a>
            </dd>
          </div>
        </dl>
      </div>
    )
  }

  // micromorph does not reliably update right sidebar children across SPA navigation,
  // so we manage the panel manually on every nav event (same pattern as CitationMeta).
  ProfileLinks.afterDOMLoaded = `
    document.addEventListener("nav", () => {
      const sidebar = document.querySelector(".right.sidebar");
      if (!sidebar) return;

      const existing = sidebar.querySelector(".profile-links");
      const isAbout = window.location.pathname.replace(/\\/+$/, "").endsWith("/About");

      if (!isAbout) {
        if (existing) existing.remove();
        return;
      }

      if (existing) return;

      const panel = document.createElement("div");
      panel.className = "profile-links";
      panel.innerHTML =
        "<dl>" +
        "<div class=\\"profile-row\\"><dt>LinkedIn</dt><dd>" +
        "<a href=\\"${LINKEDIN_URL}\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Dr. Akash Mer ↗</a>" +
        "</dd></div>" +
        "<div class=\\"profile-row\\"><dt>Curriculum Vitae</dt><dd>" +
        "<a href=\\"${CV_ABSOLUTE_URL}\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Download ↗</a>" +
        "</dd></div>" +
        "</dl>";
      sidebar.appendChild(panel);
    });
  `

  ProfileLinks.css = style
  return ProfileLinks
}) satisfies QuartzComponentConstructor

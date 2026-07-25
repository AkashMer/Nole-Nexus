import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot, joinSegments } from "../util/path"
import style from "./styles/profileLinks.scss"

const LINKEDIN_URL = "https://www.linkedin.com/in/akashmer/"
const CV_STATIC_PATH = "static/akash-mer-cv.pdf"
const CV_ABSOLUTE_URL = "https://akashmer.github.io/Nole-Nexus/static/akash-mer-cv.pdf"

// Reach-out notes (Roots/Landscape/Workbench leaf notes only, not their folder
// index pages) show a warmer LinkedIn invite in place of the About page's
// fuller LinkedIn + CV panel. Workbench keeps its heading distinct since those
// are technical write-ups, not narrative notes; the body copy stays the same.
function isReachOutSlug(slug: string): boolean {
  if (slug.split("/").pop() === "index") return false
  return slug.startsWith("Roots/") || slug.startsWith("Landscape/") || slug.startsWith("Workbench/")
}

function reachOutHeading(slug: string): string {
  return slug.startsWith("Workbench/") ? "Want to discuss this project?" : "Enjoyed this post?"
}

export default (() => {
  function ProfileLinks({ fileData }: QuartzComponentProps) {
    const slug = fileData.slug!
    const isAbout = slug === "About"
    const isReachOut = isReachOutSlug(slug)
    if (!isAbout && !isReachOut) return null

    if (isReachOut) {
      return (
        <div class="profile-links reach-out" data-variant="reach-out">
          <h3>{reachOutHeading(slug)}</h3>
          <p>
            I'd love to hear your thoughts, say hi on{" "}
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            .
          </p>
        </div>
      )
    }

    const baseDir = pathToRoot(slug)
    const cvPath = joinSegments(baseDir, CV_STATIC_PATH)

    return (
      <div class="profile-links" data-variant="about">
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
    function isReachOutSlug(slug) {
      const segments = slug.split("/").filter(Boolean);
      if (segments[segments.length - 1] === "index") return false;
      return segments[0] === "Roots" || segments[0] === "Landscape" || segments[0] === "Workbench";
    }

    function reachOutHeading(slug) {
      return slug.startsWith("Workbench/") ? "Want to discuss this project?" : "Enjoyed this post?";
    }

    document.addEventListener("nav", () => {
      const sidebar = document.querySelector(".right.sidebar");
      if (!sidebar) return;

      const existing = sidebar.querySelector(".profile-links");
      const slug = document.body.dataset.slug || "";
      const isAbout = slug === "About";
      const isReachOut = isReachOutSlug(slug);
      const variant = isAbout ? "about" : isReachOut ? "reach-out" : null;

      if (!variant) {
        if (existing) existing.remove();
        return;
      }

      if (existing && existing.dataset.variant === variant) return;
      if (existing) existing.remove();

      const panel = document.createElement("div");
      panel.dataset.variant = variant;

      if (variant === "reach-out") {
        panel.className = "profile-links reach-out";
        panel.innerHTML =
          "<h3>" + reachOutHeading(slug) + "</h3>" +
          "<p>I'd love to hear your thoughts, say hi on " +
          "<a href=\\"${LINKEDIN_URL}\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">LinkedIn ↗</a>.</p>";
      } else {
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
      }

      sidebar.appendChild(panel);
    });
  `

  ProfileLinks.css = style
  return ProfileLinks
}) satisfies QuartzComponentConstructor

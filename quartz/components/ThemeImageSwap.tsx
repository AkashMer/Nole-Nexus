import { QuartzComponentConstructor } from "./types"

export default (() => {
  function ThemeImageSwap() {
    return <></>
  }

  ThemeImageSwap.afterDOMLoaded = `
    function swapImages(theme) {
      document.querySelectorAll("img").forEach(img => {
        const src = img.getAttribute("src") || "";
        if (theme === "light" && src.includes("_dark.")) {
          img.setAttribute("src", src.replace("_dark.", "_light."));
        } else if (theme === "dark" && src.includes("_light.")) {
          img.setAttribute("src", src.replace("_light.", "_dark."));
        }
      });
    }

    function applyThemeImages() {
      const theme = document.documentElement.getAttribute("saved-theme") ?? "dark";
      swapImages(theme);
    }

    document.addEventListener("nav", applyThemeImages);
    document.addEventListener("themechange", (e) => swapImages(e.detail.theme));
    applyThemeImages();
  `

  return ThemeImageSwap
}) satisfies QuartzComponentConstructor

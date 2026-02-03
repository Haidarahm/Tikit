/**
 * Preload background images for elements matching the selector.
 * Mimics imagesLoaded({ background: true }) behavior.
 */
export function preloadImages(selector) {
  const elements = Array.from(document.querySelectorAll(selector));
  if (!elements.length) {
    return Promise.resolve();
  }

  const urls = new Set();

  elements.forEach((el) => {
    const style = window.getComputedStyle(el);
    const bgImage = style.backgroundImage;
    if (!bgImage || bgImage === "none") return;

    // Extract url("...") or url('...') or url(...)
    const match = bgImage.match(/url\\((['"]?)(.*?)\\1\\)/);
    if (match && match[2]) {
      urls.add(match[2]);
    }
  });

  if (!urls.size) {
    return Promise.resolve();
  }

  return Promise.all(
    Array.from(urls).map(
      (url) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => resolve();
          img.src = url;
        })
    )
  );
}


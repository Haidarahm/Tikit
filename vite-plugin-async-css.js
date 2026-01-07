/**
 * Vite plugin to optimize CSS loading
 * Note: Main CSS bundle stays synchronous (critical for initial render)
 * External CSS files are handled in index.html
 */
export function asyncCSS() {
  return {
    name: 'async-css',
    enforce: 'post',
    transformIndexHtml(html) {
      // Optimize CSS loading with preload hints
      return html.replace(
        /<link([^>]*?)rel="stylesheet"([^>]*?)href="([^"]*\/assets\/[^"]*\.css)"([^>]*?)>/g,
        (match, before, _between, href) => {
          // Add preload hint and make it non-blocking for performance
          if (!match.includes('preload') && !match.includes('index-')) {
            return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">`;
          }
          // Keep main CSS synchronous but add preload for faster discovery
          if (match.includes('index-') && !match.includes('preload')) {
            return `<link rel="preload" href="${href}" as="style">${match}`;
          }
          return match;
        }
      );
    },
  };
}


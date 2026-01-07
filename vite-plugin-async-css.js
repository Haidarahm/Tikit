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
      // Ensure main CSS bundle has preload hint for faster discovery
      // But keep it synchronous since it's critical CSS
      return html.replace(
        /<link([^>]*?)rel="stylesheet"([^>]*?)href="([^"]*\/assets\/[^"]*\.css)"([^>]*?)>/g,
        (match, before, _between, href) => {
          // Add preload hint before the stylesheet link for faster discovery
          if (!match.includes('preload')) {
            return `<link rel="preload" href="${href}" as="style">${match}`;
          }
          return match;
        }
      );
    },
  };
}


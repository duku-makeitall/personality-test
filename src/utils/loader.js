/* src/utils/loader.js */

/**
 * Dynamically injects a CSS stylesheet into the document head if it is not already loaded.
 * @param {string} cssUrl - The resolved URL of the CSS file.
 */
export function injectStylesheet(cssUrl) {
  // Clean URL to check if the stylesheet has already been injected
  const cleanUrl = cssUrl.split('?')[0];
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  const isAlreadyLoaded = links.some(link => {
    try {
      return new URL(link.getAttribute('href'), document.baseURI).pathname === new URL(cleanUrl, document.baseURI).pathname;
    } catch {
      return link.getAttribute('href').includes(cleanUrl);
    }
  });

  if (!isAlreadyLoaded) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    // Append timestamp query string as a cache-buster during development
    const separator = cssUrl.includes('?') ? '&' : '?';
    link.href = `${cssUrl}${separator}t=${Date.now()}`;
    document.head.appendChild(link);
  }
}

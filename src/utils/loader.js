/* src/utils/loader.js */

/**
 * Dynamically injects a CSS stylesheet into the document head if it is not already loaded.
 * @param {string} cssUrl - The resolved URL of the CSS file.
 */
export function injectStylesheet(cssUrl) {
  const existingLink = document.querySelector(`link[href="${cssUrl}"]`);
  if (!existingLink) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    document.head.appendChild(link);
  }
}

/* src/components/Button/Button.js */
import { injectStylesheet } from '../../utils/loader.js';

// Resolve and inject styling
const cssUrl = new URL('./Button.css', import.meta.url).href;
injectStylesheet(cssUrl);

/**
 * Creates a reusable button element.
 * @param {Object} props
 * @param {string} props.text - The text content of the button.
 * @param {'primary'|'choice'|'back'|'share'} [props.type='primary'] - The style class.
 * @param {Function} [props.onClick] - The click handler.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.icon=''] - Optional HTML/Emoji representing an icon.
 * @returns {HTMLButtonElement}
 */
export function createButton({ text, type = 'primary', onClick, disabled = false, icon = '' }) {
  const btn = document.createElement('button');
  btn.className = `btn btn-${type}`;
  btn.disabled = disabled;

  let innerHTML = '';
  if (icon) {
    innerHTML += `<span class="btn-icon" style="margin-right: 8px; display: inline-flex; align-items: center;">${icon}</span>`;
  }
  innerHTML += `<span class="btn-text">${text}</span>`;
  btn.innerHTML = innerHTML;

  if (onClick) {
    btn.addEventListener('click', onClick);
  }

  return btn;
}

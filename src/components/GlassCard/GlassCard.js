/* src/components/GlassCard/GlassCard.js */
import { injectStylesheet } from '../../utils/loader.js';

// Resolve and inject styling
const cssUrl = new URL('./GlassCard.css', import.meta.url).href;
injectStylesheet(cssUrl);

/**
 * Creates a glassmorphism card container.
 * @param {Object} props
 * @param {HTMLElement|string} props.content - Element or HTML string to put inside the card.
 * @param {boolean} [props.interactive=false] - Add lift & glow hover interactions.
 * @param {string} [props.customClass=''] - Additional custom CSS class name.
 * @returns {HTMLDivElement}
 */
export function createGlassCard({ content, interactive = false, customClass = '' }) {
  const card = document.createElement('div');
  card.className = `card-glass ${interactive ? 'card-glass-interactive' : ''} ${customClass}`.trim();

  if (content instanceof HTMLElement) {
    card.appendChild(content);
  } else {
    card.innerHTML = content;
  }

  return card;
}

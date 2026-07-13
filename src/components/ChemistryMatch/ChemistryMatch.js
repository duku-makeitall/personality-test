/* src/components/ChemistryMatch/ChemistryMatch.js */
import { injectStylesheet } from '../../utils/loader.js';

// Resolve and inject styling
const cssUrl = new URL('./ChemistryMatch.css', import.meta.url).href;
injectStylesheet(cssUrl);

/**
 * Creates the chemistry matchmaking display.
 * @param {Object} props
 * @param {string} props.partnerTypeId - Type identifier (e.g. 'builder', 'idea').
 * @param {string} props.partnerTypeName - Type name (e.g. '제작형').
 * @param {string} props.partnerEmoji - Partner emoji (e.g. '🛠️').
 * @param {string} props.reason - Chemistry compatibility details.
 * @returns {HTMLDivElement}
 */
export function createChemistryMatch({ partnerTypeId, partnerTypeName, partnerEmoji, reason }) {
  const container = document.createElement('div');
  container.className = 'chemistry-container fade-in-slide';

  container.innerHTML = `
    <div class="chemistry-title-label">
      <span>🤝</span>
      <span>환상의 파트너 (궁합)</span>
    </div>
    
    <div class="chemistry-card">
      <div class="chemistry-partner-badge partner-badge-${partnerTypeId}">
        ${partnerEmoji}
      </div>
      <div class="chemistry-partner-info">
        <span class="chemistry-partner-name">${partnerTypeName}</span>
        <p class="chemistry-partner-reason">${reason}</p>
      </div>
    </div>
  `;

  return container;
}

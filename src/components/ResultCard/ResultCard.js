/* src/components/ResultCard/ResultCard.js */
import { injectStylesheet } from '../../utils/loader.js';

// Resolve and inject styling
const cssUrl = new URL('./ResultCard.css', import.meta.url).href;
injectStylesheet(cssUrl);

/**
 * Creates a detailed result display card.
 * @param {Object} props
 * @param {string} props.typeId - Lowercase key of the type (e.g., 'idea', 'builder').
 * @param {string} props.typeName - Display name of the type (e.g., '아이디어형').
 * @param {string} props.typeTitle - Catchphrase (e.g., '세상을 바꾸는 혁신적 발상가').
 * @param {string} props.role - Recommended role (e.g., 'CPO (제품 기획)').
 * @param {string[]} props.strengths - List of strengths.
 * @param {string[]} props.weaknesses - List of weaknesses/points to improve.
 * @param {Object} props.roleModel - Representative person info.
 * @param {string} props.roleModel.name - Name (e.g., '스티브 잡스 (애플)').
 * @param {string} props.roleModel.desc - Description (e.g., '혁신적인 비전과 기획력...').
 * @param {string} props.roleModel.emoji - Visual avatar (e.g., '👓').
 * @returns {HTMLDivElement}
 */
export function createResultCard({ typeId, typeName, typeTitle, role, strengths, weaknesses, roleModel }) {
  const container = document.createElement('div');
  container.className = 'result-card-container fade-in-slide';

  // Build the card layout HTML
  container.innerHTML = `
    <div class="result-header">
      <div class="result-subtitle">당신의 창업 성향 유형</div>
      <h1 class="result-title text-gradient-${typeId}">${typeName}</h1>
      <p style="margin-top: 4px; font-weight: 600; color: var(--color-text-white);">${typeTitle}</p>
    </div>
    
    <div class="result-box result-box-${typeId}">
      <div class="result-section">
        <div class="result-section-title">
          <span>🎯</span>
          <span>추천 스타트업 역할</span>
        </div>
        <p style="color: var(--color-text-white); font-weight: 700; font-size: 1.05rem; padding-left: 8px;">
          ${role}
        </p>
      </div>

      <hr style="border: 0; height: 1px; background: var(--color-border-glass); margin: 20px 0;">

      <div class="result-section">
        <div class="result-section-title">
          <span>💪</span>
          <span>주요 강점</span>
        </div>
        <ul class="result-list">
          ${strengths.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>

      <div class="result-section">
        <div class="result-section-title">
          <span>⚠️</span>
          <span>보완해야 할 점</span>
        </div>
        <ul class="result-list">
          ${weaknesses.map(w => `<li>${w}</li>`).join('')}
        </ul>
      </div>

      <hr style="border: 0; height: 1px; background: var(--color-border-glass); margin: 20px 0;">

      <div class="result-section">
        <div class="result-section-title">
          <span>👤</span>
          <span>대표적 롤모델</span>
        </div>
        <div class="role-model-badge">
          <div class="role-model-avatar">${roleModel.emoji || '👤'}</div>
          <div class="role-model-info">
            <span class="role-model-name">${roleModel.name}</span>
            <span class="role-model-desc">${roleModel.desc}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  return container;
}

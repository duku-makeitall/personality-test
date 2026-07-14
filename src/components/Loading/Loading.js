/* src/components/Loading/Loading.js */
import { injectStylesheet } from '../../utils/loader.js';
import { createGlassCard } from '../GlassCard/GlassCard.js';

// Resolve and inject styling
const cssUrl = new URL('./Loading.css', import.meta.url).href;
injectStylesheet(cssUrl);

// Micro-copy messages for analysis simulation
const loadingMessages = [
  "🔄 당신의 답변을 기반으로 창업 DNA를 복제하는 중...",
  "📈 비즈니스 모델(BM)의 시장 타당성을 검증하는 중...",
  "⚙️ 서비스 아키텍처와 MVP 개발 효율을 시뮬레이션하는 중...",
  "👥 팀 내 잠재적 갈등 극복 지수와 소통 스타일을 측정하는 중...",
  "📊 6가지 창업 핵심 스탯(기획, 개발, 분석 등)을 가공하는 중..."
];

/**
 * Creates the Loading / Analysis simulation page.
 * @param {Object} props
 * @param {Function} props.onComplete - Callback triggered when loading ends (approx. 2 seconds).
 * @returns {HTMLDivElement}
 */
export function createLoadingPage({ onComplete }) {
  const container = document.createElement('div');
  container.className = 'loading-page-container fade-in-slide';

  // 1. Creative pulse graphic
  const pulseHtml = `
    <div class="loading-pulse-wrapper">
      <div class="loading-pulse-glow"></div>
      <div class="loading-pulse-ring"></div>
      <div class="loading-pulse-icon">🧬</div>
    </div>
  `;

  // 2. Headings and loading text anchor
  const cardContentHtml = `
    <div class="loading-inner">
      ${pulseHtml}
      <h2 class="loading-title">당신의 창업 DNA 분석 중</h2>
      <p class="loading-subtitle">잠시만 기다려주시면 분석 결과가 산출됩니다.</p>
      <div class="loading-status-box">
        <p id="loading-status-text" class="loading-status-text">${loadingMessages[0]}</p>
      </div>
    </div>
  `;

  // 3. Render base inside a GlassCard
  const loadingCard = createGlassCard({
    content: cardContentHtml,
    interactive: false,
    customClass: 'loading-card'
  });

  container.appendChild(loadingCard);

  // 4. Start analysis simulation timers
  const statusTextEl = loadingCard.querySelector('#loading-status-text');
  
  // Message rotation interval (every 400ms)
  let messageIdx = 0;
  const messageInterval = setInterval(() => {
    if (statusTextEl && messageIdx < loadingMessages.length - 1) {
      messageIdx++;
      statusTextEl.classList.remove('fade-in-slide');
      void statusTextEl.offsetWidth; // Trigger reflow
      statusTextEl.textContent = loadingMessages[messageIdx];
      statusTextEl.classList.add('fade-in-slide');
    }
  }, 400);

  // Total simulation timeout (2 seconds)
  setTimeout(() => {
    clearInterval(messageInterval);
    if (onComplete) {
      onComplete();
    }
  }, 2000);

  return container;
}

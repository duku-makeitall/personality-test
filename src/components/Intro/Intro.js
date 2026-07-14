/* src/components/Intro/Intro.js */
import { injectStylesheet } from '../../utils/loader.js';
import { createGlassCard } from '../GlassCard/GlassCard.js';
import { createButton } from '../Button/Button.js';

// Resolve and inject styling
const cssUrl = new URL('./Intro.css', import.meta.url).href;
injectStylesheet(cssUrl);

/**
 * Creates the Intro/Main Page component.
 * @param {Object} props
 * @param {Function} props.onStart - Callback function triggered when "Start" button is clicked.
 * @returns {HTMLDivElement}
 */
export function createIntroPage({ onStart }) {
  const container = document.createElement('div');
  container.className = 'intro-container fade-in-slide';

  // 1. Creative Startup Visual Graphic (Glassmorphism & Neon Glows)
  const visualHtml = `
    <div class="intro-visual-wrapper">
      <div class="intro-glow-sphere primary"></div>
      <div class="intro-glow-sphere secondary"></div>
      <div class="intro-visual-card">
        <span class="intro-visual-emoji">🚀</span>
        <div class="intro-visual-badge">STARTUP DNA</div>
      </div>
    </div>
  `;

  // 2. Headings and description
  const contentHtml = `
    ${visualHtml}
    <h1 class="intro-title">
      내 안의 <span class="text-gradient">창업 DNA</span>는 무엇일까?
    </h1>
    <p class="intro-subtitle">창업 캠프 필수 코스, 3분 창업 성향 진단</p>
    <p class="intro-description">
      실제 스타트업 창업 상황 속 질문을 통해 나의 강점을 파악하고,<br>
      창업팀에서 내가 발휘할 수 있는 최고의 역할을 확인해보세요!
    </p>
    <div class="intro-cta-wrapper" id="intro-cta-anchor"></div>
  `;

  // 3. Render base content inside a GlassCard
  const introCard = createGlassCard({
    content: contentHtml,
    interactive: false,
    customClass: 'intro-card'
  });

  container.appendChild(introCard);

  // 4. Create and mount the Primary CTA Button
  const startBtn = createButton({
    text: '테스트 시작하기',
    type: 'primary',
    icon: '⚡',
    onClick: onStart
  });
  
  // Find button anchor and append
  const btnAnchor = introCard.querySelector('#intro-cta-anchor');
  if (btnAnchor) {
    btnAnchor.appendChild(startBtn);
  }

  return container;
}

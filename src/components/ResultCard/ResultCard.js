/* src/components/ResultCard/ResultCard.js */
import { injectStylesheet } from '../../utils/loader.js';
import { createGlassCard } from '../GlassCard/GlassCard.js';
import { createButton } from '../Button/Button.js';
import { createChemistryMatch } from '../ChemistryMatch/ChemistryMatch.js';
import { startupTypes } from '../../utils/startupTypes.js';
import { drawRadarChart } from './RadarChart.js';
import { loadConfig } from '../../utils/config.js';

// Resolve and inject styling
const cssUrl = new URL('./ResultCard.css', import.meta.url).href;
injectStylesheet(cssUrl);

/**
 * Creates the complete Result Page component.
 * @param {Object} props
 * @param {string[]} props.userAnswers - Array of selected types for all 12 questions.
 * @param {Function} props.onRetry - Callback triggered when "Retry" button is clicked.
 * @returns {HTMLDivElement}
 */
export function createResultPage({ userAnswers, onRetry }) {
  const container = document.createElement('div');
  container.className = 'result-page-container fade-in-slide';

  // 1. Calculate Scores for 6 startup personality types
  const scores = {
    idea: 0,
    builder: 0,
    strategy: 0,
    collaboration: 0,
    analysis: 0,
    execution: 0
  };

  userAnswers.forEach(ans => {
    if (ans && scores[ans] !== undefined) {
      scores[ans]++;
    }
  });

  // 2. Determine final type with tie-breaking priority rules
  // Priority: idea > builder > strategy > execution > analysis > collaboration
  const priority = ['idea', 'builder', 'strategy', 'execution', 'analysis', 'collaboration'];
  let maxScore = -1;
  let finalTypeId = 'idea';

  priority.forEach(typeKey => {
    const score = scores[typeKey];
    if (score > maxScore) {
      maxScore = score;
      finalTypeId = typeKey;
    }
  });

  const typeData = startupTypes[finalTypeId];

  // 3. Render base ResultCard layout
  const resultCardEl = createResultCardBase(typeData);
  container.appendChild(resultCardEl);

  // 4. Inject ChemistryMatch Card
  const resultBoxEl = resultCardEl.querySelector(`.result-box-${finalTypeId}`);
  if (resultBoxEl) {
    const chemCard = createChemistryMatch(typeData.partner);
    
    // Create separator
    const hr = document.createElement('hr');
    hr.className = 'result-divider';
    
    resultBoxEl.appendChild(hr);
    resultBoxEl.appendChild(chemCard);
  }

  // 5. Draw Radar Chart using Canvas API
  const canvas = resultCardEl.querySelector('#radar-chart-canvas');
  if (canvas) {
    // Delay slightly to ensure rect client width is fully computed
    requestAnimationFrame(() => {
      drawRadarChart(canvas, scores);
    });
  }

  // 6. Action buttons (Share, Kakao & Retry)
  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'result-actions-container';

  const shareBtn = createButton({
    text: '결과 링크 복사하기',
    type: 'share',
    icon: '🔗',
    onClick: handleShareLink
  });

  const kakaoBtn = createButton({
    text: '카카오톡 공유',
    type: 'share',
    icon: '💬',
    onClick: handleKakaoShare
  });
  kakaoBtn.classList.add('btn-kakao');

  const retryBtn = createButton({
    text: '테스트 다시 하기',
    type: 'primary',
    icon: '🔄',
    onClick: onRetry
  });

  actionsContainer.appendChild(shareBtn);
  actionsContainer.appendChild(kakaoBtn);
  actionsContainer.appendChild(retryBtn);
  container.appendChild(actionsContainer);

  // Toast notification for link copy feedback
  function handleShareLink() {
    // Generate sharing URL (with final type parameters for future extension)
    const shareUrl = `${window.location.origin}${window.location.pathname}?type=${finalTypeId}`;
    
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        showToast("🔗 결과 링크가 클립보드에 복사되었습니다!");
      })
      .catch(err => {
        console.error("Failed to copy link: ", err);
        showToast("❌ 복사에 실패했습니다. 주소창의 링크를 직접 공유해주세요.");
      });
  }

  // KakaoTalk Sharing Handler
  async function handleKakaoShare() {
    try {
      const config = await loadConfig();
      const apiKey = config.KAKAO_JS_KEY;
      
      if (!apiKey) {
        throw new Error("Kakao JavaScript API Key not found in .env");
      }

      if (!window.Kakao) {
        throw new Error("Kakao SDK not loaded on window");
      }

      // Initialize Kakao SDK if not already done
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(apiKey);
      }

      // Prepare Kakao Feed Template
      const shareUrl = `${window.location.origin}${window.location.pathname}?type=${finalTypeId}`;
      
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `나의 창업 DNA는 [${typeData.typeName}]!`,
          description: `${typeData.typeTitle}\n\n나의 강점: ${typeData.strengths[0]}`,
          imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '나도 테스트 하러 가기',
            link: {
              mobileWebUrl: `${window.location.origin}${window.location.pathname}`,
              webUrl: `${window.location.origin}${window.location.pathname}`,
            },
          },
        ],
      });
    } catch (err) {
      console.error("Kakao Share Error:", err);
      showToast("❌ 카카오톡 공유를 실행할 수 없습니다.");
    }
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification fade-in-slide';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) translateX(-50%)';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  return container;
}

/**
 * Creates the base inner HTML structures of ResultCard.
 */
function createResultCardBase({ typeId, typeName, typeTitle, role, strengths, weaknesses, roleModel }) {
  const card = document.createElement('div');
  card.className = 'result-card-inner';

  const contentHtml = `
    <div class="result-header">
      <div class="result-subtitle">당신의 창업 성향 유형</div>
      <h1 class="result-title text-gradient-${typeId}">${typeName}</h1>
      <p class="result-catchphrase">${typeTitle}</p>
    </div>

    <!-- 1. Interactive Radar Chart Area -->
    <div class="radar-chart-wrapper">
      <canvas id="radar-chart-canvas" class="radar-chart-canvas"></canvas>
    </div>
    
    <div class="result-box result-box-${typeId}">
      <div class="result-section">
        <div class="result-section-title">
          <span>🎯</span>
          <span>추천 스타트업 역할</span>
        </div>
        <p class="result-recommended-role">
          ${role}
        </p>
      </div>

      <hr class="result-divider">

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

      <hr class="result-divider">

      <div class="result-section">
        <div class="result-section-title">
          <span>👤</span>
          <span>대표적 롤모델</span>
        </div>
        <div class="role-model-badge">
          <div class="role-model-avatar role-model-avatar-${typeId}">${roleModel.emoji || '👤'}</div>
          <div class="role-model-info">
            <span class="role-model-name">${roleModel.name}</span>
            <span class="role-model-desc">${roleModel.desc}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const glassCard = createGlassCard({
    content: contentHtml,
    interactive: false,
    customClass: 'result-main-card'
  });

  card.appendChild(glassCard);
  return card;
}

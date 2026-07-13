# [디자인 가이드] 창업 성향 테스트 웹사이트 (design.md)
**작성일**: 2026년 7월 13일  
**디자이너**: UI/UX 디자인 전문가 & 프론트엔드 개발자  
**테마**: 프리미엄 다크 모드 (Sleek Dark Mode) + 글래스모피즘 (Glassmorphism)  

---

## 1. 디자인 컨셉 및 무드보드 (Design Concept)

### 1.1 핵심 무드: "Dynamic Tech-Startup Vibe"
대학생 참가자들에게 스타트업 특유의 젊고 역동적이며 전문적인 느낌을 선사합니다.  
- **Dark Elegance**: 세련되고 눈이 편안한 다크 블루/다크 네이비 배경
- **Neon Accent**: 네온 블루, 퍼플, 시안 등 빛나는 포인트 컬러로 몰입감 부여
- **Glassmorphic Depth**: 반투명한 블러 유리 질감(Glassmorphism)을 사용하여 공간감과 입체감 설계
- **Emoji-Driven Visuals**: 별도의 리소스 없이 이모지와 그라데이션 광원(Glow)만으로 각 창업 성향 카드를 개성 있게 표현

### 1.2 디자인 시안 (UI Mockup)
![창업 성향 테스트 UI 디자인 시안](file:///C:/Users/MakeitallDev/.gemini/antigravity-ide/brain/8b3f0b14-ac24-4687-9ce0-528ad9fa3490/startup_test_korean_ui_mockups_1783947382702.png)

---

## 2. 컬러 시스템 (Color System)

모든 색상은 CSS 변수(`var(--color-*)`)로 관리되어 테마의 통일성과 추후 유지보수가 용이하도록 구성합니다.

### 2.1 글로벌 CSS 변수 정의 (`:root`)
```css
:root {
  /* Background Colors */
  --color-bg-darkest: #0a0e1a;  /* 전체 바디 배경 */
  --color-bg-darker: #121829;   /* 콘텐츠 카드 배경 */
  --color-bg-glass: rgba(18, 24, 41, 0.65); /* 글래스모피즘 배경 */
  --color-border-glass: rgba(255, 255, 255, 0.08); /* 유리 경계선 */

  /* Neon Accent Colors */
  --color-primary: #00e5ff;      /* 네온 시안 (활력, 메인 포인트) */
  --color-secondary: #bd00ff;    /* 네온 퍼플 (서브 포인트) */
  --color-success: #00ff66;      /* 네온 그린 (안정, 정답/활성화) */
  --color-warning: #ffb800;      /* 네온 옐로우 (주의/진행률) */
  --color-danger: #ff0055;       /* 네온 핑크 (에러/뒤로가기) */

  /* Neutral Text Colors */
  --color-text-white: #ffffff;   /* 제목, 중요 강조 텍스트 */
  --color-text-gray: #94a3b8;    /* 본문, 부설명 */
  --color-text-muted: #64748b;   /* 비활성, 플레이스홀더 */

  /* Shadows & Glows */
  --glow-primary: 0 0 15px rgba(0, 229, 255, 0.4);
  --glow-secondary: 0 0 15px rgba(189, 0, 255, 0.4);
  --shadow-glass: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

### 2.2 성향 유형별 테마 컬러 및 그라데이션

결과 카드 및 성향 전용 배지에 활용할 6개 성향 고유의 그라데이션 컬러입니다.

| 유형명 | 테마 컬러명 | 그라데이션 코드 (CSS) | 이모지 |
| :--- | :--- | :--- | :--- |
| **💡 아이디어형** | Idea Yellow | `linear-gradient(135deg, #FFE259 0%, #FFA751 100%)` | 💡 |
| **🛠️ 제작형** | Builder Teal | `linear-gradient(135deg, #00FFC6 0%, #19B5FE 100%)` | 🛠️ |
| **📈 전략형** | Strategy Blue | `linear-gradient(135deg, #1fa2ff 0%, #12d8fa 50%, #a6ffcb 100%)` | 📈 |
| **🤝 협업형** | Collaboration Pink| `linear-gradient(135deg, #F857A6 0%, #FF5858 100%)` | 🤝 |
| **📊 분석형** | Analysis Purple | `linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)` | 📊 |
| **⚡ 실행형** | Execution Orange | `linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)` | ⚡ |

---

## 3. 타이포그래피 (Typography)

모든 기기에서 가독성이 좋고 미니멀한 서체를 선정했습니다. Google Fonts를 활용해 즉시 연동 가능합니다.

### 3.1 서체 링크 (HTML import)
```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Pretendard:wght@400;600;700&display=swap" rel="stylesheet">
```

### 3.2 폰트 스타일 선언 및 계층 구조
```css
body {
  font-family: 'Pretendard', 'Outfit', sans-serif;
  color: var(--color-text-white);
  -webkit-font-smoothing: antialiased;
}

/* Heading 계층 */
h1 {
  font-size: 2.25rem; /* 36px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 1.75rem; /* 28px */
  font-weight: 600;
  line-height: 1.3;
}

h3 {
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
  line-height: 1.4;
}

/* Body & Caption */
p, span, label {
  font-size: 1rem; /* 16px */
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-gray);
}

.caption {
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  color: var(--color-text-muted);
}
```

---

## 4. UI 컴포넌트 & 버튼 가이드 (UI Components & Buttons)

### 4.1 글래스모피즘 카드 컨테이너 (Glass Card)
기본적인 질문 영역 및 결과 카드의 메인 컨테이너 스타일입니다.
```css
.card-glass {
  background: var(--color-bg-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--color-border-glass);
  border-radius: 24px;
  box-shadow: var(--shadow-glass);
  padding: 32px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
```

### 4.2 버튼 컴포넌트

모든 버튼은 호버 시 세련된 미세 피드백(Micro-Interaction)을 포함해야 합니다.

#### ① 액션 버튼 (Primary CTA) - 메인 화면 '테스트 시작하기'
```css
.btn-primary {
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  color: var(--color-bg-darkest);
  font-weight: 700;
  font-size: 1.125rem;
  padding: 16px 32px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  box-shadow: var(--glow-primary);
  transition: all 0.25s ease-in-out;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 25px rgba(0, 229, 255, 0.7), 0 0 25px rgba(189, 0, 255, 0.7);
  filter: brightness(1.1);
}
```

#### ② 선택지 버튼 (Choice Item) - 테스트 진행 중 답변 선택지
```css
.btn-choice {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border-glass);
  color: var(--color-text-white);
  border-radius: 16px;
  padding: 20px 24px;
  text-align: left;
  font-size: 1rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-choice:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: var(--color-primary);
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.15);
  transform: translateX(4px);
}

.btn-choice:active {
  background: rgba(0, 229, 255, 0.1);
  border-color: var(--color-primary);
  transform: scale(0.99);
}
```

#### ③ 이전 버튼 (Back Button) & 서브 액션 버튼 (Secondary Action)
```css
.btn-back {
  background: transparent;
  border: 1px solid var(--color-text-muted);
  color: var(--color-text-gray);
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-back:hover {
  border-color: var(--color-danger);
  color: var(--color-danger);
  background: rgba(255, 0, 85, 0.05);
}

/* 1번 문항일 경우 비활성화 */
.btn-back:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  border-color: var(--color-text-muted);
  color: var(--color-text-muted);
  background: transparent;
}
```

### 4.3 진행 상황 바 (Progress Bar)
```css
.progress-container {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 40px;
}

.progress-bar {
  height: 100%;
  width: 8.33%; /* 질문 1개당 8.33%씩 증가 (총 12개) */
  background: linear-gradient(90deg, var(--color-primary), var(--color-success));
  border-radius: 10px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 5. 애니메이션 및 전환 가이드 (Animations & Transitions)

세련된 사용자 경험을 위해서는 뚝뚝 끊기는 화면 전환을 배제하고, 부드러운 하드웨어 가속(GPU) CSS 애니메이션을 적용해야 합니다.

### 5.1 문항 전환 애니메이션 (Slide & Fade)
질문이 변경될 때 이전 질문이 사라지고 새로운 질문이 측면에서 등장하는 효과입니다.
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-slide {
  animation: slideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

### 5.2 로딩 화면 분석 루프 애니메이션 (Pulse Glow)
로딩 화면에서 분석 중임을 알리는 부드러운 숨쉬기(Pulse) 광원 효과입니다.
```css
@keyframes pulseGlow {
  0% {
    transform: scale(0.98);
    box-shadow: 0 0 15px rgba(189, 0, 255, 0.3);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 30px rgba(0, 229, 255, 0.6);
  }
  100% {
    transform: scale(0.98);
    box-shadow: 0 0 15px rgba(189, 0, 255, 0.3);
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: pulseGlow 2s infinite ease-in-out;
}
```

---

## 6. 반응형 레이아웃 가이드 (Responsive Layout)

모바일 중심의 UX 디자인을 우선 설계하되(Mobile-First), 태블릿과 웹 화면에서도 자연스러운 공간 배치가 이루어지도록 Breakpoint를 설계합니다.

### 6.1 미디어 쿼리 중단점 정의
```css
/* Mobile (기본 스타일) */
.layout-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
}

/* Tablet (768px 이상) */
@media (min-width: 768px) {
  .layout-container {
    max-width: 680px;
    padding: 40px;
  }
  h1 {
    font-size: 2.75rem;
  }
}

/* Desktop (1024px 이상 - 결과 화면 배치 최적화) */
@media (min-width: 1024px) {
  .layout-container {
    max-width: 900px;
  }
  /* 결과 페이지의 궁합 매칭 영역을 데스크톱에서는 2열 가로 배치로 조율 가능 */
  .grid-two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
}
```

---

## 7. 접근성 및 디테일 가이드 (Web Accessibility)

1. **포커스 링 (Focus Ring) 제공**: 
   키보드 네비게이션 시 포커스가 튀지 않도록 스타일을 유지하되, 브라우저 기본 포커스 링 대신 네온 시안 아웃라인을 설정합니다.
   ```css
   button:focus-visible {
     outline: 2px solid var(--color-primary);
     outline-offset: 4px;
   }
   ```
2. **명도 대비 (Contrast)**:
   다크 모드 배경 테마(`var(--color-bg-darkest)`) 위에 배치된 텍스트(`var(--color-text-white)`, `var(--color-text-gray)`)는 4.5:1 이상의 높은 대비율을 확보하여 야외나 저사양 모바일 화면에서도 뚜렷하게 읽히도록 설계했습니다.
3. **상태값 명시**:
   결과 화면 등에서 클립보드 복사(링크 복사) 클릭 시 단순히 클립보드로만 옮기는 것이 아니라, `"결과 링크가 복사되었습니다!"`라는 임시 토스트 알림 혹은 툴팁 애니메이션을 즉시 보여주어 피드백을 강화합니다.

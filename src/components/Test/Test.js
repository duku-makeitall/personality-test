/* src/components/Test/Test.js */
import { injectStylesheet } from '../../utils/loader.js';
import { createGlassCard } from '../GlassCard/GlassCard.js';
import { createButton } from '../Button/Button.js';
import { ProgressBar } from '../ProgressBar/ProgressBar.js';
import { questions } from '../../utils/questions.js';

// Resolve and inject styling
const cssUrl = new URL('./Test.css', import.meta.url).href;
injectStylesheet(cssUrl);

/**
 * Creates the Test page component.
 * @param {Object} props
 * @param {Function} props.onComplete - Callback triggered with userAnswers array when all questions are answered.
 * @param {Function} props.onCancel - Callback triggered if user exits the test (e.g. back from question 1).
 * @returns {HTMLDivElement}
 */
export function createTestPage({ onComplete, onCancel }) {
  const container = document.createElement('div');
  container.className = 'test-page-container fade-in-slide';

  // Initialize state
  let currentIdx = 0;
  const totalQuestions = questions.length;
  const userAnswers = []; // Stores the selected type for each question

  // 1. Create Progress Bar Component
  const progress = new ProgressBar();
  container.appendChild(progress.element);
  progress.update(currentIdx + 1, totalQuestions);

  // 2. Create main question card container
  const questionCardContent = document.createElement('div');
  questionCardContent.className = 'question-card-content';
  
  const questionCard = createGlassCard({
    content: questionCardContent,
    interactive: false,
    customClass: 'test-card'
  });
  container.appendChild(questionCard);

  // 3. Render current question & choices
  function renderQuestion() {
    // Scroll to top of window during transition
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Apply transient animation effect
    questionCardContent.classList.remove('fade-in-slide');
    void questionCardContent.offsetWidth; // Trigger reflow
    questionCardContent.classList.add('fade-in-slide');

    const currentQ = questions[currentIdx];
    questionCardContent.innerHTML = ''; // Clear

    // Q Number Badge
    const qBadge = document.createElement('div');
    qBadge.className = 'q-badge';
    qBadge.innerHTML = `Q. <strong>${String(currentQ.id).padStart(2, '0')}</strong>`;
    questionCardContent.appendChild(qBadge);

    // Question Text
    const qTitle = document.createElement('h3');
    qTitle.className = 'q-title';
    qTitle.textContent = currentQ.question;
    questionCardContent.appendChild(qTitle);

    // Choices Container
    const choicesList = document.createElement('div');
    choicesList.className = 'choices-list';
    
    currentQ.choices.forEach((choice, choiceIdx) => {
      const choiceBtn = createButton({
        text: choice.text,
        type: 'choice',
        onClick: () => handleChoiceSelect(choice.type)
      });
      choicesList.appendChild(choiceBtn);
    });
    questionCardContent.appendChild(choicesList);

    // Footer actions container (Back button)
    const footerContainer = document.createElement('div');
    footerContainer.className = 'test-footer';

    const backBtn = createButton({
      text: '이전 질문',
      type: 'back',
      icon: '⬅️',
      disabled: currentIdx === 0,
      onClick: handleGoBack
    });
    footerContainer.appendChild(backBtn);

    questionCardContent.appendChild(footerContainer);

    // Update ProgressBar
    progress.update(currentIdx + 1, totalQuestions);
  }

  // Handle option selection
  function handleChoiceSelect(type) {
    userAnswers[currentIdx] = type;

    if (currentIdx < totalQuestions - 1) {
      currentIdx++;
      renderQuestion();
    } else {
      // Completed all questions
      onComplete(userAnswers);
    }
  }

  // Handle go back
  function handleGoBack() {
    if (currentIdx > 0) {
      // Clear current answer slot
      userAnswers[currentIdx] = undefined;
      currentIdx--;
      renderQuestion();
    } else if (onCancel) {
      onCancel();
    }
  }

  // Start rendering the first question
  renderQuestion();

  return container;
}

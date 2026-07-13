/* src/components/ProgressBar/ProgressBar.js */
import { injectStylesheet } from '../../utils/loader.js';

// Resolve and inject styling
const cssUrl = new URL('./ProgressBar.css', import.meta.url).href;
injectStylesheet(cssUrl);

export class ProgressBar {
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'progress-wrapper';
    
    // Create elements structure
    this.element.innerHTML = `
      <div class="progress-label">
        <span>진행률</span>
        <span class="progress-label-number"><strong class="progress-current">1</strong> / <span class="progress-total">12</span></span>
      </div>
      <div class="progress-container">
        <div class="progress-bar"></div>
      </div>
    `;
    
    // Cache element references
    this.bar = this.element.querySelector('.progress-bar');
    this.currentText = this.element.querySelector('.progress-current');
    this.totalText = this.element.querySelector('.progress-total');
  }

  /**
   * Updates the progress bar percentage and indicator labels.
   * @param {number} current - Current question number (1-indexed).
   * @param {number} total - Total question count.
   */
  update(current, total) {
    this.currentText.textContent = current;
    this.totalText.textContent = total;
    
    // Calculate percentage
    const percentage = Math.min(100, Math.max(0, (current / total) * 100));
    this.bar.style.width = `${percentage}%`;
  }
}

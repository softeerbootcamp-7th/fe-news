import { ANIMATION } from "../constants/constants";
import { loadHeadlineNewsData } from "../utils/newsDataManager";

class HeadlineSlider {
  constructor(startIdx, side, delay, sliderManager) {
    this.startIdx = startIdx;
    this.side = side;
    this.currentIdx = startIdx;
    this.allNewsData = [];
    this.delay = delay;
    this.sliderManager = sliderManager;
    this.lastRollTime = -Infinity;

    this.sliderManager.sliders.push(this);
  }

  async init() {
    await this.loadInitialData();
    this.renderHeadlines();
    this.setupHoverEvents();
  }

  async loadInitialData() {
    this.allNewsData = await loadHeadlineNewsData("/headlineNewsData.json");
  }

  createHeadlineItem(news) {
    return /* html */ `
      <div class="rolling-wrapper">
          <div class="headline-content">
              <a href="${news.logo}" target="_blank" rel="noopener" class="news-link">
                  ${news.officeName}
              </a>
              <a href="${news.url}" target="_blank" rel="noopener" class="rolling-item">
                  ${news.title}
              </a>
          </div>
      </div>
    `;
  }

  renderHeadlines() {
    const article = document.querySelector(`.headline-${this.side}`);
    if (!article) return;

    const nextIdx = (this.currentIdx + 1) % this.allNewsData.length;

    article.innerHTML =
      this.createHeadlineItem(this.allNewsData[this.currentIdx]) +
      this.createHeadlineItem(this.allNewsData[nextIdx]);
  }

  setupHoverEvents() {
    const li = document.querySelector(`.headline-${this.side}`)?.closest("li");
    if (!li) return;

    li.addEventListener("mouseenter", () => {
      this.sliderManager.isHovered = true;
    });

    li.addEventListener("mouseleave", () => {
      this.sliderManager.isHovered = false;
      this.sliderManager.needsReset = true;
    });
  }

  checkAndRoll(elapsed) {
    if (this.lastRollTime === -Infinity) {
      if (elapsed >= this.delay) {
        this.handleRolling();
        this.lastRollTime = elapsed;
      }
      return;
    }

    const timeSinceLastRoll = elapsed - this.lastRollTime;

    if (timeSinceLastRoll >= ANIMATION.HEADLINE_INTERVAL) {
      this.handleRolling();
      this.lastRollTime += ANIMATION.HEADLINE_INTERVAL;
    }
  }

  handleRolling() {
    const article = document.querySelector(`.headline-${this.side}`);
    if (!article) return;

    const wrappers = article.querySelectorAll(".rolling-wrapper");

    const nextIdx = (this.currentIdx + 1) % this.allNewsData.length;
    const afterNextIdx = (this.currentIdx + 2) % this.allNewsData.length;

    wrappers.forEach((wrapper) => wrapper.classList.add("rolling-out"));

    setTimeout(() => {
      wrappers.forEach((wrapper) => wrapper.remove());

      article.innerHTML =
        this.createHeadlineItem(this.allNewsData[nextIdx]) +
        this.createHeadlineItem(this.allNewsData[afterNextIdx]);

      this.currentIdx = nextIdx;
    }, ANIMATION.HEADLINE_TRANSITION);
  }

  getHTML() {
    return /* html */ `
      <ul class="headline-list">
          <li>
              <article class="headline-${this.side}">
              </article>
          </li>
      </ul>
    `;
  }
}

export default function rollingSection(startIdx, side, delay, sliderManager) {
  const slider = new HeadlineSlider(startIdx, side, delay, sliderManager);
  slider.init();
  return slider.getHTML();
}

import { ANIMATION, RECENT_NEWS } from "../constants/constants";
import "../style/headelineSlider.css";
import rollingSection from "./rollingSection";

const sliderManager = {
  isHovered: false,
  sliders: [],
  masterAnimationId: null,
  startTime: null,
  lastFrameTime: null,
  needsReset: false,
};

export default function headelineSlider() {
  setTimeout(() => {
    startMasterAnimation();
    setupVisibilityChange();
  }, 0);

  return /* html */ `
    <section class="headline-section" aria-label="주요 헤드라인">
      <div class="headline-container">
        ${rollingSection(
          RECENT_NEWS.LEFT_NEWS_START,
          "left",
          ANIMATION.HEADLINE_LEFT_DELAY,
          sliderManager
        )}
        ${rollingSection(
          RECENT_NEWS.RIGHT_NEWS_START,
          "right",
          ANIMATION.HEADLINE_RIGHT_DELAY,
          sliderManager
        )}
      </div>
    </section>
  `;
}

function setupVisibilityChange() {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (sliderManager.masterAnimationId) {
        cancelAnimationFrame(sliderManager.masterAnimationId);
        sliderManager.masterAnimationId = null;
      }
    } else {
      sliderManager.startTime = null;
      sliderManager.lastFrameTime = null;
      sliderManager.sliders.forEach((slider) => {
        slider.lastRollTime = -Infinity;
      });
      startMasterAnimation();
    }
  });
}

function startMasterAnimation() {
  const animate = (timestamp) => {
    if (sliderManager.needsReset) {
      sliderManager.startTime = timestamp;
      sliderManager.lastFrameTime = timestamp;
      sliderManager.sliders.forEach((slider) => {
        slider.lastRollTime = slider.delay;
      });
      sliderManager.needsReset = false;
    }

    if (sliderManager.lastFrameTime) {
      const frameDelta = timestamp - sliderManager.lastFrameTime;

      if (frameDelta > 100) {
        sliderManager.startTime = timestamp;
        sliderManager.sliders.forEach((slider) => {
          slider.lastRollTime = slider.delay;
        });
      }
    }

    if (!sliderManager.startTime) {
      sliderManager.startTime = timestamp;
    }

    sliderManager.lastFrameTime = timestamp;

    if (!sliderManager.isHovered) {
      const elapsed = timestamp - sliderManager.startTime;

      sliderManager.sliders.forEach((slider) => {
        slider.checkAndRoll(elapsed);
      });
    }

    sliderManager.masterAnimationId = requestAnimationFrame(animate);
  };

  sliderManager.masterAnimationId = requestAnimationFrame(animate);
}

import { AutoPageTimer } from "../utils/autoPageTimer.js";
import { AUTO_PAGE } from "../constants/constants.js";
import { eventBus, EVENTS } from "../utils/eventBus.js";

let autoPageTimer = null;
let progressTabElement = null;
let containerRef = null;
let pageChangeCallback = null;

const START_COLOR = "#7890E7";
const END_COLOR = "#4362D0";

export function initAutoPageModule() {
  eventBus.subscribe(EVENTS.VIEW_CHANGED, ({ newView, previousView }) => {
    if (previousView === "list") {
      cleanup();
    }

    if (newView === "list") {
      setTimeout(() => {
        eventBus.publish(EVENTS.AUTO_PAGE_START);
      }, AUTO_PAGE.SETUP_DELAY);
    }
  });

  eventBus.subscribe(EVENTS.AUTO_PAGE_START, () => {
    if (containerRef && pageChangeCallback) {
      start(containerRef, pageChangeCallback, AUTO_PAGE.DURATION);
    }
  });

  eventBus.subscribe(EVENTS.AUTO_PAGE_STOP, () => {
    stop();
  });

  eventBus.subscribe(EVENTS.AUTO_PAGE_RESTART, () => {
    restart();
  });

  eventBus.subscribe(EVENTS.PAGE_CHANGED, ({ source }) => {
    if (source !== "auto") {
      restart();
    }
  });

  eventBus.subscribe(EVENTS.CATEGORY_CHANGED, () => {
    restart();
  });

  eventBus.subscribe(EVENTS.SUBSCRIBE_REMOVED, () => {
    restart();
  });
}

export function setAutoPageContext(container, onPageChange) {
  containerRef = container;
  pageChangeCallback = onPageChange;
}

function start(container, onPageChange, duration = AUTO_PAGE.DURATION) {
  if (autoPageTimer) {
    autoPageTimer.destroy();
    autoPageTimer = null;
  }

  progressTabElement = container.querySelector("[data-progress-tab]");
  if (!progressTabElement) {
    return;
  }

  autoPageTimer = new AutoPageTimer(
    duration,
    () => handleAutoPageComplete(onPageChange),
    (progress) => updateProgressGradient(progress)
  );

  setupUserInteractionEvents(container);

  autoPageTimer.start();
}

function handleAutoPageComplete(onPageChange) {
  onPageChange("next", "auto");
}

function updateProgressGradient(progress) {
  if (!progressTabElement) return;

  const percentage = progress * 100;
  const gradient = `linear-gradient(to right, ${END_COLOR} ${percentage}%, ${START_COLOR} ${percentage}%)`;

  progressTabElement.style.background = gradient;
}

function setupUserInteractionEvents(container) {
  const categoryTabs = container.querySelectorAll(".category-tab");
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      restart();
    });
  });

  const paginationArrows = container.querySelectorAll(".pagination-arrow");
  paginationArrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      restart();
    });
  });
}

function stop() {
  if (autoPageTimer) {
    autoPageTimer.stop();
  }
  if (progressTabElement) {
    progressTabElement.style.background = "";
  }
}

function restart() {
  if (autoPageTimer) {
    autoPageTimer.restart();
  }
}

export function getAutoPageState() {
  return autoPageTimer
    ? autoPageTimer.getState()
    : { isRunning: false, isPaused: false };
}

function cleanup() {
  if (autoPageTimer) {
    autoPageTimer.destroy();
    autoPageTimer = null;
  }
  if (progressTabElement) {
    progressTabElement.style.background = "";
  }
  progressTabElement = null;
}

export function setupAutoPage(container, onPageChange, duration) {
  start(container, onPageChange, duration);
}

export function stopAutoPage() {
  stop();
}

export function restartAutoPage() {
  restart();
}

export function cleanupAutoPage() {
  cleanup();
}

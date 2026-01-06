import { animateTranslateY } from "../../lib/animation";
import { createEl } from "../../lib/dom";
import { getRollingData } from "../../lib/pressData";
import { createRollingNewsCard } from "./createRollingNewsCard";

const ROLLING_NEWS_COUNT = 5;
const ROLL_INTERVAL = 5000;
const ROLL_DELAY = 1000;
const ANIMATION_DURATION = 500;

let leftRollInterval;
let rightRollInterval;
let rightDelayTimeout;

let leftTrackState;
let rightTrackState;

export const createRolling = () => {
  const rollingWrapper = createEl(
    "section",
    "",
    `
    <div id="left-rolling-list" class="border-default surface-alt rolling-list rolling-left">
      <ul class="rolling-track"></ul>
    </div>
    <div id="right-rolling-list" class="border-default surface-alt rolling-list rolling-right">
      <ul class="rolling-track"></ul>
    </div>
  `
  );
  rollingWrapper.id = "roll-wrapper";

  const [leftRollingData, rightRollingData] = [
    ...getRollingData({ left: ROLLING_NEWS_COUNT, right: ROLLING_NEWS_COUNT }),
  ];

  const leftTrack = rollingWrapper.querySelector(
    ".rolling-left .rolling-track"
  );
  const rightTrack = rollingWrapper.querySelector(
    ".rolling-right .rolling-track"
  );

  leftTrackState = setUpTrack(leftTrack, leftRollingData, 2);
  rightTrackState = setUpTrack(rightTrack, rightRollingData, 2);

  startRolling();
  addHoverListeners([leftTrack, rightTrack]);

  return rollingWrapper;
};

// Helper function to set up a rolling track
const setUpTrack = (track, data, trackCount) => {
  track.innerHTML = "";

  data.slice(0, trackCount).forEach((item) => {
    const newsCard = createRollingNewsCard(item.pressName, item.title);
    track.appendChild(newsCard);
  });

  return { topIdx: 0, trackData: data, track, isAnimating: false };
};

// Function to update the content of the bottom card
const updateBottomCardContent = (li, { pressName, title }) => {
  li.querySelector(".news-provider").textContent = pressName;
  li.querySelector(".news-headline").textContent = title;
};

// Function to roll track
const roll = (state) => {
  const { trackData, track } = state;
  if (!trackData || !track || trackData.length === 0) return;
  if (state.isAnimating) return;

  const firstLi = track.firstElementChild;
  const rollHeight = firstLi.offsetHeight;

  track.style.transform = "translateY(0)";
  animateTranslateY({
    el: track,
    from: 0,
    to: -rollHeight,
    duration: ANIMATION_DURATION,
    easing: "easeInOutCubic",
    onComplete: () => {
      track.style.transition = "none";
      track.style.transform = "translateY(0)";

      track.appendChild(firstLi);

      state.topIdx = (state.topIdx + 1) % trackData.length;
      const nextIdx = (state.topIdx + 1) % trackData.length;
      updateBottomCardContent(firstLi, trackData[nextIdx]);
      state.isAnimating = false;
    },
  });
};

// Function to start rolling both tracks
const startRolling = () => {
  stopRolling();
  leftRollInterval = setInterval(() => roll(leftTrackState), ROLL_INTERVAL);
  rightDelayTimeout = setTimeout(() => {
    rightRollInterval = setInterval(() => roll(rightTrackState), ROLL_INTERVAL);
  }, ROLL_DELAY);
};

// Function to stop rolling both tracks
const stopRolling = () => {
  clearInterval(leftRollInterval);
  clearInterval(rightRollInterval);
  clearTimeout(rightDelayTimeout);
};

// Function to add hover listeners to pause/resume rolling
const addHoverListeners = (tracks) => {
  let hoverTimeout;
  tracks.forEach((track) => {
    track.addEventListener("mouseenter", () => {
      stopRolling();
      clearTimeout(hoverTimeout);
    });

    track.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        startRolling();
      }, ROLL_DELAY);
    });
  });
};

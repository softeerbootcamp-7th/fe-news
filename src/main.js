// src/main.js
import { Header } from "./components/Header.js";
import {
  AutoRollingNews,
  initAutoRolling,
} from "./components/AutoRollingNews.js";
import { GridContainer } from "./components/GridContainer.js";

// 앱 상태
const state = {
  selectedTab: "all",
  subscribedPressIds: new Set([1, 2, 3, 4, 5, 6, 7, 8]),
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  allPresses: Array(24)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      name: `press${i + 1}`,
      lightLogo: `/asset/light_mode_logo/press${i + 1}.png`,
      darkLogo: `/asset/dark_mode_logo/press${i + 1}.png`,
    })),
};

// 렌더링
const render = () => {
  const app = document.getElementById("app");

  const template = `
    ${Header()}
    ${AutoRollingNews()}
    <main>
      ${GridContainer(
        state.selectedTab,
        state.subscribedPressIds.size,
        state.allPresses,
        state.isDarkMode
      )}
    </main>
  `;

  app.innerHTML = template;
  attachEventListeners();
  initAutoRolling(); // 롤링 뉴스 초기화
};

// 이벤트 리스너
const attachEventListeners = () => {
  const buttons = document.querySelectorAll(".grid-tab-item");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.getAttribute("data-tab");
      state.selectedTab = tab;
      console.log(`Tab changed to: ${tab}`);
      render();
    });
  });
};

// 다크모드 변경 감지
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    state.isDarkMode = e.matches;
    render();
  });

// 앱 초기화
render();

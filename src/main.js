// src/main.js
import { Header } from "./components/Header.js";
import { RollingNews } from "./components/RollingNews.js";
import { GridContainer } from "./components/GridContainer.js";
import { NEWS_LISTS } from "./store/dummy.js";

// 앱 상태
// const state = {
//   selectedTab: "all",
//   subscribedPressIds: new Set([1, 2, 3, 4, 5, 6, 7, 8]),
//   isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
//   allPresses: Array(24)
//     .fill(null)
//     .map((_, i) => ({
//       id: i + 1,
//       name: `press${i + 1}`,
//       lightLogo: `/assets/light_mode_logo/press${i + 1}.png`,
//       darkLogo: `/assets/dark_mode_logo/press${i + 1}.png`,
//     })),
// };

// 렌더링
const render = () => {
  const app = document.getElementById("app");

  const header = Header({ title: "뉴스스탠드" });
  const rollingNews = RollingNews({
    newsLists: NEWS_LISTS,
  });
  const newsContainer = GridContainer();
  // state.selectedTab,
  // state.subscribedPressIds.size,
  // state.allPresses,
  // state.isDarkMode

  const template = `
    ${header}
    ${rollingNews}
    ${newsContainer}
  `;

  app.innerHTML = template;
  // attachEventListeners();
};

// 이벤트 리스너
// const attachEventListeners = () => {
//   const buttons = document.querySelectorAll(".grid-tab-item");
//   buttons.forEach((button) => {
//     button.addEventListener("click", () => {
//       const tab = button.getAttribute("data-tab");
//       state.selectedTab = tab;
//       console.log(`Tab changed to: ${tab}`);
//       render();
//     });
//   });
// };
// 다크모드 변경 감지
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    state.isDarkMode = e.matches;
    render();
  });

// 앱 초기화
render();

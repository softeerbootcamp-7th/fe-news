// src/main.js
import { Header } from "./components/Header.js";
import { RollingNews } from "./components/RollingNews.js";
import { NewsContainer } from "./components/NewsContainer.js";
import { NEWS_LISTS, PRESS_LIST } from "./dummy.js";
import { Store } from "./store/Store.js";
import {
  PRESS_MODE_TABS,
  VIEW_MODE_TABS,
  STORE_KEY,
  TAB_TYPE,
  TAB_VALUE,
} from "../src/constants.js";
import { NewsGrid } from "./components/NewsGrid.js";
import { NewsList } from "./components/NewsList.js";

// 앱 상태
// const state = {
//   isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
// };

const appStore = new Store({
  subscribedPressIds: [],
  // 키 이름을 STORE_KEY.PRESS_MODE ("press-mode")와 일치시킴
  [STORE_KEY.PRESS_MODE]: PRESS_MODE_TABS[0],
  [STORE_KEY.VIEW_MODE]: VIEW_MODE_TABS[1],
});

// 렌더링
const render = () => {
  const app = document.getElementById("app");

  const header = Header({ title: "뉴스스탠드" });
  const rollingNews = RollingNews({
    newsLists: NEWS_LISTS,
  });
  const newsContainer = NewsContainer();

  const template = `
    ${header}
    ${rollingNews}
    ${newsContainer}
  `;

  app.innerHTML = template;
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

// 클릭시 상태 업데이트
document.getElementById("app").addEventListener("click", (e) => {
  // 탭 클릭 처리
  const tabTarget = e.target.closest("[data-tab-group]");
  if (tabTarget) {
    const { tabItem, tabGroup } = tabTarget.dataset;

    // press mode 탭
    if (tabGroup === STORE_KEY.PRESS_MODE) {
      // debugger;
      appStore.setState({ [STORE_KEY.PRESS_MODE]: tabItem });
    }
    // view mode 탭
    else if (tabGroup === STORE_KEY.VIEW_MODE) {
      // debugger;
      appStore.setState({ [STORE_KEY.VIEW_MODE]: tabItem });
    }
  }
});

// 탭 변화에 대한 리스너 추가
appStore.subscribe((state) => {
  const tabTargets = document.querySelectorAll("[data-tab-group]");

  tabTargets.forEach((target) => {
    // tabGroup에 "pressModeTab" 혹은 "viewModeTab"이 담겨 있음
    const { tabItem, tabGroup, tabType } = target.dataset;

    // 대괄호 표기법을 사용하여 state에서 동적으로 값을 꺼내옵니다.
    const isActive = state[tabGroup] === tabItem;

    // 텍스트 탭 처리
    if (tabType === TAB_TYPE.TEXT) {
      target.classList.toggle("text-strong", isActive);
      target.classList.toggle("selected-bold16", isActive);
      target.classList.toggle("text-weak", !isActive);
      target.classList.toggle("available-medium16", !isActive);
    }

    // 아이콘 탭 처리
    if (tabType === TAB_TYPE.ICON) {
      const svg = target.querySelector("svg");
      svg?.classList.toggle("fill-strong", isActive);
      svg?.classList.toggle("fill-weak", !isActive);
    }
  });
});

// press-mode, view-mode에 변화에 대한 news conatiner 업데이트 리스너 추가
appStore.subscribe((state) => {
  const contentArea = document.getElementById("news-content-area");
  if (!contentArea) return;

  // 1. 데이터 필터링 (전체 vs 구독)
  const displayList =
    state[STORE_KEY.PRESS_MODE] === TAB_VALUE.ALL
      ? PRESS_LIST
      : PRESS_LIST.filter((press) =>
          state.subscribedPressIds.includes(press.id)
        );

  // 2. 뷰 모드 결정 (그리드 vs 리스트)
  const contentHtml =
    state[STORE_KEY.VIEW_MODE] === TAB_VALUE.GRID
      ? NewsGrid({ pressList: displayList })
      : NewsList({ pressList: displayList });

  // 3. 바뀐 부분만 주입
  contentArea.innerHTML = contentHtml;
});

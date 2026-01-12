import { Header } from "./components/Header.js";
import { RollingNews } from "./components/RollingNews.js";
import { NewsContainer } from "./components/NewsContainer.js";
import { NEWS_LISTS, SUBSCRIBED_PRESS_IDS } from "./dummy.js";
import { PRESS_MODE_TABS } from "./constants.js";
import {
  updateSubscribedPressCount,
  updateSubscribedPressCards,
  updatePressMode,
  updateAllPressSubscriptionState,
  updatePageIdx,
} from "./subscribers/newsStandSubscriber.js";
import { NewsStandObservable } from "./store/NewsStandObservable.js";
import { setupEventListeners } from "./events/appClickHandler.js";
import { tabSubscriber } from "./subscribers/tabSubscriber.js";

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

// 전체/구독 탭
// 페이지 인덱스
// 구독정보 저장
const newsStandObservable = new NewsStandObservable({
  pressMode: PRESS_MODE_TABS[0],
  pageIdx: 0,
  subscribedPressIds: SUBSCRIBED_PRESS_IDS,
});

// 구독정보로 배지 업데이트
newsStandObservable.subscribe(updateSubscribedPressCount);
// 구독정보로 구독언론사 카드업데이트
newsStandObservable.subscribe(updateSubscribedPressCards);
// 전체/구독 화면 업데이트
newsStandObservable.subscribe(updatePressMode);
// 전체 언론사 탭의 구독 상태 업데이트
newsStandObservable.subscribe(updateAllPressSubscriptionState);
// 페이지 인덱스 변경 시 카드 렌더링
newsStandObservable.subscribe(updatePageIdx);
// 탭 스타일 업데이트
newsStandObservable.subscribe(tabSubscriber);

// 이벤트 리스너 설정
setupEventListeners({ newsStandObservable });

// 초기 상태 notify하여 초기 렌더링 트리거
newsStandObservable.notify(newsStandObservable.state);

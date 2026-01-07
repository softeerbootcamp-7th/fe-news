import { parsePressData } from "@/utils/parse";
import { shuffleArray } from "@/utils/shuffle";
import { SUBSCRIPTION_TAB } from "@/types/constant";
import { VIEW_TAB } from "@/types/constant";
import {
  isSubscribed,
  getSubscriptionCount,
  toggleSubscription,
  observeSubscriptionStore,
} from "@/store/subscriptionStore";
import {
  getSubscriptionTab,
  observeSubscriptionTabStore,
  setSubscriptionTab,
} from "@/store/subscriptionTabStore";
import {
  getViewTab,
  observeViewTabStore,
  setViewTab,
} from "@/store/viewTabStore";
import { createPaginationController } from "./pagination";
import { initGridView } from "./grid";
import { initListView } from "./list";
import { getLoadingIndicatorTemplate } from "@/template/Loading";

// 상태
let filteredData = [];
const pagination = createPaginationController();

export function initPressView(articlesData) {
  // dummy 데이터 파싱 및 셔플
  const allPressData = shuffleArray(parsePressData(articlesData)); // {id, name, logo}

  // 그리드/리스트 버튼
  addViewTabEvents();
  // 전체/구독 버튼
  addSubscriptionTabEvents();
  // 페이지네이션 버튼
  addPaginationEvents();
  // 구독 해지 다이얼로그 버튼
  addSubscribeEvents();

  // 그리드/리스트 변경 시 뷰 업데이트
  observeViewTabStore(() => {
    pagination.setStrategy(getViewTab());
    renderPressView();
  });
  // 전체/구독 탭 변경 시 데이터 업데이트
  observeSubscriptionTabStore(() => {
    filteredData = filterPressData(allPressData);
    pagination.reset();
    renderPressView();
  });

  // 구독/해지 변경 시 뷰 업데이트
  observeSubscriptionStore(() => {
    updateSubscriptionCount();
    filteredData = filterPressData(allPressData);
    pagination.reset();
    renderPressView();
  });

  // 초기 설정
  setViewTab(VIEW_TAB.GRID);
  setSubscriptionTab(SUBSCRIPTION_TAB.ALL);
  updateSubscriptionCount();
}

function filterPressData(allPressData) {
  if (getSubscriptionTab() === SUBSCRIPTION_TAB.MY) {
    return allPressData.filter((p) => isSubscribed(p.name));
  }
  return allPressData;
}

function renderPressView() {
  // 그리드/리스트 뷰
  const paginatedData = pagination.getPageData(filteredData);
  const { showPrev, showNext } = pagination.getArrowState(filteredData);

  switch (getViewTab()) {
    case VIEW_TAB.GRID:
      initGridView(paginatedData);
      break;
    case VIEW_TAB.LIST:
      initListView();
      break;
  }

  // 좌우 페이지네이션 화살표
  const prevButton = document.querySelector(".press-list__control--prev");
  const nextButton = document.querySelector(".press-list__control--next");
  prevButton.classList.toggle("hidden", !showPrev);
  nextButton.classList.toggle("hidden", !showNext);
}

function updateSubscriptionCount() {
  const subscriptionCount = getSubscriptionCount();
  const [_, myViewButton] = document.querySelectorAll(".press-news__tab");
  myViewButton.querySelector("span").textContent = subscriptionCount;
}

function addSubscriptionTabEvents() {
  // 전체 언론사 뷰 / 내가 구독한 언론사 뷰 버튼
  const [allViewButton, myViewButton] =
    document.querySelectorAll(".press-news__tab");
  allViewButton.addEventListener("click", () => {
    setSubscriptionTab(SUBSCRIPTION_TAB.ALL);
  });
  myViewButton.addEventListener("click", () => {
    setSubscriptionTab(SUBSCRIPTION_TAB.MY);
  });
}

function updateSubscriptionTab(subscriptionTab) {
  const [allViewButton, myViewButton] =
    document.querySelectorAll(".press-news__tab");
  switch (subscriptionTab) {
    case SUBSCRIPTION_TAB.ALL:
      allViewButton.classList.add("active");
      myViewButton.classList.remove("active");
      break;
    case SUBSCRIPTION_TAB.MY:
      myViewButton.classList.add("active");
      allViewButton.classList.remove("active");
      break;
  }
}

function addViewTabEvents() {
  // 그리드/리스트 뷰 버튼
  const [listViewButton, gridViewButton] =
    document.querySelectorAll(".view-toggle");
  gridViewButton.addEventListener("click", () => {
    setViewTab(VIEW_TAB.GRID);
  });
  listViewButton.addEventListener("click", () => {
    setViewTab(VIEW_TAB.LIST);
  });
}

function updateViewTab(viewTab) {
  const [listViewButton, gridViewButton] =
    document.querySelectorAll(".view-toggle");
  switch (viewTab) {
    case VIEW_TAB.GRID:
      gridViewButton.classList.add("active");
      listViewButton.classList.remove("active");
      break;
    case VIEW_TAB.LIST:
      listViewButton.classList.add("active");
      gridViewButton.classList.remove("active");
      break;
  }
}

function addPaginationEvents() {
  // 페이지네이션 양옆 화살표
  const prevButton = document.querySelector(".press-list__control--prev");
  const nextButton = document.querySelector(".press-list__control--next");

  prevButton.addEventListener("click", () => {
    pagination.prev();
    createPressView();
  });

  nextButton.addEventListener("click", () => {
    pagination.next();
    renderPressView();
  });
}

function addSubscribeEvents() {
  const pressSection = document.querySelector(".press-section");
  const dialog = document.querySelector(".press-list__dialog");
  const [positiveButton, negativeButton] =
    dialog.querySelectorAll(".dialog-button");

  // 구독/해지 버튼
  pressSection.addEventListener("click", (e) => {
    const pressName = e.target.closest("li").dataset.label;
    if (!pressName) return;
    const button = e.target.closest("button");
    if (!button) return;

    if (isSubscribed(pressName)) {
      // 해지버튼: 다이얼로그 표시
      dialog.querySelector("strong").textContent = pressName;
      dialog.setAttribute("open", "");
    } else {
      // 구독버튼: 구독
      button.innerHTML = getLoadingIndicatorTemplate();
      toggleSubscription(pressName);
    }
  });

  // 구독 해지 후 다이얼로그 닫기
  positiveButton.addEventListener("click", () => {
    const pressName = positiveButton
      .closest("dialog")
      .querySelector("strong").textContent;
    toggleSubscription(pressName);
    dialog.removeAttribute("open");
  });

  // 다이얼로그 닫기
  negativeButton.addEventListener("click", () => {
    dialog.removeAttribute("open");
  });
}

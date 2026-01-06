import { parsePressData } from "@/utils/parse";
import { shuffleArray } from "@/utils/shuffle";
import { SUBSCRIPTION_TAB } from "@/types/constant";
import { VIEW_TAB } from "@/types/constant";
import {
  isSubscribed,
  getSubscriptionCount,
  observeSubscriptionStore,
} from "@/store/subscription";
import {
  getSubscriptionTab,
  observeSubscriptionTabStore,
  setSubscriptionTab,
} from "@/store/subscriptionTab";
import { getViewTab, observeViewTabStore, setViewTab } from "@/store/viewTab";
import { createPaginationController } from "./pagination";
import { initGridView } from "./grid";
import { initListView } from "./list";

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

  // 그리드/리스트 변경 시 뷰 업데이트
  observeViewTabStore(() => {
    pagination.setStrategy(getViewTab());
    renderPressView();
  });
  // 전체/구독 탭 변경 시 데이터 업데이트
  observeSubscriptionTabStore(() => {
    filteredData = getFilteredPressData(allPressData);
    pagination.reset();
    renderPressView();
  });

  // 구독/해지 변경 시 뷰 업데이트
  observeSubscriptionStore(() => updateSubscriptionCount());

  // 초기 설정
  setViewTab(VIEW_TAB.GRID);
  setSubscriptionTab(SUBSCRIPTION_TAB.ALL);
  updateSubscriptionCount();
}

function getFilteredPressData(allPressData) {
  let filteredData = allPressData;
  if (getSubscriptionTab() === SUBSCRIPTION_TAB.MY)
    filteredData = allPressData.filter((press) => isSubscribed(press.id));
  return filteredData;
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
    allViewButton.classList.add("active");
    myViewButton.classList.remove("active");
    setSubscriptionTab(SUBSCRIPTION_TAB.ALL);
  });
  myViewButton.addEventListener("click", () => {
    myViewButton.classList.add("active");
    allViewButton.classList.remove("active");
    setSubscriptionTab(SUBSCRIPTION_TAB.MY);
  });
}
function addViewTabEvents() {
  // 그리드/리스트 뷰 버튼
  const [listViewButton, gridViewButton] =
    document.querySelectorAll(".view-toggle");

  gridViewButton.addEventListener("click", () => {
    gridViewButton.classList.add("active");
    listViewButton.classList.remove("active");
    setViewTab(VIEW_TAB.GRID);
  });
  listViewButton.addEventListener("click", () => {
    listViewButton.classList.add("active");
    gridViewButton.classList.remove("active");
    setViewTab(VIEW_TAB.LIST);
  });
}
function addPaginationEvents() {
  // 페이지네이션 양옆 화살표
  const prevButton = document.querySelector(".press-list__control--prev");
  const nextButton = document.querySelector(".press-list__control--next");

  prevButton.addEventListener("click", () => {
    pagination.prev();
    renderPressView();
  });

  nextButton.addEventListener("click", () => {
    pagination.next();
    renderPressView();
  });
}

import { parsePressData } from "@/utils/parse";
import { initGridView } from "./grid";
import { initListView } from "./list";
import { SUBSCRIPTION_TAB } from "@/types/constant";
import { VIEW_TAB } from "@/types/constant";
import { isSubscribed } from "@/store/subscription";
import {
  getSubscriptionTab,
  observeSubscriptionTabStore,
  setSubscriptionTab,
} from "@/store/subscriptionTab";
import { getViewTab, observeViewTabStore, setViewTab } from "@/store/viewTab";

export function initPressView(articlesData) {
  let parsedPressData = parsePressData(articlesData); // {id, name, logo}

  // 전체/구독 언론사 조정
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
  observeSubscriptionTabStore(() => {
    updateSubscriptionTab(parsedPressData);
  });

  // 그리드/리스트 뷰 조정
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

  // 그리드/리스트 뷰에 따라 업데이트
  updateViewTab(parsedPressData);
  observeViewTabStore(() => {
    updateViewTab(parsedPressData);
  });
}

function updateSubscriptionTab(pressData) {
  let filteredData = pressData;
  if (getSubscriptionTab() === SUBSCRIPTION_TAB.MY)
    filteredData = pressData.filter((press) => isSubscribed(press.id));
  updateViewTab(filteredData);
}
function updateViewTab(pressData) {
  const viewTab = getViewTab();
  switch (viewTab) {
    case VIEW_TAB.GRID:
      initGridView(pressData);
      break;
    case VIEW_TAB.LIST:
      initListView();
      break;
  }
}

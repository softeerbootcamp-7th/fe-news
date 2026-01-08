import {
  getNavTemplateStart,
  getNavTemplateEnd,
  getNavTemplate,
  getPressContentTemplate,
  getEmptyContentTemplate,
} from "@/template/ListView";
import { CATEGORY_LIST } from "@/types/constant";
import { isSubscribed, getSubscribedList } from "@/store/subscriptionStore";
import { getSubscriptionTab } from "@/store/subscriptionTabStore";
import { SUBSCRIPTION_TAB } from "@/types/constant";

export function initListView(paginatedData, currentIndex) {
  // 첫 list 레이아웃 그리기
  const listContainer = document.querySelector(".press-section");
  listContainer.innerHTML =
    getNavListHTML(paginatedData, currentIndex) + getContentHTML(paginatedData);
}

function getNavListHTML(paginatedData, currentIndex) {
  const { navList, selectedNav, selectedNavTotal } = getNavInfo(paginatedData);

  let html = "";
  html += getNavTemplateStart();
  html += navList
    .map((nav) =>
      getNavTemplate({
        selected: nav === selectedNav,
        navName: nav,
        currentPress: currentIndex + 1,
        totalPress: selectedNavTotal,
      })
    )
    .join("");
  html += getNavTemplateEnd();
  return html;
}

function getNavInfo(paginatedData) {
  switch (getSubscriptionTab()) {
    case SUBSCRIPTION_TAB.ALL:
      return {
        navList: Object.values(CATEGORY_LIST),
        selectedNav: paginatedData.category,
        selectedNavTotal: paginatedData.totalPage,
      };

    case SUBSCRIPTION_TAB.MY:
      return {
        navList: getSubscribedList(),
        selectedNav: paginatedData.name,
        selectedNavTotal: null,
      };
  }
}

function getContentHTML(paginatedData) {
  if (!paginatedData) return getEmptyContentTemplate();
  else
    return getPressContentTemplate({
      ...paginatedData,
      isSubscribed: isSubscribed(paginatedData.name),
    });
}

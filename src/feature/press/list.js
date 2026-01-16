import {
  getTabTemplateStart,
  getTabTemplateEnd,
  getTabTemplate,
  getPressContentTemplate,
  getEmptyContentTemplate,
} from "@/template/ListView";
import { CATEGORY_LIST } from "@/types/constant";
import { isSubscribed, getSubscribedList } from "@/store/subscriptionStore";
import { getSubscriptionTab } from "@/store/subscriptionTabStore";
import { SUBSCRIPTION_TAB } from "@/types/constant";

export function initListView(paginatedData, currentIndex) {
  renderListView(paginatedData, currentIndex);
}

function renderListView(paginatedData, currentIndex) {
  const listContainer = document.querySelector(".press-section");
  listContainer.innerHTML =
    getTabListHTML(paginatedData, currentIndex) + getContentHTML(paginatedData);
}

function getTabListHTML(paginatedData, currentIndex) {
  const { tabList, selectedTab, selectedTabTotal } = getTabInfo(paginatedData);

  let html = "";
  html += getTabTemplateStart();
  html += tabList
    .map((tab) =>
      getTabTemplate({
        selected: tab === selectedTab,
        tabName: tab,
        currentPress: currentIndex + 1,
        totalPress: selectedTabTotal,
      })
    )
    .join("");
  html += getTabTemplateEnd();
  return html;
}

function getTabInfo(paginatedData) {
  switch (getSubscriptionTab()) {
    case SUBSCRIPTION_TAB.ALL:
      return {
        tabList: Object.values(CATEGORY_LIST),
        selectedTab: paginatedData.category,
        selectedTabTotal: paginatedData.totalPage,
      };

    case SUBSCRIPTION_TAB.MY:
      return {
        tabList: getSubscribedList(),
        selectedTab: paginatedData ? paginatedData.name : null,
        selectedTabTotal: null,
      };
  }
}

function getContentHTML(paginatedData) {
  if (!paginatedData) return getEmptyContentTemplate();
  else {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    return getPressContentTemplate({
      ...paginatedData,
      logo:
        currentTheme === "dark" ? paginatedData.darkLogo : paginatedData.logo,
      isSubscribed: isSubscribed(paginatedData.name),
    });
  }
}

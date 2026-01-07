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

  const navList = getNavList();

  let html = "";
  html += getNavTemplateStart();
  html += navList
    .map((nav) =>
      getNavTemplate({
        selected:
          nav ===
          (getSubscriptionTab() === SUBSCRIPTION_TAB.ALL
            ? paginatedData.category
            : paginatedData.name),
        navName: nav,
        currentPress: currentIndex + 1,
        totalPress:
          getSubscriptionTab() === SUBSCRIPTION_TAB.ALL
            ? paginatedData.totalPage
            : null,
      })
    )
    .join("");
  html += getNavTemplateEnd();
  if (paginatedData)
    html += getPressContentTemplate({
      ...paginatedData,
      isSubscribed: isSubscribed(paginatedData.name),
    });
  else html += getEmptyContentTemplate();

  console.log();
  listContainer.innerHTML = html;
}

export function updateNavButton(currentIndex) {
  const activeNav = document.querySelector(".press-tabs__item active");
  activeNav.style.setProperty("--progress", `${currentIndex}%`);
}

function getNavList() {
  switch (getSubscriptionTab()) {
    case SUBSCRIPTION_TAB.ALL:
      return Object.values(CATEGORY_LIST);

    case SUBSCRIPTION_TAB.MY:
      return getSubscribedList();
  }
}

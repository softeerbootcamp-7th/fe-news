import {
  getNavTemplateStart,
  getNavTemplateEnd,
  getNavTemplate,
  getPressContentTemplate,
} from "@/template/ListView";
import { CATEGORY_LIST } from "@/types/constant";
import { isSubscribed, getSubscribedList } from "@/store/subscriptionStore";
import { getSubscriptionTab } from "@/store/subscriptionTabStore";
import { SUBSCRIPTION_TAB } from "@/types/constant";

export function initListView(paginatedData, currentPage) {
  // 첫 list 레이아웃 그리기
  const listContainer = document.querySelector(".press-section");

  const navList = getNavList(paginatedData);
  let selectedNav = navList[0];

  let html = "";
  html += getNavTemplateStart();
  html += getNavList()
    .map((nav) =>
      getNavTemplate({
        selected: nav === selectedNav,
        navName: nav,
        currentPress: currentPage + 1,
        totalPress:
          getSubscriptionTab() === SUBSCRIPTION_TAB.ALL
            ? paginatedData.totalPage
            : null,
      })
    )
    .join("");
  html += getNavTemplateEnd();
  html += getPressContentTemplate({
    ...paginatedData,
    isSubscribed: isSubscribed(paginatedData.name),
  });

  console.log();
  listContainer.innerHTML = html;
}

function getNavList() {
  switch (getSubscriptionTab()) {
    case SUBSCRIPTION_TAB.ALL:
      return Object.values(CATEGORY_LIST);

    case SUBSCRIPTION_TAB.MY:
      return getSubscribedList();
  }
}

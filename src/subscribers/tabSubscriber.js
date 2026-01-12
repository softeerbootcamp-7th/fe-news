import { TAB_TYPE } from "../constants.js";

export const tabSubscriber = (state) => {
  const tabTargets = document.querySelectorAll("[data-tab-group]");

  tabTargets.forEach((target) => {
    const { tabItem, tabGroup, tabType } = target.dataset;

    // tabGroup이 "pressMode" 또는 "viewMode"로 직접 state 속성과 매칭됨
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
};

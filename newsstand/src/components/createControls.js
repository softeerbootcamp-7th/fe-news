import { createEl } from "../lib/dom";
import { store, actions } from "../state/store";

export const createControls = () => {
  const state = store.getState();

  const html = createControlsMarkup(state.subscribedPresses.length);

  const controlsWrapper = createEl("section", "ns-controls", html);
  controlsWrapper.setAttribute("aria-label", "언론사 목록 보기 설정");

  // Tabs Toggle
  controlTabs(controlsWrapper, state.tab, actions.setTab);

  // View Toggle
  controlViews(controlsWrapper, state.view, actions.setView);

  return controlsWrapper;
};

const controlViews = (wrapper, viewState, setView) => {
  const viewToggles = wrapper.querySelectorAll(".ns-view-toggle");
  viewToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const isGridView = toggle.classList.contains("ns-view-grid");
      const nextView = isGridView ? "grid" : "list";
      if (viewState === nextView) return;
      setView(nextView);
    });
  });
};

const controlTabs = (wrapper, tabState, setTab) => {
  const tabEls = wrapper.querySelectorAll(".ns-tabs > div");
  setActiveTabUI(tabState, tabEls);

  tabEls.forEach((tabEl) => {
    tabEl.addEventListener("click", () => {
      const isAllTab = tabEl.classList.contains("ns-tab-left");
      const nextTab = isAllTab ? "all" : "subscriptions";
      if (tabState === nextTab) return;
      setTab(nextTab);
    });
  });
};

const setActiveTabUI = (tabState, allTab) => {
  const isAll = tabState === "all";

  allTab.forEach((tabEl) => {
    const isLeftTab = tabEl.classList.contains("ns-tab-left");
    const isActive = (isAll && isLeftTab) || (!isAll && !isLeftTab);

    tabEl.classList.toggle("typo-selected-bold16", isActive);
    tabEl.classList.toggle("typo-available-medium16", !isActive);
    tabEl.setAttribute("aria-selected", String(isActive));
  });
};

const createControlsMarkup = (subscriptionLenghth) => `
      <div class="ns-controls__left">
        <div class="ns-tabs" role="tablist" aria-label="언론사 범위 선택">
          <div
            class="ns-tab-left"
            aria-selected="true"
          >
            전체 언론사
          </div>

          <div
            class="ns-tab-right"
            aria-selected="false"
          >
          내가 구독한 언론사
             <span
              class="ns-tab__badge typo-display-medium12 surface-brand-alt"
              aria-label="구독한 언론사 수"
            >
              ${subscriptionLenghth}
            </span>
          </div>
        </div>
      </div>

      <div class="ns-controls__right" aria-label="보기 방식 선택">
        <div
          class="ns-view-toggle ns-view-list"
          type="button"
          aria-pressed="false"
          aria-label="리스트로 보기"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2V16H2V2H16ZM17.1 0H0.9C0.4 0 0 0.4 0 0.9V17.1C0 17.5 0.4 18 0.9 18H17.1C17.5 18 18 17.5 18 17.1V0.9C18 0.4 17.5 0 17.1 0ZM8 4H14V6H8V4ZM8 8H14V10H8V8ZM8 12H14V14H8V12ZM4 4H6V6H4V4ZM4 8H6V10H4V8ZM4 12H6V14H4V12Z" fill="#14212B"/>
          </svg>
        </div>
        <div
          class="ns-view-toggle ns-view-toggle--active ns-view-grid"
          type="button"
          aria-pressed="true"
          aria-label="그리드로 보기"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8V0H8V8H0ZM0 18V10H8V18H0ZM10 8V0H18V8H10ZM10 18V10H18V18H10ZM2 6H6V2H2V6ZM12 6H16V2H12V6ZM12 16H16V12H12V16ZM2 16H6V12H2V16Z" fill="#14212B"/>
          </svg>
        </div>
      </div>
  `;

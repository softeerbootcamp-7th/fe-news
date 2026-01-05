import { createEl } from "../lib/dom";
import { store, actions } from "../state/store";

const PRESS_PER_PAGE = 24;

export const createGridCardList = (gridPressList) => {
  const gridCardList = [];
  gridPressList.forEach((press) => {
    const item = createGridCard(press);
    gridCardList.push(item);
  });
  if (gridPressList.length < PRESS_PER_PAGE) {
    const emptyCount = PRESS_PER_PAGE - gridPressList.length;
    Array.from({ length: emptyCount }).forEach(() => {
      const emptyItem = createEl(
        "li",
        "ns-press-grid__item surface-default is-empty",
        ``
      );
      gridCardList.push(emptyItem);
    });
  }
  return gridCardList;
};

const createGridCard = (press) => {
  const state = store.getState();
  const subscribed =
    (state.subscribedPresses ?? []).filter(
      (item) => item.pressName === press.pressName
    ).length > 0;
  const item = createEl(
    "li",
    "ns-press-grid__item surface-default",
    `
      <div
        class="ns-press-grid__button"
        data-press-id="${press.pressName}"
      >
        <img src="${press.icon}" alt="${press.name}"/>
        ${
          subscribed
            ? `
              <button type="button" class="subscribe-btn surface-alt typo-available-medium12 border-default text-weak"   data-action="unsubscribe">
                x 해지하기
              </button>`
            : `
              <button type="button" class="subscribe-btn surface-alt typo-available-medium12 border-default text-weak"  data-action="subscribe">
                + 구독하기
              </button>`
        }
        
      </div>
    `
  );

  //
  item.addEventListener("click", (e) => {
    const subscribeBtn = e.target.closest("[data-action='subscribe']");
    const unsubscribeBtn = e.target.closest("[data-action='unsubscribe']");
    if (!subscribeBtn && !unsubscribeBtn) return;
    e.preventDefault();
    if (subscribeBtn && !subscribed) actions.setSubscribe(press);
    if (unsubscribeBtn && subscribed) actions.setUnsubscribe(press);
  });

  return item;
};

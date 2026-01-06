import { createEl } from "../../lib/dom";
import { store, actions } from "../../state/store";
import { CLOSE_ICON, createIconButton, PLUS_ICON } from "../buttons";

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
            ${createIconButton(
              CLOSE_ICON,
              "subscribe-btn-grid",
              "unsubscribe",
              "구독해제"
            )}
              `
            : `
            ${createIconButton(
              PLUS_ICON,
              "subscribe-btn-grid",
              "subscribe",
              "구독하기"
            )}
              `
        }
        
      </div>
    `
  );

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

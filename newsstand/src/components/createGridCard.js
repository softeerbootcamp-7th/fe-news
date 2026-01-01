import { createEl } from "../lib/dom";

export const createGridCard = (press) => {
  const item = createEl(
    "li",
    "ns-press-grid__item surface-default",
    `
      <div
        class="ns-press-grid__button"
        data-press-id="${press.id}"
      >
        <img
          src="${press.icon}"
          alt="${press.name}"
        />
        <button class="subscribe-btn surface-alt typo-available-medium12 border-default text-weak">
          + 구독하기
        </button>
      </div>
    `
  );

  return item;
};

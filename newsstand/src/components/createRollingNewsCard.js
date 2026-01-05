import { createEl } from "../lib/dom";

export const createRollingNewsCard = (title = "연합뉴스", text = "dummy") => {
  const rollingCard = createEl(
    "li",
    "rolling-item",
    `
      <span class="typo-display-bold14 news-provider">${title}</span>
      <span class="typo-available-medium14 news-headline">${text}</span>
    `
  );

  return rollingCard;
};

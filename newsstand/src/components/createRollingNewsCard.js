import { createEl } from "../lib/dom";

export const createRollingNewsCard = (title = "연합뉴스", text = "dummy") => {
  const rollingCard = createEl(
    "div",
    "border-default surface-alt",
    `
      <h1 class="typo-display-bold14">${title}</h1>
      <p class="typo-available-medium14">${text}</p>
    `
  );
  rollingCard.id = "rolling-card-wrapper";

  return rollingCard;
};

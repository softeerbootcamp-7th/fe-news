import { $, normalizePressLogo } from "../../../shared/lib/index.js";
import {
  renderActiveTabButtons,
  renderNavButtons,
} from "../lib/newsViewPagination.js";
import { stopNewsListTicker } from "../controllers/NewsListController.js";

export { renderActiveTabButtons, renderNavButtons };

export function renderLogoGrid({
  documentRef = document,
  selector = "#logos",
  cells = [],
  theme = "light",
  subscribed = new Set(),
  store,
} = {}) {
  const $logos = $(selector, documentRef);
  if (!$logos) return;

  stopNewsListTicker();
  $logos.classList.remove("is-newslist");
  $logos.innerHTML = cells
    .map((entry) => {
      if (!entry)
        return `<li class="logo-card is-empty" aria-hidden="true"></li>`;

      const press = entry.press ?? "";
      const src = normalizePressLogo(entry.logo ?? "", theme);
      const isSub = subscribed.has(press);
      const btnText = isSub ? "해지하기" : "구독하기";
      const btnIcon = isSub ? "×" : "+";
      return `
        <li class="logo-card" data-press="${press}">
          <img src="${src}" alt="${press} 로고" loading="lazy" decoding="async" />
          <button class="sub-pill ${
            isSub ? "is-subscribed" : ""
          }" type="button" data-action="toggle-sub" data-press="${press}" aria-label="${btnText}">
            <span class="sub-pill__icon">${btnIcon}</span>
            <span class="sub-pill__text">${btnText}</span>
          </button>
        </li>
      `;
    })
    .join("");
}

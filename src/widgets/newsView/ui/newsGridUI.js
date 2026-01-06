import { $, encodePathSegment } from "../../../shared/lib/index.js";
import {
  renderActiveTabButtons,
  renderNavButtons,
} from "../lib/newsViewPagination.js";

export { renderActiveTabButtons, renderNavButtons };

export function renderLogoGrid({
  documentRef = document,
  selector = "#logos",
  cells = [],
  folder,
  subscribed = new Set(),
} = {}) {
  const $logos = $(selector, documentRef);
  if (!$logos) return;

  $logos.innerHTML = cells
    .map((filename) => {
      if (!filename)
        return `<li class="logo-card is-empty" aria-hidden="true"></li>`;

      const src = `./images/${folder}/${encodePathSegment(filename)}`;
      const isSub = subscribed.has(filename);
      const btnText = isSub ? "해지하기" : "구독하기";
      const btnIcon = isSub ? "×" : "+";
      return `
        <li class="logo-card" data-logo="${encodePathSegment(filename)}">
          <img src="${src}" alt="언론사 로고" loading="lazy" decoding="async" />
          <button class="sub-pill ${
            isSub ? "is-subscribed" : ""
          }" type="button" data-action="toggle-sub" data-logo="${encodePathSegment(
        filename
      )}" aria-label="${btnText}">
            <span class="sub-pill__icon">${btnIcon}</span>
            <span class="sub-pill__text">${btnText}</span>
          </button>
        </li>
      `;
    })
    .join("");
}

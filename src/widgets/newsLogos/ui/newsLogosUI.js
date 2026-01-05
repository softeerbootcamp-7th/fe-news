import { $, $$, encodePathSegment } from "../../../shared/lib/index.js";

export function renderActiveTabButtons({
  documentRef = document,
  selector = '[data-action="tab"]',
  activeTab,
} = {}) {
  for (const $btn of $$(selector, documentRef)) {
    $btn.classList.toggle(
      "is-active",
      $btn.getAttribute("data-tab") === activeTab
    );
  }
}

export function renderNavButtons({
  documentRef = document,
  leftSelector = '[data-action="prev"]',
  rightSelector = '[data-action="next"]',
  page = 0,
  totalPages = 1,
} = {}) {
  const $left = $(leftSelector, documentRef);
  const $right = $(rightSelector, documentRef);
  if (!$left || !$right) return;
  $left.hidden = page <= 0;
  $right.hidden = page >= totalPages - 1;
}

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

      const src = `/images/${folder}/${encodePathSegment(filename)}`;
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

import { SELECTORS } from "../../../shared/const/index.js";
import { $, $$ } from "../../../shared/lib/index.js";

export function renderActiveTabButtons({
  documentRef = document,
  selector = SELECTORS.tabButtons,
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
  leftSelector = SELECTORS.navPrev,
  rightSelector = SELECTORS.navNext,
  page = 0,
  totalPages = 1,
} = {}) {
  const $left = $(leftSelector, documentRef);
  const $right = $(rightSelector, documentRef);
  if (!$left || !$right) return;
  $left.hidden = page <= 0;
  $right.hidden = page >= totalPages - 1;
}

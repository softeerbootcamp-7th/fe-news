import { $, $$ } from "../../../shared/lib/index.js";

export function renderViewToggle({
  documentRef = document,
  logosSelector = "#logos",
  buttonsSelector = '[data-action="view"]',
  view,
} = {}) {
  const $logos = $(logosSelector, documentRef);
  if ($logos) $logos.classList.toggle("is-list", view === "list");

  for (const $btn of $$(buttonsSelector, documentRef)) {
    $btn.classList.toggle("is-active", $btn.getAttribute("data-view") === view);
  }
}

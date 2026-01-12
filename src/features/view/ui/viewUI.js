import { SELECTORS } from "../../../shared/const/index.js";
import { $, $$ } from "../../../shared/lib/index.js";

export function renderViewToggle({
  documentRef = document,
  logosSelector = SELECTORS.logos,
  buttonsSelector = SELECTORS.viewButtons,
  view,
} = {}) {
  const $logos = $(logosSelector, documentRef);
  if ($logos) $logos.classList.toggle("is-list", view === "list");

  for (const $btn of $$(buttonsSelector, documentRef)) {
    const buttonView = $btn.getAttribute("data-view");
    $btn.classList.toggle("is-active", buttonView === view);
    $btn.disabled = false;
    $btn.setAttribute("aria-disabled", "false");
  }
}

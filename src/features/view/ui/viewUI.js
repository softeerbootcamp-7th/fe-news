import { SELECTORS } from "../../../shared/const/index.js";
import { $, $$ } from "../../../shared/lib/index.js";

export function renderViewToggle({
  documentRef = document,
  logosSelector = SELECTORS.logos,
  buttonsSelector = SELECTORS.viewButtons,
  view,
  tab,
} = {}) {
  const $logos = $(logosSelector, documentRef);
  if ($logos) $logos.classList.toggle("is-list", view === "list");

  for (const $btn of $$(buttonsSelector, documentRef)) {
    const buttonView = $btn.getAttribute("data-view");
    $btn.classList.toggle("is-active", buttonView === view);
    const disableGrid = tab === "subscribed" && buttonView === "grid";
    $btn.disabled = disableGrid;
    $btn.setAttribute("aria-disabled", disableGrid ? "true" : "false");
  }
}

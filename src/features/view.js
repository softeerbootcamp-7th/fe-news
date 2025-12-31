import { $, $$ } from "../utils/dom.js";

export function setView({
  view,
  storageKey,
  logosSelector = "#logos",
  buttonsSelector = '[data-action="view"]',
} = {}) {
  if (view !== "grid" && view !== "list") return;

  if (storageKey) localStorage.setItem(storageKey, view);

  const $logos = $(logosSelector);
  if ($logos) $logos.classList.toggle("is-list", view === "list");

  for (const $btn of $$(buttonsSelector)) {
    $btn.classList.toggle("is-active", $btn.getAttribute("data-view") === view);
  }
}

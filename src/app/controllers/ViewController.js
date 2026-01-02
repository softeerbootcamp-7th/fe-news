import { $, $$ } from "../../utils/dom.js";

export class ViewController {
  constructor({
    state,
    storageKey,
    documentRef = document,
    localStorageRef = window?.localStorage,
    logosSelector = "#logos",
    buttonsSelector = '[data-action="view"]',
  } = {}) {
    this.state = state;
    this.storageKey = storageKey;
    this.document = documentRef;
    this.localStorage = localStorageRef;
    this.logosSelector = logosSelector;
    this.buttonsSelector = buttonsSelector;
  }

  set(view) {
    if (view !== "grid" && view !== "list") return;
    if (this.state) this.state.view = view;

    if (this.storageKey) this.localStorage?.setItem?.(this.storageKey, view);

    const $logos = $(this.logosSelector, this.document);
    if ($logos) $logos.classList.toggle("is-list", view === "list");

    for (const $btn of $$(this.buttonsSelector, this.document)) {
      $btn.classList.toggle(
        "is-active",
        $btn.getAttribute("data-view") === view
      );
    }
  }

  initFromStorage() {
    const savedView = this.localStorage?.getItem?.(this.storageKey);
    const initialView =
      savedView === "list" || savedView === "grid" ? savedView : "grid";
    this.set(initialView);
  }
}

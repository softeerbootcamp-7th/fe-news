import { renderViewToggle } from "../ui/viewUI.js";

export class ViewController {
  constructor({
    context,
    store,
    logosSelector,
    buttonsSelector,
    // backward compatible
    documentRef,
  } = {}) {
    const ctx = context ?? {};
    const selectors = ctx.selectors ?? {};
    this.store = store;
    this.document = ctx.document ?? documentRef ?? document;
    this.logosSelector = logosSelector ?? selectors.logos ?? "#logos";
    this.buttonsSelector =
      buttonsSelector ?? selectors.viewButtons ?? '[data-action="view"]';
  }

  apply(view) {
    renderViewToggle({
      documentRef: this.document,
      logosSelector: this.logosSelector,
      buttonsSelector: this.buttonsSelector,
      view,
    });
  }

  set(view) {
    if (view !== "grid" && view !== "list") return;
    this.store?.setState?.({ view });
    this.apply(view);
  }

  initFromState() {
    const currentView = this.store?.getState?.().view ?? "grid";
    this.apply(currentView);
  }
}

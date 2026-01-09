import { SELECTORS } from "../../../shared/const/index.js";
import { renderViewToggle } from "../ui/viewUI.js";

export class ViewController {
  constructor({
    context,
    store,
    logosSelector = SELECTORS.logos,
    buttonsSelector = SELECTORS.viewButtons,
  } = {}) {
    const ctx = context ?? {};
    this.store = store;
    this.document = ctx.document ?? document;
    this.logosSelector = logosSelector;
    this.buttonsSelector = buttonsSelector;
  }

  apply(view) {
    const tab = this.store?.getState?.().tab;
    renderViewToggle({
      documentRef: this.document,
      logosSelector: this.logosSelector,
      buttonsSelector: this.buttonsSelector,
      view,
      tab,
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

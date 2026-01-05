import { renderSubscribedCount } from "../ui/subscriptionsUI.js";

export class SubscriptionsController {
  constructor({
    context,
    store,
    badgeSelector,
    // backward compatible
    documentRef,
  } = {}) {
    const ctx = context ?? {};
    const selectors = ctx.selectors ?? {};
    this.store = store;
    this.badgeSelector =
      badgeSelector ?? selectors.subscribedCountBadge ?? "#sub-count";
    this.document = ctx.document ?? documentRef ?? document;
  }

  getSet() {
    return this.store?.getState?.().subscribedPress ?? new Set();
  }

  isSubscribed(filename) {
    return this.getSet().has(filename);
  }

  add(filename) {
    const set = new Set(this.getSet());
    set.add(filename);
    this.store?.setState?.({ subscribedPress: set });
    return set;
  }

  remove(filename) {
    const set = new Set(this.getSet());
    set.delete(filename);
    this.store?.setState?.({ subscribedPress: set });
    return set;
  }

  updateCount() {
    const count = this.getSet().size;
    renderSubscribedCount({
      documentRef: this.document,
      selector: this.badgeSelector,
      count,
    });
  }

}

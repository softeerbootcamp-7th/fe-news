import { $ } from "../../utils/dom.js";

export class SubscriptionsController {
  constructor({
    context,
    storageKey,
    badgeSelector,
    // backward compatible
    documentRef,
    localStorageRef,
  } = {}) {
    const ctx = context ?? {};
    const selectors = ctx.selectors ?? {};
    this.storageKey = storageKey;
    this.badgeSelector =
      badgeSelector ?? selectors.subscribedCountBadge ?? "#sub-count";
    this.document = ctx.document ?? documentRef ?? document;
    this.localStorage = ctx.storage ?? localStorageRef ?? window?.localStorage;
  }

  getSet() {
    try {
      const raw = this.localStorage?.getItem?.(this.storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      const arr = Array.isArray(parsed) ? parsed : [];
      return new Set(arr.filter((x) => typeof x === "string"));
    } catch {
      return new Set();
    }
  }

  _saveSet(set) {
    this.localStorage?.setItem?.(this.storageKey, JSON.stringify([...set]));
  }

  isSubscribed(filename) {
    return this.getSet().has(filename);
  }

  add(filename) {
    const set = this.getSet();
    set.add(filename);
    this._saveSet(set);
    return set;
  }

  remove(filename) {
    const set = this.getSet();
    set.delete(filename);
    this._saveSet(set);
    return set;
  }

  updateCount() {
    const $badge = $(this.badgeSelector, this.document);
    if (!$badge || !this.storageKey) return;
    const count = this.getSet().size;
    $badge.textContent = String(count);
    $badge.setAttribute("aria-label", `구독 수 ${count}`);
  }
}

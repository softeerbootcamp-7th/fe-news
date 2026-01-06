import { SUBSCRIPTION_TAB } from "../types/constant";

let subscriptionTabName = SUBSCRIPTION_TAB.ALL; // "my" || "all"
const listeners = new Set();

export function observeSubscriptionTabStore(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function getSubscriptionTab() {
  return subscriptionTabName;
}
export function setSubscriptionTab(tabName) {
  subscriptionTabName = tabName;
  notify();
}

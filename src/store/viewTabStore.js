import { VIEW_TAB } from "@/types/constant";

let viewTabName = VIEW_TAB.GRID; // "grid" || "list"
const listeners = new Set();

export function observeViewTabStore(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function getViewTab() {
  return viewTabName;
}

export function setViewTab(tabName) {
  viewTabName = tabName;
  notify();
}

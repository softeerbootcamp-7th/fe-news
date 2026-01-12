import { NEWSLIST_DURATION_MS } from "../../../shared/const/index.js";

const runtime = {
  timer: null,
  documentRef: null,
  selector: null,
  store: null,
  subscribed: new Set(),
};

export function getRuntime() {
  return runtime;
}

export function setRuntime({
  documentRef,
  selector,
  store,
  subscribed,
} = {}) {
  if (documentRef) runtime.documentRef = documentRef;
  if (selector) runtime.selector = selector;
  if (store) runtime.store = store;
  if (subscribed) runtime.subscribed = subscribed;
}

export function clearNewsListTimer() {
  if (runtime.timer) {
    clearTimeout(runtime.timer);
    runtime.timer = null;
  }
}

export function scheduleNewsListAdvance(onAdvance) {
  clearNewsListTimer();
  runtime.timer = setTimeout(() => {
    if (typeof onAdvance === "function") onAdvance();
  }, NEWSLIST_DURATION_MS);
}

import {
  ensurePressData,
  getAllItems,
  getCategoryMeta,
  getPressItem,
} from "../../../shared/lib/index.js";
import {
  getNewsListState,
  setNewsListCategoryOrder,
  setNewsListCategoryIndex,
  setNewsListPressIndex,
  setNewsListSubscriptionIndex,
} from "../../../app/model/store/newsListStore.js";
import {
  getActiveTab,
  getCurrentCategory,
  getCurrentPressIndex,
  getSubscribedEntries,
} from "../lib/newsListSelectors.js";
import { renderCurrentNewsList } from "./newsListRender.js";
import {
  clearNewsListTimer,
  getRuntime,
  setRuntime,
} from "./newsListRuntime.js";

function renderWithAdvance() {
  renderCurrentNewsList({ onAdvance: () => advanceNewsListPress(1) });
}

export function renderLogoList({
  documentRef = document,
  selector = "#logos",
  subscribed = new Set(),
  store,
} = {}) {
  setRuntime({ documentRef, selector, subscribed, store });
  const runtime = getRuntime();
  ensurePressData()
    .then((data) => {
      if (data?.categoryOrder?.length) {
        setNewsListCategoryOrder(runtime.store, data.categoryOrder);
      }
    })
    .finally(() => {
      renderWithAdvance();
    });
}

export function advanceNewsListPress(step = 1) {
  clearNewsListTimer();
  const runtime = getRuntime();
  const activeTab = getActiveTab(runtime.store);

  if (activeTab === "subscribed") {
    const entries = getSubscribedEntries({
      subscribed: runtime.subscribed,
      getAllItems,
      getPressItem,
    });
    if (!entries.length) return;
    const { subscriptionIndex } = getNewsListState(runtime.store);
    const next = (subscriptionIndex + step + entries.length) % entries.length;
    setNewsListSubscriptionIndex(runtime.store, next);
  } else {
    const category = getCurrentCategory(runtime.store);
    if (!category) return;
    const { total } = getCategoryMeta(category);
    const current = getCurrentPressIndex(runtime.store, category, total);
    let nextIndex = current + step;
    if (nextIndex >= total) {
      const { categoryIndex, categoryOrder } = getNewsListState(runtime.store);
      setNewsListCategoryIndex(
        runtime.store,
        (categoryIndex + 1) % categoryOrder.length
      );
      nextIndex = 0;
    } else if (nextIndex < 0) {
      const { categoryIndex, categoryOrder } = getNewsListState(runtime.store);
      setNewsListCategoryIndex(
        runtime.store,
        (categoryIndex - 1 + categoryOrder.length) % categoryOrder.length
      );
      const prevCategory = getCurrentCategory(runtime.store);
      const { total: prevTotal } = getCategoryMeta(prevCategory);
      nextIndex = Math.max(0, prevTotal - 1);
    }
    setNewsListPressIndex(runtime.store, getCurrentCategory(runtime.store), nextIndex);
  }

  renderWithAdvance();
}

export function selectNewsListTab(target) {
  const runtime = getRuntime();
  const category = target?.getAttribute?.("data-category");
  const key = target?.getAttribute?.("data-key");
  const press = target?.getAttribute?.("data-press");
  clearNewsListTimer();

  if (key || press) {
    const entries = getSubscribedEntries({
      subscribed: runtime.subscribed,
      getAllItems,
      getPressItem,
    });
    const index = entries.findIndex((entry) =>
      key ? entry.key === key : entry.press === press
    );
    if (index >= 0) setNewsListSubscriptionIndex(runtime.store, index);
  } else if (category) {
    const { categoryOrder } = getNewsListState(runtime.store);
    const index = categoryOrder.indexOf(category);
    if (index >= 0) setNewsListCategoryIndex(runtime.store, index);
    setNewsListPressIndex(runtime.store, category, 0);
  }

  renderWithAdvance();
}

export function setNewsListActivePress(press) {
  if (!press) return;
  const runtime = getRuntime();
  const entries = getSubscribedEntries({
    subscribed: runtime.subscribed,
    getAllItems,
    getPressItem,
  });
  const index = entries.findIndex((entry) => entry.press === press);
  if (index >= 0) {
    setNewsListSubscriptionIndex(runtime.store, index);
  } else {
    setNewsListSubscriptionIndex(runtime.store, Math.max(0, entries.length - 1));
  }
}

export function setNewsListSubscriptions(subscribed) {
  if (!subscribed) return;
  setRuntime({ subscribed });
}

export function stopNewsListTicker() {
  clearNewsListTimer();
}

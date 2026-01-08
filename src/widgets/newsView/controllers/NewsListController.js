import { pressNameFromFilename } from "../../../shared/lib/index.js";
import { NEWSLIST_DURATION_MS } from "../../../shared/const/index.js";
import {
  getNewsListState,
  setNewsListCategoryIndex,
  setNewsListCategoryOrder,
  setNewsListPressIndex,
  setNewsListSubscriptionIndex,
} from "../../../app/model/store/newsListStore.js";
import {
  ensureNewsData,
  getCategoryMeta,
  getCategoryOrder,
  getPressItem,
  getAllItems,
} from "../lib/newsListData.js";
import {
  renderNewsListView,
  renderTabs,
  renderNewsPanel,
} from "../ui/newsListUI.js";

const runtime = {
  timer: null,
  documentRef: null,
  selector: null,
  store: null,
  subscribed: new Set(),
};

function getActiveTab(store) {
  const tab = store?.getState?.().tab;
  return tab === "subscribed" ? "subscribed" : "all";
}

function clampIndex(index, total) {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(index, total - 1));
}

function getCurrentCategory(store) {
  const { categoryOrder, categoryIndex } = getNewsListState(store);
  if (!categoryOrder.length) return null;
  const safeIndex = clampIndex(categoryIndex, categoryOrder.length);
  if (safeIndex !== categoryIndex) {
    setNewsListCategoryIndex(store, safeIndex);
  }
  return categoryOrder[safeIndex];
}

function getCurrentPressIndex(store, category, total) {
  if (!category) return 0;
  const { pressIndexByCategory } = getNewsListState(store);
  const current = pressIndexByCategory[category] ?? 0;
  const safeIndex = clampIndex(current, total);
  if (safeIndex !== current) {
    setNewsListPressIndex(store, category, safeIndex);
  }
  return safeIndex;
}

function getSubscribedEntries() {
  const entries = [];
  let fallbackIndex = 0;
  const fallbackPool = getAllItems();
  for (const key of runtime.subscribed) {
    let press = key;
    let item = getPressItem(press);
    if (!item) {
      const derived = pressNameFromFilename(key);
      if (getPressItem(derived)) {
        press = derived;
        item = getPressItem(derived);
      }
    }

    if (!item && fallbackPool.length) {
      item = fallbackPool[fallbackIndex % fallbackPool.length];
      fallbackIndex += 1;
    }

    entries.push({ key, press, item });
  }
  return entries;
}

function getSubscribedModel() {
  const entries = getSubscribedEntries();
  const { subscriptionIndex } = getNewsListState(runtime.store);
  const safeIndex = clampIndex(subscriptionIndex, entries.length);
  if (safeIndex !== subscriptionIndex) {
    setNewsListSubscriptionIndex(runtime.store, safeIndex);
  }
  return {
    entries,
    activeIndex: safeIndex,
    durationMs: NEWSLIST_DURATION_MS,
  };
}

function getCategoryModel() {
  const state = getNewsListState(runtime.store);
  const categoryOrder =
    state.categoryOrder?.length ? state.categoryOrder : getCategoryOrder();
  if (!state.categoryOrder?.length && categoryOrder.length) {
    setNewsListCategoryOrder(runtime.store, categoryOrder);
  }
  const activeCategory = getCurrentCategory(runtime.store);
  let activeCount = null;
  if (activeCategory) {
    const { total } = getCategoryMeta(activeCategory);
    const activeIndex = getCurrentPressIndex(
      runtime.store,
      activeCategory,
      total
    );
    if (total > 0) {
      activeCount = { currentIndex: activeIndex + 1, total };
    }
  }
  return {
    categoryOrder,
    activeCategory,
    activeCount,
    durationMs: NEWSLIST_DURATION_MS,
  };
}

function getPanelModel(activeTab, subscribedModel, categoryModel) {
  if (activeTab === "subscribed") {
    const entry = subscribedModel.entries[subscribedModel.activeIndex];
    return {
      item: entry?.item ?? null,
      pressName: entry?.press ?? "",
      isSubscribed: entry?.press
        ? runtime.subscribed.has(entry.press)
        : false,
      related: Array.isArray(entry?.item?.relatedArticles)
        ? entry.item.relatedArticles.slice(0, 6)
        : [],
    };
  }

  const activeCategory = categoryModel.activeCategory;
  if (!activeCategory) {
    return { item: null, pressName: "", isSubscribed: false, related: [] };
  }
  const { items, total } = getCategoryMeta(activeCategory);
  if (!total) {
    return { item: null, pressName: activeCategory, isSubscribed: false, related: [] };
  }
  const activeIndex = getCurrentPressIndex(
    runtime.store,
    activeCategory,
    total
  );
  const item = items[activeIndex];
  const pressName = String(item?.press || "");
  return {
    item: item ?? null,
    pressName,
    isSubscribed: pressName ? runtime.subscribed.has(pressName) : false,
    related: Array.isArray(item?.relatedArticles)
      ? item.relatedArticles.slice(0, 6)
      : [],
  };
}

function clearNewsListTimer() {
  if (runtime.timer) {
    clearTimeout(runtime.timer);
    runtime.timer = null;
  }
}

function scheduleNewsListAdvance() {
  clearNewsListTimer();
  runtime.timer = setTimeout(() => {
    advanceNewsListPress(1);
  }, NEWSLIST_DURATION_MS);
}

function renderCurrentNewsList() {
  const activeTab = getActiveTab(runtime.store);
  const subscribedModel = getSubscribedModel();
  const categoryModel = getCategoryModel();
  const panelModel = getPanelModel(activeTab, subscribedModel, categoryModel);

  renderNewsListView({
    documentRef: runtime.documentRef,
    selector: runtime.selector,
    activeTab,
  });
  renderTabs({
    documentRef: runtime.documentRef,
    activeTab,
    subscribedModel,
    categoryModel,
  });
  renderNewsPanel({
    documentRef: runtime.documentRef,
    panelModel,
  });

  scheduleNewsListAdvance();
}

export function renderLogoList({
  documentRef = document,
  selector = "#logos",
  subscribed = new Set(),
  store,
} = {}) {
  runtime.documentRef = documentRef;
  runtime.selector = selector;
  runtime.subscribed = subscribed;
  runtime.store = store;
  ensureNewsData()
    .then((data) => {
      if (data?.categoryOrder?.length) {
        setNewsListCategoryOrder(runtime.store, data.categoryOrder);
      }
    })
    .finally(() => {
      renderCurrentNewsList();
    });
}

export function advanceNewsListPress(step = 1) {
  clearNewsListTimer();
  const activeTab = getActiveTab(runtime.store);

  if (activeTab === "subscribed") {
    const entries = getSubscribedEntries();
    if (!entries.length) return;
    const { subscriptionIndex } = getNewsListState(runtime.store);
    const next =
      (subscriptionIndex + step + entries.length) % entries.length;
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

  renderCurrentNewsList();
}

export function selectNewsListTab(target) {
  const category = target?.getAttribute?.("data-category");
  const key = target?.getAttribute?.("data-key");
  const press = target?.getAttribute?.("data-press");
  clearNewsListTimer();

  if (key || press) {
    const entries = getSubscribedEntries();
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

  renderCurrentNewsList();
}

export function setNewsListActivePress(press) {
  if (!press) return;
  const entries = getSubscribedEntries();
  const index = entries.findIndex((entry) => entry.press === press);
  if (index >= 0) {
    setNewsListSubscriptionIndex(runtime.store, index);
  } else {
    setNewsListSubscriptionIndex(runtime.store, Math.max(0, entries.length - 1));
  }
}

export function setNewsListSubscriptions(subscribed) {
  if (!subscribed) return;
  runtime.subscribed = subscribed;
}

export function stopNewsListTicker() {
  clearNewsListTimer();
}

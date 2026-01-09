import {
  getNewsListState,
  setNewsListCategoryOrder,
} from "../../../app/model/store/newsListStore.js";
import { NEWSLIST_DURATION_MS } from "../../../shared/const/index.js";

export function getSubscribedModel({ store, entries, clampSubscriptionIndex }) {
  const safeIndex = clampSubscriptionIndex(store, entries);
  return {
    entries,
    activeIndex: safeIndex,
    durationMs: NEWSLIST_DURATION_MS,
  };
}

export function getCategoryModel({
  store,
  getCategoryOrder,
  getCategoryMeta,
  getCurrentCategory,
  getCurrentPressIndex,
} = {}) {
  const state = getNewsListState(store);
  const categoryOrder =
    state.categoryOrder?.length ? state.categoryOrder : getCategoryOrder();
  if (!state.categoryOrder?.length && categoryOrder.length) {
    setNewsListCategoryOrder(store, categoryOrder);
  }
  const activeCategory = getCurrentCategory(store);
  let activeCount = null;
  if (activeCategory) {
    const { total } = getCategoryMeta(activeCategory);
    const activeIndex = getCurrentPressIndex(store, activeCategory, total);
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

export function getPanelModel({
  activeTab,
  subscribedModel,
  categoryModel,
  store,
  subscribed,
  getPressLogo,
  getCategoryMeta,
  getCurrentPressIndex,
} = {}) {
  const theme = store?.getState?.().theme ?? "light";
  if (activeTab === "subscribed") {
    const entry = subscribedModel.entries[subscribedModel.activeIndex];
    return {
      item: entry?.item ?? null,
      pressName: entry?.press ?? "",
      isSubscribed: entry?.press ? subscribed.has(entry.press) : false,
      logoUrl: getPressLogo(entry?.item, theme),
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
    return {
      item: null,
      pressName: activeCategory,
      isSubscribed: false,
      related: [],
    };
  }
  const activeIndex = getCurrentPressIndex(store, activeCategory, total);
  const item = items[activeIndex];
  const pressName = String(item?.press || "");
  return {
    item: item ?? null,
    pressName,
    isSubscribed: pressName ? subscribed.has(pressName) : false,
    logoUrl: getPressLogo(item, theme),
    related: Array.isArray(item?.relatedArticles)
      ? item.relatedArticles.slice(0, 6)
      : [],
  };
}

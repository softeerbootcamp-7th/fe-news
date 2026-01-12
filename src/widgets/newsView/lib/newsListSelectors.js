import { getNewsListState,
  setNewsListCategoryIndex,
  setNewsListPressIndex,
  setNewsListSubscriptionIndex,
} from "../../../app/model/store/newsListStore.js";

function clampIndex(index, total) {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(index, total - 1));
}

export function getActiveTab(store) {
  const tab = store?.getState?.().tab;
  return tab === "subscribed" ? "subscribed" : "all";
}

export function getCurrentCategory(store) {
  const { categoryOrder, categoryIndex } = getNewsListState(store);
  if (!categoryOrder.length) return null;
  const safeIndex = clampIndex(categoryIndex, categoryOrder.length);
  if (safeIndex !== categoryIndex) {
    setNewsListCategoryIndex(store, safeIndex);
  }
  return categoryOrder[safeIndex];
}

export function getCurrentPressIndex(store, category, total) {
  if (!category) return 0;
  const { pressIndexByCategory } = getNewsListState(store);
  const current = pressIndexByCategory[category] ?? 0;
  const safeIndex = clampIndex(current, total);
  if (safeIndex !== current) {
    setNewsListPressIndex(store, category, safeIndex);
  }
  return safeIndex;
}

export function getSubscribedEntries({ subscribed, getAllItems, getPressItem }) {
  const entries = [];
  let fallbackIndex = 0;
  const fallbackPool = getAllItems();
  for (const key of subscribed) {
    const press = key;
    let item = getPressItem(press);

    if (!item && fallbackPool.length) {
      item = fallbackPool[fallbackIndex % fallbackPool.length];
      fallbackIndex += 1;
    }

    entries.push({ key, press, item });
  }
  return entries;
}

export function clampSubscriptionIndex(store, entries) {
  const { subscriptionIndex } = getNewsListState(store);
  const safeIndex = clampIndex(subscriptionIndex, entries.length);
  if (safeIndex !== subscriptionIndex) {
    setNewsListSubscriptionIndex(store, safeIndex);
  }
  return safeIndex;
}

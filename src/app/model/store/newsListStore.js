import { DEFAULT_NEWSLIST_STATE } from "./newsStandStore.js";

export function getNewsListState(store) {
  const state = store?.getState?.() ?? {};
  const newsList = state.newsList ?? DEFAULT_NEWSLIST_STATE;
  return {
    ...DEFAULT_NEWSLIST_STATE,
    ...newsList,
    pressIndexByCategory: newsList.pressIndexByCategory ?? {},
  };
}

export function setNewsListState(store, patch) {
  if (!store?.setState) return;
  const prev = getNewsListState(store);
  store.setState({ newsList: { ...prev, ...patch } });
}

export function setNewsListCategoryOrder(store, categoryOrder) {
  setNewsListState(store, { categoryOrder });
}

export function setNewsListCategoryIndex(store, categoryIndex) {
  setNewsListState(store, { categoryIndex });
}

export function setNewsListSubscriptionIndex(store, subscriptionIndex) {
  setNewsListState(store, { subscriptionIndex });
}

export function setNewsListPressIndex(store, category, index) {
  const prev = getNewsListState(store);
  setNewsListState(store, {
    pressIndexByCategory: {
      ...prev.pressIndexByCategory,
      [category]: index,
    },
  });
}

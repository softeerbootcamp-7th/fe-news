import { createStore } from "./createStore.js";

export const DEFAULT_NEWSLIST_STATE = {
  categoryOrder: [],
  categoryIndex: 0,
  pressIndexByCategory: {},
  subscriptionIndex: 0,
};

export function getInitialNewsStandState(overrides = {}) {
  const base = {
    page: 0,
    perPage: 24, // 6*4 cells
    theme: "light",
    view: "grid",
    tab: "all", // "all" | "subscribed"
    pressList: [],
    shuffledPress: [],
    subscribedPress: new Set(),
    newsList: { ...DEFAULT_NEWSLIST_STATE },
  };

  return {
    ...base,
    ...overrides,
    pressList: overrides.pressList ?? base.pressList,
    shuffledPress: overrides.shuffledPress ?? base.shuffledPress,
    subscribedPress: overrides.subscribedPress ?? base.subscribedPress,
    newsList: {
      ...base.newsList,
      ...(overrides.newsList ?? {}),
    },
  };
}

export function createNewsStandStore(overrides = {}) {
  return createStore(getInitialNewsStandState(overrides));
}

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
    shuffledByTheme: {
      light: null,
      dark: null,
    },
    subscribedPress: new Set(),
    newsList: { ...DEFAULT_NEWSLIST_STATE },
  };

  const shuffledByTheme = {
    light: overrides.shuffledByTheme?.light ?? base.shuffledByTheme.light,
    dark: overrides.shuffledByTheme?.dark ?? base.shuffledByTheme.dark,
  };

  return {
    ...base,
    ...overrides,
    shuffledByTheme,
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

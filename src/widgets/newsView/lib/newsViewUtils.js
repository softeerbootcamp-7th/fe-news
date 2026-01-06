import {
  buildShuffledLogoLists,
  getLogoFilesForTheme,
} from "../../../shared/lib/index.js";

export function initShuffle({
  store,
  shuffle,
  LOGO_FILES,
  LIGHT_ONLY_FILES,
  DARK_ONLY_FILES,
} = {}) {
  const shuffledByTheme = buildShuffledLogoLists({
    shuffle,
    LOGO_FILES,
    LIGHT_ONLY_FILES,
    DARK_ONLY_FILES,
  });
  store?.setState?.({ shuffledByTheme });
  return shuffledByTheme;
}

export function getLogoListForState({
  state,
  subscriptions,
  LOGO_FILES,
  LIGHT_ONLY_FILES,
  DARK_ONLY_FILES,
} = {}) {
  const theme = state.theme === "dark" ? "dark" : "light";
  const base =
    state.shuffledByTheme?.[theme] ??
    getLogoFilesForTheme({
      theme,
      LOGO_FILES,
      LIGHT_ONLY_FILES,
      DARK_ONLY_FILES,
    });

  const subscribed = subscriptions?.getSet?.() ?? new Set();
  const files =
    state.tab === "subscribed" ? base.filter((f) => subscribed.has(f)) : base;
  return { files, subscribed };
}

export function getPagedItems({ state, files, store } = {}) {
  const logosPerPage = Math.max(1, state.perPage);
  const totalPages = Math.max(
    1,
    Math.min(4, Math.ceil(files.length / logosPerPage))
  );
  const nextPage = Math.max(0, Math.min(state.page, totalPages - 1));
  if (nextPage !== state.page) {
    store?.setState?.({ page: nextPage });
  }

  const start = nextPage * logosPerPage;
  const end = start + logosPerPage;
  const items = files.slice(start, end);

  return { items, nextPage, totalPages, logosPerPage };
}

export function buildLogoCells({ state, items, logosPerPage } = {}) {
  const shouldPadEmptyCells =
    state.tab === "subscribed" && state.view === "grid";
  if (!shouldPadEmptyCells) return items;
  return Array.from({ length: logosPerPage }, (_, i) => items[i] ?? null);
}

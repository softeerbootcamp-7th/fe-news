import { ensurePressData, getPressList } from "../../../shared/lib/index.js";

export async function initShuffle({ store, shuffle } = {}) {
  const data = await ensurePressData();
  const pressList = data?.pressList ?? getPressList();
  const shuffledPress = shuffle ? shuffle(pressList) : pressList;
  store?.setState?.({ pressList, shuffledPress });
  return shuffledPress;
}

export function getLogoListForState({
  state,
  subscriptions,
} = {}) {
  const base = state.shuffledPress?.length
    ? state.shuffledPress
    : state.pressList ?? [];
  const subscribed = subscriptions?.getSet?.() ?? new Set();
  const files =
    state.tab === "subscribed"
      ? base.filter((entry) => subscribed.has(entry.press))
      : base;
  return { files, subscribed };
}

export function getPagedItems({ state, files } = {}) {
  const logosPerPage = Math.max(1, state.perPage);
  const totalPages = Math.max(
    1,
    Math.min(4, Math.ceil(files.length / logosPerPage))
  );
  const nextPage = Math.max(0, Math.min(state.page, totalPages - 1));

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

import { DEFAULT_ROUTE } from "./routeDefaults.js";
import { getLogoListForState } from "../../widgets/newsView/lib/newsViewUtils.js";

function clampPage(page, totalPages) {
  const maxPage = Math.max(0, totalPages - 1);
  return Math.max(0, Math.min(page, maxPage));
}

function getTotalPages({ state, subscriptions }) {
  const { files } = getLogoListForState({ state, subscriptions });
  const logosPerPage = Math.max(1, state.perPage ?? 1);
  return Math.max(1, Math.min(4, Math.ceil(files.length / logosPerPage)));
}

export function normalizeRoute(route, { state, subscriptions }) {
  let view = route.view === "list" ? "list" : "grid";
  let tab = route.tab === "subscribed" ? "subscribed" : "all";
  let page = Number.isFinite(route.page) ? Math.max(0, route.page) : 0;

  if (tab === "subscribed") view = "list";
  if (view === "list") {
    page = 0;
  } else {
    const mergedState = { ...state, view, tab, page };
    const totalPages = getTotalPages({ state: mergedState, subscriptions });
    page = clampPage(page, totalPages);
  }

  return { view, tab, page };
}

export function getRouteFromState(app) {
  const state = app.store?.getState?.() ?? {};
  return normalizeRoute(
    {
      view: state.view ?? DEFAULT_ROUTE.view,
      tab: state.tab ?? DEFAULT_ROUTE.tab,
      page: state.page ?? DEFAULT_ROUTE.page,
    },
    { state, subscriptions: app.subscriptions }
  );
}

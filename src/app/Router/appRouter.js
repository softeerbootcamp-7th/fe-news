import { DEFAULT_ROUTE } from "./routeDefaults.js";
import { parseQuery, buildQuery } from "./routeQuery.js";
import { normalizeRoute, getRouteFromState } from "./routeNormalize.js";
import { applyRoute } from "./routeApply.js";

export function createAppRouter(app) {
  const win = app.window ?? window;

  const syncUrl = (route, { replace = false } = {}) => {
    const query = buildQuery(route);
    const url = `${win.location.pathname}${query}`;
    if (query === win.location.search) return;
    if (replace) {
      win.history.replaceState(route, "", url);
      return;
    }
    win.history.pushState(route, "", url);
  };

  const renderAndSync = (route, { replace = false } = {}) => {
    const normalized = normalizeRoute(route, {
      state: app.store?.getState?.() ?? {},
      subscriptions: app.subscriptions,
    });
    syncUrl(normalized, { replace });
    applyRoute(app, normalized);
    const next = getRouteFromState(app);
    syncUrl(next, { replace: true });
  };

  const init = () => {
    const parsed = parseQuery(win.location.search);
    const initial = normalizeRoute(
      { ...DEFAULT_ROUTE, ...parsed },
      { state: app.store?.getState?.() ?? {}, subscriptions: app.subscriptions }
    );
    renderAndSync(initial, { replace: true });
    win.addEventListener("popstate", () => {
      const nextParsed = parseQuery(win.location.search);
      const next = normalizeRoute(
        { ...DEFAULT_ROUTE, ...nextParsed },
        { state: app.store?.getState?.() ?? {}, subscriptions: app.subscriptions }
      );
      applyRoute(app, next);
      syncUrl(getRouteFromState(app), { replace: true });
    });
  };

  const pushRoute = (partial = {}) => {
    const current = getRouteFromState(app);
    renderAndSync({ ...current, ...partial }, { replace: false });
  };

  const replaceRoute = (partial = {}) => {
    const current = getRouteFromState(app);
    renderAndSync({ ...current, ...partial }, { replace: true });
  };

  const rerender = () => {
    const current = getRouteFromState(app);
    renderAndSync(current, { replace: true });
  };

  return { init, pushRoute, replaceRoute, rerender };
}

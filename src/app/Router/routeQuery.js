import { DEFAULT_ROUTE } from "./routeDefaults.js";

export function parseQuery(search = "") {
  const params = new URLSearchParams(search);
  const view = params.get("view");
  const tab = params.get("tab");
  const page = Number.parseInt(params.get("page"), 10);
  return {
    view,
    tab,
    page: Number.isNaN(page) ? undefined : page,
  };
}

export function buildQuery(route) {
  const params = new URLSearchParams();
  if (route.tab !== DEFAULT_ROUTE.tab) params.set("tab", route.tab);
  if (route.view !== DEFAULT_ROUTE.view) params.set("view", route.view);
  if (route.view === "grid" && route.page > 0) {
    params.set("page", String(route.page));
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

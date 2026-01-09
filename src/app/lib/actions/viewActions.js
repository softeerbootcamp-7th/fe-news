export function getCurrentView(app) {
  return app.store?.getState?.().view ?? "grid";
}

export function handleTabAction(app, target) {
  const tab = target?.getAttribute?.("data-tab") || "all";
  const state = app.store?.getState?.() ?? {};
  let nextView = state.view ?? "grid";
  if (tab === "subscribed" && nextView === "grid") nextView = "list";
  if (tab === "all" && nextView === "list") nextView = "grid";
  app.router?.pushRoute?.({ tab, view: nextView });
}

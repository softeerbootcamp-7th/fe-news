import { SELECTORS } from "../../shared/const/index.js";

export async function handleClick(app, e) {
  const target =
    e.target instanceof app.window.Element
      ? e.target.closest(SELECTORS.actionTarget)
      : null;
  if (!target) return;

  const action = target.getAttribute("data-action");
  const handler = app.actions?.[action];
  if (typeof handler !== "function") return;
  await handler(target);
}

export function bindEvents(app) {
  app.document.addEventListener("click", app._onDocumentClick);
}

export function unbindEvents(app) {
  app.document.removeEventListener("click", app._onDocumentClick);
}

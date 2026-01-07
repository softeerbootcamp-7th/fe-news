import { toggleSubscriptionFromTarget } from "../../../features/subscriptions/index.js";
import {
  setNewsListActivePress,
  setNewsListSubscriptions,
} from "../../../widgets/newsView/ui/newsListUI.js";

export async function handleToggleSubscription(app, target) {
  const changed = await toggleSubscriptionFromTarget({
    target,
    subscriptions: app.subscriptions,
    unsubscribeDialog: app.unsubscribeDialog,
  });
  if (changed) app.newsView.render();
}

export async function handleListSubscribe(app, target) {
  const press = target?.getAttribute?.("data-press");
  if (!press) return;

  target.classList.add("is-loading");
  target.disabled = true;
  target.setAttribute("aria-busy", "true");

  await new Promise((resolve) => {
    setTimeout(resolve, 600);
  });

  app.subscriptions.add(press);
  app.subscriptions.updateCount();
  setNewsListSubscriptions(app.subscriptions.getSet());
  setNewsListActivePress(press);
  app.view.set("list");
  if (typeof app.renderNewsForView === "function") {
    app.newsView.setRenderNews(app.renderNewsForView("list"));
  }
  app.newsView.setTab("subscribed");
}

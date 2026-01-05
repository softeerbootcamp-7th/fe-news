import { NewsLogosController } from "../controllers/NewsLogosController.js";

export function createNewsLogosModule({
  context,
  state,
  shuffle,
  LOGO_FILES,
  LIGHT_ONLY_FILES,
  DARK_ONLY_FILES,
  subscribedStorageKey,
  subscriptionsController,
  controller: controllerOverride,
} = {}) {
  const controller =
    controllerOverride ??
    new NewsLogosController({
      context,
      state,
      shuffle,
      LOGO_FILES,
      LIGHT_ONLY_FILES,
      DARK_ONLY_FILES,
      subscribedStorageKey,
      subscriptions: subscriptionsController,
    });

  return {
    controller,
    init() {
      controller.initShuffle();
      controller.setTab("all");
    },
    render() {
      controller.render();
    },
    setTabFromTarget(target) {
      const tab = target?.getAttribute?.("data-tab") || "all";
      controller.setTab(tab);
    },
    prev() {
      controller.prevPage();
    },
    next() {
      controller.nextPage();
    },
  };
}

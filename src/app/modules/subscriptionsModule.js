import { SubscriptionsController } from "../controllers/SubscriptionsController.js";
import { UnsubscribeDialogController } from "../controllers/UnsubscribeDialogController.js";
import { pressNameFromFilename } from "../../utils/pressNameFromFilename.js";

export function createSubscriptionsModule({
  context,
  storageKey,
  controller: controllerOverride,
  unsubscribeDialog: unsubscribeDialogOverride,
  newsLogosModule,
} = {}) {
  const controller =
    controllerOverride ?? new SubscriptionsController({ context, storageKey });
  const unsubscribeDialog =
    unsubscribeDialogOverride ?? new UnsubscribeDialogController({ context });

  return {
    controller,
    unsubscribeDialog,
    init() {
      controller.updateCount();
    },
    async toggleFromTarget(target) {
      const encoded = target?.getAttribute?.("data-logo") || "";
      const filename = decodeURIComponent(encoded);

      if (controller.isSubscribed(filename)) {
        const ok = await unsubscribeDialog.confirm({
          pressName: pressNameFromFilename(filename),
        });
        if (!ok) return;
        controller.remove(filename);
      } else {
        controller.add(filename);
      }

      controller.updateCount();
      newsLogosModule?.render?.();
    },
  };
}

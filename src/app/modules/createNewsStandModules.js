import { STORAGE_KEYS } from "../../data/constants.js";
import { SubscriptionsController } from "../controllers/SubscriptionsController.js";
import { UnsubscribeDialogController } from "../controllers/UnsubscribeDialogController.js";
import { createSubscriptionsModule } from "./subscriptionsModule.js";
import { createNewsLogosModule } from "./newsLogosModule.js";
import { createNewsRollingModule } from "./newsRollingModule.js";
import { createViewModule } from "./viewModule.js";

/**
 * NewsStandApp에서 "컨트롤러 생성/모듈 wiring"을 분리합니다.
 * - 컨트롤러 싱글턴 생성은 여기서 수행
 * - 도메인 모듈 간 의존성 연결도 여기서 수행
 */
export function createNewsStandModules({
  context,
  state,
  shuffle,
  logosConfig,
} = {}) {
  // Controllers (singletons per app)
  const subscriptionsController = new SubscriptionsController({
    context,
    storageKey: STORAGE_KEYS.SUBSCRIBED_PRESS,
  });
  const unsubscribeDialog = new UnsubscribeDialogController({ context });

  const newsLogos = createNewsLogosModule({
    context,
    state,
    shuffle,
    ...logosConfig,
    subscribedStorageKey: STORAGE_KEYS.SUBSCRIBED_PRESS,
    subscriptionsController,
  });

  const subscriptions = createSubscriptionsModule({
    context,
    storageKey: STORAGE_KEYS.SUBSCRIBED_PRESS,
    controller: subscriptionsController,
    unsubscribeDialog,
    newsLogosModule: newsLogos,
  });

  const newsRolling = createNewsRollingModule({ context, shuffle });

  const view = createViewModule({
    context,
    state,
    storageKey: STORAGE_KEYS.VIEW,
    newsLogosModule: newsLogos,
  });

  return { subscriptions, newsLogos, newsRolling, view };
}

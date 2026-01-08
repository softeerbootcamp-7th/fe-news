import { dayNames } from "../../shared/const/index.js";
import { shuffle } from "../../shared/lib/index.js";
import { createAppContext } from "../AppContext.js";
import { createNewsStandActions } from "./appActions.js";
import { DateController } from "../../features/date/index.js";

import { NewsRollingController } from "../../widgets/newsRolling/index.js";
import {
  SubscriptionsController,
  UnsubscribeDialogController,
} from "../../features/subscriptions/index.js";
import { ThemeController } from "../../features/theme/index.js";
import { ViewController } from "../../features/view/index.js";
import { createNewsStandStore } from "../model/store/index.js";
import { NewsViewController } from "../../widgets/newsView/index.js";
import {
  renderLogoGrid,
  renderLogoList,
} from "../../widgets/newsView/index.js";
import { setThemeInState } from "./appRuntime.js";
import { handleClick, bindEvents, unbindEvents } from "./appEvents.js";
import { setViewFromTarget } from "./runtimes/viewRuntime.js";

export function initContext(app, { documentRef, windowRef } = {}) {
  app.context = createAppContext({
    documentRef,
    windowRef,
  });
  app.document = app.context.document;
  app.window = app.context.window;
  app.store = createNewsStandStore();
}

export function initControllers(app) {
  app.date = new DateController({ context: app.context, dayNames });

  app.unsubscribeDialog = new UnsubscribeDialogController({
    context: app.context,
  });
  app.subscriptions = new SubscriptionsController({
    context: app.context,
    store: app.store,
  });
  app.newsView = new NewsViewController({
    context: app.context,
    store: app.store,
    shuffle,
    subscriptions: app.subscriptions,
    renderNews: (args) => {
      if (app.store.getState().view === "list") {
        renderLogoList(args);
      } else {
        renderLogoGrid(args);
      }
    },
  });
  app.renderNewsForView = (view) =>
    view === "list" ? renderLogoList : renderLogoGrid;
  app.newsRolling = new NewsRollingController({
    context: app.context,
    shuffle,
  });
  app.view = new ViewController({
    context: app.context,
    store: app.store,
  });

  app.theme = new ThemeController({
    context: app.context,
    onChange: (theme) => {
      setThemeInState(app, theme);
      app.newsView.render();
    },
  });
}

export function initActions(app) {
  app.actions = createNewsStandActions(app);
  app._onDocumentClick = (e) => handleClick(app, e);
  app.setThemeInState = (theme) => setThemeInState(app, theme);
  app.handleClick = (e) => handleClick(app, e);
  app.setViewFromTarget = (target) => setViewFromTarget(app, target);
  app.bindEvents = () => bindEvents(app);
  app.unbindEvents = () => unbindEvents(app);
}

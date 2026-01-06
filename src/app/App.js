import {
  DARK_ONLY_FILES,
  dayNames,
  LIGHT_ONLY_FILES,
  LOGO_FILES,
  SELECTORS,
} from "../shared/const/index.js";
import { shuffle } from "../shared/lib/index.js";
import { createAppContext } from "./AppContext.js";
import { createNewsStandActions } from "./appActions.js";
import { DateController } from "../features/date/index.js";
import { NewsGridViewController } from "../widgets/newsGridView/index.js";
import { NewsRollingController } from "../widgets/newsRolling/index.js";
import {
  SubscriptionsController,
  UnsubscribeDialogController,
} from "../features/subscriptions/index.js";
import { ThemeController } from "../features/theme/index.js";
import { ViewController } from "../features/view/index.js";
import { createNewsStandStore } from "./model/store/index.js";

async function initNewsStandApp(app) {
  app.date.render();
  app.newsLogos.initShuffle();
  app.newsLogos.setTab("all");
  app.theme.init();
  app.view.initFromState();
  app.subscriptions.updateCount();

  try {
    await app.newsRolling.start();
  } catch (error) {
    // ignore - keep placeholders
    console.error("Failed to start rolling news.", error);
  }
}

export class NewsStandApp {
  constructor({ documentRef = document, windowRef = window } = {}) {
    // ---------- Context & Store ----------
    this.context = createAppContext({
      documentRef,
      windowRef,
    });
    this.document = this.context.document;
    this.window = this.context.window;
    this.store = createNewsStandStore();

    // ---------- Controllers ----------
    this.date = new DateController({ context: this.context, dayNames });

    this.unsubscribeDialog = new UnsubscribeDialogController({
      context: this.context,
    });
    this.subscriptions = new SubscriptionsController({
      context: this.context,
      store: this.store,
    });
    this.newsLogos = new NewsGridViewController({
      context: this.context,
      store: this.store,
      shuffle,
      LOGO_FILES,
      LIGHT_ONLY_FILES,
      DARK_ONLY_FILES,
      subscriptions: this.subscriptions,
    });
    this.newsRolling = new NewsRollingController({
      context: this.context,
      shuffle,
    });
    this.view = new ViewController({
      context: this.context,
      store: this.store,
    });

    this.theme = new ThemeController({
      context: this.context,
      onChange: (theme) => {
        this.setThemeInState(theme);
        this.newsLogos.render();
      },
    });
    // ---------- Actions ----------
    this.actions = createNewsStandActions(this);
    this._onDocumentClick = (e) => this.handleClick(e); // data-action 기반 클릭 이벤트를 핸들러로 매핑
  }

  setThemeInState(theme) {
    this.store.setState({ theme });
  }

  async handleClick(e) {
    const target =
      e.target instanceof this.window.Element
        ? e.target.closest(SELECTORS.actionTarget)
        : null;
    if (!target) return;

    const action = target.getAttribute("data-action");
    const handler = this.actions?.[action];
    if (typeof handler !== "function") return;
    await handler(target);
  }

  setViewFromTarget(target) {
    const view = target?.getAttribute?.("data-view");
    this.view.set(view);
    this.newsLogos.render();
  }

  bindEvents() {
    this.document.addEventListener("click", this._onDocumentClick);
  }

  unbindEvents() {
    this.document.removeEventListener("click", this._onDocumentClick);
  }

  async init() {
    this.bindEvents();
    await initNewsStandApp(this);
  }

  // destroy() {
  //   this.unbindEvents();
  //   this.newsRolling?.destroy?.();
  //   this.theme?.destroy?.();
  // }
}

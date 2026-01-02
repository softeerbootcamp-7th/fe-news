import {
  DARK_ONLY_FILES,
  dayNames,
  LIGHT_ONLY_FILES,
  LOGO_FILES,
  STORAGE_KEYS,
} from "../data/constants.js";
import { shuffle } from "../utils/array.js";
import { UnsubscribeDialogController } from "./controllers/UnsubscribeDialogController.js";
import { DateController } from "./controllers/DateController.js";
import { ThemeController } from "./controllers/ThemeController.js";
import { ViewController } from "./controllers/ViewController.js";
import { SubscriptionsController } from "./controllers/SubscriptionsController.js";
import { NewsLogosController } from "./controllers/NewsLogosController.js";
import { NewsRollingController } from "./controllers/NewsRollingController.js";

export class NewsStandApp {
  constructor({
    documentRef = document,
    windowRef = window,
    localStorageRef = window?.localStorage,
  } = {}) {
    this.document = documentRef;
    this.window = windowRef;
    this.localStorage = localStorageRef;

    this.state = {
      page: 0,
      perPage: 24, // 6*4 cells
      theme: "light",
      view: "grid",
      tab: "all", // "all" | "subscribed"
      shuffledByTheme: {
        light: null,
        dark: null,
      },
    };

    this.unsubscribeDialog = new UnsubscribeDialogController({
      documentRef: this.document,
      windowRef: this.window,
      dialogId: "unsubscribe-dialog",
    });

    this.date = new DateController({ dayNames, documentRef: this.document });

    this.subscriptions = new SubscriptionsController({
      storageKey: STORAGE_KEYS.SUBSCRIBED_PRESS,
      badgeSelector: "#sub-count",
      documentRef: this.document,
      localStorageRef: this.localStorage,
    });

    this.view = new ViewController({
      state: this.state,
      storageKey: STORAGE_KEYS.VIEW,
      documentRef: this.document,
      localStorageRef: this.localStorage,
    });

    this.newsLogos = new NewsLogosController({
      state: this.state,
      shuffle,
      LOGO_FILES,
      LIGHT_ONLY_FILES,
      DARK_ONLY_FILES,
      subscribedStorageKey: STORAGE_KEYS.SUBSCRIBED_PRESS,
      subscriptions: this.subscriptions,
      documentRef: this.document,
    });

    this.newsRolling = new NewsRollingController({
      shuffle,
      documentRef: this.document,
    });

    this.theme = new ThemeController({
      onChange: (theme) => {
        this.setThemeInState(theme);
        this.newsLogos.render();
      },
    });

    this._onDocumentClick = (e) => this.handleClick(e);
  }

  setThemeInState(theme) {
    this.state.theme = theme;
  }

  pressNameFromFilename(filename) {
    // 파일명 기반(임시) 표시용 라벨: 확장자/뒤쪽 숫자 제거
    return String(filename || "")
      .replace(/\.(png|jpe?g|webp|svg)$/i, "")
      .replace(/\s+\d+$/g, "")
      .trim();
  }

  async handleToggleSub(target) {
    const encoded = target.getAttribute("data-logo") || "";
    const filename = decodeURIComponent(encoded);
    if (this.subscriptions.isSubscribed(filename)) {
      const ok = await this.unsubscribeDialog.confirm({
        pressName: this.pressNameFromFilename(filename),
      });
      if (!ok) return;
      this.subscriptions.remove(filename);
    } else {
      this.subscriptions.add(filename);
    }

    this.subscriptions.updateCount();
    this.newsLogos.render();
  }

  handleView(target) {
    const view = target.getAttribute("data-view");
    this.view.set(view);
    // subscribed tab에서 빈 셀 유지 등 view에 따른 렌더링 차이가 있으므로 재렌더
    this.newsLogos.render();
  }

  handlePrev() {
    this.newsLogos.prevPage();
  }

  handleNext() {
    this.newsLogos.nextPage();
  }

  handleTab(target) {
    const tab = target.getAttribute("data-tab") || "all";
    this.newsLogos.setTab(tab);
  }

  async handleClick(e) {
    const target =
      e.target instanceof this.window.Element
        ? e.target.closest("[data-action]")
        : null;
    if (!target) return;

    const action = target.getAttribute("data-action");
    if (action === "refresh") {
      this.window.location.reload();
      return;
    }

    if (action === "toggle-sub") {
      await this.handleToggleSub(target);
      return;
    }

    if (action === "view") {
      this.handleView(target);
      return;
    }

    if (action === "prev") {
      this.handlePrev();
      return;
    }

    if (action === "next") {
      this.handleNext();
      return;
    }

    if (action === "tab") {
      this.handleTab(target);
    }
  }

  bindEvents() {
    this.document.addEventListener("click", this._onDocumentClick);
  }

  initLogosAndTheme() {
    this.date.render();
    this.newsLogos.initShuffle();
    this.theme.init();
    this.view.initFromStorage();
    this.newsLogos.setTab("all");
    this.subscriptions.updateCount();
  }

  async initRollingNews() {
    try {
      await this.newsRolling.start();
    } catch {
      // ignore - keep placeholders
    }
  }

  async init() {
    this.initLogosAndTheme();
    this.bindEvents();
    await this.initRollingNews();
  }
}

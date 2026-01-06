import { SELECTORS } from "../../../shared/const/index.js";
import {
  buildShuffledLogoLists,
  getLogoFilesForTheme,
  getThemeFolder,
} from "../../../shared/lib/index.js";
import {
  renderActiveTabButtons,
  renderLogoGrid,
  renderNavButtons,
} from "../ui/newsGridUI.js";

export class NewsGridViewController {
  constructor({
    context,
    store,
    shuffle,
    LOGO_FILES,
    LIGHT_ONLY_FILES,
    DARK_ONLY_FILES,
    subscriptions,
    logosSelector = SELECTORS.logos,
    tabButtonsSelector = SELECTORS.tabButtons,
    leftSelector = SELECTORS.navPrev,
    rightSelector = SELECTORS.navNext,
  } = {}) {
    const ctx = context ?? {};
    this.store = store;
    this.shuffle = shuffle;
    this.LOGO_FILES = LOGO_FILES;
    this.LIGHT_ONLY_FILES = LIGHT_ONLY_FILES;
    this.DARK_ONLY_FILES = DARK_ONLY_FILES;
    this.subscriptions = subscriptions;
    this.document = ctx.document ?? document;
    this.logosSelector = logosSelector;
    this.tabButtonsSelector = tabButtonsSelector;
    this.leftSelector = leftSelector;
    this.rightSelector = rightSelector;
  }

  initShuffle() {
    const shuffledByTheme = buildShuffledLogoLists({
      shuffle: this.shuffle,
      LOGO_FILES: this.LOGO_FILES,
      LIGHT_ONLY_FILES: this.LIGHT_ONLY_FILES,
      DARK_ONLY_FILES: this.DARK_ONLY_FILES,
    });
    this.store?.setState?.({ shuffledByTheme });
  }

  updateNavButtons({ page, totalPages } = {}) {
    renderNavButtons({
      documentRef: this.document,
      leftSelector: this.leftSelector,
      rightSelector: this.rightSelector,
      page,
      totalPages,
    });
  }

  applyActiveTabUI() {
    const state = this.store?.getState?.() ?? {};
    renderActiveTabButtons({
      documentRef: this.document,
      selector: this.tabButtonsSelector,
      activeTab: state.tab,
    });
  }

  setTab(tab) {
    const nextTab = tab === "subscribed" ? "subscribed" : "all";
    this.store?.setState?.({ tab: nextTab });
    this.applyActiveTabUI();
    this.render();
  }

  getCurrentLogoList(state) {
    const theme = state.theme === "dark" ? "dark" : "light";
    const base =
      state.shuffledByTheme?.[theme] ??
      getLogoFilesForTheme({
        theme,
        LOGO_FILES: this.LOGO_FILES,
        LIGHT_ONLY_FILES: this.LIGHT_ONLY_FILES,
        DARK_ONLY_FILES: this.DARK_ONLY_FILES,
      });

    const subscribed = this.subscriptions?.getSet?.() ?? new Set();
    if (state.tab === "subscribed")
      return base.filter((f) => subscribed.has(f));
    return base;
  }

  render() {
    const state = this.store?.getState?.() ?? {};
    const files = this.getCurrentLogoList(state);
    const subscribed = this.subscriptions?.getSet?.() ?? new Set();

    const logosPerPage = Math.max(1, state.perPage);
    const totalPages = Math.max(
      1,
      Math.min(4, Math.ceil(files.length / logosPerPage))
    );
    const nextPage = Math.max(0, Math.min(state.page, totalPages - 1));
    if (nextPage !== state.page) {
      this.store?.setState?.({ page: nextPage });
    }

    const start = nextPage * logosPerPage;
    const end = start + logosPerPage;
    const items = files.slice(start, end);

    const folder = getThemeFolder(state.theme);
    const shouldPadEmptyCells =
      state.tab === "subscribed" && state.view === "grid";
    const cells = shouldPadEmptyCells
      ? Array.from({ length: logosPerPage }, (_, i) => items[i] ?? null)
      : items;

    renderLogoGrid({
      documentRef: this.document,
      selector: this.logosSelector,
      cells,
      folder,
      subscribed,
    });

    this.updateNavButtons({ page: nextPage, totalPages });
  }

  prevPage() {
    const state = this.store?.getState?.() ?? {};
    this.store?.setState?.({ page: state.page - 1 });
    this.render();
  }

  nextPage() {
    const state = this.store?.getState?.() ?? {};
    this.store?.setState?.({ page: state.page + 1 });
    this.render();
  }
}

import { SELECTORS } from "../../../shared/const/index.js";
import { renderActiveTabButtons, renderNavButtons } from "../ui/newsGridUI.js";
import {
  buildLogoCells,
  getLogoListForState,
  getPagedItems,
  initShuffle,
} from "../lib/newsViewUtils.js";

export class NewsViewController {
  constructor({
    context,
    store,
    shuffle,
    subscriptions,
    renderNews,
    logosSelector = SELECTORS.logos,
    tabButtonsSelector = SELECTORS.tabButtons,
    leftSelector = SELECTORS.navPrev,
    rightSelector = SELECTORS.navNext,
  } = {}) {
    const ctx = context ?? {};
    this.store = store;
    this.shuffle = shuffle;
    this.subscriptions = subscriptions;
    this._renderNews = renderNews;
    this.document = ctx.document ?? document;
    this.logosSelector = logosSelector;
    this.tabButtonsSelector = tabButtonsSelector;
    this.leftSelector = leftSelector;
    this.rightSelector = rightSelector;
  }

  async initShuffle() {
    return initShuffle({
      store: this.store,
      shuffle: this.shuffle,
    });
  }

  updateNavButtons({ page, totalPages } = {}) {
    const state = this.store?.getState?.() ?? {};
    if (state.view === "list") {
      renderNavButtons({
        documentRef: this.document,
        leftSelector: this.leftSelector,
        rightSelector: this.rightSelector,
        page: 1,
        totalPages: 3,
      });
      return;
    }
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

  render() {
    const state = this.store?.getState?.() ?? {};
    const { files, subscribed } = getLogoListForState({
      state,
      subscriptions: this.subscriptions,
    });
    const { items, nextPage, totalPages, logosPerPage } = getPagedItems({
      state,
      files,
      store: this.store,
    });

    const cells = buildLogoCells({ state, items, logosPerPage });

    this.renderNews({
      documentRef: this.document,
      selector: this.logosSelector,
      cells,
      theme: state.theme,
      subscribed,
      store: this.store,
    });

    this.updateNavButtons({ page: nextPage, totalPages });
  }

  setRenderNews(renderNews) {
    this._renderNews = renderNews;
  }

  renderNews({ documentRef, selector, cells, folder, subscribed, store } = {}) {
    if (typeof this._renderNews !== "function") {
      throw new Error("renderNews must be provided.");
    }
    this._renderNews({ documentRef, selector, cells, folder, subscribed, store });
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

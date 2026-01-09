import {
  getAllItems,
  getCategoryMeta,
  getCategoryOrder,
  getPressItem,
  getPressLogo,
} from "../../../shared/lib/index.js";
import {
  clampSubscriptionIndex,
  getActiveTab,
  getCurrentCategory,
  getCurrentPressIndex,
  getSubscribedEntries,
} from "../lib/newsListSelectors.js";
import {
  getCategoryModel,
  getPanelModel,
  getSubscribedModel,
} from "../lib/newsListModels.js";
import {
  renderNewsListView,
  renderTabs,
  renderNewsPanel,
} from "../ui/newsListUI.js";
import { getRuntime, scheduleNewsListAdvance } from "./newsListRuntime.js";

export function renderCurrentNewsList({ onAdvance } = {}) {
  const runtime = getRuntime();
  const activeTab = getActiveTab(runtime.store);
  const entries = getSubscribedEntries({
    subscribed: runtime.subscribed,
    getAllItems,
    getPressItem,
  });
  const subscribedModel = getSubscribedModel({
    store: runtime.store,
    entries,
    clampSubscriptionIndex,
  });
  const categoryModel = getCategoryModel({
    store: runtime.store,
    getCategoryOrder,
    getCategoryMeta,
    getCurrentCategory,
    getCurrentPressIndex,
  });
  const panelModel = getPanelModel({
    activeTab,
    subscribedModel,
    categoryModel,
    store: runtime.store,
    subscribed: runtime.subscribed,
    getPressLogo,
    getCategoryMeta,
    getCurrentPressIndex,
  });

  renderNewsListView({
    documentRef: runtime.documentRef,
    selector: runtime.selector,
    activeTab,
  });
  renderTabs({
    documentRef: runtime.documentRef,
    activeTab,
    subscribedModel,
    categoryModel,
  });
  renderNewsPanel({
    documentRef: runtime.documentRef,
    panelModel,
  });

  scheduleNewsListAdvance(onAdvance);
}

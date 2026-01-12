import { STORAGE_KEY } from '../../constants/newsListKey.js';
import { TAB, VIEW } from '../../constants/newsSection.js';

/**
 * 뉴스 메인 섹션의 모든 상태를 관리하는 중앙 Store
 * - 구독 관리 (subscription)
 * - 탭 전환 (tab: 전체 언론사 / 내가 구독한 언론사)
 * - 뷰 모드 전환 (view: grid / list)
 */
export function createNewsMainStore() {
  // State
  let subscribedSet = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);
  let currentTab = TAB.ALL;
  let currentView = VIEW.GRID;

  // Listeners
  const listeners = new Set();
  const subscribeListeners = new Set();
  const tabListeners = new Set();
  const viewListeners = new Set();

  function notifyListeners(listeners) {
    listeners.forEach((listener) => listener());
  }

  function addListener(listeners, listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function loadFromLocalStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('localStorage 로드 실패:', error);
      return [];
    }
  }

  function syncToLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...subscribedSet]));
    } catch (error) {
      console.error('localStorage 저장 실패:', error);
    }
  }

  // ====== Subscription ======
  function has(press) {
    return subscribedSet.has(press);
  }

  function toggle(press) {
    const newSet = new Set(subscribedSet);
    if (newSet.has(press)) {
      newSet.delete(press);
    } else {
      newSet.add(press);
    }
    subscribedSet = newSet;
    syncToLocalStorage();
    notifyListeners(subscribeListeners);
  }

  function getSubscribedCount() {
    return subscribedSet.size;
  }

  function getSubscribedList() {
    return [...subscribedSet];
  }

  function subscribeToSubscription(listener) {
    return addListener(subscribeListeners, listener);
  }

  // ====== Tab ======
  function getCurrentTab() {
    return currentTab;
  }

  function setCurrentTab(tab) {
    if (currentTab === tab) return;
    currentTab = tab;
    notifyListeners(tabListeners);
  }

  function subscribeTabListener(listener) {
    return addListener(tabListeners, listener);
  }

  // ====== View ======
  function getCurrentView() {
    return currentView;
  }

  function setView(view) {
    if (currentView === view) return;
    currentView = view;
    notifyListeners(viewListeners);
  }

  function subscribeViewListener(listener) {
    return addListener(viewListeners, listener);
  }

  return {
    // Subscription
    has,
    toggle,
    getSubscribedCount,
    getSubscribedList,
    subscribeToSubscription,

    //Tab
    getCurrentTab,
    setCurrentTab,
    subscribeTabListener,

    // View
    getCurrentView,
    setView,
    subscribeViewListener,
  };
}

import { TAB, VIEW } from '../../../constants/newsSection.js';
import { createNewsMainStore } from '../../../store/newsMainStore.js';

// 싱글톤 store 생성
const mainStore = createNewsMainStore();

/**
 * newsSection Header 컴포넌트
 * - badge 업데이트 (구독 개수 반영)
 * - 탭 전환 (전체 언론사 / 내가 구독한 언론사)
 * - 뷰 모드 전환 (list / grid)
 */
export function initHeader() {
  // DOM 요소 선택 (getElementById - 가장 빠른 성능)
  const tabAll = document.getElementById('tab-all');
  const tabMy = document.getElementById('tab-my');
  const badge = document.getElementById('subscribe-badge');
  const listViewBtn = document.getElementById('list-view');
  const gridViewBtn = document.getElementById('grid-view');

  if (!tabAll || !tabMy || !badge || !listViewBtn || !gridViewBtn) {
    console.error('Header 요소를 찾을 수 없습니다');
    return;
  }

  // === Badge 업데이트 ===
  function updateBadge() {
    const count = mainStore.getSubscribedCount();
    badge.textContent = count.toString();
  }

  // 초기 badge 설정
  updateBadge();

  // 구독 변경 감지하여 badge 업데이트
  mainStore.subscribeToSubscription(updateBadge);

  // === 탭 전환 ===
  function updateTabUI() {
    const currentTab = mainStore.getCurrentTab();
    tabAll.classList.toggle('active', currentTab === TAB.ALL);
    tabMy.classList.toggle('active', currentTab === TAB.MY);
  }

  // 초기 탭 UI 설정
  updateTabUI();

  // 탭 클릭 이벤트
  tabAll.addEventListener('click', () => {
    mainStore.setTab(TAB.ALL);
    updateTabUI();
  });

  tabMy.addEventListener('click', () => {
    mainStore.setTab(TAB.MY);
    updateTabUI();
  });

  // === 뷰 모드 전환 ===
  function updateViewUI() {
    const currentView = mainStore.getCurrentView();
    listViewBtn.classList.toggle('active', currentView === VIEW.LIST);
    gridViewBtn.classList.toggle('active', currentView === VIEW.GRID);
  }

  // 초기 뷰 UI 설정
  updateViewUI();

  // 뷰 버튼 클릭 이벤트
  listViewBtn.addEventListener('click', () => {
    mainStore.setView(VIEW.LIST);
    updateViewUI();
  });

  gridViewBtn.addEventListener('click', () => {
    mainStore.setView(VIEW.GRID);
    updateViewUI();
  });
}

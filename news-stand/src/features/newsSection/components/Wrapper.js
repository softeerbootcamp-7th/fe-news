import { TAB, VIEW } from '../../../constants/newsSection.js';
import { createNewsMainStore } from '../../../store/newsMainStore.js';
import { renderPressGrid } from '../../newsGrid/services/renderPressGrid.js';

// 싱글톤 store 생성
const mainStore = createNewsMainStore();

/**
 * newsSection Wrapper 컴포넌트
 * - 탭 변경 감지 (전체 언론사 / 내가 구독한 언론사)
 * - 뷰 모드 변경 감지 (grid / list)
 * - 필터링된 언론사 데이터 렌더링
 */
export function initWrapper(pressDataList) {
  const gridWrapper = document.querySelector('.news-grid-wrapper');
  const newsGrid = document.querySelector('.news-grid');

  if (!gridWrapper || !newsGrid) {
    console.error('Wrapper 요소를 찾을 수 없습니다');
    return;
  }

  let allPressData = pressDataList;

  function getFilteredData() {
    const currentTab = mainStore.getCurrentTab();

    if (currentTab === TAB.ALL) {
      return allPressData;
    } else if (currentTab === TAB.MY) {
      const subscribedList = mainStore.getSubscribedList();
      return allPressData.filter((pressData) => subscribedList.includes(pressData.press));
    }
    return allPressData;
  }

  function render() {
    const filteredData = getFilteredData();
    renderPressGrid(filteredData);
    updateViewModeUI();
  }

  function updateViewModeUI() {
    const currentView = mainStore.getCurrentView();

    if (currentView === VIEW.LIST) {
      newsGrid.classList.replace('grid-mode', 'list-mode');
    } else if (currentView === VIEW.GRID) {
      newsGrid.classList.replace('list-mode', 'grid-mode');
    }
  }

  render();

  mainStore.subscribeToTab(() => {
    render();
  });

  mainStore.subscribeToView(() => {
    updateViewModeUI();
  });

  mainStore.subscribeToSubscription(() => {
    const currentTab = mainStore.getCurrentTab();
    if (currentTab === TAB.MY) {
      render();
    }
  });
}

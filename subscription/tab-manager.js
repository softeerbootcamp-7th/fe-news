import { createTabSwitchObserver } from './observers.js';

// 탭 관리자 초기화 함수
function initTabManager({ tabSelector, subscriptionManager, gridFilterObserver }) {
    const tabElements = document.querySelectorAll(tabSelector);
    const tabSwitchObserver = createTabSwitchObserver(tabElements, gridFilterObserver);

    // 초기 탭 상태 설정 (첫 번째 탭이 활성화)
    tabSwitchObserver.switchTab(0);

    // 탭 클릭 이벤트 처리
    tabElements.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabSwitchObserver.switchTab(index);
        });
    });

    return tabSwitchObserver;
}

export { initTabManager };


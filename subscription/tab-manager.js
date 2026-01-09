// 탭 관리자 초기화 함수
function initTabManager({ tabSelector, gridFilterObserver }) {
    const tabElements = document.querySelectorAll(tabSelector);

    function switchTab(activeTabIndex) {
        // 탭 활성화 상태 업데이트
        tabElements.forEach((tab, index) => {
            const isActive = index === activeTabIndex;
            tab.classList.toggle('content__tab--active', isActive);
            tab.setAttribute('aria-pressed', isActive);
        });

        // 그리드 필터 업데이트
        const filter = activeTabIndex === 0 ? 'all' : 'subscribed';
        gridFilterObserver.setFilter(filter);
    }

    // 초기 탭 상태 설정 (첫 번째 탭이 활성화)
    switchTab(0);

    // 탭 클릭 이벤트 처리
    tabElements.forEach((tab, index) => {
        tab.addEventListener('click', () => switchTab(index));
    });
}

export { initTabManager };


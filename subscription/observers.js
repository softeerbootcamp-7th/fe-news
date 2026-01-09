// TabBadgeObserver - 탭 배지 업데이트
function createTabBadgeObserver(badgeSelector) {
    const badgeElement = document.querySelector(badgeSelector);
    
    return {
        badgeElement,
        update(event, data) {
            if ((event === 'subscribe' || event === 'unsubscribe') && badgeElement) {
                badgeElement.textContent = data.count;
            }
        }
    };
}

// GridFilterObserver - 그리드 필터링 및 재렌더링
function createGridFilterObserver(gridElement, renderFunction, subscriptionManager) {
    let currentFilter = 'all'; // 'all' 또는 'subscribed'
    
    const observer = {
        setFilter(filter) {
            currentFilter = filter;
            observer.update('filter', { filter });
        },
        update(event, data) {
            if (event === 'filter' || 
                ((event === 'subscribe' || event === 'unsubscribe') && currentFilter === 'subscribed')) {
                // 필터링이 변경되었거나, 구독 탭에서 구독 상태가 변경된 경우
                renderFunction(gridElement, subscriptionManager, currentFilter);
            }
        }
    };
    
    return observer;
}

// TabSwitchObserver - 탭 전환 상태 동기화
function createTabSwitchObserver(tabElements, gridFilterObserver) {
    return {
        update(event, data) {
            // 탭 전환은 TabManager에서 직접 처리하므로 여기서는 필요시 추가 로직 구현
        },
        switchTab(activeTabIndex) {
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
    };
}

export { createTabBadgeObserver, createGridFilterObserver, createTabSwitchObserver };


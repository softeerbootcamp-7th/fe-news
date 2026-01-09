import { GRID_COLS, GRID_ROWS } from "./config.js";
import logoLinks from '../data/logo_links.json';
import { fisherYatesShuffle } from '../utils';
import { createSubscribeButton } from '../components/button.js';

// 오버레이 너비, 높이, 위치 계산하는 함수
function updateOverlayPosition(itemStyle, overlay, itemRect, gridRect) {
    const { borderLeftWidth, borderTopWidth, borderRightWidth, borderBottomWidth } = itemStyle;
    const borderLeft = parseFloat(borderLeftWidth);
    const borderTop = parseFloat(borderTopWidth);
    const borderRight = parseFloat(borderRightWidth);
    const borderBottom = parseFloat(borderBottomWidth);

    overlay.style.transform = `translate(${itemRect.left - gridRect.left + borderLeft}px, ${itemRect.top - gridRect.top + borderTop}px)`;
    overlay.style.width = `${itemRect.width - borderLeft - borderRight}px`;
    overlay.style.height = `${itemRect.height - borderTop - borderBottom}px`;
}

// 오버레이 보여주는 함수
function showGridOverlay(event, gridElement, overlay, subscriptionManager) {
    const gridItem = event.target.closest('.content__grid-item');
    if (!gridItem) return;

    const computedStyle = getComputedStyle(gridItem);
    const itemRect = gridItem.getBoundingClientRect();
    const gridRect = gridElement.getBoundingClientRect();

    updateOverlayPosition(computedStyle, overlay, itemRect, gridRect);

    // 구독 상태에 따라 버튼 업데이트
    const pressId = gridItem.dataset.pressId;
    const isSubscribed = subscriptionManager && subscriptionManager.isSubscribed(pressId);
    
    // 기존 버튼 제거
    const existingButton = overlay.querySelector('.component__button');
    if (existingButton) {
        existingButton.remove();
    }

    // 새로운 버튼 생성
    const buttonType = isSubscribed ? 'closed' : 'plus';
    const buttonLabel = isSubscribed ? '해지하기' : '구독하기';
    
    const overlayButton = createSubscribeButton({
        label: buttonLabel,
        type: buttonType,
        onClick: () => {
            if (isSubscribed) {
                subscriptionManager.removeSubscription(pressId);
            } else {
                subscriptionManager.addSubscription(pressId);
            }
        }
    });
    
    overlay.appendChild(overlayButton);
    overlay.classList.remove('grid__overlay--hidden');
}

// 오버레이 숨기는 함수
function hiddenGridOverlay(overlay) {
    overlay.classList.add('grid__overlay--hidden');
}

// 그리드 아이템 생성 함수
function renderGridItems(gridElement, subscriptionManager, filter = 'all') {
    // 기존 아이템 제거
    gridElement.querySelectorAll('.content__grid-item').forEach(item => item.remove());

    let itemsToShow = [...logoLinks.presses];

    // 필터링: 'subscribed'일 때 구독한 언론사만 표시
    if (filter === 'subscribed' && subscriptionManager) {
        const subscribedIds = subscriptionManager.getSubscriptions();
        itemsToShow = itemsToShow.filter(press => subscribedIds.includes(press.id));
    }

    const totalCount = GRID_COLS * GRID_ROWS;
    // TODO: 페이지네이션 필요
    const randomItems = fisherYatesShuffle(itemsToShow).slice(0, totalCount);

    randomItems.forEach((press) => {
        const item = document.createElement('div');
        item.className = `content__grid-item`;
        item.dataset.pressId = press.id; // 언론사 ID 저장

        const img = document.createElement('img');
        img.className = `content__grid-img`;
        img.src = `${logoLinks.baseUrl}/${press.logo}`;
        item.appendChild(img);
        
        gridElement.appendChild(item);
    })
}

// 그리드 초기화 함수
function initGrid({ containerSelector, subscriptionManager, renderFunction }) {
    const gridElement = document.querySelector(containerSelector);
    gridElement.style.gridTemplateColumns = `repeat(${GRID_COLS}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${GRID_ROWS}, 1fr)`;
    
    // renderFunction이 제공되면 사용, 없으면 기본 renderGridItems 사용
    const renderFn = renderFunction || ((gridEl, subMgr, filter) => {
        renderGridItems(gridEl, subMgr, filter);
    });
    
    renderFn(gridElement, subscriptionManager, 'all');

    const overlay = document.querySelector('.grid__overlay');

    gridElement.addEventListener('mouseover', (event) => {
        showGridOverlay(event, gridElement, overlay, subscriptionManager);
    });
    gridElement.addEventListener('mouseleave', () => hiddenGridOverlay(overlay));
    
    // renderFunction을 반환하여 외부에서 재렌더링 가능하도록
    return { render: renderFn };
}

export { initGrid, renderGridItems };
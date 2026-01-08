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
function showGridOverlay(event, gridElement, overlay) {
    const gridItem = event.target.closest('.content__grid-item');
    if (!gridItem) return;

    const computedStyle = getComputedStyle(gridItem);
    const itemRect = gridItem.getBoundingClientRect();
    const gridRect = gridElement.getBoundingClientRect();

    updateOverlayPosition(computedStyle, overlay, itemRect, gridRect);

    overlay.classList.remove('grid__overlay--hidden');
}

// 오버레이 숨기는 함수
function hiddenGridOverlay(overlay) {
    overlay.classList.add('grid__overlay--hidden');
}

// 그리드 아이템 생성 함수
function renderGridItems(gridElement) {
    const totalCount = GRID_COLS * GRID_ROWS;

    const originalItems = [...logoLinks.presses];

    // TODO: 페이지네이션 필요
    const randomItems = fisherYatesShuffle(originalItems).slice(0, totalCount);

    randomItems.forEach((randoms) => {
        const item = document.createElement('div');
        item.className = `content__grid-item`;

        const img = document.createElement('img');
        img.className = `content__grid-img`;
        img.src = `${logoLinks.baseUrl}/${randoms.logo}`;
        item.appendChild(img);
        
        gridElement.appendChild(item);
    })
}

// 그리드 초기화 함수
function initGrid({ containerSelector }) {
    const gridElement = document.querySelector(containerSelector);
    gridElement.style.gridTemplateColumns = `repeat(${GRID_COLS}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${GRID_ROWS}, 1fr)`;
    
    renderGridItems(gridElement);

    const overlay = document.querySelector('.grid__overlay');
    const overlaybutton = createSubscribeButton({ label: "구독하기", onClick: () => {} });
    overlay.appendChild(overlaybutton);

    gridElement.addEventListener('mouseover', (event) => showGridOverlay(event, gridElement, overlay));
    gridElement.addEventListener('mouseleave', () => hiddenGridOverlay(overlay));
}

export { initGrid };
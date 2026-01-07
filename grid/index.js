import { GRID_COLS, GRID_ROWS } from "./config.js";
import logoLinks from '../data/logo_links.json';
import { fisherYatesShuffle } from '../utils';

// 오버레이 너비, 높이, 위치 계산하는 함수
function updateOverlayPosition(overlay, itemRect, gridRect) {
    const nextWidth = itemRect.width;
    const nextHeight = itemRect.height;

    if(overlay.offsetWidth !== nextWidth) overlay.style.width = `${nextWidth}px`;
    if(overlay.offsetHeight !== nextHeight) overlay.style.height = `${nextHeight}px`;
    overlay.style.transform = `translate(${itemRect.left - gridRect.left}px, ${itemRect.top - gridRect.top}px)`;
}

// 오버레이 보여주는 함수
function showGridOverlay(event, gridElement, overlay) {
    const gridItem = event.target.closest('.content__grid-item');
    if (!gridItem) return;
    
    const itemRect = gridItem.getBoundingClientRect();
    const gridRect = gridElement.getBoundingClientRect();

    updateOverlayPosition(overlay, itemRect, gridRect);

    overlay.classList.remove('grid__overlay--hidden');
}

// 오버레이 숨기는 함수
function hiddenGridOverlay(overlay) {
    overlay.classList.add('grid__overlay--hidden');
}

// 그리드 초기화 함수
function initGrid({ containerSelector }) {
    const gridElement = document.querySelector(containerSelector);
    gridElement.style.gridTemplateColumns = `repeat(${GRID_COLS}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${GRID_ROWS}, 1fr)`;
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

    const overlay = document.querySelector('.grid__overlay');

    gridElement.addEventListener('mouseover', (event) => showGridOverlay(event, gridElement, overlay));
    gridElement.addEventListener('mouseleave', () => hiddenGridOverlay(overlay));
}

export { initGrid };
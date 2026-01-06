import rollingNews from './data/rolling_news.json';
import logoLinks from './data/logo_links.json';
import { initRollingBars } from './rolling';
import { fisherYatesShuffle } from './utils';

const GRID_COLS = 6;
const GRID_ROWS = 4;

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
}

// 초기화 실행
document.addEventListener('DOMContentLoaded', () => {
    initGrid({ containerSelector: '.content__grid' });
    initRollingBars(rollingNews, { containerSelector: '.rolling-bar' });
});
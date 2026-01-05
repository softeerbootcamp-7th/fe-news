import rollingNews from './data/rolling_news.json';
import logoLinks from './data/logo_links.json';
import { initRollingBar } from './rolling';

const GRID_COLS = 6;
const GRID_ROWS = 4;

// shuffle Algorithm -> TODO: utils.js로 분리
function fisherYatesShuffle(array) {
    const arr = [...array];

    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

// 그리드 초기화 함수
function initGrid(gridElement, baseClass) {
    gridElement.style.gridTemplateColumns = `repeat(${GRID_COLS}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${GRID_ROWS}, 1fr)`;
    const totalCount = GRID_COLS * GRID_ROWS;
    
    const originalItems = [...logoLinks.presses];

    // TODO: 페이지네이션 필요
    const randomItems = fisherYatesShuffle(originalItems).slice(0, totalCount);

    randomItems.forEach((randoms) => {
        const item = document.createElement('div');
        item.className = `${baseClass}-item`;

        const img = document.createElement('img');
        img.className = `${baseClass}-img`;
        img.src = `${logoLinks.baseUrl}/${randoms.logo}`;
        item.appendChild(img);
        
        gridElement.appendChild(item);
    })
}

// 초기화 실행
document.addEventListener('DOMContentLoaded', () => {
    const contentGrid = document.querySelector('.content__grid');
    initGrid(contentGrid, 'content__grid');
    
    initRollingBar(rollingNews);
});
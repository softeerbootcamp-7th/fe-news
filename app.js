import rollingNews from './data/rolling_news.json';
import logoLinks from './data/logo_links.json';

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
function initGrid() {
    const grid = document.querySelector('.content__grid');
    grid.style.gridTemplateColumns = `repeat(${GRID_COLS}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${GRID_ROWS}, 1fr)`;
    const totalCount = GRID_COLS * GRID_ROWS;
    
    const originalItems = [...logoLinks.presses];

    // TODO: 페이지네이션 필요
    const randomItems = fisherYatesShuffle(originalItems).slice(0, totalCount);

    randomItems.forEach((randoms) => {
        const item = document.createElement('div');
        item.className = 'content__grid-item';

        const img = document.createElement('img');
        img.className = 'content__grid-img';
        img.src = `${logoLinks.baseUrl}/${randoms.logo}`;
        item.appendChild(img);
        
        grid.appendChild(item);
    })
}

// 롤링 아이템 생성 함수
function createNewsItems(barElement, newsData) {
    newsData.forEach((item, index) => {
        const boxElement = document.createElement('div');
        boxElement.className = 'rolling-bar__box';
        boxElement.innerHTML = `
            <p class="rolling-bar__source">${item.press}</p>
            <h3 class="rolling-bar__content">${item.headline}</h3>
        `;

        if(index !== 0) {
            boxElement.classList.add('rolling-bar__item--hidden');
        }

        barElement.appendChild(boxElement);
    });
}

// 롤링 설정 함수
function setupRolling(barElement, totalItems) {
    let currentIndex = 0;
    const rollingNews = barElement.querySelectorAll('.rolling-bar__box');

    return setInterval(() => {
        rollingNews[currentIndex].animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(-200%)', opacity: 0 }
        ], {
            duration: 500,
            easing: 'ease-in-out'
        });
        rollingNews[currentIndex].classList.add('rolling-bar__item--hidden');

        currentIndex = (currentIndex + 1) % totalItems;

        rollingNews[currentIndex].animate([
            { transform: 'translateY(200%)', opacity: 0 },
            { transform: 'translateY(0%)', opacity: 1 }
        ], {
            duration: 500,
            easing: 'ease-in-out'
        });

        rollingNews[currentIndex].classList.remove('rolling-bar__item--hidden');
    }, 5000);
}

// 롤링바 초기화 함수
function initRollingBar() {
    const leftBar = document.querySelector('.rolling-bar__item[data-bar="left"]');
    const rightBar = document.querySelector('.rolling-bar__item[data-bar="right"]');

    // 데이터 분할
    const midPoint = Math.floor(rollingNews.length / 2);
    const leftNews = rollingNews.slice(0, midPoint);
    const rightNews = rollingNews.slice(midPoint);
    
    // 아이템 생성
    createNewsItems(leftBar, leftNews);
    createNewsItems(rightBar, rightNews);

    // 왼쪽: 즉시 시작
    setupRolling(leftBar, leftNews.length);

    // 오른쪽: 1초 후 시작
    setTimeout(() => {
        setupRolling(rightBar, rightNews.length);
    }, 1000);
}

// 초기화 실행
document.addEventListener('DOMContentLoaded', () => {
    initGrid();
    initRollingBar();
});
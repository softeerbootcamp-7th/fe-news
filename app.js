import rollingNews from './data/rolling_news.json';
import logoLinks from './data/logo_links.json';

const GRID_COLS = 6;
const GRID_ROWS = 4;
const ROLLING_INTERVAL = 5000;
const ROLLING_TIMEOUT = 1000;
const ANIMATION_DURATION = 500;
const ROLLING_BARS_CONFIG = [
    { key: '0', delay: 0 },
    { key: '1', delay: ROLLING_TIMEOUT },
];

// shuffle Algorithm -> TODO: utils.js로 분리
function fisherYatesShuffle(array) {
    const arr = [...array];

    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

function splitNewsByBars(news, barCount) {
    const chunkSize = Math.ceil(news.length / barCount);
    const chunks = [];
  
    for (let i = 0; i < barCount; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;
      chunks.push(news.slice(start, end));
    }
  
    return chunks;
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

// 롤링바 초기화 함수
function initRollingBar() {
    const rollingManager = createRollingManager();
    
    const barConfigs = ROLLING_BARS_CONFIG;
    const newsChunks = splitNewsByBars(rollingNews, barConfigs.length);  

    ROLLING_BARS_CONFIG.forEach((config, index) => {
        const selector = `.rolling-bar__item[data-bar="${config.key}"]`;
        const barElement = document.querySelector(selector);
        if(!barElement) return;

        const newsData = newsChunks[index] ?? [];
        if(newsData.length === 0) return;

        createNewsItems(barElement, newsData);

        const rollingBar = createRollingBar(barElement, newsData);

        rollingManager.register(config.key, rollingBar, {
            delay: config.delay,
        });
    })
}

function createRollingManager() {
    const timers = new Map();

    function register(key, rollingBar, { delay = 0, interval = ROLLING_INTERVAL } = {}) {
        if(timers.has(key)) return;

        setTimeout(() => {
            const id = setInterval(() => {
                rollingBar.tick();
            }, interval);

            timers.set(key, id);
        }, delay);
    }

    return { register };
}

function createRollingBar(barElement, items) {
    let currentIndex = 0;
    const nodes = barElement.querySelectorAll('.rolling-bar__box');

    function tick() {
        const current = currentIndex;
        const next = (current + 1) % items.length;

        nodes[current].animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(-200%)', opacity: 0 }
        ], {
            duration: ANIMATION_DURATION,
            easing: 'ease-in-out'
        });
        nodes[current].classList.add('rolling-bar__item--hidden');

        nodes[next].animate([
            { transform: 'translateY(200%)', opacity: 0 },
            { transform: 'translateY(0%)', opacity: 1 }
        ], {
            duration: ANIMATION_DURATION,
            easing: 'ease-in-out'
        });

        nodes[next].classList.remove('rolling-bar__item--hidden');

        currentIndex = next;
    }

    return { tick };
}

// 초기화 실행
document.addEventListener('DOMContentLoaded', () => {
    const contentGrid = document.querySelector('.content__grid');
    initGrid(contentGrid, 'content__grid');
    
    initRollingBar();
});
import { ANIMATION_DURATION, ROLLING_BARS_CONFIG } from './config.js';
import { createRollingManager } from './manager.js';

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

// 롤링바 초기화 함수
function initRollingBar(rollingNews) {
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

export { initRollingBar };
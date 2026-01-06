import { ROLLING_INTERVAL, ANIMATION_DURATION, ROLLING_BARS_CONFIG } from './config.js';
import { createRollingManager } from './manager.js';

// 롤링 아이템 생성 함수
function createNewsItems(barElement, newsData) {
    newsData.forEach((item, index) => {
        const boxElement = document.createElement('div');
        boxElement.className = 'rolling-bar__box';

        const source = document.createElement('p');
        source.className = 'rolling-bar__source';
        source.textContent = item.press;

        const content = document.createElement('h3');
        content.className = 'rolling-bar__content';
        content.textContent = item.headline;

        if(index !== 0) {
            boxElement.classList.add('rolling-bar__item--hidden');
        }
        boxElement.append(source, content);
        barElement.appendChild(boxElement);
    });
}

function createRollingAnimator(barElement, items) {
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
function initRollingBars(rollingNews, { containerSelector }) {
    const rollingManager = createRollingManager();

    ROLLING_BARS_CONFIG.forEach((config, index) => {
        const barElement = document.querySelector(containerSelector);

        const barItemElement = document.createElement('article');
        barItemElement.className = 'rolling-bar__item';
        barItemElement.dataset.bar = config.key;

        barElement.appendChild(barItemElement);

        const newsData = rollingNews[index] ?? [];
        if(newsData.length === 0) return;

        createNewsItems(barItemElement, newsData);

        const rollingBar = createRollingAnimator(barItemElement, newsData);

        rollingManager.register(config.key, rollingBar, { delay: config.delay, interval: ROLLING_INTERVAL });
    })
}

export { initRollingBars };
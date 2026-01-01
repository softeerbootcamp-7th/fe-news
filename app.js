import rollingNews from './data/rolling_news.json';

// 그리드 초기화 함수
function initGrid() {
    const grid = document.querySelector('.content__grid');
    const totalItems = 6 * 4; // 24개
    
    for (let i = 0; i < totalItems; i++) {
        const item = document.createElement('div');
        item.className = 'content__grid-item';
        grid.appendChild(item);
    }
}

// 롤링 아이템 생성 함수
function createNewsItems(barElement, newsData) {
    newsData.forEach((item, index) => {
        const source = document.createElement('p');
        source.className = 'rolling-bar__source';
        source.textContent = item.press;
        
        const content = document.createElement('h3');
        content.className = 'rolling-bar__content';
        content.textContent = item.headline;

        if(index !== 0) {
            source.classList.add('rolling-bar__item--hidden');
            content.classList.add('rolling-bar__item--hidden');
        }

        barElement.appendChild(source);
        barElement.appendChild(content);
    });
}

// 롤링 설정 함수
function setupRolling(barElement, totalItems) {
    let currentIndex = 0;
    const sources = barElement.querySelectorAll('.rolling-bar__source');
    const contents = barElement.querySelectorAll('.rolling-bar__content');

    return setInterval(() => {
        // 현재 뉴스 숨김 (p와 h3 모두)
        sources[currentIndex].classList.add('rolling-bar__item--hidden');
        contents[currentIndex].classList.add('rolling-bar__item--hidden');
        
        // 다음 뉴스로 이동
        currentIndex = (currentIndex + 1) % totalItems;
        
        // 다음 뉴스 표시 (p와 h3 모두)
        sources[currentIndex].classList.remove('rolling-bar__item--hidden');
        contents[currentIndex].classList.remove('rolling-bar__item--hidden');
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
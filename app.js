import rollingNews from './data/rolling_news.json';

document.addEventListener('DOMContentLoaded', () => {
    // 그리드 생성 코드
    const grid = document.querySelector('.content__grid');
    const totalItems = 6 * 4; // 24개
    
    for (let i = 0; i < totalItems; i++) {
        const item = document.createElement('div');
        item.className = 'content__grid-item';
        grid.appendChild(item);
    }

    // 롤링바 구현 코드
    const leftBar = document.querySelector('.rolling-bar__item[data-bar="left"]');
    const rightBar = document.querySelector('.rolling-bar__item[data-bar="right"]');

    const midPoint = Math.floor(rollingNews.length / 2);
    const leftNews = rollingNews.slice(0, midPoint);
    const rightNews = rollingNews.slice(midPoint);
    
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

    createNewsItems(leftBar, leftNews);
    createNewsItems(rightBar, rightNews);

    // 롤링 함수
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

    // 왼쪽: 즉시 시작
    const leftInterval = setupRolling(leftBar, leftNews.length);

    // 오른쪽: 1초 후 시작
    setTimeout(() => {
        const rightInterval = setupRolling(rightBar, rightNews.length);
    }, 1000);
});
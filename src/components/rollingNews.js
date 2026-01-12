const INTERVAL_TIME = 100; // 0.1초 (100ms)
const ANIMATION_DURATION = 500; // 0.5초 (500ms)
const NEWS_CYCLE_TICKS = 50; // 50 * 0.1초 = 5초
const BOX1_START_TICK = 1; // 0.1초 시점
const BOX2_START_TICK = 11; // 1.1초 시점

const NEWS_DATA = [
    {
        targetId: 'rolling1',
        press: '연합뉴스',
        titles: [
            "[속보] 도심 공원 ‘조용한 독서존’ 시범 운영",
            "국내 코로나19 신규 확진자 2만명 육박",
            "정부, 부동산 정책 대대적 수정 예고",
            "4차 산업혁명 시대, 교육의 미래는?",
            "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향"
        ]
    },
    {
        targetId: 'rolling2',
        press: '한겨레',
        titles: [
            "정부, 부동산 정책 대대적 수정 예고",
            "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
            "기후 변화 대응 위한 국제 협력 강화 필요",
            "국내 코로나19 신규 확진자 2만명 육박",
            "4차 산업혁명 시대, 교육의 미래는?"
        ]
    }
];

/**
 * 롤링 뉴스 기능 제공합니다.
 */
export const rollingNews = () => {
    renderNewsList(NEWS_DATA);

    const box1 = document.getElementById('rolling1');
    const box2 = document.getElementById('rolling2');

    if (!box1 || !box2) return;

    const list1 = box1.querySelector('.rolling-list');
    const list2 = box2.querySelector('.rolling-list');

    let count = 0; // 0.1초마다 올라가는 tick
    let isBox1Hover = false;
    let isBox2Hover = false;
    
    box1.addEventListener('mouseenter', () => { isBox1Hover = true; });
    box1.addEventListener('mouseleave', () => { isBox1Hover = false; });
    box2.addEventListener('mouseenter', () => { isBox2Hover = true; });
    box2.addEventListener('mouseleave', () => { isBox2Hover = false; });

    setInterval(() => {
        count++;

        // 0.1초 시점에 #rolling1 출발
        if (count === BOX1_START_TICK && !isBox1Hover) {
            roll(list1);
        }

        // 1.1초 시점에 #rolling2 출발 (정확히 1초 차이)
        if (count === BOX2_START_TICK && !isBox2Hover) {
            roll(list2);
        }

        // 5초(50틱)마다 카운트 초기화 -> 무한 반복
        if (count >= NEWS_CYCLE_TICKS) {
            count = 0;
        }

    }, INTERVAL_TIME); 
};

/**
 * 리스트에 롤링 애니메이션을 적용하고 DOM 순서를 회전시킵니다.
 * @param {HTMLElement} list - 롤링할 ul 요소
 */
const roll = (list) => {
    if (!list) return;

    const itemHeight = list.querySelector('li').offsetHeight;
    const listGap = 16

    list.style.transition = 'transform 0.5s ease-in-out';
    list.style.transform = `translateY(-${itemHeight+listGap}px)`;

    setTimeout(() => {
        list.style.transition = 'none';
        list.appendChild(list.firstElementChild);
        list.style.transform = 'translateY(0)';
    }, ANIMATION_DURATION);
}

const renderNewsList = (newsData) => {
    if (!newsData || !Array.isArray(newsData)) return;

    newsData.forEach(data => {
        const boxElement = document.getElementById(data.targetId);
        if (!boxElement) return;

        const pressElement = boxElement.querySelector('.press');
        if (pressElement) {
            pressElement.textContent = data.press;
        }

        const listElement = boxElement.querySelector('.rolling-list');
        if (listElement) {
            listElement.innerHTML = '';
            const fragment = document.createDocumentFragment();

            data.titles.forEach(title => {
                const li = document.createElement('li');
                li.className = 'rolling-item available-medium14'; 
                li.textContent = title;

                fragment.appendChild(li);
            });

            listElement.appendChild(fragment);
        }
    });
};
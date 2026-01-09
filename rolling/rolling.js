import { getLatestHeadlines } from '../data/rollingData.js';
import { createRollingClock } from './rollingClock.js';
import { createRollingArea } from './rollingArea.js';

const ROLLING_INTERVAL = 5000;  // 5초 롤링 간격
const ROLLING_DELAY = 1000;     // 딜레이 1초
const RECENT_NEWS = 10;         // 최신 뉴스 10개

export function initRollingTabs() {
    // 전체 주기를 관리할 하나의 클락 생성
    const clock = createRollingClock(ROLLING_INTERVAL);
    // 최신 뉴스 10개 불러오기
    const headlines = getLatestHeadlines(RECENT_NEWS);


    // 좌우 롤링 탭 DOM 참조
    const [leftTab, rightTab] = document.querySelectorAll('.rolling-tab');
    const rollingTabs = {
        left: leftTab,
        right: rightTab
    };
    const leftUl = rollingTabs.left.querySelector('.news-list');
    const rightUl = rollingTabs.right.querySelector('.news-list');

    /*
    롤링 영역 생성
    각 영역은 DOM 2개만 유지하며 무한 롤링
    offset 값을 통해 좌우 롤링 시간차를 제어
    */
    // 왼쪽 롤링 탭 (즉시 롤링)
    const leftArea = createRollingArea(leftUl, headlines.slice(0, RECENT_NEWS/2), { offset: 0 });
    // 오른쪽 롤링 탭 (1초 뒤 롤링)
    const rightArea = createRollingArea(rightUl, headlines.slice(RECENT_NEWS/2, RECENT_NEWS), { offset: ROLLING_DELAY });

    /*
    전역 클락의 tick 이벤트를 각 롤링 영역에 연결
    모든 영역이 동일한 시간 기준에서 롤링
    hover 이후에도 시간차가 깨지지 않음
    */
    clock.subscribe(leftArea.onTick);
    clock.subscribe(rightArea.onTick);

    /*
    hover 제어
    hover 시 해당 영역의 롤링만 일시 정지
    전역 클락은 멈추지 않아 다른 영역에는 영향 없음
    hover 해제 시 다음 tick에 자동 재동기화
    */
    rollingTabs.left.addEventListener('mouseenter', leftArea.pause);
    rollingTabs.left.addEventListener('mouseleave', leftArea.resume);

    rollingTabs.right.addEventListener('mouseenter', rightArea.pause);
    rollingTabs.right.addEventListener('mouseleave', rightArea.resume);
}
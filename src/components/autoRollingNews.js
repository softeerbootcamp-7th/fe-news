import { newsList } from "../../dummyData/newsList";

const NEWS_COUNT = 5;
const ROLLING_INTERVAL_MS = 5000;
const ROLLING_DELAY_MS = 1000;

/**
 * 자동 롤링 뉴스 항목을 초기화하고 시작합니다.
 *
 * `auto-rolling-news-item` 클래스 요소들을 찾아 항목별 상태를 초기화하고,
 * 각 항목의 인덱스 별로 롤링 간격을 지연시켜 시작합니다.
 * mouseover 시 해당 항목만 일시정지하고, mouseleave 시 1초 후에 다시 시작합니다.
 *
 * @returns {void}
 */
export function autoRollingNews() {
    const rollingStates = []

    const items = document.querySelectorAll('.auto-rolling-news-item');

    items.forEach((item, i) => {
        rollingStates.push({
            element: item,
            start: i * NEWS_COUNT,
            end: i * NEWS_COUNT + NEWS_COUNT - 1,
            currentIndex: i * NEWS_COUNT,
            intervalId: null,
        });
    });

    rollingStates.forEach((state, i) => {
    renderNews(state.element, newsList[state.currentIndex]);

    setTimeout(() => {
        startRolling(state);
    }, i * ROLLING_DELAY_MS);

    state.element.addEventListener('mouseenter', () => stopRolling(state));
    state.element.addEventListener('mouseleave', () => startRolling(state));
    });
}

function renderNews(target, news) {
    if (!target) return;
    const pressEl = target.querySelector('.press');
    const titleEl = target.querySelector('.title');

    pressEl.textContent = news.press;
    titleEl.textContent = news.title;
}

function startRolling(state) {
if (state.intervalId) return;

state.intervalId = setInterval(() => {
    state.currentIndex =
    state.currentIndex < state.end
        ? state.currentIndex + 1
        : state.start;

    renderNews(state.element, newsList[state.currentIndex]);
}, ROLLING_INTERVAL_MS);
}

function stopRolling(state) {
clearInterval(state.intervalId);
state.intervalId = null;
}

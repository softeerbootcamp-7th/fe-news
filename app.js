import rollingNews from './data/rolling_news.json';
import { initRollingBars } from './rolling';
import { initGrid } from './grid';

// 초기화 실행
document.addEventListener('DOMContentLoaded', () => {
    initRollingBars(rollingNews, { containerSelector: '.rolling-bar' });
    initGrid({ containerSelector: '.content__grid' });
});
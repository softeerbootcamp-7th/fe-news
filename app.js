import rollingNews from './data/rolling_news.json';
import { initRollingBars } from './rolling';
import { initGrid } from './grid';
import { initSubscriptionSystem } from './subscription/index.js';
import { renderGridItems } from './grid/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const { subscriptionManager } = initSubscriptionSystem();
    
    initGrid({
        containerSelector: '.content__grid',
        subscriptionManager,
        renderFunction: renderGridItems
    });
    
    initRollingBars(rollingNews, { containerSelector: '.rolling-bar' });
});
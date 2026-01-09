import rollingNews from './data/rolling_news.json';
import { initRollingBars } from './rolling';
import { initGrid } from './grid';
import { initSubscriptionSystem } from './subscription/index.js';
import { renderGridItems } from './grid/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const gridResult = initGrid({
        containerSelector: '.content__grid',
        subscriptionManager: null,
        renderFunction: renderGridItems
    });
    
    const { subscriptionManager } = initSubscriptionSystem(gridResult.updateOverlayButton);
    
    // subscriptionManager를 그리드에 설정
    if (gridResult.setSubscriptionManager) {
        gridResult.setSubscriptionManager(subscriptionManager);
    }
    
    initRollingBars(rollingNews, { containerSelector: '.rolling-bar' });
});
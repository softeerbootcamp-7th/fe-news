import { SubscriptionManager } from './manager.js';
import { createTabBadgeObserver, createGridFilterObserver } from './observers.js';
import { initTabManager } from './tab-manager.js';
import { renderGridItems } from '../grid/index.js';

export function initSubscriptionSystem() {
    const subscriptionManager = new SubscriptionManager();
    
    const tabBadgeObserver = createTabBadgeObserver('.content__tab-badge');
    if (tabBadgeObserver.badgeElement) {
        tabBadgeObserver.badgeElement.textContent = '0';
    }
    
    const gridElement = document.querySelector('.content__grid');
    const gridFilterObserver = createGridFilterObserver(
        gridElement,
        renderGridItems,
        subscriptionManager
    );
    
    subscriptionManager.subscribe(tabBadgeObserver);
    subscriptionManager.subscribe(gridFilterObserver);
    
    initTabManager({ tabSelector: '.content__tab', gridFilterObserver });
    
    return { subscriptionManager, gridFilterObserver };
}


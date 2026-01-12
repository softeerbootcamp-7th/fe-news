import { renderCurrentDate } from '../utils/date.js';
import { initSubscriptionBadge } from '../utils/subscription/subscriptionController.js';
import { initSubscriptionTabs } from '../utils/subscription/subscriptionTabController.js';
import { initSubscriptionStore } from '../utils/subscription/subscriptionStore.js';
import { initViewTabs } from '../utils/viewTabController.js';
import { initGridEvents } from '../utils/grid/gridController.js';
import { initRollingTabs } from '../rolling/rolling.js';
import { initPageController } from '../utils/page/pageController.js';

export function initAfterNewsLoad() {
    initSubscriptionStore();

    renderCurrentDate('current-date');

    initSubscriptionBadge({
        badgeSelector: '.badge'
    });

    initSubscriptionTabs();

    initViewTabs({
        listId: 'list-view',
        gridId: 'grid-view'
    });

    initGridEvents({
        viewId: 'newsGrid',
        prevBtnId: 'prevBtn',
        nextBtnId: 'nextBtn'
    });

    initPageController({
        prevBtnId: 'prevBtn',
        nextBtnId: 'nextBtn'
    });

    initRollingTabs();
}
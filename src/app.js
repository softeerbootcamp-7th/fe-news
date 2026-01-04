import { getSubscribedCount } from './state/subscription.js';
import { initPressGrid } from './components/pressGrid.js';
import { initProviderTabs } from './components/providerTabs.js';
import { initRollingNews } from './components/rollingNews.js';

const badge = document.querySelector('.sub-badge');

function updateSubscriptionBadge() {
    const count = getSubscribedCount();
    badge.textContent = count;
}

initRollingNews();
initProviderTabs();
initPressGrid({
    onSubscribeChange: updateSubscriptionBadge,
});

updateSubscriptionBadge();

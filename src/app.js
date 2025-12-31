import { getSubscribedCount } from './state/subscription.js';
import { initProviderGrid } from './ui/provider.js';
//import { initRollingNews } from './ui/rolling.js';

const badge = document.querySelector('.sub-badge');

function updateSubscriptionBadge() {
    const count = getSubscribedCount();
    badge.textContent = count;
}

//initRollingNews();
initProviderGrid({
    onSubscribeChange: updateSubscriptionBadge,
});

updateSubscriptionBadge();


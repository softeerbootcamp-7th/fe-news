import { getSubscribedCount } from './subscriptionStore.js';

export function initSubscriptionBadge({
  badgeSelector = '.badge'
}) {
  const badge = document.querySelector(badgeSelector);

  if (!badge) return;

  function update() {
    const count = getSubscribedCount();
    badge.textContent = count;
  }

  document.addEventListener('subscription-change', update);
  update();
}
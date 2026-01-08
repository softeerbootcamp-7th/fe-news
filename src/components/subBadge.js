import { getSubscribedCount, subscribe } from '../store/subscription.js';

export function initSubscriptionBadge() {
  const badge = document.querySelector('.sub-badge');
  function update() {
    badge.textContent = getSubscribedCount();
  }

  update();
  subscribe(update);

  return;
}

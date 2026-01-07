import { getSubscribedCount } from '../store/subscription.js';

export function initSubscriptionBadge() {
  const badge = document.querySelector('.sub-badge');
  function update() {
    badge.textContent = getSubscribedCount();
  }

  update();

  return {
    update,
  };
}

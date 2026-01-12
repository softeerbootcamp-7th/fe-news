import { isSubscribed, addSubscription } from '../store/subscription.js';
import { createSubAlert } from './subAlert.js';

const BUTTON_TEXT = {
  subscribed: '× 해지하기',
  unsubscribed: '+ 구독하기',
};

export function createSubButton(pressId) {
  const button = document.createElement('button');
  button.className = 'sub-button';

  function update() {
    button.textContent = isSubscribed(pressId) ? BUTTON_TEXT.subscribed : BUTTON_TEXT.unsubscribed;
  }

  update();

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    isSubscribed(pressId) ? createSubAlert(pressId) : addSubscription(pressId);
  });

  return button;
}

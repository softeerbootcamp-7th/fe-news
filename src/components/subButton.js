import { isSubscribed, toggleSubscribe } from '../state/subscription.js';
import { initSubscriptionBadge } from './subBadge.js';

const BUTTON_TEXT = {
    subscribed: '× 해지하기',
    unsubscribed: '+ 구독하기',
}

const subscriptionBadge = initSubscriptionBadge();

export function createSubButton(pressId) {
    const button = document.createElement('button');
    button.className = 'sub-button';
    updateButton(button, pressId);

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSubscribe(pressId);
        updateButton(button, pressId);
        subscriptionBadge.update();
    });

    return button;
}

function updateButton(button, pressId) {
    button.textContent = isSubscribed(pressId)
        ? BUTTON_TEXT.subscribed
        : BUTTON_TEXT.unsubscribed;
}
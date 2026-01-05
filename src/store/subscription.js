const subscriptionState = new Map();
const listeners = new Set();

export function observeSubscriptionStore(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(pressId) {
  listeners.forEach((listener) => listener(pressId));
}

export function isSubscribed(pressId) {
  const pressId_str = String(pressId);

  return subscriptionState.get(pressId_str) ?? false;
}

export function toggleSubscription(pressId) {
  const pressId_str = String(pressId);
  const nextValue = !isSubscribed(pressId_str);
  subscriptionState.set(pressId_str, nextValue);
  notify(pressId);
}

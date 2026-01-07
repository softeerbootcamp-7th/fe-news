const subscriptionState = new Map();
const listeners = new Set();

export function observeSubscriptionStore(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(pressName) {
  listeners.forEach((listener) => listener(pressName));
}

export function isSubscribed(pressName) {
  return subscriptionState.get(pressName) ?? false;
}

export function toggleSubscription(pressName) {
  const nextValue = !isSubscribed(pressName);
  subscriptionState.set(pressName, nextValue);
  notify(pressName);
}

export function getSubscriptionCount() {
  return Array.from(subscriptionState.values()).filter(
    (value) => value === true
  ).length;
}

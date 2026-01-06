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
  const pressName_str = String(pressName);

  return subscriptionState.get(pressName_str) ?? false;
}

export function toggleSubscription(pressName) {
  const nextValue = !isSubscribed(pressName_str);
  subscriptionState.set(pressName, nextValue);
  notify(pressName);
}

export function getSubscriptionCount() {
  return Array.from(subscriptionState.values()).filter(
    (value) => value === true
  ).length;
}

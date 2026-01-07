const subscriptionState = new Map(); // key: press name, value: date
const listeners = new Set();

export function observeSubscriptionStore(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(pressName) {
  listeners.forEach((listener) => listener(pressName));
}

export function isSubscribed(pressName) {
  return subscriptionState.get(pressName) ? true : false;
}

export function getSubscriptionDate(pressName) {
  return subscriptionState.get(pressName) ?? null;
}

export function toggleSubscription(pressName) {
  if (isSubscribed(pressName)) subscriptionState.delete(pressName);
  else subscriptionState.set(pressName, new Date());
  notify(pressName);
}

export function getSubscriptionCount() {
  return subscriptionState.size;
}

export function getSubscribedList() {
  return Array.from(subscriptionState.entries())
    .sort(([, dateA], [, dateB]) => new Date(dateA) - new Date(dateB))
    .map(([key]) => key);
}

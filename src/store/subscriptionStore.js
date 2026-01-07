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

export function getSubscribedList() {
  return Array.from(subscriptionState.entries())
    .filter(([key, value]) => value === true) // value가 true인 엔트리만 필터링
    .map(([key, value]) => key); // 필터링된 엔트리에서 key만 추출하여 새 배열 생성
}

const STORAGE_KEY = 'subscribedPressIds';

export const subscribedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...subscribedIds]));
}

const listeners = new Set();

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function isSubscribed(id) {
  return subscribedIds.has(id);
}

export function addSubscription(id) {
  subscribedIds.add(id);
  save();
  notify();
}

export function removeSubscription(id) {
  subscribedIds.delete(id);
  save();
  notify();
}

export function getSubscribedCount() {
  return subscribedIds.size;
}

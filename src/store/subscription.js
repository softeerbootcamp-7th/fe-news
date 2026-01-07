const STORAGE_KEY = 'subscribedPressIds';

export const subscribedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...subscribedIds]));
}

export function isSubscribed(id) {
  return subscribedIds.has(id);
}

export function toggleSubscribe(id) {
  subscribedIds.has(id) ? subscribedIds.delete(id) : subscribedIds.add(id);
  save();
}

export function getSubscribedCount() {
  return subscribedIds.size;
}

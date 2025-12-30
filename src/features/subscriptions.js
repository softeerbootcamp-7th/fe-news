import { $ } from "../utils/dom.js";

export function getSubscribedSet(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    const arr = Array.isArray(parsed) ? parsed : [];
    return new Set(arr.filter((x) => typeof x === "string"));
  } catch {
    return new Set();
  }
}

export function setSubscribedSet(storageKey, set) {
  localStorage.setItem(storageKey, JSON.stringify([...set]));
}

export function updateSubscribedCount({
  storageKey,
  badgeSelector = "#sub-count",
} = {}) {
  const $badge = $(badgeSelector);
  if (!$badge || !storageKey) return;
  const count = getSubscribedSet(storageKey).size;
  $badge.textContent = String(count);
  $badge.setAttribute("aria-label", `구독 수 ${count}`);
}

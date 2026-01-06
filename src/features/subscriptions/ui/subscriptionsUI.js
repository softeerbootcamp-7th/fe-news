import { $ } from "../../../shared/lib/index.js";

export function renderSubscribedCount({
  documentRef = document,
  selector = "#sub-count",
  count = 0,
} = {}) {
  const $badge = $(selector, documentRef);
  if (!$badge) return;
  $badge.textContent = String(count);
  $badge.setAttribute("aria-label", `구독 수 ${count}`);
}

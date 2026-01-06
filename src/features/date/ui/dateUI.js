import { $ } from "../../../shared/lib/index.js";

export function renderDateText({
  documentRef = document,
  selector = "#date",
  text,
  datetime,
} = {}) {
  const $date = $(selector, documentRef);
  if (!$date) return;
  $date.textContent = text;
  if (datetime) $date.setAttribute("datetime", datetime);
}

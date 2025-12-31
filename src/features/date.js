import { $ } from "../utils/dom.js";

export function setDate({ dateSelector = "#date", dayNames }) {
  const $date = $(dateSelector);
  if (!$date) return;

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const day = Array.isArray(dayNames) ? dayNames[now.getDay()] : "";

  const text = `${yyyy}. ${mm}. ${dd}. ${day}`;
  $date.textContent = text;
  $date.setAttribute("datetime", `${yyyy}-${mm}-${dd}`);
}

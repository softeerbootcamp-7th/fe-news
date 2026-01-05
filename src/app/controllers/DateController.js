import { $ } from "../../utils/dom.js";

export class DateController {
  constructor({
    context,
    dayNames,
    dateSelector,
    // backward compatible
    documentRef,
  } = {}) {
    const ctx = context ?? {};
    const selectors = ctx.selectors ?? {};
    this.document = ctx.document ?? documentRef ?? document;
    this.dayNames = dayNames;
    this.dateSelector = dateSelector ?? selectors.date ?? "#date";
  }

  render() {
    const $date = $(this.dateSelector, this.document);
    if (!$date) return;

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const day = Array.isArray(this.dayNames)
      ? this.dayNames[now.getDay()]
      : "";

    const text = `${yyyy}. ${mm}. ${dd}. ${day}`;
    $date.textContent = text;
    $date.setAttribute("datetime", `${yyyy}-${mm}-${dd}`);
  }
}

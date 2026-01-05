import { formatKoreanDateLabel } from "../../../shared/lib/index.js";
import { renderDateText } from "../ui/dateUI.js";

export class DateController {
  constructor({
    context,
    dayNames,
    dateSelector,
    documentRef,
  } = {}) {
    const ctx = context ?? {};
    const selectors = ctx.selectors ?? {};
    this.document = ctx.document ?? documentRef ?? document;
    this.dayNames = dayNames;
    this.dateSelector = dateSelector ?? selectors.date ?? "#date";
  }

  render() {
    const { text, datetime } = formatKoreanDateLabel({
      date: new Date(),
      dayNames: this.dayNames,
    });
    renderDateText({
      documentRef: this.document,
      selector: this.dateSelector,
      text,
      datetime,
    });
  }
}

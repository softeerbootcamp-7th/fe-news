import { SELECTORS } from "../../../shared/const/index.js";
import { formatKoreanDateLabel } from "../../../shared/lib/index.js";
import { renderDateText } from "../ui/dateUI.js";

export class DateController {
  constructor({
    context,
    dayNames,
    dateSelector = SELECTORS.date,
  } = {}) {
    const ctx = context ?? {};
    this.document = ctx.document ?? document;
    this.dayNames = dayNames;
    this.dateSelector = dateSelector;
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

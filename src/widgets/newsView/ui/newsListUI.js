import { $, encodePathSegment } from "../../../shared/lib/index.js";
import {
  renderActiveTabButtons,
  renderNavButtons,
} from "../lib/newsViewPagination.js";

export { renderActiveTabButtons, renderNavButtons };

export function renderLogoList({
  documentRef = document,
  selector = "#logos",
  cells = [],
  folder,
  subscribed = new Set(),
} = {}) {
  const $logos = $(selector, documentRef);
  if (!$logos) return;

  $logos.innerHTML = `<div>테스트</div>`;
}

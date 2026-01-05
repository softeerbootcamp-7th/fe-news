import { createEl } from "../lib/dom";
import { getDate } from "../lib/utils";
import { getLogo } from "./logo";

export function createHeader() {
  const logoMarkup = getLogo().outerHTML;

  const header = createEl(
    "header",
    "ns-header",
    `
      <div id="title-wrap" data-action="reload" role="button" tabindex="0" aria-label="새로고침">
        ${logoMarkup}
        <h1 class="ns-title text-strong" aria-label="뉴스스탠드">뉴스스탠드</h1>
      </div>

      <div class="ns-date typo typo-display-medium16">
        <div id="date">${getDate()}</div>
      </div>
    `
  );

  header.addEventListener("click", (e) => {
    const target = e.target.closest('[data-action="reload"]');
    if (!target) return;
    window.location.reload();
  });

  return header;
}

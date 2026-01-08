import {
  getSubscribeButtonTemplate,
  getCancelButtonTemplate,
} from "@/template/SubscribeButton";
import { VIEW_TAB } from "@/types/constant";

export function getPressGridContainerTemplate() {
  return `
    <ul class="press-grid__list">
    </ul>
  `;
}

export function getPressGridItemTemplate({
  pressId,
  pressName,
  logoSrc,
  isSubscribed,
}) {
  return `
    <li class="press-grid__item" data-label="${pressName}">
      <img src="${logoSrc}" alt="${pressName}" />
      ${
        isSubscribed
          ? getCancelButtonTemplate(VIEW_TAB.GRID)
          : getSubscribeButtonTemplate(VIEW_TAB.GRID)
      }
    </li>
    
  `;
}

export function getEmptyGridItemTemplate() {
  return `
    <li class="press-grid__item empty">
    </li>
  `;
}

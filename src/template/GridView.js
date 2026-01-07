import {
  getSubscribeButtonTemplate,
  getCancelButtonTemplate,
} from "@/template/SubscribeButton";

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
      ${isSubscribed ? getCancelButtonTemplate() : getSubscribeButtonTemplate()}
    </li>
    
  `;
}

export function getEmptyGridItemTemplate() {
  return `
    <li class="press-grid__item empty">
    </li>
  `;
}

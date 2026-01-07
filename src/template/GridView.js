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

export function getSubscribeButtonTemplate() {
  return `
    <button class="button-label bg-white">

      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 6.49902H6.5V9.49902H5.5V6.49902H2.5V5.49902H5.5V2.49902H6.5V5.49902H9.5V6.49902Z" fill="currentColor"/>
      </svg>
      <span>구독하기</span>
      
    </button>
  `;
}

export function getCancelButtonTemplate() {
  return `
    <button class="button-label bg-gray">
      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.6 9L3 8.4L5.4 6L3 3.6L3.6 3L6 5.4L8.4 3L9 3.6L6.6 6L9 8.4L8.4 9L6 6.6L3.6 9Z" fill="currentColor"/>
      </svg>
      <span>해지하기</span>
    </button>
  `;
}

export function getEmptyGridItemTemplate() {
  return `
    <li class="press-grid__item empty">
    </li>
  `;
}

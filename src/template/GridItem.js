export function getGridItemPressTemplate({ imgSrc, imgAlt, isSubscribed }) {
  return `
    <li class="press-grid__item">
      <img src="${imgSrc}" alt="${imgAlt}" />
      <button class="button-label bg-${isSubscribed ? "gray" : "white"}">
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="${
            isSubscribed
              ? "M3.6 9L3 8.4L5.4 6L3 3.6L3.6 3L6 5.4L8.4 3L9 3.6L6.6 6L9 8.4L8.4 9L6 6.6L3.6 9Z"
              : "M9.5 6.49902H6.5V9.49902H5.5V6.49902H2.5V5.49902H5.5V2.49902H6.5V5.49902H9.5V6.49902Z"
          }" fill="currentColor"/>
          
        </svg>
        <span>${isSubscribed ? "해지하기" : "구독하기"}</span>
      </button>
    </li>
    
  `;
}

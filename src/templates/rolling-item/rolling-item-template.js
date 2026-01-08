/**
 *
 * @typedef {Object} RollingItemTemplateParams
 * @property {string} shownNewspaperPress
 * @property {string} shownNewspaperTitle
 * @property {string} hiddenNewspaperPress
 * @property {string} hiddenNewspaperTitle
 * @property {boolean} isRolling
 *
 * @param {RollingItemTemplateParams} rollingItemTemplateParams
 * @returns {string} rollingItem
 */
export const rollingItemTemplate = ({
  shownNewspaperPress,
  shownNewspaperTitle,
  hiddenNewspaperPress,
  hiddenNewspaperTitle,
}) => {
  return `
  <ul class="rolling-section__item--content-wrapper">
    <li class="rolling-section__item--content">
      <h1 class="rolling-section__item--newspaper">${shownNewspaperPress}</h1>
      <p class="rolling-section__item--title">${shownNewspaperTitle}</p>
    </li>
    <li class="rolling-section__item--content">
      <h1 class="rolling-section__item--newspaper">${hiddenNewspaperPress}</h1>
      <p class="rolling-section__item--title">${hiddenNewspaperTitle}</p>
    </li>
  </ul> 
  `;
};

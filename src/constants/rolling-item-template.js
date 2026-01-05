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
  isRolling = false,
}) => {
  return `
  <div class="rolling-section__item--content-wrapper ${isRolling ? 'rollup' : ''}">
    <div class="rolling-section__item--content">
      <h1 class="rolling-section__item--newspaper">${shownNewspaperPress}</h1>
      <p class="rolling-section__item--title">${shownNewspaperTitle}</p>
    </div>
    <div class="rolling-section__item--content">
      <h1 class="rolling-section__item--newspaper">${hiddenNewspaperPress}</h1>
      <p class="rolling-section__item--title">${hiddenNewspaperTitle}</p>
    </div>
  </div> 
  `;
};

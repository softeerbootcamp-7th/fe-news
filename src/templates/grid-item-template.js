import { logoImageTemplate } from './logo-image-template.js';

/**
 * @typedef {import('../../types').Newspaper} Newspaper
 *
 * @typedef {Object} GridItemTemplateParams
 * @property {Newspaper['logo']} logoUrl
 * @property {number} index
 *
 * @param {GridItemTemplateParams} gridItemTemplateParams
 * @returns
 */
export const gridItemTemplate = ({ logoUrl, index }) => {
  return `
  <div class="news-grid-view__card" data-index="${index}">
    ${logoImageTemplate({ logoUrl, className: 'news-grid-view__card--image' })}
  </div>
  `;
};

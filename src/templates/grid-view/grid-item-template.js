import { logoImageTemplate } from '../logo-image-template.js';

/**
 * @typedef {import('../../types').Newspaper} Newspaper
 *
 * @typedef {Object} GridItemTemplateParams
 * @property {Newspaper['logo']| null} logoUrl
 * @property {number} index
 *
 * @param {GridItemTemplateParams} gridItemTemplateParams
 * @returns
 */
export const gridItemTemplate = ({ logoUrl, index }) => {
  return `
  <li class="news-grid-view__card" data-index="${index}">
    ${logoUrl ? logoImageTemplate({ logoUrl, className: 'news-grid-view__card--image' }) : ''}
  </li>
  `;
};

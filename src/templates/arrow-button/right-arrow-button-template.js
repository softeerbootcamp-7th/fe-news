import { RIGHT_ARROW } from '@/constants';

/**
 * @typedef {Object} RightArrowButtonTemplateParams
 * @property {string} className
 *
 * @param {RightArrowButtonTemplateParams} rightArrowButtonTemplateParams
 * @returns {string}
 */
export const rightArrowButtonTemplate = ({ className }) => {
  return `
  <button class="${className}">
    ${RIGHT_ARROW}
  </button>
  `;
};

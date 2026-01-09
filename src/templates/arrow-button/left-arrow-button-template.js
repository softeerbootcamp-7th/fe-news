import { LEFT_ARROW } from '@/constants';

/**
 * @typedef {Object} LeftArrowButtonTemplateParams
 * @property {string} className
 *
 * @param {LeftArrowButtonTemplateParams} leftArrowButtonTemplateParams
 * @returns {string}
 */
export const leftArrowButtonTemplate = ({ className }) => {
  return `
  <button class="${className}">
    ${LEFT_ARROW}
  </button>
  `;
};

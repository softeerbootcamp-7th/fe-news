import { X } from '@/constants';

/**
 * @typedef {Object} UnsubscribeButtonTemplateParams
 * @property {boolean} hasText
 *
 * @param {UnsubscribeButtonTemplateParams} unsubscribeButtonTemplateParams
 * @returns {string}
 */
export const unsubscribeButtonTemplate = ({ hasText = true } = {}) => {
  return `
  <button class="unsubscribe-button ${hasText ? '' : 'unsubscribe-button--no-text'}">
    ${X}
    ${hasText ? '해지하기' : ''}
  </button>`;
};

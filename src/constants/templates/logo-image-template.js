/**
 * @typedef {Object} LogoImageTemplateParams
 * @property {string} logoUrl
 * @property {string} className
 *
 * @param {LogoImageTemplateParams} logoImageTemplateParams
 * @returns
 */
export const LOGO_IMAGE_TEMPLATE = ({ logoUrl, className }) => {
  return `
  <img
    src="${logoUrl}"
    class="${className}"
  />
  `;
};

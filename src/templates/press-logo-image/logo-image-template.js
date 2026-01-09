/**
 * @typedef {Object} LogoImageTemplateParams
 * @property {string?} logoUrl
 * @property {string} className
 *
 * @param {LogoImageTemplateParams} logoImageTemplateParams
 * @returns
 */
export const logoImageTemplate = ({ logoUrl, className }) => {
  if (!logoUrl) {
    return '';
  }
  return `
  <img
    src="${logoUrl}"
    class="${className}"
  />
  `;
};

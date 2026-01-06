/**
 * @typedef {Object} LogoImageTemplateParams
 * @property {string} logoUrl
 * @property {string} className
 *
 * @param {LogoImageTemplateParams} logoImageTemplateParams
 * @returns
 */
export const logoImageTemplate = ({ logoUrl, className }) => {
  return `
  <img
    src="${logoUrl}"
    class="${className}"
  />
  `;
};

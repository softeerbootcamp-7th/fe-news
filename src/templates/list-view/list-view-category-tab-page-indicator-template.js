/**
 * @typedef {Object} ListViewCategoryTabPageIndicatorTemplateParams
 * @property {number} pageIndex
 * @property {number} totalPage
 *
 * @param {ListViewCategoryTabPageIndicatorTemplateParams} listViewCategoryTabPageIndicatorTemplateParams
 * @returns
 */

export const listViewCategoryTabPageIndicatorTemplate = ({
  pageIndex,
  totalPage,
}) => {
  return `
  <div>
    <span>${pageIndex + 1}</span>
    <span>/ ${totalPage + 1}</span>
  </div>
  `;
};

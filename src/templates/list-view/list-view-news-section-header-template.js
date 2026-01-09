/**
 * @typedef {import('../../types').Newspaper} Newspaper
 *
 * @typedef {Object} ListViewNewsSectionHeaderTemplateParams
 * @property {Newspaper['logo']} logo
 * @property {Newspaper['press']} press
 * @property {Newspaper['time']} time
 *
 * @param {ListViewNewsSectionHeaderTemplateParams} listViewNewsSectionHeaderTemplateParams
 * @returns
 */
export const listViewNewsSectionHeaderTemplate = ({ logo, press, time }) => {
  return `
<div class="news-list-view__newspaper-section__header">
  <img
    src="${logo}"
    alt="${press}"
    class="news-list-view__newspaper-section__header--logo"
  />
  <span class="news-list-view__newspaper-section__header--time">
    ${time}
  </span>
</div>
`;
};

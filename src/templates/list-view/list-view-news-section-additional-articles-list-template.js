/**
 *
 * @typedef {import('../../types').Newspaper} Newspaper
 *
 * @typedef {Object} ListViewNewsSectionAdditionalArticlesListTemplateParams
 * @property {Newspaper['press']} press
 *
 * @param {ListViewNewsSectionAdditionalArticlesListTemplateParams} listViewNewsSectionAdditionalArticlesListTemplateParams
 * @returns
 */
export const listViewNewsSectionAdditionalArticlesListTemplate = ({
  press,
}) => {
  return `
<div class="news-list-view__newspaper-section__main--additional-articles">
  <ul class="news-list-view__newspaper-section__main--additional-articles--titles">
  </ul>
  <span class="news-list-view__newspaper-section__main--additional-articles--edit-info">
    ${press} 언론사에서 직접 편집한 뉴스입니다.
  </span>
</div>
  `;
};

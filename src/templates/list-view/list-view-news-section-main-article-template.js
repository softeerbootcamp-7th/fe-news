/**
 * @typedef {import('../../types').Newspaper} Newspaper
 *
 * @typedef {Object} ListViewNewsSectionMainArticleTemplateParams
 * @property {Newspaper['mainTitle']} mainTitle
 * @property {Newspaper['mainLink']} mainLink
 * @property {Newspaper['mainImg']} mainImg
 *
 * @param {ListViewNewsSectionMainArticleTemplateParams} listViewNewsSectionMainArticleTemplateParams
 * @returns {string}
 */
export const listViewNewsSectionMainArticleTemplate = ({
  mainTitle,
  mainLink,
  mainImg,
}) => {
  return `
<article class="news-list-view__newspaper-section__main--main-article">
  <img
    src="${mainImg}"
    class="news-list-view__newspaper-section__main--main-article--image"
  />
  <a href="${mainLink}" target="_blank" class="news-list-view__newspaper-section__main--main-article--title">
    ${mainTitle}
  </a>
</article>
  `;
};

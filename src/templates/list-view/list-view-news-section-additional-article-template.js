/**
 *
 * @typedef {import('../../types').RelatedArticle} RelatedArticle
 *
 * @typedef {Object} ListViewNewsSectionAdditionalArticleTemplateParams
 * @property {RelatedArticle['title']} title
 * @property {RelatedArticle['link']} link
 *
 * @param {ListViewNewsSectionAdditionalArticleTemplateParams} listViewNewsSectionAdditionalArticleTemplateParams
 * @returns
 */
export const listViewNewsSectionAdditionalArticleTemplate = ({
  title,
  link,
}) => {
  return `
    <li>
      <a href="${link}" target="_blank">${title}</a>
    </li>
  `;
};
